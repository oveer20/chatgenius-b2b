import { NextResponse } from "next/server";
import { getGeminiResponse } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    let content = "";
    try {
      const response = await fetch(url);
      content = await response.text();
      content = content.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gi, "");
      content = content.replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gi, "");
      content = content.replace(/<[^>]*>/g, " ");
      content = content.slice(0, 10000);
    } catch (err) {
      console.error("Fetch error:", err);
      content = `Extracting branding for: ${url}`;
    }

    const prompt = `
      Eres una IA experta en branding y marketing estratégico de Google Labs (Pomelli).
      Analiza el siguiente contenido web (o URL) y extrae el ADN de la marca.
      
      CONTENIDO/URL: ${content}
      
      Devuelve un JSON con:
      - "primaryColor": Un código HEX sugerido basado en la marca.
      - "tone": El tono de voz sugerido (ej: Formal, Amigable, Tecnológico, Lujoso).
      - "mission": Una frase corta que defina qué hace la empresa.
      - "systemPromptSuggestion": Una sugerencia de System Prompt para un asistente de IA que refleje esta identidad.
      - "keyKeywords": Un array de 5 palabras clave de la marca.

      Solo devuelve el JSON, sin texto adicional.
    `;

    const result = await getGeminiResponse([{ role: "user", content: prompt }], "Eres un asistente JSON.");

    const resultText = typeof result === 'string' ? result : JSON.stringify(result);
    const jsonMatch = resultText.match(/\{[\s\S]*\}/);
    let text = jsonMatch ? jsonMatch[0] : resultText;

    return NextResponse.json(JSON.parse(text));
  } catch (err: unknown) {
    console.error("Pomelli API Error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: "Failed to analyze DNA", message }, { status: 500 });
  }
}