const { GoogleGenerativeAI } = require("@google/generative-ai");

const ABP_CONTEXT = `
Eres el asistente virtual oficial de ABP Agencia de Seguros en Colombia.

Servicios:
- ARL (Riesgos Laborales)
- Seguros de Vida y Bienestar
- Seguro para Ciclistas
- Seguros Generales (vehículos, hogar, RC)
- Servicios complementarios

Reglas:
- Sé claro, humano y profesional.
- Guía paso a paso.
- Ofrece opciones numeradas.
- Permite cambiar de opción.
- No inventes precios.
- Si pide asesor humano, ofrece WhatsApp +57 320 865 4369.
`;

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { message } = JSON.parse(event.body || "{}");

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: ABP_CONTEXT,
    });

    const result = await model.generateContent(message || "Hola");
    const reply =
      result?.response?.text() ||
      "¿Qué tipo de seguro te interesa hoy?";

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        reply:
          "⚠️ Tenemos un inconveniente técnico. Escríbenos al WhatsApp +57 320 865 4369.",
      }),
    };
  }
};
