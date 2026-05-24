import { NextRequest, NextResponse } from "next/server";

const PLANS = {
  starter: { name: "Starter", priceCop: 119000, features: ["1 Agente IA", "1,000 msgs/mes", "WhatsApp + Web"] },
  professional: { name: "Professional", priceCop: 329000, features: ["5 Agentes IA", "10,000 msgs/mes", "RAG Avanzado"] },
  enterprise: { name: "Enterprise", priceCop: 999000, features: ["Agentes Unlimited", "Mensajes Unlimited", "SLA Garantizado"] }
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { plan } = body;

    const planKey = plan?.toLowerCase() || "starter";

    // En modo demo, simular compra exitosa
    return NextResponse.json({ 
      url: `/dashboard?payment=success&plan=${planKey}`,
      message: "Demo: Compra simulada exitosamente"
    });

  } catch (error: any) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}