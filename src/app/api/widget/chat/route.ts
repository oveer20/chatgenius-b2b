import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getGeminiResponse } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  // Cliente administrativo para bypass de RLS en el ecosistema Stratix
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  );

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
      .select("name, system_prompt, knowledge_base, user_id")
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

    const owner: any = profile || { plan: 'free', messages_sent_this_month: 0 };

    // 2. Validación de Cuotas de Servicio (SLA)
    if (owner.plan === 'free' && owner.messages_sent_this_month >= 500) {
      return NextResponse.json({
        message: {
          role: "assistant",
          content: "SISTEMA: El límite de consultas gratuitas para este activo ha sido alcanzado. Contacte al administrador de Stratix para escalar el plan."
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
      ${bot.knowledge_base || "No hay información adicional. Limítate a funciones de asistencia general."}
      ---

      PROTOCOLOS DE INTELIGENCIA (OPAL LOGIC):
      1. ANALIZA EL LEAD (SCORE): Cold (curiosidad), Warm (interés técnico), Hot (listo para conversión/cierre).
      2. DETECTA EL INTENTO: Sales, Support, Information, Technical, or Complaint.
      3. METADATOS OBLIGATORIOS: Al final de cada respuesta, inserta:
         [[META:{"intent": "detected_intent", "score": "detected_score_name", "confidence": 0-100}]]
      
      REGLA MAESTRA: Tu conocimiento se limita ESTRICTAMENTE a la base proporcionada. Si no sabes la respuesta, ofrece contactar a un especialista humano.
    `;

    // 4. Procesamiento en el Núcleo Gemini
    if (!process.env.GOOGLE_GEMINI_API_KEY) {
      return NextResponse.json({
        message: {
          role: "assistant",
          content: "⚠️ ERROR DE NÚCLEO: Clave de IA no configurada. Contacte a Camilo Pascuas."
        }
      });
    }

    const text = await getGeminiResponse(messages, fullSystemPrompt);

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
        await supabaseAdmin
          .from("leads")
          .update({ intent, score, updated_at: new Date().toISOString() })
          .eq("session_id", sessionId);
      }
    }

    return NextResponse.json({
      message: { role: "assistant", content: cleanText },
      analysis: { intent, score }
    });

  } catch (error: any) {
    console.error("/// CRITICAL WIDGET API ERROR ///", error);
    return NextResponse.json({ error: "Interrupción en el flujo de datos estratégicos." }, { status: 500 });
  }
}