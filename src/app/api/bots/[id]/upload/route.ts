import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { syncBotKnowledge } from "@/lib/rag";
import { extractText } from "unpdf";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: botId } = await params;

  try {
    // 0. Feedback de Estado: Iniciando Indexación (V33.0)
    await supabaseAdmin.from("bots").update({ indexing: true }).eq("id", botId);

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

    // 2. Sincronización Vectorial Estratégica (Neural RAG V21.0)
    // Prefijar con Contexto de Origen para que la IA sepa de dónde saca el dato
    const contextualizedText = `FUENTE DEL DOCUMENTO: ${file.name}\n\nCONTENIDO:\n${fullText}`;
    
    const syncResult = await syncBotKnowledge(botId, contextualizedText, `FILE: ${file.name}`);

    // NOTA: ELIMINADO EL GUARDADO REDUNDANTE EN LA TABLA 'bots' PARA EVITAR BLOAT (V21.0)
    // El conocimiento ahora vive estructuralmente en la base de datos vectorial (document_chunks).

    // 3. Finalización Exitosa: Liberamos el estado de indexación (V33.0)
    await supabaseAdmin.from("bots").update({ indexing: false }).eq("id", botId);

    return NextResponse.json({ 
      success: true, 
      chunks: syncResult.chunks,
      filename: file.name,
      textSegment: fullText.substring(0, 800) + "..." // Feedback para el Dashboard
    });

  } catch (error: any) {
    console.error("/// UPLOAD ERROR ///", error);
    // 4. Liberación de Estado ante Error Crítico (V33.0)
    await supabaseAdmin.from("bots").update({ indexing: false }).eq("id", botId);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
