// src/pages/CyclistsPage.tsx
import { CyclistsHeroSection } from "@/sections/cyclists/CyclistsHeroSection";
import { CyclistsCalculatorSection } from "@/sections/cyclists/CyclistsCalculatorSection";
import { faqItems } from "@/sections/cyclists/cyclistsContent";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { FiArrowRight } from "react-icons/fi";

export const CyclistsPage = () => {
  const whatsappUrl =
    "https://api.whatsapp.com/send?phone=573208654369&text=Hola%2C%20quiero%20hablar%20sobre%20seguro%20ABP%20para%20mi%20bici.";

  return (
    <>
      <CyclistsHeroSection />

      {/* PRODUCTOS */}
      <section id="productos" className="bg-white py-16 text-slate-900">
        <div className="mx-auto max-w-4xl px-6">
          <FadeInWhenVisible className="space-y-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              ¿Qué cubrimos?
            </p>

            <h2 className="text-3xl font-semibold text-abp-blue md:text-4xl">
              Planes flexibles para tu bici, tu vida y tus viajes.
            </h2>

            <p className="text-base leading-relaxed text-slate-600">
              Comienza calculando una prima referencial; luego un asesor ABP ajustará valores,
              aseguradoras y asistencias según tu realidad.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="#calculadora"
                className="btn-modern inline-flex items-center gap-2 !bg-abp-gold !text-[#1f2a44]"
              >
                Ir a la calculadora
                <FiArrowRight className="size-4" />
              </a>

              <a
                href="#contacto"
                className="btn-modern inline-flex items-center gap-2 !bg-white !text-[#1f2a44] ring-1 ring-slate-300 hover:!bg-slate-50"
              >
                Solicitar asesoría
              </a>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      <CyclistsCalculatorSection />

      {/* FAQ */}
      <section id="faq" className="bg-slate-50 py-24 text-slate-900">
        <div className="mx-auto max-w-5xl px-6">
          <FadeInWhenVisible className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
              Preguntas frecuentes
            </span>

            <h2 className="mt-3 text-3xl font-semibold text-abp-blue md:text-4xl">
              Todo lo que nos preguntan los ciclistas al empezar.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Acompañamos a riders que ruedan en ciudad, montaña y eventos. Si tienes otra duda,
              escríbenos y lo vemos juntos.
            </p>
          </FadeInWhenVisible>

          <div className="mt-10 space-y-4">
            {faqItems.map((faq) => (
              <FadeInWhenVisible key={faq.question}>
                <details className="group rounded-2xl border border-slate-200 bg-white px-6 py-5 text-slate-700 shadow-sm transition hover:border-slate-300">
                  <summary className="flex cursor-pointer items-center justify-between text-base font-semibold text-abp-blue">
                    {faq.question}
                    <FiArrowRight className="ml-3 size-4 text-abp-blue transition group-open:rotate-90" />
                  </summary>

                  <p className="mt-4 text-sm leading-relaxed text-slate-600">
                    {faq.answer}
                  </p>
                </details>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section
        id="contacto"
        className="
          bg-gradient-to-br
          from-[#0b1324]
          via-[#111c33]
          to-[#0e1a2f]
          py-24
          text-white
        "
      >
        <div className="mx-auto max-w-5xl px-6">
          <FadeInWhenVisible className="max-w-3xl">
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-white/65">
              Agenda tu asesoría para ciclistas
            </span>

            <h2 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
              Cuéntanos cómo montas, qué bici tienes y a qué eventos asistes.
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Armamos juntos la mejor combinación de seguros para que tu única preocupación sea
              disfrutar la ruta. También podemos enviarte una propuesta por WhatsApp o correo.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/contacto"
                className="btn-modern inline-flex items-center gap-2 !bg-abp-gold !text-[#1f2a44]"
              >
                Escribir a ABP
                <FiArrowRight className="size-4" />
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-modern inline-flex items-center gap-2 !bg-white/90 !text-[#1f2a44] ring-1 ring-white/50 hover:!bg-white"
              >
                WhatsApp
              </a>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </>
  );
};
