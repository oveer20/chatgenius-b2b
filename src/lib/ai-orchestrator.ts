import { getGroqResponse } from "./groq";

/**
 * STRATIX AI ORCHESTRATOR - Groq Only
 * Using Groq (free) as primary model
 */
export async function getResilientChatResponse(messages: any[], systemPrompt: string, preferredModel: string = "groq") {
  try {
    console.log("/// INICIANDO GROQ ///");
    const text = await getGroqResponse(messages, systemPrompt);
    console.log("/// RESPUESTA GROQ ///", text.substring(0, 100));
    return { text, provider: "groq" };
  } catch (error: any) {
    console.error("/// ERROR ORQUESTADOR ///", error.message, error.stack);
    throw new Error("IA no disponible: " + error.message);
  }
}