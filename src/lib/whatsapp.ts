export async function sendWhatsAppMessage(
  phoneId: string,
  token: string,
  toLine: string,
  text: string
) {
  const url = `https://graph.facebook.com/v19.0/${phoneId}/messages`;
  
  const payload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: toLine,
    type: "text",
    text: { preview_url: false, body: text }
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("/// WHATSAPP SEND ERROR ///", JSON.stringify(data, null, 2));
      throw new Error("Fallo al enviar mensaje a Meta");
    }

    return data;
  } catch (error) {
    console.error("/// WHATSAPP SERVICE CRITICAL ///", error);
    throw error;
  }
}
