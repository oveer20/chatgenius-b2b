import { NextRequest, NextResponse } from "next/server";
import { syncBotKnowledge } from "@/lib/rag";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const { url, botId } = await request.json();
    if (!url || !botId) return NextResponse.json({ error: "URL and botId are required" }, { status: 400 });

    const { data: bot } = await supabase.from("bots").select("user_id").eq("id", botId).single();
    if (!bot || bot.user_id !== user.id) return NextResponse.json({ error: "No autorizado" }, { status: 403 });

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch URL: ${response.statusText}`);

    const html = await response.text();
    let cleanText = html
      .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, "")
      .replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gim, "")
      .replace(/<nav\b[^>]*>([\s\S]*?)<\/nav>/gim, "")
      .replace(/<footer\b[^>]*>([\s\S]*?)<\/footer>/gim, "")
      .replace(/<aside\b[^>]*>([\s\S]*?)<\/aside>/gim, "")
      .replace(/<header\b[^>]*>([\s\S]*?)<\/header>/gim, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    syncBotKnowledge(botId, cleanText, url, "web_crawl").catch(e => console.error("ASYNC_RAG_FAIL", e));

    return NextResponse.json({ success: true, status: "processing", message: "Sincronización neural iniciada." });
  } catch (error: unknown) {
    console.error("/// CRAWL API ERROR ///", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
