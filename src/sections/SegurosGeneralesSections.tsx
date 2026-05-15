import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import generalesImg from "@/assets/generales/generales1.webp";
import autosImg from "@/assets/generales/autos.webp";
import propiedadImg from "@/assets/generales/propiedad.webp";
import responsabilidadImg from "@/assets/generales/responsabilidad.webp";
import cumplimientoImg from "@/assets/generales/cumplimiento.webp";
import vidaImg from "@/assets/generales/vida.webp";

const whatsappNumber = "573205754640";

const crearLinkWhatsApp = (producto: string) => {
  const mensaje = `Hola, quiero solicitar asesoría sobre ${producto}.`;

  return `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(
    mensaje
  )}`;
};

const segurosGenerales = [
  {
    titulo: "Automóviles y Flotas",
    subtitulo:
      "Envíanos la tarjeta de propiedad y la cédula para cotizar tu seguro de vehículo.",
    descripcion:
      "Protección para vehículos particulares, empresariales y flotas operativas, con opciones de daños, pérdida, responsabilidad civil y asistencia.",
    imagen: autosImg,
    formulario: "https://forms.gle/L8M866g9qfURWBGa6",
  },

  {
    titulo: "Seguro de Propiedad",
    subtitulo:
      "Cuéntanos los datos de tu inmueble y te ayudamos a cotizar una protección ajustada.",
    descripcion:
      "Protege tu vivienda, apartamento, contenidos, responsabilidad civil familiar y coberturas adicionales según tus necesidades.",
    imagen: propiedadImg,
    formulario: "https://forms.gle/yzTFEZgL66oetvTL7",
  },

  {
    titulo: "Responsabilidad Civil",
    subtitulo:
      "Ideal para empresas, profesionales o actividades que puedan generar daños a terceros.",
    descripcion:
      "Ampara daños materiales, lesiones personales o perjuicios ocasionados a terceros por responsabilidad civil general, contractual o extracontractual.",
    imagen: responsabilidadImg,
  },

  {
    titulo: "Cumplimiento",
    subtitulo:
      "Para contratos con entidades públicas o privadas que exigen respaldo asegurador.",
    descripcion:
      "Garantiza obligaciones contractuales, anticipos, cumplimiento, calidad del servicio y otros compromisos derivados de un contrato.",
    imagen: cumplimientoImg,
  },

  {
    titulo: "Vida Individual",
    subtitulo:
      "Solo necesitamos tu cédula y el valor por el que quisieras proteger a tu familia.",
    descripcion:
      "Protección financiera para personas y familias ante fallecimiento, incapacidad u otros eventos según el plan contratado.",
    imagen: vidaImg,
  },

  {
    titulo: "Multiriesgo Empresarial",
    subtitulo:
      "Una sola póliza para proteger varios riesgos de tu empresa o negocio.",
    descripcion:
      "Cubre instalaciones, equipos, inventarios, maquinaria, daños materiales y otros riesgos que pueden afectar la operación.",
    imagen: generalesImg,
  },
];

export const SegurosGeneralesSections = () => {
  const [activo, setActivo] = useState(0);

  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const seguroActivo = segurosGenerales[activo];

  const siguiente = () => {
    setActivo((prev) =>
      prev === segurosGenerales.length - 1 ? 0 : prev + 1
    );
  };

  const anterior = () => {
    setActivo((prev) =>
      prev === 0 ? segurosGenerales.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    autoplayRef.current = setInterval(siguiente, 6000);

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, []);

  return (
    <section className="overflow-hidden bg-[#f7f3ea] py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <div className="mb-12 grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <h2 className="text-4xl font-semibold leading-tight text-[#0d2b52] sm:text-5xl">
            Seguros Generales
          </h2>

          <p className="max-w-2xl text-base leading-relaxed text-[#536173] lg:justify-self-end lg:text-lg">
            {seguroActivo.subtitulo}
          </p>
        </div>

        {/* CONTENIDO */}
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          {/* IMAGEN */}
          <div className="relative overflow-hidden shadow-2xl">
            <img
              src={seguroActivo.imagen}
              alt={seguroActivo.titulo}
className="h-[280px] w-full object-cover transition-all duration-700 sm:h-[360px] lg:h-[520px]"            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#071d38]/95 via-[#071d38]/45 to-transparent" />

            <div className="absolute bottom-8 left-8 right-8 text-white">
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#e5b955]">
                {String(activo + 1).padStart(2, "0")} /{" "}
                {String(segurosGenerales.length).padStart(2, "0")}
              </span>

              <h3 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                {seguroActivo.titulo}
              </h3>
            </div>
          </div>

          {/* TEXTO */}
          <div className="text-center lg:text-left">
            {/* NAV */}
            <div className="mb-8 flex flex-wrap justify-center gap-4 lg:justify-start">
              {segurosGenerales.map((seguro, index) => (
                <button
                  key={seguro.titulo}
                  type="button"
                  onClick={() => setActivo(index)}
                  className={`text-xs font-bold uppercase tracking-[0.25em] transition ${
                    activo === index
                      ? "text-[#0d2b52]"
                      : "text-[#9aa1aa] hover:text-[#0d2b52]"
                  }`}
                >
                  {seguro.titulo}
                </button>
              ))}
            </div>

            {/* LINEA */}
            <div className="mb-10 h-[2px] w-full bg-[#ddd2bc]">
              <div
                className="h-full bg-[#d1a437] transition-all duration-500"
                style={{
                  width: `${
                    ((activo + 1) / segurosGenerales.length) * 100
                  }%`,
                }}
              />
            </div>

            {/* TITULO */}
            <h3 className="text-3xl font-semibold text-[#0d2b52] sm:text-4xl">
              {seguroActivo.titulo}
            </h3>

            {/* DESCRIPCION */}
            <p className="mt-5 text-base leading-relaxed text-[#536173] sm:text-lg">
              {seguroActivo.descripcion}
            </p>

            {/* BOTONES */}
            <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
              <a
                href={crearLinkWhatsApp(seguroActivo.titulo)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[#0d2b52] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#163d70]"
              >
                Solicitar asesoría
              </a>

              {seguroActivo.formulario && (
                <a
                  href={seguroActivo.formulario}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-[#0d2b52] px-7 py-3 text-sm font-semibold text-[#0d2b52] transition hover:bg-[#0d2b52] hover:text-white"
                >
                  Diligenciar formulario
                </a>
              )}
            </div>

            {/* FLECHAS */}
            <div className="mt-10 flex justify-center gap-4 lg:justify-start">
              <button
                type="button"
                onClick={anterior}
                className="flex h-12 w-12 items-center justify-center border border-[#ded6c6] bg-white text-[#9aa1aa] transition hover:text-[#0d2b52]"
              >
                <ChevronLeft size={22} />
              </button>

              <button
                type="button"
                onClick={siguiente}
                className="flex h-12 w-12 items-center justify-center border border-[#ded6c6] bg-white text-[#9aa1aa] transition hover:text-[#0d2b52]"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};