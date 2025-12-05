import { useState } from "react";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";

const focusAreas = [
  {
    id: "empresa",
    label: "Tu empresa",
    badge: "Empresas",
    description:
      "Protección para la operación, el patrimonio y el cumplimiento en riesgos laborales.",
  },
  {
    id: "equipo",
    label: "Tu equipo de trabajo",
    badge: "Personas",
    description:
      "Vida, bienestar y respaldo económico para quienes hacen posible tu organización.",
  },
  {
    id: "familia",
    label: "Tu familia y tus proyectos",
    badge: "Familias",
    description:
      "Seguros de vida, hogar y soluciones que cuidan lo que estás construyendo.",
  },
];

export const PrimaryCallToActionSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = focusAreas[activeIndex];

  return (
    <section className="bg-[#f5f7ff] py-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-center">
        {/* TEXTO PRINCIPAL */}
        <FadeInWhenVisible className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-abp-blue/80">
            Decisiones que generan valor
          </span>
          <h2 className="mt-3 text-3xl font-display leading-snug text-abp-blue md:text-4xl">
            Conversemos sobre la protección que hoy necesitas
          </h2>
          <p className="mt-4 text-sm text-slate-600">
            Analizamos tu contexto, identificamos brechas de protección y
            diseñamos un plan integral para tu empresa, tu equipo o tu familia.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a href="#contacto" className="btn-modern">
              Quiero una asesoría sin costo
            </a>

            <a href="/portafolio" className="btn-modern btn-modern--light">
              Ver portafolio completo
            </a>
          </div>
        </FadeInWhenVisible>

        {/* MINI CARRUSEL: ¿QUÉ QUIERES PROTEGER? */}
        <FadeInWhenVisible className="md:justify-self-end">
          <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-md">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-slate-500">
              ¿Qué quieres proteger?
            </p>

            <div className="mt-3 flex gap-2">
              {focusAreas.map((area, index) => (
                <button
                  key={area.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`flex-1 rounded-full border px-3 py-1.5 text-[0.7rem] font-medium transition-colors ${
                    index === activeIndex
                      ? "border-abp-blue bg-abp-blue text-white"
                      : "border-slate-200 bg-slate-50 text-slate-600 hover:border-abp-blue/60 hover:text-abp-blue"
                  }`}
                >
                  {area.label}
                </button>
              ))}
            </div>

            <div className="mt-4 rounded-xl bg-slate-50 px-4 py-3">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-abp-blue">
                {active.badge}
              </p>
              <p className="mt-2 text-sm text-slate-700">{active.description}</p>
            </div>

            <p className="mt-3 text-[0.7rem] text-slate-500">
              Puedes contarnos esto en el mensaje de contacto y adaptamos la propuesta a esa necesidad.
            </p>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};
