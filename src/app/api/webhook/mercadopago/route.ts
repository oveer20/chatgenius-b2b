import { NextRequest, NextResponse } from "next/server";
import { Payment } from "mercadopago";
import { client } from "@/lib/mercadopago";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("/// MERCADO PAGO WEBHOOK RECEIVED ///", body);

    // Mercado Pago sends 'action' and 'data.id'
    const { action, data } = body;

    if (action === "payment.created" || action === "payment.updated") {
      const paymentId = data.id;
      
      // 1. Get payment details from MP
      const payment = new Payment(client);
      const paymentDetails = await payment.get({ id: paymentId });
      
      console.log(`/// PAYMENT STATUS: ${paymentDetails.status} ///`);

      // 2. If approved, update user plan
      if (paymentDetails.status === "approved") {
        const userId = paymentDetails.external_reference;
        const planId = paymentDetails.additional_info?.items?.[0]?.id || "pro";

        if (userId) {
          console.log(`/// ACTIVATING PLAN ${planId} FOR USER ${userId} ///`);
          
          const { error } = await supabase
            .from("profiles")
            .update({ 
              plan: planId === "enterprise" ? "enterprise" : "growth",
              subscription_status: "active"
            })
            .eq("id", userId);

          if (error) {
            console.error("/// DATABASE UPDATE ERROR ///", error);
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
