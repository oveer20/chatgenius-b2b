import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { sendWelcomeEmail } from "@/lib/resend";

/**
 * STRATIX INTELLIGENCE — UNIFIED STRIPE WEBHOOK (V35.0)
 * Procesamiento de Webhook con Token Identificador Compuesto (userId:plan)
 */

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16" as any,
});

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("/// CONFIG ERROR: Missing stripe-signature or STRIPE_WEBHOOK_SECRET ///");
    return NextResponse.json({ error: "Missing config" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err: any) {
    console.error(`/// WEBHOOK SIGNATURE VERIFICATION FAILED: ${err.message} ///`);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      
      // LOGIC: COMPOSITE TOKEN (userId:planSlug)
      // v30+ Activation Standard
      const refId = session.client_reference_id || "";
      const [userId, planSlugRaw] = refId.split(":");
      const planSlug = planSlugRaw || session.metadata?.plan || "starter";

      // Mapeo hacia la base de datos (Normalization)
      const planMapping: Record<string, string> = {
        "starter": "growth",
        "pro": "growth",
        "enterprise": "enterprise"
      };
      
      const finalPlan = planMapping[planSlug.toLowerCase()] || "growth";

      if (userId) {
        console.log(`/// ACTIVANDO IDENTIDAD COMPUESTA: Usuario ${userId} -> Plan ${finalPlan} ///`);
        
        // 1. Actualización de Perfil (RLS Bypass)
        const { data: profile, error } = await supabaseAdmin
          .from("profiles")
          .update({ 
            plan: finalPlan,
            subscription_status: "active",
            updated_at: new Date().toISOString()
          })
          .eq("id", userId)
          .select("email, full_name")
          .single();

        if (error) throw error;
        
        // 2. Auditoría Pulse
        await supabaseAdmin.from("audit_logs").insert([{
          user_id: userId,
          action: "PAYMENT_SUCCESS",
          details: { platform: "stripe", plan: finalPlan, sessionId: session.id }
        }]);

        // 3. Onboarding Pulse (Welcome Email)
        const userEmail = profile?.email || session.customer_details?.email || "";
        const userName = profile?.full_name || userEmail.split("@")[0];

        if (userEmail) {
          console.log(`/// DISPARANDO ONBOARDING EMAIL: ${userEmail} ///`);
          await sendWelcomeEmail(userEmail, userName, finalPlan);
        }
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error: any) {
    console.error("/// STRIPE WEBHOOK ERROR ///", error.message);
    return NextResponse.json({ error: "Webhook failed" }, { status: 400 });
  }
}
