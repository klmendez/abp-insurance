import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import logoV from "../assets/Logo profesional parz.png";

const portfolioSections = [
  { label: "Riesgos laborales", to: "/portafolio#linea-riesgos-laborales" },
  { label: "Seguros de vida", to: "/portafolio#linea-seguros-vida" },
  { label: "Seguros especiales", to: "/portafolio#linea-seguros-especiales" },
  { label: "Seguros generales", to: "/portafolio#linea-seguros-generales" },
  { label: "Servicios complementarios", to: "/portafolio#linea-servicios-complementarios" }
];

const navItems = [
  { label: "Inicio", to: "/" },
  { label: "Portafolio", to: "/portafolio", children: portfolioSections },
  { label: "Servicios empresariales", to: "/servicios-empresariales" },
  { label: "Ciclistas", to: "/ciclistas" },
  { label: "Sobre nosotros", to: "/sobre-nosotros" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logoV} className="h-12 w-auto" alt="Logo" />
          <div className="leading-tight">
            <span className="block text-xs tracking-widest">Agencia de</span>
            <span className="block text-xs tracking-wide font-semibold">
              Seguros <span className="text-abp-blue">LTDA.</span>
            </span>
          </div>
        </Link>

        {/* MENU DESKTOP */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <div key={item.to} className="relative group">
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition hover:text-abp-blue 
                   ${isActive ? "text-abp-blue" : "text-slate-600"}`
                }
              >
                {item.label}
                {item.children && (
                  <FiChevronDown className="inline-block ml-1 text-slate-500 group-hover:text-abp-blue transition" />
                )}
              </NavLink>

              {/* SUBMENÚ */}
              {item.children && (
                <div className="
                  absolute left-0 mt-2 hidden group-hover:block
                  bg-white border border-slate-200 rounded-xl shadow-lg
                  w-56 p-2 animate-fadeIn
                ">
                  {item.children.map((child) => (
                    <Link
                      key={child.to}
                      to={child.to}
                      className="block px-4 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 hover:text-abp-blue transition"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link
            to="/contacto"
            className="rounded-full bg-abp-blue px-5 py-2 text-xs font-semibold tracking-widest text-white hover:bg-abp-blue/90"
          >
            CONTACTO
          </Link>
        </nav>

        {/* BOTÓN MOBILE */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 border rounded-lg bg-white"
        >
          {open ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {/* MENÚ MOBILE */}
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 animate-slideDown">
          <nav className="px-6 py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <div key={item.to}>
                <div className="flex justify-between items-center">
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `text-sm font-medium py-2
                       ${isActive ? "text-abp-blue" : "text-slate-700"}`
                    }
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </NavLink>

                  {item.children && (
                    <button
                      onClick={() =>
                        setDropdown((prev) => (prev === item.label ? null : item.label))
                      }
                    >
                      <FiChevronDown
                        className={`transition-transform ${
                          dropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>

                {/* SUBMENÚ MOBILE */}
                {dropdown === item.label && item.children && (
                  <div className="ml-4 mt-1 flex flex-col gap-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.to}
                        to={child.to}
                        onClick={() => setOpen(false)}
                        className="py-2 text-sm text-slate-600 hover:text-abp-blue"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link
              to="/contacto"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full bg-abp-blue px-4 py-2 text-xs text-white font-semibold tracking-widest text-center"
            >
              CONTACTO
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
