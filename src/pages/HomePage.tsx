// src/pages/HomePage.tsx
import { HeroSection } from "../sections/HeroSection";
import { PrimaryCallToActionSection } from "../sections/PrimaryCallToActionSection";
import { InsuranceNamesCarouselSection } from "../sections/InsuranceNamesCarouselSection";
import { TestimonialsSection } from "../sections/TestimonialsSection";
import { ContactSection } from "../sections/ContactSection";
import { ServicesSection } from "../sections/ServicesSection";
import { PartnersSection } from "../sections/PartnersSection";

export const HomePage = () => {
  return (
    <>
      <HeroSection />
      <InsuranceNamesCarouselSection />
      <ServicesSection />
            <PartnersSection />
      
   <PrimaryCallToActionSection />

      <TestimonialsSection />
      {/* Contacto como cierre suave, no súper largo */}
      <ContactSection />
    </>
  );
};
