import { useMemo, useState, useEffect, type FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { Link } from "react-router-dom";

const insuranceLines = [
  {
    label: "Seguros de Riesgos Laborales",
    href: "/portafolio#linea-riesgos-laborales",
    description: "Protección integral para trabajadores y empleadores.",
  },
  {
    label: "Seguros de Vida",
    href: "/portafolio#linea-seguros-vida",
    description: "Respaldo económico para ti y tus beneficiarios.",
  },
  {
    label: "Seguros Especiales",
    href: "/portafolio#linea-seguros-especiales",
    description: "Soluciones diseñadas para riesgos particulares.",
  },
  {
    label: "Seguros Generales",
    href: "/portafolio#linea-seguros-generales",
    description: "Protección patrimonial y operativa.",
  },
  {
    label: "Servicios Complementarios",
    href: "/portafolio#linea-servicios-complementarios",
    description: "Soporte adicional para una gestión aseguradora completa.",
  },
] as const;

const VISIBLE_COUNT = 5;

const buildLoopedList = (list: readonly (typeof insuranceLines)[number][]) => [
  ...list.slice(-VISIBLE_COUNT),
  ...list,
  ...list.slice(0, VISIBLE_COUNT),
];

const loopedLines = buildLoopedList(insuranceLines);

const AUTO_ADVANCE_MS = 5200;

// ✅ Link animable con Framer Motion
const MotionLink = motion(Link);

export const InsuranceNamesCarouselSection: FC = () => {
  const [cursor, setCursor] = useState(VISIBLE_COUNT);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursor((prev) => prev + 1);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(interval);
  }, []);

  const centerOffset = Math.floor(VISIBLE_COUNT / 2);

  const visibleSlice = useMemo(() => {
    const start = cursor - centerOffset;
    const end = start + VISIBLE_COUNT;
    return loopedLines.slice(start, end);
  }, [cursor, centerOffset]);

  useEffect(() => {
    if (cursor >= loopedLines.length - VISIBLE_COUNT) {
      setCursor(VISIBLE_COUNT);
    } else if (cursor <= VISIBLE_COUNT - 1) {
      setCursor(loopedLines.length - VISIBLE_COUNT - 1);
    }
  }, [cursor]);

  const handleNext = () => setCursor((prev) => prev + 1);
  const handlePrev = () => setCursor((prev) => prev - 1);

  const activeLine = visibleSlice[centerOffset];

  return (
    <section className="relative overflow-hidden bg-white py-16 text-[#0d1f33]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(17,56,98,0.08),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(238,199,124,0.20),transparent_60%)]" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-5 sm:px-6">
        <FadeInWhenVisible className="text-center">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-[#0d1f33]/60">
            Líneas de seguros
          </span>

          <h2 className="mt-3 text-3xl font-semibold text-[#0d1f33] sm:text-4xl">
            Explora las coberturas{" "}
            <span className="text-[#d4af37] font-bold">ABP</span>
          </h2>

          <p className="mt-3 text-sm text-[#0d1f33]/60 sm:text-base">
            Desplázate por nuestras líneas principales para encontrar el plan ideal.
          </p>
        </FadeInWhenVisible>

        <FadeInWhenVisible>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white via-white/85 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white via-white/85 to-transparent" />

            <div className="flex items-center justify-center gap-2 sm:gap-4">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Ver línea anterior"
                className="
                  inline-flex h-9 w-9 items-center justify-center
                  border border-[#153b71]/25 bg-white text-[#153b71]
                  transition-all sm:h-10 sm:w-10
                  hover:border-[#d4af37] hover:bg-[#fff7e1] hover:text-[#153b71]
                "
              >
                <FiChevronLeft className="h-4 w-4" />
              </button>

              <div className="relative w-full min-w-0 max-w-full overflow-hidden px-2 sm:px-3">
                <AnimatePresence initial={false} mode="wait">
                  <motion.ul
                    key={cursor}
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -30, opacity: 0 }}
                    transition={{ duration: 0.55, ease: "easeInOut" }}
                    className="flex min-w-0 items-center justify-center gap-3 sm:gap-4"
                  >
                    {visibleSlice.map((item, index) => {
                      const isActive = index === centerOffset;

                      return (
                        <li
                          key={item.label + index}
                          className={`
                            flex min-w-[140px] max-w-[220px] justify-center
                            transition-all duration-300
                            ${isActive ? "opacity-100 scale-100" : "opacity-60 scale-95"}
                          `}
                        >
                          <MotionLink
                            whileHover={{ scale: 1.14 }}
                            to={item.href}
                            className={`
                              w-full px-5 py-3 text-center uppercase
                              text-[0.72rem] font-semibold tracking-[0.22em]
                              border-b-2 transition-all
                              ${
                                isActive
                                  ? "border-[#d4af37] text-[#153b71]"
                                  : "border-transparent text-[#0d1f33]/70"
                              }
                              hover:text-[#d4af37]
                            `}
                          >
                            {item.label}
                          </MotionLink>
                        </li>
                      );
                    })}
                  </motion.ul>
                </AnimatePresence>
              </div>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Ver siguiente línea"
                className="
                  inline-flex h-9 w-9 items-center justify-center
                  border border-[#153b71]/25 bg-white text-[#153b71]
                  transition-all sm:h-10 sm:w-10
                  hover:border-[#d4af37] hover:bg-[#fff7e1] hover:text-[#153b71]
                "
              >
                <FiChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible>
          <motion.div
            key={activeLine.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="
              text-center
              max-w-2xl mx-auto
              leading-relaxed
              text-[clamp(1.05rem,1.35vw,1.35rem)]
              font-medium
              text-[#0d1f33]/80
            "
          >
            {activeLine.description}
          </motion.div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};
