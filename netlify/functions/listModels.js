// netlify/functions/listModels.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async () => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const models = await genAI.listModels();
    return {
      statusCode: 200,
      body: JSON.stringify(models),
    };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
