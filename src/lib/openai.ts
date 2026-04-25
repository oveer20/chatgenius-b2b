import OpenAI from "openai";

const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null;

/**
 * STRATIX INTELLIGENCE — OPENA.I CORE
 * Conector para GPT con failover.
 */
export async function getOpenAIResponse(messages: any[], systemPrompt: string, model: string = "gpt-3.5-turbo") {
  if (!openai) {
    throw new Error("OpenAI no configurado");
  }

  try {
    const chatMessages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
      { role: "system", content: systemPrompt },
      ...messages.map((m: any) => ({ 
        role: (m.role === "assistant" ? "assistant" : "user") as "user" | "assistant", 
        content: String(m.content) 
      }))
    ];

    const response = await openai.chat.completions.create({
      model: model,
      messages: chatMessages,
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.choices[0].message.content || "";
  } catch (error: any) {
    console.error("/// FALLO EN NÚCLEO OPENA.I ///", error);
    throw new Error("Fallo en la comunicación con OpenAI.");
  }
}