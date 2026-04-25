import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import OpenAI from "openai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");
const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

const MAX_RETRIES = 3;
const INITIAL_DELAY = 1000;

async function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function callOpenAI(messages: any[], systemPrompt: string) {
  if (!openai) throw new Error("OpenAI no disponible");

  const openAIMessages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
    { role: "system", content: systemPrompt },
    ...messages.map((m: any) => ({ 
      role: (m.role === "assistant" ? "assistant" : "user") as "user" | "assistant", 
      content: String(m.content) 
    }))
  ];

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: openAIMessages,
    max_tokens: 500,
    temperature: 0.7,
  });

  console.log("/// RESPUESTA DESDE: OPENA.I GPT-3.5 ///");
  return response.choices[0]?.message?.content || "Disculpa, no pude generar una respuesta.";
}

async function callGroq(messages: any[], systemPrompt: string) {
  if (!process.env.GROQ_API_KEY) throw new Error("Groq no disponible");

  const { Groq } = await import("groq-sdk");
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const groqMessages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
    { role: "system", content: systemPrompt },
    ...messages.map((m: any) => ({ 
      role: (m.role === "assistant" ? "assistant" : "user") as "user" | "assistant", 
      content: String(m.content) 
    }))
  ];

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: groqMessages,
    max_tokens: 500,
    temperature: 0.7,
  });

  console.log("/// RESPUESTA DESDE: GROQ LLAMA-3 ///");
  return response.choices[0]?.message?.content || "Disculpa, no pude generar una respuesta.";
}

async function callMistral(messages: any[], systemPrompt: string) {
  if (!process.env.MISTRAL_API_KEY) throw new Error("Mistral no disponible");

  const { Mistral } = await import("@mistralai/mistralai");
  const client = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });

  const mistralMessages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
    { role: "system", content: systemPrompt },
    ...messages.map((m: any) => ({ 
      role: (m.role === "assistant" ? "assistant" : "user") as "user" | "assistant", 
      content: String(m.content) 
    }))
  ];

  const response = await client.chat.complete({
    model: "mistral-small-latest",
    messages: mistralMessages,
    maxTokens: 500,
  });

  console.log("/// RESPUESTA DESDE: MISTRAL ///");
  return response.choices?.[0]?.message?.content || "Disculpa, no pude generar una respuesta.";
}

export async function getGeminiResponse(messages: any[], systemPrompt: string) {
  let lastError: any;
  
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        systemInstruction: systemPrompt,
        safetySettings: [
          { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
          { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
          { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
          { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH }
        ]
      });

      const history = messages.slice(0, -1).map((m: any) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

      const firstUserIndex = history.findIndex(m => m.role === "user");
      const validHistory = firstUserIndex === -1 ? [] : history.slice(firstUserIndex);

      const chat = model.startChat({
        history: validHistory,
        generationConfig: { maxOutputTokens: 1000, temperature: 0.7 },
      });

      const lastMessage = messages[messages.length - 1].content;
      const result = await chat.sendMessage(lastMessage);
      const response = await result.response;
      
      const text = response.text();
      if (!text || text.length < 2) {
        throw new Error("Respuesta vacía");
      }

      console.log("/// RESPUESTA DESDE: GEMINI ///");
      return text;
    } catch (error: any) {
      lastError = error;
      console.error(`/// FALLO EN GEMINI (Intento ${i + 1}) ///`, error.message);
      
      if (error.message?.includes("429") || error.message?.includes("500") || error.message?.includes("quota")) {
        await wait(INITIAL_DELAY * Math.pow(2, i));
        continue;
      }
      break; 
    }
  }

  console.log("/// GEMINI FALLÓ - INTENTANDO OPENA.I ///");
  if (openai) {
    try {
      return await callOpenAI(messages, systemPrompt);
    } catch (e) {
      console.log("/// OPENA.I FALLÓ - INTENTANDO GROQ ///");
    }
  }

  if (process.env.GROQ_API_KEY) {
    try {
      return await callGroq(messages, systemPrompt);
    } catch (e) {
      console.log("/// GROQ FALLÓ - INTENTANDO MISTRAL ///");
    }
  }

  if (process.env.MISTRAL_API_KEY) {
    try {
      return await callMistral(messages, systemPrompt);
    } catch (e) {
      console.log("/// TODAS LAS IAS FALLARON ///");
    }
  }
  
  throw new Error(`Fallo crítico: ${lastError?.message}`);
}

export async function getEmbeddings(text: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const result = model.embedContent(text);
    return (await result).embedding.values;
  } catch (error) {
    console.error("/// ERROR GENERANDO EMBEDDINGS ///", error);
    throw error;
  }
}

export default genAI;