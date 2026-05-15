import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { SegurosGeneralesSection } from "@/sections/portafolio/SegurosGeneralesSection";

import generalesHeroImg from "@/assets/generales/generales1.webp";

const whatsappNumber = "573205754640";

const crearLinkWhatsApp = (producto: string) => {
  const mensaje = `Hola, quiero solicitar asesoría sobre ${producto}.`;

  return `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(
    mensaje
  )}`;
};

const segurosGeneralesDefinidos = [
  {
    titulo: "Seguro de Responsabilidad Civil",
    descripcion:
      "Ampara daños a terceros derivados de responsabilidad civil general, contractual y extracontractual, protegiendo el patrimonio frente a reclamaciones.",
  },
  {
    titulo: "Pólizas de Cumplimiento",
    descripcion:
      "Garantizan el cumplimiento de obligaciones contractuales exigidas en contratos con entidades públicas y privadas.",
  },
  {
    titulo: "Seguros de Automóviles y Flotas",
    descripcion:
      "Protección integral para vehículos particulares y flotas operativas, con amparos por daños, pérdida, responsabilidad civil y asistencia.",
  },
  {
    titulo: "Seguro Todo Riesgo",
    descripcion:
      "Cubre instalaciones, equipos, armamento autorizado y demás bienes asegurables frente a pérdidas, daños y eventos imprevistos.",
  },
  {
    titulo: "Seguro de Manejo",
    descripcion:
      "Protege a las empresas frente a pérdidas ocasionadas por actos deshonestos, fraudes o apropiación indebida por parte de empleados.",
  },
  {
    titulo: "Seguro Multiriesgo",
    descripcion:
      "Solución integral para proteger negocios, instalaciones y activos frente a múltiples riesgos en una sola póliza.",
  },
  {
    titulo: "Accidentes Personales",
    descripcion:
      "Cobertura económica frente a accidentes que puedan generar incapacidad, lesiones o fallecimiento.",
  },
  {
    titulo: "Productos de Salud",
    descripcion:
      "Soluciones complementarias en salud para personas, familias y empresas con acceso a atención y asistencia médica.",
  },
  {
    titulo: "Seguro de Desempleo",
    descripcion:
      "Protección financiera temporal para respaldar obligaciones económicas en caso de pérdida involuntaria del empleo.",
  },
  {
    titulo: "Grupo Vida",
    descripcion:
      "Programas empresariales de protección para colaboradores, asociaciones y grupos organizados.",
  },
  {
    titulo: "Vida Individual",
    descripcion:
      "Seguros diseñados para proteger el bienestar financiero de las personas y sus familias ante diferentes riesgos.",
  },
  {
    titulo: "Líneas Comerciales",
    descripcion:
      "Coberturas empresariales especializadas para operaciones comerciales, contractuales y patrimoniales.",
  },
];

export const SegurosGeneralesPage = () => {
  const [activo, setActivo] = useState(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const siguiente = () => {
    setActivo((prev) =>
      prev === segurosGeneralesDefinidos.length - 1 ? 0 : prev + 1
    );
  };

  const anterior = () => {
    setActivo((prev) =>
      prev === 0 ? segurosGeneralesDefinidos.length - 1 : prev - 1
    );
  };

  const getVisibleItems = () => {
    const total = segurosGeneralesDefinidos.length;
    const items = [];

    for (let i = -2; i <= 2; i++) {
      const index = (activo + i + total) % total;

      items.push({
        ...segurosGeneralesDefinidos[index],
        realIndex: index,
      });
    }

    return items;
  };

  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      siguiente();
    }, 5000);

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* HERO */}
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
              Diseñamos programas de seguros generales que combinan protección
              de activos, continuidad operativa y tranquilidad financiera para
              cada etapa de tus proyectos.
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

      {/* CARRUSEL */}
      <section
        id="linea-seguros-generales"
        className="overflow-hidden bg-gradient-to-b from-[#f7f5f0] to-[#efe8db] py-20"
      >
        <div className="mx-auto max-w-7xl px-6">
          <FadeInWhenVisible className="space-y-12">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-semibold text-[#0d2b52] sm:text-4xl">
                Explora nuestras coberturas
              </h2>

              <p className="mx-auto max-w-3xl text-sm text-[#5b6777] sm:text-base">
                Desplázate por nuestras líneas principales para encontrar el
                plan ideal.
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-6xl overflow-hidden px-14 sm:px-16">
              <button
                type="button"
                onClick={anterior}
                aria-label="Ver cobertura anterior"
                className="absolute left-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-[#e5dfd3] bg-white/80 text-[#b6b6b6] transition-all duration-300 hover:bg-white hover:text-[#0d2b52] sm:h-14 sm:w-14"
              >
                <ChevronLeft size={22} />
              </button>

              <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-3 lg:grid-cols-5">
                {getVisibleItems().map((seguro) => (
                  <button
                    type="button"
                    key={seguro.titulo}
                    onClick={() => setActivo(seguro.realIndex)}
                    className={`relative min-h-[96px] pb-5 text-center transition-all duration-300 ${
                      activo === seguro.realIndex
                        ? "text-[#0d2b52]"
                        : "text-[#9a9fa8]"
                    }`}
                  >
                    <span className="block text-[0.68rem] font-bold uppercase leading-relaxed tracking-[0.35em]">
                      {seguro.titulo}
                    </span>

                    {activo === seguro.realIndex && (
                      <div className="absolute bottom-0 left-1/2 h-[2px] w-28 -translate-x-1/2 bg-[#d1a437]" />
                    )}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={siguiente}
                aria-label="Ver siguiente cobertura"
                className="absolute right-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-[#e5dfd3] bg-white/80 text-[#b6b6b6] transition-all duration-300 hover:bg-white hover:text-[#0d2b52] sm:h-14 sm:w-14"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            <div className="mx-auto max-w-4xl text-center">
              <div className="space-y-7">
                <h3 className="text-3xl font-semibold text-[#0d2b52] sm:text-4xl">
                  {segurosGeneralesDefinidos[activo].titulo}
                </h3>

                <p className="mx-auto max-w-3xl text-base leading-relaxed text-[#4d5b6b] sm:text-lg">
                  {segurosGeneralesDefinidos[activo].descripcion}
                </p>

                <a
                  href={crearLinkWhatsApp(
                    segurosGeneralesDefinidos[activo].titulo
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[#0d2b52] px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#163d70]"
                >
                  Solicitar asesoría
                </a>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      <SegurosGeneralesSection />
    </>
  );
};