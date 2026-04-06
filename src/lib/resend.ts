import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * STRATIX ONBOARDING PULSE (V35.0)
 * Envío de correo de bienvenida premium tras activación de suscripción.
 */
export async function sendWelcomeEmail(email: string, name: string, plan: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Stratix Intelligence <onboarding@stratixintelligence.com>',
      to: [email],
      subject: `¡Bienvenido al Élite de la IA, ${name}! 🛡️`,
      html: `
        <div style="background-color: #060B14; color: #F8F9FA; font-family: 'Outfit', sans-serif; padding: 40px; text-align: center; border-radius: 20px;">
          <h1 style="color: #D4AF37; font-size: 32px; font-weight: 800; letter-spacing: -0.02em;">STRATIX INTELLIGENCE</h1>
          <p style="color: #D4AF37; font-size: 10px; font-weight: 900; letter-spacing: 2px; margin-top: -10px;">ARCHITECTURAL STRATEGIC INTELLIGENCE</p>
          <hr style="border: 0.5px solid rgba(212,175,55,0.15); margin: 30px 0;">
          
          <p style="font-size: 18px; line-height: 1.6; color: #F8F9FA;">Hola <strong>${name}</strong>,</p>
          <p style="font-size: 16px; opacity: 0.7;">Tu acceso al ecosistema de inteligencia para el plan <span style="color: #D4AF37; font-weight: bold;">${plan.toUpperCase()}</span> ha sido activado exitosamente.</p>
          
          <div style="background: rgba(212,175,55,0.03); padding: 30px; border-radius: 15px; border: 1px solid rgba(212,175,55,0.15); margin: 40px 0;">
            <p style="color: #D4AF37; font-weight: 800; font-size: 16px; margin-bottom: 20px; letter-spacing: 1px;">PROTOCOLOS DE INICIO:</p>
            <ul style="text-align: left; line-height: 2.2; margin: 0 auto; max-width: 400px; font-size: 14px; color: rgba(248,249,250,0.8);">
              <li>🔹 Accede al <a href="https://stratixintelligence.com/dashboard" style="color: #D4AF37; text-decoration: none;">Núcleo de Control</a>.</li>
              <li>🔹 Conecta tu Activo de WhatsApp o Instagram.</li>
              <li>🔹 Inyecta conocimiento mediante PDF o URL.</li>
              <li>🔹 Activa tu Shield y empieza a escalar.</li>
            </ul>
          </div>

          <a href="https://stratixintelligence.com/dashboard" style="background: #D4AF37; color: #060B14; padding: 16px 32px; border-radius: 10px; text-decoration: none; font-weight: 900; display: inline-block;">INICIAR SESIÓN EN EL NÚCLEO</a>
          
          <p style="margin-top: 50px; font-size: 12px; opacity: 0.4;">
            &copy; 2026 Stratix Intelligence — Infraestructura de IA de Alto Rendimiento.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("/// RESEND ERROR ///", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error("/// DISPARADOR DE EMAIL FALLIDO ///", err);
    return { success: false, error: err };
  }
}
