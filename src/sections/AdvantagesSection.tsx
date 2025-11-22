import { FadeInWhenVisible } from '@/components/FadeInWhenVisible';
import { FiClock, FiHeadphones, FiTrendingUp } from 'react-icons/fi';

const advantages = [
  {
    icon: FiClock,
    title: 'Gestión eficiente y continua',
    description:
      'Simplificamos la gestión de riesgos laborales con acompañamiento permanente para tu equipo.',
  },
  {
    icon: FiHeadphones,
    title: 'Cero costo adicional',
    description:
      'Recibe asesoría experta, seguimiento y gestión profesional sin incurrir en gastos extras.',
  },
  {
    icon: FiTrendingUp,
    title: 'Cumplimiento garantizado',
    description:
      'Control interno y normas al día para proteger el patrimonio de tu empresa y a tus colaboradores.',
  },
];

export const AdvantagesSection = () => (
  <section id="ventajas" className="bg-abp-blue text-white">
    <div className="mx-auto max-w-6xl px-6 py-24">
      <FadeInWhenVisible className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-[0.35em] text-abp-gold/80">
          Ventajas
        </span>
        <h2 className="mt-4 text-4xl font-display leading-tight">
          ABP fortalece la protección de tu empresa y tus empleados
        </h2>
        <p className="mt-4 text-base text-white/75">
          Somos tu aliado estratégico: gestionamos riesgos, garantizamos cumplimiento normativo y
          optimizamos el acceso a prestaciones sin costo adicional para ti.
        </p>
      </FadeInWhenVisible>

      <div className="mt-20 grid gap-10 md:grid-cols-3">
        {advantages.map((advantage) => (
          <FadeInWhenVisible
            key={advantage.title}
            className="border border-white/15 bg-white/10 px-10 py-12 transition-colors hover:border-abp-gold/40"
          >
            <advantage.icon className="mb-6 text-4xl text-abp-gold" />
            <h3 className="text-xl font-semibold text-white">{advantage.title}</h3>
            <p className="mt-4 text-sm text-white/75">{advantage.description}</p>
          </FadeInWhenVisible>
        ))}
      </div>
    </div>
  </section>
);
