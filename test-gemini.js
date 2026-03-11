const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config({ path: ".env.local" });

async function test() {
  try {
    const key = process.env.GOOGLE_GEMINI_API_KEY;
    console.log("Checking API Key:", key ? "PRESENT (Starts with " + key.substring(0, 5) + ")" : "MISSING");
    
    const genAI = new GoogleGenerativeAI(key || "");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 100,
      },
    });

    console.log("Sending test message...");
    const result = await chat.sendMessage("Testing connection. Answer 'OK' if you see this.");
    const response = await result.response;
    console.log("Response:", response.text());
  } catch (err) {
    console.error("/// DIAGNOSTIC ERROR ///");
    console.error(err);
    if (err.response) {
      console.error("Response data:", err.response);
    }
  }
}

test();
