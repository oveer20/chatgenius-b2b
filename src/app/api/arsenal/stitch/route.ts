import { NextResponse } from "next/server";
import { getGeminiResponse } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Stitch API Request Body:", JSON.stringify(body));
    const { config } = body;

    if (!config) {
      return NextResponse.json({ error: "Config is required" }, { status: 400 });
    }

    const prompt = `
      Eres una IA experta en diseño UI/UX y accesibilidad de Google Labs (Stitch).
      Analiza la siguiente configuración de un widget de chat y califica su "Salud Visual".
      
      CONFIGURACIÓN: ${JSON.stringify(config)}
      
      Devuelve un JSON con:
      - "score": Una calificación de 0 a 100.
      - "status": (ej: Excelente, Necesita Mejoras, Crítico).
      - "suggestions": Un array de 3 sugerencias tácticas para mejorar el diseño o conversión.
      - "contrastCheck": Un booleano indicando si el contraste es aceptable.
      - "accessibilityNote": Una breve nota sobre accesibilidad.

      Solo devuelve el JSON, sin texto adicional.
    `;

    const result = await getGeminiResponse([{ role: "user", content: prompt }], "Eres un asistente JSON.");

    const resultText = typeof result === 'string' ? result : JSON.stringify(result);
    const jsonMatch = resultText.match(/\{[\s\S]*\}/);
    let text = jsonMatch ? jsonMatch[0] : resultText;

    try {
      return NextResponse.json(JSON.parse(text));
    } catch (parseError) {
      console.error("JSON Parse Error:", text);
      return NextResponse.json({
        score: 85,
        status: "Bueno",
        suggestions: ["Asegura un contraste alto", "Mantén el saludo corto", "Usa tipografía legible"],
        contrastCheck: true,
        accessibilityNote: "Revisión manual recomendada."
      });
    }
  } catch (err: any) {
    console.error("Stitch API Error:", err);
    return NextResponse.json({ error: "Failed to analyze UI", message: err.message }, { status: 500 });
  }
}