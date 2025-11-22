import { motion } from 'framer-motion';
import { FadeInWhenVisible } from '@/components/FadeInWhenVisible';

const highlights = [
  {
    title: 'Acompañamiento experto',
    description: 'ARL, siniestros y consultoría estratégica para empresas y profesionales.',
  },
  {
    title: 'Bienestar sostenible',
    description: 'Programas de vida y beneficios que cuidan a las personas y sus familias.',
  },
  {
    title: 'Protección integral',
    description: 'Patrimonio, movilidad y nuevos nichos con soluciones diseñadas a medida.',
  },
];

export const HeroSection = () => (
  <section id="inicio" className="relative overflow-hidden bg-white">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.12),transparent_70%)]" />
    <div className="absolute inset-y-0 left-1/2 hidden w-1/2 bg-gradient-to-br from-abp-blue/10 via-white to-white lg:block" />

    <div className="relative mx-auto grid max-w-6xl gap-16 px-6 py-24 lg:grid-cols-[1.05fr,0.95fr] lg:items-center">
      <div className="space-y-8">
        <motion.span
          className="inline-block border border-abp-blue px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-abp-blue"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          ABP Agencia de Seguros Ltda.
        </motion.span>

        <motion.h1
          className="text-4xl font-['Playfair_Display'] leading-tight text-[#1c2a38] md:text-5xl lg:text-[56px]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Acompañamos tus decisiones, aseguramos tu bienestar y protegemos tu futuro.
        </motion.h1>

        <motion.p
          className="text-base text-slate-700 lg:max-w-lg"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Somos aliados estratégicos de empresas y personas. Nuestro modelo Acompañamiento–Bienestar–Protección integra seguros, gestión normativa y cultura preventiva para crear valor real.
        </motion.p>

        <motion.p
          className="text-sm text-slate-500 lg:max-w-md"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          Confía en un equipo cercano que entiende tu contexto, responde oportunamente y diseña soluciones a la medida de tus proyectos.
        </motion.p>

        <motion.div
          className="flex flex-col gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <a
            href="#contacto"
            className="bg-abp-blue px-8 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition-colors hover:bg-[#1c2a38]"
          >
            Quiero una asesoría sin costo
          </a>

          <a
            href="#portafolio"
            className="border border-abp-blue px-8 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-abp-blue transition-colors hover:border-[#1c2a38] hover:text-[#1c2a38]"
          >
            Ver portafolio de seguros
          </a>
        </motion.div>

        <div className="mt-12 grid gap-6 border-t border-slate-200 pt-8 sm:grid-cols-3">
          {highlights.map((item) => (
            <FadeInWhenVisible key={item.title} className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-abp-blue">
                {item.title}
              </p>
              <p className="text-sm text-slate-600">{item.description}</p>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>

      <FadeInWhenVisible className="relative border border-abp-blue/20 bg-gradient-to-br from-abp-blue via-[#1c2a38] to-abp-blue px-10 py-12 text-white">
        <div className="absolute inset-x-0 top-0 h-1 bg-abp-gold" />
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-abp-gold">
          Acompañamiento · Bienestar · Protección
        </p>
        <h3 className="mt-6 text-3xl font-['Playfair_Display'] leading-snug">
          &ldquo;Somos el aliado que transforma la gestión de riesgos en una ventaja competitiva.&rdquo;
        </h3>
        <p className="mt-6 max-w-sm text-sm text-white/80">
          Gestionamos afiliaciones, pólizas, programas de bienestar y soporte normativo con presencia constante en tu organización.
        </p>
        <div className="mt-10 grid gap-4 text-sm text-white/70">
          <div className="border border-white/20 px-6 py-4">
            <p className="font-semibold text-white">+10 años</p>
            <p>De experiencia en consultoría y acompañamiento asegurador.</p>
          </div>
          <div className="border border-white/20 px-6 py-4">
            <p className="font-semibold text-white">Cobertura nacional</p>
            <p>Atención presencial y virtual para empresas, emprendimientos y familias.</p>
          </div>
        </div>
      </FadeInWhenVisible>
    </div>
  </section>
);
