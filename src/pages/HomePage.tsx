// src/pages/HomePage.tsx
import { HeroSection } from "../sections/HeroSection";
import { PrimaryCallToActionSection } from "../sections/PrimaryCallToActionSection";
import { TestimonialsSection } from "../sections/TestimonialsSection";
import { ContactSection } from "../sections/ContactSection";

export const HomePage = () => {
  return (
    <>
      <HeroSection />
      <PrimaryCallToActionSection />
      
      <TestimonialsSection />
      {/* Contacto como cierre suave, no súper largo */}
      <ContactSection />
    </>
  );
};
