import { getEmbeddings } from "@/lib/gemini";
import { supabaseAdmin } from "@/lib/supabase-admin";

/**
 * Fragmenta y vectoriza el conocimiento para un bot específico.
 */
export async function syncBotKnowledge(botId: string, content: string, source: string = "Manual Input") {
  if (!content || !content.trim()) return { success: false, chunks: 0 };

  // 1. Fragmentación Inteligente (Chunking)
  const chunks = chunkText(content, 1000, 100);

  // 2. Procesamiento Vectorial
  const processedChunks = await Promise.all(
    chunks.map(async (text, index) => {
      const embedding = await getEmbeddings(text);
      return {
        bot_id: botId,
        content: text,
        embedding: embedding,
        metadata: {
          source: source,
          chunk_index: index,
          processed_at: new Date().toISOString()
        }
      };
    })
  );

  // 3. Almacenamiento Seguro (Bypassing RLS)
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
