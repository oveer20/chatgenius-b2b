import { NextRequest, NextResponse } from "next/server";
import { syncBotKnowledge } from "@/lib/rag";

export async function POST(request: NextRequest) {
  try {
    const { url, botId } = await request.json();

    if (!url || !botId) {
      return NextResponse.json({ error: "URL and botId are required" }, { status: 400 });
    }

    // 1. Respuesta Inmediata (Async Protocol V44.0)
    // Iniciamos el proceso pero liberamos al cliente
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.statusText}`);
    }

    const html = await response.text();
    
    // 3. Extracción de Contenido Quirúrgico (V42.0)
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

    // 4. Ingesta Neural en Background (V44.0)
    // No esperamos el `await` para el RAG, lo lanzamos y devolvemos éxito visual
    syncBotKnowledge(botId, cleanText, url, "web_crawl").catch(e => console.error("ASYNC_RAG_FAIL", e));

    return NextResponse.json({ 
      success: true, 
      status: "processing",
      message: "SINCRONIZACIÓN NEURAL INICIADA: Stratix está devorando el conocimiento corporativo en segundo plano. 🛡️✨"
    });
  } catch (error: any) {
    console.error("/// CRAWL API ERROR ///");
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
