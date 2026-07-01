import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const rawBody = await request.text();
    const body = rawBody ? JSON.parse(rawBody) : {};
    const { messages, systemPrompt: providedSystemPrompt, knowledgeBase: providedKnowledgeBase, model, botId } = body;

    if (!messages || !Array.isArray(messages)) return NextResponse.json({ error: "Se requiere un array de mensajes" }, { status: 400 });

    if (botId) {
      const { data: bot } = await supabase.from("bots").select("user_id").eq("id", botId).single();
      if (!bot || bot.user_id !== user.id) return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }

    let botSystemPrompt = providedSystemPrompt;
    let botKnowledgeBase = providedKnowledgeBase;

    if (botId && !botSystemPrompt) {
      try {
        const { data: bot } = await supabaseAdmin.from("bots").select("system_prompt, knowledge_base, model").eq("id", botId).single();
        if (bot) { botSystemPrompt = bot.system_prompt || botSystemPrompt; botKnowledgeBase = bot.knowledge_base || botKnowledgeBase; }
      } catch (err) { console.error("/// ERROR CARGANDO BOT ///", err); }
    }

    let semanticContext = "";
    if (botId) {
      try {
        const lastUserMessage = messages[messages.length - 1].content;
        const { getEmbeddings: getGroqEmbeddings } = await import("@/lib/groq");
        const queryEmbedding = await getGroqEmbeddings(lastUserMessage);
        const { data: chunks, error: matchError } = await supabaseAdmin.rpc("match_document_chunks", {
          query_embedding: queryEmbedding, match_threshold: 0.5, match_count: 5, p_bot_id: botId
        });
        if (!matchError && chunks && chunks.length > 0) semanticContext = chunks.map((c: { content: string }) => c.content).join("\n\n");
      } catch { /* RAG es opcional */ }
    }

    const fullSystemPrompt = `
      IDENTIDAD: Eres un Agente de Inteligencia Estratégica de Stratix AI. 
      TU TONO: Profesional, arquitectónico, ejecutivo y altamente resolutivo.
      
      BASE DE CONOCIMIENTO (NÚCLEO):
      ---
      CONTEXTO SEMÁNTICO (VECTORES):
      ${semanticContext || "No se encontró información específica en los documentos vectorizados."}
      CONOCIMIENTO ESTÁTICO (LEGACY):
      ${botKnowledgeBase || "Utiliza tu base de conocimientos general con enfoque corporativo."}
      ---
      DIRECTRICES ESTRATÉGICAS:
      ${botSystemPrompt || "Ayuda al usuario a escalar su negocio con soluciones inteligentes."}
      INSTRUCCIONES PRO (OPAL LOGIC):
      1. Evalúa el INTERÉS del lead: Cold, Warm, Hot.
      2. Clasifica el INTENTO: Sales, Support, Information, Technical, or Complaint.
      3. Al final de tu respuesta, SIEMPRE inserta este bloque JSON oculto:
        [[META:{"intent": "detected_intent", "score": "detected_score_name", "confidence": 0-100}]]
      IMPORTANTE: No menciones que eres una IA a menos que se te pregunte directamente.
    `;

    const { getResilientChatResponse } = await import("@/lib/ai-orchestrator");
    const { text, provider } = await getResilientChatResponse(messages, fullSystemPrompt);

    let intent = "Information"; let score = "Cold"; let cleanText = text;
    const metaMatch = text.match(/\[\[META:([\s\S]*?)\]\]/);
    if (metaMatch) {
      try {
        const meta = JSON.parse(metaMatch[1].trim());
        intent = meta.intent || intent; score = meta.score || score;
        cleanText = text.replace(/\[\[META:[\s\S]*?\]\]/, "").trim();
      } catch {
        if (text.toLowerCase().includes("vender") || text.toLowerCase().includes("comprar")) { intent = "Sales"; score = "Hot"; }
      }
    }

    return NextResponse.json({ message: { role: "assistant", content: cleanText }, analysis: { intent, score, provider, timestamp: new Date().toISOString() } });
  } catch (error: unknown) {
    console.error("/// CHAT ERROR ///", error);
    const details = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: "Error en el servicio", details, message: { role: "assistant", content: "Hubo un problema. Por favor intenta más tarde." } });
  }
}
