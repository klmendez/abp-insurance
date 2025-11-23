import { useEffect, useState } from "react";

type NavItem = {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
};

const navItems: NavItem[] = [
  { label: "Inicio", href: "#inicio" },
  {
    label: "Servicios",
    children: [
      { label: "Portafolio integral", href: "#portafolio" },
      { label: "Servicios empresariales", href: "#servicios-empresariales" },
    ],
  },
  { label: "Proceso", href: "#proceso" },
  { label: "Aliados", href: "#aliados" },
  { label: "Contáctenos", href: "#contacto" },
];

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState("#inicio");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let current = "#inicio";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.top > -rect.height + 150) {
          current = `#${section.id}`;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

        {/* LOGO */}
        <a href="#inicio" className="flex items-center gap-3">
          <img src="/logoV.png" alt="ABP Seguros" className="h-9 w-auto" />
          <div className="leading-tight">
            <span className="text-xl font-semibold text-abp-blue">ABP</span>
            <span className="block text-[0.78rem] text-slate-500">
              Agencia de Seguros Ltda.
            </span>
          </div>
        </a>

        {/* NAV DESKTOP */}
        <div className="hidden flex-1 items-center justify-end gap-8 md:flex">
          <div className="flex items-center gap-7 text-sm">

            {navItems.map((item) => {
              if (item.children) {
                return (
                  <div key={item.label} className="relative group">
                    <button className="flex flex-col items-center text-sm font-medium text-slate-700 hover:text-abp-blue">
                      {item.label}

                      {/* Underline */}
                      <span
                        className={`
                          mt-1 h-[3px] w-full rounded-full bg-abp-blue transition-all duration-200
                          ${
                            activeSection.includes("servicios")
                              ? "opacity-100"
                              : "opacity-0 group-hover:opacity-50"
                          }
                        `}
                      />
                    </button>

                    {/* DROPDOWN */}
                    <div
                      className="
                        absolute left-0 top-full mt-1 w-60
                        rounded-2xl border border-slate-200 bg-white shadow-lg
                        opacity-0 translate-y-2 pointer-events-none
                        transition-all duration-200
                        group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto
                      "
                    >
                      <ul className="py-2">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <a
                              href={child.href}
                              className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-abp-blue"
                            >
                              {child.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              }

              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="group flex flex-col items-center text-sm font-medium text-slate-700 hover:text-abp-blue"
                >
                  {item.label}
                  <span
                    className={`
                      mt-1 h-[3px] w-full rounded-full bg-abp-blue transition-all duration-200
                      ${
                        activeSection === item.href
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-50"
                      }
                    `}
                  />
                </a>
              );
            })}
          </div>
        </div>

        {/* MOBILE MENU BTN */}
        <button
          className="md:hidden p-2 rounded-lg border border-slate-200 text-abp-blue"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ≡
        </button>
      </nav>
    </header>
  );
};
