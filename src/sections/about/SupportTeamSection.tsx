import { type FC } from "react";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";

const supportTeam = [
  {
    name: "Laura Victoria Guevara L.",
    role: "Ing. Industrial – Especialista en SSST",
    focus:
      "Diseña e implementa estrategias de seguridad y salud en el trabajo, garantizando cumplimiento normativo y bienestar en cada operación.",
  },
  {
    name: "Angely C. Realpe A.",
    role: "Psicóloga – Especialista en Gerencia Educativa",
    focus:
      "Acompaña procesos de salud mental y rutas psicosociales, articulando programas educativos que fortalecen el clima laboral y la prevención.",
  },
] as const;

export const SupportTeamSection: FC = () => {
  return (
    <section
      id="equipo-apoyo"
      className="relative overflow-hidden bg-white py-16 sm:py-20"
    >
      {/* FONDO TOTALMENTE BLANCO — overlay eliminado */}

      <div className="relative mx-auto max-w-6xl px-6">
        {/* TÍTULO */}
        <FadeInWhenVisible className="text-center">
          <h2 className="text-3xl font-semibold text-[#1f3258] sm:text-4xl">
            Equipo de apoyo
          </h2>

          <p className="mt-3 max-w-2xl mx-auto text-sm text-[#274472] sm:text-base">
            Detrás de cada acompañamiento hay un equipo que coordina procesos, gestiona
            documentación y brinda soporte constante a nuestros clientes y aseguradoras
            aliadas.
          </p>
        </FadeInWhenVisible>

        {/* GRID SIN TARJETAS — MISMO ESTILO QUE MAINTEAMSECTION */}
        <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-2">
          {supportTeam.map((member) => (
            <FadeInWhenVisible
              key={member.name}
              className="flex flex-col items-center text-center"
            >
              {/* FOTO */}
              <div className="mb-5 h-40 w-40 rounded-full bg-[#e1e9fb]">
                {/* 
                Si agregas fotos:
                <img
                  src="..."
                  alt={member.name}
                  className="h-full w-full rounded-full object-cover"
                /> 
                */}
              </div>

              {/* INFO */}
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
