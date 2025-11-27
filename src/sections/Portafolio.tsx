import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { Link } from "react-router-dom";
import { FiShield, FiUsers, FiLayers, FiActivity, FiArrowRight } from "react-icons/fi";
import type { IconType } from "react-icons";

type SubCategory = {
  label: string;
  description?: string;
  items: string[];
};

type PortfolioBlock = {
  code: "A" | "B" | "C" | "D";
  title: string;
  subtitle: string;
  description: string;
  icon: IconType;
  image: string;
  subcategories: SubCategory[];
};

const portfolioBlocks: PortfolioBlock[] = [
  {
    code: "A",
    title: "Seguros de Riesgos Laborales (ARL) – Positiva",
    subtitle: "Gestión integral de riesgos laborales",
    description:
      "Acompañamos a las empresas en afiliación, prevención y atención de accidentes y enfermedades laborales, fortaleciendo tu gestión en SG-SST.",
    icon: FiActivity,
    image: "/portafolio-arl.jpg", // cambia por tu imagen real
    subcategories: [
      {
        label: "Gestión de afiliación",
        description: "Afiliación y novedades en ARL para tu organización.",
        items: [
          "Afiliación a ARL para empresas, independientes y contratistas.",
          "Clasificación de riesgo y apoyo en lectura de tarifas.",
          "Actualización de centros de trabajo y cargos.",
          "Gestión de traslados y novedades de personal.",
        ],
      },
      {
        label: "Siniestros",
        description:
          "Acompañamiento ante accidentes de trabajo y enfermedades laborales.",
        items: [
          "Orientación en reporte de accidentes de trabajo (AT) y enfermedades laborales (EL).",
          "Acompañamiento en el reconocimiento de incapacidades e indemnizaciones.",
          "Gestión frente a prestaciones asistenciales: atención médica y rehabilitación.",
        ],
      },
      {
        label: "Prevención y SG-SST",
        description: "Prevención, cultura de seguridad y mejora continua.",
        items: [
          "Apoyo en matrices de riesgo y planes de acción.",
          "Coordinación de capacitaciones con la ARL.",
          "Campañas de prevención y cultura de seguridad.",
          "Acompañamiento en auditorías y planes de mejora.",
        ],
      },
    ],
  },
  {
    code: "B",
    title: "Seguros de Vida – Positiva & AXA Colpatria",
    subtitle: "Bienestar para personas, familias y equipos",
    description:
      "Soluciones de vida que protegen proyectos, responsabilidades y a quienes más importan: personas, familias y equipos de trabajo.",
    icon: FiUsers,
    image: "/portafolio-vida.jpg",
    subcategories: [
      {
        label: "Vida personal",
        description: "Protección para ti y tu familia.",
        items: [
          "Seguro de vida con o sin ahorro.",
          "Seguro de vida temporal.",
          "Seguro de vida deudores para créditos y obligaciones.",
          "Vida para independientes y profesionales.",
        ],
      },
      {
        label: "Vida empresarial · colectivo",
        description: "Beneficios para colaboradores y equipos de trabajo.",
        items: [
          "Pólizas colectivas para colaboradores.",
          "Cobertura en caso de fallecimiento.",
          "Cobertura por incapacidad total y permanente.",
          "Beneficios adicionales: exequias, auxilios y servicios complementarios.",
        ],
      },
    ],
  },
  {
    code: "C",
    title: "Seguros Generales – en trámite con Seguros del Estado y Seguros Mundial",
    subtitle: "Protección patrimonial para empresas y personas",
    description:
      "Protegemos activos, operación y proyectos de empresas, personas y sectores específicos con un portafolio de seguros generales.",
    icon: FiShield,
    image: "/portafolio-generales.jpg",
    subcategories: [
      {
        label: "Empresas",
        description: "Protección para la operación y los activos.",
        items: [
          "Responsabilidad civil.",
          "Incendio, terremoto y daños a la propiedad.",
          "Todo riesgo daños materiales.",
          "Transporte de mercancías.",
          "Seguros para flotas y vehículos empresariales.",
        ],
      },
      {
        label: "Personas",
        description: "Seguros para tu patrimonio personal.",
        items: [
          "Autos y motos.",
          "Seguro de hogar: vivienda, contenido y responsabilidad familiar.",
          "Arriendo seguro para propietarios.",
          "Seguros para pymes y emprendedores.",
        ],
      },
      {
        label: "Sectores",
        description: "Proyectos y sectores especializados.",
        items: [
          "Todo Riesgo Construcción (TRC).",
          "Todo Riesgo Montaje y equipos de ingeniería.",
          "Equipos electrónicos y maquinaria especializada.",
        ],
      },
    ],
  },
  {
    code: "D",
    title: "Línea Ciclistas – Vida, Bicicleta y Viaje",
    subtitle: "Protección integral para ciclistas",
    description:
      "Portafolio especializado para ciclistas recreativos, urbanos y deportivos: vida, accidentes, bicicleta y viajes a eventos y travesías.",
    icon: FiLayers,
    image: "/portafolio-ciclistas.jpg",
    subcategories: [
      {
        label: "Vida ciclista",
        description: "Seguro de Vida y Accidentes para Ciclistas.",
        items: [
          "Muerte accidental en bicicleta.",
          "Incapacidad permanente por accidente.",
          "Gastos médicos y fracturas específicas.",
          "Auxilio por hospitalización e incapacidad.",
        ],
      },
      {
        label: "Bicicleta",
        description: "Seguro para la bicicleta en uso y transporte.",
        items: [
          "Robo total y robo calificado.",
          "Daños por choque o caída.",
          "Cobertura de accesorios y marco (opcional).",
          "Protección durante transporte terrestre.",
        ],
      },
      {
        label: "Viaje",
        description: "Seguro de Viaje para Ciclistas.",
        items: [
          "Asistencia médica en viaje.",
          "Rescate y traslados asistenciales.",
          "Bicicleta protegida en viajes y eventos.",
          "Responsabilidad civil y reembolso de inscripción (según plan).",
        ],
      },
    ],
  },
];

