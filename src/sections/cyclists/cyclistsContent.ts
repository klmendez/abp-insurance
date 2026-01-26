import type { IconType } from "react-icons";
import {
  FiActivity,
  FiAnchor,
  FiCompass,
  FiFeather,
  FiLifeBuoy,
  FiMapPin,
  FiShield,
  FiTrendingUp,
  FiAward,
  FiUser,
} from "react-icons/fi";

/* =========================
   NAV
========================= */
export type CyclistNavLink = {
  label: string;
  href: string;
  icon: IconType;
};

export const cyclistsNavLinks: CyclistNavLink[] = [
  { label: "Inicio", href: "#inicio", icon: FiCompass },
  { label: "Productos", href: "#productos", icon: FiLifeBuoy },
  { label: "Comparativa", href: "#comparativa", icon: FiTrendingUp },
  { label: "Historias", href: "#testimonios", icon: FiFeather },
  { label: "Calcula tu prima", href: "#calculadora", icon: FiAnchor },
  { label: "Preguntas frecuentes", href: "#faq", icon: FiShield },
  { label: "Contáctanos", href: "#contacto", icon: FiMapPin },
];

/* =========================
   HERO
   - Sin imágenes externas
   - Visual por icono + gradiente
========================= */
export type HeroStat = {
  label: string;
  value: string;
};

export type CyclistHeroSlide = {
  id: string;
  tag: string;
  title: string;
  description: string;
  highlight: string;

  /**
   * NUEVO: reemplaza image
   * Úsalo en el UI como “badge/icon” del slide.
   */
  visualIcon: IconType;

  /**
   * NUEVO: gradiente sugerido para background del slide o tarjeta.
   * Úsalo o ignóralo según tu diseño.
   */
  gradient: string;

  ctaLabel: string;

  /**
   * RECOMENDACIÓN:
   * Como tu sitio navega por secciones (#...), usamos anchors y no rutas tipo "/contacto".
   */
  ctaTo: string;

  stats: HeroStat[];
};

export const heroSlides: CyclistHeroSlide[] = [
  {
    id: "urbano",
    tag: "Rueda urbano",
    title: "Protección integral para tus trayectos diarios",
    description:
      "Coberturas que acompañan tu bici en la ciudad: robos, accidentes y asistencias en vía para llegar siempre seguro.",
    highlight: "Combo Vida + Bicicleta + Traslados en ciudad",
    visualIcon: FiCompass,
    gradient: "from-slate-900/80 via-slate-800/60 to-slate-900/80",
    ctaLabel: "Quiero asesoría urbana",
    ctaTo: "#contacto",
    stats: [
      { label: "Cobertura robo", value: "Hasta 25 M" },
      { label: "Asistencias", value: "24/7" },
      { label: "Ciudades", value: "+15" },
    ],
  },
  {
    id: "mtb",
    tag: "Ride MTB",
    title: "Para rodar en trail sin preocuparte",
    description:
      "Planes MTB que incluyen asistencia en montaña, rescate y protección de tu bici durante entrenamientos o travesías.",
    highlight: "Seguro de Accidentes + Bicicleta + Viaje",
    visualIcon: FiActivity,
    gradient: "from-emerald-950/70 via-slate-900/60 to-slate-900/80",
    ctaLabel: "Arma mi plan MTB",
    ctaTo: "#contacto",
    stats: [
      { label: "Eventos", value: "+120" },
      { label: "Traslados", value: "+180 km" },
      { label: "Rescates", value: "Incluido" },
    ],
  },
  {
    id: "competencia",
    tag: "Modo competencia",
    title: "Coberturas para carreras y viajes internacionales",
    description:
      "Declara tus eventos y recibe respaldo en viajes, responsabilidad civil y reembolso de inscripción por lesión.",
    highlight: "Seguro de Viaje + Responsabilidad Civil",
    visualIcon: FiAward,
    gradient: "from-indigo-950/70 via-slate-900/60 to-slate-900/80",
    ctaLabel: "Planifica tu temporada",
    ctaTo: "#contacto",
    stats: [
      { label: "Países", value: "+30" },
      { label: "Cobertura RC", value: "Hasta 200 k" },
      { label: "Reembolsos", value: "Opcional" },
    ],
  },
];

