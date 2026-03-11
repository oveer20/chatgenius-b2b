import { NextRequest, NextResponse } from "next/server";
import openai from "@/lib/openai";

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const body = rawBody ? JSON.parse(rawBody) : {};
    
    const { messages, systemPrompt, knowledgeBase, temperature, model = "gpt-4o-mini" } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
    }

    const fullSystemPrompt = `
      ${systemPrompt || "Eres un asistente de IA útil."}
      
      CONTEXTO DE LA EMPRESA (Usa esta información para responder si es relevante):
      ---
      ${knowledgeBase || "No hay información adicional disponible."}
      ---
    `;

    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "sk-your-key-here") {
       // Mock response for demo
       return NextResponse.json({
         message: {
           role: "assistant",
           content: "Esta es una respuesta de demostración. Configura tu OPENAI_API_KEY para recibir respuestas reales de la IA."
         }
       });
    }

    const completion = await openai.chat.completions.create({
      model: model,
      messages: [
        {
          role: "system",
          content: fullSystemPrompt,
        },
        ...messages,
      ],
      temperature: temperature ?? 0.7,
    });

    const result = completion.choices[0]?.message;

    return NextResponse.json({ message: result });
  } catch (error: any) {
    console.error("/// CHAT API ERROR DETAILS ///");
    console.error("Message:", error.message);
    console.error("Type:", error.type);
    console.error("Code:", error.code);
    console.error("Stack:", error.stack);
    console.error("/// END ERROR DETAILS ///");
    
    return NextResponse.json(
      { error: `Error de conexión con la IA: ${error.message || "Desconocido"}` },
      { status: 500 }
    );
  }
}
