import { Link } from "react-router-dom";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { SegurosGeneralesSection } from "@/sections/portafolio/SegurosGeneralesSection";
import generalesHeroImg from "@/assets/generales/generales1.webp";

const segurosGeneralesDefinidos = [
  "Responsabilidad civil general, contractual y extracontractual.",
  "Pólizas de cumplimiento exigidas en contratos con entidades públicas y privadas.",
  "Seguros de automóviles y flotas operativas.",
  "Seguros todo riesgo para instalaciones, equipos, armamento autorizado y bienes asegurables",
];

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
              Seguros generales
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
<section className="bg-[#0d1f33] py-16 text-white">
  <div className="mx-auto max-w-6xl px-6">
    <FadeInWhenVisible className="space-y-10 text-center">
      {/* TÍTULO */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">
  Líneas de seguros generales
</h2>

        <p className="mx-auto max-w-3xl text-sm text-white/80 sm:text-base">
          Coberturas diseñadas para proteger responsabilidad, contratos, activos y operación.
        </p>
      </div>

      {/* TARJETAS */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* RESPONSABILIDAD CIVIL */}
        <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:bg-white/10">
          <h3 className="text-base font-semibold text-white">
            Seguro de Responsabilidad Civil
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-white/80">
            Ampara daños a terceros derivados de responsabilidad civil general,
            contractual y extracontractual, protegiendo el patrimonio frente a reclamaciones.
          </p>
        </div>

        {/* CUMPLIMIENTO */}
        <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:bg-white/10">
          <h3 className="text-base font-semibold text-white">
            Pólizas de Cumplimiento
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-white/80">
            Garantizan el cumplimiento de obligaciones contractuales exigidas
            en contratos con entidades públicas y privadas.
          </p>
        </div>

        {/* AUTOMÓVILES */}
        <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:bg-white/10">
          <h3 className="text-base font-semibold text-white">
            Seguros de Automóviles y Flotas
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-white/80">
            Protección integral para vehículos particulares y flotas operativas,
            con amparos por daños, pérdida, responsabilidad civil y asistencia.
          </p>
        </div>

        {/* TODO RIESGO */}
        <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:bg-white/10">
          <h3 className="text-base font-semibold text-white">
            Seguro Todo Riesgo
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-white/80">
            Cubre instalaciones, equipos, armamento autorizado y demás bienes asegurables
            frente a pérdidas, daños y eventos imprevistos.
          </p>
        </div>
      </div>

     
      <div>
        <Link to="/contacto" className="btn-modern">
          Solicitar asesoría en seguros generales
        </Link>
      </div>
    </FadeInWhenVisible>
  </div>
      </section>
      <SegurosGeneralesSection />

      

    </>
  );
};
