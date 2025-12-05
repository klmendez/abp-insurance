import { type FC } from "react";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { FiLayers, FiClipboard } from "react-icons/fi";

const services = [
  {
    title: "Gestión documental",
    description:
      "Centralizamos y mantenemos al día los procesos de afiliación, novedades y soporte con aseguradoras y EPS.",
  },
  {
    title: "SG-SST a la medida",
    description:
      "Diseñamos, implementamos y auditamos sistemas de gestión para cumplir normativas y elevar la cultura preventiva.",
  },
  {
    title: "Capacitación y cultura",
    description:
      "Programas de formación, talleres y campañas para fortalecer hábitos seguros y bienestar integral en tu equipo.",
  },
];

const extras = [
  "Consultoría especializada para responder a auditorías y visitas de entes de control",
  "Plataformas y herramientas digitales para seguimiento de tareas y planes de acción",
  "Indicadores y reportes ejecutivos que facilitan la toma de decisiones estratégicas",
];

export const ServiciosComplementariosSection: FC = () => {
  return (
    <section
      id="linea-servicios-complementarios"
      className="relative overflow-hidden bg-gradient-to-br from-[#0d1f33] via-[#153b71] to-[#1c4799] py-16 text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.12),transparent_65%),radial-gradient(circle_at_85%_80%,rgba(34,119,230,0.25),transparent_60%)]" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6">
        <FadeInWhenVisible className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.32em] text-white/70">
            Línea E · Servicios Complementarios
          </span>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Servicios Complementarios
          </h2>
          <p className="mt-4 text-sm text-white/80 sm:text-base">
            Potenciamos tu portafolio con acompañamiento consultivo, herramientas digitales y programas de cultura preventiva.
          </p>
        </FadeInWhenVisible>

        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <FadeInWhenVisible
                key={service.title}
                className="rounded-xl border border-white/15 bg-white/5 px-6 py-5 backdrop-blur"
              >
                <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                <p className="mt-3 text-sm text-white/80">{service.description}</p>
              </FadeInWhenVisible>
            ))}
          </div>

          <FadeInWhenVisible className="space-y-5 rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur">
            <div className="flex items-center gap-3 text-white">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white">
                <FiLayers className="h-5 w-5" />
              </span>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white">
                <FiClipboard className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-semibold">Valor operativo</h3>
            </div>

            <ul className="space-y-3 text-sm text-white/80">
              {extras.map((item) => (
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
