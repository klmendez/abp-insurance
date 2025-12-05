import { type FC } from "react";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { FiHome, FiBriefcase } from "react-icons/fi";

const coverageAreas = [
  {
    title: "Patrimonio empresarial",
    description:
      "Protección para infraestructura, equipos críticos y continuidad operativa con coberturas todo riesgo y daños materiales.",
  },
  {
    title: "Responsabilidad civil",
    description:
      "Planifica frente a reclamaciones de terceros con soluciones diseñadas para distintos sectores y tamaños de empresa.",
  },
  {
    title: "Movilidad y hogar",
    description:
      "Seguros para flotas, vehículos individuales y hogares, con asistencia integral y respuesta inmediata.",
  },
];

const assistance = [
  "Asesoría técnica para valorar activos y ajustar sumas aseguradas",
  "Gestión de siniestros con aliados especializados y seguimiento en tiempo real",
  "Programas de prevención de pérdidas y cultura de aseguramiento",
];

export const SegurosGeneralesSection: FC = () => {
  return (
    <section
      id="linea-seguros-generales"
      className="relative overflow-hidden bg-gradient-to-br from-[#eff4ff] via-white to-[#d7e6ff] py-16 text-[#0d1f33]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(27,68,146,0.1),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(238,199,124,0.18),transparent_60%)]" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6">
        <FadeInWhenVisible className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.32em] text-[#0d1f33]/60">
            Línea D · Seguros Generales
          </span>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Seguros Generales
          </h2>
          <p className="mt-4 text-sm text-[#0d1f33]/70 sm:text-base">
            Aseguramos tu patrimonio, operaciones y movilidad con pólizas adaptadas a cada riesgo.
          </p>
        </FadeInWhenVisible>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="grid gap-6 md:grid-cols-2">
            {coverageAreas.map((area) => (
              <FadeInWhenVisible
                key={area.title}
                className="rounded-xl border border-[#0d1f33]/10 bg-white px-6 py-5 shadow-lg shadow-[#143665]/10"
              >
                <h3 className="text-lg font-semibold text-[#0d1f33]">{area.title}</h3>
                <p className="mt-3 text-sm text-[#0d1f33]/75">{area.description}</p>
              </FadeInWhenVisible>
            ))}
          </div>

          <FadeInWhenVisible className="space-y-5 rounded-2xl border border-[#0d1f33]/10 bg-white p-6 shadow-lg shadow-[#143665]/10">
            <div className="flex items-center gap-3 text-[#0d1f33]">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#153b71]/10 text-[#153b71]">
                <FiHome className="h-5 w-5" />
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d38c3a]/15 text-[#c17628]">
                <FiBriefcase className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-semibold">Acompañamiento experto</h3>
            </div>

            <ul className="space-y-3 text-sm text-[#0d1f33]/75">
              {assistance.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 block h-2 w-2 rounded-full bg-[#153b71]" />
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
