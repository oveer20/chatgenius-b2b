import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

function getGenAI() {
  const key = process.env.GOOGLE_GEMINI_API_KEY;
  if (!key) throw new Error("GOOGLE_GEMINI_API_KEY not configured");
  return new GoogleGenerativeAI(key);
}

const MAX_RETRIES = 3;
const INITIAL_DELAY = 1000;

async function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getGeminiResponse(messages: any[], systemPrompt: string) {
  let lastError: any;
  let genAI;
  try {
    genAI = getGenAI();
  } catch (e) {
    console.error("/// ERROR INIT GENAI ///", e);
    throw new Error("No se pudo inicializar Google AI");
  }
  
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        systemInstruction: systemPrompt,
        safetySettings: [
          { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
          { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
          { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
          { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH }
        ]
      });

      const history = messages.slice(0, -1).map((m: any) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

      const firstUserIndex = history.findIndex(m => m.role === "user");
      const validHistory = firstUserIndex === -1 ? [] : history.slice(firstUserIndex);

      const chat = model.startChat({
        history: validHistory,
        generationConfig: { maxOutputTokens: 1000, temperature: 0.7 },
      });

      const lastMessage = messages[messages.length - 1].content;
      const result = await chat.sendMessage(lastMessage);
      const response = await result.response;
      
      const text = response.text();
      if (!text || text.length < 2) {
        throw new Error("Respuesta vacía");
      }

      return text;
    } catch (error: any) {
      lastError = error;
      console.error(`/// FALLO EN GEMINI (Intento ${i + 1}) ///`, error.message);
      
      if (error.message?.includes("429") || error.message?.includes("500") || error.message?.includes("quota")) {
        await wait(INITIAL_DELAY * Math.pow(2, i));
        continue;
      }
      break; 
    }
  }
  
  throw new Error(`Fallo crítico: ${lastError?.message}`);
}

export async function getEmbeddings(text: string) {
  try {
    const genAI = getGenAI();
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const result = model.embedContent(text);
    return (await result).embedding.values;
  } catch (error: any) {
    console.error("/// ERROR GENERANDO EMBEDDINGS ///", error);
    throw error;
  }
}
