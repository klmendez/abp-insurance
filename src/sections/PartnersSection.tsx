import { FadeInWhenVisible } from '@/components/FadeInWhenVisible';

const partners = [
  {
    name: 'Positiva Compañía de Seguros',
    description: 'ARL y seguros de vida para empresas y personas.',
  },
  {
    name: 'AXA Colpatria',
    description: 'Soluciones de vida y beneficios colectivos.',
  },
  {
    name: 'Seguros del Estado',
    description: 'Protección patrimonial y responsabilidad civil.',
  },
  {
    name: 'Seguros Mundial',
    description: 'Todo riesgo, transporte y nichos especializados.',
  },
];

export const PartnersSection = () => (
  <section id="aliados" className="bg-abp-cream/60 py-24">
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6">
      <FadeInWhenVisible className="max-w-3xl">
        <span className="text-sm font-semibold uppercase tracking-[0.35em] text-[#1c2a38]/60">
          Aliados estratégicos
        </span>
        <h2 className="mt-3 text-4xl font-['Playfair_Display'] text-[#1c2a38]">
          Respaldamos cada decisión con aseguradoras líderes
        </h2>
        <p className="mt-4 text-base text-slate-600">
          Trabajamos con aseguradoras que comparten nuestra visión de acompañamiento integral. Este
          respaldo nos permite diseñar soluciones flexibles y confiables para cada etapa de tu
          organización.
        </p>
      </FadeInWhenVisible>

      <div className="grid gap-8 md:grid-cols-4">
        {partners.map((partner) => (
          <FadeInWhenVisible
            key={partner.name}
            className="flex h-full flex-col justify-between border border-abp-blue/15 bg-white px-6 py-8"
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-abp-blue">
                {partner.name}
              </p>
              <p className="mt-4 text-sm text-slate-600">{partner.description}</p>
            </div>
            <div className="mt-6 h-px w-full bg-abp-blue/15" />
            <p className="mt-6 text-xs uppercase tracking-[0.3em] text-abp-gold">
              Acompañamiento · Bienestar · Protección
            </p>
          </FadeInWhenVisible>
        ))}
      </div>
    </div>
  </section>
);
