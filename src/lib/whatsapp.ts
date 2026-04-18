import { getGeminiResponse } from "./gemini";
import { supabaseAdmin } from "./supabase-admin";

export async function sendWhatsAppMessage(
  phoneId: string,
  token: string,
  toLine: string,
  text: string
) {
  const url = `https://graph.facebook.com/v19.0/${phoneId}/messages`;
  
  const payload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: toLine,
    type: "text",
    text: { preview_url: false, body: text }
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("/// WHATSAPP SEND ERROR ///", error);
    throw error;
  }
}

/**
 * WHATSAPP NEURAL RELAY (V47.0)
 * Procesa mensajes entrantes, consulta RAG y califica leads.
 */
export async function handleWhatsAppWebhook(
  phoneId: string, 
  token: string, 
  from: string, 
  msg: string, 
  botId: string
) {
  try {
    // 1. Obtener contexto del Bot
    const { data: bot } = await supabaseAdmin
      .from('bots')
      .select('*')
      .eq('id', botId)
      .single();

    if (!bot) return;

    // 2. Ejecutar Lógica Neural de Stratix
    const userPrompt = `Mensaje de WhatsApp de ${from}: "${msg}"`;
    const systemPrompt = `
      ${bot.system_prompt}
      ESTILO WHATSAPP: Sé corto, usa emojis estratégicos, no hagas listas largas.
      TU OBJETIVO: Cerrar una cita o capturar el interés total.
    `;

    const aiResponse = await getGeminiResponse([{ role: "user", content: userPrompt }], systemPrompt);

    // 3. Enviar Respuesta
    await sendWhatsAppMessage(phoneId, token, from, aiResponse);

    // 4. Opal Lead Scoring (Análisis de intención rápido)
    if (msg.length > 10) {
      const intentCheck = await getGeminiResponse(
        [{ role: "user", content: `Analiza este mensaje: "${msg}". ¿Hay intención de compra? Responde solo: HOT, WARM o COLD.` }],
        "Eres un analista de intención de ventas B2B infalible."
      );

      // Sincronizar Lead en Supabase
      await supabaseAdmin.from('leads').upsert({
        whatsapp: from,
        bot_id: botId,
        score: intentCheck.trim().replace('.', ''),
        intent: msg.substring(0, 100),
        source: 'whatsapp'
      }, { onConflict: 'whatsapp,bot_id' });
    }

  } catch (error) {
    console.error("/// WHATSAPP NEURAL RELAY FAIL ///", error);
  }
}
