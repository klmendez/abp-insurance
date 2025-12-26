import desktopBackground from "../bg/13.png";
import mobileBackground from "../bg/mobile1.png";
import { FiPhoneCall } from "react-icons/fi";
import React, { useEffect, useState } from "react";

export const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <section id="inicio" className="relative overflow-hidden h-[100svh]">
      {/* BACKGROUND MOBILE */}
      <div
        className="absolute inset-0 sm:hidden bg-cover bg-no-repeat bg-[position:right_bottom] z-0"
        style={{ backgroundImage: `url(${mobileBackground})` }}
      />

      {/* BACKGROUND DESKTOP */}
      <div
        className="absolute inset-0 hidden sm:block bg-cover bg-no-repeat bg-[position:right_center] z-0"
        style={{ backgroundImage: `url(${desktopBackground})` }}
      />

      {/* OVERLAY AZUL (mobile más suave, desktop igual) */}
      <div className="absolute inset-0 z-10 hero-blue-overlay pointer-events-none opacity-40 sm:opacity-100" />

      {/* PUNTOS DORADOS */}
      <div className="absolute inset-0 z-10 hero-gold-dots pointer-events-none opacity-85 sm:opacity-100" />

      {/* CONTENIDO */}
      <div className="relative z-20 h-full">
        <div
          className="
            mx-auto w-full max-w-6xl
            px-4 sm:px-8 lg:px-12
            pt-28 sm:pt-32
            h-full
            relative
            pb-36 sm:pb-28
          "
        >
          {/* EYEBROW */}
          <div className="w-full flex justify-center mb-6">
            <span
              className="
                inline-flex items-center justify-center
                rounded-full bg-black/35 px-4 py-1
                text-[0.62rem] sm:text-[0.7rem]
                font-semibold uppercase tracking-[0.16em] sm:tracking-[0.2em]
                text-slate-100 ring-1 ring-white/20
                backdrop-blur-sm
              "
            >
              Tu tranquilidad, nuestra prioridad
            </span>
          </div>

          {/* TEXTO */}
          <div className="flex w-full flex-col gap-5 sm:gap-8 text-center sm:text-left max-w-[32rem] mx-auto sm:mx-0">
            <h1
              className="
                text-white font-semibold leading-tight text-balance
                text-[clamp(1.55rem,2.4vw,2.9rem)]
                sm:w-[120%]
                lg:w-[140%]
                max-w-none
              "
            >
              <span className="text-abp-gold font-semibold">
                Acompañamos
              </span>{" "}
              tus decisiones, aseguramos tu{" "}
              <span className="text-abp-gold font-semibold">
                Bienestar
              </span>{" "}
              y{" "}
              <span className="text-abp-gold font-semibold">
                Protegemos
              </span>{" "}
              tu futuro
            </h1>

            <p
              className="
                text-white/90 text-balance
                text-[clamp(0.9rem,1.15vw,1.125rem)]
              "
            >
              En ABP Agencia de Seguros diseñamos coberturas a la medida para proteger a las personas,
              las familias y las empresas.
            </p>

            {/* TELÉFONOS */}
            <div className="flex flex-col items-center sm:items-start gap-3 pt-1">
              <div className="flex items-center gap-2 font-semibold text-abp-gold text-[clamp(0.85rem,1vw,1rem)]">
                <FiPhoneCall className="text-lg sm:text-xl" />
                <span>Llama ya</span>
              </div>

              {/* CÁPSULA */}
              <div
                className="
                  w-full sm:w-auto
                  overflow-hidden
                  bg-white/10
                  ring-1 ring-white/20
                  backdrop-blur-sm
                  rounded-2xl sm:rounded-full
                "
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y divide-white/15 sm:divide-y-0 sm:divide-x sm:divide-white/15">
                  {["+573208654369", "+573005687950"].map((num) => (
                    <div key={num} className="flex items-stretch">
                      <a
                        href={`tel:${num}`}
                        className="
                          flex-1 px-4 py-2
                          inline-flex items-center justify-center
                          text-white/95 font-medium
                          text-[clamp(0.8rem,0.9vw,1rem)]
                          hover:bg-white/10 transition
                        "
                      >
                        ({num.replace("+57", "+57 ")})
                      </a>

                      <button
                        type="button"
                        onClick={() => navigator.clipboard?.writeText(num)}
                        className="
                          hidden sm:inline-flex
                          w-8 h-8
                          items-center justify-center
                          text-[0.6rem] font-semibold
                          text-white/80 hover:text-white
                          hover:bg-white/10 transition
                        "
                        aria-label="Copiar número"
                      >
                        Copiar
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-white/70 text-[clamp(0.7rem,0.8vw,0.875rem)]">
                {isMobile
                  ? "Toca el número para llamar directamente."
                  : "Haz clic en el botón para copiar el número."}
              </p>
            </div>
          </div>

          {/* CTA ABAJO */}
          <div
            className="
              absolute left-1/2 -translate-x-1/2
              bottom-0
              w-full px-4 pb-6 sm:pb-10
              flex justify-center z-30
            "
          >
            <div className="flex w-full max-w-xl flex-col items-center gap-2 sm:flex-row sm:gap-3">
              <a
                href="https://api.whatsapp.com/send?phone=573208654369&text=Hola%20quiero%20una%20asesor%C3%ADa%20gratuita"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  btn-modern w-full sm:w-auto
                  text-[clamp(0.65rem,0.75vw,0.75rem)]
                  tracking-tight px-5 py-2.5
                  !bg-abp-gold !text-[#030712]
                "
              >
                Agenda una asesoría gratuita
              </a>

              <a
                href="#portafolio"
                className="
                  btn-modern w-full sm:w-auto
                  text-[clamp(0.65rem,0.75vw,0.75rem)]
                  tracking-tight px-5 py-2.5
                  !bg-abp-gold !text-[#030712]
                "
              >
                Conoce nuestros servicios
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
