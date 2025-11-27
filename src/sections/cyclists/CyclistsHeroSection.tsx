import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { FiArrowRight } from "react-icons/fi";

import { heroSlides } from "./cyclistsContent";

const AUTOPLAY_INTERVAL = 6500;

export const CyclistsHeroSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, AUTOPLAY_INTERVAL);

    return () => window.clearInterval(timer);
  }, []);

  const activeSlide = useMemo(() => heroSlides[index], [index]);

  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-gradient-to-br from-abp-midnight via-abp-navy to-abp-blue text-white"
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div
          className="size-full"
          style={{
            background:
              "radial-gradient(circle at 18% 22%, rgba(31,75,130,0.52) 0, rgba(15,35,68,0) 52%), radial-gradient(circle at 82% 72%, rgba(93,181,255,0.35) 0, rgba(15,35,68,0) 55%), radial-gradient(circle at 40% 88%, rgba(244,184,96,0.18) 0, rgba(15,35,68,0) 60%)",
          }}
        />
      </motion.div>

      <div className="relative mx-auto flex max-w-6xl flex-col justify-between px-6 pb-24 pt-28 md:h-[620px] lg:flex-row lg:items-end">
        <FadeInWhenVisible className="flex-1 space-y-6 text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-abp-gold/40 bg-white/10 px-4 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-abp-gold">
            {activeSlide.tag}
          </span>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.45 }}
              className="space-y-4"
            >
              <h1 className="text-4xl font-semibold leading-tight md:text-[3rem]">
                {activeSlide.title}
              </h1>
              <p className="mx-auto max-w-xl text-base text-slate-200/90 lg:mx-0">
                {activeSlide.description}
              </p>

              <div className="inline-flex rounded-3xl bg-abp-cream/10 px-4 py-2 text-sm text-abp-gold/90">
                {activeSlide.highlight}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <Link
                  to={activeSlide.ctaTo}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-abp-blue shadow-lg hover:bg-slate-100"
                >
                  {activeSlide.ctaLabel}
                  <FiArrowRight className="size-4" />
                </Link>
                <a
                  href="#productos"
                  className="inline-flex items-center gap-2 rounded-full border border-abp-gold/50 px-5 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/85 hover:border-abp-gold"
                >
                  Ver portafolio
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </FadeInWhenVisible>

        <FadeInWhenVisible className="mt-12 flex-1 lg:mt-0 lg:pl-12">
          <div className="relative mx-auto flex h-[320px] w-full max-w-lg items-center justify-center overflow-hidden rounded-[3rem] border border-abp-gold/30 bg-white/10 backdrop-blur">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeSlide.image}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45 }}
                src={activeSlide.image}
                alt={activeSlide.title}
                className="size-full object-cover"
              />
            </AnimatePresence>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-abp-midnight/70 to-transparent" />

            <div className="absolute inset-x-0 bottom-4 flex justify-center gap-3">
              {heroSlides.map((slide, slideIndex) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setIndex(slideIndex)}
                  className={`h-[3px] rounded-full transition-all ${
                    slideIndex === index
                      ? "w-12 bg-abp-gold"
                      : "w-6 bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Ver ${slide.title}`}
                />
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 text-center text-sm text-slate-200 md:text-left">
            {activeSlide.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-left"
              >
                <p className="text-[0.7rem] uppercase tracking-[0.22em] text-abp-gold/80">
                  {stat.label}
                </p>
                <p className="mt-2 text-lg font-semibold text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};
