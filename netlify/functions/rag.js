import fs from "fs";
import path from "path";
import { tokenize, scoreTokens } from "./utils.js";

const INDEX_PATH = path.join(
  process.cwd(),
  "netlify",
  "functions",
  "data",
  "docs_index.json"
);

let cache = null;

function loadIndex() {
  if (cache) return cache;

  if (!fs.existsSync(INDEX_PATH)) {
    throw new Error(
      `No existe el índice: ${INDEX_PATH}. Primero corre: npm run index:docs`
    );
  }

  const raw = fs.readFileSync(INDEX_PATH, "utf8");
  cache = JSON.parse(raw);
  return cache;
}

export function searchDocs(query, topK = 4) {
  const index = loadIndex();
  const qTokens = tokenize(query);

  const ranked = index.chunks
    .map((c) => ({
      ...c,
      score: scoreTokens(qTokens, c.tokens),
    }))
    .sort((a, b) => b.score - a.score);

  const best = ranked.filter((r) => r.score >= 0.12).slice(0, topK);
  return best;
}
