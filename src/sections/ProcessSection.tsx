import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Diagnóstico",
    description:
      "Analizamos tu situación actual, identificamos brechas de protección y prioridades de negocio.",
  },
  {
    number: "02",
    title: "Diseño",
    description:
      "Construimos la propuesta integral alineada con el modelo Acompañamiento–Bienestar–Protección.",
  },
  {
    number: "03",
    title: "Implementación",
    description:
      "Coordinamos afiliaciones, pólizas y programas con aseguradoras y aliados estratégicos.",
  },
  {
    number: "04",
    title: "Seguimiento",
    description:
      "Monitoreamos indicadores, siniestralidad y cumplimiento normativo con presencia constante.",
  },
];

export const ProcessSection = () => (
  <section id="proceso" className="bg-white py-24">
    <div className="mx-auto max-w-6xl px-6">
      {/* HEADER */}
      <FadeInWhenVisible className="text-center">
        <span className="text-sm font-semibold uppercase tracking-[0.35em] text-abp-ink/60">
          Proceso ABP
        </span>
        <h2 className="mt-3 text-4xl font-display text-abp-ink">
          Te acompañamos de principio a fin
        </h2>
        <p className="mt-4 text-base text-slate-600">
          Nuestra metodología asegura decisiones informadas, ejecución impecable y soporte permanente.
        </p>
      </FadeInWhenVisible>

      {/* STEPS */}
      <div className="mt-16 grid gap-10 md:grid-cols-4">
        {steps.map((step) => (
          <FadeInWhenVisible key={step.number}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="group flex h-full flex-col rounded-2xl border border-abp-blue/10 bg-abp-cream/30 p-8 shadow-sm hover:border-abp-blue/30 hover:shadow-md transition-all"
            >
              {/* NUMERO */}
              <div className="flex flex-col items-start">
                <span className="text-[2.5rem] font-bold leading-none text-abp-blue">
                  {step.number}
                </span>
                <span className="mt-1 h-0.5 w-10 bg-abp-gold rounded-full" />
              </div>

              {/* TITULO */}
              <h3 className="mt-6 text-xl font-display text-abp-ink group-hover:text-abp-blue transition-colors">
                {step.title}
              </h3>

              {/* DESCRIPCION */}
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                {step.description}
              </p>
            </motion.div>
          </FadeInWhenVisible>
        ))}
      </div>
    </div>
  </section>
);
