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

    // Verificación de Seguridad de la Llave
    if (!process.env.GOOGLE_GEMINI_API_KEY) {
      return NextResponse.json({
        message: {
          role: "assistant",
          content: "⚠️ Sincronización fallida: Falta la llave maestra de Google en el servidor. Contacta a Camilo Pascuas."
        }
      });
    }

    const { getGeminiResponse } = await import("@/lib/gemini");
    const text = await getGeminiResponse(messages, fullSystemPrompt);

    // Extracción de Metadatos Opal Logic
    let intent = "Information";
    let score = "Cold";
    let cleanText = text;

    const metaMatch = text.match(/\[\[META:([\s\S]*?)\]\]/);
    if (metaMatch) {
      try {
        const meta = JSON.parse(metaMatch[1]);
        intent = meta.intent || intent;
        score = meta.score || score;
        cleanText = text.replace(/\[\[META:[\s\S]*?\]\]/, "").trim();
      } catch (e) {
        console.error("Error en el parseo de Opal Meta:", e);
      }
    }

    return NextResponse.json({
      message: {
        role: "assistant",
        content: cleanText
      },
      analysis: {
        intent,
        score,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error: any) {
    console.error("/// CRITICAL STRATIX API ERROR ///");

    const isQuotaExceeded = error.message?.includes("429") || error.message?.includes("quota") || error.toString().includes("429");

    if (isQuotaExceeded) {
      return NextResponse.json({
        message: {
          role: "assistant",
          content: "🤖 El núcleo de procesamiento está al máximo de su capacidad. Por favor, espera 10 segundos mientras reequilibramos la carga estratégica."
        }
      });
    }

    return NextResponse.json(
      { error: "El motor de IA está en mantenimiento preventivo. Intenta en un momento." },
      { status: 500 }
    );
  }
}