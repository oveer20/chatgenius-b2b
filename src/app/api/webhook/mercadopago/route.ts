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
    // Mercado Pago webhook received

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
      
      // Payment status check

      // 2. Si el pago está aprobado, activamos el plan premium
      if (paymentDetails.status === "approved") {
        // TOKEN COMPUESTO V30.0 (userId:planSlug)
        const metadata = paymentDetails.metadata || {};
        const userId = metadata.userId || paymentDetails.external_reference?.split(":")[0] || "";
        const mpPlanId = metadata.planSlug || paymentDetails.external_reference?.split(":")[1] || paymentDetails.additional_info?.items?.[0]?.id || "starter";

        // Mapeo estratégico de planes hacia la base de Datos (Normalización V39.0)
        const planMapping: Record<string, string> = {
          "starter": "growth",
          "pro": "growth", 
          "professional": "growth",
          "enterprise": "enterprise"
        };
        
        const finalPlan = planMapping[mpPlanId.toLowerCase()] || "growth";
        const emailPlanName = mpPlanId.toLowerCase() === "enterprise" ? "Enterprise" : "Professional Pro";

        if (userId) {
          // Activating plan for user
          
          // 3. Verificación de Perfil y Obtención de Datos de Onboarding
          const { data: profile } = await supabaseAdmin
            .from("profiles")
            .select("email, full_name")
            .eq("id", userId)
            .single();

          // 4. Actualización mediante Admin (Service Role)
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

          // 5. Registro de Auditoría de Pago (Élite Tracking)
          await supabaseAdmin.from("audit_logs").insert([{
            user_id: userId,
            action: "PAYMENT_SUCCESS",
            details: { payment_id: paymentId, gateway: "mercadopago", plan: finalPlan, amount: paymentDetails.transaction_amount }
          }]);
          
          // 6. Envío de Email de Bienvenida Premium (PULSE V36.0)
          if (profile?.email) {
            const { sendWelcomeEmail } = await import("@/lib/resend");
            await sendWelcomeEmail(profile.email, profile.full_name || "Líder Stratix", emailPlanName);
          }
          
          // Premium access activated
        }
      }
    }
    
    // Retornamos 200 siempre para que Mercado Pago deje de reintentar
    return NextResponse.json({ received: true, status: 200 });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("/// WEBHOOK CRITICAL ERROR ///", message);
    // Aunque falle el procesamiento interno, retornamos 200 para evitar spam de reintentos
    // pero logeamos el error para depuración manual.
    return NextResponse.json({ error: "Webhook manual review required", details: message }, { status: 200 });
  }
}
