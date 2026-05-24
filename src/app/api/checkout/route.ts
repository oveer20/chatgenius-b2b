import { NextRequest, NextResponse } from "next/server";

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