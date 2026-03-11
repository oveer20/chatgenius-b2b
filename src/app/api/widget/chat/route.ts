import { NextRequest, NextResponse } from "next/server";
import { getGeminiResponse } from "@/lib/gemini";

// Public API for the chat widget
export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const body = rawBody ? JSON.parse(rawBody) : {};
    const { messages, botId } = body;

    if (!messages || !botId) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    // In a real app, we would fetch the bot's systemPrompt and model from Supabase using botId
    const systemPrompt = "Eres un asistente de atención al cliente experto y amable. Responde de forma concisa y profesional. Si no sabes algo, pide el correo para contactar después.";

    // Check if Gemini API key is configured
    if (!process.env.GOOGLE_GEMINI_API_KEY) {
       return NextResponse.json({
         message: {
           role: "assistant",
           content: "🚀 ChatGenius Demo: Configura tu GOOGLE_GEMINI_API_KEY para activar la IA."
         }
       });
    }

    const text = await getGeminiResponse(messages, systemPrompt);

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
