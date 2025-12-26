import { useState } from "react";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

/* ---------- Datos ---------- */

const benefitSlides = [
  {
    title: "Menos riesgo en auditorías",
    subtitle: "Soportes completos y actualizados para visitas.",
  },
  {
    title: "Procesos que sí funcionan",
    subtitle: "Sistemas y documentos alineados con la operación real.",
  },
  {
    title: "Cultura preventiva viva",
    subtitle: "Equipos conscientes de sus riesgos y responsabilidades.",
  },
];

const WHATSAPP_NUMBER = "573135707125";
const buildWhatsAppLink = (text: string) =>
  `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(
    text
  )}`;

/* ---------- Componente principal ---------- */

export const EnterpriseServicesSection = () => {
  const [benefitIndex, setBenefitIndex] = useState(0);
  const activeBenefit = benefitSlides[benefitIndex];

  const handleBenefitNext = () =>
    setBenefitIndex((prev) =>
      prev === benefitSlides.length - 1 ? 0 : prev + 1
    );

  const handleBenefitPrev = () =>
    setBenefitIndex((prev) =>
      prev === 0 ? benefitSlides.length - 1 : prev - 1
    );

  return (
    <section
      id="linea-servicios-complementarios"
      className="bg-gradient-to-br from-[#e3edff] via-[#f5faff] to-white py-24"
    >
      <div className="mx-auto max-w-6xl px-6 space-y-16">
        {/* CABECERA LÍNEA E */}
        <FadeInWhenVisible className="space-y-6 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-abp-blue/80">
            Línea E · Servicios complementarios
          </span>

          <div className="mx-auto max-w-3xl space-y-4">
            <h2 className="text-4xl font-display leading-snug text-abp-blue">
              Servicios complementarios
            </h2>
            <p className="text-base text-slate-600">
              Acompañamos a tu organización en tres ejes clave: orden interno,
              cumplimiento preventivo y equipos que se cuidan, para que la
              gestión diaria sea más clara, segura y sostenible.
            </p>
          </div>

          {/* CARRUSEL DE BENEFICIOS */}
          <div className="mt-4 flex flex-col items-center gap-4">
            <div className="max-w-xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-abp-blue">
                {activeBenefit.title}
              </p>
              <p className="mt-2 text-sm text-slate-600">
                {activeBenefit.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handleBenefitPrev}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-abp-blue/30 bg-white/80 text-abp-blue hover:border-abp-blue/60"
                aria-label="Anterior beneficio"
              >
                <FiChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex gap-2">
                {benefitSlides.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setBenefitIndex(index)}
                    className={`h-1.5 rounded-full transition-all ${
                      index === benefitIndex
                        ? "w-6 bg-abp-blue"
                        : "w-2 bg-abp-blue/30"
                    }`}
                    aria-label={`Ir al beneficio ${index + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleBenefitNext}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-abp-blue/30 bg-white/80 text-abp-blue hover:border-abp-blue/60"
                aria-label="Siguiente beneficio"
              >
                <FiChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </FadeInWhenVisible>

        {/* TRES EJES */}
        <FadeInWhenVisible className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Eje 1 */}
          <div className="space-y-4">
            <h3 className="text-xl font-display text-[#C9A048]">
              Organización del día a día
            </h3>
            <p className="text-sm text-slate-600">
              Mantén tus documentos laborales en orden y siempre actualizados.
            </p>
          </div>

          {/* Eje 2 */}
          <div className="space-y-4">
            <h3 className="text-xl font-display text-[#C9A048]">
              Seguridad y cumplimiento
            </h3>
            <p className="text-sm text-slate-600">
              Implementa el SG-SST sin complicaciones y alineado con tu operación.
            </p>
          </div>

          {/* Eje 3 */}
          <div className="space-y-4">
            <h3 className="text-xl font-display text-[#C9A048]">
              Equipos que se cuidan
            </h3>
            <p className="text-sm text-slate-600">
              Formación práctica para que tu gente actúe de forma segura.
            </p>
          </div>
        </FadeInWhenVisible>

        {/* CTA FINAL */}
        <FadeInWhenVisible className="rounded-3xl border border-[#C9A048]/40 bg-[#f7f8fa] px-8 py-10 md:px-12 md:py-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3 max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-abp-blue/70">
              ¿Cómo empezamos?
            </p>

            <h3 className="text-2xl font-display leading-snug text-abp-blue">
              Conversemos sobre la Línea E para tu organización
            </h3>

            <p className="text-sm text-slate-700">
              Revisamos juntos tus necesidades en documentación, cumplimiento y
              formación, y definimos un acompañamiento que se adapte a tu
              realidad, no al revés.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3">
            <a
              href={buildWhatsAppLink(
                "Hola, quiero agendar una conversación sobre la Línea E."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-modern !bg-abp-gold !text-[#030712]"
            >
              Agendar una conversación
            </a>

            <p className="text-[0.7rem] uppercase tracking-[0.22em] text-slate-600 text-left md:text-right">
              Línea E · Orden interno · Cumplimiento · Cultura preventiva
            </p>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};
