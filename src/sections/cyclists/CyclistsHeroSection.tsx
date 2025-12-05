import { Link } from "react-router-dom";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { FiArrowRight } from "react-icons/fi";
import ciclistaHero from "@/assets/especiales/ciclista1.jpg";

export const CyclistsHeroSection = () => {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden py-24 text-white"
      style={{
        backgroundImage: `url(${ciclistaHero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#020b16] via-[#08263d] to-[#1d4768] opacity-90" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_60%)]" />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
        <FadeInWhenVisible className="space-y-7 text-center lg:text-left">
          <span className="inline-flex items-center justify-center rounded-full bg-white/10 px-4 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-white/85 ring-1 ring-white/20">
            Protección integral para ciclistas y recicladores
          </span>

          <div className="space-y-5">
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-[3rem]">
              Tu bici, tu ruta y tu bienestar con un solo plan ABP.
            </h1>
            <p className="mx-auto max-w-xl text-base text-white/85 lg:mx-0">
              Conecta coberturas de vida, accidentes y bicicleta en un portafolio flexible.
              Calcula un valor referencial y agenda una asesoría para ajustar el plan según tu
              estilo de movilidad.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <a
              href="#calculadora"
              className="inline-flex items-center gap-2 rounded-full bg-[#facc6b] px-6 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[#0b1625] shadow-lg transition hover:bg-[#ffd88b]"
            >
              Calcular mi prima
              <FiArrowRight className="size-4" />
            </a>
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 rounded-full border border-[#facc6b]/70 bg-[#facc6b]/10 px-6 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-white transition hover:bg-[#facc6b]/25"
            >
              Hablar con un asesor
            </Link>
          </div>

          <ul className="mx-auto grid max-w-xl gap-3 text-left text-sm text-white/80 lg:mx-0">
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-block size-2 rounded-full bg-[#facc6b]" />
              Valores modularles según tu uso: bici urbana, entrenamientos o envíos en ciudad.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-block size-2 rounded-full bg-[#facc6b]" />
              Coberturas combinables con asistencias, responsabilidad civil y viajes.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-block size-2 rounded-full bg-[#facc6b]" />
              Acompañamiento ABP desde la cotización, gestión de siniestros y renovación.
            </li>
          </ul>
        </FadeInWhenVisible>

        <div className="hidden lg:block" />
      </div>
    </section>
  );
};
