import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiArrowRight, FiCheck } from "react-icons/fi";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { productBlocks } from "./cyclistsContent";

export const CyclistsProductsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? productBlocks.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === productBlocks.length - 1 ? 0 : prev + 1));
  };

  const active = productBlocks[activeIndex];
  const ActiveIcon = active.icon;

  return (
    <section id="productos" className="bg-abp-light py-28">
      <div className="mx-auto max-w-6xl px-6">
        <FadeInWhenVisible className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-abp-blue/70">
            Productos para ciclistas
          </span>
          <h2 className="mt-3 text-3xl font-semibold text-abp-blue md:text-4xl">
            Tres soluciones base que puedes combinar y personalizar según tu estilo de ciclismo.
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Recreativo, urbano, de ruta, MTB o competencia: arma tu mix ideal y decide qué tan lejos quieres llevar tus coberturas.
          </p>
        </FadeInWhenVisible>

        <div className="mt-10 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={handlePrev}
            className="flex size-9 items-center justify-center rounded-full border border-abp-blue/30 bg-white text-abp-blue shadow-sm transition hover:border-abp-blue/60 hover:bg-abp-blue/5"
            aria-label="Producto anterior"
          >
            <FiArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="flex size-9 items-center justify-center rounded-full border border-abp-blue/30 bg-white text-abp-blue shadow-sm transition hover:border-abp-blue/60 hover:bg-abp-blue/5"
            aria-label="Producto siguiente"
          >
            <FiArrowRight className="size-4" />
          </button>
        </div>

        <div className="-mx-6 mt-6 flex overflow-x-auto pb-4 md:mx-0 md:block">
          <div className="flex w-full min-w-max gap-3 md:gap-4">
            {productBlocks.map((product, index) => {
              const Icon = product.icon;
              const isActive = index === activeIndex;

              return (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`group relative flex min-w-[220px] flex-1 items-center gap-3 rounded-3xl border px-5 py-4 text-left transition md:min-w-0 ${
                    isActive
                      ? "border-abp-blue bg-white shadow-lg"
                      : "border-transparent bg-white/70 text-slate-500 hover:border-abp-blue/30 hover:bg-white"
                  }`}
                >
                  <span className="flex size-10 items-center justify-center rounded-2xl bg-abp-blue/10 text-abp-blue">
                    <Icon className="size-5" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-abp-blue/70">
                      {product.badge}
                    </span>
                    <span className="mt-1 block text-sm font-semibold text-abp-slate">
                      {product.title}
                    </span>
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="product-option-active"
                      className="absolute inset-0 rounded-3xl border border-abp-blue/60"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_minmax(0,0.95fr)] lg:items-start">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35 }}
              className="relative rounded-3xl border border-abp-blue/20 bg-white/90 p-8 shadow-lg backdrop-blur"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-abp-blue/10 px-4 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-abp-blue">
                <ActiveIcon className="size-4" />
                {active.badge}
              </div>

              <h3 className="mt-5 text-2xl font-semibold text-abp-slate md:text-[2rem]">
                {active.title}
              </h3>
              <p className="mt-4 text-base text-slate-600">{active.description}</p>

              <p className="mt-6 rounded-2xl border border-abp-blue/20 bg-abp-cream px-5 py-4 text-[0.85rem] font-semibold text-abp-blue">
                {active.highlight}
              </p>

              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                {active.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 inline-flex size-4 items-center justify-center rounded-full bg-abp-blue/10 text-abp-blue">
                      <FiCheck className="size-2.5" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 rounded-full bg-abp-blue px-6 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-white hover:bg-abp-blue/90"
                >
                  Quiero una asesoría sin costo
                </a>
                <a
                  href="#comparativa"
                  className="inline-flex items-center gap-2 rounded-full border border-abp-gold/50 px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-abp-gold hover:border-abp-gold"
                >
                  Ver comparativa
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

          <FadeInWhenVisible className="rounded-3xl border border-abp-gold/40 bg-gradient-to-br from-abp-blue via-abp-navy to-abp-midnight p-8 text-white shadow-glow">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-abp-gold/80">
              Cómo elegir el mix ideal
            </p>
            <h4 className="mt-4 text-2xl font-semibold">
              Ajustamos valores asegurados, deducibles y asistencias según tu disciplina.
            </h4>
            <p className="mt-4 text-sm text-white/80">
              Cuéntanos cuánto usas la bici, qué eventos tienes y si viajas con tu bici. Con esa info armamos escenarios con aseguradoras aliadas para que compares y decidas.
            </p>

            <div className="mt-6 grid gap-4 text-sm text-white/85">
              <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4">
                <p className="text-[0.65rem] uppercase tracking-[0.22em] text-abp-gold/80">
                  Bonus ABP
                </p>
                <p className="mt-2">
                  Si tienes club o equipo, podemos diseñar coberturas colectivas con tarifas preferenciales.
                </p>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4">
                <p className="text-[0.65rem] uppercase tracking-[0.22em] text-abp-gold/80">
                  Asesoría personalizada
                </p>
                <p className="mt-2">
                  Agenda una llamada y revisamos juntos cómo complementar Vida, Bicicleta y Viaje.
                </p>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
};
