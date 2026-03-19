import { NextResponse } from "next/server";
import genAI from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // 1. Fetch the content (Simulated for robustness/speed in demo, but basic fetch works)
    let content = "";
    try {
      const response = await fetch(url);
      content = await response.text();
      // Basic cleaning
      content = content.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gi, "");
      content = content.replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gi, "");
      content = content.replace(/<[^>]*>/g, " ");
      content = content.slice(0, 10000); // Limit to 10k chars
    } catch (err) {
      console.error("Fetch error:", err);
      // Fallback: If fetch fails, ask Gemini to reason based on the URL alone 
      // (Gemini often has knowledge of popular brands or can infer from URL structure)
      content = `Extracting branding for: ${url}`;
    }

    // 2. Use Gemini to analyze DNA
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
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

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    // Improved JSON extraction
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      text = jsonMatch[0];
    } else {
      text = text.replace(/```json|```/g, "").trim();
    }
    
    return NextResponse.json(JSON.parse(text));
  } catch (err: any) {
    console.error("Pomelli API Error:", err);
    return NextResponse.json({ error: "Failed to analyze DNA", message: err.message }, { status: 500 });
  }
}
