import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";

/**
 * STRATIX INTELLIGENCE — STRIPE WEBHOOK (V3.3)
 * Automatización de derechos de acceso tras aprobación de pago internacional.
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
    // 1. Verificación de la Autenticidad del Evento
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err: any) {
    console.error(`/// WEBHOOK SIGNATURE VERIFICATION FAILED: ${err.message} ///`);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // 2. Procesamiento de Eventos de Stripe
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.client_reference_id || session.metadata?.userId;
        const planSlug = session.metadata?.plan || "starter";

        // Mapeo estratégico de planes hacia la base de Datos (Normalización)
        // constants.ts -> profiles.plan (free, growth, enterprise)
        const planMapping: Record<string, string> = {
          "starter": "growth",
          "pro": "growth",
          "enterprise": "enterprise"
        };
        
        const finalPlan = planMapping[planSlug.toLowerCase()] || "growth";

        if (userId) {
          console.log(`/// ACTIVANDO PLAN ${finalPlan.toUpperCase()} PARA USUARIO ${userId} ///`);
          
          // Actualización mediante Admin (Service Role) para saltar RLS
          const { error } = await supabaseAdmin
            .from("profiles")
            .update({ 
              plan: finalPlan,
              subscription_status: "active",
              updated_at: new Date().toISOString()
            })
            .eq("id", userId);

          if (error) {
            console.error("/// DATABASE UPDATE FAILED ///", error);
            throw error;
          }
          
          console.log(`/// ACCESO STRIPE ACTIVADO ÉXITO: Usuario ${userId} -> Plan ${finalPlan} ///`);
        }
        break;
      }

      default:
        console.log(`/// EVENTO STRIPE IGNORADO: ${event.type} ///`);
    }

    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error: any) {
    console.error("/// STRIPE WEBHOOK HANDLER ERROR ///", error.message);
    // Retornamos 400 para que Stripe reintente en caso de fallo real del handler
    return NextResponse.json({ error: "Webhook failed" }, { status: 400 });
  }
}
