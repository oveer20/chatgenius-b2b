import { NextRequest, NextResponse } from "next/server";
import openai from "@/lib/openai";
import { supabase } from "@/lib/supabase";

/**
 * WhatsApp Webhook for ChatGenius B2B
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
  const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || "chatgenius_secret_token";

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

    // Verify it's a message from WhatsApp
    if (body.object === "whatsapp_business_account") {
      const entry = body.entry?.[0];
      const changes = entry?.changes?.[0];
      const value = changes?.value;
      const message = value?.messages?.[0];

      if (message) {
        const from = message.from; // Phone number
        const text = message.text?.body;
        const businessPhoneNumberId = value.metadata?.display_phone_number; // Or phone_number_id

        console.log(`Received WhatsApp message from ${from}: ${text}`);

        if (text) {
          // 1. Identify which Bot this corresponds to
          // In a real scenario, you'd map the 'businessPhoneNumberId' to a specific Bot ID in your DB.
          // For now, we'll use Bot ID '1' as a default or fetch it from your DB.
          const botId = "1"; // Simplified for the engine

          const { data: bot } = await supabase
            .from("bots")
            .select("*")
            .eq("id", botId)
            .single();

          // 2. Process with AI (RAG)
          const systemPrompt = bot?.system_prompt || "Eres un asistente de IA útil.";
          // We could also fetch documents from knowledge base here...
          
          const completion = await openai.chat.completions.create({
            model: bot?.model || "gpt-4o",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: text }
            ],
          });

          const aiResponse = completion.choices[0].message.content;

          // 3. Send response back to WhatsApp
          // This requires a POST to Meta's Graph API
          const WHATSAPP_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
          const PHONE_NUMBER_ID = value.metadata?.phone_number_id;

          if (WHATSAPP_TOKEN && PHONE_NUMBER_ID && aiResponse) {
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
                text: { body: aiResponse },
              }),
            });
            console.log(`Response sent to WhatsApp: ${aiResponse}`);
          }
        }
      }
      return NextResponse.json({ status: "success" });
    }

    return NextResponse.json({ status: "not a whatsapp message" }, { status: 404 });
  } catch (error: any) {
    console.error("WhatsApp Webhook Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
