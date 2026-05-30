export const getGeminiResponse = async (prompt: string, context: string): Promise<string> => {
  try {
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, context }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.message || `Server returned status ${response.status}`);
    }

    const data = await response.json();
    return data.text || "I'm sorry, I couldn't process that.";
  } catch (error: any) {
    console.error("Error calling server-side assistant endpoint:", error);
    throw error;
  }
};
