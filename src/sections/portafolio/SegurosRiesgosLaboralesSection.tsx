import { type FC, useEffect, useState } from "react";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { FiCheckCircle } from "react-icons/fi";
import trabajadoresImg from "@/assets/laborales/trabajadores2.webp";
import { CustomButton } from "@/components/CustomButton";

const summaryHighlights = [
  "Nos encargamos de la afiliación y las novedades con la ARL para que tu equipo no pierda horas en trámites.",
  "Te guiamos paso a paso frente a accidentes de trabajo e incapacidades, desde el reporte hasta el reconocimiento.",
  "Fortalecemos tu SG-SST con acciones de prevención y cultura de seguridad, ayudándote a reducir la accidentalidad.",
  "Reducción de tiempos en trámites de afiliación, novedades y gestión de casos.",
  "Mayor control sobre la accidentalidad y seguimiento a incapacidades.",
  "Acompañamiento experto para implementar y fortalecer el SG-SST.",
];

const serviceAreas = [
  {
    // Título interno (solo para detalle derecho)
    title: "Gestión de afiliación",
    // Lo que se ve en la lista de 01 / 02 / 03
    badge: "Afiliación y novedades",
    items: [
      "Afiliación a ARL para empresas, independientes y contratistas.",
      "Clasificación de riesgo y apoyo en lectura de tarifas.",
      "Actualización de centros de trabajo y cargos.",
      "Gestión de traslados y novedades de personal.",
    ],
  },
  {
    title: "Siniestros",
    badge: "Accidentes y enfermedades laborales",
    items: [
      "Orientación en reporte de accidentes de trabajo (AT) y enfermedades laborales (EL).",
      "Acompañamiento en el reconocimiento de incapacidades e indemnizaciones.",
      "Gestión frente a prestaciones asistenciales: atención médica y rehabilitación.",
    ],
  },
  {
    title: "Prevención",
    badge: "Apoyo al SG-SST",
    items: [
      "Apoyo en matrices de riesgo y planes de acción.",
      "Coordinación de capacitaciones con la ARL.",
      "Campañas de prevención y cultura de seguridad.",
      "Acompañamiento en auditorías y planes de mejora.",
    ],
  },
] as const;

