import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { FiPhoneCall, FiMail, FiMapPin, FiArrowRight } from "react-icons/fi";

export const ContactSection = () => (
  <section id="contacto" className="bg-[#f4f6ff] py-16">
    <div className="mx-auto max-w-6xl px-6">

      {/* HEADER GENERAL */}
      <FadeInWhenVisible className="mx-auto max-w-3xl text-center">
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-abp-blue/80">
          Contacto
        </span>
        <h2 className="mt-2 text-3xl font-display text-abp-blue md:text-4xl">
          ¿Hablamos de la protección de tu empresa y tu familia?
        </h2>
        <p className="mt-3 text-sm text-slate-600 md:text-base">
          Cuéntanos qué necesitas proteger: tu equipo de trabajo, tu familia, tu
          patrimonio o tus proyectos. Te respondemos con una propuesta clara y
          sin letra pequeña.
        </p>
      </FadeInWhenVisible>

      <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr,1.1fr] items-start">

        {/* COLUMNA IZQUIERDA */}
        <FadeInWhenVisible className="rounded-2xl border border-abp-blue/15 bg-white/90 px-6 py-6 shadow-sm md:px-7 md:py-7">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-abp-blue/80">
            Atención directa
          </p>
          <h3 className="mt-2 text-xl font-semibold text-abp-blue">
            Tu aliado en riesgos laborales y seguros de personas
          </h3>
          <p className="mt-3 text-sm text-slate-700">
            Podemos asesorarte en seguros de vida, riesgos laborales, seguros
            generales y portafolios especializados para ciclistas.
          </p>

          {/* LÍNEAS DIRECTAS */}
          <div className="mt-5 space-y-3 text-sm text-abp-blue">
            <div className="flex items-center gap-3">
              <FiPhoneCall className="h-5 w-5 text-abp-gold" />
              <a href="tel:+573208654369" className="hover:text-abp-blue/80">
                (+57) 320 865 4369
              </a>
            </div>
            <div className="flex items-center gap-3">
              <FiPhoneCall className="h-5 w-5 text-abp-gold" />
              <a href="tel:+573005687950" className="hover:text-abp-blue/80">
                (+57) 300 568 7950
              </a>
            </div>
            <div className="flex items-center gap-3">
              <FiPhoneCall className="h-5 w-5 text-abp-gold" />
              <a href="tel:+573185170013" className="hover:text-abp-blue/80">
                (+57) 318 517 0013
              </a>
            </div>
            <div className="flex items-center gap-3">
              <FiMail className="h-5 w-5 text-abp-gold" />
              <a
                href="mailto:apbsegurosltda@gmail.com"
                className="hover:text-abp-blue/80 break-all"
              >
                apbsegurosltda@gmail.com
              </a>
            </div>
          </div>

          {/* UBICACIÓN */}
          <div className="mt-5 border-t border-abp-blue/10 pt-4 text-sm text-slate-700">
            <div className="flex items-start gap-3">
              <FiMapPin className="mt-0.5 h-5 w-5 text-abp-gold" />
              <p>
                Cobertura nacional con atención personalizada para empresas,
                profesionales independientes y familias.
              </p>
            </div>
          </div>

          <p className="mt-4 text-[0.8rem] text-slate-600">
            También podemos coordinar una reunión virtual o una visita a tu
            empresa para revisar tu situación actual.
          </p>
        </FadeInWhenVisible>

        {/* COLUMNA DERECHA: FORMULARIO */}
        <FadeInWhenVisible className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white px-6 py-7 shadow-md md:px-8 md:py-8">
          <div
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.12),_transparent_60%)]"
            aria-hidden
          />

          <header className="space-y-2">
            <p className="text-sm font-semibold text-abp-blue">Envíanos un mensaje</p>
            <p className="text-xs text-slate-600">
              Responde estas preguntas breves y te contactaremos con una
              propuesta a la medida.
            </p>
          </header>

          {/* FORMULARIO NETLIFY FORMS */}
          <form
            name="contacto-abp"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            className="mt-6 grid gap-5 md:grid-cols-2"
          >
            {/* Campo oculto requerido */}
            <input type="hidden" name="form-name" value="contacto-abp" />

            {/* Honeypot anti-bots */}
            <p className="hidden">
              <label>
                No llenar este campo: <input name="bot-field" />
              </label>
            </p>

            <label className="md:col-span-1 space-y-1.5">
              <span className="text-sm font-semibold text-abp-blue">Nombre completo</span>
              <input
                type="text"
                name="nombre"
                placeholder="Tu nombre"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm transition focus:border-abp-blue focus:outline-none focus:ring-2 focus:ring-abp-blue/20"
                required
              />
            </label>

            <label className="md:col-span-1 space-y-1.5">
              <span className="text-sm font-semibold text-abp-blue">Correo electrónico</span>
              <input
                type="email"
                name="correo"
                placeholder="nombre@correo.com"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm transition focus:border-abp-blue focus:outline-none focus:ring-2 focus:ring-abp-blue/20"
                required
              />
            </label>

            <label className="md:col-span-1 space-y-1.5">
              <span className="text-sm font-semibold text-abp-blue">Teléfono</span>
              <input
                type="tel"
                name="telefono"
                placeholder="(+57) 300 000 0000"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm transition focus:border-abp-blue focus:outline-none focus:ring-2 focus:ring-abp-blue/20"
              />
            </label>

            <label className="md:col-span-1 space-y-1.5">
              <span className="text-sm font-semibold text-abp-blue">¿Qué quieres proteger?</span>
              <select
                name="proteccion"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm transition focus:border-abp-blue focus:outline-none focus:ring-2 focus:ring-abp-blue/20"
              >
                <option value="">Selecciona una opción</option>
                <option value="empresa">Mi empresa / negocio</option>
                <option value="equipo">Mi equipo de trabajo</option>
                <option value="familia">Mi familia y patrimonio</option>
                <option value="ciclistas">Portafolio para ciclistas</option>
                <option value="otro">Otro</option>
              </select>
            </label>

            <label className="md:col-span-2 space-y-1.5">
              <span className="text-sm font-semibold text-abp-blue">Mensaje</span>
              <textarea
                name="mensaje"
                placeholder="Cuéntanos brevemente tu situación o lo que te gustaría revisar."
                rows={4}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm transition focus:border-abp-blue focus:outline-none focus:ring-2 focus:ring-abp-blue/20"
              />
            </label>

            <div className="md:col-span-2 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <button type="submit" className="btn-modern group">
                Enviar mensaje a ABP
                <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
              </button>
              <p className="max-w-md text-[0.7rem] text-slate-500">
                Al enviar tus datos autorizas el tratamiento de tu información
                para fines de asesoría y acompañamiento en seguros.
              </p>
            </div>
          </form>
        </FadeInWhenVisible>
      </div>
    </div>
  </section>
);
