import { type FC } from "react";
import { Link } from "react-router-dom";
import { FiPhoneCall, FiMapPin, FiMail } from "react-icons/fi";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { MainTeamSection } from "@/sections/about/MainTeamSection";
import { SupportTeamSection } from "@/sections/about/SupportTeamSection";
import { PartnersSection } from "@/sections/PartnersSection";

import allImg from "../bg/all.png";

export const AboutPage: FC = () => {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden min-h-[100svh] text-white">
        {/* BACKGROUND */}
        <div
          className="absolute inset-0 z-0"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(135deg, #0f3f6a 0%, #144e7c 36%, #1a5c8b 58%, #eadfbe 100%)",
          }}
        />

        {/* OVERLAYS */}
        <div className="absolute inset-0 z-10 hero-blue-overlay pointer-events-none opacity-40 sm:opacity-70" />
        <div className="absolute inset-0 z-10 hero-gold-dots pointer-events-none opacity-45 sm:opacity-65" />

        {/* GLOW */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(700px 460px at 88% 78%, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0.08) 38%, rgba(212,175,55,0) 72%)",
          }}
        />

        {/* CONTENT */}
        <div className="relative z-20 min-h-[100svh]">
          <div
            className="
              relative
              mx-auto w-full max-w-7xl
              px-5 sm:px-6
              pt-24 sm:pt-32
              min-h-[100svh]
            "
          >
            {/* TEXT */}
            <div className="relative z-20 max-w-xl mx-auto sm:mx-0">
              <FadeInWhenVisible className="text-center sm:text-left">
                <div className="space-y-5 sm:space-y-6">
                  <span
                    aria-hidden="true"
                    className="inline-flex items-center justify-center rounded-full bg-black/25 px-10 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-abp-gold ring-1 ring-abp-gold/40 backdrop-blur-sm"
                  >
                    Sobre nosotros
                  </span>

                  <h1 className="text-white font-semibold leading-tight text-balance text-[clamp(2rem,3.1vw,3.35rem)]">
                    Diseñamos coberturas a la medida para personas y empresas
                  </h1>

                  <p className="text-white/85 text-[clamp(0.95rem,1.1vw,1.125rem)] leading-relaxed">
                    Experiencia técnica y calidez humana para acompañarte en cada
                    decisión clave.
                  </p>
                </div>

                {/* PHONES – NUEVO DISEÑO */}
                <div className="mt-8 flex flex-col items-center sm:items-start gap-3">
                  <div className="flex items-center gap-2 font-semibold text-abp-gold text-[clamp(0.9rem,1vw,1rem)]">
                    <FiPhoneCall className="text-lg sm:text-xl" />
                    <span>Llama ya</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <a
                      href="tel:+573208654369"
                      className="
                        inline-flex items-center justify-center sm:justify-start gap-3
                        rounded-full bg-white/10 px-5 py-2
                        text-sm sm:text-base font-medium text-white
                        ring-1 ring-white/20
                        hover:bg-white/20 hover:text-abp-gold
                        transition
                      "
                    >
                      <FiPhoneCall className="text-abp-gold" />
                      <span>(+57) 320 865 4369</span>
                    </a>

                    <a
                      href="tel:+573005687950"
                      className="
                        inline-flex items-center justify-center sm:justify-start gap-3
                        rounded-full bg-white/10 px-5 py-2
                        text-sm sm:text-base font-medium text-white
                        ring-1 ring-white/20
                        hover:bg-white/20 hover:text-abp-gold
                        transition
                      "
                    >
                      <FiPhoneCall className="text-abp-gold" />
                      <span>(+57) 300 568 7950</span>
                    </a>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-10 flex justify-center sm:justify-start">
                  <Link to="/contacto" className="btn-modern">
                    Agenda una asesoría
                  </Link>
                </div>
              </FadeInWhenVisible>
            </div>

            {/* IMAGE */}
            <div
              className="
                absolute bottom-0 left-0 right-0
                flex justify-center sm:justify-end
                pointer-events-none
              "
            >
              <img
                src={allImg}
                alt="Equipo ABP"
                loading="eager"
                decoding="async"
                draggable={false}
                className="
                  select-none object-contain
                  w-[95%]
                  max-w-none

                  /* Mobile */
                  max-h-[48svh]

                  /* Tablet */
                  sm:w-auto
                  sm:max-h-[75vh]
                  sm:translate-y-[16px]

                  /* Desktop */
                  lg:max-h-[90vh]
                  lg:translate-y-[40px]

                  /* Large screens */
                  xl:max-h-[80vh]
                  xl:translate-y-[48px]
                "
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= OFFICES ================= */}
      <section className="bg-slate-100 py-16 sm:py-20">
        <FadeInWhenVisible className="mx-auto max-w-6xl px-6">
          <div className="mb-10 max-w-2xl">
            <span className="block mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-abp-gold">
              Nuestras oficinas
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-800">
              Presencia en Colombia
            </h2>
            <p className="mt-3 text-slate-600">
              Contamos con oficinas físicas para brindarte atención cercana y
              personalizada.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {/* Bogotá */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-slate-800">
                <FiMapPin className="text-abp-gold" />
                Bogotá D.C.
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Carrera 7 No. 156-10
                <br />
                Torre Krystal, Oficina 2003
              </p>
              <p className="mt-3 text-slate-600">
                Teléfono:{" "}
                <span className="font-medium">318 517 0013</span>
              </p>
              <p className="mt-1 flex items-center gap-2 text-slate-600">
                <FiMail className="text-abp-gold" />
                <a
                  href="mailto:mariacas07@yahoo.com"
                  className="hover:text-abp-gold transition"
                >
                  mariacas07@yahoo.com
                </a>
              </p>
            </div>

            {/* Popayán */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-slate-800">
                <FiMapPin className="text-abp-gold" />
                Popayán
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Cra. 8 No. 3-57
                <br />
                Oficina 103, Edificio Albarracín
              </p>
              <p className="mt-3 text-slate-500 italic text-sm">
                Atención con cita previa
              </p>
            </div>
          </div>
        </FadeInWhenVisible>
      </section>

      {/* ================= OTHER SECTIONS ================= */}
      <PartnersSection />
      <MainTeamSection />
      <SupportTeamSection />
    </>
  );
};
