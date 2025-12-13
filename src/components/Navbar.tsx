import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import logoV from "../assets/Logo profesional parz.png";

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
  { label: "Servicios complementarios", to: "/portafolio#linea-servicios-complementarios" },
];

const navItems: NavItem[] = [
  { label: "Inicio", to: "/" },
  { label: "Portafolio", to: "/portafolio", children: portfolioSections },
  { label: "Servicios empresariales", to: "/servicios-empresariales" },
  { label: "Ciclistas", to: "/ciclistas" },
  { label: "Sobre nosotros", to: "/sobre-nosotros" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const toggleMobileMenu = () => {
    setOpen((prev) => {
      const next = !prev;
      if (!next) setExpandedMenu(null);
      return next;
    });
  };

  const closeMobileMenu = () => {
    setOpen(false);
    setExpandedMenu(null);
  };

  // 🔒 Anti-azul del navegador (visited/focus) + control por clases
  const linkSafe = "no-underline visited:text-inherit focus:text-abp-blue active:text-abp-blue";

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 pt-4 pb-3 md:pt-6 md:pb-4">
        {/* CONTENEDOR RELATIVO PARA LOGO + PÍLDORA */}
        <div className="relative">
          {/* PÍLDORA PRINCIPAL (grises suaves, nada blanco puro) */}
          <div
            className="
              flex items-center justify-between gap-4 overflow-visible
              rounded-full border border-slate-300/70
              bg-gradient-to-r from-slate-100/90 via-slate-200/80 to-slate-300/70
              px-6 py-2 shadow-lg shadow-slate-900/10 backdrop-blur-xl
              pl-[64px] sm:pl-[72px] md:pl-[72px]
            "
          >
            {/* TEXTO MARCA (AZUL) + LTDA (DORADO) - link a INICIO */}
            <Link
              to="/"
              className={[
                "group flex items-center gap-0.5 text-[0.68rem] font-medium transition sm:gap-1 sm:text-sm md:gap-1.5 md:text-base",
                "text-abp-blue hover:text-abp-blue",
                linkSafe,
              ].join(" ")}
              onClick={() => setOpen(false)}
            >
              <span className="leading-tight font-['Montserrat',sans-serif]">
                {/* Agencia de */}
                <span className="block font-medium tracking-[0.18em] text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] text-abp-blue">
                  Agencia de
                </span>

                {/* Seguros LTDA */}
                <span className="block font-medium tracking-[0.12em] text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] whitespace-nowrap text-abp-blue">
                  Seguros
                  <span
                    className="
                      ml-[0.12rem] align-middle font-semibold uppercase
                      tracking-[0.32em] text-abp-gold
                      text-[0.5em] sm:text-[0.5em] md:text-[0.52em]
                    "
                  >
                    LTDA.
                  </span>
                </span>
              </span>
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
                        linkSafe,
                        isActive ? "text-abp-blue" : "text-slate-600 hover:text-abp-blue",
                      ].join(" ")
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span>{item.label}</span>

                        {item.children && (
                          <FiChevronDown
                            className={`transition-transform ${
                              isActive ? "rotate-180 text-abp-blue" : "text-slate-500 group-hover:text-abp-blue"
                            }`}
                            size={14}
                          />
                        )}

                        <span
                          className={`
                            pointer-events-none absolute inset-x-0 -bottom-1 mx-auto h-[2px]
                            rounded-full bg-abp-blue transition-all
                            ${isActive ? "w-full opacity-100" : "w-0 opacity-0"}
                          `}
                        />
                      </>
                    )}
                  </NavLink>

                  {/* SUBMENÚ */}
                  {item.children && (
                    <div
                      className="absolute left-1/2 top-full z-30 hidden -translate-x-1/2 pt-3 group-focus-within:flex group-hover:flex"
                      role="menu"
                    >
                      <div className="flex min-w-[220px] flex-col gap-1 rounded-2xl border border-slate-300/70 bg-slate-200/90 p-3 shadow-xl backdrop-blur-lg">
                        {item.children.map((child) => (
                          <Link
                            key={child.to}
                            to={child.to}
                            className={[
                              "rounded-lg px-3 py-2 text-sm font-medium transition",
                              "text-slate-600 hover:bg-slate-300/60 hover:text-abp-blue",
                              linkSafe,
                            ].join(" ")}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* CONTACTO (hover azul, no dorado) */}
              <Link
                to="/contacto"
                className={[
                  "btn-modern px-6 py-2 text-[0.6rem] sm:text-[0.68rem]",
                  "tracking-[0.22em] uppercase",
                  linkSafe,
                ].join(" ")}
              >
                Contacto
              </Link>
            </nav>

            {/* BOTÓN MOBILE */}
            <button
              type="button"
              className="flex size-9 items-center justify-center rounded-full border border-slate-300 bg-slate-200 text-slate-700 md:hidden"
              onClick={toggleMobileMenu}
              aria-label="Abrir menú"
            >
              {open ? <FiX className="size-5" /> : <FiMenu className="size-5" />}
            </button>
          </div>

          {/* LOGO REDONDO (imagen incluida) */}
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className={["group absolute left-0 top-1/2 -translate-x-[12%] -translate-y-1/2", linkSafe].join(" ")}
          >
            <span
              className="
                relative flex h-[72px] w-[72px] items-center justify-center
                rounded-full border border-slate-300/70
                bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300
                shadow-lg shadow-slate-900/15
                md:h-[78px] md:w-[78px]
              "
            >
              <img
                src={logoV}
                alt="Agencia de Seguros"
                className="absolute h-[68px] w-auto md:h-[74px]"
              />
            </span>
          </Link>
        </div>
      </div>

      {/* MENÚ MOBILE */}
      {open && (
        <div className="border-t border-slate-300 bg-slate-200/95 backdrop-blur-md md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-3">
            {navItems.map((item) => {
              if (item.children) {
                const isExpanded = expandedMenu === item.label;

                return (
                  <div key={item.to} className="rounded-xl border border-slate-300 bg-slate-100/80 p-2">
                    <div className="flex items-center justify-between gap-3">
                      <NavLink
                        to={item.to}
                        onClick={closeMobileMenu}
                        className={({ isActive }) =>
                          [
                            "text-sm font-medium transition",
                            linkSafe,
                            isActive ? "text-abp-blue" : "text-slate-700 hover:text-abp-blue",
                          ].join(" ")
                        }
                      >
                        {item.label}
                      </NavLink>

                      <button
                        type="button"
                        className="flex size-8 items-center justify-center rounded-full border border-slate-300 bg-slate-200 text-slate-600 hover:text-abp-blue transition"
                        onClick={() =>
                          setExpandedMenu((prev) => (prev === item.label ? null : item.label))
                        }
                        aria-label="Abrir submenú"
                      >
                        <FiChevronDown
                          className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
                          size={16}
                        />
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="mt-2 space-y-1 border-t border-slate-300 pt-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.to}
                            to={child.to}
                            onClick={closeMobileMenu}
                            className={[
                              "block rounded-lg px-3 py-2 text-sm font-medium transition",
                              "text-slate-600 hover:bg-slate-200 hover:text-abp-blue",
                              linkSafe,
                            ].join(" ")}
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
                      linkSafe,
                      isActive ? "bg-slate-300/40 text-abp-blue" : "text-slate-700 hover:bg-slate-200 hover:text-abp-blue",
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
              className={[
                "mt-3 inline-flex items-center justify-center btn-modern px-6 py-2",
                "text-xs sm:text-sm tracking-[0.22em] uppercase",
                linkSafe,
              ].join(" ")}
            >
              Contacto
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
