// src/pages/PortfolioPage.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ProcessSection } from "../sections/ProcessSection";
import { PortafolioSection } from "@/sections/Portafolio";
import { PortafolioHeroSection } from "@/sections/PortafolioHeroSection";
import { SegurosGeneralesSection } from "@/sections/portafolio/SegurosGeneralesSection";
import { SegurosRiesgosLaboralesSection } from "@/sections/portafolio/SegurosRiesgosLaboralesSection";
import { SegurosVidaSection } from "@/sections/portafolio/SegurosVidaSection";
import { SegurosEspecialesSection } from "@/sections/portafolio/SegurosEspecialesSection";
import { ServiciosComplementariosSection } from "@/sections/portafolio/ServiciosComplementariosSection";
import { PartnersSection } from "@/sections/PartnersSection";


export const PortafolioPage = () => {
  const location = useLocation();

  useEffect(() => {
    const scrollToHash = () => {
      if (location.hash) {
        const target = document.querySelector(location.hash);
        if (target instanceof HTMLElement) {
          const NAV_OFFSET = 96;
          const targetPosition = target.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: targetPosition - NAV_OFFSET,
            behavior: "smooth",
          });
        }
      } else {
        window.scrollTo({ top: 0 });
      }
    };

    const timeout = window.setTimeout(scrollToHash, 0);
    return () => window.clearTimeout(timeout);
  }, [location]);

  return (
    <>
      <PortafolioHeroSection />
      <PartnersSection />
      <SegurosRiesgosLaboralesSection />
      <SegurosVidaSection />
      <SegurosEspecialesSection />
      <SegurosGeneralesSection />
      <ServiciosComplementariosSection />
      {/* Aquí puedes añadir un pequeño hero específico si quieres */}
      {/* El proceso ABP también encaja bien aquí */}
      <ProcessSection />
    </>
  );
};
