import { searchDocs } from "./rag.js";

function formatAnswer(hits) {
  if (!hits.length) {
    return (
      "No encontré esa información en los documentos disponibles.\n\n" +
      "Puedes intentar con otras palabras (ej: “robo bici”, “viajes”, “deducible”) " +
      "o escribir “menú” para ver opciones."
    );
  }

  const top = hits[0];
  const extras = hits.slice(1, 3);

  const parts = [];
  parts.push(`Según nuestros documentos (${top.file}):\n`);
  parts.push(top.content);

  if (extras.length) {
    parts.push(
      `\n\n📌 Relacionado:\n` +
        extras
          .map(
            (h) =>
              `- (${h.file}) ${h.content.replace(/\n/g, " ").slice(0, 140)}...`
          )
          .join("\n")
    );
  }

  parts.push(
    `\n\n¿Quieres que te lo resuma más corto, o que te muestre el “glosario” si hay términos técnicos?`
  );

  return parts.join("\n");
}

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");
    const message = body.message || "";

    if (!message.trim()) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "message requerido" }),
      };
    }

    const hits = searchDocs(message, 4);

    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: formatAnswer(hits),
        hits: hits.map((h) => ({ id: h.id, file: h.file, score: h.score })),
      }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message }),
    };
  }
};
