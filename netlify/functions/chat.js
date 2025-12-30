// netlify/functions/chat.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

const ABP_CONTEXT = `
Eres el asistente virtual oficial de ABP Agencia de Seguros en Colombia.

SERVICIOS:
1. Riesgos Laborales (ARL): afiliación para empresas e independientes, gestión de accidentes y SG-SST.
2. Vida y Bienestar: vida con y sin ahorro, vida deudores, seguros empresariales.
3. Seguro para Ciclistas: hurto, daños, accidentes personales, asistencias. Incluye calculadora de prima.
4. Seguros Generales: vehículos, flotas, hogar, responsabilidad civil.
5. Servicios Complementarios: orden documental y formación preventiva.

REGLAS DE CONVERSACIÓN:
- Sé claro, cercano y profesional.
- Guía paso a paso, no entregues todo de una vez.
- Ofrece opciones numeradas.
- Siempre permite volver atrás o cambiar de opción.
- No inventes coberturas ni precios.
- Si el usuario quiere contacto humano, ofrece WhatsApp +57 320 865 4369.
- Usa español neutro colombiano.
`;

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { message } = JSON.parse(event.body);

    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ reply: "¿En qué puedo ayudarte hoy?" }),
      };
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: ABP_CONTEXT,
    });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: message }],
        },
      ],
    });

    const responseText =
      result?.response?.text()?.trim() ||
      "Puedo ayudarte con seguros de vida, ARL, ciclismo o vehículos. ¿Cuál te interesa?";

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reply: responseText }),
    };
  } catch (error) {
    console.error("Chat error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        reply:
          "⚠️ En este momento tengo un inconveniente técnico. Si deseas, puedes escribirnos directamente al WhatsApp +57 320 865 4369.",
      }),
    };
  }
};
