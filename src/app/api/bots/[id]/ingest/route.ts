import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getEmbeddings } from "@/lib/gemini";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

/**
 * API de Ingestión Estratégica (RAG)
 * Procesa texto plano, lo divide en fragmentos y genera vectores de alta densidad.
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { content, source } = body;

    if (!content) {
      return NextResponse.json({ error: "No se proporcionó contenido para indexar" }, { status: 400 });
    }

    // 1. Fragmentación Inteligente (Chunking)
    // Dividimos por párrafos o bloques de ~1000 caracteres con solapamiento
    const chunks = chunkText(content, 1000, 100);

    console.log(`/// Ingestión Iniciada: ${chunks.length} fragmentos detectados para el bot ${id}`);

    // 2. Procesamiento Vectorial
    const processedChunks = await Promise.all(
      chunks.map(async (text, index) => {
        const embedding = await getEmbeddings(text);
        return {
          bot_id: id,
          content: text,
          embedding: embedding,
          }
        };
      })
    );

    // 3. Inserción Masiva en Supabase
    const { error: dbError } = await supabase
      .from("knowledge")
      .insert(processedChunks);

    if (dbError) {
      console.error("/// ERROR PERSISTIENDO CONOCIMIENTO ///", dbError);
      throw dbError;
    }

    return NextResponse.json({
      success: true,
      message: `¡Núcleo de conocimiento actualizado! ${chunks.length} fragmentos sincronizados.`,
      chunks_count: chunks.length
    });

  } catch (error: any) {
    console.error("/// FALLO CRÍTICO EN INGESTIÓN ///", error);
    return NextResponse.json({ error: "Fallo en el motor de ingestión estratétegica" }, { status: 500 });
  }
}

/**
 * Función de segmentación de texto con solapamiento
 */
function chunkText(text: string, size: number, overlap: number): string[] {
  const chunks: string[] = [];
  let index = 0;

  while (index < text.length) {
    const chunk = text.slice(index, index + size);
    chunks.push(chunk);
    index += (size - overlap);
    if (index >= text.length) break;
  }

  return chunks;
}
