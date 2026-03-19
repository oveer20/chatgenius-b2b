import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16" as any,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { plan, email, userId } = body;

    const prices: Record<string, { priceId: string; amount: number; name: string }> = {
      starter: { priceId: process.env.STRIPE_PRICE_STARTER || "", amount: 49, name: "Stratix Pioneer Elite" },
      pro: { priceId: process.env.STRIPE_PRICE_PRO || "", amount: 99, name: "Stratix Professional" },
      enterprise: { priceId: process.env.STRIPE_PRICE_ENTERPRISE || "", amount: 249, name: "Stratix Enterprise" },
    };

    const selected = prices[plan];
    if (!selected) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: 'Stratix Suite',
              description: 'Acceso total a la Suite de Estrategia B2B (Pomelli, Stitch, Opal).',
            },
            unit_amount: selected.amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment", // Or "subscription" if recurring
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?canceled=true`,
      customer_email: email,
      client_reference_id: userId,
      metadata: {
        plan: plan,
        userId: userId,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("/// STRIPE ERROR ///", error);
    return NextResponse.json(
      { error: "Error creating Stripe session", details: error.message },
      { status: 500 }
    );
  }
}
