// netlify/functions/chat.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async (event) => {
  // CORS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  // Preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const { message } = JSON.parse(event.body);

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction:
        "Eres el asistente virtual de ABP Agencia de Seguros. Responde claro, amable y breve. Ofrece ARL, Vida, Generales y Ciclistas. Contacto WhatsApp +573208654369.",
    });

    const result = await model.generateContent(message);
    const text = result.response.text();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply: text }),
    };
  } catch (error) {
    console.error("CHAT ERROR:", error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        reply:
          "Lo siento, tuve un inconveniente técnico. Intenta nuevamente en unos segundos.",
      }),
    };
  }
};
