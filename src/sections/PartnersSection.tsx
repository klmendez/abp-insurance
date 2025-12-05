import { useEffect, useMemo, useState } from "react";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import positivaLogo from "@/assets/aliados/logo-positiva-naranja.png";
import axaLogo from "@/assets/aliados/axa.png";
import segurosEstadoLogo from "@/assets/aliados/seguro_del_estado.png";
import segurosMundialLogo from "@/assets/aliados/seguros_mundial.png";
import previsoraLogo from "@/assets/aliados/Previsora.png";

const partnerLogos = [
  {
    name: "Positiva",
    src: positivaLogo,
  },
  {
    name: "AXA Colpatria",
    src: axaLogo,
  },
  {
    name: "Seguros del Estado",
    src: segurosEstadoLogo,
  },
  {
    name: "Seguros Mundial",
    src: segurosMundialLogo,
  },
  {
    name: "Previsora",
    src: previsoraLogo,
  },
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
    const end = start + VISIBLE_LOGOS;
    return loopedLogos.slice(start, end);
  }, [cursor]);

  const centerIndex = Math.floor(VISIBLE_LOGOS / 2);

  const handlePrev = () => setCursor((prev) => prev - 1);
  const handleNext = () => setCursor((prev) => prev + 1);

  return (
    <section
      id="aliados"
      className="relative overflow-hidden bg-gradient-to-br from-[#f2f6ff] via-white to-[#e7f0ff] py-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(66,104,168,0.12),transparent_60%),radial-gradient(circle_at_80%_85%,rgba(191,214,255,0.32),transparent_70%)]" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6">
        <FadeInWhenVisible className="text-center">
          <h2 className="text-3xl font-semibold leading-tight text-[#1f3258] sm:text-4xl">
            Aseguradoras que nos respaldan en cada propuesta
          </h2>
        </FadeInWhenVisible>

        <FadeInWhenVisible>
          <div className="relative overflow-hidden rounded-[28px] border border-[#cddcfa] bg-white/85 p-6 shadow-[0_30px_80px_-50px_rgba(31,55,105,0.6)]">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white via-white/80 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white via-white/80 to-transparent" />

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Aliados anteriores"
                className="hidden size-11 items-center justify-center rounded-full border border-[#b5c8ef] bg-white text-[#274472] shadow-sm transition hover:border-[#274472] hover:bg-[#ebf2ff] md:flex"
              >
                <FiChevronLeft className="size-5" />
              </button>

              <div className="relative w-full overflow-hidden">
                <div className="flex w-full items-center justify-center gap-6 transition-all duration-500 ease-out">
                  {visibleItems.map((logo, index) => {
                    const isCenter = index === centerIndex;
                    return (
                      <div
                        key={`${logo.name}-${index}`}
                        className={`flex min-w-[120px] max-w-[180px] flex-1 items-center justify-center rounded-3xl border border-transparent bg-white/90 px-6 py-4 transition-all duration-500 sm:min-w-[140px] ${
                          isCenter
                            ? "scale-110 border-[#274472]/20 shadow-[0_20px_45px_-25px_rgba(39,68,114,0.6)]"
                            : "opacity-70 hover:scale-105 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={logo.src}
                          alt={logo.name}
                          className="h-12 w-auto object-contain sm:h-14"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Aliados siguientes"
                className="hidden size-11 items-center justify-center rounded-full border border-[#b5c8ef] bg-white text-[#274472] shadow-sm transition hover:border-[#274472] hover:bg-[#ebf2ff] md:flex"
              >
                <FiChevronRight className="size-5" />
              </button>
            </div>

            <div className="mt-6 flex items-center justify-center gap-4 md:hidden">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Aliados anteriores"
                className="flex size-10 items-center justify-center rounded-full border border-[#b5c8ef] bg-white text-[#274472] shadow-sm transition hover:border-[#274472] hover:bg-[#ebf2ff]"
              >
                <FiChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Aliados siguientes"
                className="flex size-10 items-center justify-center rounded-full border border-[#b5c8ef] bg-white text-[#274472] shadow-sm transition hover:border-[#274472] hover:bg-[#ebf2ff]"
              >
                <FiChevronRight className="size-4" />
              </button>
            </div>

            <div className="mt-5 flex justify-center gap-2">
              {partnerLogos.map((logo, index) => {
                const loopIndex = cursor % partnerLogos.length;
                const isActive = loopIndex === index;
                return (
                  <span
                    key={logo.name}
                    className={`size-2.5 rounded-full transition ${
                      isActive ? "bg-[#274472]" : "bg-[#c1d3f4]"
                    }`}
                    aria-hidden
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
