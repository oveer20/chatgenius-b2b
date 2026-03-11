import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2026-02-25.clover",
});

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === "sk_test_your-key-here") {
      return NextResponse.json(
        { error: "Stripe is not configured. Add your STRIPE_SECRET_KEY to .env.local" },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { plan, email } = body;

    const prices: Record<string, { amount: number; name: string; mode: "payment" | "subscription" }> = {
      pro: { amount: 4900, name: "ChatGenius Growth — Mensual", mode: "subscription" },
      enterprise: { amount: 19900, name: "ChatGenius Enterprise — Mensual", mode: "subscription" },
    };

    const selected = prices[plan];
    if (!selected) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: selected.name },
            unit_amount: selected.amount,
            ...(selected.mode === "subscription" ? { recurring: { interval: "month" } } : {}),
          },
          quantity: 1,
        },
      ],
      mode: selected.mode,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/builder?cancelled=true`,
      ...(email ? { customer_email: email } : {}),
    };

    const session = await stripe.checkout.sessions.create(sessionConfig);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
