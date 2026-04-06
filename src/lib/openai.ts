import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * STRATIX INTELLIGENCE — OPENAI CORE (V16.0)
 * Conector Maestro para GPT-4o optimizado para Opal Logic.
 */
export async function getOpenAIResponse(messages: any[], systemPrompt: string, model: string = "gpt-4o") {
  try {
    const response = await openai.chat.completions.create({
      model: model,
      messages: [
        { role: "system", content: systemPrompt } as const,
        ...messages.map((m: any) => ({
          role: (m.role === "assistant" ? "assistant" : "user") as "assistant" | "user",
          content: m.content
        }))
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return response.choices[0].message.content || "";
  } catch (error: any) {
    console.error("/// FALLO EN NÚCLEO OPENAI ///", error);
    throw new Error("Fallo en la comunicación con el núcleo de OpenAI.");
  }
}

export default openai;
