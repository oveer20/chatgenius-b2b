import { getGroqResponse } from "./groq";

/**
 * STRATIX AI ORCHESTRATOR - Groq Only
 * Using Groq (free) as primary model
 */
interface ChatMessage {
  role: string;
  content: string;
}

export async function getResilientChatResponse(messages: ChatMessage[], systemPrompt: string) {
  try {
    const text = await getGroqResponse(messages, systemPrompt);
    return { text, provider: "groq" };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("/// ERROR ORQUESTADOR ///", msg);
    throw new Error("IA no disponible: " + msg);
  }
}

export async function getResilientAIResponse(messages: ChatMessage[], systemPrompt: string) {
  try {
    const text = await getGroqResponse(messages, systemPrompt);
    return { text, provider: "groq" };
  } catch (error: unknown) {
    console.error("/// GROQ FALLÓ — intentando Gemini ///", error instanceof Error ? error.message : error);
    try {
      const { getGeminiResponse } = await import("@/lib/gemini");
      const text = await getGeminiResponse(messages, systemPrompt);
      return { text, provider: "gemini" };
    } catch (geminiError: unknown) {
      const msg = geminiError instanceof Error ? geminiError.message : "Unknown error";
      throw new Error("IA no disponible: " + msg);
    }
  }
}