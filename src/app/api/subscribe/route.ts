import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.CONVERTKIT_API_KEY;
const API_SECRET = process.env.CONVERTKIT_API_SECRET;
const FORM_ID = process.env.CONVERTKIT_FORM_ID;

export async function POST(request: NextRequest) {
  try {
    const { email, name, firstName, tags } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email requerido" }, { status: 400 });
    }

    if (!API_KEY || !FORM_ID) {
      console.log("/// CONVERTKIT NO CONFIGURADO — usando Resend como fallback ///");
      return NextResponse.json({ status: "convertkit_not_configured", success: true });
    }

    const data = {
      api_key: API_KEY,
      email: email,
      first_name: name || firstName || "",
      tags: tags || [],
      form_id: FORM_ID,
    };

    const response = await fetch("https://api.convertkit.com/v3/forms/" + FORM_ID + "/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.error) {
      console.error("/// CONVERTKIT ERROR ///", result.error);
      return NextResponse.json({ error: result.error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: result });
  } catch (err) {
    console.error("/// ERROR EN CONVERTKIT API ///", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}