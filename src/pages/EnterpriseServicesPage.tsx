// src/pages/EnterpriseServicesPage.tsx
import { EnterpriseServicesSection } from "../sections/portafolio/EnterpriseServicesSection";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";

const WHATSAPP_NUMBER = "573135707125";

const buildWhatsAppLink = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

// Ajusta este valor a la altura de tu navbar fijo (en px)
const NAVBAR_OFFSET = 120;

export const EnterpriseServicesPage = () => {
  const scrollToService = (id: string) => {
    const el = document.getElementById(id);

    if (!el) return;

    // Calculamos la posición del elemento y le restamos el alto del navbar
    const rect = el.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    const targetY = rect.top + scrollTop - NAVBAR_OFFSET;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });

    // Quitamos highlight previo por si acaso
    el.classList.remove("highlight-gold");

    // Aplicamos el dorado un poquito después para que coincida con el scroll
    setTimeout(() => {
      el.classList.add("highlight-gold");

      // Quitamos el dorado luego de 2 segundos
      setTimeout(() => {
        el.classList.remove("highlight-gold");
      }, 2000);
    }, 400);
  };

  return (
    <>
      {/* ================================== */}
      {/* ENCABEZADO PRINCIPAL DE LA PÁGINA */}
      {/* ================================== */}
      <section className="relative overflow-hidden bg-white pt-24 pb-10">
        <div className="mx-auto max-w-5xl px-6">
          <FadeInWhenVisible className="text-center">
            <h1 className="text-3xl sm:text-4xl font-semibold text-[#1f3258]">
              Línea E · Servicios complementarios
            </h1>

            <p className="mt-4 text-sm sm:text-base text-[#274472]">
              Estamos en la capacidad de ofrecerle algunos servicios adicionales que
              generan valor a su plan de trabajo con la ARL de su preferencia. Sin
              embargo, estos servicios son susceptibles de análisis, previa negociación
              con su empresa, según la prima anual y/o mensual que aporta a la ARL.
            </p>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ================================== */}
      {/* SECCIÓN DE PREGUNTAS / IDENTIFICACIÓN */}
      {/* ================================== */}
      <section className="py-20 bg-[#f7f9fc]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <FadeInWhenVisible>
            <h2 className="text-3xl font-semibold text-[#1f3258]">
              ¿Tu organización está pasando por alguna de estas situaciones?
            </h2>

            <p className="mt-4 text-[#274472] max-w-2xl mx-auto text-lg">
              Si alguna de estas realidades te suena familiar, la Línea E puede ayudar
              a ordenar procesos, mejorar el cumplimiento y cuidar mejor a tu equipo.
            </p>

            {/* 4 PREGUNTAS EN UNA FILA (GRID), SIN SCROLL LATERAL */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto max-w-5xl">
              {/* 1 */}
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
                  ¿Los documentos laborales están dispersos o incompletos?
                </p>
                <span className="mt-3 inline-block text-xs font-semibold text-[#b8860b]">
                  Ver cómo te ayudamos →
                </span>
              </button>

              {/* 2 */}
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
                  ¿Sientes presión por auditorías, visitas o requerimientos de la ARL?
                </p>
                <span className="mt-3 inline-block text-xs font-semibold text-[#b8860b]">
                  Ver cómo te ayudamos →
                </span>
              </button>

              {/* 3 */}
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
                  ¿La implementación del SG-SST avanza lento o depende de demasiadas personas?
                </p>
                <span className="mt-3 inline-block text-xs font-semibold text-[#b8860b]">
                  Ver cómo te ayudamos →
                </span>
              </button>

              {/* 4 */}
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
                  ¿Los equipos necesitan más formación práctica o apoyo en temas de salud mental?
                </p>
                <span className="mt-3 inline-block text-xs font-semibold text-[#b8860b]">
                  Ver cómo te ayudamos →
                </span>
              </button>
            </div>

            <a
              href="#servicios-complementarios"
              className="inline-block mt-10 bg-abp-blue text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-abp-blue/90 transition"
            >
              Ver todas las soluciones →
            </a>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ================================== */}
      {/* SERVICIOS COMPLEMENTARIOS (4 BLOQUES) */}
      {/* ================================== */}
      <section id="servicios-complementarios" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 space-y-20">
          {/* 1 — Reinversión */}
          <FadeInWhenVisible>
            <div
              id="servicio-reinversion"
              className="
                px-6 sm:px-10 py-8 sm:py-12 
                bg-[#f7f9fc] 
                rounded-2xl 
                shadow-sm 
                border-l-4 border-abp-blue
                transition duration-300
                hover:shadow-md
              "
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
                {/* TEXTO */}
                <div className="sm:max-w-xl text-left order-2 sm:order-1">
                  <h3 className="text-xl font-semibold text-[#1f3258] mb-2">
                    Reinversión
                  </h3>

                  <p className="text-sm text-[#274472] leading-relaxed">
                    Te acompañamos de forma continua para que el dinero que la ARL destina
                    a Seguridad y Salud en el Trabajo realmente se vea en tu empresa. 
                    Nos encargamos de gestionar solicitudes, hacer seguimiento a los retornos 
                    administrativos y ayudarte a decidir en qué acciones vale más la pena 
                    reinvertir para que no se pierdan oportunidades.
                  </p>

                  {/* BOTÓN WHATSAPP */}
                  <div className="mt-6">
                    <a
                      href={buildWhatsAppLink(
                        "Hola, necesito ayuda para aprovechar mejor los retornos y recursos de la ARL en mi empresa."
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        inline-flex items-center gap-2 
                        rounded-full border border-[#d4af37] 
                        px-4 py-2 text-xs font-semibold 
                        text-[#1f3258] hover:bg-[#d4af37] hover:text-white 
                        transition
                      "
                    >
                      Necesito ayuda con esto
                      <span aria-hidden>💬</span>
                    </a>
                  </div>
                </div>

                {/* ICON */}
                <div
                  className="
                    h-16 w-16 rounded-full bg-[#e1ecff] 
                    flex items-center justify-center 
                    order-1 sm:order-2 ml-auto
                  "
                >
                  <img
                    src="/icons/reinversion.png"
                    className="h-10 w-10 opacity-90"
                    alt="Reinversión"
                  />
                </div>
              </div>
            </div>
          </FadeInWhenVisible>

          {/* 2 — Asesoría jurídica */}
          <FadeInWhenVisible>
            <div
              id="servicio-asesoria-juridica"
              className="
                px-6 sm:px-10 py-8 sm:py-12 
                bg-[#f7f9fc] 
                rounded-2xl 
                shadow-sm 
                border-r-4 border-abp-blue
                transition duration-300
                hover:shadow-md
              "
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
                {/* ICON IZQUIERDA */}
                <div
                  className="
                    h-16 w-16 rounded-full bg-[#e1ecff] 
                    flex items-center justify-center order-1
                  "
                >
                  <img
                    src="/icons/juridica.png"
                    className="h-10 w-10 opacity-90"
                    alt="Asesoría jurídica"
                  />
                </div>

                {/* TEXTO */}
                <div className="sm:max-w-xl text-left order-2">
                  <h3 className="text-xl font-semibold text-[#1f3258] mb-2">
                    Asesoría jurídica
                  </h3>

                  <ul className="text-sm text-[#274472] space-y-2 leading-relaxed">
                    <li>
                      Te acompañamos paso a paso cuando ocurre un accidente o se presenta 
                      una posible enfermedad laboral, para que sepas qué hacer, cómo 
                      investigar y cómo reducir riesgos en el futuro, sin sentirte solo 
                      frente a los requerimientos.
                    </li>
                    <li>
                      Te explicamos en lenguaje sencillo cómo funciona la Seguridad Social 
                      (reforma pensional, regímenes de Prima Media y Ahorro Individual) y 
                      te ayudamos a gestionar pensiones de vejez, invalidez o sobrevivientes, 
                      para que tomes decisiones informadas.
                    </li>
                  </ul>

                  {/* BOTÓN WHATSAPP */}
                  <div className="mt-6">
                    <a
                      href={buildWhatsAppLink(
                        "Hola, necesito orientación jurídica en temas de ARL, Seguridad Social o pensiones."
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        inline-flex items-center gap-2 
                        rounded-full border border-[#d4af37] 
                        px-4 py-2 text-xs font-semibold 
                        text-[#1f3258] hover:bg-[#d4af37] hover:text-white 
                        transition
                      "
                    >
                      Necesito ayuda con esto
                      <span aria-hidden>💬</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>

          {/* 3 — Logística */}
          <FadeInWhenVisible>
            <div
              id="servicio-logistica"
              className="
                px-6 sm:px-10 py-8 sm:py-12 
                bg-[#f7f9fc] 
                rounded-2xl 
                shadow-sm 
                border-l-4 border-abp-blue
                transition duration-300
                hover:shadow-md
              "
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
                {/* TEXTO */}
                <div className="sm:max-w-xl text-left order-2 sm:order-1">
                  <h3 className="text-xl font-semibold text-[#1f3258] mb-2">
                    Logística
                  </h3>

                  <p className="text-sm text-[#274472] leading-relaxed">
                    Nos encargamos de la logística de tus actividades de bienestar y salud 
                    en el trabajo: refrigerios, souvenirs, espacios de capacitación e 
                    incentivos. La idea es que tú no tengas que estar pendiente de cada 
                    detalle y puedas enfocarte en tu equipo, mientras nosotros ayudamos a 
                    fortalecer el clima organizacional y la integración.
                  </p>

                  {/* BOTÓN WHATSAPP */}
                  <div className="mt-6">
                    <a
                      href={buildWhatsAppLink(
                        "Hola, necesito apoyo logístico para actividades de bienestar y salud en el trabajo."
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        inline-flex items-center gap-2 
                        rounded-full border border-[#d4af37] 
                        px-4 py-2 text-xs font-semibold 
                        text-[#1f3258] hover:bg-[#d4af37] hover:text-white 
                        transition
                      "
                    >
                      Necesito ayuda con esto
                      <span aria-hidden>💬</span>
                    </a>
                  </div>
                </div>

                {/* ICON DERECHA */}
                <div
                  className="
                    h-16 w-16 rounded-full bg-[#e1ecff] 
                    flex items-center justify-center order-1 sm:order-2 ml-auto
                  "
                >
                  <img
                    src="/icons/logistica.png"
                    className="h-10 w-10 opacity-90"
                    alt="Logística"
                  />
                </div>
              </div>
            </div>
          </FadeInWhenVisible>

          {/* 4 — Apoyo profesional */}
          <FadeInWhenVisible>
            <div
              id="servicio-apoyo-profesional"
              className="
                px-6 sm:px-10 py-8 sm:py-12 
                bg-[#f7f9fc] 
                rounded-2xl 
                shadow-sm 
                border-r-4 border-abp-blue
                transition duration-300
                hover:shadow-md
              "
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
                {/* ICON IZQUIERDA */}
                <div
                  className="
                    h-16 w-16 rounded-full bg-[#e1ecff] 
                    flex items-center justify-center order-1
                  "
                >
                  <img
                    src="/icons/profesional.png"
                    className="h-10 w-10 opacity-90"
                    alt="Apoyo profesional"
                  />
                </div>

                {/* TEXTO */}
                <div className="sm:max-w-xl text-left order-2">
                  <h3 className="text-xl font-semibold text-[#1f3258] mb-2">
                    Apoyo profesional
                  </h3>

                  <p className="text-sm text-[#274472] leading-relaxed">
                    Te apoyamos en la implementación de baterías de riesgo psicosocial y 
                    la coordinación de exámenes ocupacionales, para que el seguimiento a 
                    la salud de tu equipo no se quede solo en el papel. Nuestro objetivo 
                    es que cuentes con información clara, acciones concretas y un 
                    acompañamiento que haga más fácil cumplir la norma y cuidar a las 
                    personas.
                  </p>

                  {/* BOTÓN WHATSAPP */}
                  <div className="mt-6">
                    <a
                      href={buildWhatsAppLink(
                        "Hola, necesito apoyo profesional en temas de riesgo psicosocial y exámenes ocupacionales."
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        inline-flex items-center gap-2 
                        rounded-full border border-[#d4af37] 
                        px-4 py-2 text-xs font-semibold 
                        text-[#1f3258] hover:bg-[#d4af37] hover:text-white 
                        transition
                      "
                    >
                      Necesito ayuda con esto
                      <span aria-hidden>💬</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ================================== */}
      {/* SECCIÓN ORIGINAL QUE YA TENÍAS */}
      {/* ================================== */}
      <EnterpriseServicesSection />
    </>
  );
};