export const PortafolioSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSubIndex, setActiveSubIndex] = useState(0);

  const activeBlock = portfolioBlocks[activeIndex];
  const activeSub = activeBlock.subcategories[activeSubIndex];
  const isCyclists = activeBlock.code === "D";

  return (
    <section id="portafolio-seguros" className="bg-[#f4f6ff] py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* HEADER */}
        <FadeInWhenVisible className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-abp-blue/70">
            Portafolio de seguros
          </span>
          <h2 className="mt-3 text-3xl font-semibold text-abp-blue md:text-4xl">
            Un portafolio articulado en torno al modelo Acompañamiento, Bienestar y Protección.
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Integramos seguros de personas, riesgos laborales y seguros generales, además de una línea
            especializada para ciclistas, para proteger lo que eres, lo que haces y lo que construyes.
          </p>
        </FadeInWhenVisible>

        {/* TABS GRANDES A · B · C · D */}
        <div className="mt-8 flex flex-wrap gap-3">
          {portfolioBlocks.map((block, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={block.code}
                type="button"
                onClick={() => {
                  setActiveIndex(index);
                  setActiveSubIndex(0);
                }}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.22em] transition
                  ${
                    isActive
                      ? "border-abp-blue bg-[#eef3ff] text-abp-blue shadow-sm"
                      : "border-slate-300 bg-white text-slate-600 hover:border-abp-blue/50 hover:text-abp-blue"
                  }`}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-abp-blue text-[0.75rem] text-white">
                  {block.code}
                </span>
                <span className="line-clamp-1">{block.title}</span>
              </button>
            );
          })}
        </div>

        {/* BLOQUE GRANDE: IMAGEN + CONTENIDO */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1.1fr)] items-stretch">
          {/* IMAGEN GRANDE */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeBlock.code + "-image"}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25 }}
              className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-md min-h-[320px] lg:min-h-[420px]"
            >
              <img
                src={activeBlock.image}
                alt={activeBlock.title}
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <div className="inline-flex items-center gap-2 rounded-full bg-black/35 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.22em]">
                  <activeBlock.icon className="h-3.5 w-3.5" />
                  {activeBlock.subtitle}
                </div>
                <h3 className="mt-3 text-lg font-semibold md:text-xl">
                  {activeBlock.title}
                </h3>
                <p className="mt-2 text-sm text-slate-100">
                  {activeBlock.description}
                </p>

                {/* CTA especial para ciclistas */}
                {isCyclists && (
                  <div className="mt-3">
                    <Link
                      to="/ciclistas"
                      className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-abp-blue shadow-sm hover:bg-white"
                    >
                      Ver portafolio para ciclistas
                      <FiArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* PANEL DETALLE + BOTONES */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeBlock.code + "-panel"}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col rounded-3xl border border-slate-200 bg-white px-6 py-7 shadow-md md:px-7 md:py-8"
            >
              {/* Subcategorías como chips */}
              <div className="flex flex-wrap gap-2">
                {activeBlock.subcategories.map((sub, idx) => {
                  const selected = idx === activeSubIndex;
                  return (
                    <button
                      key={sub.label}
                      type="button"
                      onClick={() => setActiveSubIndex(idx)}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] transition
                        ${
                          selected
                            ? "border-abp-blue bg-[#eef3ff] text-abp-blue shadow-sm"
                            : "border-slate-300 text-slate-600 hover:border-abp-blue/40"
                        }`}
                    >
                      <FiLayers className="h-3.5 w-3.5" />
                      {sub.label}
                    </button>
                  );
                })}
              </div>

              {/* Detalle de subcategoría */}
              <motion.div
                key={activeSub.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="mt-5 grid flex-1 gap-4 md:grid-cols-2"
              >
                <div className="rounded-2xl border border-slate-200 bg-[#f7f8ff] px-4 py-4">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-abp-blue/80">
                    {activeSub.label}
                  </p>
                  {activeSub.description && (
                    <p className="mt-2 text-sm text-slate-700">
                      {activeSub.description}
                    </p>
                  )}
                  {isCyclists && (
                    <p className="mt-3 text-[0.8rem] text-slate-600">
                      Ideal para ciclistas recreativos, urbanos, de ruta y MTB que
                      quieren rodar con tranquilidad.
                    </p>
                  )}
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
                    Coberturas y alcances
                  </p>
                  <ul className="mt-3 space-y-2.5 text-sm text-slate-700">
                    {activeSub.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-abp-blue" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* BOTONES DE ACCIÓN */}
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 rounded-full bg-abp-blue px-5 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white hover:bg-abp-blue/90"
                >
                  Solicitar asesoría sobre este portafolio
                  <FiArrowRight className="h-3.5 w-3.5" />
                </a>

                {isCyclists ? (
                  <Link
                    to="/ciclistas"
                    className="inline-flex items-center gap-2 rounded-full border border-abp-blue/30 bg-white px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-abp-blue hover:border-abp-blue/70"
                  >
                    Ver landing de ciclistas
                  </Link>
                ) : (
                  <a
                    href="mailto:abpseguros@gmail.com"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-slate-700 hover:border-abp-blue/40 hover:text-abp-blue"
                  >
                    Escribir a ABP sobre este producto
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
