const { GoogleGenerativeAI } = require("@google/generative-ai");

async function test() {
  try {
    const key = "AIzaSyAIVTxL7AeB486TaqLmJH8I3X_xmIzfBlk";
    const genAI = new GoogleGenerativeAI(key);
    
    console.log("Testing gemini-2.0-flash...");
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent("Hola, di 'CONEXIÓN EXITOSA' si recibes esto.");
    const response = await result.response;
    console.log("Response:", response.text());
  } catch (err) {
    console.error("/// FINAL TEST FAILED ///");
    console.error(err.message);
  }
}

test();
