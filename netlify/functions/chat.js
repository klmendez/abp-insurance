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
    const modelName = process.env.GENAI_MODEL || "models/text-bison-001";
    const model = genAI.getGenerativeModel({ model: modelName });

    const systemPrompt = `Eres el asistente virtual de ABP Agencia de Seguros.
Usa esta información de contexto: ARL, Vida y bienestar, Seguros generales, programas para ciclistas.
Contacto directo: +57 320 865 4369.
Responde de forma breve, clara y amable.`;

    const prompt = `${systemPrompt}

Consulta del usuario:
${message}`;

    let reply;

    if (modelName.includes("gemini")) {
      const result = await model.generateContent(prompt);
      reply = result?.response?.text?.();
    } else {
      const result = await model.generateText({ prompt });
      reply = result?.response?.candidates?.[0]?.output;
    }

    if (!reply) {
      reply = "Lo siento, no pude generar una respuesta en este momento.";
    }

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
