import { Link } from "react-router-dom";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-abp-blue/15 bg-[#020617] text-slate-200">
      {/* FILA PRINCIPAL */}
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-8 md:flex-row md:items-start md:justify-between">
        {/* Marca + tagline */}
        <div className="space-y-2">
          <p className="text-base font-semibold tracking-[0.18em] text-white md:text-lg">
            ABP AGENCIA DE SEGUROS LTDA.
          </p>
          <p className="text-sm text-slate-400">
            Acompañamiento, bienestar y protección para empresas, personas y
            proyectos de vida.
          </p>
        </div>

        {/* Navegación rápida */}
        <div className="flex flex-wrap gap-8 text-sm md:gap-10">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              Navegación
            </p>
            <div className="flex flex-col gap-1.5">
              <Link to="/portafolio" className="hover:text-white">
                Portafolio
              </Link>
              <Link to="/servicios-empresariales" className="hover:text-white">
                Servicios empresariales
              </Link>
              <Link to="/ciclistas" className="hover:text-white">
                Ciclistas
              </Link>
              <Link to="/aliados" className="hover:text-white">
                Aliados
              </Link>
            </div>
          </div>

          {/* Contacto */}
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              Contacto
            </p>
            <div className="flex flex-col gap-1.5 text-sm">
              <a
                href="mailto:abpseguros@gmail.com"
                className="hover:text-white"
              >
                abpseguros@gmail.com
              </a>
              <a href="https://wa.me/57" className="hover:text-white">
                WhatsApp · Asesoría sin costo
              </a>
              <a href="#contacto" className="hover:text-white">
                Formulario de contacto
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Fila inferior legal */}
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-4 text-[0.7rem] text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} ABP Agencia de Seguros Ltda. Todos los derechos
            reservados.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/politica-privacidad" className="hover:text-slate-300">
              Política de privacidad
            </Link>
            <Link to="/terminos" className="hover:text-slate-300">
              Términos y condiciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
