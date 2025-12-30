// netlify/functions/chat.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async (event) => {
  // Solo permitimos POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  try {
    const { message } = JSON.parse(event.body);

    if (!message || message.trim() === "") {
      return {
        statusCode: 400,
        body: JSON.stringify({ reply: "Por favor envía un mensaje válido." }),
      };
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Usamos un modelo válido
    const model = genAI.getGenerativeModel({
      model: "models/text-bison-001", // modelo válido
      systemInstruction:
        "Eres el asistente virtual de ABP Agencia de Seguros. Usa información sobre: ARL, Vida, Ciclistas, Seguros Generales. Responde breve y claro. Contacto: +573208654369.",
    });

    // Generar contenido
    const result = await model.generateContent(message);
    const response = await result.response;

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: response.text() }),
    };
  } catch (error) {
    console.error("CHAT ERROR:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        reply:
          "⚠️ Lo siento, hubo un problema con el asistente. Intenta nuevamente más tarde.",
      }),
    };
  }
};
