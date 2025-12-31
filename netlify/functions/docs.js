import { searchDocs } from "./rag.js";

export const handler = async (event) => {
  try {
    const q = event.queryStringParameters?.q || "";
    const result = searchDocs(q, { topK: 5 });
    return {
      statusCode: 200,
      body: JSON.stringify(result, null, 2),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message }),
    };
  }
};
