// src/sections/HeroSection.tsx
import desktopBackground from "../bg/13.png";
import mobileBackground from "../bg/mobile1.png";
import { FiPhoneCall } from "react-icons/fi";
import React from "react";

export const HeroSection = () => (
  <section
    id="inicio"
    className="relative overflow-hidden min-h-[100svh] flex items-stretch"
  >
    {/* Overlay */}
    <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#030712]/40 via-[#030712]/20 to-transparent" />

    {/* BG MOBILE */}
    <div
      className="
        absolute inset-0
        sm:hidden
        bg-no-repeat bg-cover
        bg-[position:right_bottom]
        z-0
      "
      style={{ backgroundImage: `url(${mobileBackground})` }}
    />

    {/* BG DESKTOP */}
    <div
      className="
        absolute inset-0
        hidden sm:block
        bg-cover bg-no-repeat
        bg-[position:right_center]
        z-0
      "
      style={{ backgroundImage: `url(${desktopBackground})` }}
    />

    <div className="relative z-20 flex flex-1">
      <div className="mx-auto flex w-full max-w-6xl items-center px-4 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
        
        <div className="flex w-full flex-col gap-6 sm:gap-8 text-center sm:text-left max-w-[32rem] mx-auto sm:mx-0">

          <span
            className="
              inline-flex items-center justify-center
              self-center sm:self-start
              rounded-full bg-black/40 px-4 py-1
              text-[0.62rem] sm:text-[0.7rem]
              font-semibold uppercase tracking-[0.16em] sm:tracking-[0.2em]
              text-slate-100 ring-1 ring-white/20
            "
          >
            Tu tranquilidad, nuestra prioridad
          </span>

          <h1
            className="
              text-white font-semibold leading-tight text-balance
              text-[1.8rem]
              sm:text-[2.2rem]
              lg:text-[2.6rem]
              xl:text-[2.9rem]
            "
          >
            Acompañamos tus decisiones, aseguramos tu bienestar y protegemos tu futuro
          </h1>

          <p
            className="
              text-sm sm:text-base lg:text-lg
              text-white/90 text-balance
              sm:max-w-xl
              mx-auto sm:mx-0
            "
          >
            En ABP Agencia de Seguros diseñamos coberturas a la medida para proteger a las personas, las familias y las empresas.
          </p>

          {/* PHONE SECTION */}
          <div className="w-full max-w-xs sm:max-w-sm rounded-2xl border border-white/15 bg-black/35 px-4 py-4 backdrop-blur-sm text-center sm:self-start sm:text-left">
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:gap-3">
              <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-abp-gold">
                <FiPhoneCall className="text-lg sm:text-xl" />
                Llama ya
              </div>
              <div className="hidden sm:block h-5 w-px bg-white/25" aria-hidden="true" />
              <div className="text-white/90 text-sm sm:text-base font-medium leading-snug">
                (+57) 320 865 4369
                <span className="hidden sm:inline"> · </span>
                <br className="sm:hidden" />
                (+57) 300 568 7950
              </div>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex w-full flex-col items-center gap-3 pt-3 sm:flex-row sm:items-center sm:justify-start sm:gap-4">
            <a
              href="https://wa.me/57XXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-modern w-full max-w-xs sm:max-w-none sm:w-auto text-xs sm:text-sm px-4 py-2"
            >
              Agenda una asesoría gratuita
            </a>

            <a
              href="#portafolio"
              className="btn-modern btn-modern--light w-full max-w-xs sm:max-w-none sm:w-auto text-xs sm:text-sm px-4 py-2"
            >
              Conoce nuestros servicios
            </a>
          </div>

        </div>
      </div>
    </div>
  </section>
);
