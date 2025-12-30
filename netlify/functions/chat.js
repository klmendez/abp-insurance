// netlify/functions/chat.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { message } = JSON.parse(event.body);

    // Inicializamos cliente con tu API Key
    const client = new GoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });

    // Llamamos directamente a generateMessage con el modelo como string
    const response = await client.generateMessage({
      model: "models/text-bison-001", // modelo soportado
      messages: [
        {
          role: "system",
          content: `
            Eres el asistente de ABP Agencia de Seguros.
            Usa esta información: ARL, Vida, Ciclistas, Generales.
            Contacto: +573208654369
            Responde de forma breve y clara.
          `,
        },
        { role: "user", content: message },
      ],
    });

    const reply = response.output[0].content[0].text;

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
