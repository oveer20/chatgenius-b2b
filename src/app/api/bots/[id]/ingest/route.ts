import { NextRequest, NextResponse } from "next/server";
import { syncBotKnowledge } from "@/lib/rag";
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

    const body = await request.json();
    const { content, source } = body;

    if (!content || !content.trim()) return NextResponse.json({ error: "Contenido vacío." }, { status: 400 });

    const contextualizedContent = `FUENTE (INGRESO MANUAL): ${source || "Nota Directa"}\n\nCONTENIDO:\n${content}`;
    const result = await syncBotKnowledge(botId, contextualizedContent, `MANUAL: ${source || "Nota Directa"}`);

    if (!result.success) throw new Error("Fallo en la sincronización del núcleo vectorial.");

    return NextResponse.json({ success: true, message: "Inteligencia consolidada con éxito.", chunks: result.chunks, timestamp: new Date().toISOString() });
  } catch (error: any) {
    console.error("/// FALLO CRÍTICO EN PIPELINE RAG ///", error);
    return NextResponse.json({ error: "Error en el motor de sincronización.", details: error.message }, { status: 500 });
  }
}
