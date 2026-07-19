import { NextResponse } from "next/server";

export async function GET() {
  const gemKey = process.env.GOOGLE_GEMINI_API_KEY || "";
  const groqKey = process.env.GROQ_API_KEY || "";
  const openKey = process.env.OPENAI_API_KEY || "";

  return NextResponse.json({
    gemini: { exists: !!gemKey, length: gemKey.length, starts: gemKey.substring(0, 8), hasQuotes: gemKey.startsWith('"') },
    groq: { exists: !!groqKey, length: groqKey.length, starts: groqKey.substring(0, 8), hasQuotes: groqKey.startsWith('"') },
    openai: { exists: !!openKey, length: openKey.length, starts: openKey.substring(0, 8), hasQuotes: openKey.startsWith('"') },
  });
}
