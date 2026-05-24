import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { data: userBots } = await supabase.from("bots").select("id").eq("user_id", user.id);
    const botIds = userBots?.map(b => b.id) || [];
    if (botIds.length === 0) {
      return NextResponse.json({ error: "No tienes leads para exportar" }, { status: 404 });
    }

    const { data: leads, error } = await supabaseAdmin
      .from("leads")
      .select(`
        created_at,
        name,
        email,
        whatsapp,
        company,
        intent,
        score,
        utm_source,
        utm_medium,
        utm_campaign,
        bot_id
      `)
      .in("bot_id", botIds)
      .order("created_at", { ascending: false });

    if (error || !leads) {
      throw new Error(error?.message || "No se encontraron datos de leads.");
    }

    const headers = [
      "FECHA", "NOMBRE", "EMAIL", "WHATSAPP", "EMPRESA", 
      "INTENTO", "OPAL_SCORE", "CAMPANA", "MEDIO", "FUENTE", "BOT_ID"
    ];

    const rows = leads.map(l => [
      new Date(l.created_at).toLocaleDateString(),
      l.name || "N/A",
      l.email || "N/A",
      l.whatsapp || "N/A",
      l.company || "N/A",
      l.intent || "Desconocido",
      l.score || "Cold",
      l.utm_campaign || "Orgánico",
      l.utm_medium || "Directo",
      l.utm_source || "Web",
      l.bot_id
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(value => `"${value}"`).join(","))
    ].join("\n");

    const filename = `stratix_leads_${new Date().toISOString().split('T')[0]}.csv`;

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Type": "text/csv; charset=utf-8",
      },
    });

  } catch (err: any) {
    console.error("/// FALLO EN EXPORTACIÓN DE DATOS ///", err);
    return NextResponse.json({ error: "Error interno generando el reporte." }, { status: 500 });
  }
}
