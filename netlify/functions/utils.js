export function normalize(str) {
  return (str || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function tokenize(str) {
  const stop = new Set([
    "de","la","el","los","las","y","o","u","a","en","por","para","con","sin",
    "un","una","unos","unas","que","se","es","son","al","del","su","sus","tu","tus",
    "mi","mis","te","me","lo","le","les","ya","si","sí","no","como","cual","cuales",
    "qué","cuál","cuáles","cuando","donde"
  ]);

  return normalize(str)
    .split(" ")
    .filter((w) => w.length >= 3 && !stop.has(w));
}

// clamp para que tu rag.js no reviente si lo usa
export function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export function scoreTokens(queryTokens, docTokens) {
  const docSet = new Set(docTokens);
  let hit = 0;
  for (const t of queryTokens) if (docSet.has(t)) hit++;
  return hit / Math.max(3, queryTokens.length);
}
