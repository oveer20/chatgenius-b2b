const { GoogleGenerativeAI } = require("@google/generative-ai");

async function test() {
  try {
    const key = "AIzaSyAIVTxL7AeB486TaqLmJH8I3X_xmIzfBlk";
    console.log("Using API Key:", "AIzaS..." + key.substring(key.length - 5));
    
    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 100,
      },
    });

    console.log("Sending test message...");
    const result = await chat.sendMessage("Hola, di 'OK' si recibes esto.");
    const response = await result.response;
    console.log("Response:", response.text());
  } catch (err) {
    console.error("/// DIAGNOSTIC ERROR LOCAL ///");
    if (err.message) console.error("Message:", err.message);
    if (err.stack) console.error("Stack:", err.stack);
  }
}

test();