/* =========================
   PRODUCTS
========================= */
export type ProductBlock = {
  id: string;
  badge: string;
  title: string;
  description: string;
  highlight: string;
  items: string[];
  icon: IconType;
};

export const productBlocks: ProductBlock[] = [
  {
    id: "vida",
    badge: "Protección personal",
    title: "Seguro de Vida y Accidentes para Ciclistas",
    description:
      "Te cubre en caso de accidente mientras entrenas, te desplazas o participas en una rodada o evento.",
    highlight: "Muerte accidental · Incapacidad permanente · Gastos médicos",
    items: [
      "Muerte accidental en ciclismo recreativo, urbano o deportivo.",
      "Incapacidad permanente por accidente.",
      "Gastos médicos por accidente y auxilios por fracturas específicas.",
      "Rescate y traslados asistenciales en caso de emergencia.",
    ],
    icon: FiLifeBuoy,
  },
  {
    id: "bicicleta",
    badge: "Protección de tu equipo",
    title: "Seguro para la Bicicleta (Robo + Daños)",
    description:
      "Tu bici es una inversión: protéjela ante robo y daños por accidentes o caídas.",
    highlight: "Robo total · Daños por choque · Accesorios y marco",
    items: [
      "Robo total y robo calificado de la bicicleta.",
      "Daños por choque o caída durante tus rodadas.",
      "Cobertura en transporte terrestre y eventos.",
      "Protección opcional para accesorios y marco.",
    ],
    icon: FiShield,
  },
  {
    id: "viaje",
    badge: "Travesías y eventos",
    title: "Seguro de Viaje para Ciclistas",
    description:
      "Ideal para carreras, travesías y viajes en los que la bici es la protagonista.",
    highlight: "Asistencia médica · Traslados · Responsabilidad civil",
    items: [
      "Asistencia médica en viaje y cobertura de emergencias.",
      "Rescate y traslados asistenciales durante el recorrido.",
      "Bicicleta protegida durante el viaje y el evento.",
      "Responsabilidad civil y reembolso de inscripción (según plan).",
    ],
    icon: FiActivity,
  },
];

/* =========================
   BUNDLES
========================= */
export type ProductBundle = {
  id: string;
  title: string;
  description: string;
  target: string;
  benefits: string[];
};

export const productBundles: ProductBundle[] = [
  {
    id: "urbano",
    title: "Plan Urbano Inteligente",
    description:
      "Combina Vida + Bicicleta para quienes se mueven a diario por la ciudad con bici como transporte principal.",
    target: "Mensajeros, commuters y entregas",
    benefits: [
      "Cobertura por accidentes en trayectos laborales o personales.",
      "Robo + daños con deducibles ajustables.",
      "Traslados asistidos y auxilio mecánico en ciudad.",
    ],
  },
  {
    id: "mtb",
    title: "Plan Trail & MTB",
    description:
      "Protección integral para rutas de montaña, competencias amateur y viajes a bike parks.",
    target: "Riders MTB, enduro y gravel",
    benefits: [
      "Asistencias en rescate y evacuación en trail.",
      "Cobertura de bici durante transporte en carretera.",
      "Seguro de viaje con cobertura internacional opcional.",
    ],
  },
  {
    id: "competencia",
    title: "Plan Competitivo",
    description:
      "Diseñado para ciclistas de ruta y triatletas que compiten dentro y fuera del país.",
    target: "Equipos, clubes y triatletas",
    benefits: [
      "Declaración de eventos con ajuste de coberturas.",
      "Responsabilidad civil en competencias según reglamento.",
      "Reembolso de inscripción y gastos de viaje por lesión.",
    ],
  },
];

