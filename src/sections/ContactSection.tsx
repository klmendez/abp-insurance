import { FadeInWhenVisible } from '@/components/FadeInWhenVisible';
import { FiPhoneCall, FiMail, FiMapPin } from 'react-icons/fi';

export const ContactSection = () => (
  <section id="contacto" className="bg-abp-cream py-24">
    <div className="mx-auto max-w-6xl px-6">
      <div className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr]">
        <FadeInWhenVisible className="space-y-10 rounded-3xl border border-abp-blue/10 bg-white p-10 shadow-glow">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.35em] text-abp-blue/70">
              Contacto
            </span>
            <h2 className="mt-4 text-3xl font-bold text-abp-blue md:text-4xl">
              ¿Hablamos de la protección de tu empresa y tu familia?
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Cuéntanos qué necesitas proteger: tu equipo de trabajo, tu familia, tu patrimonio o tus
              proyectos. Diseñamos una propuesta integral de seguros y servicios alineada con tu
              realidad.
            </p>
          </div>

          <form className="grid gap-6 md:grid-cols-2">
            <label className="md:col-span-1">
              <span className="text-sm font-semibold text-abp-blue">Nombre completo</span>
              <input
                type="text"
                placeholder="Tu nombre"
                className="mt-2 w-full rounded-xl border border-abp-blue/20 bg-white/80 px-4 py-3 text-sm text-slate-700 focus:border-abp-blue focus:outline-none focus:ring-2 focus:ring-abp-blue/10"
              />
            </label>
            <label className="md:col-span-1">
              <span className="text-sm font-semibold text-abp-blue">Correo electrónico</span>
              <input
                type="email"
                placeholder="nombre@correo.com"
                className="mt-2 w-full rounded-xl border border-abp-blue/20 bg-white/80 px-4 py-3 text-sm text-slate-700 focus:border-abp-blue focus:outline-none focus:ring-2 focus:ring-abp-blue/10"
              />
            </label>
            <label className="md:col-span-1">
              <span className="text-sm font-semibold text-abp-blue">Teléfono</span>
              <input
                type="tel"
                placeholder="(+57) 300 000 0000"
                className="mt-2 w-full rounded-xl border border-abp-blue/20 bg-white/80 px-4 py-3 text-sm text-slate-700 focus:border-abp-blue focus:outline-none focus:ring-2 focus:ring-abp-blue/10"
              />
            </label>
            <label className="md:col-span-1">
              <span className="text-sm font-semibold text-abp-blue">Tipo de seguro</span>
              <select
                className="mt-2 w-full rounded-xl border border-abp-blue/20 bg-white/80 px-4 py-3 text-sm text-slate-700 focus:border-abp-blue focus:outline-none focus:ring-2 focus:ring-abp-blue/10"
              >
                <option value="hogar">Hogar</option>
                <option value="salud">Salud y vida</option>
                <option value="empresarial">Empresarial</option>
                <option value="auto">Vehículos</option>
                <option value="otro">Otro</option>
              </select>
            </label>
            <label className="md:col-span-2">
              <span className="text-sm font-semibold text-abp-blue">Mensaje</span>
              <textarea
                placeholder="Cuéntanos sobre tu interés o situación actual"
                rows={4}
                className="mt-2 w-full rounded-xl border border-abp-blue/20 bg-white/80 px-4 py-3 text-sm text-slate-700 focus:border-abp-blue focus:outline-none focus:ring-2 focus:ring-abp-blue/10"
              />
            </label>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full rounded-full bg-abp-blue px-8 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:-translate-y-1 md:w-auto"
              >
                Escribir a ABP Agencia de Seguros
              </button>
            </div>
          </form>
          <p className="text-sm text-slate-500">
            También podemos enviarte una propuesta por WhatsApp o agendar una reunión virtual.
          </p>
        </FadeInWhenVisible>

        <FadeInWhenVisible className="space-y-8 rounded-3xl border border-abp-blue/10 bg-abp-blue p-10 text-white">
          <h3 className="text-2xl font-semibold">¡Somos tu intermediario experto en riesgos laborales!</h3>
          <p className="text-sm text-white/80">
            Fortalece la protección de tu empresa con gestión eficiente, cumplimiento normativo y
            acompañamiento continuo de nuestro equipo especializado.
          </p>

          <div className="space-y-6">
            <a href="tel:+573208654369" className="flex items-center gap-3 text-sm">
              <FiPhoneCall className="size-5 text-abp-gold" />
              (+57) 320 865 4369
            </a>
            <a href="tel:+573005687950" className="flex items-center gap-3 text-sm">
              <FiPhoneCall className="size-5 text-abp-gold" />
              (+57) 300 568 7950
            </a>
            <a href="mailto:abpseguros@gmail.com" className="flex items-center gap-3 text-sm">
              <FiMail className="size-5 text-abp-gold" />
              abpseguros@gmail.com
            </a>
            <div className="flex items-start gap-3 text-sm">
              <FiMapPin className="size-5 text-abp-gold" />
              <div>
                Cobertura nacional con atención personalizada en tu empresa.
                <br /> Permítenos fortalecer tu control interno y proteger a tus colaboradores.
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/10 p-6 text-sm">
            <p className="font-semibold text-abp-gold">Tu aliado estratégico</p>
            <p className="mt-2 text-white/80">
              Gestión eficiente y acompañamiento continuo para optimizar el acceso a prestaciones.
            </p>
            <p className="text-white/80">¡Cero costo adicional por nuestra gestión profesional!</p>
          </div>
        </FadeInWhenVisible>
      </div>
    </div>
  </section>
);
