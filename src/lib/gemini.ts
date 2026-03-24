import { GoogleGenerativeAI } from "@google/generative-ai";

// Inicialización limpia del núcleo de Google
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");

/**
 * Conector Maestro de Stratix para Gemini 1.5
 * Optimizado para procesamiento estratégico y Opal Logic
 */
export async function getGeminiResponse(messages: any[], systemPrompt: string) {
  try {
    // Usamos el modelo Flash por su baja latencia en dispositivos móviles
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      // Movimos las instrucciones al sistema central para que la IA nunca las olvide
      systemInstruction: systemPrompt
    });

    // Procesamos el historial asegurando que empiece con el usuario
    const history = messages.slice(0, -1).map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    // Filtro de integridad: Gemini exige que la conversación inicie con 'user'
    const firstUserIndex = history.findIndex(m => m.role === "user");
    const validHistory = firstUserIndex === -1 ? [] : history.slice(firstUserIndex);

    const chat = model.startChat({
      history: validHistory,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7, // Balance ideal para consultoría estratégica
      },
    });

    const lastMessage = messages[messages.length - 1].content;

    // Enviamos solo el mensaje; las instrucciones ya están en el ADN del modelo
    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;

    return response.text();
  } catch (error: any) {
    console.error("/// FALLO EN NÚCLEO GEMINI ///", error);
    throw new Error("Fallo en la comunicación con el núcleo de inteligencia.");
  }
}

export default genAI;