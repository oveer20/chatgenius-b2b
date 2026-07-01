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

  } catch (error: unknown) {
    console.error("Checkout error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}