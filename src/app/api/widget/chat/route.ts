import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: NextRequest) {
  // Eliminamos definición local para usar el singleton de élite

  try {
    const rawBody = await request.text();
    const body = rawBody ? JSON.parse(rawBody) : {};
    const { messages, botId, sessionId } = body;

    if (!messages || !botId) {
      return NextResponse.json({ error: "Parámetros de conexión insuficientes" }, { status: 400 });
    }

    // --- PERSISTENCIA ESTRATÉGICA (Sesiones de Inteligencia) ---
    let chatId: string | null = null;
    if (sessionId) {
      const { data: existingChat } = await supabaseAdmin
        .from("chats")
        .select("id")
        .eq("session_id", sessionId)
        .eq("bot_id", botId)
        .single();

      if (existingChat) {
        chatId = existingChat.id;
      } else {
        const { data: newChat } = await supabaseAdmin
          .from("chats")
          .insert([{ session_id: sessionId, bot_id: botId }])
          .select()
          .single();
        if (newChat) chatId = newChat.id;
      }

      // Registro de interacción del usuario
      const lastUserMessage = messages[messages.length - 1];
      if (lastUserMessage?.role === 'user' && chatId) {
        await supabaseAdmin.from("messages").insert([{
          chat_id: chatId,
          role: 'user',
          content: lastUserMessage.content
        }]);
      }
    }

    // 1. Obtención del Activo IA y Perfil del Propietario
    const { data: bot, error: botError } = await supabaseAdmin
      .from("bots")
      .select("name, system_prompt, knowledge_base, user_id, email_alerts_to, model")
      .eq("id", botId)
      .single();

    if (botError || !bot) {
      return NextResponse.json({ error: "Activo IA no localizado en el núcleo" }, { status: 404 });
    }

    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("plan, messages_sent_this_month")
      .eq("id", bot.user_id)
      .single();

    const owner: { plan: string; messages_sent_this_month: number } = profile || { plan: 'free', messages_sent_this_month: 0 };

    // 2. Búsqueda de Conocimiento Estratégico (RAG)
    let semanticContext = "";
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
        semanticContext = chunks.map((c: { content: string }) => c.content).join("\n\n");
        // RAG chunks retrieved
      }
    } catch (err) {
      console.error("/// FALLO MOTOR RAG (Public) ///", err);
    }

    // 3. Validación de Cuotas de Servicio (SLA)
    const planLimits: Record<string, number> = {
      free: 100,
      starter: 500,
      pro: 5000,
      enterprise: 9999999
    };
    
    const userPlan = owner.plan || 'free';
    const messageLimit = planLimits[userPlan] || 100;

    if (owner.messages_sent_this_month >= messageLimit) {
      return NextResponse.json({
        message: {
          role: "assistant",
          content: `🤖 SISTEMA DE SEGURIDAD ACTIVADO:\nEl plan ${userPlan.toUpperCase()} de este Agente IA ha alcanzado su límite de memoria de ${messageLimit} interacciones. Por favor contacte al administrador y proporcione este mensaje para escalar la licencia.`
        }
      });
    }
    // 3. Arquitectura del Prompt de Élite
    const branding = owner.plan === 'enterprise'
      ? "MARCA BLANCA: Actúa como una solución interna propia de la empresa. No menciones proveedores externos."
      : "IDENTIDAD: Eres un asistente potenciado por la tecnología de Stratix AI.";

    const fullSystemPrompt = `
      NÚCLEO DE OPERACIÓN: Eres el asistente experto de la empresa: ${bot.name}.
      
      PERSONALIDAD Y TONO:
      ---
      ${bot.system_prompt || "Responde de forma ejecutiva, concisa y profesional."}
      ${branding}
      ---
      
      BASE DE CONOCIMIENTO (NÚCLEO DE CONFIANZA):
      ---
      CONTEXTO SEMÁNTICO (VECTORES):
      ${semanticContext || "No se encontró información específica en los documentos vectorizados."}

      CONOCIMIENTO ESTÁTICO:
      ${bot.knowledge_base || "No hay información adicional."}
      ---

      PROTOCOLOS DE INTELIGENCIA (OPAL LOGIC):
      1. ANALIZA EL LEAD (SCORE): Cold (curiosidad), Warm (interés técnico), Hot (listo para conversión/cierre).
      2. DETECTA EL INTENTO: Sales, Support, Information, Technical, or Complaint.
      3. METADATOS OBLIGATORIOS: Al final de cada respuesta, inserta:
         [[META:{"intent": "detected_intent", "score": "detected_score_name", "confidence": 0-100}]]
      
      REGLA MAESTRA: Tu conocimiento se limita ESTRICTAMENTE a la base proporcionada. Si no sabes la respuesta, ofrece contactar a un especialista humano.
    `;

    // 4. Orquestación del Núcleo de Inteligencia Dual (V23.0)
    const engineType = bot.model === 'openai' ? 'OPENAI' : 'GEMINI';
    // Dual engine widget triggered

    let responseText = "";
    try {
      if (engineType === 'OPENAI') {
        // OpenAI integration removed - using Gemini only
        throw new Error("OpenAI not configured");
      } else {
        const { getGeminiResponse } = await import("@/lib/gemini");
        const result = await getGeminiResponse(messages, fullSystemPrompt);
        responseText = typeof result === 'string' ? result : JSON.stringify(result);
      }
    } catch {
      return NextResponse.json({
        message: {
          role: "assistant",
          content: "⚠️ INTERRUPCIÓN TÉCNICA: El núcleo de IA no respondió. Por favor intente en unos segundos."
        }
      });
    }

    const text = responseText;

    // 5. Extracción de Inteligencia Opal
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

    // 6. Registro de Actividad y Actualización de Lead (CRM)
    await supabaseAdmin.rpc('increment_message_count', { user_uuid: bot.user_id });

    if (chatId) {
      await supabaseAdmin.from("messages").insert([{
        chat_id: chatId,
        role: 'assistant',
        content: cleanText
      }]);

      if (sessionId) {
        const { data: lead } = await supabaseAdmin
          .from("leads")
          .update({ intent, score, updated_at: new Date().toISOString() })
          .eq("session_id", sessionId)
          .select()
          .single();

        // 6.5 Alerta de Lead Caliente (ELITE ALERT TRIAD: Email + Push V25.0)
        if (score === 'Hot') {
           // A. Email Alert
           if (bot.email_alerts_to) {
              const { sendHotLeadAlert } = await import("@/lib/send-email");
              await sendHotLeadAlert({
                 to: bot.email_alerts_to,
                 subject: `🔥 WEB LEAD CALIENTE: ${lead?.name || 'Usuario'}`,
                 botName: bot.name,
                 leadName: lead?.name || 'Prospecto Web',
                 leadContact: lead?.email || lead?.phone || sessionId,
                 intent: intent,
                 summary: cleanText.substring(0, 300)
              });
           }

           // B. Push Notification (FCM V25.0)
           try {
              const { data: profile } = await supabaseAdmin
                .from("profiles")
                .select("fcm_token")
                .eq("id", bot.user_id)
                .single();

              if (profile?.fcm_token) {
                const { sendPushNotification } = await import("@/lib/firebase-admin");
                await sendPushNotification(
                  profile.fcm_token,
                  `🔥 ¡Lead Hot en la Web!`,
                  `${lead?.name || 'Un prospecto'} acaba de calificar como Hot.`
                );
              }
           } catch (pError) {
              console.error("/// FCM WIDGET PUSH ERROR ///", pError);
           }
        }
      }
    }

    return NextResponse.json({
      message: { role: "assistant", content: cleanText },
      analysis: { intent, score }
    });

  } catch {
    return NextResponse.json({ error: "Interrupción en el flujo de datos estratégicos." }, { status: 500 });
  }
}