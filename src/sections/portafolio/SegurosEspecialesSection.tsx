import { type FC } from "react";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { FiCompass, FiGlobe } from "react-icons/fi";

const solutions = [
  {
    title: "Ciclistas y movilidad",
    description:
      "Coberturas de vida, accidentes y equipo para ciclistas, repartidores y recicladores que requieren protección en movimiento.",
  },
  {
    title: "Eventos y actividades",
    description:
      "Seguros que respaldan competencias deportivas, activaciones y experiencias de marca con planes flexibles por evento.",
  },
  {
    title: "Nichos personalizados",
    description:
      "Diseñamos programas a la medida para colectivos con necesidades particulares, desde startups hasta asociaciones sectoriales.",
  },
];

const callouts = [
  "Análisis de riesgo y acompañamiento 360° en proyectos especiales",
  "Procesos de reclamación ágiles con aliados especializados",
  "Integración con beneficios complementarios para colaboradores",
];

export const SegurosEspecialesSection: FC = () => {
  return (
    <section
      id="linea-seguros-especiales"
      className="relative overflow-hidden bg-gradient-to-br from-[#10172b] via-[#131f35] to-[#1e2f4d] py-16 text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.1),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(34,84,160,0.25),transparent_65%)]" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6">
        <FadeInWhenVisible className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.32em] text-white/70">
            Línea C · Seguros Especiales
          </span>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Seguros Especiales
          </h2>
          <p className="mt-4 text-sm text-white/80 sm:text-base">
            Protegemos proyectos únicos y colectivos con soluciones dinámicas que se adaptan a cada escenario.
          </p>
        </FadeInWhenVisible>

        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <FadeInWhenVisible className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur">
            <div className="flex items-center gap-3 text-white">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white">
                <FiCompass className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-semibold">Ámbitos de cobertura</h3>
            </div>

            <ul className="mt-6 space-y-4 text-sm text-white/80">
              {solutions.map((item) => (
                <li key={item.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <h4 className="text-base font-semibold text-white">{item.title}</h4>
                  <p className="mt-2 text-sm text-white/75">{item.description}</p>
                </li>
              ))}
            </ul>
          </FadeInWhenVisible>

          <FadeInWhenVisible className="space-y-6 rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur">
            <div className="flex items-center gap-3 text-white">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white">
                <FiGlobe className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-semibold">Valor agregado</h3>
            </div>

            <ul className="space-y-4 text-sm text-white/80">
              {callouts.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 block h-2 w-2 rounded-full bg-[#f7e7b0]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
};
