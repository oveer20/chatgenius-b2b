import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { syncBotKnowledge } from "@/lib/rag";
import { createClient } from "@/utils/supabase/server";

export const runtime = 'nodejs';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: botId } = await params;
    const body = await request.json();
    const { url } = body;

    if (!botId) return NextResponse.json({ success: false, error: "Falta el ID del Activo IA." }, { status: 400 });
    if (!url || typeof url !== 'string' || !url.startsWith('http')) return NextResponse.json({ success: false, error: "URL inválida." }, { status: 400 });

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const { data: bot } = await supabase.from("bots").select("user_id").eq("id", botId).single();
    if (!bot || bot.user_id !== user.id) return NextResponse.json({ error: "No autorizado" }, { status: 403 });

    let html = "";
    try {
      const fetchResponse = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) StratixAI/1.0', 'Accept': 'text/html,application/xhtml+xml' },
      });
      if (!fetchResponse.ok) throw new Error(`HTTP Error: ${fetchResponse.status}`);
      html = await fetchResponse.text();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Unknown error";
      return NextResponse.json({ success: false, error: `No se pudo acceder a la página: ${message}` }, { status: 400 });
    }

    const $ = cheerio.load(html);
    const domain = new URL(url).hostname;
    const internalLinks: string[] = [];

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
          if (syncResult.success) { totalChunks += syncResult.chunks; crawledTitles.push(pTitle); }
        }
      } catch (e) {
        console.error(`/// ERROR RASTREANDO SUBPÁGINA: ${pageUrl} ///`, e);
      }
    }

    if (totalChunks > 0) {
      return NextResponse.json({ success: true, chunks: totalChunks, pagesCrawled: pagesToCrawl.length, titles: crawledTitles, message: `Se mapearon ${totalChunks} segmentos de conocimiento de ${pagesToCrawl.length} páginas.` });
    } else {
      return NextResponse.json({ success: false, error: "No se pudo extraer conocimiento válido del dominio." }, { status: 500 });
    }
  } catch (error) {
    console.error("/// CRITICAL CRAWLER ERROR ///", error);
    return NextResponse.json({ success: false, error: "Error fatal interno." }, { status: 500 });
  }
}
