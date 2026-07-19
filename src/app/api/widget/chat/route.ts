import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: NextRequest) {
  // Eliminamos definición local para usar el singleton de élite

  try {
    const rawBody = await request.text();
    const body = rawBody ? JSON.parse(rawBody) : {};
    const { messages, botId, sessionId, systemPrompt: clientPrompt, knowledgeBase: clientKnowledgeBase } = body;

    if (!messages) {
      return NextResponse.json({ error: "Parámetros de conexión insuficientes" }, { status: 400 });
    }

    // --- PERSISTENCIA ESTRATÉGICA (Sesiones de Inteligencia) ---
    let chatId: string | null = null;
    const resolvedBotId = botId && botId !== "demo" ? botId : null;
    if (sessionId) {
      const { data: existingChat } = await supabaseAdmin
        .from("chats")
        .select("id")
        .eq("session_id", sessionId)
        .is("bot_id", resolvedBotId)
        .maybeSingle();

      if (existingChat) {
        chatId = existingChat.id;
      } else {
        const { data: newChat } = await supabaseAdmin
          .from("chats")
          .insert([{ session_id: sessionId, bot_id: resolvedBotId }])
          .select()
          .maybeSingle();
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
    let botName = "Asesor Stratix";
    let botSystemPrompt = clientPrompt || "";
    let botKnowledgeBase = clientKnowledgeBase || "";
    let botUserId: string | null = null;
    let botEmailAlertsTo: string | null = null;
    let botModel = "gemini-2.0-flash";
    let owner: { plan: string; messages_sent_this_month: number } = { plan: 'free', messages_sent_this_month: 0 };

    if (botId && botId !== "demo") {
      const { data: bot, error: botError } = await supabaseAdmin
        .from("bots")
        .select("name, system_prompt, knowledge_base, user_id, email_alerts_to, model")
        .eq("id", botId)
        .single();

      if (!botError && bot) {
        botName = bot.name;
        botSystemPrompt = botSystemPrompt || bot.system_prompt || "";
        botKnowledgeBase = botKnowledgeBase || bot.knowledge_base || "";
        botUserId = bot.user_id;
        botEmailAlertsTo = bot.email_alerts_to;
        botModel = bot.model || "gemini-2.0-flash";

        const { data: profile } = await supabaseAdmin
          .from("profiles")
          .select("plan, messages_sent_this_month")
          .eq("id", botUserId)
          .single();

        if (profile) {
          owner = profile;
        }

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
      }
    }

    const fullSystemPrompt = `
      NÚCLEO DE OPERACIÓN: Eres el asistente experto de la empresa: ${botName}.
      
      PERSONALIDAD Y TONO:
      ---
      ${botSystemPrompt || "Responde de forma ejecutiva, concisa y profesional."}
      ---
      
      BASE DE CONOCIMIENTO (NÚCLEO DE CONFIANZA):
      ---
      ${botKnowledgeBase || "No hay información adicional configurada."}
      ---

      PROTOCOLOS DE INTELIGENCIA (OPAL LOGIC):
      1. ANALIZA EL LEAD (SCORE): Cold (curiosidad), Warm (interés técnico), Hot (listo para conversión/cierre).
      2. DETECTA EL INTENTO: Sales, Support, Information, Technical, or Complaint.
      3. METADATOS OBLIGATORIOS: Al final de cada respuesta, inserta:
         [[META:{"intent": "detected_intent", "score": "detected_score_name", "confidence": 0-100}]]
      
      REGLA MAESTRA: Tu conocimiento se limita ESTRICTAMENTE a la base proporcionada. Si no sabes la respuesta, ofrece contactar a un especialista humano.
    `;

    let responseText = "";
    try {
      const { getGeminiResponse } = await import("@/lib/gemini");
      const result = await getGeminiResponse(messages, fullSystemPrompt);
      responseText = typeof result === 'string' ? result : JSON.stringify(result);
    } catch (geminiErr) {
      console.error("/// GEMINI FALLO, FALLBACK A GROQ ///", geminiErr);
      try {
        const { getGroqResponse } = await import("@/lib/groq");
        const result = await getGroqResponse(messages, fullSystemPrompt);
        responseText = typeof result === 'string' ? result : JSON.stringify(result);
      } catch (groqErr) {
        console.error("/// GROQ TAMBIÉN FALLÓ ///", groqErr);
        try {
          const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              model: "gpt-4o-mini",
              messages: [
                { role: "system", content: fullSystemPrompt },
                ...messages.map((m: { role: string; content: string }) => ({
                  role: m.role === "assistant" ? "assistant" : "user",
                  content: m.content
                }))
              ],
              temperature: 0.7,
              max_tokens: 1000
            })
          });
          if (response.ok) {
            const data = await response.json();
            responseText = data.choices?.[0]?.message?.content || "";
          } else {
            throw new Error(`OpenAI error: ${response.status}`);
          }
        } catch (openAIErr) {
          console.error("/// OPENAI TAMBIÉN FALLÓ ///", openAIErr);
          return NextResponse.json({
            message: {
              role: "assistant",
              content: "⚠️ INTERRUPCIÓN TÉCNICA: El núcleo de IA no respondió. Por favor intente en unos segundos."
            }
          });
        }
      }
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
    if (botUserId) {
      await supabaseAdmin.rpc('increment_message_count', { user_uuid: botUserId });
    }

    if (chatId) {
      await supabaseAdmin.from("messages").insert([{
        chat_id: chatId,
        role: 'assistant',
        content: cleanText
      }]);

      if (sessionId) {
        const { data: currentLead } = await supabaseAdmin
          .from("leads")
          .select("id, name, email, whatsapp, metadata")
          .eq("session_id", sessionId)
          .maybeSingle();

        const lead = currentLead;
        if (lead) {
          const updatedMetadata = {
            ...(typeof lead.metadata === 'object' && lead.metadata !== null ? lead.metadata as Record<string, unknown> : {}),
            intent,
            score,
          };
          await supabaseAdmin
            .from("leads")
            .update({ metadata: updatedMetadata })
            .eq("id", lead.id);
        }

        // 6.5 Alerta de Lead Caliente (ELITE ALERT TRIAD: Email + Push V25.0)
        if (score === 'Hot') {
           // A. Email Alert
            if (botEmailAlertsTo) {
               const { sendHotLeadAlert } = await import("@/lib/send-email");
               await sendHotLeadAlert({
                  to: botEmailAlertsTo,
                  subject: `🔥 WEB LEAD CALIENTE: ${lead?.name || 'Usuario'}`,
                  botName: botName,
                  leadName: lead?.name || 'Prospecto Web',
                   leadContact: lead?.email || lead?.whatsapp || sessionId,
                  intent: intent,
                  summary: cleanText.substring(0, 300)
               });
            }

            // B. Push Notification (FCM V25.0)
            try {
               if (botUserId) {
                 const { data: profile } = await supabaseAdmin
                   .from("profiles")
                   .select("fcm_token")
                   .eq("id", botUserId)
                   .single();

                 if (profile?.fcm_token) {
                   const { sendPushNotification } = await import("@/lib/firebase-admin");
                   await sendPushNotification(
                     profile.fcm_token,
                     `🔥 ¡Lead Hot en la Web!`,
                     `${lead?.name || 'Un prospecto'} acaba de calificar como Hot.`
                   );
                 }
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