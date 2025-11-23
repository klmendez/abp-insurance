import { useState } from "react";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const partners = [
  {
    name: "Positiva Compañía de Seguros",
    description: "ARL y seguros de vida para empresas y personas.",
  },
  {
    name: "AXA Colpatria",
    description: "Soluciones de vida y beneficios colectivos.",
  },
  {
    name: "Seguros del Estado",
    description: "Protección patrimonial y responsabilidad civil.",
  },
  {
    name: "Seguros Mundial",
    description: "Todo riesgo, transporte y nichos especializados.",
  },
];

export const PartnersSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePartner = partners[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === partners.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? partners.length - 1 : prev - 1
    );
  };

  return (
    <section
      id="aliados"
      className="bg-gradient-to-br from-[#e6efff] via-[#f7f9ff] to-white py-24"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6">
        {/* HEADER */}
        <FadeInWhenVisible className="max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-[0.35em] text-[#274472]/70">
            Aliados estratégicos
          </span>
          <h2 className="mt-3 text-4xl font-display text-[#1b2440] leading-tight">
            Respaldamos cada decisión con aseguradoras líderes
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Trabajamos con aseguradoras que comparten nuestra visión de acompañamiento integral.
            Este respaldo nos permite diseñar soluciones flexibles y confiables para cada etapa de
            tu organización.
          </p>
        </FadeInWhenVisible>

        {/* CARRUSEL */}
        <FadeInWhenVisible className="space-y-8">
          {/* FLECHAS + TARJETA CENTRAL */}
          <div className="flex items-center gap-4">
            {/* Flecha izquierda (desktop) */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Aliado anterior"
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-[#9fb3dd] bg-white text-[#274472] transition hover:border-[#274472] hover:bg-[#e6efff] md:flex"
            >
              <FiChevronLeft className="h-5 w-5" />
            </button>

            {/* Tarjeta central */}
            <div className="flex-1 rounded-2xl border border-[#d1ddf5] bg-white/80 px-8 py-10 shadow-sm backdrop-blur-md">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#274472]/75">
                Aseguradora aliada
              </p>
              <h3 className="mt-3 text-xl font-semibold text-[#1b2440]">
                {activePartner.name}
              </h3>
              <p className="mt-3 text-sm text-slate-700 leading-relaxed">
                {activePartner.description}
              </p>
              <p className="mt-6 text-xs text-slate-500">
                Aliado estratégico de ABP para fortalecer la protección de tu empresa y tu equipo.
              </p>
            </div>

            {/* Flecha derecha (desktop) */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Siguiente aliado"
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-[#9fb3dd] bg-white text-[#274472] transition hover:border-[#274472] hover:bg-[#e6efff] md:flex"
            >
              <FiChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* FLECHAS MOBILE */}
          <div className="flex items-center justify-center gap-4 md:hidden">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Aliado anterior"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#9fb3dd] bg-white text-[#274472] transition hover:border-[#274472] hover:bg-[#e6efff]"
            >
              <FiChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Siguiente aliado"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#9fb3dd] bg-white text-[#274472] transition hover:border-[#274472] hover:bg-[#e6efff]"
            >
              <FiChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* PUNTITOS INDICADORES */}
          <div className="flex justify-center gap-2">
            {partners.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Ir al aliado ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === activeIndex
                    ? "w-6 bg-[#274472]"
                    : "w-2 bg-[#9fb3dd]"
                }`}
              />
            ))}
          </div>

          {/* CHIPS DE NOMBRES */}
          <div className="flex flex-wrap justify-center gap-3">
            {partners.map((partner, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={partner.name}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold tracking-[0.12em] transition-all ${
                    isActive
                      ? "border-[#274472] bg-white text-[#274472]"
                      : "border-transparent bg-white/60 text-[#1f2937]/70 hover:border-[#9fb3dd]"
                  }`}
                >
                  {partner.name}
                </button>
              );
            })}
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};
