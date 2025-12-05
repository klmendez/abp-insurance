// src/pages/CyclistsPage.tsx
import { CyclistsHeroSection } from "@/sections/cyclists/CyclistsHeroSection";
import { CyclistsCalculatorSection } from "@/sections/cyclists/CyclistsCalculatorSection";
import { faqItems } from "@/sections/cyclists/cyclistsContent";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { FiArrowRight } from "react-icons/fi";

export const CyclistsPage = () => {
  return (
    <>
      <CyclistsHeroSection />
      <section id="productos" className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <FadeInWhenVisible className="space-y-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-abp-blue/70">
              ¿Qué cubrimos?
            </p>
            <h2 className="text-3xl font-semibold text-abp-blue md:text-4xl">
              Planes flexibles para tu bici, tu vida y tus viajes.
            </h2>
            <p className="text-base text-slate-600">
              Comienza calculando una prima referencial; luego un asesor ABP ajustará valores, aseguradoras y asistencias según tu realidad.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="#calculadora"
                className="inline-flex items-center gap-2 rounded-full bg-abp-blue px-6 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-white hover:bg-abp-blue/90"
              >
                Ir a la calculadora
                <FiArrowRight className="size-4" />
              </a>
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 rounded-full border border-abp-blue/30 px-6 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-abp-blue hover:border-abp-blue/60"
              >
                Solicitar asesoría
              </a>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
      <CyclistsCalculatorSection />
      <section id="faq" className="bg-white py-24">
        <div className="mx-auto max-w-5xl px-6">
          <FadeInWhenVisible className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.26em] text-abp-blue/70">
              Preguntas frecuentes
            </span>
            <h2 className="mt-3 text-3xl font-semibold text-abp-blue md:text-4xl">
              Todo lo que nos preguntan los ciclistas al empezar.
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Acompañamos a riders que ruedan en ciudad, montaña y eventos. Si tienes otra duda, escríbenos y lo vemos juntos.
            </p>
          </FadeInWhenVisible>

          <div className="mt-10 space-y-4">
            {faqItems.map((faq) => (
              <FadeInWhenVisible key={faq.question}>
                <details className="group rounded-2xl border border-slate-200 bg-abp-cream px-6 py-5 text-slate-700">
                  <summary className="flex cursor-pointer items-center justify-between text-base font-semibold text-abp-blue">
                    {faq.question}
                    <FiArrowRight className="ml-3 size-4 text-abp-blue transition group-open:rotate-90" />
                  </summary>
                  <p className="mt-4 text-sm text-slate-600">{faq.answer}</p>
                </details>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="bg-gradient-to-br from-abp-navy via-abp-blue to-abp-midnight py-24 text-white">
        <div className="mx-auto max-w-5xl px-6">
          <FadeInWhenVisible className="rounded-3xl border border-abp-gold/30 bg-white/10 px-8 py-12 backdrop-blur">
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-abp-gold/90">
              Agenda tu asesoría para ciclistas
            </span>
            <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
              Cuéntanos cómo montas, qué bici tienes y a qué eventos asistes.
            </h2>
            <p className="mt-4 text-base text-slate-100/85">
              Armamos juntos la mejor combinación de seguros para que tu única preocupación sea disfrutar la ruta. También podemos enviarte una propuesta por WhatsApp o correo.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="mailto:abpseguros@gmail.com"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-abp-blue hover:bg-slate-100"
              >
                Escribir a ABP Agencia de Seguros
                <FiArrowRight className="size-4" />
              </a>
              <a
                href="https://wa.me/573102885625"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-abp-gold/60 px-5 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/85 hover:border-abp-gold"
              >
                Recibir propuesta por WhatsApp
              </a>
            </div>
          </FadeInWhenVisible>

          <p className="mt-10 text-center text-xs text-slate-300">
            © 2025 ABP Agencia de Seguros Ltda. · Portafolio ciclistas
          </p>
        </div>
      </section>
    </>
  );
};
