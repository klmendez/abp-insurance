import { Link } from "react-router-dom";
import footerBg from "../bg/all.png";

export const Footer = () => {
  const year = new Date().getFullYear();

  const linkClass =
    "text-white/80 no-underline visited:text-white/80 hover:text-abp-gold focus:text-abp-gold active:text-abp-gold transition";

  return (
    <footer className="relative mt-16 text-white">

      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat bg-[center_70%]"
        style={{ backgroundImage: `url(${footerBg})` }}
        aria-hidden="true"
      />

      {/* Overlay oscuro (SIN azul) */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-b
          from-black/90
          via-black/70
          to-black/85
        "
        aria-hidden="true"
      />

      <div className="relative z-10">

        {/* Contenido principal */}
        <div className="mx-auto max-w-6xl px-6 py-10 md:py-12">
          <div className="flex flex-col gap-10 md:flex-row md:justify-between">

            {/* Marca */}
            <div className="max-w-md space-y-3">
              <p className="text-sm md:text-base font-semibold tracking-[0.18em] uppercase text-abp-gold">
                ABP AGENCIA DE SEGUROS LTDA.
              </p>
              <p className="text-sm md:text-[0.95rem] text-white/85 leading-relaxed">
                Acompañamiento, bienestar y protección para empresas, personas y
                proyectos de vida.
              </p>
            </div>

            {/* Navegación + contacto */}
            <div className="flex flex-wrap gap-10 text-sm md:gap-16">

              {/* Navegación */}
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-abp-gold">
                  Navegación
                </p>
                <div className="flex flex-col gap-1.5">
                  <Link to="/portafolio" className={linkClass}>
                    Portafolio
                  </Link>
                  <Link to="/servicios-empresariales" className={linkClass}>
                    Servicios complementarios
                  </Link>
                  <Link to="/portafolio#linea-seguros-especiales" className={linkClass}>
                    Seguros Especiales
                  </Link>
                  
                </div>
              </div>

              {/* Contacto */}
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-abp-gold">
                  Contacto
                </p>
                <div className="flex flex-col gap-1.5">
                  <a href="mailto:abpseguros@gmail.com" className={linkClass}>
                    abpseguros@gmail.com
                  </a>
                  <a
                    href="https://wa.me/57"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    WhatsApp · Asesoría sin costo
                  </a>
                  <a href="#contacto" className={linkClass}>
                    Formulario de contacto
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="border-t border-white/15 bg-black/50">
          <div className="mx-auto max-w-6xl px-6 py-4 flex flex-col gap-2 text-[0.72rem] text-white/70 md:flex-row md:justify-between">
            <p>
              © {year} ABP Agencia de Seguros Ltda. Todos los derechos reservados.
            </p>
            <div className="flex gap-4">
              <Link to="/politica-privacidad" className={linkClass}>
                Política de privacidad
              </Link>
              <Link to="/terminos" className={linkClass}>
                Términos y condiciones
              </Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
