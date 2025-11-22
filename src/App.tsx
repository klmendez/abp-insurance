import { useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { HeroSection } from './sections/HeroSection';
import { ServicesSection } from './sections/ServicesSection';
import { PortfolioSection } from './sections/PortfolioSection';
import { ProcessSection } from './sections/ProcessSection';
import { EnterpriseServicesSection } from './sections/EnterpriseServicesSection';
import { AdvantagesSection } from './sections/AdvantagesSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { ContactSection } from './sections/ContactSection';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Modelo A · B · P', href: '#abp' },
    { label: 'Portafolio', href: '#portafolio' },
    { label: 'Proceso', href: '#proceso' },
    { label: 'Servicios empresariales', href: '#servicios-empresariales' },
    { label: 'Aliados', href: '#aliados' },
    { label: 'Contáctenos', href: '#contacto' },
  ];

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-abp-cream">
        <header className="sticky top-0 z-50 border-b border-abp-gold/40 bg-white/90 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <a href="#inicio" className="flex items-center gap-3">
              <img src="/logoV.png" alt="ABP Seguros" className="h-12 w-auto" />
              <div className="flex flex-col">
                <span className="text-lg font-semibold tracking-wide text-abp-blue">
                  ABP Agencia de Seguros Ltda.
                </span>
                <span className="text-xs text-abp-gold">
                  Aliados estratégicos de empresas y personas.
                </span>
              </div>
            </a>

            <div className="hidden items-center gap-8 md:flex">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-slate-700 transition-colors hover:text-abp-blue"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contacto"
                className="rounded-full bg-abp-blue px-5 py-2 text-sm font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5"
              >
                Quiero una asesoría
              </a>
            </div>

            <button
              className="inline-flex items-center justify-center rounded-full border border-abp-blue/40 p-2 text-abp-blue md:hidden"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="size-6"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 5.25h16.5M3.75 12h16.5M3.75 18.75h16.5"
                  />
                )}
              </svg>
            </button>
          </nav>

          {isMenuOpen && (
            <div className="border-t border-abp-gold/30 bg-white/95 px-6 py-4 md:hidden">
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-sm font-medium text-slate-700 transition-colors hover:text-abp-blue"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="#contacto"
                  className="rounded-full bg-abp-blue px-5 py-2 text-center text-sm font-semibold text-white shadow-glow"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Quiero una asesoría
                </a>
              </div>
            </div>
          )}
        </header>

        <main>
          <HeroSection />
          <ServicesSection />
          <PortfolioSection />
          <ProcessSection />
          <EnterpriseServicesSection />
          <AdvantagesSection />
          <PartnersSection />
          <TestimonialsSection />
          <PrimaryCallToActionSection />
          <ContactSection />
        </main>

        <footer className="border-t border-abp-blue/10 bg-abp-blue/95">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 text-white md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-lg font-semibold">ABP Agencia de Seguros</p>
              <p className="text-sm text-white/70">
                © {new Date().getFullYear()} ABP. Todos los derechos reservados.
              </p>
            </div>
            <div className="flex gap-6 text-sm">
              <Link to="/politica-privacidad" className="hover:text-abp-gold">
                Política de privacidad
              </Link>
              <Link to="/terminos" className="hover:text-abp-gold">
                Términos y condiciones
              </Link>
            </div>
          </div>
        </footer>
      </div>

      <Routes>
        <Route path="/politica-privacidad" element={<PlaceholderPage title="Política de privacidad" />} />
        <Route path="/terminos" element={<PlaceholderPage title="Términos y condiciones" />} />
      </Routes>
    </BrowserRouter>
  );
};

const PlaceholderPage = ({ title }: { title: string }) => (
  <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-4 px-6 text-center">
    <h1 className="text-4xl font-display text-abp-blue">{title}</h1>
    <p className="text-slate-600">
      Estamos trabajando en esta sección. Mientras tanto, regresa al{' '}
      <a href="#inicio" className="text-abp-gold underline">
        inicio
      </a>
      .
    </p>
  </main>
);

export default App;