/* =========================
   TESTIMONIALS
   - Sin avatars (sin imágenes externas)
   - Visual por icono + etiqueta
========================= */
export type Testimonial = {
  id: string;
  name: string;
  role: string;
  discipline: string;
  message: string;
  highlight: string;

  /**
   * NUEVO: reemplaza avatar
   * Úsalo como icono del testimonio o “chip”.
   */
  visualIcon?: IconType;

  /**
   * NUEVO: opcional, iniciales para un avatar de texto (si lo quieres en UI)
   */
  initials?: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "laura",
    name: "Laura Méndez",
    role: "Diseñadora UX",
    discipline: "Commuter",
    message:
      "Uso la bici para todo en Bogotá. Con ABP me siento tranquila: cubren robo, accidentes y hasta la asistencia cuando pincho en la noche.",
    highlight: "Recreativo / Urbano",
    visualIcon: FiUser,
    initials: "LM",
  },
  {
    id: "andres",
    name: "Andrés Quiroga",
    role: "Entrenador MTB",
    discipline: "MTB",
    message:
      "Entreno grupos de MTB cada semana. El plan trail me cubre en entrenos y travesías, y mis alumnos también acceden a coberturas flexibles.",
    highlight: "Trail & MTB",
    visualIcon: FiActivity,
    initials: "AQ",
  },
  {
    id: "camila",
    name: "Camila Rojas",
    role: "Triatleta",
    discipline: "Ruta & Tri",
    message:
      "Competí en tres países este año. ABP me ayudó a declarar las carreras y a tener respaldo en viaje y responsabilidad civil.",
    highlight: "Competencias",
    visualIcon: FiAward,
    initials: "CR",
  },
];

/* =========================
   COMPARISON
========================= */
export type ComparisonFeature = {
  label: string;
  vida: string;
  bici: string;
  viaje: string;
};

export const comparisonFeatures: ComparisonFeature[] = [
  {
    label: "Cobertura principal",
    vida: "Vida y accidentes",
    bici: "Robo + daños",
    viaje: "Asistencia en viaje",
  },
  {
    label: "Ideal para",
    vida: "Tu salud y familia",
    bici: "Proteger tu inversión",
    viaje: "Eventos y travesías",
  },
  {
    label: "Incluye",
    vida: "Incapacidad, gastos médicos",
    bici: "Accesorios, transporte",
    viaje: "Rescate, responsabilidad civil",
  },
  {
    label: "Extras",
    vida: "Auxilios por fracturas",
    bici: "Cobertura internacional opcional",
    viaje: "Reembolso de inscripción",
  },
];

/* =========================
   CALCULATOR HINTS
========================= */
export type CalculatorHint = {
  title: string;
  description: string;
};

export const calculatorHints: CalculatorHint[] = [
  {
    title: "¿Viajas con frecuencia?",
    description:
      "Cuéntanos si participas en competencias, haces bikepacking o usas la bici como transporte diario para ajustar coberturas.",
  },
  {
    title: "Valor de tu bicicleta",
    description:
      "Usa el valor comercial actual incluyendo mejoras o accesorios que quieras asegurar.",
  },
  {
    title: "Deducibles y asistencias",
    description:
      "Podemos ajustar deducibles, incluir asistencias mecánicas y coberturas adicionales según tu disciplina.",
  },
];

/* =========================
   FAQ
========================= */
export const faqItems = [
  {
    question: "¿Puedo asegurar mi bici y también mi vida como ciclista?",
    answer:
      "Sí, puedes combinar el seguro de vida y accidentes con el seguro de bicicleta y el seguro de viaje. Diseñamos una propuesta integral según tu estilo de ciclismo.",
  },
  {
    question: "¿Este seguro cubre competencias?",
    answer:
      "Cubre entrenamientos, rodadas y eventos recreativos. Para competencias específicas declaramos el evento y ajustamos la cobertura con la aseguradora.",
  },
  {
    question: "¿Qué necesito para asegurar mi bicicleta?",
    answer:
      "Necesitas prueba de propiedad (factura o soporte), fotos de la bici y los datos: marca, modelo, referencia y número de serie.",
  },
];
