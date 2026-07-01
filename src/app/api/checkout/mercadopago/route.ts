import { NextRequest, NextResponse } from "next/server";
import { Preference } from "mercadopago";
import { MercadoPagoConfig } from "mercadopago";
import { PRICING_PLANS, CURRENCIES } from "@/lib/constants";
import { createClient } from "@/utils/supabase/server";

function getMpClient() {
  const key = process.env.MP_ACCESS_TOKEN;
  if (!key) throw new Error("MP_ACCESS_TOKEN not configured");
  return new MercadoPagoConfig({ accessToken: key, options: { timeout: 5000 } });
}

export async function POST(request: NextRequest) {
  const client = getMpClient();
  try {
    const { slug, currency = "USD" } = await request.json();

    // 1. Obtener datos del usuario (Auth Check)
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // 2. Identificar el Plan y Precio
    const plan = PRICING_PLANS.find(p =>
      p.tier === slug ||
      p.name.toLowerCase() === slug?.toLowerCase() ||
      (slug === 'pro' && p.tier === 'escala') ||
      (slug === 'enterprise' && p.tier === 'domina') ||
      (slug === 'starter' && p.tier === 'inicia')
    );

    if (!plan) {
      return NextResponse.json({ error: "Plan no encontrado" }, { status: 400 });
    }

    // 3. Calcular Precio (Conversión dinámica COP/USD)
    const rate = currency === "COP" ? CURRENCIES.COP.rate : 1;
    const finalPrice = plan.priceUsd * rate;

    // 4. Crear Preferencia en Mercado Pago
    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: [
          {
            id: slug,
            title: `Stratix Intelligence — Plan ${plan.name}`,
            quantity: 1,
            unit_price: finalPrice,
            currency_id: currency
          }
        ],
        payer: {
          email: user.email
        },
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
          failure: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?error=payment_failed`,
          pending: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?status=pending`
        },
        auto_return: "approved",
        notification_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhook/mercadopago`,
        metadata: {
          userId: user.id,
          planSlug: slug,
          planName: plan.name
        }
      }
    });

    return NextResponse.json({ 
      id: result.id, 
      init_point: result.init_point 
    });

  } catch (error: unknown) {
    console.error("/// MERCADO PAGO ERROR ///", error);
    const details = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ 
      error: "Error procesando el pago con Mercado Pago", 
      details
    }, { status: 500 });
  }
}
