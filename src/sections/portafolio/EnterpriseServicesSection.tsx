import { useState } from "react";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import {
  FiTrendingUp,
  FiFileText,
  FiClipboard,
  FiUserCheck,
} from "react-icons/fi";

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

const WHATSAPP_NUMBER = "573208654369";
const buildWhatsAppLink = (text: string) =>
  `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(
    text
  )}`;

const NAVBAR_OFFSET = 120;
const COMPLEMENTARIOS_ROUTE = "/servicios-empresariales";

export const EnterpriseServicesSection = () => {
  const [benefitIndex, setBenefitIndex] = useState(0);
  const activeBenefit = benefitSlides[benefitIndex];

  const navigate = useNavigate();

  const handleBenefitNext = () =>
    setBenefitIndex((prev) =>
      prev === benefitSlides.length - 1 ? 0 : prev + 1
    );

  const handleBenefitPrev = () =>
    setBenefitIndex((prev) =>
      prev === 0 ? benefitSlides.length - 1 : prev - 1
    );

  const scrollToService = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    const targetY = rect.top + scrollTop - NAVBAR_OFFSET;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });

    el.classList.remove("highlight-gold");
    setTimeout(() => {
      el.classList.add("highlight-gold");
      setTimeout(() => el.classList.remove("highlight-gold"), 2000);
    }, 400);
  };

  const goToComplementarios = () => {
    navigate(COMPLEMENTARIOS_ROUTE);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="linea-servicios-complementarios"
      className="bg-gradient-to-br from-[#e3edff] via-[#f5faff] to-white py-24"
    >
      <div className="mx-auto max-w-6xl px-6 space-y-16">
        <FadeInWhenVisible className="space-y-6 text-center">
          <div className="mx-auto max-w-3xl space-y-4">
            <h2 className="text-4xl font-display leading-snug text-abp-blue">
              Servicios complementarios
            </h2>
            <p className="text-base text-slate-600">
              Elige la situación que más se parece a tu realidad y te mostramos
              cómo podemos ayudarte.
            </p>
          </div>

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

        <FadeInWhenVisible className="rounded-3xl bg-[#f7f9fc] border border-[#d4af37]/40 p-8 md:p-10">
          <div className="text-center space-y-3">
            <h3 className="text-2xl font-semibold text-[#1f3258]">
              ¿Tu organización está pasando por alguna de estas situaciones?
            </h3>
            <p className="text-[#274472] max-w-2xl mx-auto text-base">
              Selecciona una opción para ir directo al servicio correspondiente.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <button
              type="button"
              onClick={() => scrollToService("servicio-reinversion")}
              className="
                text-left p-5 rounded-2xl border border-[#d4af37]
                bg-white shadow-sm transition hover:shadow-md
                hover:-translate-y-0.5
                focus:outline-none focus:ring-2 focus:ring-[#d4af37]/60
              "
            >
              <p className="text-[#1f3258] font-medium text-lg">
                ¿Necesitas aprovechar mejor los recursos y retornos de la ARL?
              </p>
              <span className="mt-3 inline-block text-xs font-semibold text-[#b8860b]">
                Ver cómo te ayudamos →
              </span>
            </button>

            <button
              type="button"
              onClick={() => scrollToService("servicio-asesoria-juridica")}
              className="
                text-left p-5 rounded-2xl border border-[#d4af37]
                bg-white shadow-sm transition hover:shadow-md
                hover:-translate-y-0.5
                focus:outline-none focus:ring-2 focus:ring-[#d4af37]/60
              "
            >
              <p className="text-[#1f3258] font-medium text-lg">
                ¿Necesitas guía jurídica por accidente, ARL o pensiones?
              </p>
              <span className="mt-3 inline-block text-xs font-semibold text-[#b8860b]">
                Ver cómo te ayudamos →
              </span>
            </button>

            <button
              type="button"
              onClick={() => scrollToService("servicio-logistica")}
              className="
                text-left p-5 rounded-2xl border border-[#d4af37]
                bg-white shadow-sm transition hover:shadow-md
                hover:-translate-y-0.5
                focus:outline-none focus:ring-2 focus:ring-[#d4af37]/60
              "
            >
              <p className="text-[#1f3258] font-medium text-lg">
                ¿Quieres apoyo logístico para actividades de bienestar y SST?
              </p>
              <span className="mt-3 inline-block text-xs font-semibold text-[#b8860b]">
                Ver cómo te ayudamos →
              </span>
            </button>

            <button
              type="button"
              onClick={() => scrollToService("servicio-apoyo-profesional")}
              className="
                text-left p-5 rounded-2xl border border-[#d4af37]
                bg-white shadow-sm transition hover:shadow-md
                hover:-translate-y-0.5
                focus:outline-none focus:ring-2 focus:ring-[#d4af37]/60
              "
            >
              <p className="text-[#1f3258] font-medium text-lg">
                ¿Necesitas apoyo profesional (psicosocial / exámenes)?
              </p>
              <span className="mt-3 inline-block text-xs font-semibold text-[#b8860b]">
                Ver cómo te ayudamos →
              </span>
            </button>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible className="grid grid-cols-1 gap-8">
          <div
            id="servicio-reinversion"
            className="rounded-3xl bg-white/80 border border-abp-blue/20 p-8 md:p-10 shadow-sm"
          >
            <div className="flex items-start gap-6">
              <div className="h-14 w-14 rounded-2xl bg-[#e1ecff] flex items-center justify-center shrink-0">
                <FiTrendingUp className="h-7 w-7 text-[#1f3258]" />
              </div>

              <div className="space-y-3">
                <h4 className="text-xl font-semibold text-[#1f3258]">
                  Reinversión
                </h4>
                <p className="text-sm text-[#274472] leading-relaxed">
                  Gestionamos solicitudes, hacemos seguimiento a retornos
                  administrativos y te ayudamos a decidir en qué acciones conviene
                  reinvertir para no perder oportunidades.
                </p>

                <a
                  href={buildWhatsAppLink(
                    "Hola, necesito ayuda para aprovechar mejor los retornos y recursos de la ARL en mi empresa."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#d4af37] px-4 py-2 text-xs font-semibold text-[#1f3258] hover:bg-[#d4af37] hover:text-white transition"
                >
                  Necesito ayuda con esto <span aria-hidden>💬</span>
                </a>
              </div>
            </div>
          </div>

          <div
            id="servicio-asesoria-juridica"
            className="rounded-3xl bg-white/80 border border-abp-blue/20 p-8 md:p-10 shadow-sm"
          >
            <div className="flex items-start gap-6">
              <div className="h-14 w-14 rounded-2xl bg-[#e1ecff] flex items-center justify-center shrink-0">
                <FiFileText className="h-7 w-7 text-[#1f3258]" />
              </div>

              <div className="space-y-3">
                <h4 className="text-xl font-semibold text-[#1f3258]">
                  Asesoría jurídica
                </h4>
                <p className="text-sm text-[#274472] leading-relaxed">
                  Te acompañamos en accidentes o posibles enfermedades laborales y
                  te orientamos en Seguridad Social y pensiones para tomar decisiones
                  informadas.
                </p>

                <a
                  href={buildWhatsAppLink(
                    "Hola, necesito orientación jurídica en temas de ARL, Seguridad Social o pensiones."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#d4af37] px-4 py-2 text-xs font-semibold text-[#1f3258] hover:bg-[#d4af37] hover:text-white transition"
                >
                  Necesito ayuda con esto <span aria-hidden>💬</span>
                </a>
              </div>
            </div>
          </div>

          <div
            id="servicio-logistica"
            className="rounded-3xl bg-white/80 border border-abp-blue/20 p-8 md:p-10 shadow-sm"
          >
            <div className="flex items-start gap-6">
              <div className="h-14 w-14 rounded-2xl bg-[#e1ecff] flex items-center justify-center shrink-0">
                <FiClipboard className="h-7 w-7 text-[#1f3258]" />
              </div>

              <div className="space-y-3">
                <h4 className="text-xl font-semibold text-[#1f3258]">
                  Logística
                </h4>
                <p className="text-sm text-[#274472] leading-relaxed">
                  Coordinamos la logística de tus actividades de bienestar y SST:
                  refrigerios, espacios, souvenirs e incentivos, para que no tengas
                  que estar pendiente de cada detalle.
                </p>

                <a
                  href={buildWhatsAppLink(
                    "Hola, necesito apoyo logístico para actividades de bienestar y salud en el trabajo."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#d4af37] px-4 py-2 text-xs font-semibold text-[#1f3258] hover:bg-[#d4af37] hover:text-white transition"
                >
                  Necesito ayuda con esto <span aria-hidden>💬</span>
                </a>
              </div>
            </div>
          </div>

          <div
            id="servicio-apoyo-profesional"
            className="rounded-3xl bg-white/80 border border-abp-blue/20 p-8 md:p-10 shadow-sm"
          >
            <div className="flex items-start gap-6">
              <div className="h-14 w-14 rounded-2xl bg-[#e1ecff] flex items-center justify-center shrink-0">
                <FiUserCheck className="h-7 w-7 text-[#1f3258]" />
              </div>

              <div className="space-y-3">
                <h4 className="text-xl font-semibold text-[#1f3258]">
                  Apoyo profesional
                </h4>
                <p className="text-sm text-[#274472] leading-relaxed">
                  Apoyamos riesgo psicosocial y exámenes ocupacionales con seguimiento,
                  información clara y acciones concretas para cumplir y cuidar a las personas.
                </p>

                <a
                  href={buildWhatsAppLink(
                    "Hola, necesito apoyo profesional en temas de riesgo psicosocial y exámenes ocupacionales."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#d4af37] px-4 py-2 text-xs font-semibold text-[#1f3258] hover:bg-[#d4af37] hover:text-white transition"
                >
                  Necesito ayuda con esto <span aria-hidden>💬</span>
                </a>
              </div>
            </div>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible className="rounded-3xl border border-[#C9A048]/40 bg-[#f7f8fa] px-8 py-10 md:px-12 md:py-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3 max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-abp-blue/70">
              ¿Cómo empezamos?
            </p>

            <h3 className="text-2xl font-display leading-snug text-abp-blue">
              Agendemos una conversación
            </h3>

            <p className="text-sm text-slate-700">
              Revisamos tu necesidad y definimos el mejor camino para implementarlo
              en tu organización.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3">
            <a
              href={buildWhatsAppLink(
                "Hola, quiero agendar una conversación sobre servicios complementarios."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-modern !bg-abp-gold !text-[#030712]"
            >
              Agendar una conversación
            </a>
            <button
              type="button"
              onClick={goToComplementarios}
              className="btn-modern !bg-white !text-abp-blue !border !border-abp-blue/30 hover:!border-abp-blue/60"
            >
              Ver servicios complementarios
            </button>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};
