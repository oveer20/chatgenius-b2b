import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { syncBotKnowledge } from "@/lib/rag";

// Forzar entorno de nodo para Cheerio
export const runtime = 'nodejs';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Cambio: params es una Promesa en Next.js App Router 
) {
  try {
    const { id: botId } = await params; // Resolvemos la promesa de params
    const body = await request.json();
    const { url } = body;

    if (!botId) {
      return NextResponse.json({ success: false, error: "Falta el ID del Activo IA." }, { status: 400 });
    }

    if (!url || typeof url !== 'string' || !url.startsWith('http')) {
      return NextResponse.json({ success: false, error: "URL inválida o no proporcionada." }, { status: 400 });
    }

    // 1. Obtener el HTML de la URL
    console.log(`/// INICIANDO CRAWLER RAG PARA: ${url} ///`);
    let html = "";
    try {
      const fetchResponse = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) StratixAI/1.0',
          'Accept': 'text/html,application/xhtml+xml',
        },
        // Timeout de seguridad opcional si usas AbortController, aquí lo dejamos simple
      });

      if (!fetchResponse.ok) {
        throw new Error(`HTTP Error: ${fetchResponse.status}`);
      }
      html = await fetchResponse.text();
    } catch (e: any) {
      return NextResponse.json({ success: false, error: `No se pudo acceder a la página. Posible bloqueo anti-bot: ${e.message}` }, { status: 400 });
    }

    // 2. Extraer texto limpio con Cheerio
    const $ = cheerio.load(html);

    // Remover elementos que no aportan conocimiento
    $('script, style, noscript, nav, footer, iframe, svg, img, form, button, [role="navigation"], [role="banner"]').remove();

    // Extraer texto y limpiar espacios
    let textContent = $('body').text();
    
    // Limpieza agresiva de strings: múltiples espacios, tabulaciones y saltos de línea vacíos
    textContent = textContent.replace(/\s+/g, ' ').trim();

    if (!textContent || textContent.length < 50) {
      return NextResponse.json({ success: false, error: "La página no contiene texto suficiente o bloqueó el scraper." }, { status: 400 });
    }

    console.log(`/// CRAWLER SUCCESS: Extraídos ${textContent.length} caracteres de ${url}. Iniciando Sincronización RAG ///`);

    // 3. Sincronización RAG (Vectorización)
    const syncResult = await syncBotKnowledge(botId, textContent, `URL: ${url}`);

    if (syncResult.success && syncResult.chunks > 0) {
      return NextResponse.json({ 
        success: true, 
        chunks: syncResult.chunks,
        textSegment: textContent.substring(0, 500) + "..." // Solo una muestra para el UI
      });
    } else {
      return NextResponse.json({ success: false, error: "El texto fue extraído pero falló la generación de vectores (Embeddings)." }, { status: 500 });
    }

  } catch (error: any) {
    console.error("/// CRITICAL CRAWLER ERROR ///", error);
    return NextResponse.json({ success: false, error: "Error fatal interno procesando la URL." }, { status: 500 });
  }
}
