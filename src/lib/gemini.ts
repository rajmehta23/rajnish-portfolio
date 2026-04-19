import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export const getGeminiResponse = async (prompt: string, context: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [{ 
      role: 'user', 
      parts: [{ 
        text: `
          You are an AI assistant for Rajnish Kumar's portfolio website. 
          Rajnish is a BCA 2nd-year student at St. Xavier's College of Management and Technology, Patna.
          He is an aspiring Software / Full Stack Developer.
          His skills include: Java, C, C++, Python, HTML, CSS, JavaScript, SQL, Git & GitHub.
          He ranked 1st in his first year.
          He recently built an Automated PDF Generator for Student Results.
          He likes learning new things, traveling, and exploring technology.
          
          Answer visitor questions politely and professionally as if you were his personal concierge.
          If you don't know something specific about him, suggest they use the contact form.
          Keep responses concise and engaging.
          
          Chat History:
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

