import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// Inicialización limpia del núcleo de Google
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");

/**
 * Conector Maestro de Stratix para Gemini 1.5
 * Optimizado para procesamiento estratégico y Opal Logic
 */
const MAX_RETRIES = 3;
const INITIAL_DELAY = 1000;

async function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Conector Maestro de Stratix para Gemini 1.5
 * Optimizado para procesamiento estratégico y Opal Logic con Resiliencia Neural.
 */
export async function getGeminiResponse(messages: any[], systemPrompt: string) {
  let lastError: any;
  
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
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
      // FALLBACK DE SEGURIDAD: Si Gemini bloquea el contenido, devolvemos un mensaje profesional
      if (!text || text.length < 2) {
        return "Disculpa, como asesor estratégico corporativo no puedo procesar esa solicitud específica. ¿Podemos enfocarnos en los objetivos comerciales de tu empresa?";
      }

      return text;
    } catch (error: any) {
      lastError = error;
      console.error(`/// FALLO EN NÚCLEO GEMINI (Intento ${i + 1}) ///`, error.message);
      
      // Si es error de cuota o servidor, esperamos antes de reintentar
      if (error.message?.includes("429") || error.message?.includes("500")) {
        await wait(INITIAL_DELAY * Math.pow(2, i));
        continue;
      }
      break; 
    }
  }

  throw new Error(`Fallo crítico tras ${MAX_RETRIES} reintentos: ${lastError?.message}`);
}

/**
 * Generador de Embeddings Estratégicos
 * Escala cualquier texto a un vector de 768 dimensiones (Optimizado para Gemini 1.5)
 */
export async function getEmbeddings(text: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const result = await model.embedContent(text);
    return result.embedding.values;
  } catch (error) {
    console.error("/// ERROR GENERANDO EMBEDDINGS ///", error);
    throw error;
  }
}

export default genAI;