import { useState } from "react";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Diagnóstico",
    short: "Entendemos tu contexto y tus riesgos.",
    description:
      "Analizamos tu situación actual, identificamos brechas de protección y priorizamos lo que realmente importa para tu empresa y tu familia.",
  },
  {
    number: "02",
    title: "Diseño",
    short: "Armamos la estrategia a tu medida.",
    description:
      "Construimos una propuesta integral alineada con el modelo Acompañamiento–Bienestar–Protección, combinando seguros y servicios que se ajustan a tu realidad.",
  },
  {
    number: "03",
    title: "Implementación",
    short: "Llevamos el plan a la práctica.",
    description:
      "Coordinamos afiliaciones, pólizas y programas con aseguradoras y aliados estratégicos, acompañando cada paso del proceso.",
  },
  {
    number: "04",
    title: "Seguimiento",
    short: "No te dejamos solo después de firmar.",
    description:
      "Monitoreamos indicadores, siniestralidad y cumplimiento normativo, con presencia constante para ajustar y mejorar cuando sea necesario.",
  },
];

export const ProcessSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = steps[activeIndex];

  return (
    <section
      id="proceso"
      className="relative overflow-hidden bg-[#f4f6ff] py-16"
    >
      {/* MANCHA AZUL ANIMADA */}
      <motion.div
        className="pointer-events-none absolute -right-32 top-4 h-64 w-64 rounded-full bg-abp-blue/15 blur-3xl"
        initial={{ x: 30, y: -10, opacity: 0.7 }}
        animate={{ x: 0, y: 10, opacity: 1 }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* HEADER */}
        <FadeInWhenVisible className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-abp-blue/70">
            Proceso ABP
          </span>
          <h2 className="mt-2 text-3xl font-display text-abp-ink md:text-4xl">
            Te acompañamos de principio a fin
          </h2>
          <p className="mt-3 text-sm text-slate-600 md:text-base">
            Un proceso claro en cuatro pasos para que tomes decisiones de protección
            con tranquilidad y respaldo.
          </p>
        </FadeInWhenVisible>

        {/* CONTENIDO */}
        <div className="mt-10 grid gap-8 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.05fr)] md:items-start">
          {/* TIMELINE IZQUIERDA */}
          <FadeInWhenVisible>
            <div className="relative rounded-2xl bg-white/80 p-4 shadow-sm">
              {/* Línea vertical */}
              <div className="absolute left-6 top-6 bottom-6 hidden w-[2px] bg-slate-200 md:block" />

              <ul className="space-y-2">
                {steps.map((step, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <li key={step.number}>
                      <button
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className="group flex w-full items-start gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-slate-50"
                      >
                        {/* NÚMERO + INDICADOR */}
                        <div className="relative mt-0.5 flex flex-col items-center">
                          <div
                            className={[
                              "flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold transition-colors",
                              isActive
                                ? "border-abp-blue bg-abp-blue text-white"
                                : "border-abp-blue/20 bg-abp-blue/5 text-abp-blue",
                            ].join(" ")}
                          >
                            {step.number}
                          </div>

                          {isActive && (
                            <motion.div
                              layoutId="process-indicator"
                              className="mt-1 h-6 w-[2px] rounded-full bg-abp-blue md:h-10"
                            />
                          )}
                        </div>

                        {/* TEXTO */}
                        <div className="flex-1 text-left">
                          <p
                            className={`text-[0.7rem] font-semibold uppercase tracking-[0.22em] ${
                              isActive
                                ? "text-abp-blue"
                                : "text-slate-500 group-hover:text-abp-blue"
                            }`}
                          >
                            {step.title}
                          </p>
                          <p
                            className={`mt-1 text-sm ${
                              isActive ? "text-slate-800" : "text-slate-600"
                            }`}
                          >
                            {step.short}
                          </p>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </FadeInWhenVisible>

          {/* DETALLE DERECHA */}
          <FadeInWhenVisible>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.number}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="rounded-2xl border border-abp-blue/15 bg-white px-5 py-5 shadow-sm md:px-7 md:py-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-abp-blue/80">
                      Paso {activeStep.number}
                    </p>
                    <h3 className="mt-1 text-lg font-display text-abp-ink md:text-xl">
                      {activeStep.title}
                    </h3>
                  </div>
                  <span className="inline-flex rounded-full bg-abp-blue/10 px-3 py-1 text-[0.7rem] font-medium text-abp-blue">
                    Proceso ABP
                  </span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  {activeStep.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2 text-[0.7rem] text-slate-600">
                  <span className="rounded-full bg-[#f4f6ff] px-3 py-1">
                    Acompañamiento constante
                  </span>
                  <span className="rounded-full bg-[#f4f6ff] px-3 py-1">
                    Lenguaje claro
                  </span>
                  <span className="rounded-full bg-[#f4f6ff] px-3 py-1">
                    Aliados aseguradores
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
};
