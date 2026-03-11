import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2026-02-25.clover",
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const sig = request.headers.get("stripe-signature");

    if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: "Missing signature or webhook secret" },
        { status: 400 }
      );
    }

    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("Payment successful for:", session.customer_email);
        // In production: Update user's plan in Supabase
        // await supabase.from('users').update({ plan: 'pro' }).eq('email', session.customer_email);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log("Subscription cancelled:", subscription.id);
        // In production: Downgrade user
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 400 }
    );
  }
}
