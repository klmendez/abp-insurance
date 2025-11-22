import { FadeInWhenVisible } from '@/components/FadeInWhenVisible';
import { FiStar } from 'react-icons/fi';

const testimonials = [
  {
    name: 'María López',
    role: 'Directora de RRHH, Grupo Nova',
    quote:
      'ABP nos brindó una solución corporativa a la medida. Su equipo respondió con rapidez a cada siniestro y nos acompaña en las decisiones clave.',
  },
  {
    name: 'Andrés García',
    role: 'Emprendedor',
    quote:
      'Me guiaron paso a paso para contratar mi seguro de salud familiar. La tranquilidad que tengo hoy no tiene precio.',
  },
  {
    name: 'Carolina Ruiz',
    role: 'Arquitecta',
    quote:
      'Más que una agencia, son aliados que escuchan y diseñan soluciones flexibles. Recomiendo a ABP por su trato cercano y transparente.',
  },
];

export const TestimonialsSection = () => (
  <section id="testimonios" className="bg-white py-24">
    <div className="mx-auto max-w-6xl px-6">
      <FadeInWhenVisible className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold uppercase tracking-[0.35em] text-abp-blue/70">
          Testimonios
        </span>
        <h2 className="mt-4 text-3xl font-bold text-abp-blue md:text-4xl">
          La confianza de quienes aseguramos cada día
        </h2>
        <p className="mt-4 text-base text-slate-600">
          Familias, profesionales y empresas confían en nosotros por nuestra asesoría transparente, humana y enfocada en resultados.
        </p>
      </FadeInWhenVisible>

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <FadeInWhenVisible
            key={testimonial.name}
            className="flex flex-col gap-6 rounded-3xl border border-abp-blue/10 bg-abp-cream/80 p-8 shadow-glow"
          >
            <div className="flex items-center gap-2 text-abp-gold">
              {Array.from({ length: 5 }).map((_, index) => (
                <FiStar key={index} className="w-4" />
              ))}
            </div>
            <p className="text-sm text-slate-700">“{testimonial.quote}”</p>
            <div>
              <p className="text-base font-semibold text-abp-blue">{testimonial.name}</p>
              <p className="text-xs uppercase tracking-wider text-abp-blue/60">{testimonial.role}</p>
            </div>
          </FadeInWhenVisible>
        ))}
      </div>
    </div>
  </section>
);
