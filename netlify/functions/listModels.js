// netlify/functions/listModels.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

// netlify/functions/listModels.js
exports.handler = async () => {
  try {
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models",
      {
        headers: {
          Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
        },
      }
    );

    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
