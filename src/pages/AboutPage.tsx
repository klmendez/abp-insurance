import { type FC } from "react";
import { Link } from "react-router-dom";
import { FiPhoneCall, FiMapPin, FiMail } from "react-icons/fi";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { MainTeamSection } from "@/sections/about/MainTeamSection";
import { SupportTeamSection } from "@/sections/about/SupportTeamSection";
import { PartnersSection } from "@/sections/PartnersSection";
import footerBg from "../bg/Footer1.png";
import footerBgMobile from "../bg/FooterMobile.png";

export const AboutPage: FC = () => {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative flex min-h-screen flex-col overflow-hidden text-white sm:min-h-[100vh] sm:flex-row sm:items-end sm:justify-start">
        {/* FONDO MOBILE */}
        <div
          className="absolute inset-0 bg-cover bg-[position:center_85%] bg-no-repeat sm:hidden"
          style={{ backgroundImage: `url(${footerBgMobile})` }}
          aria-hidden="true"
        />

        {/* FONDO DESKTOP */}
        <div
          className="absolute inset-0 hidden bg-cover bg-[position:center_78%] bg-no-repeat sm:block"
          style={{ backgroundImage: `url(${footerBg})` }}
          aria-hidden="true"
        />

        <div className="relative w-full">
          <FadeInWhenVisible className="mx-auto flex h-full min-h-screen w-full flex-col justify-between px-5 py-12 text-center sm:min-h-0 sm:justify-end sm:gap-8 sm:px-6 sm:pb-20 sm:pt-0 sm:text-left">
            <div className="flex w-full flex-col justify-start sm:ml-12 md:ml-16 lg:ml-20 sm:max-w-5xl">
              <div className="mx-auto max-w-xl space-y-5 sm:mx-0 sm:space-y-6">
                <span className="inline-flex items-center justify-center rounded-full bg-black/20 px-10 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-abp-gold ring-1 ring-abp-gold/40">
                  Sobre nosotros
                </span>

                <h1 className="text-[2.4rem] font-semibold leading-tight text-white lg:text-[2.65rem]">
                  Diseñamos coberturas a la medida para personas y empresas
                </h1>

                <p className="text-base leading-relaxed text-abp-gold/100 sm:text-lg sm:leading-snug sm:text-white/85">
                  Experiencia técnica y calidez humana para acompañarte en cada decisión clave.
                </p>
              </div>

              {/* TELÉFONOS */}
              <div className="hidden sm:flex sm:flex-col sm:items-start sm:gap-1.5 sm:pt-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-abp-gold">
                  <FiPhoneCall className="text-base" />
                  Llama ya
                </div>
                <p className="text-sm sm:text-base text-white/85">
                  (+57) 320 865 4369
                  <br />
                  (+57) 300 568 7950
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-16 flex w-full justify-center sm:mt-0">
              <Link to="/contacto" className="btn-modern">
                Agenda una asesoría
              </Link>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ================= NUESTRAS OFICINAS ================= */}
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
            </div>
          </div>
        </FadeInWhenVisible>
      </section>

      {/* ================= OTRAS SECCIONES ================= */}
      <PartnersSection />
      <MainTeamSection />
      <SupportTeamSection />
    </>
  );
};
