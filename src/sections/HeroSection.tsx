import { motion } from "framer-motion";

export const HeroSection = () => (
  <section
    id="inicio"
    className="relative overflow-hidden bg-gradient-to-br from-[#e8f0ff] via-[#f8fbff] to-white"
  >
    <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 py-24 lg:flex-row lg:py-28 lg:min-h-[75vh]">

      {/* TEXTO */}
      <div className="flex-1 space-y-6 text-center lg:text-left">
        
        {/* CHIP */}
        <motion.span
          className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-500"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          Experiencias de protección inteligente
        </motion.span>

        <motion.h1
          className="max-w-[28rem] text-4xl font-semibold leading-tight text-abp-blue md:text-5xl lg:text-[3.1rem]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Seguros que evolucionan contigo
        </motion.h1>

        <motion.p
          className="max-w-md mx-auto text-base text-slate-600 lg:mx-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
        >
          Acompañamiento, bienestar y protección en una sola experiencia.
        </motion.p>

      </div>

      {/* IMAGEN */}
      <motion.div
        className="relative mt-12 flex w-full flex-1 justify-center lg:justify-end lg:mt-16"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <img
          src="/persona1.png"
          alt="Asesor ABP"
          className="w-full max-w-xs sm:max-w-sm lg:max-w-md rounded-[2.5rem] object-cover"
        />
      </motion.div>
    </div>
  </section>
);
