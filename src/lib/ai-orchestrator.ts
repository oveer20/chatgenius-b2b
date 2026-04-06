import { getGeminiResponse } from "./gemini";

/**
 * STRATIX AI ORCHESTRATOR (V50.5: Golden Failover)
 * Unifica la lógica de resiliencia entre modelos GPT y Gemini.
 */
export async function getResilientChatResponse(messages: any[], systemPrompt: string, preferredModel: string = "gemini") {
  let text = "";
  let provider = "gemini";
  const requestedModel = preferredModel.toLowerCase();

  const executeGemini = async () => {
    return await getGeminiResponse(messages, systemPrompt);
  };

  const executeOpenAI = async (m: string) => {
    const { getOpenAIResponse } = await import("./openai");
    return await getOpenAIResponse(messages, systemPrompt, m);
  };

  try {
    if (requestedModel.includes("gpt")) {
      provider = "openai";
      try {
        text = await executeOpenAI(requestedModel);
      } catch (openaiErr) {
        console.warn("/// FALLO OPENAI — ACTIVANDO RESPALDO GEMINI ///", openaiErr);
        text = await executeGemini();
        provider = "gemini (failover)";
      }
    } else {
      provider = "gemini";
      try {
        text = await executeGemini();
      } catch (geminiErr) {
        console.warn("/// FALLO GEMINI — ACTIVANDO RESPALDO OPENAI ///", geminiErr);
        if (process.env.OPENAI_API_KEY) {
          text = await executeOpenAI("gpt-4o");
          provider = "openai (failover)";
        } else {
          throw geminiErr;
        }
      }
    }
    
    return { text, provider };
  } catch (error) {
    console.error("/// FALLO TOTAL EN ORQUESTADOR IA ///", error);
    throw error;
  }
}
