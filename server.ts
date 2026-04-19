import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Contact API endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;

      const apiKey = process.env.RESEND_API_KEY;
      if (!apiKey) {
        console.error("DEBUG: RESEND_API_KEY is missing in environment variables.");
        return res.status(401).json({ 
          success: false, 
          error: "RESEND_API_KEY_MISSING",
          message: "Email key not found in server settings. Please add RESEND_API_KEY to Secrets." 
        });
      }

      const resendClient = new Resend(apiKey);

      const { data, error } = await resendClient.emails.send({
        from: 'Portfolio <onboarding@resend.dev>',
        to: ['rajnishkumarschool911@gmail.com'],
        subject: `New Portfolio Message: ${subject}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #0070f3;">New Message from your Portfolio</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 5px;">
              <strong>Message:</strong><br/>
              ${message.replace(/\n/g, '<br/>')}
            </div>
          </div>
        `,
      });

      if (error) {
        console.error("Resend API Error details:", JSON.stringify(error, null, 2));
        return res.status(400).json({ 
          success: false, 
          error: error.name,
          message: error.message 
        });
      }

      console.log("Email sent successfully:", data?.id);
      res.status(200).json({ success: true, data });
    } catch (error: any) {
      console.error("Critical Server Error during email send:", error);
      res.status(500).json({ 
        success: false, 
        error: "SERVER_ERROR", 
        message: error?.message || "Internal server error occurred while sending email." 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
