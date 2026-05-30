import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { sendWhatsAppMessage } from "@/lib/whatsapp";

/**
 * STRATIX INTELLIGENCE — WHATSAPP STRATEGIC HUB (V13.0)
 * Unificación de RAG, Memoria, Scoring y CRM para WhatsApp Business.
 */

// 1. Meta Webhook Verification (GET)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || "stratix_secret_token";

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    // WhatsApp webhook verified
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse("Forbidden", { status: 403 });
}

// 2. Handle Incoming Messages (POST)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.object === "whatsapp_business_account") {
      const entry = body.entry?.[0];
      const changes = entry?.changes?.[0];
      const value = changes?.value;
      const messages = value?.messages;

      // Ignorar actualizaciones de estado (leído, entregado)
      if (value?.statuses) return NextResponse.json({ status: "ignored_status" });

      if (messages && messages.length > 0) {
        const message = messages[0];
        const fromNumber = message.from; 
        const userName = value.contacts?.[0]?.profile?.name || "Cliente WP";
        const messageText = message.text?.body;
        const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID || "1048955904974001";

        if (!messageText || !phoneNumberId) return NextResponse.json({ status: "ignored_no_content" });

        // A. Identificar Bot por Número Receptor (Phone ID)
        let bot = null;
        
        if (phoneNumberId) {
          const { data: botByPhone } = await supabaseAdmin
            .from("bots")
            .select("*")
            .eq("whatsapp_phone_number_id", phoneNumberId)
            .single();
          bot = botByPhone;
        }
        
        // Fallback: usar último bot activo si no encuentra por phone_id
        if (!bot) {
          const { data: lastBot } = await supabaseAdmin
            .from("bots")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(1)
            .single();
          bot = lastBot;
        }

        if (!bot) {
          console.error(`/// BOT NOT FOUND FOR PHONE ID: ${phoneNumberId} ///`);
          return NextResponse.json({ status: "bot_not_found" });
        }

        // WhatsApp incoming message

        // A.1. Detección de Identidad Omnicanal (V36.0)
        let resolvedName = userName;
        let webLeadId: string | null = null;
        const idMatch = messageText.match(/\[STRATIX-ID:([\s\S]*?)\]/);
        
        if (idMatch) {
          const webSessionId = idMatch[1];
          const { data: webLead } = await supabaseAdmin
            .from("leads")
            .select("id, name, email, company")
            .eq("session_id", webSessionId)
            .single();
          
          if (webLead) {
            resolvedName = webLead.name || resolvedName;
            webLeadId = webLead.id;
            // VÍNCULO ESTRATÉGICO: Asociamos el número de WhatsApp al lead capturado en la web
            await supabaseAdmin.from("leads").update({ whatsapp: fromNumber }).eq("id", webLead.id);
            // Omnichannel identity linked
          }
        }

        // B. Persistencia de Historial (Memoria de Misión)
        let chatId: string | null = null;
        let chatHistory: any[] = [];
        
        const { data: existingChat } = await supabaseAdmin
          .from("chats")
          .select("id")
          .eq("session_id", fromNumber)
          .eq("bot_id", bot.id)
          .single();

        if (existingChat) {
          chatId = existingChat.id;
          const { data: history } = await supabaseAdmin
            .from("messages")
            .select("role, content")
            .eq("chat_id", chatId)
            .order("created_at", { ascending: true })
            .limit(10);
          if (history) chatHistory = history;
        } else {
          const { data: newChat } = await supabaseAdmin
            .from("chats")
            .insert([{ session_id: fromNumber, bot_id: bot.id }])
            .select()
            .single();
          if (newChat) chatId = newChat.id;
        }

        if (chatId) await supabaseAdmin.from("messages").insert([{ chat_id: chatId, role: 'user', content: messageText }]);
        chatHistory.push({ role: "user", content: messageText });

        // C. Búsqueda de Inteligencia (RAG Core)
        let knowledgeContext = "";
        try {
          const { getEmbeddings } = await import("@/lib/gemini");
          const queryEmbedding = await getEmbeddings(messageText);

          const { data: chunks } = await supabaseAdmin.rpc("match_document_chunks", {
            query_embedding: queryEmbedding,
            match_threshold: 0.5,
            match_count: 5,
            p_bot_id: bot.id
          });

          if (chunks) knowledgeContext = chunks.map((c: any) => c.content).join("\n\n");
        } catch (err) {
          console.error("/// FALLO MOTOR RAG (WhatsApp) ///", err);
        }

        // D. Arquitectura del Prompt Corporativo
        const fullSystemPrompt = `
          NÚCLEO ESTRATÉGICO: Eres el asesor experto de la empresa: ${bot.name}.
          CANAL: Estás respondiendo vía WhatsApp. Sé cortés pero directo.
          
          ADN DE MARCA:
          ---
          ${bot.system_prompt || "Responde de forma profesional."}
          ---
          
          CONOCIMIENTO RELEVANTE (RAG):
          ${knowledgeContext || "No se encontró información técnica específica."}

          DATOS ADICIONALES:
          ${bot.knowledge_base || ""}

          PROTOCOLOS OPAL LOGIC:
          1. ANALIZA AL PROSPECTO: Cold (Informativo), Warm (Interés), Hot (Venta).
          2. DETECTA EL INTENTO: Venta, Soporte, Info.
          3. METADATA: Obligatorio incluir al final: [[META:{"intent": "detected", "score": "detected"}]]
        `;

        // E. Generación IA & Extracción de Metadatos (V50.5: AI Orchestrator Unificado)
        const { getResilientChatResponse } = await import("@/lib/ai-orchestrator");
        const { text: rawAiResponse } = await getResilientChatResponse(chatHistory, fullSystemPrompt, bot.model || "gemini");

        let intent = "Information";
        let score = "Cold";
        let cleanResponse = rawAiResponse;

        const metaMatch = rawAiResponse.match(/\[\[META:([\s\S]*?)\]\]/);
        if (metaMatch) {
          try {
            const meta = JSON.parse(metaMatch[1]);
            intent = meta.intent || intent;
            score = meta.score || score;
            cleanResponse = rawAiResponse.replace(/\[\[META:[\s\S]*?\]\]/, "").trim();
          } catch (_e) {}
        }

        // F. Sincronización CRM (Leads System)
        if (chatId) {
          await supabaseAdmin.from("messages").insert([{ chat_id: chatId, role: 'assistant', content: cleanResponse }]);
          
          // SINCRO CRM EXTREMA: Intentamos buscar por Id de Sesión Web vinculada si no existe el número
          const { data: existingLead } = await supabaseAdmin
            .from("leads")
            .select("id")
            .or(`whatsapp.eq.${fromNumber},id.eq.${webLeadId || '00000000-0000-0000-0000-000000000000'}`)
            .eq("bot_id", bot.id)
            .single();

          if (existingLead) {
            await supabaseAdmin.from("leads").update({ 
              intent, 
              score, 
              name: resolvedName, 
              whatsapp: fromNumber, // Aseguramos el número
              updated_at: new Date().toISOString() 
            }).eq("id", existingLead.id);
          } else {
            await supabaseAdmin.from("leads").insert([{ 
              bot_id: bot.id, 
              session_id: fromNumber, 
              name: resolvedName, 
              whatsapp: fromNumber, 
              intent, 
              score 
            }]);
          }

          // Alerta Hot Lead vía Resend + Firebase Push
          if (score === 'Hot') {
            // A. Email Alert
            if (bot.email_alerts_to) {
              const { sendHotLeadAlert } = await import("@/lib/send-email");
              await sendHotLeadAlert({
                to: bot.email_alerts_to,
                subject: `🔥 WP LEAD CALIENTE: ${resolvedName}`,
                botName: bot.name,
                leadName: resolvedName,
                leadContact: fromNumber,
                intent: intent,
                summary: cleanResponse.substring(0, 300)
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
                  `🔥 ¡Lead Hot en WhatsApp!`,
                  `${resolvedName} de ${fromNumber} está listo para cerrar.`
                );
              }
            } catch (pError) {
              console.error("/// FCM PUSH ERROR ///", pError);
            }
          }
        }

        // G. Respuesta vía Meta Graph API
        const botToken = process.env.WHATSAPP_ACCESS_TOKEN || "";
        
        // Sending WhatsApp response
        
        let whatsappResult = null;
        if (botToken) {
           try {
             whatsappResult = await sendWhatsAppMessage(phoneNumberId, botToken, fromNumber, cleanResponse);
             // WhatsApp result logged
           } catch (err) {
             console.error(`=== WP Error: ${err} ===`);
           }
        }

        return NextResponse.json({ status: "success", whatsapp: whatsappResult });
      }
    }
    return NextResponse.json({ status: "ignored" });
  } catch (error: any) {
    console.error("/// WHATSAPP WEBHOOK CRITICAL ERROR ///", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
