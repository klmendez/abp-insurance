// src/sections/HeroSection.tsx
import { motion } from "framer-motion";
import heroImage from "../assets/p1.png";

export const HeroSection = () => (
  <section
    id="inicio"
    className="relative overflow-hidden bg-gradient-to-br from-[#0a1a2f] via-[#123452] to-[#d4a43b]"
  >
    {/* CAPA ANIMADA */}
    <motion.div
      className="pointer-events-none absolute inset-[-45%] opacity-55"
      initial={{ x: -80, y: -40 }}
      animate={{ x: 80, y: 40 }}
      transition={{
        duration: 26,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear",
      }}
    >
      <div
        className="size-full"
        style={{
          background: `
            radial-gradient(circle at 0% 0%, rgba(255,215,130,0.25) 0, transparent 55%),
            radial-gradient(circle at 90% 100%, rgba(56,189,248,0.25) 0, transparent 55%)
          `,
        }}
      />
    </motion.div>

    {/* CONTENIDO */}
    <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 pb-12 pt-24 lg:flex-row lg:pb-20 lg:pt-28">
      
      {/* TEXTO */}
      <div className="flex-1 space-y-6 text-center lg:text-left">
        
        {/* PÍLDORA */}
        <motion.span
          className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-100 ring-1 ring-white/20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          Tu tranquilidad, nuestra prioridad
        </motion.span>

        {/* TÍTULO */}
        <motion.h1
          className="max-w-xl text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-[3.1rem]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Tu futuro con soluciones de seguros flexibles y cercanas.
        </motion.h1>

        {/* DESCRIPCIÓN */}
        <motion.p
          className="mx-auto max-w-md text-base text-slate-100/90 lg:mx-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
        >
          En ABP Agencia de Seguros, diseñamos coberturas a la medida para
          personas y empresas. Te acompañamos desde la asesoría inicial hasta la
          gestión de siniestros.
        </motion.p>

        {/* BOTONES FUNCIONALES */}
        <motion.div
          className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
        >
          {/* BOTÓN WHATSAPP */}
          <a
            href="https://wa.me/57XXXXXXXXX?text=Hola%20quisiera%20una%20asesoría%20personalizada"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto rounded-full bg-[#f8c944] px-7 py-3 
                       text-sm font-semibold text-slate-900 shadow-lg 
                       shadow-black/20 transition hover:bg-[#f4bc22] 
                       focus-visible:outline-none focus-visible:ring-2 
                       focus-visible:ring-[#f8c944] focus-visible:ring-offset-2 
                       focus-visible:ring-offset-slate-900"
          >
            Agenda una asesoría gratuita
          </a>

          {/* BOTÓN IR A SERVICIOS */}
          <a
            href="#portafolio"
            className="w-full sm:w-auto rounded-full border border-white/40 
                       bg-white/5 px-7 py-3 text-sm font-semibold text-white 
                       transition hover:bg-white/10 focus-visible:outline-none 
                       focus-visible:ring-2 focus-visible:ring-white/60 
                       focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            Conoce nuestros servicios
          </a>
        </motion.div>
      </div>

      {/* IMAGEN + TARJETA */}
      <motion.div
        className="relative mt-10 flex w-full flex-1 justify-center lg:mt-0 lg:justify-end"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md">
          
          <img
            src={heroImage}
            alt="Asesor ABP"
            className="h-auto w-full object-contain md:max-h-[480px]"
          />

          <div className="pointer-events-none absolute inset-x-5 -bottom-5">
            <div className="pointer-events-auto rounded-2xl border border-slate-200/60 
                           bg-white/95 px-4 py-3 shadow-xl backdrop-blur-md">
              
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] 
                             text-slate-500">
                ABP Agencia de Seguros Ltda.
              </p>

              <p className="mt-1 text-sm font-medium text-slate-900">
                Dame el gusto de asesorarte.
              </p>

              <div className="mt-2 flex flex-wrap gap-2 text-[0.7rem] text-slate-600">
                <span className="rounded-full bg-slate-100 px-2 py-0.5">
                  Acompañamiento
                </span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5">
                  Bienestar
                </span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5">
                  Protección
                </span>
              </div>

            </div>
          </div>

        </div>
      </motion.div>

    </div>
  </section>
);
