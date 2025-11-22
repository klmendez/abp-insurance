import { FadeInWhenVisible } from '@/components/FadeInWhenVisible';

const steps = [
  {
    number: '01',
    title: 'Diagnóstico',
    description:
      'Analizamos tu situación actual, identificamos brechas de protección y prioridades de negocio.',
  },
  {
    number: '02',
    title: 'Diseño',
    description:
      'Construimos la propuesta integral alineada con el modelo Acompañamiento–Bienestar–Protección.',
  },
  {
    number: '03',
    title: 'Implementación',
    description:
      'Coordinamos afiliaciones, pólizas y programas con aseguradoras y aliados estratégicos.',
  },
  {
    number: '04',
    title: 'Seguimiento',
    description:
      'Monitoreamos indicadores, siniestralidad y cumplimiento normativo con presencia constante.',
  },
];

export const ProcessSection = () => (
  <section id="proceso" className="bg-white py-24">
    <div className="mx-auto max-w-6xl px-6">
      <FadeInWhenVisible className="text-center">
        <span className="text-sm font-semibold uppercase tracking-[0.35em] text-abp-ink/60">
          Proceso ABP
        </span>
        <h2 className="mt-3 text-4xl font-display text-abp-ink">
          Te acompañamos de principio a fin
        </h2>
        <p className="mt-4 text-base text-slate-600">
          Nuestra metodología asegura decisiones informadas, ejecución impecable y soporte permanente
          para tu empresa y tu familia.
        </p>
      </FadeInWhenVisible>

      <div className="mt-16 grid gap-8 md:grid-cols-4">
        {steps.map((step) => (
          <FadeInWhenVisible
            key={step.number}
            className="flex h-full flex-col border border-abp-blue/15 bg-abp-cream/40 p-8"
          >
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-abp-gold">
              Paso {step.number}
            </span>
            <h3 className="mt-6 text-2xl font-display text-abp-blue">{step.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">{step.description}</p>
          </FadeInWhenVisible>
        ))}
      </div>
    </div>
  </section>
);
