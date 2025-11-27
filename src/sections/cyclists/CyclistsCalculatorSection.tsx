import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { FiAnchor, FiArrowRight, FiLifeBuoy } from "react-icons/fi";
import { calculatorHints } from "./cyclistsContent";

export const CyclistsCalculatorSection = () => {
  return (
    <section id="calculadora" className="bg-abp-light py-28">
      <div className="mx-auto max-w-6xl px-6">
        <FadeInWhenVisible className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-abp-blue/70">
            Calcula una prima estimada
          </span>
          <h2 className="mt-3 text-3xl font-semibold text-abp-blue md:text-4xl">
            Diseña tu escenario ideal antes de hablar con un asesor.
          </h2>
          <p className="mt-4 text-base text-slate-600">
            El valor final depende de aseguradora, coberturas y perfil. Empieza aquí y ajustamos juntos la propuesta.
          </p>
        </FadeInWhenVisible>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
          <FadeInWhenVisible className="relative overflow-hidden rounded-3xl border border-abp-blue/20 bg-gradient-to-br from-abp-blue via-abp-navy to-abp-midnight p-8 text-white shadow-lg">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(93,181,255,0.25),transparent_55%)]" />
            <div className="relative space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-abp-gold/40 bg-white/10 px-4 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-abp-gold/90">
                <FiLifeBuoy className="size-3.5" />
                Simulador referencial
              </div>

              <form className="grid gap-6 text-sm text-white/90">
                <label className="grid gap-2 text-left">
                  <span className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-abp-gold/80">
                    Tipo de producto
                  </span>
                  <select className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white focus:border-abp-gold focus:outline-none">
                    <option>Vida y Accidentes para Ciclistas</option>
                    <option>Seguro para la Bicicleta</option>
                    <option>Seguro de Viaje para Ciclistas</option>
                    <option>Combo Vida + Bicicleta + Viaje</option>
                  </select>
                </label>

                <label className="grid gap-2 text-left">
                  <span className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-abp-gold/80">
                    Suma asegurada / Valor bici (COP)
                  </span>
                  <input
                    type="number"
                    min="0"
                    placeholder="Ej. 15000000"
                    className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 focus:border-abp-gold focus:outline-none"
                  />
                </label>

                <label className="grid gap-2 text-left">
                  <span className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-abp-gold/80">
                    Perfil / uso de la bici
                  </span>
                  <select className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white focus:border-abp-gold focus:outline-none">
                    <option>Recreativo / urbano</option>
                    <option>Entrenamiento frecuente</option>
                    <option>Competitivo / eventos frecuentes</option>
                  </select>
                </label>

                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-abp-gold px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.26em] text-abp-navy shadow-lg transition hover:bg-abp-gold/90"
                >
                  Calcular prima estimada
                  <FiArrowRight className="size-4" />
                </button>
              </form>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible className="rounded-3xl border border-abp-blue/20 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-full bg-abp-blue/10 text-abp-blue">
                <FiAnchor className="size-6" />
              </div>
              <div>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-abp-blue/80">
                  Tips de asesor ABP
                </p>
                <p className="text-sm text-slate-600">
                  Con estos datos construiremos un escenario realista y te mostraremos opciones de aseguradoras aliadas.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 text-sm text-slate-700">
              {calculatorHints.map((hint) => (
                <div
                  key={hint.title}
                  className="rounded-2xl border border-abp-blue/20 bg-abp-light px-5 py-4"
                >
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-abp-blue">
                    {hint.title}
                  </p>
                  <p className="mt-2 text-sm text-slate-600">{hint.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-dashed border-abp-gold/50 bg-abp-cream px-5 py-4 text-[0.75rem] text-abp-blue">
              Ingresa lo que sabes. Un asesor ABP te contactará para ajustar coberturas reales y revisar aseguradoras disponibles.
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
};
