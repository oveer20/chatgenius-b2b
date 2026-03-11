import { NextRequest, NextResponse } from "next/server";
import openai from "@/lib/openai";

// Public API for the chat widget
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, botId } = body;

    if (!messages || !botId) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    // In a real app, we would fetch the bot's systemPrompt and model from Supabase using botId
    // For the demo/MVP, we'll use a standard B2B persona
    const systemPrompt = "Eres un asistente de atención al cliente experto y amable. Responde de forma concisa y profesional. Si no sabes algo, pide el correo para contactar después.";

    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "sk-your-key-here") {
       return NextResponse.json({
         message: {
           role: "assistant",
           content: "🚀 ChatGenius Demo: Tu bot está funcionando. Configura tu API Key para ver respuestas reales."
         }
       });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
      temperature: 0.7,
    });

    const result = completion.choices[0]?.message;

    return NextResponse.json({ message: result });
  } catch (error) {
    console.error("Widget API error:", error);
    return NextResponse.json({ error: "Error de red" }, { status: 500 });
  }
}
