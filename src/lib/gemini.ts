import { GoogleGenAI } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;

const getAI = () => {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is missing. Chatbot will be unavailable.");
      return null;
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
};

export const getGeminiResponse = async (prompt: string, context: string) => {
  const ai = getAI();
  if (!ai) {
    throw new Error("AI Service not initialized. Please configure GEMINI_API_KEY.");
  }

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [{ 
      role: 'user', 
      parts: [{ 
        text: `
          You are an AI assistant for Rajnish Kumar's portfolio website. 
          Rajnish is a BCA 2nd-year student at St. Xavier's College of Management and Technology, Patna (2024-2027 batch).
          He is an aspiring Software / Full Stack Developer.
          His skills include: Java, C, C++, Python, HTML, CSS, JavaScript, SQL, Git & GitHub.
          He ranked 1st in his first year (2024-25) and received a Merit Certificate.
          He recently built an "Automated PDF Generator for Student Results" and a professional portfolio.
          He likes learning new things, traveling, and exploring technology.
          
          Answer visitor questions politely and professionally as if you were his personal concierge.
          If you don't know something specific about him, suggest they use the contact form.
          Keep responses concise and engaging.
          
          Current Chat Context/History:
          ${context}
          
          User Question: ${prompt}
        ` 
      }] 
    }],
    config: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
    },
  });

  return response.text || "I'm sorry, I couldn't process that.";
};

