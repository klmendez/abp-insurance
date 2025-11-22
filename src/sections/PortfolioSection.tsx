import { FadeInWhenVisible } from '@/components/FadeInWhenVisible';
import { FiActivity, FiHeart, FiShield, FiFeather } from 'react-icons/fi';

import type { IconType } from 'react-icons';

type PortfolioGroup = {
  title: string;
  items: string[];
};

type PortfolioCategory = {
  icon: IconType;
  title: string;
  description: string;
  groups: PortfolioGroup[];
};

const categories: PortfolioCategory[] = [
  {
    icon: FiActivity,
    title: 'A. Seguros de Riesgos Laborales (ARL) – Positiva',
    description:
      'Acompañamos a las empresas en la gestión integral de los riesgos laborales: afiliación, prevención y atención de accidentes y enfermedades laborales.',
    groups: [
      {
        title: 'Gestión de afiliación',
        items: [
          'Afiliación a ARL para empresas, independientes y contratistas.',
          'Clasificación de riesgo y apoyo en lectura de tarifas.',
          'Actualización de centros de trabajo y cargos.',
          'Gestión de traslados y novedades de personal.',
        ],
      },
      {
        title: 'Siniestros: accidentes y enfermedades laborales',
        items: [
          'Orientación en reporte de accidentes de trabajo (AT) y enfermedades laborales (EL).',
          'Acompañamiento en el reconocimiento de incapacidades e indemnizaciones.',
          'Gestión frente a prestaciones asistenciales (atención médica, rehabilitación).',
        ],
      },
      {
        title: 'Prevención y apoyo al SG-SST',
        items: [
          'Apoyo en matrices de riesgo y planes de acción.',
          'Coordinación de capacitaciones con la ARL.',
          'Campañas de prevención y cultura de seguridad.',
          'Acompañamiento en auditorías y planes de mejora.',
        ],
      },
    ],
  },
  {
    icon: FiHeart,
    title: 'B. Seguros de Vida – Positiva & AXA Colpatria',
    description:
      'Diseñamos soluciones de vida que protegen proyectos, responsabilidades y brindan bienestar a las personas, sus familias y equipos de trabajo.',
    groups: [
      {
        title: 'Vida personal',
        items: [
          'Seguro de vida con o sin ahorro.',
          'Seguro de vida temporal.',
          'Seguro de vida deudores para créditos y obligaciones.',
          'Vida para independientes y profesionales.',
        ],
      },
      {
        title: 'Vida empresarial',
        items: [
          'Pólizas colectivas para colaboradores.',
          'Cobertura en caso de fallecimiento.',
          'Cobertura por incapacidad total y permanente.',
          'Beneficios adicionales: exequias, auxilios y servicios complementarios.',
        ],
      },
    ],
  },
  {
    icon: FiShield,
    title: 'C. Seguros Generales – (En trámite de clave con Seguros del Estado y Seguros Mundial)',
    description:
      'Ampliamos nuestro portafolio para ofrecer protección patrimonial a empresas, personas y sectores específicos.',
    groups: [
      {
        title: 'Empresas',
        items: [
          'Responsabilidad civil.',
          'Incendio, terremoto y daños a la propiedad.',
          'Todo riesgo daños materiales.',
          'Transporte de mercancías.',
          'Seguros para flotas y vehículos empresariales.',
        ],
      },
      {
        title: 'Personas',
        items: [
          'Seguros de autos y motos.',
          'Seguro de hogar (vivienda, contenido, responsabilidad familiar).',
          'Arriendo seguro para propietarios.',
          'Seguros para Pymes y emprendedores.',
        ],
      },
      {
        title: 'Sectores',
        items: [
          'Todo Riesgo Construcción (TRC).',
          'Todo Riesgo Montaje y equipos de ingeniería.',
          'Equipos electrónicos y maquinaria especializada.',
        ],
      },
    ],
  },
  {
    icon: FiFeather,
    title: 'D. Línea Ciclistas – Vida, Bicicleta y Viaje',
    description:
      'Portafolio especializado para ciclistas recreativos, urbanos y deportivos: vida, accidentes, bicicleta y viajes a eventos.',
    groups: [
      {
        title: 'Vida ciclista',
        items: [
          'Seguro de Vida y Accidentes para Ciclistas.',
          'Muerte accidental en bicicleta.',
          'Incapacidad permanente por accidente.',
          'Gastos médicos y fracturas específicas.',
          'Auxilio por hospitalización e incapacidad.',
        ],
      },
      {
        title: 'Bicicleta',
        items: [
          'Seguro para la Bicicleta: robo total y robo calificado.',
          'Daños por choque o caída.',
          'Cobertura de accesorios y marco (opcional).',
          'Protección durante transporte terrestre.',
        ],
      },
      {
        title: 'Viaje',
        items: [
          'Seguro de Viaje para Ciclistas.',
          'Asistencia médica en viaje.',
          'Rescate y traslados asistenciales.',
          'Bicicleta protegida en viajes y eventos.',
          'Responsabilidad civil y reembolso de inscripción (según plan).',
        ],
      },
    ],
  },
];

export const PortfolioSection = () => (
  <section id="portafolio" className="bg-abp-cream/40 py-24">
    <div className="mx-auto max-w-6xl px-6">
      <FadeInWhenVisible>
        <span className="text-xs font-semibold uppercase tracking-[0.35em] text-abp-blue/80">
          Portafolio de seguros
        </span>
        <div className="mt-4 grid gap-6 md:grid-cols-[0.8fr,1.2fr] md:items-start">
          <h2 className="text-4xl font-['Playfair_Display'] leading-snug text-abp-blue">
            Portafolio integral para personas, empresas y nuevos nichos
          </h2>
          <p className="text-base text-slate-600">
            Articulamos seguros de personas, riesgos laborales y seguros generales bajo el modelo
            Acompañamiento–Bienestar–Protección. Nuestros aliados nos permiten diseñar soluciones a la
            medida según tu etapa de crecimiento.
          </p>
        </div>
      </FadeInWhenVisible>

      <div className="mt-16 space-y-12">
        {categories.map((category) => (
          <FadeInWhenVisible key={category.title} className="border border-abp-blue/15 bg-white p-10">
            <div className="grid gap-6 md:grid-cols-[0.25fr,0.75fr]">
              <div className="flex flex-col gap-4">
                <category.icon className="size-10 text-abp-blue" />
                <h3 className="text-2xl font-semibold text-abp-blue">{category.title}</h3>
                <p className="text-sm text-slate-600">{category.description}</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {category.groups.map((group) => (
                  <div key={group.title} className="border border-abp-blue/10 bg-abp-cream/50 p-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-abp-blue">
                      {group.title}
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-slate-600">
                      {group.items.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-1 size-2 bg-abp-gold" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </FadeInWhenVisible>
        ))}
      </div>
    </div>
  </section>
);
