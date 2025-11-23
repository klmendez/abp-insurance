import { useState } from "react";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiFolder,
  FiSettings,
  FiBookOpen,
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import type { IconType } from "react-icons";

type EnterpriseService = {
  icon: IconType;
  title: string;
  description: string;
  points: string[];
  focus: string;
  ctaLabel: string;
  ctaSubtext: string;
};

const enterpriseServices: EnterpriseService[] = [
  {
    icon: FiFolder,
    title: "Gestión documental",
    description: "Organización y soporte documental para estar siempre al día.",
    points: [
      "Carpetas laborales y soportes de afiliación organizados.",
      "Control de vigencias, actualizaciones y vencimientos.",
      "Buenas prácticas de archivo para auditorías y visitas.",
    ],
    focus: "Empresas que necesitan orden y trazabilidad en su información.",
    ctaLabel: "Revisar tu documentación",
    ctaSubtext: "Te ayudamos a dejar todo listo para auditorías y visitas.",
  },
  {
    icon: FiSettings,
    title: "SG-SST",
    description: "Acompañamiento práctico en Seguridad y Salud en el Trabajo.",
    points: [
      "Diseño y/o actualización del Sistema de Gestión de SST.",
      "Articulación con la ARL para programas y campañas.",
      "Respuesta a hallazgos de auditorías y visitas.",
    ],
    focus: "Organizaciones que quieren cumplir la norma sin frenar la operación.",
    ctaLabel: "Optimizar tu SG-SST",
    ctaSubtext:
      "Convertimos el sistema en un aliado de la operación, no en un peso.",
  },
  {
    icon: FiBookOpen,
    title: "Formación",
    description: "Capacitaciones que impulsan una cultura preventiva real.",
    points: [
      "Capacitaciones en riesgos laborales y autocuidado.",
      "Inducción y reinducción para trabajadores nuevos y antiguos.",
      "Temáticas específicas según sector y tipo de riesgo.",
    ],
    focus:
      "Equipos que necesitan apropiarse de la prevención en el día a día.",
    ctaLabel: "Diseñar un plan de formación",
    ctaSubtext:
      "Construimos una agenda de capacitación alineada con tus riesgos.",
  },
];

/* ---------- Subcomponentes ---------- */

const BenefitItem = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => (
  <div className="flex gap-3">
    <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-abp-blue/5 text-abp-blue">
      <FiCheck className="h-4 w-4" />
    </div>
    <div>
      <p className="font-semibold text-abp-blue">{title}</p>
      <p className="text-xs text-slate-600">{subtitle}</p>
    </div>
  </div>
);

const NavButton = ({
  onClick,
  icon,
}: {
  onClick: () => void;
  icon: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="flex h-8 w-8 items-center justify-center rounded-full border border-abp-blue/20 bg-white text-abp-blue hover:border-abp-blue/40"
  >
    {icon}
  </button>
);

const ChipButton = ({
  title,
  active,
  onClick,
}: {
  title: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] transition-all
      ${
        active
          ? "border-abp-blue bg-white text-abp-blue"
          : "border-transparent bg-abp-blue/5 text-abp-blue/70 hover:bg-white hover:border-abp-blue/30"
      }`}
  >
    <span className="inline-block h-1.5 w-1.5 rounded-full bg-abp-blue" />
    {title}
  </button>
);

const ServicePoint = ({ text }: { text: string }) => (
  <div className="flex gap-2">
    <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-abp-blue/5 text-abp-blue">
      <FiCheck className="h-3 w-3" />
    </div>
    <p className="leading-relaxed text-sm text-slate-700">{text}</p>
  </div>
);

const Indicator = ({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`h-1.5 rounded-full transition-all ${
      active ? "w-6 bg-abp-blue" : "w-2 bg-abp-blue/30"
    }`}
  />
);

/* ---------- Componente principal ---------- */

export const EnterpriseServicesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = enterpriseServices[activeIndex];

  const handleNext = () =>
    setActiveIndex((prev) =>
      prev === enterpriseServices.length - 1 ? 0 : prev + 1
    );

  const handlePrev = () =>
    setActiveIndex((prev) =>
      prev === 0 ? enterpriseServices.length - 1 : prev - 1
    );

  return (
    <section
      id="servicios-empresariales"
      className="bg-gradient-to-br from-[#e3edff] via-[#f5faff] to-white py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <FadeInWhenVisible className="grid gap-8 md:grid-cols-[1.3fr,1.1fr] md:items-start">
          {/* IZQUIERDA */}
          <div className="space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-abp-blue/80">
              Servicios empresariales complementarios
            </span>

            <h2 className="text-4xl font-display leading-snug text-abp-blue">
              Fortalecemos la gestión interna de tu organización
            </h2>

            <p className="text-base text-slate-600">
              Además de la intermediación en pólizas, te ayudamos a ordenar
              procesos, cumplir la normativa y construir una cultura preventiva
              sostenible.
            </p>

            <div className="mt-4 grid gap-3 text-sm text-slate-700">
              <BenefitItem
                title="Menos riesgo en auditorías"
                subtitle="Soportes completos y actualizados para visitas."
              />
              <BenefitItem
                title="Procesos que sí funcionan"
                subtitle="SG-SST integrado con la operación real."
              />
              <BenefitItem
                title="Cultura preventiva viva"
                subtitle="Equipos formados y conscientes de sus riesgos."
              />
            </div>
          </div>

          {/* DERECHA — CARRUSEL */}
          <div className="relative rounded-3xl border border-abp-blue/15 bg-white/60 p-6 shadow-card backdrop-blur-xl">
            {/* NAV */}
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-abp-blue">
                Servicios para tu empresa
              </p>

              <div className="flex gap-2">
                <NavButton
                  onClick={handlePrev}
                  icon={<FiChevronLeft className="h-4 w-4" />}
                />
                <NavButton
                  onClick={handleNext}
                  icon={<FiChevronRight className="h-4 w-4" />}
                />
              </div>
            </div>

            {/* CHIPS */}
            <div className="mb-4 flex flex-wrap gap-2">
              {enterpriseServices.map((service, index) => (
                <ChipButton
                  key={service.title}
                  title={service.title}
                  active={activeIndex === index}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>

            {/* PANEL INTERNO */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl bg-white/70 p-5 shadow-sm backdrop-blur-md"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#e3edff] text-abp-blue">
                    <activeService.icon className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-abp-blue">
                      {activeService.title}
                    </h3>

                    <p className="mt-1 text-sm text-abp-blue/80">
                      {activeService.description}
                    </p>

                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                      Enfoque
                    </p>
                    <p className="mt-1 text-xs text-slate-600">
                      {activeService.focus}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-3">
                  {activeService.points.map((point) => (
                    <ServicePoint key={point} text={point} />
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-6 border-t border-slate-200 pt-4">
                  <p className="text-xs font-medium text-slate-700">
                    {activeService.ctaSubtext}
                  </p>

                  <a
                    href="#contacto"
                    className="mt-3 inline-flex rounded-full bg-abp-blue px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white hover:bg-abp-blue/90"
                  >
                    {activeService.ctaLabel}
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* INDICADORES */}
            <div className="mt-6 flex justify-center gap-2">
              {enterpriseServices.map((_, index) => (
                <Indicator
                  key={index}
                  active={index === activeIndex}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};
