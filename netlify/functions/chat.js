// netlify/functions/chat.js
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

    const reply = buildReply(message);

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

// ============================
// Reglas de conversación básicas
// ============================

const normalizeText = (text = "") =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const includesAny = (haystack, keywords) => {
  const normalized = normalizeText(haystack);
  return keywords.some((keyword) => normalized.includes(normalizeText(keyword)));
};

const knowledgeBase = [
  {
    keywords: ["arl", "riesgos laborales", "seguridad laboral", "accidente"],
    response:
      "Nuestros planes ARL abarcan evaluación de riesgos, capacitación y acompañamiento en seguridad y salud en el trabajo. Podemos apoyarte con programas completos de prevención y respuesta.",
  },
  {
    keywords: ["vida", "bienestar", "salud", "familia"],
    response:
      "En vida y bienestar trabajamos pólizas individuales, familiares y empresariales, con beneficios de ahorro, inversión y medicina prepagada según tu perfil.",
  },
  {
    keywords: ["generales", "hogar", "empresa", "patrimonio", "vehículo", "auto"],
    response:
      "Los seguros generales protegen tu patrimonio: hogar, vehículos, pymes y grandes empresas. Evaluamos riesgos y diseñamos coberturas a la medida.",
  },
  {
    keywords: ["bicicleta", "ciclista", "bike", "mtb"],
    response:
      "Tenemos programas especiales para ciclistas: cobertura por robo, accidentes personales, responsabilidad civil y asistencia 24/7. Podemos cotizar desde planes básicos hasta full.",
  },
  {
    keywords: ["contact", "agenda", "whatsapp", "llamar", "asesor"],
    response:
      "Con gusto te conecta un asesor. Escríbenos por WhatsApp al +57 320 865 4369 o déjanos tus datos en /contacto para llamarte sin costo.",
  },
];

const fallbackResponse =
  "Soy el asistente virtual de ABP Agencia de Seguros. Puedo orientarte sobre ARL, seguros de vida, seguros generales y programas para ciclistas. También puedo vincularte con un asesor al +57 320 865 4369 o en /contacto.";

const buildReply = (message) => {
  const normalized = normalizeText(message);

  if (!normalized) {
    return "¿Podrías contarme un poco más sobre lo que necesitas?";
  }

  const matches = knowledgeBase.filter((entry) => includesAny(normalized, entry.keywords));

  if (matches.length) {
    return matches
      .map((entry) => entry.response)
      .join("\n\n");
  }

  return fallbackResponse;
};
