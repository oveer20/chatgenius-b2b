import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize genAI with fallback for top-level loading
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "AIzaSy_REPLACEME");

export async function getGeminiResponse(messages: any[], systemPrompt: string) {
  // Using the aliased model name for maximum key compatibility (verified)
  const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

  // Gemini requires history to start with 'user'. 
  // If the first message is from the assistant/model, we skip it.
  const history = messages.slice(0, -1).map((m: any) => ({
    role: m.role === "user" ? "user" : "model",
    parts: [{ text: m.content }],
  }));

  // Find index of first user message
  const firstUserIndex = history.findIndex(m => m.role === "user");
  const validHistory = firstUserIndex === -1 ? [] : history.slice(firstUserIndex);

  const chat = model.startChat({
    history: validHistory,
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
