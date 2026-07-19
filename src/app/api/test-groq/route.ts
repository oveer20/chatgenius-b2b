import { NextResponse } from "next/server";

export async function GET() {
  const GROQ_API_KEY = (process.env.GROQ_API_KEY || "").replace(/^"|"$/g, "");
  const keyInfo = `length=${GROQ_API_KEY.length}, startsWith=${GROQ_API_KEY.substring(0, 10)}, prefix=gsk:${GROQ_API_KEY.startsWith("gsk")}`;

  if (!GROQ_API_KEY) {
    return NextResponse.json({ error: "No GROQ_API_KEY", keyInfo });
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: "Say OK" }],
        max_tokens: 10
      })
    });

    const text = await response.text();
    return NextResponse.json({
      status: response.status,
      keyInfo,
      body: text.substring(0, 300)
    });
  } catch (e: unknown) {
    return NextResponse.json({
      error: e instanceof Error ? e.message : "unknown",
      keyInfo
    });
  }
}
