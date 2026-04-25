import { createHmac } from "crypto";

/**
 * STRATIX AI - Webhook Signature Verification
 * Verifica que los webhooks entrantes sean legítimos
 */

/**
 * Verifica la firma de webhooks de Stripe
 * @param payload - El cuerpo raw del webhook
 * @param signature - El header Stripe-Signature
 * @param secret - El webhook secret de Stripe
 */
export function verifyStripeSignature(
  payload: string | Buffer,
  signature: string,
  secret: string
): boolean {
  if (!signature || !secret) {
    console.warn("Stripe webhook verification: missing signature or secret");
    return false;
  }

  const parts = signature.split(",");
  let timestamp = "";
  let signatureValue = "";

  for (const part of parts) {
    const [key, value] = part.split("=");
    if (key === "t") {
      timestamp = value;
    } else if (key === "v1") {
      signatureValue = value;
    }
  }

  if (!timestamp || !signatureValue) {
    return false;
  }

  // Verificar timestamp (no más de 5 minutos)
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - parseInt(timestamp, 10)) > 300) {
    console.warn("Stripe webhook timestamp too old");
    return false;
  }

  // Crear el payload firmado
  const signedPayload = `${timestamp}.${payload}`;

  // Calcular HMAC
  const expectedSignature = createHmac("sha256", secret)
    .update(signedPayload)
    .digest("hex");

  // Comparar signatures
  return createHmac("sha256", secret)
    .update(signedPayload)
    .digest("hex") === signatureValue;
}

/**
 * Verifica la firma de webhooks de WhatsApp/Meta
 * @param signature - El header X-Hub-Signature-256
 * @param payload - El cuerpo raw del webhook
 * @param secret - El app secret de Meta
 */
export function verifyWhatsAppSignature(
  signature: string,
  payload: string | Buffer,
  secret: string
): boolean {
  if (!signature || !secret) {
    return false;
  }

  // Meta usa HMAC-SHA256
  const expectedSignature = createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  // El signature viene como "sha256=..."
  const providedSignature = signature.replace("sha256=", "");

  return expectedSignature === providedSignature;
}

/**
 * Verifica el token de verificación de WhatsApp (para setup inicial)
 * @param mode - El modo de verificación
 * @param token - El token recibido
 * @param verifyToken - Tu token de verificación configurado
 */
export function verifyWhatsAppWebhook(
  mode: string,
  token: string,
  verifyToken: string
): boolean {
  return mode === "subscribe" && token === verifyToken;
}
