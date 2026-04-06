import { getEmbeddings } from "@/lib/gemini";
import { supabaseAdmin } from "@/lib/supabase-admin";

/**
 * Fragmenta y vectoriza el conocimiento para un bot específico (V43.0).
 */
export async function syncBotKnowledge(botId: string, content: string, source: string = "Manual Input", sourceType: string = "document") {
  if (!content || !content.trim()) return { success: false, chunks: 0 };

  // 1. Limpieza Neural de Ruido (V43.0)
  // Eliminamos redundancias y espacios excesivos para optimizar el almacenamiento vectorial
  const cleanContent = content
    .replace(/\s+/g, " ")
    .replace(/\n+/g, " ")
    .trim();

  // 2. Fragmentación Estratégica (Neural Chunking V19.2)
  // 1200 chars / 150 chars overlap para mayor contexto entre ideas.
  const chunks = chunkText(cleanContent, 1200, 150);

  // 3. Procesamiento Vectorial
  const processedChunks = await Promise.all(
    chunks.map(async (text, index) => {
      const embedding = await getEmbeddings(text);
      return {
        bot_id: botId,
        content: text,
        embedding: embedding,
        metadata: {
          source: source,
          source_type: sourceType, // V42.0 Sync: Permite filtrado por tipo
          chunk_index: index,
          processed_at: new Date().toISOString()
        }
      };
    })
  );

  // 4. Almacenamiento Seguro (Bypassing RLS)
  const { error } = await supabaseAdmin.from("document_chunks").insert(processedChunks);

  if (error) {
    console.error("/// RAG SYNC ERROR ///", error);
    throw error;
  }

  return { success: true, chunks: chunks.length };
}

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
