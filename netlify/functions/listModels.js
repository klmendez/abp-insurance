import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const handler = async () => {
  try {
    const models = await openai.models.list();
    const names = models.data.map((m) => m.id).slice(0, 30);
    return {
      statusCode: 200,
      body: JSON.stringify({ models: names }),
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
