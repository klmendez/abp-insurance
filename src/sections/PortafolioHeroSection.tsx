// src/sections/PortafolioHeroSection.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { Link } from "react-router-dom";
import slideArl from "../assets/portafolio-arl.jpg";
import slideVida from "../assets/portafolio-vida.jpg";
import slideGenerales from "../assets/portafolio-generales.jpg";
import slideCiclistas from "../assets/portafolio-ciclistas.jpg";
import {
  FiActivity,
  FiUsers,
  FiShield,
  FiLayers,
  FiArrowLeft,
  FiArrowRight,
} from "react-icons/fi";

type Slide = {
  id: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  ctaTo: string;
  ctaLabel: string;
};

const slides: Slide[] = [
  {
    id: "A",
    tag: "Línea A · ARL – Positiva",
    title: "Seguros de Riesgos Laborales",
    description:
      "Afiliación, prevención y atención de accidentes y enfermedades laborales, con apoyo continuo en SG-SST.",
    image: slideArl,
    ctaTo: "/portafolio",
    ctaLabel: "Ver detalle ARL",
  },
  {
    id: "B",
    tag: "Línea B · Vida Positiva & AXA Colpatria",
    title: "Seguros de Vida para personas y equipos",
    description:
      "Protección económica para personas, familias y colaboradores: vida individual, deudores y colectivo empresarial.",
    image: slideVida,
    ctaTo: "/portafolio",
    ctaLabel: "Ver detalle Vida",
  },
  {
    id: "C",
    tag: "Línea C · Seguros Generales",
    title: "Protección patrimonial para empresas y personas",
    description:
      "Activos, flotas, proyectos y hogar protegidos con seguros generales alineados con tu realidad y tu operación.",
    image: slideGenerales,
    ctaTo: "/portafolio",
    ctaLabel: "Ver detalle Generales",
  },
  {
    id: "D",
    tag: "Línea D · Vida, Bicicleta y Viaje",
    title: "Portafolio especializado para ciclistas",
    description:
      "Vida, bicicleta y viaje para que entrenes, te desplaces y participes en eventos con tranquilidad.",
    image: slideCiclistas,
    ctaTo: "/ciclistas",
    ctaLabel: "Ver landing ciclistas",
  },
];

export const PortafolioHeroSection = () => {
  const [index, setIndex] = useState(0);
  const active = slides[index];

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative overflow-hidden bg-black text-white">
      {/* contenedor de altura tipo banner samsung */}
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="relative h-[60vh] min-h-[380px] max-h-[520px]">
          {/* SLIDE */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.28 }}
              className="absolute inset-0"
            >
              {/* Imagen de fondo */}
              <img
                src={active.image}
                alt={active.title}
                className="h-full w-full object-cover"
              />

              {/* overlay para que se lea el texto */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/10" />

              {/* contenido centrado como samsung */}
              <div className="relative flex h-full items-center">
                <div className="grid w-full gap-10 md:grid-cols-[1.2fr,1.1fr] items-center">
                  {/* columna izquierda: pequeño resumen del modelo */}
                  <FadeInWhenVisible className="hidden text-sm text-slate-200/90 md:block">
                    <p className="text-[0.75rem] font-semibold uppercase tracking-[0.32em] text-slate-300/80">
                      Portafolio ABP · A · B · P
                    </p>
                    <h1 className="mt-4 max-w-md text-3xl font-semibold leading-tight md:text-4xl">
                      Seguros que conectan{" "}
                      <span className="text-sky-200">Acompañamiento, Bienestar y Protección.</span>
                    </h1>
                    <p className="mt-3 max-w-md text-[0.9rem] text-slate-200/85">
                      Descubre nuestras líneas de seguros para empresas, personas y ciclistas,
                      diseñadas para cuidar tu operación, tu familia y tus proyectos de vida.
                    </p>
                  </FadeInWhenVisible>

                  {/* columna derecha: texto principal de la slide, tipo samsung */}
                  <FadeInWhenVisible className="md:ml-auto">
                    <div className="max-w-md md:text-right">
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-sky-200/80">
                        {active.tag}
                      </p>
                      <h2 className="mt-3 text-2xl font-semibold leading-tight md:text-3xl">
                        {active.title}
                      </h2>
                      <p className="mt-3 text-sm text-slate-200/90">
                        {active.description}
                      </p>

                      <div className="mt-6 flex flex-wrap items-center gap-3 md:justify-end">
                        <Link
                          to={active.ctaTo}
                          className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2 text-[0.75rem] font-semibold uppercase tracking-[0.24em] text-abp-blue hover:bg-slate-100"
                        >
                          {active.ctaLabel}
                        </Link>
                      </div>
                    </div>
                  </FadeInWhenVisible>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* flechas laterales, estilo hero samsung */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-2 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
            aria-label="Anterior"
          >
            <FiArrowLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
            aria-label="Siguiente"
          >
            <FiArrowRight className="h-5 w-5" />
          </button>

          {/* indicador inferior tipo barra/dots */}
          <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-2">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-[3px] rounded-full transition-all ${
                  i === index ? "w-12 bg-white" : "w-6 bg-white/40 hover:bg-white/75"
                }`}
                aria-label={`Ir a ${slide.title}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
