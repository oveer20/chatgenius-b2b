import { NextRequest, NextResponse } from "next/server";
import openai, {
  buildSummaryPrompt,
  buildExperiencePrompt,
  buildSkillsPrompt,
} from "@/lib/openai";

// Simple in-memory rate limiting
const rateLimit = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimit.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + 60000 }); // 1 minute window
    return true;
  }

  if (limit.count >= 10) {
    return false; // 10 requests per minute
  }

  limit.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { type, data } = body;

    if (!type || !data) {
      return NextResponse.json(
        { error: "Missing type or data" },
        { status: 400 }
      );
    }

    let prompt: string;

    switch (type) {
      case "summary":
        prompt = buildSummaryPrompt(data);
        break;
      case "experience":
        prompt = buildExperiencePrompt(data);
        break;
      case "skills":
        prompt = buildSkillsPrompt(data);
        break;
      default:
        return NextResponse.json(
          { error: "Invalid generation type" },
          { status: 400 }
        );
    }

    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "sk-your-key-here") {
      // Return demo content when no API key
      return NextResponse.json({
        result: getDemoContent(type, data),
        demo: true,
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert professional resume writer with deep knowledge of ATS systems and recruitment best practices.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const result = completion.choices[0]?.message?.content?.trim();

    if (!result) {
      return NextResponse.json(
        { error: "No content generated" },
        { status: 500 }
      );
    }

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Generate API error:", error);
    return NextResponse.json(
      { error: "Failed to generate content. Please try again." },
      { status: 500 }
    );
  }
}

// Demo content for when no API key is configured
function getDemoContent(type: string, data: Record<string, string>): string {
  switch (type) {
    case "summary":
      return `Profesional dinámico con amplia experiencia en ${data.role || "el sector"}. Apasionado por entregar resultados de alto impacto y liderar equipos hacia el éxito. Combina habilidades técnicas con pensamiento estratégico para impulsar el crecimiento organizacional.`;
    case "experience":
      return `• Lideré iniciativas estratégicas que resultaron en un aumento del 25% en la productividad del equipo
• Implementé soluciones innovadoras que redujeron costos operativos en un 15%
• Colaboré con equipos multifuncionales para entregar proyectos clave antes de los plazos establecidos
• Desarrollé y optimicé procesos que mejoraron la eficiencia operativa significativamente`;
    case "skills":
      return "Liderazgo, Gestión de Proyectos, Comunicación Efectiva, Resolución de Problemas, Pensamiento Estratégico, Trabajo en Equipo, Análisis de Datos, Adaptabilidad";
    default:
      return "";
  }
}
