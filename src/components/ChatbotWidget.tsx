import { useEffect, useRef, useState } from "react";
import { FiMessageCircle, FiSend, FiX } from "react-icons/fi";
import docsIndexData from "../../netlify/functions/data/docs_index.json";
import logoV from "../assets/Logo profesional parz.png";

type Role = "user" | "assistant";

type ChatStep =
  | "root"
  | "line-arl"
  | "line-vida"
  | "line-generales"
  | "line-ciclistas"
  | "bike-product"
  | "bike-coverage"
  | "bike-profile"
  | "bike-result"
  | "contact"
  | "contact-name"
  | "contact-email"
  | "contact-phone"
  | "contact-notes"
  | "contact-confirm"
  | "farewell";

type QuickChoice = {
  label: string;
  value: string;
};

type Message = {
  role: Role;
  content: string;
  choices?: QuickChoice[];
};

type KnowledgeCard = {
  id: ChatStep;
  title: string;
  summary: string;
  bullets?: string[];
  link?: string;
  extra?: string;
};

type ContactDraft = {
  name: string;
  email: string;
  phone: string;
  notes: string;
};

type BikeDraft = {
  product?: "vida" | "bici" | "viaje" | "combo";
  coverage?: number;
  profile?: "recreativo" | "entrenamiento" | "competitivo";
};

type DocsIndexChunk = {
  id: string;
  file: string;
  chunkIndex: number;
  content: string;
  tokens: string[];
};

type DocsIndex = {
  createdAt?: number;
  chunks?: DocsIndexChunk[];
};

const BASE_CHOICES: QuickChoice[] = [
  { label: "1. Riesgos laborales (ARL)", value: "arl" },
  { label: "2. Seguros de vida y bienestar", value: "vida" },
  { label: "3. Seguros generales y patrimonio", value: "generales" },
  { label: "4. Portafolio ciclistas", value: "ciclistas" },
  { label: "5. Simular prima para ciclistas", value: "simular bici" },
  { label: "6. Quiero que me contacten", value: "contacto" },
];

const bikeProducts = [
  {
    value: "vida" as const,
    label: "Vida y Accidentes",
    baseRate: 0.00011,
    minCoverage: 5_000_000,
    serviceFee: 9_800,
    summary: "Cobertura personal frente a accidentes y fallecimiento.",
  },
  {
    value: "bici" as const,
    label: "Seguro Bicicleta",
    baseRate: 0.00015,
    minCoverage: 7_000_000,
    serviceFee: 12_400,
    summary: "Robo total, daños y accesorios de tu bici.",
  },
  {
    value: "viaje" as const,
    label: "Viaje Ciclistas",
    baseRate: 0.00009,
    minCoverage: 6_000_000,
    serviceFee: 15_200,
    summary: "Asistencia médica, traslados y responsabilidad civil al viajar.",
  },
  {
    value: "combo" as const,
    label: "Combo Integral",
    baseRate: 0.00026,
    minCoverage: 12_000_000,
    serviceFee: 21_500,
    summary: "Plan conjunto vida + bici + viaje.",
  },
];

const bikeProfiles = [
  {
    value: "recreativo" as const,
    label: "Recreativo / urbano",
    multiplier: 1,
    helper: "Rodadas en ciudad, transporte diario, recreación.",
  },
  {
    value: "entrenamiento" as const,
    label: "Entrenamiento frecuente",
    multiplier: 1.28,
    helper: "Sesiones estructuradas, rutas exigentes, viajes ocasionales.",
  },
  {
    value: "competitivo" as const,
    label: "Competitivo / eventos",
    multiplier: 1.55,
    helper: "Carreras, temporadas y desplazamientos internacionales.",
  },
];

