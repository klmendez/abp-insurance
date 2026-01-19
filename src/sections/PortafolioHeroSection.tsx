// src/sections/PortafolioHeroSection.tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { FiPhoneCall } from "react-icons/fi";

import riesgosLaboralesImg from "../assets/laborales/trabajadores.jpg";
import vidaImg from "../assets/vida/vida1.jpg";
import generalesImg from "../assets/generales/generales1.jpg";
import ciclista1 from "../assets/especiales/ciclista1.jpg";
import serviciosEmpresarialesImg from "../assets/complementarios/servicios-empresariales1.jpg";

type Slide = {
  id: string;
  title: string;
  anchor: string;
  image: string;
};

const slides: Slide[] = [
  {
    id: "A",
    title: "Riesgos Laborales",
    image: riesgosLaboralesImg,
    anchor: "/portafolio/riesgos-laborales",
  },
  {
    id: "B",
    title: "Vida",
    image: vidaImg,
    anchor: "/portafolio/seguros-vida",
  },
  {
    id: "C",
    title: "Generales",
    image: generalesImg,
    anchor: "/portafolio/seguros-generales",
  },
  {
    id: "D",
    title: "Ciclistas y Recicladores",
    image: ciclista1,
    anchor: "/portafolio/recicladores",
  },
  {
    id: "E",
    title: "Servicios Empresariales",
    image: serviciosEmpresarialesImg,
    anchor: "/servicios-empresariales",
  },
];

export const PortafolioHeroSection = () => {
  const [index, setIndex] = useState(0);
  const active = slides[index];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6500);

    return () => clearInterval(interval);
  }, []);

  const phones = [
    "+573208654369",
    "+573005687950",
    "+573185170013",
  ];

  return (
    <section
      className="relative text-white overflow-hidden h-[100svh]"
      style={{
        backgroundImage: `url(${active.image})`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#020617]/90 via-[#020617]/70 to-[#d4a43b]/55 opacity-55 sm:opacity-100" />
      <div className="pointer-events-none absolute inset-0 opacity-15 sm:opacity-25 mix-blend-soft-light">
        <div className="h-full w-full bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_70%),radial-gradient(circle_at_80%_80%,rgba(255,215,130,0.22),transparent_70%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl h-full px-4 sm:px-6 lg:px-8 flex items-center">
        <FadeInWhenVisible className="max-w-xl">
          <h1 className="font-bold leading-tight text-white text-[clamp(1.8rem,3.2vw,2.7rem)]">
            Portafolio ABP
          </h1>

          <p className="mt-4 text-white/90 text-[clamp(0.9rem,1.2vw,1rem)]">
            Explora las líneas de protección que hemos diseñado para personas,
            empresas y sectores especiales.
          </p>

          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 space-y-6"
          >
            <p className="font-medium text-[clamp(1rem,1.6vw,1.125rem)]">
              <span className="font-semibold text-[#f5c068]">
                Seguros de {active.title}.
              </span>
            </p>

            <a
              href={active.anchor}
              className="
                btn-modern inline-flex
                !bg-abp-gold !text-[#030712]
                px-6 py-2.5
                text-[clamp(0.7rem,0.8vw,0.8rem)]
              "
            >
              Conocer esta solución
            </a>

            {/* TELÉFONOS */}
            <div className="pt-4 space-y-3">
              <div className="flex items-center gap-2 text-abp-gold font-semibold text-[clamp(0.85rem,1vw,1rem)]">
                <FiPhoneCall />
                <span>Llámanos</span>
              </div>

              <div
                className="
                  w-full sm:w-fit
                  overflow-hidden
                  bg-white/10
                  ring-1 ring-white/20
                  backdrop-blur-sm
                  rounded-2xl
                "
              >
                <div className="grid grid-cols-1 divide-y divide-white/15">
                  {phones.map((num) => (
                    <div key={num} className="flex items-stretch">
                      <a
                        href={`tel:${num}`}
                        className="
                          flex-1 px-4 py-2
                          inline-flex items-center justify-center
                          text-white/95 font-medium
                          text-[clamp(0.8rem,0.9vw,1rem)]
                          hover:bg-white/10 transition
                        "
                      >
                        ({num.replace("+57", "+57 ")})
                      </a>

                      <button
                        type="button"
                        onClick={() => navigator.clipboard?.writeText(num)}
                        className="
                          hidden sm:inline-flex
                          w-8 h-8
                          items-center justify-center
                          text-[0.6rem] font-semibold
                          text-white/80 hover:text-white
                          hover:bg-white/10 transition
                        "
                        aria-label="Copiar número"
                      >
                        Copiar
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </FadeInWhenVisible>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Ir al slide ${i + 1}`}
            className={`
              h-2 rounded-full transition-all
              ${i === index
                ? "w-6 bg-abp-gold"
                : "w-2 bg-white/50 hover:bg-white/80"}
            `}
          />
        ))}
      </div>
    </section>
  );
};
