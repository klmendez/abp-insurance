import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { productBundles, comparisonFeatures } from "./cyclistsContent";

export const CyclistsBundlesComparison = () => {
  return (
    <section id="comparativa" className="bg-white py-28">
      <div className="mx-auto max-w-6xl px-6">
        <FadeInWhenVisible className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-abp-blue/70">
            Comparativa rápida
          </span>
          <h2 className="mt-3 text-3xl font-semibold text-abp-blue md:text-4xl">
            Elige el combo que se ajusta a tus rutas y eventos.
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Recomendaciones iniciales; podemos combinarlas, ajustar capitales y crear planes híbridos para tu equipo o club.
          </p>
        </FadeInWhenVisible>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {productBundles.map((bundle) => (
            <FadeInWhenVisible
              key={bundle.id}
              className="flex flex-col rounded-3xl border border-abp-blue/20 bg-abp-light px-6 py-7 shadow-sm"
            >
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-abp-blue">
                {bundle.target}
              </span>
              <h3 className="mt-3 text-xl font-semibold text-abp-slate">
                {bundle.title}
              </h3>
              <p className="mt-3 text-sm text-slate-600">{bundle.description}</p>

              <ul className="mt-5 space-y-2 text-sm text-slate-700">
                {bundle.benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-2">
                    <span className="mt-1 size-2 rounded-full bg-abp-blue" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </FadeInWhenVisible>
          ))}
        </div>

        <FadeInWhenVisible className="mt-12 overflow-hidden rounded-3xl border border-abp-blue/20">
          <div className="grid grid-cols-1 bg-abp-midnight text-white md:grid-cols-4">
            <div className="px-5 py-4 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-abp-gold/80">
              Comparativa de coberturas
            </div>
            <div className="px-5 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-abp-gold">
              Vida
            </div>
            <div className="px-5 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-abp-gold">
              Bicicleta
            </div>
            <div className="px-5 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-abp-gold">
              Viaje
            </div>
          </div>

          <div className="divide-y divide-abp-blue/15 bg-white">
            {comparisonFeatures.map((feature) => (
              <div key={feature.label} className="grid grid-cols-1 text-sm text-slate-700 md:grid-cols-4">
                <div className="bg-abp-light px-5 py-4 font-semibold text-abp-slate">
                  {feature.label}
                </div>
                <div className="px-5 py-4">{feature.vida}</div>
                <div className="px-5 py-4">{feature.bici}</div>
                <div className="px-5 py-4">{feature.viaje}</div>
              </div>
            ))}
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};
