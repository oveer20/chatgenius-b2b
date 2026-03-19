import { NextRequest, NextResponse } from "next/server";
import openai from "@/lib/openai";
import { supabase } from "@/lib/supabase";

/**
 * WhatsApp Webhook for Stratix AI
 * This endpoint handles Meta (Facebook) webhook verification (GET)
 * and incoming messages (POST).
 */

// Meta Webhook Verification (GET)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  // This should match the 'Verify Token' you set in the Meta Developer Portal
  const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || "stratix_secret_token";

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("WhatsApp Webhook Verified!");
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse("Forbidden", { status: 403 });
}

// Handle Incoming Messages (POST)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.object === "whatsapp_business_account") {
      const entry = body.entry?.[0];
      const changes = entry?.changes?.[0];
      const value = changes?.value;
      const message = value?.messages?.[0];

      if (message) {
        const from = message.from; 
        const text = message.text?.body;
        const businessPhoneNumber = value.metadata?.display_phone_number;

        if (text) {
          // 1. Fetch bot by display phone number
          const { data: bot } = await supabase
            .from("bots")
            .select("*")
            .eq("whatsapp_phone_number", businessPhoneNumber)
            .single();

          if (!bot) {
             console.error(`No bot found for WhatsApp phone: ${businessPhoneNumber}`);
             return NextResponse.json({ status: "bot_not_found" });
          }

          // 2. Build AI Context (Opal Intelligence)
          const systemPrompt = `
            Eres un asistente de IA para la empresa: ${bot.name}.
            ---
            ${bot.system_prompt || "Responde de forma concisa."}
            ---
            INSTRUCCIONES DE ANALÍTICA (OPAL):
            Detecta el INTENTO del usuario: Sales, Support, Information, or Complaint.
            Detecta el SCORE (Interés): Cold, Warm, Hot.
            Al final de tu respuesta, SIEMPRE incluye: [[META:{"intent": "detected", "score": "detected"}]]
          `;

          const { getGeminiResponse } = await import("@/lib/gemini");
          const aiRawResponse = await getGeminiResponse([{ role: "user", content: text }], systemPrompt);

          // 3. Extract Meta & Clean Response
          let cleanText = aiRawResponse;
          let intent = "Information";
          let score = "Cold";

          const metaMatch = aiRawResponse.match(/\[\[META:([\s\S]*?)\]\]/);
          if (metaMatch) {
            try {
              const meta = JSON.parse(metaMatch[1]);
              intent = meta.intent || intent;
              score = meta.score || score;
              cleanText = aiRawResponse.replace(/\[\[META:[\s\S]*?\]\]/, "").trim();
            } catch (e) {}
          }

          // 4. Save Lead Intelligence
          await supabase.from("leads").upsert([{
            bot_id: bot.id,
            name: `WA_${from}`,
            whatsapp: from,
            intent,
            score
          }], { onConflict: 'whatsapp' });

          // 5. Send back to WhatsApp
          const WHATSAPP_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
          const PHONE_NUMBER_ID = value.metadata?.phone_number_id;

          if (WHATSAPP_TOKEN && PHONE_NUMBER_ID) {
            await fetch(`https://graph.facebook.com/v17.0/${PHONE_NUMBER_ID}/messages`, {
              method: "POST",
              headers: {
                "Authorization": `Bearer ${WHATSAPP_TOKEN}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                messaging_product: "whatsapp",
                to: from,
                type: "text",
                text: { body: cleanText },
              }),
            });
          }
        }
      }
      return NextResponse.json({ status: "success" });
    }
    return NextResponse.json({ status: "ignored" });
  } catch (error: any) {
    console.error("WhatsApp Webhook Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
