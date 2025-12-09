import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { FiStar } from "react-icons/fi";

const testimonials = [
  {
    name: "Andrés García",
    role: "Emprendedor",
    quote:
      "Me guiaron paso a paso para contratar mi seguro de salud familiar. La tranquilidad que tengo hoy no tiene precio.",
    avatar:
      "https://img.freepik.com/foto-gratis/joven-hombre-barbudo-camisa-rayas_273609-5677.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    name: "María López",
    role: "Directora de RRHH, Grupo Nova",
    quote:
      "ABP nos brindó una solución corporativa a la medida. Su equipo respondió con rapidez a cada siniestro y nos acompaña en las decisiones clave.",
    avatar:
      "https://img.freepik.com/foto-gratis/estilo-vida-emociones-gente-concepto-casual-confiado-agradable-sonriente-mujer-asiatica-brazos-cruzados-pecho-seguro-listo-ayudar-escuchando-companeros-trabajo-participando-conversacion_1258-59335.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    name: "Francisco Arboleda",
    role: "Comandante de Bomberos Popayán",
    quote:
      "Gracias a ABP reforzamos la protección de nuestras brigadas. Su equipo entiende los riesgos de primera línea y actúa con compromiso total.",
    avatar:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80",
  },
];

export const TestimonialsSection = () => (
  <section id="testimonios" className="bg-[#f4f6ff] py-12">
    <div className="mx-auto max-w-6xl px-6">
      <FadeInWhenVisible className="mx-auto max-w-2xl text-center">
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-abp-blue/80">
          Testimonios
        </span>
        <h2 className="mt-2 text-2xl font-bold text-abp-blue md:text-[1.9rem]">
          La confianza de quienes aseguramos cada día
        </h2>
        <p className="mt-2 text-sm text-slate-600 md:text-[0.95rem]">
          Voces de personas y empresas que hoy sienten respaldo en sus decisiones
          de protección.
        </p>
      </FadeInWhenVisible>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <FadeInWhenVisible key={t.name} className="flex justify-center">
            <div className="relative w-full max-w-sm">
              {/* AVATAR REDONDO SUPERIOR */}
              <div className="absolute -top-10 left-1/2 z-10 -translate-x-1/2">
                <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-[#f4f6ff] bg-slate-200 shadow-md">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* TARJETA */}
              <div className="rounded-3xl border border-abp-blue/12 bg-white px-6 pb-5 pt-12 shadow-sm">
                <p className="text-center text-base font-semibold text-abp-blue">
                  {t.name}
                </p>
                <p className="text-center text-[0.7rem] uppercase tracking-[0.16em] text-abp-blue/60">
                  {t.role}
                </p>

                <div className="mt-4 border-t border-slate-200 pt-4">
                  <div className="flex items-center justify-center gap-1.5 text-abp-blue/80">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FiStar key={i} className="h-3.5 w-3.5" />
                    ))}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700 text-center">
                    “{t.quote}”
                  </p>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        ))}
      </div>
    </div>
  </section>
);
