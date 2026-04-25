import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  const status: any = {
    status: "ok",
    timestamp: new Date().toISOString(),
    services: {}
  };

  try {
    // Check Supabase
    const { data: bots, error } = await supabaseAdmin
      .from("bots")
      .select("id")
      .limit(1);
    status.services.supabase = !error ? "ok" : "error";

    // Check Gemini API Key exists
    status.services.gemini = process.env.GOOGLE_GEMINI_API_KEY ? "ok" : "missing";

    // Check WhatsApp
    status.services.whatsapp = process.env.WHATSAPP_ACCESS_TOKEN ? "ok" : "missing";

    // Check MercadoPago
    status.services.mercadopago = process.env.MP_ACCESS_TOKEN ? "ok" : "missing";

    // Check Firebase config
    status.services.firebase = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? "ok" : "missing";

  } catch (error) {
    console.error("/// HEALTH CHECK ERROR ///", error);
    status.status = "error";
  }

  return NextResponse.json(status);
}