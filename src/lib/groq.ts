const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

const MAX_RETRIES = 3;

async function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getGroqResponse(messages: any[], systemPrompt: string) {
  let lastError: any;
  
  const chatMessages = messages.map((m: any) => ({
    role: m.role === "assistant" ? "assistant" : "user",
    content: m.content
  }));

  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      const response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            { role: "system", content: systemPrompt },
            ...chatMessages
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      });

      if (!response.ok) {
        const err = await response.text();
        throw new Error(`Groq API error: ${response.status} - ${err}`);
      }

      const data = await response.json();
      const text = data.choices?.[0]?.message?.content;
      
      if (!text || text.length < 2) {
        throw new Error("Respuesta vacía");
      }

      return text;
    } catch (error: any) {
      lastError = error;
      console.error(`/// FALLO EN GROQ (Intento ${i + 1}) ///`, error.message);
      
      if (error.message?.includes("429") || error.message?.includes("500")) {
        await wait(1000 * Math.pow(2, i));
        continue;
      }
      break; 
    }
  }
  
  throw new Error(`Fallo crítico: ${lastError?.message}`);
}

export async function getEmbeddings(_text: string) {
  void _text;
  return new Array(768).fill(0);
}