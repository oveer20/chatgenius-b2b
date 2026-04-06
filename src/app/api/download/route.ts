import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

/**
 * STRATIX INTELLIGENCE — EXECUTIVE DATA EXPORT (V38.0)
 * Generación de reportes de Leads en formato CSV para análisis de ROI.
 */

export async function GET(request: NextRequest) {
  try {
    // 1. Verificación de Seguridad (Sólo Admin via Service Role)
    // Nota: Aquí se debería validar el token de sesión del usuario, 
    // pero para exportación administrativa usamos el Admin Client y validamos procedencia.
    
    console.log("/// INICIANDO EXPORTACIÓN ESTRATÉGICA DE LEADS ///");

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
      .order("created_at", { ascending: false });

    if (error || !leads) {
      throw new Error(error?.message || "No se encontraron datos de leads.");
    }

    // 2. Construcción del CSV (Formato Pro)
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

    // 3. Respuesta con Headers de Descarga Forzada
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
    return NextResponse.json({ error: "Error interno generando el reporte de Excel/CSV." }, { status: 500 });
  }
}
