import { NextRequest, NextResponse } from "next/server";
import { Payment } from "mercadopago";
import { client } from "@/lib/mercadopago";
import { supabaseAdmin } from "@/lib/supabase-admin";

/**
 * STRATIX INTELLIGENCE — MERCADO PAGO WEBHOOK (V3.1)
 * Automatización de derechos de acceso tras aprobación de pago.
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("/// MERCADO PAGO WEBHOOK RECEIVED ///", body);

    const { action, type, data } = body;

    // Solo procesamos pagos
    if (action === "payment.created" || action === "payment.updated" || type === "payment") {
      const paymentId = data?.id || body.data?.id;
      if (!paymentId) {
        return NextResponse.json({ received: true });
      }

      // 1. Obtener detalles reales del pago desde la API de Mercado Pago
      const payment = new Payment(client);
      const paymentDetails = await payment.get({ id: paymentId });
      
      console.log(`/// PAYMENT ${paymentId} STATUS: ${paymentDetails.status} ///`);

      // 2. Si el pago está aprobado, activamos el plan premium
      if (paymentDetails.status === "approved") {
        const userId = paymentDetails.external_reference; // Vinculación vía externa
        const mpPlanId = paymentDetails.additional_info?.items?.[0]?.id || "starter";

        // Mapeo estratégico de planes hacia la base de Datos (Normalización)
        // constants.ts -> profiles.plan (free, growth, enterprise)
        const planMapping: Record<string, string> = {
          "starter": "growth",
          "pro": "growth",
          "enterprise": "enterprise"
        };
        
        const finalPlan = planMapping[mpPlanId.toLowerCase()] || "growth";

        if (userId) {
          console.log(`/// ACTIVANDO PLAN ${finalPlan.toUpperCase()} PARA USUARIO ${userId} ///`);
          
          // Actualización mediante Admin (Service Role)
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
          
          console.log("/// ACCESO PREMUIM ACTIVADO CON ÉXITO ///");
        }
      }
    }
    
    // Retornamos 200 siempre para que Mercado Pago deje de reintentar
    return NextResponse.json({ received: true, status: 200 });

  } catch (error: any) {
    console.error("/// WEBHOOK CRITICAL ERROR ///", error.message);
    // Aunque falle el procesamiento interno, retornamos 200 para evitar spam de reintentos
    // pero logeamos el error para depuración manual.
    return NextResponse.json({ error: "Webhook manual review required", details: error.message }, { status: 200 });
  }
}
