// src/components/Navbar.tsx
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import logoV from "../assets/logoV.png";

type NavChild = {
  label: string;
  to: string;
};

type NavItem = {
  label: string;
  to: string;
  children?: NavChild[];
};

const portfolioSections: NavChild[] = [
  { label: "Riesgos laborales", to: "/portafolio#linea-riesgos-laborales" },
  { label: "Seguros de vida", to: "/portafolio#linea-seguros-vida" },
  { label: "Seguros especiales", to: "/portafolio#linea-seguros-especiales" },
  { label: "Seguros generales", to: "/portafolio#linea-seguros-generales" },
  {
    label: "Servicios complementarios",
    to: "/portafolio#linea-servicios-complementarios",
  },
];

const navItems: NavItem[] = [
  { label: "Inicio", to: "/" },
  { label: "Portafolio", to: "/portafolio", children: portfolioSections },
  { label: "Servicios empresariales", to: "/servicios-empresariales" },
  { label: "Ciclistas", to: "/ciclistas" },
  { label: "Sobre nosotros", to: "/sobre-nosotros" },
  { label: "Contacto", to: "/contacto" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const toggleMobileMenu = () => {
    setOpen((prev) => {
      const next = !prev;
      if (!next) {
        setExpandedMenu(null);
      }
      return next;
    });
  };

  const closeMobileMenu = () => {
    setOpen(false);
    setExpandedMenu(null);
  };

  return (
    // Navbar fijo, encima del hero y de todas las secciones
    <header className="fixed inset-x-0 top-0 z-40">
      {/* CONTENEDOR CENTRADO */}
      <div className="mx-auto max-w-6xl px-4 pt-4 pb-3 md:pt-6 md:pb-4">
        {/* PÍLDORA BLANCA */}
        <div className="flex items-center justify-between gap-4 rounded-full border border-slate-200/70 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-xl md:px-6">
          {/* LOGO + TEXTO MARCA */}
          <Link
            to="/"
            className="flex items-center gap-3"
            onClick={() => setOpen(false)}
          >
            <img
              src={logoV}
              alt="ABP Agencia de Seguros"
              className="h-9 w-auto md:h-10"
            />

            <div className="flex flex-col leading-tight">
              {/* ABP GRANDE */}
              <span className="text-base font-bold tracking-[0.18em] text-abp-blue md:text-lg">
                ABP
              </span>
              {/* Agencia de Seguros Ltda. */}
              <span className="text-[0.7rem] text-slate-700 md:text-xs">
                Agencia de Seguros Ltda.
              </span>
              
            </div>
          </Link>

          {/* NAV DESKTOP */}
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <div key={item.to} className="group relative">
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      "relative flex items-center gap-1 text-sm font-medium transition-colors",
                      isActive
                        ? "text-abp-blue"
                        : "text-slate-600 hover:text-abp-blue",
                    ].join(" ")
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{item.label}</span>
                      {item.children && (
                        <FiChevronDown
                          className={`transition-transform ${
                            isActive ? "rotate-180 text-abp-blue" : "text-slate-500"
                          }`}
                          size={14}
                        />
                      )}
                      <span
                        className={`pointer-events-none absolute inset-x-0 -bottom-1 mx-auto h-[2px] rounded-full bg-abp-blue transition-all ${
                          isActive ? "w-full opacity-100" : "w-0 opacity-0"
                        }`}
                      />
                    </>
                  )}
                </NavLink>

                {item.children && (
                  <div className="absolute left-1/2 top-full z-30 hidden -translate-x-1/2 pt-3 group-focus-within:flex group-hover:flex" role="menu">
                    <div className="flex min-w-[220px] flex-col gap-1 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-xl">
                      {item.children.map((child) => (
                        <Link
                          key={child.to}
                          to={child.to}
                          className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-abp-blue"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <Link
              to="/contacto"
              className="rounded-full bg-abp-blue px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-abp-blue/90"
            >
              Asesoría sin costo
            </Link>
          </nav>

          {/* HAMBURGUESA MOBILE */}
          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-full border border-slate-200 bg-white/60 text-slate-800 md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Abrir menú"
          >
            {open ? <FiX className="size-5" /> : <FiMenu className="size-5" />}
          </button>
        </div>
      </div>

      {/* MENÚ MOBILE DESPLEGABLE */}
      {open && (
        <div className="border-t border-slate-200 bg-white/95 backdrop-blur-md md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-3">
            {navItems.map((item) => {
              if (item.children) {
                const isExpanded = expandedMenu === item.label;
                return (
                  <div key={item.to} className="rounded-xl border border-slate-200/60 bg-white/70 p-2">
                    <div className="flex items-center justify-between gap-3">
                      <NavLink
                        to={item.to}
                        onClick={closeMobileMenu}
                        className={({ isActive }) =>
                          [
                            "text-sm font-medium",
                            isActive ? "text-abp-blue" : "text-slate-700",
                          ].join(" ")
                        }
                      >
                        {item.label}
                      </NavLink>
                      <button
                        type="button"
                        className="flex size-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600"
                        onClick={() =>
                          setExpandedMenu((prev) =>
                            prev === item.label ? null : item.label
                          )
                        }
                        aria-label={`Mostrar opciones de ${item.label}`}
                      >
                        <FiChevronDown
                          className={`transition-transform ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                          size={16}
                        />
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="mt-2 space-y-1 border-t border-slate-200 pt-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.to}
                            to={child.to}
                            onClick={closeMobileMenu}
                            className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    [
                      "block rounded-xl px-3 py-2 text-sm transition",
                      isActive
                        ? "bg-abp-blue/10 text-abp-blue"
                        : "text-slate-700 hover:bg-slate-50",
                    ].join(" ")
                  }
                >
                  {item.label}
                </NavLink>
              );
            })}

            <Link
              to="/contacto"
              onClick={closeMobileMenu}
              className="mt-3 inline-flex items-center justify-center rounded-full bg-abp-blue px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-abp-blue/90"
            >
              Asesoría sin costo
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
