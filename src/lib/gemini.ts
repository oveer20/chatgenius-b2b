import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize genAI with fallback for top-level loading
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "AIzaSy_REPLACEME");

export async function getGeminiResponse(messages: any[], systemPrompt: string) {
  // Using the aliased model name for maximum key compatibility (verified)
  const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

  const chat = model.startChat({
    history: messages.slice(0, -1).map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    })),
    generationConfig: {
      maxOutputTokens: 1000,
    },
  });

  const lastMessage = messages[messages.length - 1].content;
  const result = await chat.sendMessage(`Instructions: ${systemPrompt}\n\nUser: ${lastMessage}`);
  const response = await result.response;
  return response.text();
}

export default genAI;
