import admin from "firebase-admin";

/**
 * STRATIX INTELLIGENCE — ALERT PULSE (V41.0)
 * Orquestación de notificaciones Push para eventos Élite (Hot Leads).
 */

if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || "{}");
    
    if (serviceAccount.project_id) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      console.log("/// FIREBASE ADMIN SDK: PULSO ACTIVADO ///");
    } else {
      console.warn("/// FIREBASE SDK ADVERTENCIA: No se detectó FIREBASE_SERVICE_ACCOUNT en el entorno. ///");
    }
  } catch (error) {
    console.error("/// FALLO EN INICIALIZACIÓN DE FIREBASE ADMIN ///", error);
  }
}

export const messaging = admin.apps.length ? admin.messaging() : null;

/**
 * Envía una notificación push a un dispositivo específico vía FCM (V42.0).
 */
export async function sendPushNotification(token: string, title: string, body: string, data: any = {}) {
  if (!messaging) return null;

  const message = {
    notification: { title, body },
    token: token,
    data: {
      ...data,
      click_action: "FLUTTER_NOTIFICATION_CLICK"
    }
  };

  try {
    const response = await messaging.send(message);
    console.log(`/// PUSH NOTIFICATION ENVIADA A TOKEN: ${response} ///`);
    return response;
  } catch (error) {
    console.error("/// FALLO EN PUSH NOTIFICATION (Token) ///", error);
    return null;
  }
}

/**
 * Envía una alerta instantánea al administrador sobre un nuevo Lead caliente.
 */
export async function sendHotLeadAlert(name: string, company: string, score: string) {
  if (!messaging) return null;

  const topic = "admin_alerts";
  const message = {
    notification: {
      title: `⚡ ¡NUEVO LEAD HOT DETECTADO!`,
      body: `${name} (${company || 'S/E'}) acaba de ser calificado como ${score} por Opal Logic.`,
    },
    data: {
      click_action: "FLUTTER_NOTIFICATION_CLICK",
      type: "HOT_LEAD",
      priority: "high"
    },
    topic: topic,
  };

  try {
    return await messaging.send(message);
  } catch (error) {
    console.error("/// FALLO EN ALERT PULSE ///", error);
    return null;
  }
}

export default admin;