const KNOWLEDGE: KnowledgeCard[] = [
  {
    id: "root",
    title: "Portafolio ABP",
    summary:
      "Acompañamos a empresas, familias y ciclistas con seguros hechos a la medida. ¿Qué línea quieres explorar?",
    extra:
      "También puedo simular una prima referencial para ciclistas o tomar tus datos para que un asesor te contacte directamente.",
  },
  {
    id: "line-arl",
    title: "Línea A · Riesgos Laborales",
    summary:
      "Acompañamos tu relación con la ARL de principio a fin: afiliaciones, novedades, accidentes y fortalecimiento del SG-SST.",
    bullets: [
      "Afiliaciones para empresas, contratistas e independientes.",
      "Reporte y gestión de accidentes e incapacidades.",
      "Capacitaciones, campañas y planes de prevención.",
      "Soporte en matrices de riesgo y auditorías (SG-SST).",
    ],
    link: "/portafolio/riesgos-laborales",
  },
  {
    id: "line-vida",
    title: "Línea B · Vida y Bienestar",
    summary:
      "Protegemos proyectos personales y equipos con pólizas de vida ajustadas a tus metas y responsabilidades.",
    bullets: [
      "Vida individual con o sin ahorro.",
      "Vida deudores y protección de ingresos.",
      "Programas colectivos para colaboradores.",
      "Planificación de beneficios y cultura aseguradora.",
    ],
    link: "/portafolio/seguros-vida",
  },
  {
    id: "line-generales",
    title: "Línea D · Seguros Generales",
    summary:
      "Resguardamos patrimonio, operación y movilidad con pólizas flexibles y acompañamiento experto.",
    bullets: [
      "Patrimonio empresarial: infraestructura, activos críticos, continuidad.",
      "Responsabilidad civil según tu actividad económica.",
      "Movilidad y hogar: flotas, autos particulares, viviendas.",
      "Programas integrales con prevención de pérdidas y seguimiento de siniestros.",
    ],
    link: "/portafolio/seguros-generales",
  },
  {
    id: "line-ciclistas",
    title: "Programas para Ciclistas",
    summary:
      "Planes flexibles para tu bici, tu salud y tus viajes. Podemos combinar coberturas según tu disciplina.",
    bullets: [
      "Robo, daños y accesorios de la bicicleta.",
      "Coberturas personales por accidente y responsabilidad civil.",
      "Asistencias 24/7, viajes y eventos deportivos.",
      "Tips para asegurar correctamente el valor real de tu bici.",
    ],
    link: "/portafolio/ciclistas",
    extra:
      "¿Te gustaría simular una prima referencial? Usa la opción «Simular prima para ciclistas».",
  },
];

const KNOWLEDGE_INTROS: Partial<Record<ChatStep, string>> = {
  "line-arl": "Claro, te cuento cómo apoyamos todo el ciclo de riesgos laborales:",
  "line-vida": "Con gusto, así abordamos los seguros de vida y bienestar:",
  "line-generales": "Perfecto, así protegemos tu patrimonio y operación:",
  "line-ciclistas": "Genial, mira cómo acompañamos a las y los ciclistas:",
};

const TOPIC_LABELS: Partial<Record<ChatStep, string>> = {
  "line-arl": "riesgos laborales (ARL)",
  "line-vida": "seguros de vida y bienestar",
  "line-generales": "seguros generales y protección patrimonial",
  "line-ciclistas": "nuestro portafolio para ciclistas",
};

const TOPIC_MATCHERS: { step: ChatStep; keywords: string[] }[] = [
  { step: "line-arl", keywords: ["arl", "riesgo", "laboral", "sgsst", "sst"] },
  {
    step: "line-vida",
    keywords: ["vida", "bienestar", "ahorro", "protección", "proteccion"],
  },
  {
    step: "line-generales",
    keywords: ["general", "patrimonio", "empresa", "responsabilidad", "rc"],
  },
  {
    step: "line-ciclistas",
    keywords: ["ciclista", "bici", "bicicleta", "mtb", "ruta", "gravel"],
  },
];

const DEFAULT_FLOWS: Record<
  ChatStep,
  { heading: string; choices?: QuickChoice[]; followUp?: string }
> = {
  root: {
    heading: "¿Qué te gustaría hacer?",
    choices: BASE_CHOICES,
    followUp: "Escribe el número o palabra clave. Puedes decir “volver” en cualquier momento.",
  },
  "line-arl": {
    heading: "Apoyo en riesgos laborales",
    choices: [
      { label: "Volver al menú principal", value: "menu" },
      { label: "Quiero que me orienten con mi ARL", value: "contacto" },
    ],
  },
  "line-vida": {
    heading: "Programas de vida y bienestar",
    choices: [
      { label: "Volver al menú", value: "menu" },
      { label: "Solicitar asesoría de vida", value: "contacto" },
    ],
  },
  "line-generales": {
    heading: "Protección patrimonial",
    choices: [
      { label: "Volver al menú", value: "menu" },
      { label: "Hablar con un especialista", value: "contacto" },
    ],
  },
  "line-ciclistas": {
    heading: "Plan ciclistas",
    choices: [
      { label: "Simular prima referencial", value: "simular bici" },
      { label: "Volver al menú", value: "menu" },
    ],
  },
  "bike-product": {
    heading: "Simulador ciclistas · Paso 1",
    choices: bikeProducts.map((product, index) => ({
      label: `${index + 1}. ${product.label}`,
      value: product.value,
    })),
    followUp: "Escribe el número o nombre del plan. También puedes decir “volver”.",
  },
  "bike-coverage": {
    heading: "Simulador ciclistas · Paso 2",
    followUp:
      "Ingresa el valor a asegurar en COP (ej. 15000000). Usa “volver” para cambiar el plan.",
  },
  "bike-profile": {
    heading: "Simulador ciclistas · Paso 3",
    choices: bikeProfiles.map((profile, index) => ({
      label: `${index + 1}. ${profile.label}`,
      value: profile.value,
    })),
  },
  "bike-result": {
    heading: "Simulador ciclistas · Resultado",
    choices: [
      { label: "Enviar mis datos a un asesor", value: "contacto" },
      { label: "Hacer otra simulación", value: "simular bici" },
      { label: "Volver al menú", value: "menu" },
    ],
  },
  contact: {
    heading: "Te conectamos con un asesor",
    choices: [
      { label: "Sí, quiero dejar mis datos", value: "dejar datos" },
      { label: "Prefiero volver al menú", value: "menu" },
    ],
  },
  "contact-name": { heading: "Contacto · Paso 1" },
  "contact-email": { heading: "Contacto · Paso 2" },
  "contact-phone": { heading: "Contacto · Paso 3" },
  "contact-notes": { heading: "Contacto · Paso 4" },
  "contact-confirm": {
    heading: "Contacto · Confirmación",
    choices: [
      { label: "Enviar mis datos", value: "enviar contacto" },
      { label: "Editar información", value: "editar contacto" },
      { label: "Volver al menú", value: "menu" },
    ],
  },
  farewell: {
    heading: "¿Algo más?",
    choices: [
      { label: "Volver al menú principal", value: "menu" },
      { label: "Cerrar conversación", value: "cerrar" },
    ],
  },
};

