import { NextRequest, NextResponse } from "next/server";
import { getGeminiResponse } from "@/lib/gemini";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const body = rawBody ? JSON.parse(rawBody) : {};

    const { messages, systemPrompt, knowledgeBase, model, temperature, botId } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Se requiere un array de mensajes válido" }, { status: 400 });
    }

    // 1. Búsqueda de Conocimiento Estratégico (RAG)
    let semanticContext = "";
    if (botId) {
      try {
        const lastUserMessage = messages[messages.length - 1].content;
        const { getEmbeddings } = await import("@/lib/gemini");
        const queryEmbedding = await getEmbeddings(lastUserMessage);

        const { data: chunks, error: matchError } = await supabaseAdmin.rpc("match_document_chunks", {
          query_embedding: queryEmbedding,
          match_threshold: 0.5,
          match_count: 5,
          p_bot_id: botId
        });

        if (!matchError && chunks) {
          semanticContext = chunks.map((c: any) => c.content).join("\n\n");
          console.log(`/// RAG: ${chunks.length} fragmentos recuperados para el bot ${botId}`);
        }
      } catch (err) {
        console.error("/// FALLO EN MOTOR RAG ///", err);
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
      ${knowledgeBase || "Utiliza tu base de conocimientos general con enfoque corporativo."}
      ---
      
      DIRECTRICES ESTRATÉGICAS:
      ${systemPrompt || "Ayuda al usuario a escalar su negocio con soluciones inteligentes."}

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
      } catch (e) {
        // Fallback robust para fallos de parseo de JSON inyectado por IA
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
    console.error("/// CRITICAL STRATIX API ERROR ///", error?.message || error);

    const isQuotaExceeded = error?.message?.includes("429") || error?.message?.includes("quota") || error?.toString()?.includes("429") || error?.message?.includes("429");

    if (isQuotaExceeded) {
      return NextResponse.json({
        message: {
          role: "assistant",
          content: "🛡️ Estamos experimentando alto volumen. ¿Podrías intentar de nuevo en unos segundos? Estoy aquí para ayudarte."
        }
      });
    }

    return NextResponse.json({
      message: {
        role: "assistant",
        content: "Gracias por tu mensaje. Para darte la mejor información, ¿me puedes contar más sobre lo que necesitas? Estoy listo para ayudarte con Stratix Intelligence."
      }
    });
  }
}