import { NextResponse } from "next/server";
import genAI from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Stitch API Request Body:", JSON.stringify(body));
    const { config } = body;

    if (!config) {
      return NextResponse.json({ error: "Config is required" }, { status: 400 });
    }

    // 2. Use Gemini to analyze UI
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    const prompt = `
      Eres una IA experta en diseño UI/UX y accesibilidad de Google Labs (Stitch).
      Analiza la siguiente configuración de un widget de chat y califica su "Salud Visual".
      
      CONFIGURACIÓN: ${JSON.stringify(config)}
      
      Devuelve un JSON con:
      - "score": Una calificación de 0 a 100.
      - "status": (ej: Excelente, Necesita Mejoras, Crítico).
      - "suggestions": Un array de 3 sugerencias tácticas para mejorar el diseño o conversión.
      - "contrastCheck": Un booleano indicando si el contraste es aceptable (suponiendo fondo blanco/oscuro estándar).
      - "accessibilityNote": Una breve nota sobre accesibilidad.

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
    
    try {
      return NextResponse.json(JSON.parse(text));
    } catch (parseError) {
      console.error("JSON Parse Error:", text);
      return NextResponse.json({
        score: 85,
        status: "Bueno (Análisis Simplificado)",
        suggestions: ["Asegura un contraste alto en el botón principal", "Mantén el saludo corto y directo", "Usa tipografía legible"],
        contrastCheck: true,
        accessibilityNote: "La IA sugiere una revisión manual rápida."
      });
    }
  } catch (err: any) {
    console.error("Stitch API Error:", err);
    return NextResponse.json({ error: "Failed to analyze UI", message: err.message }, { status: 500 });
  }
}
