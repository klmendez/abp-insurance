import { type FC } from "react";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { MainTeamSection } from "@/sections/about/MainTeamSection";
import { SupportTeamSection } from "@/sections/about/SupportTeamSection";
import { PartnersSection } from "@/sections/PartnersSection";

export const AboutPage: FC = () => {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#040b18] via-[#0b1f33] to-[#153b71] py-24 text-white sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.18),transparent_60%),radial-gradient(circle_at_80%_75%,rgba(228,188,103,0.18),transparent_65%)]" />

        <div className="relative mx-auto max-w-5xl px-6 text-center md:text-left">
          <FadeInWhenVisible className="space-y-5 md:max-w-3xl">
            <span className="inline-flex items-center justify-center rounded-full bg-white/10 px-4 py-1 text-[0.75rem] font-semibold uppercase tracking-[0.28em] text-white/80 ring-1 ring-white/20">
              Sobre nosotros
            </span>

            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.75rem]">
              Personas comprometidas con proteger lo que más valoras
            </h1>

            <p className="text-sm text-white/85 sm:text-base">
              ABP es una casa aseguradora que combina experiencia técnica y calidez humana.
              Nuestro equipo trabaja contigo para entender tus retos, estructurar soluciones
              confiables y acompañarte en cada momento clave.
            </p>
          </FadeInWhenVisible>
        </div>
      </section>
      <PartnersSection />
      <MainTeamSection />
      <SupportTeamSection />
    </>
  );
};
