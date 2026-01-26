import { type FC } from "react";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import AndresImg from "@/assets/personas/Andres.webp";
import LuisImg from "@/assets/personas/Luis.webp";
import MariaImg from "@/assets/personas/Maria.webp";

type TeamMember = {
  name: string;
  role: string;
  focus: string;
  image?: string;
};

const mainTeam = [
  {
    name: "Maria Cecilia Arboleda Simmonds",
    role: "Diseñadora y Ejecutiva comercial",
    focus:
      "Acompaña a los clientes en procesos comerciales, análisis de necesidades y estructuración de propuestas empresariales.",
    image: MariaImg,
  },
  {
    name: "Luis Hernando Barrios Hernandez",
    role: "Abogado especialista en Derecho Laboral y Seguridad Social",
    focus:
      "Brinda asesoría jurídica en derecho laboral y seguridad social, gestionando riesgos legales y fortaleciendo la protección organizacional.",
    image: LuisImg,
  },
  {
    name: "Andrés José Paz Arboleda",
    role: "Ingeniero industrial",
    focus:
      "Optimiza procesos y lidera la planeación y ejecución de proyectos empresariales con enfoque estratégico.",
    image: AndresImg,
  },
] satisfies readonly TeamMember[];

export const MainTeamSection: FC = () => {
  return (
    <section
      id="equipo-trabajo"
      className="relative overflow-hidden bg-gradient-to-br from-[#f2f6ff] via-white to-[#e7f0ff] py-16 sm:py-20"
    >
      {/* Overlay de fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(66,104,168,0.12),transparent_60%),radial-gradient(circle_at_80%_85%,rgba(191,214,255,0.32),transparent_70%)]" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Título */}
        <FadeInWhenVisible className="text-center">
          <h2 className="text-3xl font-semibold text-[#1f3258] sm:text-4xl">
            Nuestro equipo de trabajo
          </h2>

          <p className="mt-3 mx-auto max-w-2xl text-sm text-[#274472] sm:text-base">
            Profesionales con experiencia en derecho laboral, seguridad social,
            finanzas empresariales y gerencia de proyectos que acompañan la toma
            de decisiones estratégicas de tu organización.
          </p>
        </FadeInWhenVisible>

        {/* Grid */}
        <div className="mt-12 grid gap-12 sm:grid-cols-3">
          {mainTeam.map((member) => (
            <FadeInWhenVisible
              key={member.name}
              className="flex flex-col items-center text-center"
            >
              {/* Foto */}
              <div className="relative mb-5 h-40 w-40 overflow-hidden rounded-full bg-[#e1e9fb] shadow-inner ring-4 ring-[#f5c068]/30">
                {member.image && (
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    className="
                      h-full w-full
                      object-cover
                      transform scale-150 origin-top object-center
                    "
                  />
                )}

                <div
                  className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-[#f5c068]/45 via-transparent to-transparent mix-blend-multiply"
                  aria-hidden="true"
                />
              </div>

              {/* Info */}
              <h3 className="text-lg font-semibold text-[#1f3258]">
                {member.name}
              </h3>

              <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-[#f5c068]">
                {member.role}
              </p>

              <p className="mt-2 max-w-xs text-sm text-[#274472]">
                {member.focus}
              </p>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
};