export const SegurosRiesgosLaboralesSection: FC = () => {
  const [activeIndex, setActiveIndex] = useState(0); // carrusel beneficios
  const [activeServiceIndex, setActiveServiceIndex] = useState(0); // sección "Qué incluye"

  // Carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % summaryHighlights.length);
    }, 5000); // cambia cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  const activeService = serviceAreas[activeServiceIndex];

  return (
    <section
      id="linea-riesgos-laborales"
      className="relative overflow-hidden bg-gradient-to-br from-[#071525] via-[#0b243a] to-[#101827] py-16 text-white sm:py-20 lg:py-24"
    >
      {/* Textura suave */}
      <div className="pointer-events-none absolute inset-0 opacity-70 mix-blend-soft-light">
        <div className="h-full w-full bg-[radial-gradient(circle_at_15%_15%,rgba(148,163,184,0.28),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(245,192,104,0.22),transparent_60%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Encabezado + imagen */}
        <FadeInWhenVisible className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            {/* Texto */}
            <div className="text-center lg:text-left">

              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Seguros de Riesgos Laborales
              </h2>

              <p className="mt-4 text-sm text-white/90 sm:text-base">
                Acompañamos a tu organización en la gestión de los riesgos
                laborales y la relación con la ARL, para que los procesos sean
                claros, ágiles y alineados con la norma.
              </p>

              <p className="mt-2 text-sm text-white/85 sm:text-base">
                Trabajamos con empresas, independientes y contratistas en
                afiliación, siniestros y prevención en riesgos laborales.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
                <CustomButton to="/portafolio/riesgos-laborales">
                  Ver portafolio de riesgos laborales
                </CustomButton>
              </div>
            </div>

            {/* Imagen sin tarjeta */}
            <div className="flex justify-center lg:justify-end">
              <img
                src={trabajadoresImg}
                alt="Personas trabajando con elementos de seguridad industrial"
                className="max-h-64 w-auto object-contain drop-shadow-[0_18px_45px_rgba(0,0,0,0.7)]"
              />
            </div>
          </div>
        </FadeInWhenVisible>

        {/* Carrusel de beneficios (automático, horizontal) */}
        <FadeInWhenVisible className="mt-10">
          <div className="mb-4 text-center text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-[#f5c068]">
            Beneficios para tu organización
          </div>

          <div className="relative mx-auto max-w-3xl overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{
                transform: `translateX(-${activeIndex * 100}%)`,
              }}
            >
              {summaryHighlights.map((highlight, index) => (
                <div
                  key={highlight}
                  className="min-w-full px-2"
                  aria-hidden={activeIndex !== index}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#f5c068] bg-transparent text-xs font-semibold text-[#f5c068]">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <p className="text-center text-sm sm:text-base text-[#f5c068]">
                      {highlight}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots de navegación */}
            <div className="mt-4 flex justify-center gap-2">
              {summaryHighlights.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    activeIndex === index
                      ? "bg-[#f5c068]"
                      : "bg-white/25 hover:bg-white/60"
                  }`}
                  aria-label={`Ver beneficio ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </FadeInWhenVisible>

        {/* Contenido principal: Qué incluye + layout 01/02/03 a la izquierda y detalle a la derecha */}
        <div className="mt-12 space-y-8">
          <FadeInWhenVisible>
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.26em] text-[#f5c068]">
              Qué incluye el servicio
            </p>
            <h3 className="mt-2 text-lg font-semibold text-white sm:text-xl">
              ¿Qué incluye nuestro acompañamiento en riesgos laborales?
            </h3>

            <p className="mt-3 text-sm text-white/90">
              Organizamos nuestro apoyo en tres frentes principales para cubrir
              todo el ciclo del riesgo laboral:
            </p>
          </FadeInWhenVisible>

          <FadeInWhenVisible className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            {/* Columna izquierda: 01 / 02 / 03, sin tarjetas, solo texto */}
            <div className="space-y-3">
              {serviceAreas.map((area, index) => {
                const isActive = index === activeServiceIndex;
                return (
                  <button
                    key={area.badge}
                    type="button"
                    onClick={() => setActiveServiceIndex(index)}
                    className="flex w-full items-center gap-3 text-left group"
                  >
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold transition ${
                        isActive
                          ? "border-[#f5c068] text-[#f5c068]"
                          : "border-white/40 text-white/75 group-hover:border-[#f5c068] group-hover:text-[#f5c068]"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-sm font-medium transition ${
                        isActive
                          ? "text-white"
                          : "text-white/80 group-hover:text-white"
                      }`}
                    >
                      {area.badge}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Columna derecha: detalle del área seleccionada */}
            <div className="rounded-2xl border border-white/12 bg-white/[0.05] p-6 shadow-[0_16px_42px_-30px_rgba(4,12,32,0.95)]">
              <span className="inline-flex items-center rounded-full bg-[#f5c068]/16 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#f5c068]">
                {activeService.badge}
              </span>

              <h4 className="mt-3 text-lg font-semibold text-white sm:text-xl">
                {activeService.title}
              </h4>

              <p className="mt-3 text-xs text-white/75">
                En este frente te acompañamos en las tareas clave para que la
                gestión con la ARL sea clara, ordenada y alineada con la norma.
              </p>

              <ul className="mt-4 space-y-3 text-sm text-white/90">
                {activeService.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <FiCheckCircle className="mt-0.5 shrink-0 text-[#f5c068]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeInWhenVisible>
        </div>

        {/* Llamado a la acción */}
        <FadeInWhenVisible className="mt-12 text-center">
          <p className="text-sm text-white/85">
            ¿Quieres revisar cómo estás gestionando hoy tus riesgos laborales?
          </p>
          <CustomButton to="/contacto" className="mt-4">
            Agenda una asesoría gratuita
          </CustomButton>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};
