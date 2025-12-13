import { type FC } from "react";
import { Link } from "react-router-dom";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { FiCompass, FiGlobe } from "react-icons/fi";

const ciclistasBullets = [
  "Seguro especial para bicicletas y ciclistas urbanos.",
  "Cobertura de vida y accidentes personales mientras te desplazas.",
  "Protección para la bicicleta frente a daños o hurto según el plan.",
  "Opciones pensadas para repartidores y mensajeros en apps.",
];

const recicladoresBullets = [
  "Seguro especial para recicladores y recuperadores de oficio.",
  "Cobertura ante accidentes durante las jornadas de recolección.",
  "Protección en caso de fallecimiento o incapacidad total y permanente.",
  "Acompañamiento en reclamaciones y orientación en caso de siniestro.",
];

const callouts = [
  "Análisis de riesgo y acompañamiento 360° en proyectos especiales.",
  "Procesos de reclamación ágiles con aliados especializados.",
  "Integración con beneficios complementarios para colaboradores.",
];

export const SegurosEspecialesSection: FC = () => {
  return (
    <section
      id="linea-seguros-especiales"
      className="relative overflow-hidden bg-gradient-to-br from-[#0b1020] via-[#111827] to-[#1f2937] py-16 text-white"
    >
      {/* Fondos luminosos suaves */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(37,99,235,0.25),transparent_65%)]" />

      <div className="relative mx-auto max-w-6xl flex flex-col gap-10 px-6">

        {/* HEADER */}
        <FadeInWhenVisible className="text-center">
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-slate-200/80">
            Línea C · Seguros Especiales
          </span>

          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl text-slate-50">
            Seguros Especiales
          </h2>

          <p className="mt-4 text-sm text-slate-200/85 sm:text-base">
            Actualmente contamos con <span className="font-semibold text-[#d4a43b]">dos seguros especiales</span>:
            uno para <span className="font-medium">ciclistas</span> y otro para{" "}
            <span className="font-medium">recicladores</span>.
          </p>
        </FadeInWhenVisible>

        {/* DOS COLUMNAS — CICLISTAS & RECICLADORES */}
        <FadeInWhenVisible className="grid gap-10 lg:grid-cols-2 lg:items-start">

          {/* ================= CICLISTAS ================ */}
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-500 bg-slate-900/40">
                <FiCompass className="h-5 w-5 text-white" />
              </span>

              <div>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-slate-300/80">
                  Seguro especial
                </p>
                <h3 className="text-lg font-semibold text-slate-50">Ciclistas</h3>
              </div>
            </div>

            <p className="mt-3 text-sm text-slate-200/80">
              Pensado para quienes usan la bicicleta como transporte o trabajo.
            </p>

            <ul className="mt-5 space-y-2 border-l border-slate-600/70 pl-4 text-sm text-slate-100">
              {ciclistasBullets.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#d4a43b]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* 🔥 BOTÓN DORADO — IGUAL AL HERO */}
            <Link to="/ciclistas" className="btn-modern mt-6 inline-flex">
              Ver seguro para ciclistas
            </Link>
          </div>

          {/* ================= RECICLADORES ================ */}
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-500 bg-slate-900/40">
                <FiGlobe className="h-5 w-5 text-white" />
              </span>

              <div>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-slate-300/80">
                  Seguro especial
                </p>
                <h3 className="text-lg font-semibold text-slate-50">Recicladores</h3>
              </div>
            </div>

            <p className="mt-3 text-sm text-slate-200/80">
              Diseñado para proteger la labor esencial de los recicladores.
            </p>

            <ul className="mt-5 space-y-2 border-l border-slate-600/70 pl-4 text-sm text-slate-100">
              {recicladoresBullets.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#d4a43b]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* 🔥 BOTÓN DORADO — IGUAL AL HERO */}
            <Link
              to="/portafolio/recicladores"
              className="btn-modern mt-6 inline-flex"
            >
              Ver seguro para recicladores
            </Link>
          </div>

        </FadeInWhenVisible>

        {/* VALOR AGREGADO */}
        <FadeInWhenVisible className="border-t border-slate-700/70 pt-6">
          <p className="text-center text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-slate-300/80">
            Valor agregado
          </p>

          <div className="mt-4 grid gap-4 text-sm text-slate-200/85 sm:grid-cols-3">
            {callouts.map((item) => (
              <div key={item} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#d4a43b]" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <p className="mt-4 text-center text-xs text-slate-300/75">
            Si perteneces a un colectivo de ciclistas o recicladores, podemos crear un programa especial para ustedes.
          </p>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};