const SKIP_NOTE_KEYWORDS = [
  "listo",
  "listos",
  "ninguna",
  "ningun",
  "ningún",
  "nada",
  "todo bien",
  "sin nota",
  "sin comentario",
  "ok",
];

const QUESTION_HINTS = [
  "que",
  "qué",
  "como",
  "cómo",
  "detalle",
  "detallar",
  "beneficio",
  "incluye",
  "cubre",
  "informacion",
  "información",
  "explica",
  "duda",
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(Math.round(value));

const parseCop = (raw: string) => {
  const cleaned = raw.replace(/[^\d]/g, "");
  if (!cleaned) return NaN;
  return Number(cleaned);
};

const normalizeInput = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

const includesAny = (text: string, keywords: string[]) => {
  const normalized = normalizeInput(text);
  return keywords.some((keyword) => normalized.includes(normalizeInput(keyword)));
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const detectTopicStep = (text: string): ChatStep | null => {
  const normalized = normalizeInput(text);
  if (!normalized) return null;

  const match = TOPIC_MATCHERS.find((entry) =>
    entry.keywords.some((keyword) => normalized.includes(normalizeInput(keyword))),
  );

  return match?.step ?? null;
};

const findKnowledgeCard = (id: ChatStep) => KNOWLEDGE.find((item) => item.id === id);

const formatNoteForSummary = (note: string) => {
  if (!note) {
    return "(sin nota adicional)";
  }

  return note
    .split("\n")
    .map((line, index) => (index === 0 ? line : `  ${line}`))
    .join("\n");
};

const buildContactSummary = (draft: ContactDraft, intro: string) =>
  [
    intro,
    "",
    "Así quedó la información:",
    `• Nombre: ${draft.name || "(por confirmar)"}`,
    `• Correo: ${draft.email || "(por confirmar)"}`,
    `• Teléfono: ${draft.phone || "(por confirmar)"}`,
    `• Mensaje: ${formatNoteForSummary(draft.notes)}`,
    "",
    "¿Deseas enviar estos datos al equipo de ABP?",
  ].join("\n");

const docsIndex = ((docsIndexData as DocsIndex)?.chunks ?? []).map((chunk) => ({
  ...chunk,
  tokens: chunk.tokens.map((token) => normalizeInput(token)).filter(Boolean),
}));

const STOP_WORDS = new Set([
  "de",
  "la",
  "el",
  "los",
  "las",
  "y",
  "o",
  "u",
  "a",
  "en",
  "por",
  "para",
  "con",
  "sin",
  "un",
  "una",
  "unos",
  "unas",
  "que",
  "se",
  "es",
  "son",
  "al",
  "del",
  "su",
  "sus",
  "tu",
  "tus",
  "mi",
  "mis",
  "te",
  "me",
  "lo",
  "le",
  "les",
  "ya",
  "si",
  "sí",
  "no",
  "como",
  "cómo",
  "cual",
  "cuál",
  "cuales",
  "cuáles",
  "cuando",
  "cuándo",
  "donde",
  "dónde",
  "que",
  "qué",
]);

const tokenizeQuery = (text: string) =>
  normalizeInput(text)
    .split(/\s+/)
    .filter((token) => token.length >= 3 && !STOP_WORDS.has(token));

const scoreTokens = (queryTokens: string[], docTokens: string[]) => {
  const docSet = new Set(docTokens);
  let hit = 0;
  for (const token of queryTokens) {
    if (docSet.has(token)) {
      hit += 1;
    }
  }
  return hit / Math.max(3, queryTokens.length);
};

const searchDocs = (query: string, topK = 4) => {
  const qTokens = tokenizeQuery(query);
  if (!qTokens.length || !docsIndex.length) {
    return [] as DocsIndexChunk[];
  }

  return docsIndex
    .map((chunk) => ({
      chunk,
      score: scoreTokens(qTokens, chunk.tokens),
    }))
    .filter((entry) => entry.score >= 0.12)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((entry) => entry.chunk);
};

const formatChunkContent = (raw: string) => {
  return raw
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      if (line.startsWith("#")) {
        return line.replace(/^#+\s*/, "").trim();
      }
      if (line.startsWith("- ")) {
        return `• ${line.slice(2).trim()}`;
      }
      return line;
    })
    .join("\n");
};

const formatDocAnswer = (hits: DocsIndexChunk[]) => {
  if (!hits.length) {
    return null;
  }

  const [top, ...extras] = hits;
  const topLabel = top.file.replace(/\.md$/i, "");
  const parts: string[] = [];
  parts.push(`Esto encontré en ${topLabel}:`);
  parts.push(formatChunkContent(top.content));

  if (extras.length) {
    const related = extras
      .map((hit) => {
        const label = hit.file.replace(/\.md$/i, "");
        const blurb = formatChunkContent(hit.content).split("\n")[0] ?? "";
        return `• ${label}: ${blurb}`;
      })
      .join("\n");
    parts.push(`📌 También puede servirte:\n${related}`);
  }

  parts.push(
    "¿Quieres que lo resuma o prefieres que avancemos con otra opción? Puedo volver al menú cuando quieras.",
  );

  return parts.join("\n\n");
};

export const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hola 👋 Soy el asistente virtual de ABP. Estoy listo para guiarte en nuestros programas de seguros. ¿Qué te gustaría hacer?",
      choices: BASE_CHOICES,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<ChatStep>("root");
  const [lastTopic, setLastTopic] = useState<ChatStep | null>(null);
  const [contactDraft, setContactDraft] = useState<ContactDraft>({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [bikeDraft, setBikeDraft] = useState<BikeDraft>({});
  const [hasUnread, setHasUnread] = useState(false);
  const [showIntroBubble, setShowIntroBubble] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setShowIntroBubble(false);
      return;
    }

    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === "assistant") {
      setHasUnread(true);
    }
  }, [isOpen, messages]);

  useEffect(() => {
    if (isOpen || !showIntroBubble) {
      return;
    }

    const timer = window.setTimeout(() => setShowIntroBubble(false), 8000);
    return () => window.clearTimeout(timer);
  }, [isOpen, showIntroBubble]);

  const activeFlow = DEFAULT_FLOWS[step];

  const pushAssistantMessage = (content: string, choices?: QuickChoice[]) => {
    setMessages((prev) => [...prev, { role: "assistant", content, choices }]);
  };

  const resetToMenu = () => {
    setStep("root");
    setLastTopic(null);
    setBikeDraft({});
    pushAssistantMessage(
      "Volvimos al menú principal. ¿Qué te gustaría revisar ahora?",
      BASE_CHOICES,
    );
  };

  const showKnowledgeCard = (card: KnowledgeCard, choicesOverride?: QuickChoice[]) => {
    setLastTopic(card.id);
    const intro = KNOWLEDGE_INTROS[card.id] ?? "Te explico:";
    const parts: string[] = [intro, card.summary];
    if (card.bullets?.length) {
      parts.push(card.bullets.map((bullet) => `• ${bullet}`).join("\n"));
    }
    if (card.extra) {
      parts.push(card.extra);
    }
    if (card.link) {
      parts.push(`▶ Puedes profundizar en ${card.link}`);
    }

    const choices = choicesOverride ?? DEFAULT_FLOWS[card.id]?.choices ?? [
      { label: "Volver al menú principal", value: "menu" },
    ];

    pushAssistantMessage(parts.join("\n\n"), choices);
  };

  const handleRootMatches = (normalizedValue: string) => {
    if (includesAny(normalizedValue, ["1", "arl", "riesgos", "laboral"])) {
      setStep("line-arl");
      const card = findKnowledgeCard("line-arl");
      if (card) {
        showKnowledgeCard(card);
      }
      return true;
    }

    if (includesAny(normalizedValue, ["2", "vida", "bienestar"])) {
      setStep("line-vida");
      const card = findKnowledgeCard("line-vida");
      if (card) {
        showKnowledgeCard(card);
      }
      return true;
    }

    if (includesAny(normalizedValue, ["3", "general", "patrimonio", "proteccion", "protección"])) {
      setStep("line-generales");
      const card = findKnowledgeCard("line-generales");
      if (card) {
        showKnowledgeCard(card);
      }
      return true;
    }

    if (includesAny(normalizedValue, ["4", "ciclista", "bici", "bicicleta", "programa"])) {
      setStep("line-ciclistas");
      const card = findKnowledgeCard("line-ciclistas");
      if (card) {
        showKnowledgeCard(card);
      }
      return true;
    }

    if (includesAny(normalizedValue, ["5", "simular", "prima", "cotizar", "cotizacion", "cotización"])) {
      startBikeFlow();
      return true;
    }

    if (includesAny(normalizedValue, ["6", "contact", "asesor", "llamar", "whatsapp"])) {
      startContactFlow();
      return true;
    }

    return false;
  };

  const startBikeFlow = () => {
    setBikeDraft({});
    setStep("bike-product");
    pushAssistantMessage(
      "Perfecto, hagamos una simulación referencial. Usamos valores promedio similares a nuestra calculadora:\n\nPaso 1: elige el tipo de plan. Escribe el número o el nombre.",
      DEFAULT_FLOWS["bike-product"].choices,
    );
  };

  const handleBikeFlow = async (rawInput: string, normalizedValue: string) => {
    if (step === "bike-product") {
      const match = bikeProducts.find(
        (product, index) =>
          normalizedValue === String(index + 1) || normalizedValue.includes(product.value),
      );

      if (!match) {
        pushAssistantMessage(
          "No identifiqué el plan. Usa el número (1-4) o escribe parte del nombre. Ejemplo: “bici”.",
          DEFAULT_FLOWS["bike-product"].choices,
        );
        return;
      }

      setBikeDraft({ product: match.value });
      setStep("bike-coverage");
      pushAssistantMessage(
        `Elegiste "${match.label}". Ahora dime el valor asegurado (COP). Si no estás seguro, ingresa una estimación y te indicaré el mínimo (${formatCurrency(match.minCoverage)}).`,
      );
      return;
    }

    if (step === "bike-coverage") {
      const value = parseCop(rawInput);
      const product = bikeProducts.find((p) => p.value === bikeDraft.product);

      if (!Number.isFinite(value) || value <= 0) {
        pushAssistantMessage("Necesito un número en pesos colombianos. Ejemplo: 15000000.");
        return;
      }

      if (!product) {
        startBikeFlow();
        return;
      }

      setBikeDraft((prev) => ({ ...prev, coverage: value }));
      setStep("bike-profile");

      const msg = [
        `Valor tomado: ${formatCurrency(value)} (${value < product.minCoverage ? "se ajustará al mínimo" : "dentro del rango"}).`,
        "Paso 3: ¿cuál describe mejor tu uso?",
      ].join("\n\n");

      pushAssistantMessage(msg, DEFAULT_FLOWS["bike-profile"].choices);
      return;
    }

    if (step === "bike-profile") {
      const match = bikeProfiles.find(
        (profile, index) =>
          normalizedValue === String(index + 1) || normalizedValue.includes(profile.value),
      );

      if (!match) {
        pushAssistantMessage(
          "Selecciona una de las tres opciones (1-3) o escribe recreativo, entrenamiento, competitivo.",
          DEFAULT_FLOWS["bike-profile"].choices,
        );
        return;
      }

      const product = bikeProducts.find((p) => p.value === bikeDraft.product);
      const coverage = bikeDraft.coverage;

      if (!product || !coverage) {
        startBikeFlow();
        return;
      }

      const usedCoverage = Math.max(coverage, product.minCoverage);
      const baseAnnual = usedCoverage * product.baseRate;
      const adjustedAnnual = baseAnnual * match.multiplier + product.serviceFee;
      const monthly = adjustedAnnual / 12;

      const lines: string[] = [
        `🧮 **Resultado referencial** (${product.label} · ${match.label})`,
        `• Valor ingresado: ${formatCurrency(coverage)}`,
        `• Cobertura utilizada: ${formatCurrency(usedCoverage)}${coverage < product.minCoverage ? " (ajustado al mínimo)" : ""}`,
        `• Prima mensual estimada: ${formatCurrency(monthly)}`,
        `• Prima anual estimada: ${formatCurrency(adjustedAnnual)}`,
        "",
        "Estas cifras pueden variar según la aseguradora, deducibles y coberturas adicionales. Un asesor puede ajustarlo contigo.",
      ];

      setBikeDraft({
        product: product.value,
        coverage: usedCoverage,
        profile: match.value,
      });

      setStep("bike-result");
      pushAssistantMessage(lines.join("\n"), DEFAULT_FLOWS["bike-result"].choices);
    }
  };

  const startContactFlow = () => {
    setContactDraft({ name: "", email: "", phone: "", notes: "" });
    setStep("contact");
    const topicLabel = lastTopic ? TOPIC_LABELS[lastTopic] : null;
    const topicAddon = topicLabel ? ` Así el asesor sabrá que vienes por ${topicLabel}.` : "";
    pushAssistantMessage(
      `Con gusto. Un asesor ABP puede contactarte por teléfono o correo.${topicAddon} ¿Deseas dejar tus datos ahora?`,
      DEFAULT_FLOWS["contact"].choices,
    );
  };

  const handleContactFlow = async (rawInput: string, normalizedValue: string) => {
    if (step === "contact") {
      if (includesAny(normalizedValue, ["menu", "volver"])) {
        resetToMenu();
        return;
      }

      if (!includesAny(normalizedValue, ["si", "sí", "dejar", "ok", "claro", "dale", "1"])) {
        pushAssistantMessage(
          "Para avanzar necesito tu confirmación. ¿Deseas que un asesor te contacte? Responde “sí” o elige una opción.",
          DEFAULT_FLOWS["contact"].choices,
        );
        return;
      }

      setStep("contact-name");
      pushAssistantMessage("Perfecto. ¿Cuál es tu nombre completo?");
      return;
    }

    if (step === "contact-name") {
      const name = rawInput.trim();
      if (name.length < 3) {
        pushAssistantMessage("Necesito un nombre válido (mínimo 3 caracteres).");
        return;
      }

      setContactDraft((prev) => ({ ...prev, name }));
      setStep("contact-email");
      pushAssistantMessage("Gracias. ¿Cuál es tu correo electrónico?");
      return;
    }

    if (step === "contact-email") {
      const email = rawInput.trim();
      if (!email.includes("@")) {
        pushAssistantMessage("Parece que ese correo no es válido. Verifica e inténtalo de nuevo.");
        return;
      }

      setContactDraft((prev) => ({ ...prev, email }));
      setStep("contact-phone");
      pushAssistantMessage("¿Cuál es tu teléfono o WhatsApp (con indicativo)?");
      return;
    }

    if (step === "contact-phone") {
      const phoneDigits = rawInput.replace(/[^\d+]/g, "");
      if (phoneDigits.length < 8) {
        pushAssistantMessage(
          "Necesito un número válido. Incluye indicativo si estás fuera de Colombia.",
        );
        return;
      }

      setContactDraft((prev) => ({ ...prev, phone: rawInput.trim() }));
      setStep("contact-notes");

      const topicLabel = lastTopic ? TOPIC_LABELS[lastTopic] : null;
      const promptLines = [
        topicLabel
          ? `Si quieres, cuéntame algún detalle que el equipo de ABP deba saber sobre ${topicLabel}.`
          : "¿Hay algo más que quieras que el equipo de ABP tenga presente?",
        "Si no deseas agregar nada, escribe “listo” o “ninguna nota”.",
        "También puedo darte más información si tienes otra duda. Solo escríbela 😊",
      ];
      pushAssistantMessage(promptLines.join("\n"));
      return;
    }

    if (step === "contact-notes") {
      if (includesAny(normalizedValue, SKIP_NOTE_KEYWORDS)) {
        const updatedDraft = { ...contactDraft, notes: "Sin nota adicional" };
        setContactDraft(updatedDraft);
        setStep("contact-confirm");
        const topicLabel = lastTopic ? TOPIC_LABELS[lastTopic] : null;
        const friendlyIntro = topicLabel
          ? `Perfecto, anotaré que vienes por ${topicLabel}.`
          : "Muy bien, dejemos registrados tus datos.";
        const summary = buildContactSummary(updatedDraft, friendlyIntro);
        pushAssistantMessage(summary, DEFAULT_FLOWS["contact-confirm"].choices);
        return;
      }

      const detectedTopic = detectTopicStep(rawInput) ?? lastTopic;
      const looksLikeQuestion =
        rawInput.trim().endsWith("?") || includesAny(normalizedValue, QUESTION_HINTS);

      if (detectedTopic && (looksLikeQuestion || normalizedValue.length <= 20)) {
        const card = findKnowledgeCard(detectedTopic);
        if (card) {
          setLastTopic(detectedTopic);
          showKnowledgeCard(card, [
            { label: "Listo, continuar con mis datos", value: "listo" },
            { label: "Volver al menú principal", value: "menu" },
          ]);
          pushAssistantMessage(
            "Cuando quieras, agrega un mensaje para el asesor o escribe “listo” para continuar.",
          );
          return;
        }
      }

      const notes = rawInput.trim();
      const updatedDraft = { ...contactDraft, notes: notes || "Sin nota adicional" };
      setContactDraft(updatedDraft);
      setStep("contact-confirm");
      const topicLabel = lastTopic ? TOPIC_LABELS[lastTopic] : null;
      const friendlyIntro = topicLabel
        ? `Perfecto, dejaré anotado que buscas apoyo en ${topicLabel}.`
        : "Gracias por contarnos un poco más.";
      const summary = buildContactSummary(updatedDraft, friendlyIntro);
      pushAssistantMessage(summary, DEFAULT_FLOWS["contact-confirm"].choices);
      return;
    }

    if (step === "contact-confirm") {
      if (includesAny(normalizedValue, ["editar"])) {
        setStep("contact-name");
        pushAssistantMessage("De acuerdo, volvamos a empezar. ¿Cuál es tu nombre completo?");
        return;
      }

      if (includesAny(normalizedValue, ["menu", "volver"])) {
        resetToMenu();
        return;
      }

      if (!includesAny(normalizedValue, ["enviar", "si", "sí", "ok", "listo", "dale"])) {
        pushAssistantMessage(
          "Necesito que confirmes enviando “enviar” o “sí”. También puedes volver al menú.",
          DEFAULT_FLOWS["contact-confirm"].choices,
        );
        return;
      }

      await sleep(300);
      pushAssistantMessage("Enviando tus datos al equipo ABP...");

      try {
        const payload = {
          Nombre: contactDraft.name,
          Correo: contactDraft.email,
          Telefono: contactDraft.phone,
          Mensaje: contactDraft.notes,
          Fuente: "Chatbot ABP",
        };

        await fetch("https://formsubmit.co/ajax/klmendez@unimayor.edu.co", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        pushAssistantMessage(
          "¡Listo! 💛 Tu información llegó al equipo de ABP. Un asesor se comunicará contigo muy pronto.",
        );
      } catch {
        pushAssistantMessage(
          "Hubo un inconveniente al enviar tus datos. Si puedes, escríbenos al WhatsApp +57 320 865 4369 o al correo apbsegurosltda@gmail.com.",
        );
      }

      setStep("farewell");
      pushAssistantMessage(
        "¿Quieres explorar otra línea del portafolio o realizar otra acción?",
        DEFAULT_FLOWS["farewell"].choices,
      );
    }
  };

  const processInput = async (rawInput: string) => {
    const normalizedValue = normalizeInput(rawInput);

    if (!normalizedValue) {
      pushAssistantMessage("¿Podrías contarme un poco más para ayudarte mejor?");
      return;
    }

    if (includesAny(normalizedValue, ["volver", "menu"])) {
      resetToMenu();
      return;
    }

    if (includesAny(normalizedValue, ["cerrar", "gracias", "gracias!", "adios", "chao", "salir"])) {
      setStep("farewell");
      pushAssistantMessage(
        "Gracias por conversar con ABP. Estoy disponible si necesitas revisar otra opción. ¡Hasta pronto!",
      );
      return;
    }

    if (step === "root") {
      const handled = handleRootMatches(normalizedValue);
      if (!handled) {
        const docHits = searchDocs(rawInput, 3);
        const docAnswer = formatDocAnswer(docHits);
        if (docAnswer) {
          pushAssistantMessage(docAnswer, BASE_CHOICES);
        } else {
          pushAssistantMessage(
            "No identifiqué la opción. Usa el número (1-6) o una palabra clave como “ARL”, “vida”, “generales”, “bicicleta”, “simular” o “contacto”.",
            BASE_CHOICES,
          );
        }
      }
      return;
    }

    if (step.startsWith("line-")) {
      if (
        step === "line-ciclistas" &&
        includesAny(normalizedValue, ["simular", "prima", "cotizar", "bici", "bicicleta", "combo"])
      ) {
        startBikeFlow();
        return;
      }

      if (includesAny(normalizedValue, ["contact", "asesor", "agenda", "llamar", "hablar"])) {
        startContactFlow();
        return;
      }

      if (!includesAny(normalizedValue, ["menu", "volver"])) {
        const docHits = searchDocs(rawInput, 3);
        const docAnswer = formatDocAnswer(docHits);
        if (docAnswer) {
          pushAssistantMessage(docAnswer, DEFAULT_FLOWS[step].choices);
        } else {
          pushAssistantMessage(
            "¿Quieres que un asesor te contacte o prefieres volver al menú? Usa las opciones disponibles.",
            DEFAULT_FLOWS[step].choices,
          );
        }
        return;
      }

      resetToMenu();
      return;
    }

    if (step.startsWith("bike-")) {
      await handleBikeFlow(rawInput, normalizedValue);
      return;
    }

    if (step.startsWith("contact")) {
      await handleContactFlow(rawInput, normalizedValue);
      return;
    }

    if (step === "farewell") {
      if (includesAny(normalizedValue, ["menu", "volver"])) {
        resetToMenu();
        return;
      }

      pushAssistantMessage(
        "Si necesitas otra cosa más adelante, estaré aquí. ¡Gracias por confiar en ABP! 💛",
      );
      return;
    }

    pushAssistantMessage(
      "No identifiqué esa acción. Escribe “volver” para ir al menú o revisa las opciones disponibles.",
    );
  };

  const handleChat = async () => {
    if (!input.trim() || loading) return;

    const userContent = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userContent }]);
    setInput("");
    setLoading(true);

    try {
      await sleep(320);
      await processInput(userContent);
    } finally {
      setLoading(false);
    }
  };

  const handleChoiceClick = (choice: QuickChoice) => {
    if (loading) return;
    setInput(choice.value);
    setTimeout(() => {
      handleChat();
    }, 0);
  };

  return (
    <div className="pointer-events-none fixed bottom-4 left-4 right-4 z-50 font-sans sm:bottom-10 sm:left-auto sm:right-5 sm:w-auto">
      <div className="pointer-events-auto ml-auto flex w-full max-w-[420px] flex-col items-end gap-3 sm:max-w-none sm:gap-4">
        {isOpen && (
          <div className="flex h-[72vh] max-h-[640px] w-full flex-col overflow-hidden rounded-2xl border bg-white shadow-2xl sm:h-[520px] sm:max-h-none sm:w-[360px]">
            <header className="flex items-center justify-between bg-[#102545] p-4 text-white">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                  <img src={logoV} alt="ABP" className="h-7 w-7 object-contain" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-amber-400">Asistente ABP</p>
                  <p className="text-[0.7rem] text-white/70">
                    Explora el portafolio, simula primas o deja tus datos.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 transition hover:bg-white/20"
                aria-label="Cerrar asistente ABP"
              >
                <FiX />
              </button>
            </header>

            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto bg-gray-50 px-4 py-3 text-sm text-slate-700"
            >
              {messages.map((message, index) => (
                <div
                  key={`${index}-${message.role}`}
                  className={`mb-3 flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3 py-2 shadow ${
                      message.role === "user"
                        ? "bg-blue-600 text-white"
                        : "border border-[#102545]/20 bg-[#102545] text-white"
                    }`}
                  >
                    {message.content.split("\n").map((line, lineIndex) => (
                      <p
                        key={lineIndex}
                        className={[
                          "whitespace-pre-wrap leading-relaxed",
                          message.role === "assistant" ? "text-white" : "text-white",
                        ].join(" ")}
                      >
                        {line}
                      </p>
                    ))}

                    {message.role === "assistant" && message.choices && (
                      <div className="mt-3 flex flex-col gap-2">
                        {message.choices.map((choice) => (
                          <button
                            key={choice.value}
                            onClick={() => handleChoiceClick(choice)}
                            className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[0.75rem] font-semibold text-white transition hover:bg-white/20"
                          >
                            {choice.label}
                          </button>
                        ))}
                        <p className="text-[0.7rem] text-white/70">
                          También puedes escribir la opción manualmente.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="text-xs italic text-gray-400">
                  ABP está analizando tu consulta…
                </div>
              )}
            </div>

            {activeFlow?.followUp && (
              <div className="border-t border-[#102545]/20 bg-[#102545] px-4 py-2 text-[0.72rem] text-white/85">
                {activeFlow.followUp}
              </div>
            )}

            <div className="flex gap-2 border-t p-3">
              <input
                className="flex-1 rounded-lg bg-gray-100 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring-1"
                placeholder="Escribe tu mensaje o usa una opción…"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && handleChat()}
                disabled={loading}
              />
              <button
                onClick={handleChat}
                className="rounded-lg bg-[#102545] p-2 text-white transition hover:bg-[#0b1b36] disabled:opacity-60"
                disabled={loading}
                aria-label="Enviar"
              >
                <FiSend />
              </button>
            </div>
          </div>
        )}

        {!isOpen && showIntroBubble && (
          <button
            type="button"
            onClick={() => setShowIntroBubble(false)}
            className="relative flex w-full max-w-[280px] items-center gap-2 rounded-2xl border border-white/70 bg-white/95 px-4 py-3 text-left text-xs font-semibold text-[#102545] shadow-lg transition hover:translate-y-[-2px] sm:max-w-xs"
          >
            <span role="img" aria-hidden className="text-lg">🤖</span>
            <span className="flex-1 leading-snug">Hola, soy tu asistente virtual. ¡Haz clic y conversemos!</span>
            <span className="pointer-events-none absolute -bottom-1 right-6 h-3 w-3 rotate-45 border-b border-r border-white/70 bg-white" />
          </button>
        )}

        <button
          onClick={() => {
            setIsOpen((prev) => !prev);
            setShowIntroBubble(false);
          }}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#102545] text-2xl text-white shadow-lg transition hover:scale-105"
          aria-label={isOpen ? "Minimizar asistente ABP" : "Abrir asistente ABP"}
        >
          {hasUnread && !isOpen && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[0.6rem] font-semibold text-[#102545]">
              1
            </span>
          )}
          {isOpen ? <FiX /> : <FiMessageCircle />}
        </button>
      </div>
    </div>
  );
}

export default ChatbotWidget;
