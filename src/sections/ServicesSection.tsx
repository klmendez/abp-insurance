import { FadeInWhenVisible } from '@/components/FadeInWhenVisible';
import { FiBriefcase, FiHome, FiShield } from 'react-icons/fi';

type ServiceDetail = {
  heading: string;
  items: string[];
};

type Service = {
  icon: typeof FiHome;
  title: string;
  quote: string;
  details: ServiceDetail[];
};

const services: Service[] = [
  {
    icon: FiHome,
    title: 'Acompañamiento',
    quote: '“No solo te vendo un seguro, camino contigo.”',
    details: [
      {
        heading: 'Servicios clave',
        items: [
          'Acompañamiento en Riesgos Laborales (ARL – Positiva).',
          'Asesoría en afiliación, clasificación de riesgo y novedades.',
          'Gestión y orientación en reporte de accidentes y enfermedades laborales.',
        ],
      },
      {
        heading: 'Gestión empresarial',
        items: [
          'Acompañamiento en implementación y mejora del SG-SST.',
          'Coordinación de capacitaciones y programas con la ARL.',
          'Análisis de siniestralidad y recomendaciones de mejora.',
        ],
      },
      {
        heading: 'Relación asegurado–aseguradora',
        items: [
          'Acompañamiento en siniestros: vida, ARL y seguros generales.',
          'Apoyo en reclamaciones, documentación y seguimiento de casos.',
          'Asesoría consultiva para empresas y personas en decisiones de protección.',
        ],
      },
    ],
  },
  {
    icon: FiShield,
    title: 'Bienestar',
    quote: '“Promovemos tu bienestar y el de quienes dependen de ti.”',
    details: [
      {
        heading: 'Seguros de vida',
        items: [
          'Seguros de vida individual (con o sin ahorro) – Positiva / AXA Colpatria.',
          'Seguros de vida deudores para protección de obligaciones financieras.',
          'Vida colectivo para empleados y equipos de trabajo.',
        ],
      },
      {
        heading: 'Bienestar del trabajador y la familia',
        items: [
          'Programas de protección económica ante fallecimiento o incapacidad.',
          'Esquemas de beneficios para familias de colaboradores.',
          'Planes integrales de bienestar asegurado.',
        ],
      },
      {
        heading: 'Estilos de vida y cultura aseguradora',
        items: [
          'Línea ciclistas: vida y accidentes específicos para deportistas.',
          'Charlas y talleres sobre seguros, prevención y planificación financiera.',
          'Educación para que las personas comprendan y usen sus coberturas.',
        ],
      },
    ],
  },
  {
    icon: FiBriefcase,
    title: 'Protección',
    quote: '“Protegemos lo que has construido y lo que estás construyendo.”',
    details: [
      {
        heading: 'Protección laboral y empresarial',
        items: [
          'Programas integrales para empresas: vida colectivo + ARL + seguros generales.',
          'Diseño de esquemas de protección para colaboradores y operación.',
        ],
      },
      {
        heading: 'Protección patrimonial',
        items: [
          'Seguros generales (en trámite de clave con Seguros del Estado y Seguros Mundial).',
          'Responsabilidad civil, incendio, terremoto y todo riesgo daños materiales.',
          'Transporte de mercancías y flota de vehículos empresariales.',
          'Seguros de autos, motos y hogar para personas y familias.',
        ],
      },
      {
        heading: 'Protección especializada',
        items: [
          'Seguro para bicicletas: robo y daños, accesorios y marcos especiales.',
          'Seguro de viaje para ciclistas: eventos, travesías y competencias.',
          'Productos a la medida de nuevos nichos y sectores específicos.',
        ],
      },
    ],
  },
];

export const ServicesSection = () => (
  <section id="abp" className="bg-white py-24">
    <div className="mx-auto max-w-6xl px-6">
      <FadeInWhenVisible className="max-w-4xl">
        <span className="text-xs font-semibold uppercase tracking-[0.35em] text-abp-blue">
          Modelo A · B · P
        </span>
        <h2 className="mt-3 text-4xl font-serif text-abp-blue">
          Nuestra manera de construir bienestar asegurado
        </h2>
        <p className="mt-4 text-base text-slate-600">
          El modelo Acompañamiento–Bienestar–Protección articula soluciones integrales para empresas y
          personas. Cada eje conecta experiencias, resultados y soporte constante.
        </p>
      </FadeInWhenVisible>

      <div className="mt-16 grid gap-16 lg:grid-cols-[1fr,0.9fr] lg:items-start">
        <div className="space-y-12">
          <div className="hidden h-px w-full bg-abp-blue/20 lg:block" />
          {services.map((service, index) => (
            <FadeInWhenVisible key={service.title} className="grid gap-8 lg:grid-cols-[0.2fr,0.8fr]">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-abp-blue">
                  <span className="text-sm font-semibold uppercase tracking-[0.25em]">{`0${index + 1}`}</span>
                  <service.icon className="size-8" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                  {service.title}
                </p>
                <p className="text-sm text-slate-600">{service.quote}</p>
              </div>

              <div className="space-y-8 border-l border-abp-blue/20 pl-8">
                {service.details.map((detail) => (
                  <div key={detail.heading} className="space-y-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-abp-blue">
                      {detail.heading}
                    </p>
                    <ul className="grid gap-2 text-sm text-slate-600">
                      {detail.items.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1 size-2 bg-abp-gold" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                <a
                  href="#contacto"
                  className="inline-flex items-center text-xs font-semibold uppercase tracking-[0.25em] text-abp-blue transition-colors hover:text-abp-gold"
                >
                  Solicita asesoría personalizada
                </a>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>

        <FadeInWhenVisible className="space-y-10 border border-abp-blue/10 bg-abp-cream/70 p-10">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-abp-blue">
              Experiencia comprobada
            </p>
            <h3 className="text-3xl font-serif text-abp-blue">
              Entendemos tu operación, anticipamos riesgos y acompañamos la toma de decisiones.
            </h3>
          </div>

          <div className="grid gap-6 text-sm text-slate-600">
            <div>
              <p className="font-semibold text-abp-blue">Implementación guiada</p>
              <p className="mt-2">
                Coordinamos afiliaciones, capacitaciones y documentación en conjunto con tu equipo y la
                ARL.
              </p>
            </div>
            <div>
              <p className="font-semibold text-abp-blue">Análisis de datos</p>
              <p className="mt-2">
                Revisamos siniestralidad y políticas internas para proponer mejoras continuas.
              </p>
            </div>
            <div>
              <p className="font-semibold text-abp-blue">Relación aseguradora</p>
              <p className="mt-2">
                Gestionamos reclamaciones, documentación y respuestas a auditorías sin costo adicional.
              </p>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </div>
  </section>
);
