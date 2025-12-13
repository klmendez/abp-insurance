import { Link } from "react-router-dom";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { SegurosGeneralesSection } from "@/sections/portafolio/SegurosGeneralesSection";
import generalesHeroImg from "@/assets/generales/generales1.webp";

export const SegurosGeneralesPage = () => {
  return (
    <>
      <section className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20 text-white">
        <div className="absolute inset-0">
          <img
            src={generalesHeroImg}
            alt="Protección para empresas y patrimonio"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-[#030711]/95 via-[#0c1c33]/88 to-[#152f4b]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,rgba(229,185,85,0.28),transparent_65%),radial-gradient(circle_at_78%_82%,rgba(15,31,51,0.55),transparent_70%)]" />

        <div className="relative mx-auto max-w-6xl px-6">
          <FadeInWhenVisible className="space-y-6 text-center lg:max-w-3xl lg:text-left">
            <span className="inline-flex items-center justify-center rounded-full bg-white/10 px-4 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-white/85">
              Línea D · Seguros generales
            </span>

            <h1 className="text-3xl font-semibold text-white sm:text-4xl lg:text-[2.6rem]">
              Protección patrimonial para empresas y personas
            </h1>

            <p className="mx-auto max-w-3xl text-sm text-white sm:text-base lg:mx-0">
              Diseñamos programas de seguros generales que combinan protección de activos, continuidad operativa y tranquilidad financiera para cada etapa de tus proyectos.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 lg:justify-start">
              <a href="#linea-seguros-generales" className="btn-modern">
                Explorar coberturas
              </a>

              <Link to="/contacto" className="btn-modern btn-modern--light">
                Solicitar diagnóstico gratuito
              </Link>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      <SegurosGeneralesSection />

      <section className="bg-[#0d1f33] py-16 text-white">
        <div className="mx-auto max-w-5xl space-y-6 px-6 text-center">
          <FadeInWhenVisible className="space-y-4">
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">
              Programas ajustados a cada riesgo
            </h2>
            <p className="mx-auto max-w-3xl text-sm text-white/80 sm:text-base">
              Analizamos tu operación, priorizamos riesgos críticos y construimos un portafolio integral que combina pólizas empresariales, personales y sectoriales.
            </p>
            <Link to="/contacto" className="btn-modern">
              Construir mi programa con ABP
            </Link>
          </FadeInWhenVisible>
        </div>
      </section>
    </>
  );
};
