// src/pages/PortfolioPage.tsx
import { ServicesSection } from "../sections/ServicesSection";
import { ProcessSection } from "../sections/ProcessSection";
import { PortafolioSection } from "@/sections/Portafolio";
import { PortafolioHeroSection } from "@/sections/PortafolioHeroSection";


export const PortafolioPage = () => {
  return (
    <>
    <PortafolioHeroSection />
    <PortafolioSection />
      {/* Aquí puedes añadir un pequeño hero específico si quieres */}
      <ServicesSection />
      {/* El proceso ABP también encaja bien aquí */}
      <ProcessSection />
    </>
  );
};
