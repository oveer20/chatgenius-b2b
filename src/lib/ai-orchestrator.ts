import { getGeminiResponse } from "./gemini";

/**
 * STRATIX AI ORCHESTRATOR (V50.5: Golden Failover)
 * Unifica la lógica de resiliencia entre modelos.
 */
export async function getResilientChatResponse(messages: any[], systemPrompt: string, preferredModel: string = "gemini") {
  let text = "";
  let provider = "gemini";
  const requestedModel = preferredModel.toLowerCase();

  const toString = (result: any) => typeof result === 'string' ? result : JSON.stringify(result);

  const executeGemini = async () => {
    const result = await getGeminiResponse(messages, systemPrompt);
    return toString(result);
  };

  const executeOpenAI = async (m: string) => {
    const { getOpenAIResponse } = await import("./openai");
    const result = await getOpenAIResponse(messages, systemPrompt, m);
    return toString(result);
  };

  try {
    if (requestedModel.includes("gpt")) {
      provider = "openai";
      try {
        text = await executeOpenAI(requestedModel);
      } catch (openaiErr) {
        console.warn("/// FALLO OPENA.I — ACTIVANDO RESPALDO GEMINI ///", openaiErr);
        text = await executeGemini();
        provider = "gemini (failover)";
      }
    } else {
      provider = "gemini";
      try {
        text = await executeGemini();
      } catch (geminiErr) {
        console.warn("/// FALLO GEMINI — ACTIVANDO RESPALDO OPENA.I ///", geminiErr);
        if (process.env.OPENAI_API_KEY) {
          text = await executeOpenAI("gpt-3.5-turbo");
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