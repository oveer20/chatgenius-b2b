import { NextResponse } from "next/server";

export const maxDuration = 30;

export async function GET() {
  const results: Record<string, string> = {};

  const gem = (process.env.GOOGLE_GEMINI_API_KEY || "").replace(/^"|"$/g, "");
  const groq = (process.env.GROQ_API_KEY || "").replace(/^"|"$/g, "");
  const oai = (process.env.OPENAI_API_KEY || "").replace(/^"|"$/g, "");

  results.gemini = gem ? `ok (len=${gem.length})` : "missing";
  results.groq = groq ? `ok (len=${groq.length})` : "missing";
  results.openai = oai ? `ok (len=${oai.length})` : "missing";

  if (groq) {
    try {
      const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${groq}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [{ role: "user", content: "OK" }],
          max_tokens: 5
        })
      });
      results.groq_test = r.ok ? "working" : `HTTP ${r.status}`;
    } catch (e: unknown) {
      results.groq_test = e instanceof Error ? e.message.substring(0, 100) : "error";
    }
  }

  return NextResponse.json(results);
}
