import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { cyclistsNavLinks } from "./cyclistsContent";

const observerOptions: IntersectionObserverInit = {
  root: null,
  threshold: 0.45,
  rootMargin: "-30% 0px -45% 0px",
};

export const CyclistsStickyNav = () => {
  const [activeHref, setActiveHref] = useState<string>(cyclistsNavLinks[0]?.href ?? "#inicio");

  const sectionIds = useMemo(
    () => cyclistsNavLinks.map((link) => link.href.replace(/^#/, "")),
    []
  );

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveHref(`#${entry.target.id}`);
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [sectionIds]);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    const id = href.replace(/^#/, "");
    const section = document.getElementById(id);

    if (section) {
      window.scrollTo({
        top: section.offsetTop - 96,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="sticky top-16 z-30 border-b border-slate-200/70 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-3 md:flex-row md:items-center md:justify-between">
        <div className="hidden items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-abp-slate/70 md:flex">
          <span className="inline-block size-2 rounded-full bg-abp-gold/80" />
          Ruta de protección ciclista
        </div>

        <div className="-mx-6 overflow-x-auto md:mx-0">
          <div className="flex min-w-max items-center gap-2 px-6">
            {cyclistsNavLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeHref === link.href;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(event) => handleClick(event, link.href)}
                  className="relative inline-flex items-center gap-2 rounded-full border border-transparent px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-abp-slate transition-colors hover:text-abp-blue"
                >
                  {isActive && (
                    <motion.span
                      layoutId="cyclists-nav-active"
                      className="absolute inset-0 rounded-full border border-abp-blue/50 bg-abp-blue/5"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}

                  <span className="relative inline-flex items-center gap-1">
                    <Icon className="size-3.5 text-abp-blue" />
                    <span>{link.label}</span>
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
