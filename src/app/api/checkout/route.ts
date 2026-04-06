import { NextRequest, NextResponse } from "next/server";
import { Preference } from "mercadopago";
import { client } from "@/lib/mercadopago";
import { PRICING_PLANS, CURRENCIES } from "@/lib/constants";

/**
 * STRATIX INTELLIGENCE — CHECKOUT ENGINE (V3.0)
 * Sistema de pagos unificado con Mercado Pago para B2B.
 */

export async function POST(request: NextRequest) {
  try {
    // 1. Verificación de Configuración
    if (!process.env.MP_ACCESS_TOKEN || process.env.MP_ACCESS_TOKEN === "APP_USR-placeholder") {
      return NextResponse.json(
        { error: "Mercado Pago no configurado. Falta MP_ACCESS_TOKEN." },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { plan, email, userId } = body;

    if (!userId) {
      return NextResponse.json({ error: "Identificación de usuario (userId) requerida." }, { status: 400 });
    }

    // 2. Mapeo Dinámico desde Constants.ts
    // Mapeamos los slugs del frontend ('starter', 'pro', 'enterprise') a los objetos de PRICING_PLANS
    const planSlug = plan?.toLowerCase() || "starter";
    
    // Búsqueda del plan en las constantes (Starter, Business Pro, Enterprise)
    const planConfig = PRICING_PLANS.find(p => 
      p.name.toLowerCase().includes(planSlug.replace("starter", "starter").replace("pro", "business"))
    );

    if (!planConfig) {
      return NextResponse.json({ error: `Plan [${plan}] no encontrado en el ecosistema.` }, { status: 404 });
    }

    // 3. Cálculo de Precio en COP (Tasa 4000 por defecto de CURRENCIES)
    const COP_RATE = CURRENCIES.COP.rate || 4000;
    const finalPrice = Math.round(planConfig.priceUsd * COP_RATE);

    const preference = new Preference(client);
    
    // 4. Registro de Auditoría: Intención de Compra (V30.0)
    const { supabaseAdmin } = await import("@/lib/supabase-admin");
    await supabaseAdmin.from("audit_logs").insert([{
      user_id: userId,
      action: "CHECKOUT_STARTED",
      details: { plan: planSlug, amount: finalPrice }
    }]);

    // 5. Creación de la Preferencia de Pago con Tokenizado
    const result = await preference.create({
      body: {
        external_reference: `${userId}:${planSlug}`, // TOKEN COMPUESTO COMPATIBLE V30.0
        items: [
          {
            id: planSlug,
            title: `Stratix Intelligence — Plan ${planConfig.name}`,
            unit_price: finalPrice,
            quantity: 1,
            currency_id: "COP",
            description: `Acceso Premium al ecosistema Stratix (${planConfig.name})`
          },
        ],
        payer: {
          email: email || "usuario@stratix.ai",
        },
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard?payment=success`,
          failure: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/pricing?payment=error`,
          pending: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard?payment=pending`,
        },
        auto_return: "approved",
        notification_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/webhook/mercadopago`,
        metadata: {
          plan_name: planConfig.name,
          user_id: userId
        }
      },
    });

    // 6. Retorno del Punto de Inicio de Pago
    return NextResponse.json({ url: result.init_point }, { status: 200 });

  } catch (error: any) {
    console.error("/// MERCADO PAGO CHECKOUT ERROR ///", error);
    return NextResponse.json(
      { error: "Error en la pasarela de pagos", details: error.message },
      { status: 500 }
    );
  }
}
