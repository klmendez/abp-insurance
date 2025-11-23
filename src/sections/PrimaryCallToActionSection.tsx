import { FadeInWhenVisible } from '@/components/FadeInWhenVisible';

export const PrimaryCallToActionSection = () => (
  <section className="bg-abp-gold/15 py-16">
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between">
      <FadeInWhenVisible className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-[0.35em] text-abp-blue/80">
          Decisiones que generan valor
        </span>
        <h2 className="mt-3 text-3xl font-display leading-snug text-abp-blue">
          Acompañamos tu próxima decisión en seguros y gestión de riesgos
        </h2>
        <p className="mt-4 text-sm text-slate-600">
          Diseñamos soluciones a la medida para proteger a tu equipo, tu familia y tu patrimonio. Conoce
          cómo podemos integrarnos a tu estrategia.
        </p>
      </FadeInWhenVisible>

      <FadeInWhenVisible className="flex flex-col gap-4 md:items-end">
        <a
          href="#contacto"
          className="border border-abp-blue px-8 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-abp-blue transition-colors hover:bg-abp-blue hover:text-white"
        >
          Solicitar asesoría personalizada
        </a>
        <a
          href="mailto:abpseguros@gmail.com"
          className="text-xs font-semibold uppercase tracking-[0.3em] text-abp-blue/70 underline-offset-4 hover:text-abp-blue"
        >
          Escribir a nuestro equipo
        </a>
      </FadeInWhenVisible>
    </div>
  </section>
);
