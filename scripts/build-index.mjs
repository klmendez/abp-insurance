import fs from "fs";
import path from "path";

const DOCS_DIR = path.join(process.cwd(), "netlify", "functions", "docs");
const OUT_DIR = path.join(process.cwd(), "netlify", "functions", "data");
const OUT_FILE = path.join(OUT_DIR, "docs_index.json");

function splitIntoChunks(text) {
  return text
    .split(/\n\s*\n/g)
    .map((t) => t.trim())
    .filter((t) => t.length >= 30);
}

function normalize(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(str) {
  const stop = new Set([
    "de","la","el","los","las","y","o","u","a","en","por","para","con","sin",
    "un","una","unos","unas","que","se","es","son","al","del","su","sus","tu","tus"
  ]);
  return normalize(str)
    .split(" ")
    .filter((w) => w.length >= 3 && !stop.has(w));
}

function buildIndex() {
  if (!fs.existsSync(DOCS_DIR)) throw new Error(`No existe: ${DOCS_DIR}`);
  const files = fs.readdirSync(DOCS_DIR).filter((f) => f.endsWith(".md"));

  const chunks = [];

  for (const file of files) {
    const fullPath = path.join(DOCS_DIR, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const parts = splitIntoChunks(raw);

    parts.forEach((content, idx) => {
      chunks.push({
        id: `${file}::${idx}`,
        file,
        chunkIndex: idx,
        content,
        tokens: tokenize(content),
      });
    });
  }

  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(
    OUT_FILE,
    JSON.stringify({ createdAt: Date.now(), chunks }, null, 2),
    "utf8"
  );

  console.log("✅ Índice generado:", OUT_FILE);
  console.log("📄 Archivos:", files.length, "| Chunks:", chunks.length);
}

buildIndex();
