import { NextRequest, NextResponse } from "next/server";
import { syncBotKnowledge } from "@/lib/rag";

/**
 * STRATIX INTELLIGENCE — UNIFIED INGESTION ENGINE (V9.0)
 * Procesa y vectoriza conocimiento manual directamente en el Núcleo RAG.
 */

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: botId } = await params;

  try {
    const body = await request.json();
    const { content, source } = body;

    // 1. Verificación Estratégica de Integridad
    if (!content || !content.trim()) {
      return NextResponse.json({ error: "Contenido de entrenamiento vacío." }, { status: 400 });
    }

    // Starting RAG ingestion

    // 2. Sincronización Estratégica con el Núcleo Vectorial (Neural RAG V24.0)
    const contextualizedContent = `FUENTE (INGRESO MANUAL): ${source || "Nota Directa"}\n\nCONTENIDO:\n${content}`;

    const result = await syncBotKnowledge(
      botId, 
      contextualizedContent, 
      `MANUAL: ${source || "Nota Directa"}`
    );

    if (!result.success) {
      throw new Error("Fallo en la sincronización del núcleo vectorial.");
    }

    // 3. Respuesta de Confirmación Élite
    return NextResponse.json({
      success: true,
      message: "Inteligencia consolidada con éxito.",
      chunks: result.chunks,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error("/// FALLO CRÍTICO EN PIPELINE RAG ///", error);
    return NextResponse.json(
      { error: "Error en el motor de sincronización de conocimiento.", details: error.message },
      { status: 500 }
    );
  }
}
