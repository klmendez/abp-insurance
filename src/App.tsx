// src/App.tsx
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { FloatingWhatsappButton } from "./components/FloatingWhatsappButton";

import { HomePage } from "./pages/HomePage";
import { PortafolioPage } from "./pages/PortafolioPage";
import { EnterpriseServicesPage } from "./pages/EnterpriseServicesPage";
import { ContactPage } from "./pages/ContactPage";
import { CyclistsPage } from "./pages/CyclistsPage";
import { AboutPage } from "./pages/AboutPage";
import { RiesgosLaboralesPage } from "./pages/RiesgosLaboralesPage";
import { SegurosVidaPage } from "./pages/SegurosVidaPage";
import { SegurosGeneralesPage } from "./pages/SegurosGeneralesPage";
import { RecicladoresPage } from "./pages/RecicladoresPage";
import logoFavicon from "./assets/Logo profesional parz.png";

export const App = () => {
  useEffect(() => {
    const existingFavicon = document.querySelector(
      "link[rel='icon']"
    ) as HTMLLinkElement | null;

    if (existingFavicon) {
      existingFavicon.href = logoFavicon;
    } else {
      const faviconLink = document.createElement("link");
      faviconLink.rel = "icon";
      faviconLink.href = logoFavicon;
      document.head.appendChild(faviconLink);
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="flex-1 flex-col">
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/portafolio" element={<PortafolioPage />} />
            <Route
              path="/portafolio/riesgos-laborales"
              element={<RiesgosLaboralesPage />}
            />
            <Route
              path="/portafolio/seguros-vida"
              element={<SegurosVidaPage />}
            />
            <Route
              path="/portafolio/seguros-generales"
              element={<SegurosGeneralesPage />}
            />
            <Route
              path="/portafolio/recicladores"
              element={<RecicladoresPage />}
            />
            <Route
              path="/servicios-empresariales"
              element={<EnterpriseServicesPage />}
            />
            <Route path="/sobre-nosotros" element={<AboutPage />} />
            <Route path="/contacto" element={<ContactPage />} />
            <Route path="/ciclistas" element={<CyclistsPage />} />
          </Routes>
        </main>

        <Footer />
        <FloatingWhatsappButton />
      </div>
    </BrowserRouter>
  );
};
