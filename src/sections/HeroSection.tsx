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

    {/* DESTELLOS ENERGÉTICOS */}
    <motion.div
      className="absolute left-1/2 top-24 -translate-x-1/2 pointer-events-none size-64 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.35),transparent_60%)] blur-2xl"
      initial={{ opacity: 0.25, scale: 0.8 }}
      animate={{ opacity: [0.35, 0.55, 0.35], scale: [0.8, 1.05, 0.8] }}
      transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
    />
    <motion.div
      className="absolute -left-16 bottom-12 hidden pointer-events-none size-72 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.25),transparent_65%)] blur-3xl lg:block"
      initial={{ rotate: -12, opacity: 0.18 }}
      animate={{ rotate: [ -12, 6, -12 ], opacity: [0.18, 0.28, 0.18] }}
      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* CONTENIDO */}
    <div
      className="
        relative mx-auto flex max-w-6xl flex-col items-center
        px-4 pb-12 pt-20
        sm:px-6
        md:pt-24
        lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:pb-20 lg:pt-28
      "
    >
      {/* TEXTO */}
      <div className="flex-1 space-y-5 text-center lg:text-left">
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
          className="
            mx-auto max-w-xl text-3xl font-semibold leading-tight text-white
            sm:text-4xl
            md:text-5xl
            lg:mx-0 lg:text-[3.1rem]
          "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Acompañamos tus decisiones, aseguramos tu bienestar y protegemos tu futuro

        </motion.h1>

        {/* DESCRIPCIÓN */}
        <motion.p
          className="mx-auto max-w-md text-sm text-slate-100/90 sm:text-base lg:mx-0"
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
          className="
            mt-6 flex flex-col items-stretch gap-3
            sm:flex-row sm:items-center sm:justify-center
            lg:justify-start
          "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
        >
          {/* BOTÓN WHATSAPP */}
          <motion.a
            href="https://wa.me/57XXXXXXXXX?text=Hola%20quisiera%20una%20asesor%C3%ADa%20personalizada"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-modern w-full sm:w-auto text-center"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Agenda una asesoría gratuita
          </motion.a>

          {/* BOTÓN IR A SERVICIOS */}
          <motion.a
            href="#portafolio"
            className="btn-modern btn-modern--light w-full sm:w-auto text-center"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Conoce nuestros servicios
          </motion.a>
        </motion.div>
      </div>

      {/* IMAGEN + TARJETA */}
      <motion.div
        className="
          relative mt-10 flex w-full flex-1 justify-center
          sm:mt-12
          lg:mt-0 lg:justify-end
        "
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div
          className="
            relative w-full max-w-xs
            sm:max-w-sm
            md:max-w-md
          "
        >
          <motion.div
            className="absolute -right-6 top-10 hidden size-24 rounded-full border border-white/30 bg-white/10 blur-xl lg:block"
            initial={{ opacity: 0.2, scale: 0.9 }}
            animate={{ opacity: [0.2, 0.35, 0.2], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 9, repeat: Infinity, repeatType: "mirror" }}
          />
          <img
            src={heroImage}
            alt="Asesor ABP"
            className="
              h-auto w-full object-contain
              max-h-[340px]
              sm:max-h-[380px]
              md:max-h-[440px]
              lg:max-h-[480px]
            "
          />

          <motion.div
            className="pointer-events-none absolute inset-x-5 -bottom-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38 }}
          >
            <motion.div
              className="pointer-events-auto rounded-xl border border-[#d4a43b]/40 bg-white/95 px-5 py-4 shadow-2xl backdrop-blur"
              animate={{
                y: [0, -6, 0],
              }}
              transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
            >
              <p className="text-[0.7rem] font-semibold uppercase tracking-widest text-[#d4a43b]">
                ABP Agencia de Seguros Ltda.
              </p>

              <p className="mt-1 text-sm font-medium text-slate-900">
                Dame el gusto de asesorarte.
              </p>
            </motion.div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  </section>
);
