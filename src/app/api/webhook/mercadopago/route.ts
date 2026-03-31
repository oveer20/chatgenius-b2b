import { NextRequest, NextResponse } from "next/server";
import { Payment } from "mercadopago";
import { client } from "@/lib/mercadopago";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("/// MERCADO PAGO WEBHOOK RECEIVED ///", body);

    // Mercado Pago envía 'action' y 'data.id'
    const { action, data } = body;

    if (action === "payment.created" || action === "payment.updated") {
      const paymentId = data?.id;
      if (!paymentId) return NextResponse.json({ received: true });

      // 1. Obtener detalles del pago desde MP
      const payment = new Payment(client);
      const paymentDetails = await payment.get({ id: paymentId });
      
      console.log(`/// PAYMENT ${paymentId} STATUS: ${paymentDetails.status} ///`);

      // 2. Si está aprobado, activar el plan
      if (paymentDetails.status === "approved") {
        const userId = paymentDetails.external_reference;
        const mpPlanId = paymentDetails.additional_info?.items?.[0]?.id || "pro";

        // Mapeo estratégico de planes (Normalización)
        const planMapping: Record<string, string> = {
          "starter": "growth",
          "pro": "growth", // O Pro si decides añadirlo
          "enterprise": "enterprise"
        };
        const finalPlan = planMapping[mpPlanId] || "growth";

        if (userId) {
          console.log(`/// ACTIVANDO PLAN ${finalPlan} PARA USUARIO ${userId} ///`);
          
          const { error } = await supabaseAdmin
            .from("profiles")
            .update({ 
              plan: finalPlan,
              subscription_status: "active",
              updated_at: new Date().toISOString()
            })
            .eq("id", userId);

          if (error) {
            console.error("/// ERROR ACTUALIZANDO PERFIL ///", error);
            throw error;
          }
        }
      }
    }
    
    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("/// WEBHOOK ERROR ///", error.message);
    return NextResponse.json({ error: "Webhook failed", details: error.message }, { status: 500 });
  }
}
