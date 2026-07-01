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