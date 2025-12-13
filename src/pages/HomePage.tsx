// src/pages/HomePage.tsx
import { HeroSection } from "../sections/HeroSection";
import { PrimaryCallToActionSection } from "../sections/PrimaryCallToActionSection";
import { InsuranceNamesCarouselSection } from "../sections/InsuranceNamesCarouselSection";
import { TestimonialsSection } from "../sections/TestimonialsSection";
import { ContactSection } from "../sections/ContactSection";
import { ServicesSection } from "../sections/ServicesSection";
import { PartnersSection } from "../sections/PartnersSection";
import { ComplexityComparisonSection } from "../sections/ComplexityComparisonSection";

export const HomePage = () => {
  return (
    <>
      <HeroSection />
      <InsuranceNamesCarouselSection />
      <ServicesSection />

      <PartnersSection />
      <ComplexityComparisonSection />

      <PrimaryCallToActionSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
};
