import { Link } from 'react-router-dom';

export const Footer = () => (
  <footer className="border-t border-white/10 bg-brand-midnight text-white">
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-lg font-semibold">ABP Agencia de Seguros</p>
        <p className="text-sm text-white/70">© {new Date().getFullYear()} ABP. Todos los derechos reservados.</p>
      </div>
      <div className="flex gap-6 text-sm">
        <Link to="/politica-privacidad" className="hover:text-brand-aqua">
          Política de privacidad
        </Link>
        <Link to="/terminos" className="hover:text-brand-aqua">
          Términos y condiciones
        </Link>
      </div>
    </div>
  </footer>
);
