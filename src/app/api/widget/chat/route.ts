import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getGeminiResponse } from "@/lib/gemini";

// Public API for the chat widget
export async function POST(request: NextRequest) {
  // Service role client to bypass RLS for bot lookup
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  );

  try {
    const rawBody = await request.text();
    const body = rawBody ? JSON.parse(rawBody) : {};
    const { messages, botId, sessionId } = body;

    if (!messages || !botId) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    // --- SESSION & PERSISTENCE (Phase 23) ---
    let chatId: string | null = null;
    if (sessionId) {
      // 1. Check if chat exists
      const { data: existingChat } = await supabaseAdmin
        .from("chats")
        .select("id")
        .eq("session_id", sessionId)
        .eq("bot_id", botId)
        .single();

      if (existingChat) {
        chatId = existingChat.id;
      } else {
        // 2. Create new chat
        const { data: newChat } = await supabaseAdmin
          .from("chats")
          .insert([{ session_id: sessionId, bot_id: botId }])
          .select()
          .single();
        if (newChat) chatId = newChat.id;
      }

      // 3. Save User Message
      const lastUserMessage = messages[messages.length - 1];
      if (lastUserMessage && lastUserMessage.role === 'user' && chatId) {
        await supabaseAdmin.from("messages").insert([{
          chat_id: chatId,
          role: 'user',
          content: lastUserMessage.content
        }]);
      }
    }
    // ----------------------------------------

    // 1. Fetch bot from Supabase
    const { data: bot, error: botError } = await supabaseAdmin
      .from("bots")
      .select("name, system_prompt, knowledge_base, user_id")
      .eq("id", botId)
      .single();

    if (botError || !bot) {
      console.error("Error fetching bot for widget:", botError);
      return NextResponse.json({ error: "Bot not found" }, { status: 404 });
    }

    // 1b. Fetch owner profile separately
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("plan, messages_sent_this_month")
      .eq("id", bot.user_id)
      .single();

    const owner: any = profile || { plan: 'free', messages_sent_this_month: 0 };
    
    // 2. Check Plan Quotas (Phase 22)
    if (owner.plan === 'free' && owner.messages_sent_this_month >= 500) {
      return NextResponse.json({
        // System message to reset or confirm training
        message: {
          role: "system",
          content: `Eres el Asistente Estratégico de Stratix AI. Tu objetivo es ayudar a los usuarios basándote EXCLUSIVAMENTE en la información proporcionada. Si no sabes algo, responde cortésmente e invita a contactar a soporte humano: https://wa.me/573152597199`
        }
      });
    }

    // 3. Build the context-aware system prompt
    const branding = owner.plan === 'enterprise' 
      ? "\nMARCA DE AGUA: No mencionas a Stratix AI. Eres una solución 100% marca blanca."
      : "";

    const fullSystemPrompt = `
      Eres un asistente de IA experto para la empresa: ${bot.name}.
      
      INSTRUCCIONES DE PERSONALIDAD:
      ---
      ${bot.system_prompt || "Responde de forma concisa y profesional. Si no sabes algo, pide el correo para contactar después."}
      ${branding}
      ---
      
      BASE DE CONOCIMIENTO (CONFIANZA TOTAL):
      ---
      ${bot.knowledge_base || "No hay información adicional disponible."}
      ---

      INSTRUCCIONES PRO (OPAL STYLE):
      - Analiza la temperatura del lead (INTERÉS): Cold (poco interés), Warm (preguntas específicas), Hot (listo para comprar/agendar).
      - Detecta el INTENTO del usuario: Sales, Support, Information, Technical, or Complaint.
      - Al final de tu respuesta, SIEMPRE incluye un bloque JSON oculto con este formato exacto:
        [[META:{"intent": "detected_intent", "score": "detected_score_name", "confidence": 0-100}]]
      
      REGLA CRÍTICA: Responde ÚNICAMENTE basándote en la base de conocimiento y tus instrucciones de personalidad.
    `;

    if (!process.env.GOOGLE_GEMINI_API_KEY) {
       return NextResponse.json({
         message: {
           role: "assistant",
           content: "🚀 Stratix Demo: Configura tu GOOGLE_GEMINI_API_KEY para activar la IA en producción."
         }
       });
     }

    // 5. Get response from Gemini
    const text = await getGeminiResponse(messages, fullSystemPrompt);

    // 6. Extract Metadata Opal Style (Phase 25)
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
        console.error("Error parsing Opal Meta:", e);
      }
    }

    // 7. Increment message count
    await supabaseAdmin.rpc('increment_message_count', { user_uuid: bot.user_id });

    // 8. Save Assistant Message & Update Lead Intelligence (Pro)
    if (chatId) {
      await supabaseAdmin.from("messages").insert([{
        chat_id: chatId,
        role: 'assistant',
        content: cleanText
      }]);

      if (sessionId) {
        await supabaseAdmin
          .from("leads")
          .update({ intent, score })
          .eq("session_id", sessionId);
      }
    }

    return NextResponse.json({ 
      message: {
        role: "assistant",
        content: cleanText
      },
      analysis: { intent, score }
    });
  } catch (error: any) {
    console.error("Widget API error:", error);
    return NextResponse.json({ error: `Error de red: ${error.message}` }, { status: 500 });
  }
}
