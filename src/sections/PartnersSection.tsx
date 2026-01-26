import { useEffect, useMemo, useState } from "react";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import positivaLogo from "@/assets/aliados/logo-positiva-naranja.webp";
import axaLogo from "@/assets/aliados/axa.webp";
import segurosEstadoLogo from "@/assets/aliados/seguro_del_estado.webp";
import segurosMundialLogo from "@/assets/aliados/seguros_mundial.webp";
import previsoraLogo from "@/assets/aliados/Previsora.webp";

const partnerLogos = [
  { name: "Previsora", src: previsoraLogo },
  { name: "Positiva", src: positivaLogo },
  { name: "AXA Colpatria", src: axaLogo },
  { name: "Seguros del Estado", src: segurosEstadoLogo },
  { name: "Seguros Mundial", src: segurosMundialLogo },
] as const;

const VISIBLE_LOGOS = 5;
const AUTO_ADVANCE_MS = 3600;

const loopedLogos = [
  ...partnerLogos.slice(-VISIBLE_LOGOS),
  ...partnerLogos,
  ...partnerLogos.slice(0, VISIBLE_LOGOS),
];

export const PartnersSection = () => {
  const [cursor, setCursor] = useState(VISIBLE_LOGOS);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCursor((prev) => prev + 1);
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (cursor >= loopedLogos.length - VISIBLE_LOGOS) {
      setCursor(VISIBLE_LOGOS);
    } else if (cursor <= VISIBLE_LOGOS - 1) {
      setCursor(loopedLogos.length - VISIBLE_LOGOS - 1);
    }
  }, [cursor]);

  const visibleItems = useMemo(() => {
    const start = cursor - Math.floor(VISIBLE_LOGOS / 2);
    return loopedLogos.slice(start, start + VISIBLE_LOGOS);
  }, [cursor]);

  const centerIndex = Math.floor(VISIBLE_LOGOS / 2);

  return (
    <section
      id="aliados"
      className="relative overflow-hidden bg-gradient-to-br from-[#f2f6ff] via-white to-[#e7f0ff] py-10" 
      // ↓↓↓ antes era py-20
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(66,104,168,0.12),transparent_60%),radial-gradient(circle_at_80%_85%,rgba(191,214,255,0.32),transparent_70%)]" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-6">
        {/* title now with smaller vertical space */}
        <FadeInWhenVisible className="text-center">
          <h2 className="text-2xl font-semibold leading-tight text-[#1f3258] sm:text-3xl">
            Aseguradoras que nos respaldan en cada propuesta
          </h2>
        </FadeInWhenVisible>

        {/* Carrusel más compacto */}
        <FadeInWhenVisible>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              {/* Botón izquierdo */}
              <button
                type="button"
                onClick={() => setCursor((prev) => prev - 1)}
                aria-label="Aliados anteriores"
                className="hidden size-9 items-center justify-center rounded-full border border-[#b5c8ef] bg-white text-[#274472] shadow-sm transition hover:bg-[#ebf2ff] md:flex"
              >
                <FiChevronLeft className="size-4" />
              </button>

              {/* Logos */}
              <div className="relative w-full overflow-hidden">
                <div className="flex w-full items-center justify-center gap-4 transition-all duration-500">
                  {visibleItems.map((logo, index) => {
                    const isCenter = index === centerIndex;
                    return (
                      <div
                        key={`${logo.name}-${index}`}
                        className={`flex min-w-[100px] max-w-[160px] flex-1 items-center justify-center rounded-2xl border border-transparent bg-white/90 px-4 py-3 transition-all duration-500 ${
                          isCenter
                            ? "scale-105 border-[#274472]/20 shadow-[0_10px_30px_-15px_rgba(39,68,114,0.5)]"
                            : "opacity-70 hover:scale-105 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={logo.src}
                          alt={logo.name}
                          className="h-10 w-auto object-contain sm:h-12"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Botón derecho */}
              <button
                type="button"
                onClick={() => setCursor((prev) => prev + 1)}
                aria-label="Aliados siguientes"
                className="hidden size-9 items-center justify-center rounded-full border border-[#b5c8ef] bg-white text-[#274472] shadow-sm transition hover:bg-[#ebf2ff] md:flex"
              >
                <FiChevronRight className="size-4" />
              </button>
            </div>

            {/* Indicadores compactos */}
            <div className="flex justify-center gap-1.5">
              {partnerLogos.map((logo, i) => {
                const isActive = cursor % partnerLogos.length === i;
                return (
                  <span
                    key={logo.name}
                    className={`size-2 rounded-full transition ${
                      isActive ? "bg-[#274472]" : "bg-[#c1d3f4]"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};
