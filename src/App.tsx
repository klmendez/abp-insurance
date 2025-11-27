// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { FloatingWhatsappButton } from "./components/FloatingWhatsappButton";

import { HomePage } from "./pages/HomePage";
import { PortafolioPage } from "./pages/PortafolioPage";
import { EnterpriseServicesPage } from "./pages/EnterpriseServicesPage";
import { PartnersPage } from "./pages/PartnersPage";
import { ContactPage } from "./pages/ContactPage";
import { CyclistsPage } from "./pages/CyclistsPage";

export const App = () => {
  return (
    <BrowserRouter>
      <div className="flex-1 flex-col">
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/portafolio" element={<PortafolioPage />} />
            <Route
              path="/servicios-empresariales"
              element={<EnterpriseServicesPage />}
            />
            <Route path="/aliados" element={<PartnersPage />} />
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
