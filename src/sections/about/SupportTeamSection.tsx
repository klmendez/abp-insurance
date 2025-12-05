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
      className="relative overflow-hidden bg-white py-16 text-[#0d1f33] sm:py-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(17,56,98,0.08),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(245,192,104,0.2),transparent_65%)]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <FadeInWhenVisible className="text-center md:text-left">
          <span className="inline-flex items-center justify-center rounded-full bg-[#0d1f33]/5 px-4 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-[#0d1f33]/70 ring-1 ring-[#0d1f33]/10">
            Equipo de apoyo
          </span>

          <h2 className="mt-4 text-3xl font-semibold text-[#0d1f33] sm:text-4xl">
            Personas que hacen posible la experiencia ABP
          </h2>

          <p className="mt-3 max-w-2xl text-sm text-[#0d1f33]/70 sm:text-base">
            Detrás de cada acompañamiento hay un equipo que coordina procesos, gestiona documentación y brinda soporte constante a nuestros clientes y aseguradoras aliadas.
          </p>
        </FadeInWhenVisible>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {supportTeam.map((member) => (
            <FadeInWhenVisible
              key={member.name}
              className="group flex flex-col gap-4 rounded-2xl border border-[#0d1f33]/10 bg-white/80 p-6 shadow-[0_20px_45px_-32px_rgba(5,17,37,0.55)] backdrop-blur transition hover:-translate-y-1 hover:border-[#f5c068]/40 hover:bg-white"
            >
              <div className="flex size-14 items-center justify-center rounded-full bg-[#f5c068]/15 text-lg font-semibold uppercase tracking-[0.06em] text-[#d8a548]">
                {member.name.slice(0, 2)}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#0d1f33]">
                  {member.name}
                </h3>
                <p className="text-sm font-medium uppercase tracking-[0.22em] text-[#f5c068]">
                  {member.role}
                </p>
              </div>

              <p className="text-sm text-[#0d1f33]/70">
                {member.focus}
              </p>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
};
