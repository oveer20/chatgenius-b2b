import { NextRequest, NextResponse } from "next/server";
import { getGeminiResponse } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const body = rawBody ? JSON.parse(rawBody) : {};
    
    const { messages, systemPrompt, knowledgeBase, temperature } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
    }

    const fullSystemPrompt = `
      ${systemPrompt || "Eres un asistente de IA útil."}
      
      CONTEXTO DE LA EMPRESA:
      ---
      ${knowledgeBase || "No hay información adicional disponible."}
      ---
      Responde siempre basándote en el contexto anterior.
    `;

    // Check if Gemini API key is configured
    if (!process.env.GOOGLE_GEMINI_API_KEY) {
       return NextResponse.json({
         message: {
           role: "assistant",
           content: "⚠️ Configura tu GOOGLE_GEMINI_API_KEY en Vercel para activar la IA gratuita."
         }
       });
    }

    const text = await getGeminiResponse(messages, fullSystemPrompt);

    return NextResponse.json({ 
      message: {
        role: "assistant",
        content: text
      } 
    });
  } catch (error: any) {
    console.error("/// CHAT API ERROR (GEMINI) ///");
    console.error(error);
    
    return NextResponse.json(
      { error: `Error de conexión con Gemini: ${error.message || "Desconocido"}` },
      { status: 500 }
    );
  }
}
