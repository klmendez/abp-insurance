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
  <section
    id="ventajas"
    className="relative bg-gradient-to-br from-[#0c1f36] via-[#11263f] to-[#0a1726] text-white py-24"
  >
    {/* Glow decorativo suave */}
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(74,111,165,0.22),transparent_60%)]" />

    <div className="relative mx-auto max-w-6xl px-6">
      
      {/* HEADER */}
      <FadeInWhenVisible className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#4A6FA5]/80">
          Ventajas ABP
        </span>

        <h2 className="mt-4 text-4xl font-display leading-tight text-white">
          Fortalecemos la protección de tu empresa y el bienestar de tu equipo
        </h2>

        <p className="mt-4 text-base text-white/70">
          Somos tu aliado estratégico. Gestionamos riesgos, garantizamos cumplimiento normativo y
          optimizamos tus procesos sin costo adicional.
        </p>
      </FadeInWhenVisible>

      {/* TARJETAS */}
      <div className="mt-20 grid gap-10 md:grid-cols-3">
        {advantages.map((advantage) => (
          <FadeInWhenVisible key={advantage.title}>
            <div
              className="
                group h-full rounded-3xl border border-white/10 
                bg-white/5 backdrop-blur-sm px-10 py-12 
                transition-all hover:-translate-y-2 hover:bg-white/10 
                hover:shadow-xl hover:shadow-[#4A6FA5]/30
              "
            >
              {/* ICONO EN CÍRCULO ELEGANTE */}
              <div
                className="
                  mb-6 flex h-16 w-16 items-center justify-center rounded-full
                  bg-[#4A6FA5]/20 text-[#4A6FA5] border border-[#4A6FA5]/30
                  shadow-[0_0_15px_rgba(74,111,165,0.25)]
                "
              >
                <advantage.icon className="text-3xl" />
              </div>

              {/* TÍTULO */}
              <h3 className="text-xl font-semibold text-white">
                {advantage.title}
              </h3>

              {/* DESCRIPCIÓN */}
              <p className="mt-4 text-[0.95rem] text-white/70 leading-relaxed">
                {advantage.description}
              </p>
            </div>
          </FadeInWhenVisible>
        ))}
      </div>
    </div>
  </section>
);
