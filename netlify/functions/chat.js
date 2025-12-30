// netlify/functions/chat.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { message } = body;

    if (!message || typeof message !== "string") {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Debes enviar un mensaje válido." }),
      };
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("Falta la variable de entorno GEMINI_API_KEY");
    }

    // Inicializamos cliente con la API Key
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const systemPrompt = `Eres el asistente virtual de ABP Agencia de Seguros.
Usa esta información de contexto: ARL, Vida y bienestar, Seguros generales, programas para ciclistas.
Contacto directo: +57 320 865 4369.
Responde de forma breve, clara y amable.`;

    const prompt = `${systemPrompt}

Consulta del usuario:
${message}`;

    const result = await model.generateContent(prompt);
    const reply = result?.response?.text?.() ?? "Lo siento, no pude generar una respuesta en este momento.";

    return {
      statusCode: 200,
      body: JSON.stringify({ reply }),
    };
  } catch (error) {
    console.error("CHAT ERROR:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Hubo un problema al procesar tu solicitud." }),
    };
  }
};
