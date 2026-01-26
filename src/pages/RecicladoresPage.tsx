import { Link } from "react-router-dom";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import recicladoresHeroImg from "@/assets/especiales/Recicladores.webp";

const recicladoresBullets = [
  "Seguro especial para recicladores y recuperadores de oficio.",
  "Cobertura ante accidentes durante las jornadas de recolección.",
  "Protección en caso de fallecimiento o incapacidad total y permanente.",
  "Acompañamiento en reclamaciones y orientación en caso de siniestro.",
];

const steps = [
  {
    title: "Afiliación y caracterización",
    description:
      "Apoyamos a asociaciones y organizaciones de recicladores para formalizar afiliaciones y conocer los riesgos específicos de su labor diaria.",
  },
  {
    title: "Coberturas clave",
    description:
      "Construimos pólizas que integran seguros de accidentes personales, vida y asistencia, ajustadas a jornadas nocturnas, rutas y herramientas de trabajo.",
  },
  {
    title: "Acompañamiento en siniestros",
    description:
      "Guiamos el reporte, seguimiento y documentación de cada caso para garantizar indemnizaciones oportunas y acompañamiento humano.",
  },
];

const faqs = [
  {
    question: "¿Podemos asegurar a toda la asociación?",
    answer:
      "Sí. Creamos planes colectivos que permiten incluir a recicladores formales e informales, con beneficios adicionales para líderes y coordinadores.",
  },
  {
    question: "¿Qué pasa si el accidente ocurre fuera de la ruta habitual?",
    answer:
      "Nuestras pólizas especiales contemplan desplazamientos en diferentes horarios y trayectos, siempre que estén relacionados con la labor de reciclaje.",
  },
  {
    question: "¿Incluye asistencia para elementos de protección personal?",
    answer:
      "Podemos integrar auxilios para dotación, capacitaciones y jornadas de bienestar gracias a alianzas con ARL y aseguradoras aliadas.",
  },
];

export const RecicladoresPage = () => {
  return (
    <>
      <section className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20 text-white">
        <div className="absolute inset-0">
          <img
            src={recicladoresHeroImg}
            alt="Recicladores trabajando en la ciudad"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-[#02060f]/95 via-[#071222]/88 to-[#0f2538]/82" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(245,192,104,0.28),transparent_65%),radial-gradient(circle_at_78%_82%,rgba(20,34,53,0.55),transparent_70%)]" />

        <div className="relative mx-auto max-w-6xl px-6">
          <FadeInWhenVisible className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center">
            <div className="space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center justify-center rounded-full bg-white/10 px-4 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-white/85">
                Seguros especiales
              </span>

              <h1 className="text-3xl font-semibold text-white sm:text-4xl lg:text-[2.6rem]">
                Seguro integral para recicladores
              </h1>

              <p className="mx-auto max-w-3xl text-sm text-white sm:text-base lg:mx-0">
                Diseñamos un portafolio que protege a recuperadores y organizaciones de reciclaje en cada etapa: ruta, transporte de material y bienestar del equipo.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2 lg:justify-start">
                <a href="#detalle-recicladores" className="btn-modern">
                  Ver coberturas
                </a>

                <Link to="/contacto" className="btn-modern btn-modern--light">
                  Solicitar asesoría para mi asociación
                </Link>
              </div>
            </div>

            <div className="hidden justify-end lg:flex">
              <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-4 shadow-[0_18px_45px_-25px_rgba(0,0,0,0.8)] backdrop-blur-sm">
                <div className="rounded-2xl bg-black/25 p-6 text-left">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[#f5c068]">
                    Protección 360°
                  </p>
                  <p className="mt-3 text-sm text-white">
                    Coberturas para accidentes personales, vida, transporte de materiales y asistencia jurídica en un solo programa.
                  </p>
                  <p className="mt-4 text-xs text-white">
                    Aliados aseguradores expertos + acompañamiento ABP en cada siniestro.
                  </p>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      <section id="detalle-recicladores" className="relative overflow-hidden bg-[#0b1020] py-16 text-white">
        <div className="pointer-events-none absolute inset-0 opacity-50 mix-blend-soft-light">
          <div className="h-full w-full bg-[radial-gradient(circle_at_10%_12%,rgba(255,255,255,0.08),transparent_60%),radial-gradient(circle_at_82%_88%,rgba(75,134,255,0.2),transparent_65%)]" />
        </div>

        <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6">
          <FadeInWhenVisible className="space-y-4">
            <h2 className="text-center text-2xl font-semibold text-white sm:text-3xl">
              Coberturas diseñadas para la labor de reciclaje
            </h2>
            <p className="mx-auto max-w-3xl text-center text-sm text-white sm:text-base">
              Integramos seguros de accidentes, vida y asistencia para brindar respaldo financiero y humano cuando ocurre un incidente durante la recolección o el transporte de material.
            </p>
          </FadeInWhenVisible>

          <FadeInWhenVisible className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-6 shadow-lg shadow-black/40">
              <h3 className="text-lg font-semibold text-white">Beneficios principales</h3>
              <ul className="mt-4 space-y-3 text-sm text-white">
                {recicladoresBullets.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 block h-2 w-2 flex-shrink-0 rounded-full bg-[#d4a43b]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/10 p-6 shadow-lg shadow-black/40">
              <h3 className="text-lg font-semibold text-white">Cómo te acompañamos</h3>
              <ul className="mt-4 space-y-3 text-sm text-white">
                {steps.map((step) => (
                  <li key={step.title} className="space-y-1">
                    <p className="font-semibold text-white">{step.title}</p>
                    <p className="text-white">{step.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      <section className="bg-white py-16 text-[#0b1020]">
        <div className="mx-auto max-w-5xl space-y-6 px-6 text-center">
          <FadeInWhenVisible className="space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0b1020]/60">
              Preguntas frecuentes
            </span>
            <h2 className="text-2xl font-semibold sm:text-3xl">
              Todo lo que necesitas saber antes de afiliarte
            </h2>
          </FadeInWhenVisible>

          <FadeInWhenVisible className="grid gap-6 text-left md:grid-cols-3">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-[#0b1020]/10 bg-[#f6f7fb] p-5 shadow-sm">
                <h3 className="text-base font-semibold text-[#0b1020]">
                  {faq.question}
                </h3>
                <p className="mt-3 text-sm text-[#22304d]">{faq.answer}</p>
              </div>
            ))}
          </FadeInWhenVisible>

          <FadeInWhenVisible className="space-y-4 pt-4">
            <p className="text-sm text-[#22304d] sm:text-base">
              Nuestro equipo está listo para estructurar coberturas colectivas, individuales o mixtas para tu organización de recicladores.
            </p>
            <Link to="/contacto" className="btn-modern">
              Coordinar una llamada con ABP
            </Link>
          </FadeInWhenVisible>
        </div>
      </section>
    </>
  );
};
