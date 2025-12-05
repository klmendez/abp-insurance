import { type FC } from "react";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";

const mainTeam = [
  {
    name: "Andrés Barros",
    role: "Director General",
    focus:
      "Define la visión estratégica de ABP y acompaña personalmente a los clientes clave en la construcción de programas de aseguramiento a la medida.",
  },
  {
    name: "Karen",
    role: "Directora Comercial",
    focus:
      "Diseña experiencias de servicio memorables y lidera los procesos de vinculación con clientes empresariales y aliados estratégicos.",
  },
  {
    name: "Julián Ordoñez",
    role: "Gerente Técnico",
    focus:
      "Supervisa el análisis de riesgos y la estructuración de pólizas asegurando el cumplimiento normativo y la rentabilidad técnica.",
  },
  {
    name: "Laura Sánchez",
    role: "Coordinadora de Cumplimiento",
    focus:
      "Gestiona auditorías internas, modelos de gobierno y procesos de mejoramiento continuo enfocados en el SG-SST y estándares SARLAFT.",
  },
] as const;

export const MainTeamSection: FC = () => {
  return (
    <section
      id="equipo-trabajo"
      className="relative overflow-hidden bg-gradient-to-br from-[#050b1a] via-[#0e2744] to-[#153b71] py-16 text-white sm:py-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(255,255,255,0.16),transparent_60%),radial-gradient(circle_at_74%_76%,rgba(21,83,153,0.24),transparent_70%)]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <FadeInWhenVisible className="text-center md:text-left">
          <span className="inline-flex items-center justify-center rounded-full bg-white/10 px-4 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-white/80 ring-1 ring-white/15">
            Equipo de trabajo
          </span>

          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            Liderazgo que impulsa la transformación
          </h2>

          <p className="mt-3 max-w-2xl text-sm text-white/85 sm:text-base">
            Somos un equipo multidisciplinario que combina experiencia en aseguramiento, gestión del riesgo y servicio al cliente para acompañar a las organizaciones y a las personas en cada etapa.
          </p>
        </FadeInWhenVisible>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {mainTeam.map((member) => (
            <FadeInWhenVisible
              key={member.name}
              className="group flex flex-col gap-4 rounded-2xl border border-white/15 bg-white/[0.06] p-6 shadow-[0_20px_50px_-34px_rgba(1,9,21,0.85)] transition hover:border-[#f5c068]/40 hover:bg-white/[0.12]"
            >
              <div className="flex size-14 items-center justify-center rounded-full bg-white/10 text-lg font-semibold uppercase tracking-[0.06em] text-[#f5c068]">
                {member.name.slice(0, 2)}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white">
                  {member.name}
                </h3>
                <p className="text-sm font-medium uppercase tracking-[0.22em] text-[#f5c068]">
                  {member.role}
                </p>
              </div>

              <p className="text-sm text-white/80">
                {member.focus}
              </p>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
};
