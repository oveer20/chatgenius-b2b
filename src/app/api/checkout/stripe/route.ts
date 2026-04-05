import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PRICING_PLANS } from "@/lib/constants";

/**
 * STRATIX INTELLIGENCE — STRIPE CHECKOUT (V3.2)
 * Sistema de pagos internacionales con Stripe para el ecosistema B2B.
 */

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16" as any,
});

export async function POST(request: NextRequest) {
  try {
    // 1. Verificación de Configuración
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe no configurado. Falta STRIPE_SECRET_KEY." },
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

    // 3. Creación de la Sesión de Pago de Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Stratix Intelligence — ${planConfig.name}`,
              description: `Acceso Premium al ecosistema Stratix (${planConfig.name})`,
              images: ["https://stratix-intelligence.vercel.app/stratix_shield.svg"],
            },
            unit_amount: planConfig.priceUsd * 100, // Stripe usa centavos
          },
          quantity: 1,
        },
      ],
      mode: "payment", // "payment" para pago único, "subscription" para recurrente
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard?payment=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/pricing?payment=error`,
      customer_email: email,
      client_reference_id: userId,
      metadata: {
        plan: planSlug,
        userId: userId,
        planDisplayName: planConfig.name
      },
    });

    // 4. Retorno de la URL de sesión
    return NextResponse.json({ url: session.url }, { status: 200 });

  } catch (error: any) {
    console.error("/// STRIPE CHECKOUT ERROR ///", error);
    return NextResponse.json(
      { error: "Error en la pasarela de pagos de Stripe", details: error.message },
      { status: 500 }
    );
  }
}
