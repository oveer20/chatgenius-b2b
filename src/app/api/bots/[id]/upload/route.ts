import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { syncBotKnowledge } from "@/lib/rag";
import { extractText } from "unpdf";
import { createClient } from "@/utils/supabase/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: botId } = await params;

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const { data: bot } = await supabase.from("bots").select("user_id").eq("id", botId).single();
    if (!bot || bot.user_id !== user.id) return NextResponse.json({ error: "No autorizado" }, { status: 403 });

    await supabaseAdmin.from("bots").update({ indexing: true }).eq("id", botId);

    const formData = await request.formData();
    const file = formData.get("file") as File;
    if (!file) return NextResponse.json({ error: "No se proporcionó ningún archivo" }, { status: 400 });

    const bufferRaw = await file.arrayBuffer();
    const buffer = Buffer.from(bufferRaw);

    let fullText = "";
    try {
      const { text } = await extractText(buffer);
      fullText = Array.isArray(text) ? text.join("\n") : text;
    } catch (pdfError: unknown) {
      const message = pdfError instanceof Error ? pdfError.message : "Unknown error";
      return NextResponse.json({ error: "Error al procesar el PDF: " + message }, { status: 500 });
    }

    if (!fullText.trim()) return NextResponse.json({ error: "El PDF no contiene texto extraíble." }, { status: 400 });

    const contextualizedText = `FUENTE DEL DOCUMENTO: ${file.name}\n\nCONTENIDO:\n${fullText}`;
    const syncResult = await syncBotKnowledge(botId, contextualizedText, `FILE: ${file.name}`);

    await supabaseAdmin.from("bots").update({ indexing: false }).eq("id", botId);

    return NextResponse.json({ success: true, chunks: syncResult.chunks, filename: file.name, textSegment: fullText.substring(0, 800) + "..." });
  } catch (error: unknown) {
    console.error("/// UPLOAD ERROR ///", error);
    try { await supabaseAdmin.from("bots").update({ indexing: false }).eq("id", botId); } catch {}
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
