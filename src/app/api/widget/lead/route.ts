import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { sendHotLeadAlert } from "@/lib/send-email";

/**
 * STRATIX INTELLIGENCE — LEAD GENERATION ENGINE (V6.5.1)
 * Captura estratégica con blindaje total via Service Role.
 */

export async function POST(request: NextRequest) {

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
          bot_id: botId === "demo" ? null : botId,
          name, 
          email, 
          phone, 
          company,
          session_id: sessionId || "landing_direct",
          intent: "Sales Inquiry (Demo Form)",
          score: "Hot",
          source: "Landing Page Demo Form"
        }
      ])
      .select()
      .single();

    if (error) {
      console.error("/// DATABASE INSERT ERROR ///", error);
      throw error;
    }

    // 4. Multi-Channel Alerting System (Email & Firebase Pulse V41.0)
    try {
      const adminEmail = process.env.ADMIN_EMAIL || "josega95@gmail.com";
      
      // A. Alert Pulse (Push via Firebase)
      const { sendHotLeadAlert: sendFirebasePush } = await import("@/lib/firebase-admin");
      await sendFirebasePush(name, company || "Web Prospect", "HOT");

      // B. Email Alert (Resend)
      await sendHotLeadAlert({
        to: adminEmail,
        subject: `🎯 NUEVO LEAD CALIENTE: ${name} (${company || 'S/E'})`,
        botName: "Stratix Landing AI",
        leadName: `${name} [${company || 'Empresa no provista'}]`,
        leadContact: `Email: ${email} | Tel: ${phone || 'No provisto'}`,
        intent: "Consulta Directa desde Landing",
        summary: `El prospecto ${name} ha mostrado interés directo en Stratix. Empresa: ${company || 'N/A'}.`
      });
    } catch (alertErr) {
      console.error("/// ALERT SYSTEM ERROR ///", alertErr);
    }

    // 5. Respuesta Exitosa para el Frontend (Dispara Toast de Éxito)
    return NextResponse.json({ 
      success: true, 
      message: "Lead capturado con éxito", 
      leadId: lead.id 
    }, { status: 200 });

  } catch {
    return NextResponse.json({ 
      error: "Error interno procesando el lead"
    }, { status: 500 });
  }
}
