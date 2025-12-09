// src/sections/HeroSection.tsx
import desktopBackground from "../bg/1.png";
import mobileBackground from "../bg/mobile1.png";
import { FiPhoneCall } from "react-icons/fi";
import React from "react";

export const HeroSection = () => (
  <section
    id="inicio"
    className="relative overflow-hidden min-h-screen"
  >

    {/* Overlay para asegurar contraste sin cubrir a la persona */}
    <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#030712]/75 via-[#030712]/45 to-transparent" />

    {/* BG MOBILE */}
    <div
      className="
        absolute inset-0
        sm:hidden
        bg-no-repeat
        bg-[length:auto_100%]
        bg-[right_20%_bottom]
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

    {/* ======================================================
    📱 MOBILE HERO
====================================================== */}
    <div
      className="
        relative z-20
        sm:hidden
        flex min-h-screen flex-col items-center text-center
        px-6
        pt-24
        pb-14
      "
    >

      {/* TÍTULO (más abajo) */}
      <h1 className="text-white font-semibold text-3xl leading-tight max-w-xs">
        Acompañamos tus decisiones y protegemos tu futuro
      </h1>

      {/* DESCRIPCIÓN */}
      <p className="text-slate-100/90 text-base leading-relaxed max-w-sm mt-3">
        Soluciones en seguros diseñadas para ti, tu familia o tu empresa.
      </p>

      {/* CTA LLAMA YA */}
      <div className="flex flex-col gap-1 items-center mt-4">
        <div className="flex items-center gap-2 text-[#d4a43b] font-semibold text-base">
          <FiPhoneCall className="text-lg" />
          Llama ya
        </div>

        <p className="text-white text-sm leading-relaxed">
          (+57) 320 865 4369 <br />
          (+57) 300 568 7950
        </p>
      </div>

      {/* BOTONES MÁS PEQUEÑOS Y PEGADOS ABAJO */}
      <div className="mt-auto w-full flex flex-col gap-3">

        {/* Botón 1 */}
        <a
          href="https://wa.me/57XXXXXXXXX"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-modern w-full py-2 text-sm font-semibold text-center shadow-xl"
        >
          Agendar asesoría
        </a>

        {/* Botón 2 */}
        <a
          href="#portafolio"
          className="btn-modern w-full py-2 text-sm font-semibold text-center"
        >
          Ver servicios
        </a>

      </div>
    </div>


    {/* ======================================================
        🖥 DESKTOP HERO (SE MANTIENE IGUAL)
    ====================================================== */}
    <div className="hidden sm:flex relative z-20 min-h-screen">
      <div
        className="
          max-w-7xl mx-auto
          px-4 sm:px-6 lg:px-12
          w-full
          flex flex-col gap-8
          justify-center
        "
      >
        <span className="
          inline-flex items-center w-fit
          rounded-full bg-black/30 px-4 py-1 
          text-[0.72rem] font-semibold uppercase
          tracking-[0.18em] text-slate-100 ring-1 ring-white/20
        ">
          Tu tranquilidad, nuestra prioridad
        </span>

        <h1 className="
          text-white font-semibold leading-tight
          text-4xl md:text-[3.2rem] lg:text-[3.6rem]
          max-w-[900px]
        ">
          Acompañamos tus decisiones, aseguramos tu bienestar y protegemos tu futuro
        </h1>

        <p className="text-slate-100/90 max-w-xl text-base md:text-lg">
          En ABP Agencia de Seguros, diseñamos coberturas a la medida para personas y empresas.
        </p>

        {/* CTA TELÉFONO */}
        <div className="space-y-1">
          <p className="text-white/85 text-base font-semibold flex items-center gap-2">
            <FiPhoneCall className="text-[#d4a43b] text-xl" />
            Llama ya:
          </p>

          <p className="text-[1.3rem] leading-tight font-bold text-[#d4a43b] drop-shadow-sm">
            (+57) 320 865 4369
          </p>

          <p className="text-[1.3rem] leading-tight font-bold text-[#d4a43b]">
            (+57) 300 568 7950
          </p>
        </div>

        {/* BOTONES DESKTOP */}
        <div className="flex flex-col sm:flex-row gap-4 w-full mt-4">
          <a href="#portafolio" className="btn-modern btn-modern--light">
            Conoce nuestros servicios
          </a>

          <a
            href="https://wa.me/57XXXXXXXXX"
            className="btn-modern"
            target="_blank"
            rel="noopener noreferrer"
          >
            Agenda una asesoría gratuita
          </a>
        </div>
      </div>
    </div>

  </section>
);
