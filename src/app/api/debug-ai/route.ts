import { NextResponse } from "next/server";

export async function GET() {
  const results: Record<string, string> = {};

  // Test Gemini
  try {
    const { getGeminiResponse } = await import("@/lib/gemini");
    await getGeminiResponse([{ role: "user", content: "Say OK" }], "You are a test bot. Reply with one word.");
    results.gemini = "ok";
  } catch (e: unknown) {
    results.gemini = e instanceof Error ? e.message.slice(0, 200) : "unknown error";
  }

  // Test Groq
  try {
    const { getGroqResponse } = await import("@/lib/groq");
    await getGroqResponse([{ role: "user", content: "Say OK" }], "You are a test bot. Reply with one word.");
    results.groq = "ok";
  } catch (e: unknown) {
    results.groq = e instanceof Error ? e.message.slice(0, 200) : "unknown error";
  }

  // Test OpenAI
  try {
    const key = (process.env.OPENAI_API_KEY || "").replace(/^"|"$/g, "");
    if (!key) {
      results.openai = "no key";
    } else {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${key}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: "Say OK" }],
          max_tokens: 10
        })
      });
      if (response.ok) {
        results.openai = "ok";
      } else {
        const err = await response.text();
        results.openai = `HTTP ${response.status}: ${err.slice(0, 200)}`;
      }
    }
  } catch (e: unknown) {
    results.openai = e instanceof Error ? e.message.slice(0, 200) : "unknown error";
  }

  return NextResponse.json(results);
}
