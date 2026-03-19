import { NextRequest, NextResponse } from "next/server";
import { Preference } from "mercadopago";
import { client } from "@/lib/mercadopago";

export async function POST(request: NextRequest) {
  try {
    // Check if Mercado Pago is configured
    if (!process.env.MP_ACCESS_TOKEN || process.env.MP_ACCESS_TOKEN === "APP_USR-placeholder") {
      return NextResponse.json(
        { error: "Mercado Pago is not configured. Add your MP_ACCESS_TOKEN to .env.local" },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { plan, email, userId } = body;

    // Plans in COP (Approximate conversion from USD)
    const prices: Record<string, { amount: number; name: string }> = {
      starter: { amount: 195000, name: "Stratix Pioneer Elite — Acceso Ecosistema" },
      pro: { amount: 395000, name: "Stratix Professional — Acceso Ecosistema" },
      enterprise: { amount: 995000, name: "Stratix Enterprise — Acceso Ecosistema" },
    };

    const selected = prices[plan];
    if (!selected) {
      return NextResponse.json({ error: "Plan inválido" }, { status: 400 });
    }

    const preference = new Preference(client);
    
    const result = await preference.create({
      body: {
        external_reference: userId, // CRITICAL: Link payment to user
        items: [
          {
            id: plan,
            title: selected.name,
            unit_price: selected.amount,
            quantity: 1,
            currency_id: "COP",
          },
        ],
        payer: {
          email: email || "usuario@ejemplo.com",
        },
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard?success=true`,
          failure: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/pricing?error=true`,
          pending: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard?pending=true`,
        },
        auto_return: "approved",
        notification_url: `${process.env.NEXT_PUBLIC_APP_URL || ""}/api/webhook/mercadopago`,
      },
    });

    return NextResponse.json({ url: result.init_point });
  } catch (error: any) {
    console.error("/// MERCADO PAGO ERROR ///", error);
    return NextResponse.json(
      { error: "Error al crear la preferencia de pago", details: error.message },
      { status: 500 }
    );
  }
}
