import { NextRequest, NextResponse } from "next/server";
import { getGeminiResponse } from "@/lib/gemini";
import { supabase } from "@/lib/supabase";

// Public API for the chat widget
export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const body = rawBody ? JSON.parse(rawBody) : {};
    const { messages, botId } = body;

    if (!messages || !botId) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    // 1. Fetch bot data from Supabase
    const { data: bot, error } = await supabase
      .from("bots")
      .select("system_prompt, knowledge_base, name")
      .eq("id", botId)
      .single();

    if (error || !bot) {
      console.error("Error fetching bot for widget:", error);
      return NextResponse.json({ error: "Bot not found" }, { status: 404 });
    }

    // 2. Build the context-aware system prompt
    const fullSystemPrompt = `
      Eres un asistente de IA experto para la empresa: ${bot.name}.
      
      INSTRUCCIONES DE PERSONALIDAD:
      ---
      ${bot.system_prompt || "Responde de forma concisa y profesional. Si no sabes algo, pide el correo para contactar después."}
      ---
      
      BASE DE CONOCIMIENTO (CONFIANZA TOTAL):
      ---
      ${bot.knowledge_base || "No hay información adicional disponible."}
      ---
      
      REGLA CRÍTICA: Responde ÚNICAMENTE basándote en la base de conocimiento y tus instrucciones de personalidad.
    `;

    // 3. Check if Gemini API key is configured
    if (!process.env.GOOGLE_GEMINI_API_KEY) {
       return NextResponse.json({
         message: {
           role: "assistant",
           content: "🚀 ChatGenius Demo: Configura tu GOOGLE_GEMINI_API_KEY para activar la IA en producción."
         }
       });
     }

    // 4. Get response from Gemini
    const text = await getGeminiResponse(messages, fullSystemPrompt);

    return NextResponse.json({ 
      message: {
        role: "assistant",
        content: text
      } 
    });
  } catch (error: any) {
    console.error("Widget API error:", error);
    return NextResponse.json({ error: `Error de red: ${error.message}` }, { status: 500 });
  }
}
