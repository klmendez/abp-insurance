import { type FC } from "react";
import { Link } from "react-router-dom";
import { FiPhoneCall, FiMapPin, FiMail } from "react-icons/fi";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { MainTeamSection } from "@/sections/about/MainTeamSection";
import { SupportTeamSection } from "@/sections/about/SupportTeamSection";
import { PartnersSection } from "@/sections/PartnersSection";

import allImg from "../bg/all.png";

export const AboutPage: FC = () => {
  const phones = ["+573208654369", "+573005687950", "+573185170013"];

  return (
    <>
      <section className="relative overflow-hidden min-h-[100svh] text-white">
        <div
          className="absolute inset-0 z-0"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(135deg, #0f3f6a 0%, #144e7c 36%, #1a5c8b 58%, #eadfbe 100%)",
          }}
        />

        <div className="absolute inset-0 z-10 hero-blue-overlay pointer-events-none opacity-40 sm:opacity-70" />
        <div className="absolute inset-0 z-10 hero-gold-dots pointer-events-none opacity-45 sm:opacity-65" />

        <div
          className="absolute inset-0 z-10 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(700px 460px at 88% 78%, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0.08) 38%, rgba(212,175,55,0) 72%)",
          }}
        />

        <div className="relative z-20 min-h-[100svh]">
          <div
            className="
              relative
              mx-auto w-full max-w-7xl
              px-10 sm:px-6
pt-[96px] sm:pt-32
              min-h-[100svh]
              flex items-start sm:items-center
            "
          >
            <div className="relative z-20 w-full max-w-xl mx-auto sm:mx-0">
              <FadeInWhenVisible className="text-center sm:text-left">
                <div className="space-y-5 sm:space-y-6">
                  <span
                    aria-hidden="true"
                    className="inline-flex items-center justify-center rounded-full bg-black/25 px-10 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-abp-gold ring-1 ring-abp-gold/40 backdrop-blur-sm"
                  >
                    Sobre nosotros
                  </span>

                  <h1 className="mx-auto sm:mx-0 max-w-[24rem] text-white font-semibold leading-tight text-balance text-[clamp(1.25rem,2vw,2.1rem)] text-center sm:text-left">
                    Diseñamos coberturas a la medida para personas y empresas
                  </h1>

                  <p className="mx-auto sm:mx-0 max-w-[34rem] text-white/85 text-[clamp(0.9rem,1vw,1.05rem)] leading-relaxed text-center sm:text-left">
                    Experiencia técnica y calidez humana para acompañarte en cada decisión clave.
                  </p>
                </div>

                <div className="mt-2 flex flex-col items-center sm:items-start gap-3">
                  <div className="flex items-center gap-2 font-semibold text-abp-gold text-[clamp(0.85rem,1vw,1rem)]">
                    <FiPhoneCall className="text-lg sm:text-xl" />
                    <span>Llama ya</span>
                  </div>

                  <div
                    className="
                      w-full sm:w-auto
                      overflow-hidden
                      bg-white/10
                      ring-1 ring-white/20
                      backdrop-blur-sm
                      rounded-2xl
                    "
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-1 divide-y divide-white/15">
                      {phones.map((num) => (
                        <div key={num} className="flex items-stretch">
                          <a
                            href={`tel:${num}`}
                            className="
                              flex-1 px-4 py-2
                              inline-flex items-center justify-center sm:justify-start
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
                              w-10
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
                </div>

                <div className="mt-10 flex justify-center sm:justify-start">
                  <Link
                    to="/contacto"
                    className="btn-modern inline-flex !bg-abp-gold !text-[#1f2a44]"
                  >
                    Agenda una asesoría
                  </Link>
                </div>
              </FadeInWhenVisible>
            </div>

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
                  w-[80%]
                  max-w-none

                  max-h-[50svh]

                  sm:w-auto
                  sm:max-h-[78vh]
                  sm:translate-y-[16px]

                  lg:max-h-[95vh]
                  lg:translate-y-[40px]

                  xl:max-h-[85vh]
                  xl:translate-y-[48px]
                "
              />
            </div>
          </div>
        </div>
      </section>

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
              Contamos con oficinas físicas para brindarte atención cercana y personalizada.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
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
                Teléfono: <span className="font-medium">318 517 0013</span>
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

      <PartnersSection />
      <MainTeamSection />
      <SupportTeamSection />
    </>
  );
};
