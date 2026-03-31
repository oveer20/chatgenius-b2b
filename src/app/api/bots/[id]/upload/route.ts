import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { syncBotKnowledge } from "@/lib/rag";
import { extractText } from "unpdf";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id: botId } = params;

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No se proporcionó ningún archivo" }, { status: 400 });
    }

    const bufferRaw = await file.arrayBuffer();
    const buffer = Buffer.from(bufferRaw);
    
    // 1. Extraer texto del PDF usando unpdf (Node/Edge/Browser friendly)
    let fullText = "";
    try {
      const { text } = await extractText(buffer);
      fullText = Array.isArray(text) ? text.join("\n") : text;
    } catch (pdfError: any) {
      console.error("/// PDF PARSE ERROR ///", pdfError);
      return NextResponse.json({ error: "Error al procesar el PDF: " + pdfError.message }, { status: 500 });
    }

    if (!fullText.trim()) {
      return NextResponse.json({ error: "El PDF parece estar vacío o no contiene texto extraíble." }, { status: 400 });
    }

    // 2. Sincronización Vectorial Automática (RAG)
    const syncResult = await syncBotKnowledge(botId, fullText, "PDF: " + file.name);

    // 3. Persistencia en la Base de Conocimiento Manual (Para visibilidad del usuario)
    const { data: currentBot } = await supabaseAdmin
      .from("bots")
      .select("knowledge_base")
      .eq("id", botId)
      .single();

    const newKnowledge = (currentBot?.knowledge_base || "") + "\n\n--- DOCUMENTO: " + file.name + " ---\n" + fullText;

    await supabaseAdmin
      .from("bots")
      .update({ knowledge_base: newKnowledge })
      .eq("id", botId);

    return NextResponse.json({ 
      success: true, 
      text: fullText, 
      chunks: syncResult.chunks,
      filename: file.name
    });

  } catch (error: any) {
    console.error("/// UPLOAD ERROR ///", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
