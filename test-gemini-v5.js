const { GoogleGenerativeAI } = require("@google/generative-ai");

async function test() {
  try {
    const key = "AIzaSyAIVTxL7AeB486TaqLmJH8I3X_xmIzfBlk";
    const genAI = new GoogleGenerativeAI(key);
    
    console.log("Testing gemini-flash-latest...");
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    const result = await model.generateContent("Hola");
    const response = await result.response;
    console.log("Response:", response.text());
  } catch (err) {
    console.error("/// ALIAS TEST FAILED ///");
    console.error(err.message);
  }
}

test();
