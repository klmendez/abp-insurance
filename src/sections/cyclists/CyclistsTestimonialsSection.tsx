import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { testimonials } from "./cyclistsContent";
import { FiArrowLeft, FiArrowRight, FiFeather } from "react-icons/fi";

const CARD_VARIANTS = {
  enter: { opacity: 0, x: 24 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
};

export const CyclistsTestimonialsSection = () => {
  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const active = testimonials[index];

  return (
    <section
      id="testimonios"
      className="bg-gradient-to-b from-abp-light via-white to-abp-cream py-28"
    >
      <div className="mx-auto max-w-5xl px-6">
        <FadeInWhenVisible className="max-w-3xl text-center md:text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-abp-blue/10 px-4 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-abp-blue">
            <FiFeather className="size-3.5" /> Historias ciclistas reales
          </span>
          <h2 className="mt-4 text-3xl font-semibold text-abp-blue md:text-4xl">
            Riders que ya confían en la protección ABP.
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Cada plan se diseña a la medida. Descubre cómo combinan Vida, Bicicleta y Viaje quienes ruedan contigo.
          </p>
        </FadeInWhenVisible>

        <div className="mt-10 flex items-center justify-between gap-4">
          <div className="hidden text-sm text-slate-500 md:block">
            {index + 1}/{testimonials.length}
          </div>
          <div className="flex flex-1 items-center justify-end gap-3">
            <button
              type="button"
              onClick={handlePrev}
              className="flex size-9 items-center justify-center rounded-full border border-abp-blue/30 bg-white text-abp-blue shadow-sm transition hover:border-abp-blue/60 hover:bg-abp-blue/5"
              aria-label="Historia anterior"
            >
              <FiArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="flex size-9 items-center justify-center rounded-full border border-abp-blue/30 bg-white text-abp-blue shadow-sm transition hover:border-abp-blue/60 hover:bg-abp-blue/5"
              aria-label="Historia siguiente"
            >
              <FiArrowRight className="size-4" />
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)] md:items-center">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                variants={CARD_VARIANTS}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35 }}
                className="rounded-3xl border border-abp-blue/20 bg-white/70 p-6 shadow-lg backdrop-blur"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-full bg-abp-blue/10 text-abp-blue">
                    {active.avatar ? (
                      <img
                        src={active.avatar}
                        alt={active.name}
                        className="size-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-lg font-semibold">{active.name[0]}</span>
                    )}
                  </div>
                  <div>
                    <p className="text-[0.75rem] font-semibold uppercase tracking-[0.24em] text-abp-blue/80">
                      {active.highlight}
                    </p>
                    <p className="text-base font-semibold text-abp-slate">{active.name}</p>
                    <p className="text-sm text-slate-500">
                      {active.role} · {active.discipline}
                    </p>
                  </div>
                </div>

                <p className="mt-5 text-sm text-slate-700">“{active.message}”</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <FadeInWhenVisible className="space-y-4 rounded-3xl border border-abp-gold/40 bg-white/80 p-6 shadow-sm backdrop-blur">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-abp-gold/80">
              ¿Por qué funciona?
            </p>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex gap-2">
                <span className="mt-1 size-2 rounded-full bg-abp-blue" />
                Asesoría personalizada según tu disciplina y frecuencia de uso.
              </li>
              <li className="flex gap-2">
                <span className="mt-1 size-2 rounded-full bg-abp-blue" />
                Declaración de eventos y viajes para ajustar coberturas reales.
              </li>
              <li className="flex gap-2">
                <span className="mt-1 size-2 rounded-full bg-abp-blue" />
                Acompañamiento en reclamaciones y asistencias cuando más lo necesitas.
              </li>
            </ul>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
};
