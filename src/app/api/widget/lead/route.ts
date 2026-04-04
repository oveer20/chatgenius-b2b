import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  // Service role client to bypass RLS for lead capture
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  );

  try {
    const body = await request.json();
    const { botId, name, email, whatsapp, phone, sessionId, company, ...metadata } = body;
    const finalWhatsApp = whatsapp || phone;

    if (!botId) {
      return NextResponse.json({ error: "botId is required" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("leads")
      .insert([
        { 
          bot_id: botId, 
          name, 
          email, 
          whatsapp: finalWhatsApp,
          session_id: sessionId,
          metadata: { ...metadata, company: company || body.company }
        }
      ])
      .select();

    if (error) throw error;

    // 2. Email Notifications
    try {
      let alertTo = process.env.NOTIFICATION_EMAIL || "stratixIntelligence@gmail.com";
      let botName = "Stratix Intelligence Landing";

      if (botId !== "demo") {
        const { data: bot } = await supabaseAdmin
          .from("bots")
          .select("name, email_alerts_to")
          .eq("id", botId)
          .single();
        
        if (bot?.email_alerts_to) alertTo = bot.email_alerts_to;
        if (bot?.name) botName = bot.name;
      }

      const { sendHotLeadAlert } = await import("@/lib/send-email");

      // 2a. Send Notification to the configured email
      await sendHotLeadAlert({
        to: alertTo,
        subject: `🎯 NUEVO LEAD CAPTURADO: ${name} (${company || 'Persona'})`,
        botName: botName,
        leadName: `${name} [${company || 'Empresa no provista'}]`,
        leadContact: email || finalWhatsApp || 'No provisto',
        intent: 'Lead de Venta (Directo)',
        summary: `Este lead acaba de completar el formulario estratégico. Empresa: ${company || 'No provista'}.`
      });

      // 2b. Send Lead Welcome Email
      if (email) {
        const { resend } = await import("@/lib/resend");
        await resend.emails.send({
          from: 'Stratix Intelligence <bienvenida@resend.dev>',
          to: email,
          subject: `🎁 Tu bienvenida a Stratix Intelligence`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #0f172a; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; background: #fff;">
              <h1 style="color: #D4AF37; text-align: center;">¡Hola ${name}! 👋</h1>
              <p style="font-size: 1.1rem; line-height: 1.6;">Gracias por confiar en <strong>Stratix Intelligence</strong>. Estás un paso más cerca de automatizar tu éxito comercial.</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://stratix-intelligence.vercel.app/" style="background: #000; color: #D4AF37; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 1rem; border: 1px solid #D4AF37;">📥 Conocer el Ecosistema</a>
              </div>

              <p style="color: #64748b; font-size: 0.9rem;">Pronto uno de nuestros arquitectos se pondrá en contacto contigo para tu diagnóstico personalizado.</p>
              <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
              <p style="text-align: center; color: #94a3b8; font-size: 0.8rem;">Stratix Intelligence — Architectural Strategic Intelligence.</p>
            </div>
          `
        });
      }
    } catch (e) {
      console.error("/// NOTIFICATION EMAIL ERROR ///", e);
    }

    // 3. Sync with Google Sheets (Phase 21)
    const sheetsWebhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (sheetsWebhook) {
      try {
        const { data: bot } = await supabaseAdmin
          .from("bots")
          .select("name")
          .eq("id", botId)
          .single();

        await fetch(sheetsWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            whatsapp: whatsapp || "No provisto",
            bot_name: bot?.name || "Stratix Bot"
          })
        });
      } catch (sheetsError) {
        console.error("/// GOOGLE SHEETS SYNC ERROR ///", sheetsError);
      }
    }

    return NextResponse.json({ success: true, lead: data ? data[0] : null });
  } catch (error: any) {
    console.error("/// LEAD API ERROR ///");
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
