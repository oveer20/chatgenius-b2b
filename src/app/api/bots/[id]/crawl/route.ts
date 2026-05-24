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
    // Starting RAG crawler
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

    // 2. Extraer texto limpio y Enlaces Internos (DEEP CRAWL V36.0)
    const $ = cheerio.load(html);
    const domain = new URL(url).hostname;
    const internalLinks: string[] = [];

    // Descubrimiento de Enlaces (Limitado a 5 adicionales para evitar abusos)
    $('a[href]').each((_, el) => {
      try {
        const href = $(el).attr('href');
        if (!href) return;
        const absoluteUrl = new URL(href, url).href;
        if (new URL(absoluteUrl).hostname === domain && !internalLinks.includes(absoluteUrl) && absoluteUrl !== url) {
          if (internalLinks.length < 5) internalLinks.push(absoluteUrl);
        }
      } catch {}
    });

    const pagesToCrawl = [url, ...internalLinks];
    let totalChunks = 0;
    const crawledTitles: string[] = [];

    // Deep crawl processing

    for (const pageUrl of pagesToCrawl) {
      try {
        const pResponse = await fetch(pageUrl, { headers: { 'User-Agent': 'StratixAI/1.0' } });
        if (!pResponse.ok) continue;
        const pHtml = await pResponse.text();
        const $p = cheerio.load(pHtml);

        const pTitle = $p('title').text() || pageUrl;
        const pDesc = $p('meta[name="description"]').attr('content') || "";
        
        $p('script, style, nav, footer, iframe, .cookie-banner').remove();
        let pText = $p('body').text().replace(/\s+/g, ' ').trim();

        if (pText.length > 100) {
          const cText = `URL: ${pageUrl}\nTÍTULO: ${pTitle}\nDESCRIPCIÓN: ${pDesc}\nCONTENIDO:\n${pText}`;
          const syncResult = await syncBotKnowledge(botId, cText, `URL: ${pageUrl} | ${pTitle}`);
          if (syncResult.success) {
            totalChunks += syncResult.chunks;
            crawledTitles.push(pTitle);
          }
        }
      } catch (e) {
        console.error(`/// ERROR RASTREANDO SUBPÁGINA: ${pageUrl} ///`, e);
      }
    }

    if (totalChunks > 0) {
      return NextResponse.json({ 
        success: true, 
        chunks: totalChunks,
        pagesCrawled: pagesToCrawl.length,
        titles: crawledTitles,
        message: `Se han mapeado ${totalChunks} segmentos de conocimiento de ${pagesToCrawl.length} páginas.`
      });
    } else {
      return NextResponse.json({ success: false, error: "El rastreo profundo no pudo extraer conocimiento válido del dominio." }, { status: 500 });
    }

  } catch (error: any) {
    console.error("/// CRITICAL CRAWLER ERROR ///", error);
    return NextResponse.json({ success: false, error: "Error fatal interno procesando la URL." }, { status: 500 });
  }
}
