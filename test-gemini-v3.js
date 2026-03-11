const { GoogleGenerativeAI } = require("@google/generative-ai");

async function test() {
  try {
    const key = "AIzaSyAIVTxL7AeB486TaqLmJH8I3X_xmIzfBlk";
    const genAI = new GoogleGenerativeAI(key);
    
    // In some versions of the SDK, genAI has a listModels method
    // But let's try to just use 'gemini-pro' as a fallback test
    console.log("Testing gemini-pro...");
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent("Hola");
    const response = await result.response;
    console.log("Response (gemini-pro):", response.text());
  } catch (err) {
    console.error("/// GEMINI-PRO FAILED ///");
    console.error(err.message);
  }
}

test();
