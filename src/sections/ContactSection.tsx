import { FadeInWhenVisible } from '@/components/FadeInWhenVisible';
import { FiPhoneCall, FiMail, FiMapPin, FiArrowRight } from 'react-icons/fi';

export const ContactSection = () => (
  <section
    id="contacto"
    className="relative overflow-hidden bg-gradient-to-br from-abp-cream via-white to-abp-light py-24"
  >
    {/* blobs decorativos */}
    <div
      className="pointer-events-none absolute top-10 -left-24 size-64 rounded-full bg-brand-horizon/25 blur-3xl"
      aria-hidden
    />
    <div
      className="pointer-events-none absolute -bottom-24 -right-16 size-80 rounded-full bg-abp-gold/18 blur-3xl"
      aria-hidden
    />

    <div className="mx-auto max-w-6xl px-6">
      <div className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] items-start">
        {/* COLUMNA: FORMULARIO (base clara) */}
        <FadeInWhenVisible className="relative overflow-hidden rounded-[28px] border border-slate-100 bg-white/90 p-10 shadow-lg backdrop-blur-md">
          <div
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(93,181,255,0.12),_transparent_65%)]"
            aria-hidden
          />

          <header className="space-y-4">
            <span className="inline-flex items-center rounded-full bg-abp-light px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-abp-blue/80">
              Contacto
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-abp-blue leading-tight">
              ¿Hablamos de la protección de tu empresa y tu familia?
            </h2>
            <p className="text-base text-slate-600">
              Cuéntanos qué necesitas proteger: tu equipo de trabajo, tu familia, tu patrimonio o tus
              proyectos. Diseñamos una propuesta integral de seguros y servicios alineada con tu realidad.
            </p>
          </header>

          <form className="mt-8 grid gap-6 md:grid-cols-2">
            <label className="md:col-span-1 space-y-2">
              <span className="text-sm font-semibold text-abp-blue">Nombre completo</span>
              <input
                type="text"
                placeholder="Tu nombre"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm transition focus:border-abp-blue focus:outline-none focus:ring-2 focus:ring-abp-gold/30"
                required
              />
            </label>

            <label className="md:col-span-1 space-y-2">
              <span className="text-sm font-semibold text-abp-blue">Correo electrónico</span>
              <input
                type="email"
                placeholder="nombre@correo.com"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm transition focus:border-abp-blue focus:outline-none focus:ring-2 focus:ring-abp-gold/30"
                required
              />
            </label>

            <label className="md:col-span-1 space-y-2">
              <span className="text-sm font-semibold text-abp-blue">Teléfono</span>
              <input
                type="tel"
                placeholder="(+57) 300 000 0000"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm transition focus:border-abp-blue focus:outline-none focus:ring-2 focus:ring-abp-gold/30"
              />
            </label>

            <label className="md:col-span-1 space-y-2">
              <span className="text-sm font-semibold text-abp-blue">Tipo de seguro</span>
              <select
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm transition focus:border-abp-blue focus:outline-none focus:ring-2 focus:ring-abp-gold/30"
              >
                <option value="">Selecciona una opción</option>
                <option value="hogar">Hogar</option>
                <option value="salud">Salud y vida</option>
                <option value="empresarial">Empresarial</option>
                <option value="auto">Vehículos</option>
                <option value="otro">Otro</option>
              </select>
            </label>

            <label className="md:col-span-2 space-y-2">
              <span className="text-sm font-semibold text-abp-blue">Mensaje</span>
              <textarea
                placeholder="Cuéntanos sobre tu interés o situación actual"
                rows={4}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm transition focus:border-abp-blue focus:outline-none focus:ring-2 focus:ring-abp-gold/30"
              />
            </label>

            <div className="md:col-span-2 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-abp-blue via-abp-sky to-abp-blue px-8 py-3 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-abp-gold/60 focus:ring-offset-2 focus:ring-offset-white"
              >
                Escribir a ABP Agencia de Seguros
                <FiArrowRight className="size-4 transition-transform group-hover:translate-x-1.5" />
              </button>
              <p className="text-xs text-slate-500 max-w-md">
                Al enviar tus datos autorizas el tratamiento de tu información para fines de asesoría y
                acompañamiento en seguros.
              </p>
            </div>
          </form>

          <p className="mt-6 text-sm text-slate-500">
            También podemos enviarte una propuesta por WhatsApp o agendar una reunión virtual según tu
            disponibilidad.
          </p>
        </FadeInWhenVisible>

        {/* COLUMNA: INFORMACIÓN DE CONTACTO (paleta media, sin cards anidadas) */}
        <FadeInWhenVisible className="relative overflow-hidden rounded-[28px] border border-abp-blue/10 bg-gradient-to-br from-abp-cream via-abp-light to-abp-cream p-10 shadow-md">
          <div
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(21,94,161,0.18),_transparent_55%)]"
            aria-hidden
          />

          <header className="space-y-3">
            <span className="inline-flex w-fit items-center rounded-full bg-abp-blue/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-abp-blue">
              Atención inmediata
            </span>
            <h3 className="text-2xl font-semibold leading-tight text-abp-navy">
              ¡Somos tu intermediario experto en riesgos laborales!
            </h3>
            <p className="text-sm text-slate-700">
              Fortalece la protección de tu empresa con gestión eficiente, cumplimiento normativo y
              acompañamiento continuo de nuestro equipo especializado.
            </p>
          </header>

          {/* Bloque líneas directas */}
          <section className="mt-8 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-abp-blue/80">
              Líneas directas
            </p>

            <div className="space-y-2">
              <a
                href="tel:+573208654369"
                className="flex items-center gap-3 text-sm text-abp-navy transition hover:text-abp-blue"
              >
                <FiPhoneCall className="size-5 text-abp-gold" />
                (+57) 320 865 4369
              </a>
              <a
                href="tel:+573005687950"
                className="flex items-center gap-3 text-sm text-abp-navy transition hover:text-abp-blue"
              >
                <FiPhoneCall className="size-5 text-abp-gold" />
                (+57) 300 568 7950
              </a>
              <a
                href="mailto:abpseguros@gmail.com"
                className="flex items-center gap-3 text-sm text-abp-navy transition hover:text-abp-blue"
              >
                <FiMail className="size-5 text-abp-gold" />
                abpseguros@gmail.com
              </a>
            </div>
          </section>

          {/* Bloque cobertura */}
          <section className="mt-6 border-t border-abp-blue/10 pt-6 space-y-3">
            <div className="flex items-start gap-3 text-sm text-slate-700">
              <FiMapPin className="size-5 text-abp-gold mt-0.5" />
              <div className="space-y-1">
                <p>Cobertura nacional con atención personalizada en tu empresa.</p>
                <p>Permítenos fortalecer tu control interno y proteger a tus colaboradores.</p>
              </div>
            </div>
          </section>

          {/* Bloque mensaje estratégico (no card anidada, solo énfasis tipográfico) */}
          <section className="mt-6 pt-4 space-y-2">
            <p className="text-sm font-semibold text-abp-gold">
              Tu aliado estratégico en la gestión de riesgos.
            </p>
            <p className="text-sm text-slate-700">
              Te acompañamos de forma continua para optimizar el acceso a prestaciones y beneficios,
              mejorando la seguridad y bienestar de tus colaboradores.
            </p>
            <p className="text-sm text-slate-700">
              <span className="font-semibold text-abp-blue">
                ¡Sin costo adicional por nuestra gestión profesional para tu empresa!
              </span>
            </p>
          </section>
        </FadeInWhenVisible>
      </div>
    </div>
  </section>
);
