import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("/// MERCADO PAGO WEBHOOK RECEIVED ///", body);

    // TODO: Verify payment and update database (Subscription status)
    
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("/// WEBHOOK ERROR ///", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}
