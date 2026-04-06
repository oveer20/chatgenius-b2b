import { NextRequest, NextResponse } from "next/server";
import { getGeminiResponse } from "@/lib/gemini";

/**
 * STRATIX INTELLIGENCE — STRATEGIC OUTREACH ENGINE (V17.0)
 * Generación de guiones de prospección B2B de alta conversión.
 */

// Simple in-memory rate limiting
const rateLimit = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimit.get(ip);
  if (!limit || now > limit.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + 60000 });
    return true;
  }
  if (limit.count >= 15) return false;
  limit.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Límite de solicitudes alcanzado. Reintenta en 1 min." }, { status: 429 });
    }

    const body = await request.json();
    const { type, data } = body;

    if (!type || !data) {
      return NextResponse.json({ error: "Faltan parámetros de misión (type/data)" }, { status: 400 });
    }

    let systemPrompt = `
      IDENTIDAD: Eres un Arquitecto de Ventas B2B de Stratix Intelligence.
      TU MISIÓN: Generar contenidos que no solo informen, sino que PERSUADAN y CIERREN.
      
      MARCOS DE TRABAJO (USALOS SEGÚN EL CASO):
      - AIDA: Atención (Gancho disruptivo), Interés (Beneficio neural), Deseo (Escalabilidad/ROI), Acción (CTA directo).
      - PAS: Problema (Dolor de perder leads), Agitación (Coste de oportunidad), Solución (Stratix Neural Ingestion).
      
      ADNs ESTRATÉGICOS:
      - Tono: Autoritario, Ejecutivo, Predictivo.
      - Estilo: Limpio, cinemático, sin adornos innecesarios.
      - Enfoque: Stratix no es un "chatbot", es una Infraestructura de Inteligencia Estratégica.
    `;

    let userPrompt = "";

    switch (type) {
      case "MARKETING_POST":
        userPrompt = `Usa el marco AIDA para este POST MAESTRO (Día ${data.day || 1}, ${data.platform || "LinkedIn"}).
          GANCHO: Un dato disruptivo sobre la pérdida de leads en B2B.
          INTERÉS: Cómo la IA de Stratix califica leads en milisegundos.
          DESEO: La libertad operativa de tener un clon de ventas 24/7.
          ACCIÓN: Invítales a la demo gratuita de 7 días.
          Formato: Cinemático con espaciado amplio.`;
        break;
      case "OUTREACH_INTRO":
        userPrompt = `Usa el marco PAS para este mensaje de 'Warm Intro' en WhatsApp.
          PROBLEMA: ${data.name} de ${data.company} está perdiendo prospectos por lentitud en respuesta.
          AGITACIÓN: Menciona que el 70% de las ventas se pierden por no responder en menos de 5 minutos.
          SOLUCIÓN: Stratix Intelligence automatiza esta atención con Opal Score (${data.score || "Hot"}).
          CTA: Corto y directo para agendar una llamada rápida.`;
        break;
      case "OUTREACH_PITCH":
        userPrompt = `Genera un 'Technical Pitch' disruptivo para ${data.name}.
          ESTRATEGIA: Enfócate en la arquitectura RAG y la ingesta neural.
          VALOR: Estratix no alucina; lee tus manuales y responde con la precisión de un Senior Sales Engineer.
          DIFERENCIAL: Opal Logic califica la intención de compra automáticamente.
          CTA: "Inyectemos este conocimiento en tu web hoy mismo".`;
        break;
      case "OUTREACH_FOLLOWUP":
        userPrompt = `Usa una variante de PAS para este 'Follow-up Táctico'.
          DOLOR: El silencio es el asesino de las ventas B2B.
          ADVERTENCIA: Mientras esperas, la competencia ya está usando IA para robar tus leads más calientes.
          SOLUCIÓN: Stratix puede reactivar este contacto ahora mismo.
          CTA: "¿Seguimos adelante con el blindaje de tu funnel?".`;
        break;
      default:
        return NextResponse.json({ error: "Tipo de generación no válida para Stratix." }, { status: 400 });
    }

    // Usamos Gemini para velocidad y autoridad en español
    const result = await getGeminiResponse([{ role: "user", content: userPrompt }], systemPrompt);

    return NextResponse.json({ result: result.trim() });
  } catch (error) {
    console.error("/// FALLO MOTOR OUTREACH ///", error);
    return NextResponse.json({ error: "Fallo en el motor de generación estratégica." }, { status: 500 });
  }
}
