import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

/**
 * Endpoint de Verificación de Meta (GET)
 * Meta envía un GET a esta URL cuando configuras el webhook en Facebook Developer.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token) {
    // Buscar si existe algún bot con este Verify Token
    const { data: bot } = await supabaseAdmin
      .from("bots")
      .select("id")
      .eq("whatsapp_verify_token", token)
      .single();

    if (bot) {
      console.log("/// WHATSAPP WEBHOOK VERIFIED ///", token);
      // Meta exige que devolvamos solo el challenge (sin formato JSON) en texto plano
      return new NextResponse(challenge, { status: 200, headers: { 'Content-Type': 'text/plain' } });
    } else {
      console.log("/// WHATSAPP VERIFY FAILED: Token mismatch ///");
      return new NextResponse("Forbidden", { status: 403 });
    }
  }

  return new NextResponse("Bad Request", { status: 400 });
}

/**
 * Endpoint de Recepción de Mensajes de WhatsApp (POST)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 1. Validar que la estructura provenga de WhatsApp
    if (body.object === "whatsapp_business_account") {
      const entry = body.entry?.[0];
      const changes = entry?.changes?.[0];
      const value = changes?.value;
      
      // Si recibimos un estado de lectura o envío, no respondemos
      if (value?.statuses) {
        return NextResponse.json({ success: true, status: "ignored" });
      }

      const messages = value?.messages;

      if (messages && messages.length > 0) {
        const message = messages[0];
        const fromNumber = message.from; // Número del usuario
        const userName = value.contacts?.[0]?.profile?.name || "Usuario WP";
        const messageText = message.text?.body;
        
        const phoneNumberId = value.metadata?.phone_number_id;

        if (!messageText || !phoneNumberId) {
          return NextResponse.json({ success: true, status: "ignored_no_text" });
        }

        // 2. Identificar qué bot debe responder según el phoneNumberId receptor
        const { data: bot } = await supabaseAdmin
          .from("bots")
          .select("id, name, system_prompt, knowledge_base, user_id, whatsapp_token, email_alerts_to")
          .eq("whatsapp_phone_number_id", phoneNumberId)
          .single();

        if (!bot) {
          console.log(`/// WHATSAPP BOT NOT FOUND FOR PHONE ID: ${phoneNumberId} ///`);
          return NextResponse.json({ success: true, status: "bot_not_found" });
        }

        console.log(`/// MENSAJE ENTRANTE WHATSAPP [Bot: ${bot.name} | De: ${fromNumber}] ///`);

        // 2.5 Validación de Cuotas de Servicio
        const { data: profile } = await supabaseAdmin
          .from("profiles")
          .select("plan, messages_sent_this_month")
          .eq("id", bot.user_id)
          .single();

        const owner: any = profile || { plan: 'free', messages_sent_this_month: 0 };
        const planLimits: Record<string, number> = { free: 100, starter: 500, pro: 5000, enterprise: 9999999 };
        const userPlan = owner.plan || 'free';
        const messageLimit = planLimits[userPlan] || 100;

        if (owner.messages_sent_this_month >= messageLimit) {
           console.log(`/// WHATSAPP QUOTA EXCEEDED FOR BOT: ${bot.name} ///`);
           const { sendWhatsAppMessage } = await import("@/lib/whatsapp");
           if (bot.whatsapp_token) {
              await sendWhatsAppMessage(phoneNumberId, bot.whatsapp_token, fromNumber, `🤖 SISTEMA:\nEl servidor de inteligencia artificial ha alcanzado su límite operativo para el plan actual (${userPlan.toUpperCase()}). Por favor contacte al administrador.`);
           }
           return NextResponse.json({ success: true, status: "quota_exceeded" });
        }

        // 3. PERSISTENCIA ESTRATÉGICA (Sesión por Número de WhatsApp)
        let chatId: string | null = null;
        let chatMessages: any[] = [];
        
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
            
          if (history) chatMessages = history;
        } else {
          const { data: newChat } = await supabaseAdmin
            .from("chats")
            .insert([{ session_id: fromNumber, bot_id: bot.id }])
            .select()
            .single();
          if (newChat) chatId = newChat.id;
        }

        // Registrar mensaje del usuario
        if (chatId) {
          await supabaseAdmin.from("messages").insert([{ chat_id: chatId, role: 'user', content: messageText }]);
        }

        chatMessages.push({ role: "user", content: messageText });

        // 4. Búsqueda de Conocimiento Estratégico (RAG)
        let semanticContext = "";
        try {
          const { getEmbeddings } = await import("@/lib/gemini");
          const queryEmbedding = await getEmbeddings(messageText);

          const { data: chunks, error: matchError } = await supabaseAdmin.rpc("match_document_chunks", {
            query_embedding: queryEmbedding,
            match_threshold: 0.5,
            match_count: 5,
            p_bot_id: bot.id
          });

          if (!matchError && chunks) {
            semanticContext = chunks.map((c: any) => c.content).join("\n\n");
          }
        } catch (err) {
          console.error("/// FALLO MOTOR RAG (WhatsApp) ///", err);
        }

        // 5. Arquitectura del Prompt
        const fullSystemPrompt = `
          NÚCLEO DE OPERACIÓN: Eres el asistente experto de la empresa: ${bot.name}. Estás respondiendo a través de WhatsApp.
          
          PERSONALIDAD Y TONO:
          ---
          ${bot.system_prompt || "Responde de forma concisa, profesional y amigable."}
          ---
          
          BASE DE CONOCIMIENTO:
          ---
          CONTEXTO SEMÁNTICO:
          ${semanticContext || "No se encontró información."}

          CONOCIMIENTO ESTÁTICO:
          ${bot.knowledge_base || "No hay información adicional."}
          ---

          PROTOCOLOS OPAL:
          1. ANALIZA EL LEAD: Cold, Warm, Hot.
          2. DETECTA EL INTENTO: Ventas, Soporte, Info.
          3. METADATOS: Al final de tu respuesta, DEBES insertar exactamente:
             [[META:{"intent": "detected_intent", "score": "detected_score_name"}]]
        `;

        // 6. Generación con Gemini
        const { getGeminiResponse } = await import("@/lib/gemini");
        const rawAiResponse = await getGeminiResponse(chatMessages, fullSystemPrompt);

        // 7. Extracción de Inteligencia (Opal Logic)
        let intent = "Information";
        let score = "Cold";
        let cleanText = rawAiResponse;

        const metaMatch = rawAiResponse.match(/\[\[META:([\s\S]*?)\]\]/);
        if (metaMatch) {
          try {
            const meta = JSON.parse(metaMatch[1]);
            intent = meta.intent || intent;
            score = meta.score || score;
            cleanText = rawAiResponse.replace(/\[\[META:[\s\S]*?\]\]/, "").trim();
          } catch (e) {
            console.error("Error parseo Opal Meta WP:", e);
          }
        }

        // 8. Registro de Respueta y CRM (Leads)
        if (chatId) {
          await supabaseAdmin.from("messages").insert([{ chat_id: chatId, role: 'assistant', content: cleanText }]);
          await supabaseAdmin.rpc('increment_message_count', { user_uuid: bot.user_id });
          
          // Verificar si el lead ya existe para este bot
          const { data: existingLead } = await supabaseAdmin
            .from("leads")
            .select("id")
            .eq("session_id", fromNumber)
            .eq("bot_id", bot.id)
            .single();

          if (existingLead) {
            await supabaseAdmin.from("leads").update({ intent, score, name: userName, updated_at: new Date().toISOString() }).eq("id", existingLead.id);
          } else {
            await supabaseAdmin.from("leads").insert([{ 
              bot_id: bot.id, 
              session_id: fromNumber, 
              name: userName, 
              phone: fromNumber,
              intent, 
              score 
            }]);
          }

          // 8.5 Alerta de Lead Caliente (WhatsApp Elite Alert)
          if (score === 'Hot' && bot.email_alerts_to) {
            const { sendHotLeadAlert } = await import("@/lib/send-email");
            await sendHotLeadAlert({
               to: bot.email_alerts_to,
               subject: `🔥 WP LEAD CALIENTE: ${userName}`,
               botName: bot.name,
               leadName: userName,
               leadContact: fromNumber,
               intent: intent,
               summary: cleanText.substring(0, 300)
            });
          }
        }

        // 9. Enviar Respuesta Vía Meta Cloud API
        const { sendWhatsAppMessage } = await import("@/lib/whatsapp");
        if (bot.whatsapp_token) {
           await sendWhatsAppMessage(phoneNumberId, bot.whatsapp_token, fromNumber, cleanText);
        } else {
           console.error("/// FATAL: BOT DOES NOT HAVE WHATSAPP TOKEN ///");
        }

        return NextResponse.json({ success: true, status: "responded" });
      }
    }

    return new NextResponse("Not Found", { status: 404 });
  } catch (error) {
    console.error("/// WHATSAPP WEBHOOK CRITICAL ERROR ///", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
