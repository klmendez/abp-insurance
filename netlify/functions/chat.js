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
    // Parseamos el mensaje enviado desde el frontend
    const { message } = JSON.parse(event.body);

    // Inicializamos el cliente con la API Key de AI Studio
    const client = new GoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    // Seleccionamos un modelo disponible
    const model = client.getModel("models/text-bison-001");

    // Creamos la respuesta usando generateMessage
    const response = await model.generateMessage({
      // Instrucciones al asistente
      input: [
        {
          role: "system",
          content: `
            Eres el asistente de ABP Agencia de Seguros. 
            Usa la información: ARL, Vida, Ciclistas, Generales, Contacto +573208654369. 
            Responde de forma breve y clara.
          `,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    // Obtenemos el texto de la respuesta
    const reply = response.output[0].content[0].text;

    return {
      statusCode: 200,
      body: JSON.stringify({ reply }),
    };
  } catch (error) {
    console.error("CHAT ERROR:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Hubo un problema al procesar tu solicitud.",
      }),
    };
  }
};
