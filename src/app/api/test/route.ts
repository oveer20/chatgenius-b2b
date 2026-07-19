import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ status: "alive" });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { provider } = body;
    const result: Record<string, string> = {};

    if (provider === "groq" || provider === "all") {
      const key = (process.env.GROQ_API_KEY || "").replace(/^"|"$/g, "");
      result.groq = key ? `has_key(len=${key.length})` : "no_key";
      if (key) {
        const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: { "Authorization": `Bearer ${key}`, "Content-Type": "application/json" },
          body: JSON.stringify({ model: "llama-3.1-8b-instant", messages: [{ role: "user", content: "OK" }], max_tokens: 5 })
        });
        const body = await r.text();
        result.groq_test = r.ok ? "working" : `HTTP ${r.status}: ${body.substring(0, 200)}`;
      }
    }

    if (provider === "openai" || provider === "all") {
      const key = (process.env.OPENAI_API_KEY || "").replace(/^"|"$/g, "");
      result.openai = key ? `has_key(len=${key.length})` : "no_key";
      if (key) {
        const r = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: { "Authorization": `Bearer ${key}`, "Content-Type": "application/json" },
          body: JSON.stringify({ model: "gpt-4o-mini", messages: [{ role: "user", content: "OK" }], max_tokens: 5 })
        });
        const body = await r.text();
        result.openai_test = r.ok ? "working" : `HTTP ${r.status}: ${body.substring(0, 200)}`;
      }
    }

    return NextResponse.json(result);
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message.substring(0, 200) : "unknown" });
  }
}
