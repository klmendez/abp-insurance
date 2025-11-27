import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import {
  FiBriefcase,
  FiHome,
  FiShield,
  FiCheck,
  FiLayers,
} from "react-icons/fi";
import type { IconType } from "react-icons";

type ServiceDetail = {
  heading: string;
  items: string[];
};

type Service = {
  icon: IconType;
  title: string;
  quote: string;
  details: ServiceDetail[];
};

const services: Service[] = [
  {
    icon: FiHome,
    title: "Acompañamiento",
    quote: "Caminamos contigo en cada decisión, siempre cerca.",
    details: [
      {
        heading: "Servicios clave",
        items: [
          "Riesgos laborales (ARL – Positiva).",
          "Afiliación, clasificación de riesgo y novedades.",
          "Reporte y gestión de accidentes laborales.",
        ],
      },
      {
        heading: "Gestión empresarial",
        items: [
          "Mejora del SG-SST.",
          "Capacitaciones y programas con ARL.",
          "Análisis de siniestralidad.",
        ],
      },
      {
        heading: "Asegurado – aseguradora",
        items: [
          "Acompañamiento en siniestros.",
          "Reclamaciones y seguimiento.",
          "Asesoría consultiva más completa.",
        ],
      },
    ],
  },
  {
    icon: FiShield,
    title: "Bienestar",
    quote: "Protegemos tu tranquilidad y la de quienes dependen de ti.",
    details: [
      {
        heading: "Vida",
        items: [
          "Vida individual (con o sin ahorro).",
          "Vida deudores.",
          "Vida colectivo para empleados.",
        ],
      },
      {
        heading: "Bienestar familiar",
        items: [
          "Coberturas por fallecimiento e incapacidad.",
          "Beneficios integrales para colaboradores.",
          "Planes de bienestar asegurado.",
        ],
      },
      {
        heading: "Cultura aseguradora",
        items: [
          "Charlas y talleres de prevención.",
          "Educación financiera.",
          "Programas especiales para deportistas.",
        ],
      },
    ],
  },
  {
    icon: FiBriefcase,
    title: "Protección",
    quote: "Cuidamos tu patrimonio y la operación de tu empresa.",
    details: [
      {
        heading: "Protección empresarial",
        items: [
          "Programas integrales de seguros.",
          "Diseño de esquemas para operación.",
        ],
      },
      {
        heading: "Protección patrimonial",
        items: [
          "Seguros generales.",
          "RC, incendio, terremoto y daños materiales.",
          "Flotas, autos y hogar.",
        ],
      },
      {
        heading: "Protección especializada",
        items: [
          "Bicicletas y equipos.",
          "Viajes y eventos deportivos.",
          "Productos para nichos específicos.",
        ],
      },
    ],
  },
];

export const ServicesSection = () => {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [activeDetailIndex, setActiveDetailIndex] = useState(0);

  const activeService = services[activeServiceIndex];
  const activeDetail = activeService.details[activeDetailIndex];

  return (
    <section id="portafolio" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* HEADER */}
        <FadeInWhenVisible className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
            Modelo A · B · P
          </span>
          <h2 className="mt-3 text-3xl font-semibold text-abp-blue md:text-4xl">
            Soluciones integrales para acompañamiento, bienestar y protección.
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Tres ejes que se integran para fortalecer la seguridad, bienestar y
            protección de tu organización.
          </p>
        </FadeInWhenVisible>

        {/* SELECTOR DE A · B · P */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {services.map((service, index) => {
            const isActive = index === activeServiceIndex;

            return (
              <FadeInWhenVisible key={service.title}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveServiceIndex(index);
                    setActiveDetailIndex(0);
                  }}
                  className={`group flex h-full flex-col items-start gap-2 rounded-2xl border px-5 py-4 text-left transition-all
                    ${
                      isActive
                        ? "border-abp-blue bg-[#eef3ff] shadow-sm"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                >
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full transition-all
                      ${
                        isActive
                          ? "bg-abp-blue text-white"
                          : "bg-[#e8f0ff] text-abp-blue group-hover:bg-abp-blue group-hover:text-white"
                      }`}
                  >
                    <service.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p
                      className={`text-sm font-semibold ${
                        isActive ? "text-abp-blue" : "text-slate-800"
                      }`}
                    >
                      {service.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-600 line-clamp-2">
                      {service.quote}
                    </p>
                  </div>
                </button>
              </FadeInWhenVisible>
            );
          })}
        </div>

        {/* PANEL DETALLE */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="rounded-3xl border border-slate-200 bg-[#f7f8ff] px-6 py-6 shadow-sm md:px-8 md:py-8"
            >
              {/* ENCABEZADO DEL PANEL */}
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e0e8ff] text-abp-blue">
                    <activeService.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-abp-blue md:text-xl">
                      {activeService.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      {activeService.quote}
                    </p>
                  </div>
                </div>

                {/* CHIPS DE CATEGORÍAS */}
                <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                  {activeService.details.map((detail, idx) => {
                    const selected = idx === activeDetailIndex;
                    return (
                      <button
                        key={detail.heading}
                        type="button"
                        onClick={() => setActiveDetailIndex(idx)}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] transition
                          ${
                            selected
                              ? "border-abp-blue bg-white text-abp-blue shadow-sm"
                              : "border-slate-300 text-slate-600 hover:border-abp-blue/50"
                          }`}
                      >
                        <FiLayers className="h-3.5 w-3.5" />
                        {detail.heading}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ITEMS DEL DETALLE ACTIVO */}
              <motion.div
                key={activeDetail.heading}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="mt-6 grid gap-4 md:grid-cols-2"
              >
                {activeDetail.items.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-abp-blue/40 hover:shadow-md"
                  >
                    <div className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                      <FiCheck className="h-4 w-4 text-abp-blue" />
                      Incluye
                    </div>
                    <p className="mt-2 text-[0.9rem] leading-relaxed text-slate-700">
                      {item}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
