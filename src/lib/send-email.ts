import { resend } from './resend';

interface EmailParams {
  to: string;
  subject: string;
  botName: string;
  leadName: string;
  leadContact: string;
  intent: string;
  summary: string;
}

export async function sendHotLeadAlert({
  to,
  subject,
  botName,
  leadName,
  leadContact,
  intent,
  summary
}: EmailParams) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Stratix Intelligence <alerts@onboarding.stratixintelligence.com>',
      to: [to],
      subject: subject || `🔥 NUEVO LEAD HOT: ${leadName}`,
      html: `
        <div style="font-family: 'Outfit', sans-serif; background-color: #060B14; color: #F8F9FA; padding: 50px; border-radius: 30px; border: 1px solid rgba(212, 175, 55, 0.3); max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #D4AF37; font-size: 28px; font-weight: 900; letter-spacing: -1px; margin-bottom: 10px;">STRATIX INTELLIGENCE</h1>
            <p style="color: #D4AF37; font-size: 10px; font-weight: 800; letter-spacing: 3px; text-transform: uppercase; margin-top: -5px; opacity: 0.8;">Protocolo de Alerta de Élite</p>
          </div>
          
          <p style="font-size: 1.1rem; opacity: 0.9; text-align: center; line-height: 1.6;">
            Tu activo de IA <strong style="color: #D4AF37;">${botName}</strong> ha calificado a un nuevo prospecto como <span style="background: rgba(212,175,55,0.1); color: #D4AF37; padding: 4px 10px; border-radius: 8px; font-weight: 900;">HOT 🔥</span>
          </p>
          
          <div style="background: rgba(255,255,255,0.03); padding: 30px; border-radius: 20px; margin: 40px 0; border: 1px solid rgba(212, 175, 55, 0.15);">
            <p style="margin: 8px 0; font-size: 14px;"><strong style="color: #D4AF37;">NOMBRE:</strong> ${leadName}</p>
            <p style="margin: 8px 0; font-size: 14px;"><strong style="color: #D4AF37;">CONTACTO:</strong> ${leadContact}</p>
            <p style="margin: 8px 0; font-size: 14px;"><strong style="color: #D4AF37;">INTENCIÓN:</strong> ${intent}</p>
            <hr style="border: 0.5px solid rgba(212, 175, 55, 0.1); margin: 25px 0;">
            <p style="margin: 0 0 10px 0; font-size: 12px; color: #D4AF37; font-weight: 800;">REPORTE DE INTELIGENCIA OPAL:</p>
            <p style="font-style: italic; opacity: 0.8; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 15px; border-left: 2px solid #D4AF37;">"${summary}"</p>
          </div>
          
          <p style="text-align: center; margin-top: 50px;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="background-color: #D4AF37; color: #060B14; padding: 18px 35px; text-decoration: none; border-radius: 12px; font-weight: 900; display: inline-block; letter-spacing: 0.5px; box-shadow: 0 10px 20px rgba(212,175,55,0.2);">VER EN EL NÚCLEO</a>
          </p>
          
          <p style="font-size: 11px; opacity: 0.3; text-align: center; margin-top: 60px; letter-spacing: 1px;">STRATIX AI — INFRAESTRUCTURA DE ALTO RENDIMIENTO</p>
        </div>
      `,
    });

    if (error) {
      console.error('/// ERROR ENVIANDO EMAIL ///', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('/// EXCEPCIÓN EMAIL ///', error);
    return { success: false, error };
  }
}

export async function sendWelcomePremiumEmail(to: string, plan: string) {
  const displayPlan = plan.toLowerCase().includes('enterprise') ? 'ENTERPRISE ELITE' : 'PROFESSIONAL PRO';
  
  try {
    const { data, error } = await resend.emails.send({
      from: 'Stratix Intelligence <onboarding@stratixintelligence.com>',
      to: [to],
      subject: `🛡️ BIENVENIDO A LA ÉLITE: PLAN ${displayPlan} ACTIVADO`,
      html: `
        <div style="font-family: 'Outfit', sans-serif; background-color: #060B14; color: #F8F9FA; padding: 60px; border-radius: 35px; border: 2px solid #D4AF37; max-width: 600px; margin: 0 auto; text-align: center;">
          <h1 style="color: #D4AF37; font-size: 36px; font-weight: 900; margin-bottom: 5px;">ESTRATO ÉLITE</h1>
          <p style="color: #D4AF37; font-size: 11px; font-weight: 800; letter-spacing: 5px; text-transform: uppercase; margin-bottom: 40px;">Subscription Protocol Verified</p>
          
          <p style="font-size: 1.3rem; opacity: 0.95; line-height: 1.7; margin-bottom: 40px;">
            Tu suscripción al plan <strong style="color: #D4AF37;">${displayPlan}</strong> ha sido procesada con éxito. Tu arquitectura de IA opera ahora bajo protocolos de alta disponibilidad.
          </p>
          
          <div style="background: rgba(212, 175, 55, 0.03); padding: 35px; border-radius: 25px; margin: 45px 0; border: 1px solid rgba(212, 175, 55, 0.2); text-align: left;">
            <p style="color: #D4AF37; font-weight: 900; font-size: 14px; margin-bottom: 25px; letter-spacing: 1px;">SIGUIENTES PASOS TÁCTICOS:</p>
            <ul style="padding: 0; list-style: none; color: rgba(248,249,250,0.85); font-size: 15px;">
              <li style="margin-bottom: 15px; display: flex; align-items: flex-start; gap: 10px;">🔸 Entra al <strong>Dashboard de Control</strong>.</li>
              <li style="margin-bottom: 15px; display: flex; align-items: flex-start; gap: 10px;">🔸 Sincroniza tus activos de <strong>WhatsApp & IG</strong>.</li>
              <li style="margin-bottom: 15px; display: flex; align-items: flex-start; gap: 10px;">🔸 Inyecta conocimiento vía <strong>Deep Crawl</strong>.</li>
            </ul>
          </div>
          
          <p style="margin-top: 60px;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="background: #D4AF37; color: #060B14; padding: 22px 45px; text-decoration: none; border-radius: 14px; font-weight: 900; display: inline-block; letter-spacing: 1px; box-shadow: 0 12px 25px rgba(212,175,55,0.25);">ACCEDER AL NÚCLEO</a>
          </p>
          
          <p style="font-size: 0.75rem; opacity: 0.3; margin-top: 80px;">Stratix Intelligence — Powering the Future of Enterprise IA.</p>
        </div>
      `,
    });
    return { success: !error, data, error };
  } catch (error) {
    return { success: false, error };
  }
}
