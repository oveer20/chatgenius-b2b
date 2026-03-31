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
      from: 'Stratix AI Alerts <alerts@resend.dev>', // Usar dominio verificado en prod
      to: [to],
      subject: subject || `🔥 NUEVO LEAD CALIENTE: ${leadName}`,
      html: `
        <div style="font-family: sans-serif; background-color: #060B14; color: white; padding: 40px; border-radius: 20px; border: 1px solid #D4AF37;">
          <h1 style="color: #D4AF37; margin-bottom: 20px;">🚀 ¡Stratix Detectó un Cliente Potencial!</h1>
          <p style="font-size: 1.1rem; opacity: 0.8;">Tu activo de IA <strong>${botName}</strong> ha calificado a un nuevo lead como <span style="color: #D4AF37; font-weight: bold;">HOT (Alta Probabilidad de Cierre)</span>.</p>
          
          <div style="background: rgba(255,255,255,0.05); padding: 25px; border-radius: 15px; margin: 30px 0;">
            <p style="margin: 5px 0;"><strong>Nombre:</strong> ${leadName}</p>
            <p style="margin: 5px 0;"><strong>Contacto:</strong> ${leadContact}</p>
            <p style="margin: 5px 0;"><strong>Intención:</strong> ${intent}</p>
            <p style="margin: 20px 0 5px 0;"><strong>Resumen de la IA:</strong></p>
            <p style="font-style: italic; opacity: 0.7; border-left: 2px solid #D4AF37; padding-left: 15px;">"${summary}"</p>
          </div>
          
          <p style="text-align: center; margin-top: 40px;">
            <a href="https://arsenex-ai.vercel.app/dashboard" style="background-color: #D4AF37; color: black; padding: 15px 30px; text-decoration: none; border-radius: 10px; font-weight: bold; display: inline-block;">VER EN EL DASHBOARD</a>
          </p>
          
          <p style="font-size: 0.8rem; opacity: 0.4; text-align: center; margin-top: 60px;">Stratix AI — Vende Más, Duerme Mejor.</p>
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
