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
      
      INSTRUCCIONES PRO (OPAL STYLE):
      - Analiza la temperatura del lead (INTERÉS): Cold (poco interés), Warm (preguntas específicas), Hot (listo para comprar/agendar).
      - Detecta el INTENTO del usuario: Sales, Support, Information, Technical, or Complaint.
      - Al final de tu respuesta, SIEMPRE incluye un bloque JSON oculto con este formato exacto:
        [[META:{"intent": "detected_intent", "score": "detected_score_name", "confidence": 0-100}]]
      
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

    // Extract Metadata Opal Style
    let intent = "Information";
    let score = "Cold";
    let cleanText = text;

    const metaMatch = text.match(/\[\[META:([\s\S]*?)\]\]/);
    if (metaMatch) {
      try {
        const meta = JSON.parse(metaMatch[1]);
        intent = meta.intent || intent;
        score = meta.score || score;
        cleanText = text.replace(/\[\[META:[\s\S]*?\]\]/, "").trim();
      } catch (e) {
        console.error("Error parsing Opal Meta:", e);
      }
    }

    return NextResponse.json({ 
      message: {
        role: "assistant",
        content: cleanText
      },
      analysis: {
        intent,
        score,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error: any) {
    console.error("/// CHAT API ERROR (GEMINI) ///");
    console.error(error);
    
    const isQuotaExceeded = error.message?.includes("429") || error.message?.includes("quota") || error.toString().includes("429");

    if (isQuotaExceeded) {
      return NextResponse.json({ 
        message: {
          role: "assistant",
          content: "🤖 Estoy recibiendo muchas consultas en este momento. Por favor, dame unos 10 segundos para procesar todo y vuelve a preguntarme. ¡Gracias por tu paciencia!"
        }
      });
    }

    return NextResponse.json(
      { error: "Lo siento, el motor de IA está ocupado. Intenta de nuevo en un momento." },
      { status: 500 }
    );
  }
}
