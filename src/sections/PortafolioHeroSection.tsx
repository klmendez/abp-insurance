// src/sections/PortafolioHeroSection.tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";

import riesgosLaboralesImg from "../assets/laborales/trabajadores.jpg";
import vidaImg from "../assets/vida/vida1.jpg"; // ajusta el nombre si tu archivo es distinto
import generalesImg from "../assets/generales/generales1.jpg"; // ajusta el nombre si tu archivo es distinto
import ciclista1 from "../assets/especiales/ciclista1.jpg";
import serviciosEmpresarialesImg from "../assets/complementarios/servicios-empresariales1.jpg"; // ajusta el nombre si tu archivo es distinto

import { FiArrowRight } from "react-icons/fi";

type Slide = {
  id: string;
  title: string; // texto después de "Seguros de..."
  anchor: string;
  image: string;
};

const slides: Slide[] = [
  {
    id: "A",
    title: "Riesgos Laborales",
    image: riesgosLaboralesImg, // carpeta laborales
    anchor: "/portafolio/riesgos-laborales",
  },
  {
    id: "B",
    title: "Vida",
    image: vidaImg, // carpeta vida
    anchor: "/portafolio/seguros-vida",
  },
  {
    id: "C",
    title: "Generales",
    image: generalesImg, // carpeta generales
    anchor: "/portafolio/seguros-generales",
  },
  {
    id: "D",
    title: "Ciclistas y Recicladores",
    image: ciclista1, // carpeta especiales
    anchor: "/portafolio/recicladores",
  },
  {
    id: "E",
    title: "Servicios Empresariales",
    image: serviciosEmpresarialesImg, // carpeta complementarios
    anchor: "/servicios-empresariales",
  },
];

export const PortafolioHeroSection = () => {
  const [index, setIndex] = useState(0);
  const active = slides[index];

  const goNext = () =>
    setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  // autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative text-white overflow-hidden"
      style={{
        backgroundImage: `url(${active.image})`,
        backgroundSize: "cover",
        backgroundPosition: "top center", // 👈 mantenemos la parte de arriba visible
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Degradado sobre la imagen */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#020617]/90 via-[#020617]/70 to-[#d4a43b]/55" />

      {/* Textura suave */}
      <div className="pointer-events-none absolute inset-0 opacity-25 mix-blend-soft-light">
        <div className="h-full w-full bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_70%),radial-gradient(circle_at_80%_80%,rgba(255,215,130,0.22),transparent_70%)]" />
      </div>

      {/* CONTENIDO */}
      <div
        className="
          relative z-10 mx-auto max-w-6xl
          px-4 sm:px-6 lg:px-8
          py-16 sm:py-20 lg:py-24
          min-h-[80vh] sm:min-h-[90vh] lg:min-h-screen
          flex items-center
        "
      >
        {/* Columna única a la izquierda */}
        <FadeInWhenVisible className="max-w-xl">
          {/* Título principal fijo */}
          <h1 className="text-3xl sm:text-4xl lg:text-[2.7rem] font-bold leading-tight text-white">
            Portafolio ABP
          </h1>

          {/* Subtítulo fijo */}
          <p className="mt-4 text-sm sm:text-base text-white/90">
            Explora las líneas de protección que hemos diseñado para personas,
            empresas y sectores especiales.
          </p>

          {/* Bloque dinámico: cambia con el slide (imagen + título + CTA) */}
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 space-y-4"
          >
            {/* Texto: TODO en dorado, incluyendo "Seguros de" */}
            <p className="text-base sm:text-lg font-medium">
              <span className="font-semibold text-[#f5c068]">
                Seguros de {active.title}.
              </span>
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={active.anchor}
                className="inline-flex items-center gap-2 rounded-full bg-[#f3c46f] px-7 py-2.5 text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-[#1a1a1a] shadow-lg hover:bg-[#ffcf7b] transition-colors"
              >
                Ver
                <FiArrowRight className="h-4 w-4" />
              </a>

              {/* Botón “siguiente” para ir cambiando manualmente */}
              <button
                onClick={goNext}
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white text-sm hover:bg-white/20 transition-colors"
                aria-label="Siguiente línea"
              >
                <FiArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};
