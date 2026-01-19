import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

type ServiceDetail = {
  heading: string;
  items: string[];
};

type Service = {
  title: string;
  quote: string;
  details: ServiceDetail[];
  cta: {
    label: string;
    to: string;
  };
};

const services: Service[] = [
  {
    title: "Acompañamiento",
    quote: "Caminamos contigo en cada decisión, siempre cerca.",
    details: [
      {
        heading: "Servicios clave",
        items: [
          "Riesgos laborales (ARL).",
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
    cta: {
      label: "Ver portafolio de Acompañamiento",
      to: "/portafolio/riesgos-laborales",
    },
  },
  {
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
    cta: {
      label: "Ver portafolio de Bienestar",
      to: "/portafolio/seguros-vida",
    },
  },
  {
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
    cta: {
      label: "Ver portafolio de Protección",
      to: "/portafolio/seguros-generales",
    },
  },
];

export const ServicesSection = () => {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [activeDetailIndex, setActiveDetailIndex] = useState(0);

  const activeService = services[activeServiceIndex];
  const activeDetail = activeService.details[activeDetailIndex];

  const activeInitial = activeService.title.charAt(0);

  return (
    <section
      id="portafolio"
      className="relative overflow-hidden bg-gradient-to-br from-[#050b1a] via-[#0e2238] to-[#113862] py-16 sm:py-20 md:py-24 text-white"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.10),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(19,118,255,0.18),transparent_60%)]" />
        <div className="absolute -right-28 top-16 h-64 w-64 rounded-full bg-[#1e5bb3]/30 blur-3xl" />
        <div className="absolute -bottom-40 -left-16 h-72 w-72 rounded-full bg-[#0a7bd7]/25 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-6 flex items-center justify-center lg:justify-start">
          <span className="text-sm md:text-base font-semibold uppercase tracking-[0.35em] text-white/80">
            MODELO ESTRATEGICO
          </span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.38fr_1.62fr] lg:items-start">
          <div className="flex flex-col items-center lg:items-start gap-5">
            <div className="flex md:hidden items-center justify-center gap-4">
              {services.map((service, index) => {
                const isActive = index === activeServiceIndex;

                return (
                  <button
                    key={service.title}
                    onClick={() => {
                      setActiveServiceIndex(index);
                      setActiveDetailIndex(0);
                    }}
                    className="focus:outline-none"
                  >
                    <motion.span
                      whileTap={{ scale: 0.95 }}
                      whileHover={{
                        filter: "brightness(1.12)",
                        boxShadow: "0 0 18px rgba(245,192,104,0.35)",
                      }}
                      className={`flex size-12 items-center justify-center rounded-full border text-lg font-semibold transition
                        ${
                          isActive
                            ? "border-[#f7e7b0] bg-gradient-to-br from-[#f7e7b0] via-[#e6c768] to-[#d4af37] text-[#152746]"
                            : "border-white/80 bg-white/90 text-[#152746]"
                        }`}
                    >
                      {service.title.charAt(0)}
                    </motion.span>
                  </button>
                );
              })}
            </div>

            <div className="mt-3 text-center md:hidden">
              <p className="text-xs uppercase tracking-widest text-abp-gold">
                Sección seleccionada
              </p>
              <p className="text-sm font-semibold text-abp-gold">
                {activeService.title}
              </p>
            </div>

            <div className="hidden md:flex flex-col gap-6">
              {services.map((service, index) => {
                const isActive = index === activeServiceIndex;

                return (
                  <button
                    key={service.title}
                    onClick={() => {
                      setActiveServiceIndex(index);
                      setActiveDetailIndex(0);
                    }}
                    className="flex items-center"
                  >
                    <div className="relative flex items-center">
                      <motion.span
                        whileHover={{
                          scale: 1.06,
                          filter: "brightness(1.12)",
                          boxShadow: "0 0 22px rgba(245,192,104,0.30)",
                        }}
                        transition={{ duration: 0.18 }}
                        className={`relative z-10 flex size-20 items-center justify-center rounded-full border text-2xl font-bold transition
                          ${
                            isActive
                              ? "border-[#f7e7b0] bg-gradient-to-br from-[#f7e7b0] via-[#e6c768] to-[#d4af37] text-[#152746]"
                              : "border-white/25 bg-white/10 text-white"
                          }`}
                      >
                        {service.title.charAt(0)}
                      </motion.span>

                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, x: 8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 8 }}
                          transition={{ duration: 0.18 }}
                          className="
                            relative
                            -ml-6
                            pl-10 pr-6 py-2
                            bg-white 
                            text-[#152746]
                            text-base font-semibold
                            border border-slate-200
                            shadow-lg
                            rounded-none
                            z-0
                          "
                        >
                          {service.title}
                        </motion.div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="rounded-xl border border-slate-200 bg-white px-5 py-6 md:px-7 md:py-8 text-slate-900"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#f7e7b0] bg-gradient-to-br from-[#f7e7b0] via-[#e6c768] to-[#d4af37] text-[#152746] font-bold">
                  {activeInitial}
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-blue-900">
                    {activeService.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    {activeService.quote}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-4 border-b pb-2">
                {activeService.details.map((detail, idx) => {
                  const selected = idx === activeDetailIndex;
                  return (
                    <button
                      key={detail.heading}
                      onClick={() => setActiveDetailIndex(idx)}
                      className={`border-b-2 pb-1 text-xs uppercase tracking-wide font-semibold transition
                        ${
                          selected
                            ? "text-[#d4af37] border-[#d4af37]"
                            : "text-slate-500 border-transparent hover:border-[#f7e7b0] hover:text-[#f7e7b0]"
                        }`}
                    >
                      {detail.heading}
                    </button>
                  );
                })}
              </div>

              <motion.div
                key={activeDetail.heading}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="mt-6 grid gap-6 md:grid-cols-[0.9fr_1.1fr]"
              >
                <div>
                  <p className="text-xs uppercase font-semibold text-blue-900 tracking-wide">
                    Categoría
                  </p>
                  <h4 className="text-lg font-semibold text-blue-900 mt-1">
                    {activeDetail.heading}
                  </h4>
                  <p className="mt-3 text-sm text-slate-600">
                    Esta categoría reúne elementos clave de{" "}
                    <span className="font-medium">
                      {activeService.title.toLowerCase()}
                    </span>{" "}
                    que se adaptan a tus necesidades.
                  </p>
                  <p className="mt-3 text-xs text-[#b8952f]">
                    Incluye {activeDetail.items.length} elementos.
                  </p>
                </div>

                <div className="space-y-4">
                  {activeDetail.items.map((item) => (
                    <div key={item} className="border-b pb-3 last:border-none">
                      <div className="flex items-start gap-2 mt-1">
                        <FiCheck className="h-4 w-4 text-[#d4af37] mt-0.5" />
                        <p className="text-sm text-slate-700">{item}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <div className="mt-7">
                <Link
                  to={activeService.cta.to}
                  className="
                    btn-modern
                    w-full sm:w-auto
                    inline-flex items-center justify-center gap-2
                    text-[clamp(0.65rem,0.75vw,0.75rem)]
                    tracking-tight px-5 py-2.5
                    !bg-abp-gold !text-[#030712]
                  "
                >
                  {activeService.cta.label}
                  <FiArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
