import { type FC, useState, useEffect } from "react";
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
    shortLabel: "P",
    items: [
      "Seguro de vida con o sin ahorro.",
      "Seguro de vida temporal.",
      "Seguro de vida deudores para créditos y obligaciones.",
      "Vida para independientes y profesionales.",
    ],
  },
  {
    key: "empresarial",
    label: "Vida empresarial",
    shortLabel: "E",
    items: [
      "Pólizas colectivas para colaboradores.",
      "Cobertura en caso de fallecimiento.",
      "Cobertura por incapacidad total y permanente.",
      "Beneficios adicionales: exequias, auxilios y servicios complementarios.",
    ],
  },
] as const;

export const SegurosVidaSection: FC = () => {
  const [activeBenefit, setActiveBenefit] = useState(0);
  const [activeOption, setActiveOption] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBenefit((prev) => (prev + 1) % benefits.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const activeVida = vidaOptions[activeOption];

  return (
    <section
      id="linea-seguros-vida"
      className="relative overflow-hidden bg-gradient-to-br from-[#f5f8ff] via-white to-[#e3edf9] py-16 text-[#102545] sm:py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(15,23,42,0.05),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.12),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl px-6">
        
        {/* HERO */}
        <FadeInWhenVisible className="grid gap-10 items-center lg:grid-cols-[1.1fr_0.9fr]">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center justify-center rounded-full bg-white px-4 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[#4b5563] shadow-sm">
              Línea B · Seguros de Vida
            </span>

            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Seguros de Vida</h2>

            <p className="mt-4 text-sm text-[#4b5563] sm:text-base">
              Para el bienestar de las personas, sus familias y los equipos de trabajo,
              diseñamos soluciones de vida que protegen proyectos y responsabilidades.
            </p>
          </div>

          <div className="flex justify-center lg:justify-end">
            <img
              src={familiaImg}
              alt="Familia protegida"
              className="max-h-64 w-auto object-contain drop-shadow-[0_18px_45px_rgba(15,23,42,0.35)]"
            />
          </div>
        </FadeInWhenVisible>

        {/* BENEFICIOS */}
        <FadeInWhenVisible className="mt-12">
          <p className="text-center text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-[#4b5563]">
            Beneficios clave
          </p>

          <div className="relative mx-auto mt-4 max-w-3xl overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${activeBenefit * 100}%)` }}
            >
              {benefits.map((b, i) => (
                <div
                  key={b}
                  className="min-w-full flex flex-col items-center gap-3 px-2"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#4b5563] text-xs font-semibold text-[#4b5563]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-center text-sm text-[#374151] sm:text-base">{b}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-center gap-2">
              {benefits.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveBenefit(i)}
                  className={`h-2.5 w-2.5 rounded-full ${
                    activeBenefit === i ? "bg-[#4b5563]" : "bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </FadeInWhenVisible>

        {/* QUÉ INCLUYE + PROGRAMAS */}
        <FadeInWhenVisible className="mt-16 space-y-10">
          
          {/* QUÉ INCLUYE */}
          <div>
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.26em] text-[#6b7280]">
              Qué incluye el servicio
            </p>

            <div className="mt-6 flex flex-col gap-10 lg:flex-row lg:items-start">
              
              {/* INFORMACIÓN IZQUIERDA */}
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-[#102545] sm:text-base">
                  {activeVida.label}
                </h4>

                <ul className="mt-4 space-y-3 text-sm text-[#111827]">
                  {activeVida.items.map((item) => (
                    <li key={item} className="flex gap-2 items-start">
                      <span className="mt-1 text-[#4b5563]">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* SELECTOR P/E ALINEADO Y GRANDE */}
              <div className="flex flex-col items-center justify-center gap-6 w-full lg:w-auto">

                {vidaOptions.map((opt, index) => {
                  const active = index === activeOption;
                  return (
                    <button
                      key={opt.key}
                      onClick={() => setActiveOption(index)}
                      className="group flex items-center gap-3"
                    >
                      {/* Círculo grande */}
                      <span
                        className={`flex h-16 w-16 items-center justify-center rounded-full text-lg font-semibold transition ${
                          active
                            ? "bg-gradient-to-b from-[#f9e3ad] to-[#d9a43a] text-[#102545] shadow-md shadow-[#e5b955]/60"
                            : "border border-slate-300 bg-slate-100 text-slate-600 group-hover:border-[#4b5563] group-hover:text-[#4b5563]"
                        }`}
                      >
                        {opt.shortLabel}
                      </span>

                      {/* Etiqueta centrada verticalmente respecto al círculo */}
                      {active && (
                        <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-[#102545] shadow-sm">
                          {opt.label}
                        </span>
                      )}
                    </button>
                  );
                })}
                
              </div>
            </div>
          </div>

          {/* PROGRAMAS */}
          <div className="pt-6 border-t border-slate-200">
            <h3 className="text-lg font-semibold text-[#102545] sm:text-xl">
              Programas de vida para personas y empresas
            </h3>

            <p className="mt-3 text-sm text-[#4b5563] sm:text-[0.95rem]">
              Te ayudamos a elegir el programa de vida adecuado para ti o para tu
              organización, alineando la protección con tus metas financieras.
            </p>

            <button className="mt-6 inline-flex items-center justify-center rounded-full bg-[#d9a43a] px-6 py-2 text-sm font-semibold text-[#102545] shadow-md transition hover:bg-[#b48327]">
              Agenda una asesoría en seguros de vida
            </button>
          </div>

        </FadeInWhenVisible>
      </div>
    </section>
  );
};
