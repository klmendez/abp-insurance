import { type FC } from "react";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";

const supportTeam = [
  {
    name: "Carlos Mejía",
    role: "Coordinador de Afiliaciones",
    focus:
      "Asegura que cada solicitud con la ARL se procese en tiempos óptimos y sin reprocesos, acompañando a talento humano en cada novedad.",
  },
  {
    name: "Diana Rojas",
    role: "Analista de Siniestros",
    focus:
      "Gestiona reportes, seguimiento de incapacidades y reclamaciones para garantizar que los colaboradores reciban la atención necesaria.",
  },
  {
    name: "Felipe Torres",
    role: "Especialista SG-SST",
    focus:
      "Coordina planes de prevención, capacitaciones y auditorías internas que fortalecen la cultura de seguridad en las empresas.",
  },
  {
    name: "María Camacho",
    role: "Ejecutiva de Servicio",
    focus:
      "Resuelve solicitudes y casos críticos con enfoque humano, conectando aseguradoras, clientes y colaboradores de manera ágil.",
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
        <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
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
