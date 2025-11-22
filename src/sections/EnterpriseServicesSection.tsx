import { FadeInWhenVisible } from '@/components/FadeInWhenVisible';
import { FiFolder, FiSettings, FiBookOpen } from 'react-icons/fi';

const enterpriseServices = [
  {
    icon: FiFolder,
    title: 'Gestión documental',
    description: 'Organización y soporte documental',
    points: [
      'Organización de carpetas laborales y soportes de afiliación.',
      'Control de vigencias, actualizaciones y vencimientos.',
      'Buenas prácticas en archivo para auditorías y visitas.',
    ],
  },
  {
    icon: FiSettings,
    title: 'SG-SST',
    description: 'Acompañamiento en SG-SST',
    points: [
      'Diseño y/o actualización del Sistema de Gestión de Seguridad y Salud en el Trabajo.',
      'Articulación con la ARL para programas y campañas.',
      'Recomendaciones frente a hallazgos de auditorías.',
    ],
  },
  {
    icon: FiBookOpen,
    title: 'Formación',
    description: 'Capacitación y cultura preventiva',
    points: [
      'Capacitaciones en riesgos laborales y autocuidado.',
      'Inducción y reinducción de trabajadores.',
      'Temáticas específicas según el sector y tipo de riesgo.',
    ],
  },
];

export const EnterpriseServicesSection = () => (
  <section id="servicios-empresariales" className="bg-white py-24">
    <div className="mx-auto max-w-6xl px-6">
      <FadeInWhenVisible className="grid gap-6 md:grid-cols-[1fr,1fr] md:items-start">
        <div className="space-y-4">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-abp-blue/80">
            Servicios empresariales complementarios
          </span>
          <h2 className="text-4xl font-['Playfair_Display'] leading-snug text-abp-blue">
            Fortalecemos la gestión interna de tu organización
          </h2>
          <p className="text-base text-slate-600">
            Además de la intermediación en pólizas, facilitamos procesos internos para que tu empresa cumpla la normativa, optimice recursos y garantice bienestar integral.
          </p>
        </div>

        <div className="space-y-6 border border-abp-blue/15 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-abp-blue">
            ¿Qué logramos?
          </p>
          <ul className="space-y-3 text-sm text-slate-600">
            <li>Documentación al día para auditorías y visitas.</li>
            <li>Procesos SG-SST articulados con tu operación.</li>
            <li>Equipos informados y cultura preventiva activa.</li>
          </ul>
          <a
            href="#contacto"
            className="inline-flex text-xs font-semibold uppercase tracking-[0.3em] text-abp-blue transition-colors hover:text-abp-gold"
          >
            Solicitar checklist empresarial
          </a>
        </div>
      </FadeInWhenVisible>

      <div className="mt-16 grid gap-10 md:grid-cols-3">
        {enterpriseServices.map((service) => (
          <FadeInWhenVisible key={service.title} className="border border-abp-blue/15 bg-abp-cream/60 p-8">
            <service.icon className="size-10 text-abp-blue" />
            <h3 className="mt-6 text-xl font-semibold text-abp-blue">{service.title}</h3>
            <p className="mt-3 text-sm text-abp-blue/70">{service.description}</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {service.points.map((point) => (
                <li key={point} className="flex gap-2">
                  <span className="mt-1 size-2 bg-abp-gold" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <a
              href="#contacto"
              className="mt-6 inline-flex text-xs font-semibold uppercase tracking-[0.3em] text-abp-blue transition-colors hover:text-abp-gold"
            >
              Conversemos sobre tu empresa
            </a>
          </FadeInWhenVisible>
        ))}
      </div>
    </div>
  </section>
);
