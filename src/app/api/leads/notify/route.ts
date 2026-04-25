import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email, name, phone, source } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email requerido" }, { status: 400 });
    }

    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%); padding: 30px; text-align: center;">
          <h1 style="color: #000; margin: 0;">🎯 Nuevo Lead Recibido</h1>
        </div>
        <div style="background: #0d1017; color: #f0f2f8; padding: 30px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                <strong style="color: #D4AF37;">📧 Email:</strong>
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                <a href="mailto:${email}" style="color: #f0f2f8;">${email}</a>
              </td>
            </tr>
            ${name ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                <strong style="color: #D4AF37;">👤 Nombre:</strong>
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">${name}</td>
            </tr>
            ` : ""}
            ${phone ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                <strong style="color: #D4AF37;">📱 Teléfono:</strong>
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                <a href="https://wa.me/${phone.replace(/\D/g, '')}" style="color: #25D366;">${phone}</a>
              </td>
            </tr>
            ` : ""}
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                <strong style="color: #D4AF37;">🌐 Fuente:</strong>
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">${source || "Landing Page"}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0;">
                <strong style="color: #D4AF37;">⏰ Fecha:</strong>
              </td>
              <td style="padding: 12px 0;">${new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" })}</td>
            </tr>
          </table>
          
          <div style="margin-top: 30px; text-align: center;">
            <a href="https://antigravity-mnkc6n1u0-oveer20s-projects.vercel.app/dashboard/leads" 
               style="background: #D4AF37; color: #000; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">
              Ver Leads →
            </a>
          </div>
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: "Stratix AI <onboarding@resend.dev>",
      to: ["stratixintelligence@gmail.com"],
      subject: `🎯 Nuevo lead: ${email}`,
      html: emailHtml,
    });

    if (error) {
      console.error("Error enviando email:", error);
      return NextResponse.json({ error: "Error enviando email" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Error en API de leads:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}