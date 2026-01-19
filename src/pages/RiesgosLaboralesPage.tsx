import { Link } from "react-router-dom";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { SegurosRiesgosLaboralesSection } from "@/sections/portafolio/SegurosRiesgosLaboralesSection";
import riesgosHeroImg from "@/assets/laborales/trabajadores2.jpg";

export const RiesgosLaboralesPage = () => {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20 text-white">
        <div className="absolute inset-0">
          <img
            src={riesgosHeroImg}
            alt="Personas trabajando con elementos de seguridad industrial"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-[#02060f]/95 via-[#09203b]/88 to-[#123554]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(245,192,104,0.28),transparent_65%),radial-gradient(circle_at_78%_82%,rgba(14,34,52,0.55),transparent_70%)]" />

        <div className="relative mx-auto max-w-6xl px-6">
          <FadeInWhenVisible className="space-y-6 text-center lg:max-w-3xl lg:text-left">
            <span className="inline-flex items-center justify-center rounded-full bg-white/10 px-4 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-white/85">
             Riesgos laborales
            </span>

            <h1 className="text-3xl font-semibold text-white sm:text-4xl lg:text-[2.6rem]">
              Acompañamiento integral en riesgos laborales
            </h1>

            <p className="mx-auto max-w-3xl text-sm text-white sm:text-base lg:mx-0">
              Gestionamos afiliaciones, casos y prevención con la ARL para que tu
              equipo esté protegido y tus procesos cumplan la norma con agilidad
              y claridad.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 lg:justify-start">
              <a href="#linea-riesgos-laborales" className="btn-modern">
                Ver coberturas y servicios
              </a>

              <Link to="/contacto" className="btn-modern btn-modern--light">
                Hablar con un asesor
              </Link>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ================= SECCIÓN INTERMEDIARIO ================= */}
      <section className="bg-slate-100 py-16 text-slate-900 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <FadeInWhenVisible className="mx-auto max-w-3xl space-y-4 text-center">
            <span className="inline-flex items-center justify-center rounded-full bg-slate-200 px-4 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-slate-700">
              Valor agregado
            </span>

            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
              ¿Por qué contar con un intermediario en riesgos laborales?
            </h2>

            <p className="text-sm text-slate-700 sm:text-base">
              Descubra cómo un intermediario especializado te brinda seguridad y
              eficiencia, sin costo adicional. Una decisión inteligente para el
              futuro de su negocio.
            </p>
          </FadeInWhenVisible>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {/* Base constitucional */}
            <FadeInWhenVisible
              className="
                group relative overflow-hidden
                rounded-[1.6rem]
                border border-slate-200/70
                bg-gradient-to-b from-white/90 via-white/80 to-white/70
                p-7
                shadow-sm
                transition
                hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/10
              "
            >
              <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-abp-gold/70 to-transparent" />
              <h3 className="text-base font-semibold text-slate-900">
                Base constitucional
              </h3>
              <p className="mt-2 text-sm text-slate-700 leading-relaxed">
                La <span className="font-semibold">Libertad de Empresa</span>{" "}
                (Artículo 333) nos faculta para ofrecer servicios especializados
                y de alto valor en el sector asegurador.
              </p>
            </FadeInWhenVisible>

            {/* Complejidad del SGRL */}
            <FadeInWhenVisible
              className="
                group relative overflow-hidden
                rounded-[1.6rem]
                border border-slate-200/70
                bg-gradient-to-b from-white/90 via-white/80 to-white/70
                p-7
                shadow-sm
                transition
                hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/10
              "
            >
              <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-abp-gold/70 to-transparent" />
              <h3 className="text-base font-semibold text-slate-900">
                Complejidad del SGRL
              </h3>
              <p className="mt-2 text-sm text-slate-700 leading-relaxed">
                El{" "}
                <span className="italic">
                  Sistema General de Riesgos Laborales (SGRL)
                </span>{" "}
                es un entramado legal que requiere conocimiento profundo para su
                correcta aplicación.
              </p>
            </FadeInWhenVisible>

            {/* Regulación rigurosa */}
            <FadeInWhenVisible
              className="
                group relative overflow-hidden
                rounded-[1.6rem]
                border border-slate-200/70
                bg-gradient-to-b from-white/90 via-white/80 to-white/70
                p-7
                shadow-sm
                transition
                hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/10
              "
            >
              <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-abp-gold/70 to-transparent" />
              <h3 className="text-base font-semibold text-slate-900">
                Regulación rigurosa
              </h3>
              <p className="mt-2 text-sm text-slate-700 leading-relaxed">
                Cumplimos con el{" "}
                <span className="font-semibold">Decreto 1072 de 2015</span>,
                acreditando idoneidad, infraestructura y registro en el{" "}
                <span className="italic">RUI</span>.
              </p>
            </FadeInWhenVisible>

            {/* Asesoría indispensable */}
            <FadeInWhenVisible
              className="
                group relative overflow-hidden
                rounded-[1.6rem]
                border border-slate-200/70
                bg-gradient-to-b from-white/90 via-white/80 to-white/70
                p-7
                shadow-sm
                transition
                hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/10
              "
            >
              <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-abp-gold/70 to-transparent" />
              <h3 className="text-base font-semibold text-slate-900">
                Asesoría indispensable
              </h3>
              <p className="mt-2 text-sm text-slate-700 leading-relaxed">
                Simplificamos la gestión, aseguramos el cumplimiento y
                protegemos el patrimonio de su empresa.
              </p>
            </FadeInWhenVisible>
          </div>

          <FadeInWhenVisible className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/contacto" className="btn-modern">
              Solicitar acompañamiento
            </Link>
            <a
              href="#linea-riesgos-laborales"
              className="btn-modern btn-modern--dark"
            >
              Ver servicios
            </a>
          </FadeInWhenVisible>
        </div>
      </section>

      <SegurosRiesgosLaboralesSection />

      {/* ================= CTA FINAL ================= */}
      <section className="bg-[#040a16] py-16 text-white">
        <div className="mx-auto max-w-5xl space-y-6 px-6 text-center">
          <FadeInWhenVisible className="space-y-4">
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">
              ¿Listo para revisar tu programa de riesgos laborales?
            </h2>
            <p className="mx-auto max-w-3xl text-sm text-white sm:text-base">
              Creamos rutas personalizadas de mejora para empresas,
              independientes y contratistas. Agenda una conversación y
              construyamos tu plan de acción.
            </p>
            <Link to="/contacto" className="btn-modern">
              Coordinar una asesoría experta
            </Link>
          </FadeInWhenVisible>
        </div>
      </section>
    </>
  );
};
