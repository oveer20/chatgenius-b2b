import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const body = rawBody ? JSON.parse(rawBody) : {};

      const { messages, systemPrompt: providedSystemPrompt, knowledgeBase: providedKnowledgeBase, model, botId } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Se requiere un array de mensajes válido" }, { status: 400 });
    }

    // Cargar configuración del bot si se proporciona botId
    let botSystemPrompt = providedSystemPrompt;
    let botKnowledgeBase = providedKnowledgeBase;
    
    if (botId && !botSystemPrompt) {
      try {
        const { data: bot } = await supabaseAdmin
          .from("bots")
          .select("system_prompt, knowledge_base, model")
          .eq("id", botId)
          .single();
        
        if (bot) {
          botSystemPrompt = bot.system_prompt || botSystemPrompt;
          botKnowledgeBase = bot.knowledge_base || botKnowledgeBase;
        }
      } catch (err) {
        console.error("/// ERROR CARGANDO BOT ///", err);
      }
    }

    // 1. RAG - Búsqueda de conocimiento (opcional, no bloqueante)
    let semanticContext = "";
    if (botId) {
      try {
        const lastUserMessage = messages[messages.length - 1].content;
        const { getEmbeddings: getGroqEmbeddings } = await import("@/lib/groq");
        const queryEmbedding = await getGroqEmbeddings(lastUserMessage);

        const { data: chunks, error: matchError } = await supabaseAdmin.rpc("match_document_chunks", {
          query_embedding: queryEmbedding,
          match_threshold: 0.5,
          match_count: 5,
          p_bot_id: botId
        });

        if (!matchError && chunks && chunks.length > 0) {
          semanticContext = chunks.map((c: any) => c.content).join("\n\n");
        }
      } catch {
        // Silencioso - RAG es opcional
      }
    }

    // Configuración del Promt Maestro de Élite
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
      1. Evalúa el INTERÉS del lead: Cold (curiosidad), Warm (interés técnico/específico), Hot (intención clara de compra/agendamiento).
      2. Clasifica el INTENTO: Sales, Support, Information, Technical, or Complaint.
      3. Al final de tu respuesta, SIEMPRE inserta este bloque JSON oculto:
        [[META:{"intent": "detected_intent", "score": "detected_score_name", "confidence": 0-100}]]
      
      IMPORTANTE: No menciones que eres una IA a menos que se te pregunte directamente. Responde con la precisión que un usuario de iPhone 16 Pro Max esperaría.
    `;

    // 2. Orquestación Estratégica Golden (V50.5: AI Orchestrator Unificado)
    const { getResilientChatResponse } = await import("@/lib/ai-orchestrator");
    const { text, provider } = await getResilientChatResponse(messages, fullSystemPrompt, model || "gemini");

    // 3. Extracción de Metadatos Opal Logic (V50.0)
    let intent = "Information";
    let score = "Cold";
    let cleanText = text;

    const metaMatch = text.match(/\[\[META:([\s\S]*?)\]\]/);
    if (metaMatch) {
      try {
        const meta = JSON.parse(metaMatch[1].trim());
        intent = meta.intent || intent;
        score = meta.score || score;
        cleanText = text.replace(/\[\[META:[\s\S]*?\]\]/, "").trim();
      } catch {
        // Fallback robusto para fallos de parseo de JSON inyectado por IA
        console.warn("/// ERROR PARSEO METADATOS — LÓGICA DE EMERGENCIA ACTIVA ///");
        if (text.toLowerCase().includes("vender") || text.toLowerCase().includes("comprar")) {
          intent = "Sales";
          score = "Hot";
        }
      }
    }

    return NextResponse.json({
      message: { role: "assistant", content: cleanText },
      analysis: {
        intent,
        score,
        provider,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error: any) {
    console.error("/// CHAT ERROR ///", error);
    return NextResponse.json({
      error: "Error en el servicio",
      details: error?.message || String(error),
      stack: error?.stack,
      message: {
        role: "assistant",
        content: "Hubo un problema. Por favor intenta más tarde."
      }
    });
  }
}