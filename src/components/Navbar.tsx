import { useMemo, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import logoV from "../assets/Logo profesional parz.png";

type NavChild = {
  label: string;
  to: string;
  children?: NavChild[];
};

type NavItem = {
  label: string;
  to: string;
  children?: NavChild[];
};

const portfolioSections: NavChild[] = [
  { label: "Riesgos laborales", to: "/portafolio#linea-riesgos-laborales" },
  { label: "Seguros de vida", to: "/portafolio#linea-seguros-vida" },
  {
    label: "Seguros especiales",
    to: "/portafolio#linea-seguros-especiales",
    children: [
      { label: "Ciclistas", to: "/ciclistas" }, // ✅ existe en App.tsx
      { label: "Recicladores", to: "/portafolio/recicladores" }, // ✅ RUTA REAL
    ],
  },
  { label: "Seguros generales", to: "/portafolio#linea-seguros-generales" },
  { label: "Servicios complementarios", to: "/portafolio#linea-servicios-complementarios" },
];

const navItems: NavItem[] = [
  { label: "Inicio", to: "/" },
  { label: "Portafolio", to: "/portafolio", children: portfolioSections },
  { label: "Servicios complementarios", to: "/servicios-empresariales" }, // ✅ tu ruta real
  { label: "Sobre nosotros", to: "/sobre-nosotros" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [brandFx, setBrandFx] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

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

  const linkSafe =
    "no-underline visited:text-inherit focus:text-[#254561] active:text-[#254561]";

  const heroIds = useMemo(() => ["heroSection", "hero", "home", "inicio"], []);

  const scrollToHeroOrTop = () => {
    for (const id of heroIds) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToHash = (hash: string) => {
    const id = hash.replace("#", "");
    if (!id) return;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const triggerBrandFx = () => {
    setBrandFx(true);
    window.setTimeout(() => setBrandFx(false), 220);
  };

  const handleBrandClick = (e: React.MouseEvent) => {
    e.preventDefault();
    closeMobileMenu();
    triggerBrandFx();

    if (location.pathname === "/") {
      scrollToHeroOrTop();
      return;
    }

    navigate("/");
    window.setTimeout(() => scrollToHeroOrTop(), 0);
  };

  // ✅ Navega y además hace scroll al inicio o al hash
  const handleNavTo = (to: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    closeMobileMenu();

    const [path, hash] = to.split("#");
    const targetPath = path || "/";
    const targetHash = hash ? `#${hash}` : "";

    const samePath = location.pathname === targetPath;

    if (samePath) {
      if (targetHash) scrollToHash(targetHash);
      else scrollToHeroOrTop();
      return;
    }

    navigate(targetPath + targetHash);
    window.setTimeout(() => {
      if (targetHash) scrollToHash(targetHash);
      else scrollToHeroOrTop();
    }, 0);
  };

  const goldUnderline = "bg-[#D4AF37]";

  const isInicioActive = location.pathname === "/";
  const isPortafolioActive =
    location.pathname.startsWith("/portafolio") || location.pathname === "/ciclistas";

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 pt-4 pb-3 md:pt-6 md:pb-4">
        <div className="relative">
          <div
            className="
              flex items-center justify-between gap-4
              rounded-full border border-slate-300/70
              bg-slate-200
              px-6 py-2
              shadow-lg shadow-slate-900/10
              pl-[64px] sm:pl-[72px]
            "
          >
            {/* MARCA */}
            <a
              href="/"
              onClick={handleBrandClick}
              className={[
                "group flex items-center",
                "text-[#254561]",
                "transition-all duration-200",
                "hover:scale-[1.01] active:scale-[0.98]",
                "hover:[text-shadow:0_0_12px_rgba(37,69,97,0.35)]",
                brandFx ? "scale-[0.985]" : "",
                linkSafe,
              ].join(" ")}
              aria-label="Ir al inicio"
            >
              <span className="font-['Inter',sans-serif] text-[#254561] whitespace-nowrap leading-tight">
                <span className="inline sm:block font-semibold tracking-[0.06em] text-[0.8rem] sm:text-[0.85rem] md:text-[1rem]">
                  Agencia de
                </span>{" "}
                <span className="inline sm:block font-semibold tracking-[0.06em] text-[0.8rem] sm:text-[0.85rem] md:text-[1rem]">
                  Seguros
                  <span
                    className={[
                      "ml-[0.18rem] align-middle font-semibold uppercase",
                      "tracking-[0.32em] text-[0.55em] text-slate-500",
                      "[text-shadow:0_1px_0_rgba(255,255,255,0.6)]",
                      "group-hover:[text-shadow:0_0_10px_rgba(107,114,128,0.55)]",
                    ].join(" ")}
                  >
                    LTDA.
                  </span>
                </span>
              </span>
            </a>

            {/* DESKTOP */}
            <nav className="hidden items-center gap-6 md:flex">
              {navItems.map((item) => {
                const isActiveManual =
                  (item.to === "/" && isInicioActive) ||
                  (item.to === "/portafolio" && isPortafolioActive);

                if (item.children) {
                  return (
                    <div key={item.to} className="group relative">
                      <a
                        href={item.to}
                        onClick={handleNavTo(item.to)}
                        className={[
                          "relative flex items-center gap-1 text-sm font-medium transition-colors",
                          linkSafe,
                          isActiveManual
                            ? "text-[#254561]"
                            : "text-slate-600 hover:text-[#254561]",
                        ].join(" ")}
                      >
                        <span>{item.label}</span>
                        <FiChevronDown
                          className="text-slate-500 group-hover:text-[#254561] group-hover:rotate-180 transition-transform"
                          size={14}
                        />

                        <span
                          className={[
                            "pointer-events-none absolute left-0 right-0 -bottom-1 mx-auto h-[2px] rounded-full transition-all",
                            goldUnderline,
                            isActiveManual
                              ? "w-full opacity-100"
                              : "w-0 opacity-0 group-hover:w-full group-hover:opacity-60",
                          ].join(" ")}
                        />
                      </a>

                      {/* SUBMENU DESKTOP */}
                      <div
                        className="
                          absolute left-1/2 top-full z-50 hidden -translate-x-1/2 pt-3
                          group-hover:block group-focus-within:block
                        "
                        role="menu"
                      >
                        <div className="min-w-[270px] rounded-2xl border border-slate-300/70 bg-slate-200 p-2 shadow-xl">
                          {item.children.map((child) => {
                            const hasGrandChildren = !!child.children?.length;

                            return (
                              <div key={child.to} className="relative group/sub">
                                <a
                                  href={child.to}
                                  onClick={handleNavTo(child.to)}
                                  className={[
                                    "flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition",
                                    "text-slate-700 hover:bg-slate-300/60 hover:text-[#254561]",
                                    linkSafe,
                                  ].join(" ")}
                                >
                                  <span>{child.label}</span>
                                  {hasGrandChildren && (
                                    <FiChevronDown
                                      className="rotate-[-90deg] text-slate-500 group-hover/sub:text-[#254561]"
                                      size={14}
                                    />
                                  )}
                                </a>

                                {hasGrandChildren && (
                                  <div
                                    className="
                                      absolute left-full top-0 z-50 hidden pl-2
                                      group-hover/sub:block group-focus-within/sub:block
                                    "
                                  >
                                    <div className="min-w-[220px] rounded-2xl border border-slate-300/70 bg-slate-200 p-2 shadow-xl">
                                      {child.children!.map((gchild) => (
                                        <a
                                          key={gchild.to}
                                          href={gchild.to}
                                          onClick={handleNavTo(gchild.to)}
                                          className={[
                                            "block rounded-xl px-3 py-2 text-sm font-medium transition",
                                            "text-slate-700 hover:bg-slate-300/60 hover:text-[#254561]",
                                            linkSafe,
                                          ].join(" ")}
                                        >
                                          {gchild.label}
                                        </a>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={item.to} className="relative">
                    <NavLink
                      to={item.to}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavTo(item.to)(e);
                      }}
                      className={({ isActive }) =>
                        [
                          "relative flex items-center text-sm font-medium transition-colors",
                          linkSafe,
                          isActive
                            ? "text-[#254561]"
                            : "text-slate-600 hover:text-[#254561]",
                        ].join(" ")
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span>{item.label}</span>
                          <span
                            className={[
                              "pointer-events-none absolute left-0 right-0 -bottom-1 mx-auto h-[2px] rounded-full transition-all",
                              goldUnderline,
                              isActive ? "w-full opacity-100" : "w-0 opacity-0",
                            ].join(" ")}
                          />
                        </>
                      )}
                    </NavLink>
                  </div>
                );
              })}

              <Link
                to="/contacto"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavTo("/contacto")(e);
                }}
                className={[
                  "btn-modern px-6 py-2 text-[0.65rem]",
                  "tracking-[0.22em] uppercase",
                  linkSafe,
                ].join(" ")}
              >
                Contacto
              </Link>
            </nav>

            {/* MOBILE BTN */}
            <button
              type="button"
              className="flex size-9 items-center justify-center rounded-full border border-slate-300 bg-slate-200 text-slate-700 md:hidden"
              onClick={toggleMobileMenu}
              aria-label="Abrir menú"
            >
              {open ? <FiX /> : <FiMenu />}
            </button>
          </div>

          {/* LOGO */}
          <a
            href="/"
            onClick={handleBrandClick}
            className={[
              "absolute left-0 top-1/2 -translate-x-[12%] -translate-y-1/2",
              "group transition-transform duration-200",
              "hover:scale-[1.03] active:scale-[0.96]",
              linkSafe,
            ].join(" ")}
            aria-label="Ir al inicio"
          >
            <span
              className="
                relative flex h-[72px] w-[72px] items-center justify-center rounded-full bg-slate-200
                transition-all duration-200
                group-hover:ring-2 group-hover:ring-[#254561]/25
                group-hover:shadow-[0_0_18px_rgba(37,69,97,0.25)]
              "
            >
              <span
                className="
                  pointer-events-none absolute inset-0 rounded-full
                  opacity-0 group-hover:opacity-100 transition-opacity duration-200
                  bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.55),rgba(255,255,255,0)_55%)]
                "
              />
              <img src={logoV} alt="Agencia de Seguros" className="relative h-[68px] w-auto" />
            </span>
          </a>
        </div>
      </div>

      {/* MOBILE MENU (igual que antes, si lo quieres con rayitas doradas también lo adapto) */}
    </header>
  );
};
