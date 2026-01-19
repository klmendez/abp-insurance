import { Link } from "react-router-dom";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { SegurosVidaSection } from "@/sections/portafolio/SegurosVidaSection";
import vidaHeroImg from "@/assets/vida/persona-familia.jpg";

export const SegurosVidaPage = () => {
  return (
    <>
      <section className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20 text-white">
        <div className="absolute inset-0">
          <img
            src={vidaHeroImg}
            alt="Familia protegida"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-[#040915]/95 via-[#0b1a2f]/88 to-[#143357]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(217,164,58,0.3),transparent_65%),radial-gradient(circle_at_78%_82%,rgba(32,54,96,0.55),transparent_70%)]" />

        <div className="relative mx-auto max-w-6xl px-6">
          <FadeInWhenVisible className="space-y-6 text-center lg:max-w-3xl lg:text-left">
            <span className="inline-flex items-center justify-center rounded-full bg-white/10 px-4 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-white/85">
              Seguros de vida
            </span>

            <h1 className="text-3xl font-semibold text-white sm:text-4xl lg:text-[2.6rem]">
              Protección de vida a la medida de tus proyectos
            </h1>

            <p className="mx-auto max-w-3xl text-sm text-white sm:text-base lg:mx-0">
              Diseñamos portafolios de vida para personas, familias y empresas con coberturas flexibles, acompañamiento continuo y respaldo en momentos decisivos.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 lg:justify-start">
              <a href="#linea-seguros-vida" className="btn-modern">
                Ver programas disponibles
              </a>

              <Link to="/contacto" className="btn-modern btn-modern--light">
                Solicitar asesoría personalizada
              </Link>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      <SegurosVidaSection />

      <section className="bg-[#0b1a33] py-16 text-white">
        <div className="mx-auto max-w-5xl space-y-6 px-6 text-center">
          <FadeInWhenVisible className="space-y-4">
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">
              Planes de vida con enfoque humano
            </h2>
            <p className="mx-auto max-w-3xl text-sm text-white/80 sm:text-base">
              Te guiamos para combinar coberturas de protección, ahorro y beneficios empresariales según tus responsabilidades y objetivos de bienestar.
            </p>
            <Link to="/contacto" className="btn-modern">
              Conversar con un especialista en vida
            </Link>
          </FadeInWhenVisible>
        </div>
      </section>
    </>
  );
};
