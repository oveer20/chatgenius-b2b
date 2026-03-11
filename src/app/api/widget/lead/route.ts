import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { botId, name, email, whatsapp } = await request.json();

    if (!botId) {
      return NextResponse.json({ error: "botId is required" }, { status: 400 });
    }

    if (error) throw error;

    // Send email notification via Resend
    try {
      const { data: bot } = await supabase
        .from("bots")
        .select("name")
        .eq("id", botId)
        .single();

      const { resend } = await import("@/lib/resend");
      await resend.emails.send({
        from: 'ChatGenius <notifications@resend.dev>', // In production use a verified domain
        to: process.env.NOTIFICATION_EMAIL || 'admin@chatgenius.com',
        subject: `🚀 Nuevo Lead: ${name} (vía ${bot?.name || 'ChatGenius'})`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #1e293b;">
            <h2 style="color: #3b82f6;">¡Tienes un nuevo prospecto! 🎊</h2>
            <p>Se ha capturado un nuevo lead a través de tu asistente de IA.</p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p><strong>👤 Nombre:</strong> ${name}</p>
            <p><strong>📧 Email:</strong> ${email}</p>
            <p><strong>📱 WhatsApp:</strong> ${whatsapp || 'No proporcionado'}</p>
            <p><strong>🤖 Agente:</strong> ${bot?.name || 'ChatGenius'}</p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="background: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; borderRadius: 8px; fontWeight: bold;">Ver en el Dashboard</a>
          </div>
        `
      });
    } catch (e) {
      console.error("/// NOTIFICATION EMAIL ERROR ///", e);
      // Don't fail the request if email fails
    }

    return NextResponse.json({ success: true, lead: data[0] });
  } catch (error: any) {
    console.error("/// LEAD API ERROR ///");
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
