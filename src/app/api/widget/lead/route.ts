import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendHotLeadAlert } from "@/lib/send-email";

/**
 * STRATIX INTELLIGENCE — LEAD GENERATION ENGINE (V6.5)
 * Implementación de captura estratégica con protección de grado empresarial.
 */

export async function POST(request: NextRequest) {
  // 1. Instanciación de Cliente con Service Role (Bypass RLS)
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  );

  try {
    const body = await request.json();
    const { name, email, phone, company, botId = "demo", sessionId, honey } = body;

    // 2. Protección Anti-Spam (Honeypot)
    if (honey && honey.length > 0) {
      console.warn("🛡️ Bloqueo Anti-Bot: Campo honey detectado con valor.");
      return NextResponse.json({ error: "Spam detectado" }, { status: 400 });
    }

    if (!name || !email) {
      return NextResponse.json({ error: "Nombre y Email son requeridos" }, { status: 400 });
    }

    // 3. Inserción Estratégica en Supabase
    const { data: lead, error } = await supabaseAdmin
      .from("leads")
      .insert([
        { 
          bot_id: botId === "demo" ? null : botId, // "demo" como fallback para la landing
          name, 
          email, 
          phone, 
          company,
          session_id: sessionId || "landing_direct",
          intent: "Sales Inquiry (Demo Form)",
          score: "Hot",
          metadata: { 
            source: "Landing Page Demo Form",
            captured_at: new Date().toISOString()
          }
        }
      ])
      .select()
      .single();

    if (error) {
      console.error("/// DATABASE INSERT ERROR ///", error);
      throw error;
    }

    // 4. Alerting System (Email de Alerta al Admin)
    try {
      const adminEmail = process.env.ADMIN_EMAIL || "josega95@gmail.com";
      
      await sendHotLeadAlert({
        to: adminEmail,
        subject: `🎯 NUEVO LEAD CALIENTE: ${name} (${company || 'S/E'})`,
        botName: "Stratix Landing AI",
        leadName: `${name} [${company || 'Empresa no provista'}]`,
        leadContact: `Email: ${email} | Tel: ${phone || 'No provisto'}`,
        intent: "Consulta Directa desde Landing",
        summary: `El prospecto ${name} ha mostrado interés directo en Stratix. Empresa: ${company || 'N/A'}.`
      });
    } catch (emailErr) {
      console.error("/// ALERT EMAIL SYSTEM ERROR ///", emailErr);
      // No bloqueamos la respuesta exitosa por un fallo en el envío de alerta
    }

    // 5. Respuesta Exitosa para el Frontend (Dispara Toast de Éxito)
    return NextResponse.json({ 
      success: true, 
      message: "Lead capturado con éxito", 
      leadId: lead.id 
    }, { status: 200 });

  } catch (error: any) {
    console.error("/// LEAD API CRITICAL ERROR ///", error);
    return NextResponse.json({ 
      error: "Error interno procesando el lead", 
      details: error.message 
    }, { status: 500 });
  }
}
