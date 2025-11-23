import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HeroSection } from './sections/HeroSection';
import { ServicesSection } from './sections/ServicesSection';
import { ProcessSection } from './sections/ProcessSection';
import { EnterpriseServicesSection } from './sections/EnterpriseServicesSection';
import { AdvantagesSection } from './sections/AdvantagesSection';
import { PartnersSection } from './sections/PartnersSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { PrimaryCallToActionSection } from './sections/PrimaryCallToActionSection';
import { ContactSection } from './sections/ContactSection';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsappButton } from './components/FloatingWhatsappButton';


const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-brand-sand text-abp-ink">
        <Navbar />

        <main className="relative">
          <div className="pointer-events-none absolute inset-0 bg-radial-glow/80" aria-hidden />
          <div className="relative flex flex-col gap-0 pb-20">
            <HeroSection />
            <ServicesSection />
            <ProcessSection />
            <EnterpriseServicesSection />
            <AdvantagesSection />
            <PartnersSection />
            <TestimonialsSection />
            <PrimaryCallToActionSection />
            <ContactSection />
        
          </div>
        </main>

        <Footer />
        <FloatingWhatsappButton />
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
