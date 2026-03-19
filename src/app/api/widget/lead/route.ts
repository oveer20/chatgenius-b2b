import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  // Service role client to bypass RLS for lead capture
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  );

  try {
    const { botId, name, email, whatsapp, sessionId } = await request.json();

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
          whatsapp,
          session_id: sessionId
        }
      ])
      .select();

    if (error) throw error;

    // 2. Email Notifications
    try {
      const { data: bot } = await supabaseAdmin
        .from("bots")
        .select("name")
        .eq("id", botId)
        .single();

      const { resend } = await import("@/lib/resend");

      // 2a. Send Notification to Admin (You)
      await resend.emails.send({
        from: 'Stratix AI <notifications@resend.dev>',
        to: process.env.NOTIFICATION_EMAIL || 'admin@stratix-ai.vercel.app',
        subject: `🔥 Nuevo Lead Detectado - Stratix AI (vía ${bot?.name || 'Stratix'})`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #1e293b;">
            <h2 style="color: #3b82f6;">¡Tienes un nuevo prospecto! 🎊</h2>
            <p>Se ha capturado un nuevo lead a través de tu asistente de IA.</p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p><strong>👤 Nombre:</strong> ${name}</p>
            <p><strong>📧 Email:</strong> ${email}</p>
            <p><strong>📱 WhatsApp:</strong> ${whatsapp || 'No proporcionado'}</p>
            <p><strong>🤖 Agente:</strong> ${bot?.name || 'Stratix'}</p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://stratix-ai.vercel.app'}/dashboard" style="background: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 8px; font-weight: bold;">Ver en el Dashboard</a>
          </div>
        `
      });

      // 2b. Send Lead Magnet to the Lead (The "Wow" Factor) - Phase 22
      await resend.emails.send({
        from: 'Stratix AI <bienvenida@resend.dev>',
        to: email,
        subject: `🎁 Tu regalo de Bienvenida: Guía de IA para Negocios`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px;">
            <h1 style="color: #3b82f6; text-align: center;">¡Hola ${name}! 👋</h1>
            <p style="font-size: 1.1rem; line-height: 1.6;">Gracias por interesarte en <strong>Stratix AI</strong>. Como lo prometido es deuda, aquí tienes tu acceso a nuestra guía exclusiva para automatizar tu negocio con Inteligencia Artificial.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://stratix-ai.vercel.app/guia-ia-negocios.pdf" style="background: #3b82f6; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 1rem; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);">📥 Descargar Mi Guía Gratis</a>
            </div>

            <p style="color: #64748b; font-size: 0.9rem;">¿Sabías que un agente de IA puede reducir tus costos operativos en un 70%? Si quieres ver cómo Stratix puede ayudar a tu empresa específicamente, responde a este correo o agenda una llamada con nosotros.</p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="text-align: center; color: #94a3b8; font-size: 0.8rem;">Stratix AI — La arquitectura de inteligencia estratégica.</p>
          </div>
        `
      });
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
