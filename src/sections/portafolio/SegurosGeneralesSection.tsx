import { type FC } from "react";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { FiHome, FiBriefcase } from "react-icons/fi";
import { CustomButton } from "@/components/CustomButton";

const coverageAreas = [
  {
    title: "Patrimonio empresarial",
    description:
      "Protección para infraestructura, equipos críticos y continuidad operativa con pólizas todo riesgo y daños materiales.",
  },
  {
    title: "Responsabilidad civil",
    description:
      "Planes frente a reclamaciones de terceros, diseñados según el sector y el tamaño de la organización.",
  },
  {
    title: "Movilidad y hogar",
    description:
      "Seguros para flotas, vehículos particulares y viviendas con asistencia integral y respuesta inmediata.",
  },
];

const assistance = [
  "Asesoría técnica para valorar activos y ajustar sumas aseguradas.",
  "Gestión de siniestros con aliados especializados y seguimiento al caso.",
  "Programas de prevención de pérdidas y cultura de aseguramiento.",
];

export const SegurosGeneralesSection: FC = () => {
  return (
    <section
      id="linea-seguros-generales"
      className="relative overflow-hidden bg-gradient-to-br from-[#f1f6ff] via-white to-[#dae6ff] py-16 text-[#0d1f33]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(21,59,113,0.12),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(229,185,85,0.18),transparent_65%)]" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* HEADER */}
        <FadeInWhenVisible className="mx-auto max-w-2xl text-center">
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[#0d1f33]/60">
            Línea D · Seguros Generales
          </span>

          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl text-[#0d1f33]">
            Seguros Generales
          </h2>

          <p className="mt-3 text-sm text-[#0d1f33]/75 sm:text-base">
            Aseguramos tu patrimonio, las operaciones del negocio y la movilidad de tu equipo con pólizas adaptadas a cada riesgo.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <CustomButton to="/portafolio/seguros-generales">
              Ver portafolio de seguros generales
            </CustomButton>
          </div>
        </FadeInWhenVisible>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <FadeInWhenVisible className="grid gap-6 md:grid-cols-2">
            {coverageAreas.map((area) => (
              <div
                key={area.title}
                className="rounded-xl border border-[#0d1f33]/12 bg-white px-6 py-5 shadow-lg shadow-[#1b3d7a]/10"
              >
                <h3 className="text-lg font-semibold text-[#0d1f33]">{area.title}</h3>
                <p className="mt-3 text-sm text-[#0d1f33]/75">{area.description}</p>
              </div>
            ))}
          </FadeInWhenVisible>

          <FadeInWhenVisible className="space-y-5 rounded-2xl border border-[#0d1f33]/12 bg-white p-6 shadow-lg shadow-[#1b3d7a]/12">
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

        {/* CTA OPCIONAL ABAJO (puedes quitarlo si no lo quieres) */}
        <FadeInWhenVisible className="mt-10 border-t border-[#0d1f33]/10 pt-6 text-center">
          <p className="text-sm text-[#0d1f33]/70">
            ¿Necesitas combinar varios seguros generales en un solo programa?
            Podemos armar un portafolio integral para tu empresa o tu patrimonio.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <CustomButton to="/portafolio/seguros-generales">
              Explorar programas completos
            </CustomButton>
            <CustomButton href="#contacto">
              Hablar con un especialista
            </CustomButton>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};
