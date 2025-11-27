// src/components/Navbar.tsx
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import logoV from "../assets/logoV.png";

const navItems = [
  { label: "Inicio", to: "/" },
  { label: "Portafolio", to: "/portafolio" },
  { label: "Servicios empresariales", to: "/servicios-empresariales" },
  { label: "Aliados", to: "/aliados" },
  { label: "Ciclistas", to: "/ciclistas" },
  { label: "Contacto", to: "/contacto" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);

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
              {/* A · B · P con iniciales destacadas */}
              <span className="mt-0.5 text-[0.65rem] text-slate-500 md:text-[0.7rem]">
                <span className="font-semibold text-abp-blue">A</span>
                compañamiento ·{" "}
                <span className="font-semibold text-abp-blue">B</span>
                ienestar ·{" "}
                <span className="font-semibold text-abp-blue">P</span>
                rotección
              </span>
            </div>
          </Link>

          {/* NAV DESKTOP */}
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "relative text-sm font-medium transition-colors",
                    isActive
                      ? "text-abp-blue"
                      : "text-slate-600 hover:text-abp-blue",
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{item.label}</span>
                    <span
                      className={`pointer-events-none absolute inset-x-0 -bottom-1 mx-auto h-[2px] rounded-full bg-abp-blue transition-all ${
                        isActive ? "w-full opacity-100" : "w-0 opacity-0"
                      }`}
                    />
                  </>
                )}
              </NavLink>
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
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/60 text-slate-800 md:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Abrir menú"
          >
            {open ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* MENÚ MOBILE DESPLEGABLE */}
      {open && (
        <div className="border-t border-slate-200 bg-white/95 backdrop-blur-md md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
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
            ))}

            <Link
              to="/contacto"
              onClick={() => setOpen(false)}
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
