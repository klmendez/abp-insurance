import { type FC, useState } from "react";
import { Link } from "react-router-dom";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import familiaImg from "@/assets/vida/persona-familia.jpg";

const benefits = [
  "Protección financiera para tus proyectos y responsabilidades.",
  "Coberturas flexibles para el bienestar de familias y equipos de trabajo.",
  "Opciones de vida con y sin ahorro, ajustadas a tus metas.",
  "Respaldo económico ante fallecimiento o incapacidad total y permanente.",
];

const vidaOptions = [
  {
    key: "personal",
    label: "Vida personal",
    items: [
      "Seguro de vida con o sin ahorro.",
      "Seguro de vida temporal.",
      "Seguro de vida deudores para créditos y obligaciones.",
      "Vida para independientes y profesionales.",
    ],
    description: [
      "Ideal para quienes desean proteger el bienestar de su familia y asegurar obligaciones financieras.",
      "Excelente opción si tienes dependientes económicos, créditos o quieres construir patrimonio.",
    ],
  },
  {
    key: "empresarial",
    label: "Vida empresarial",
    items: [
      "Pólizas colectivas para colaboradores.",
      "Cobertura en caso de fallecimiento.",
      "Cobertura por incapacidad total y permanente.",
      "Beneficios adicionales: exequias, auxilios y servicios complementarios.",
    ],
    description: [
      "Diseñado para empresas que desean proteger a sus colaboradores y fortalecer beneficios laborales.",
      "Ayuda a mantener estabilidad ante eventos inesperados que puedan afectar a la organización y a las familias de los colaboradores.",
    ],
  },
] as const;

export const SegurosVidaSection: FC = () => {
  const [activeOption, setActiveOption] = useState(0);
  const activeVida = vidaOptions[activeOption];

  return (
    <section
      id="linea-seguros-vida"
      className="relative overflow-hidden bg-gradient-to-br from-[#f5f7ff] via-white to-[#e3ecf8] py-12 sm:py-14"
    >
      {/* fondo suave */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(15,23,42,0.04),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.09),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* HERO */}
        <FadeInWhenVisible className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="inline-flex rounded-full bg-white/80 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[#4b5563]">
              Línea B · Seguros de Vida
            </span>

            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl text-[#102545]">
              Seguros de Vida
            </h2>

            <p className="mt-3 text-sm text-[#4b5563] sm:text-base">
              Diseñamos soluciones que protegen tu bienestar, tu familia y tus
              responsabilidades personales o empresariales.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/portafolio/seguros-vida" className="btn-modern">
                Ver portafolio de vida
              </Link>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <img
              src={familiaImg}
              alt="Familia protegida"
              className="max-h-56 rounded-2xl object-cover shadow-lg"
            />
          </div>
        </FadeInWhenVisible>

        {/* CUERPO PRINCIPAL: IZQUIERDA / DERECHA */}
        <FadeInWhenVisible className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* IZQUIERDA: QUÉ INCLUYE */}
          <div>
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-[#6b7280]">
              Qué incluye el servicio
            </p>

            {/* pestañas sin tarjetas */}
            <div className="mt-3 flex gap-2 text-xs font-medium">
              {vidaOptions.map((opt, i) => {
                const active = i === activeOption;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setActiveOption(i)}
                    className={`rounded-full px-4 py-1.5 border transition ${
                      active
                        ? "border-[#102545] bg-[#102545] text-white"
                        : "border-slate-300 text-[#4b5563] hover:bg-slate-100"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            {/* lista de coberturas */}
            <div className="mt-5">
              <ul className="space-y-2 border-l border-slate-300 pl-4 text-sm text-[#111827]">
                {activeVida.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#d9a43a]" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* descripción abajo, sin caja */}
              <div className="mt-4 space-y-1.5 text-sm text-[#4b5563]">
                {activeVida.description.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </div>
            </div>
          </div>

          {/* DERECHA: BENEFICIOS CLAVE */}
          <div>
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-[#6b7280]">
              Beneficios clave
            </p>

            <div className="mt-4 space-y-3">
              {benefits.map((b, i) => (
                <div key={b} className="flex gap-3">
                  <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-[#4b5563] text-[0.75rem] font-semibold text-[#4b5563]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm text-[#374151]">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeInWhenVisible>

        {/* CTA FINAL SIMPLE */}
        <FadeInWhenVisible className="mt-10 border-t border-slate-200 pt-7 text-center">
          <h3 className="text-lg font-semibold text-[#102545] sm:text-xl">
            Programas de vida para personas y empresas
          </h3>

          <p className="mt-2 text-sm text-[#4b5563] sm:text-[0.95rem]">
            Te guiamos para elegir la protección adecuada según tus metas,
            responsabilidades y el nivel de tranquilidad que quieres alcanzar.
          </p>

          <button className="mt-5 inline-flex items-center justify-center rounded-full bg-[#d9a43a] px-6 py-2 text-sm font-semibold text-[#102545] transition hover:bg-[#b48327]">
            Agenda una asesoría
          </button>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};
