import { Link } from "react-router-dom";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { FiArrowRight, FiPhoneCall } from "react-icons/fi";
import ciclistaHero from "@/assets/especiales/ciclista1.jpg";

export const CyclistsHeroSection = () => {
  const phones = ["+573208654369", "+573005687950", "+573185170013"];

  return (
    <section
      id="inicio"
      className="relative min-h-[100svh] overflow-hidden text-white flex items-center"
      style={{
        backgroundImage: `url(${ciclistaHero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#020b16] via-[#061c2e] to-[#0e2a3f] opacity-90" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_60%)]" />

      <div className="relative mx-auto w-full max-w-6xl px-6">
        <FadeInWhenVisible className="flex flex-col items-center lg:items-start gap-8 text-center lg:text-left">
          {/* Eyebrow */}
          <span className="inline-flex items-center justify-center rounded-full bg-white/10 px-4 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-white/80 ring-1 ring-white/20">
            Seguros para ciclistas y recicladores
          </span>

          {/* Título */}
          <h1 className="font-semibold leading-tight text-white text-[clamp(1.3rem,2.4vw,2.4rem)] max-w-2xl">
            Tu bici, tu ruta y tu bienestar  
            <br className="hidden sm:block" />
            con un solo plan ABP.
          </h1>

          {/* BOTONES */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <a
              href="#calculadora"
              className="btn-modern inline-flex items-center gap-2 !bg-abp-gold !text-[#1f2a44]"
            >
              Calcular mi prima
              <FiArrowRight className="size-4" />
            </a>

            <Link
              to="/contacto"
              className="btn-modern inline-flex items-center gap-2 !bg-white/90 !text-[#1f2a44] ring-1 ring-white/60 hover:!bg-white"
            >
              Hablar con un asesor
            </Link>
          </div>

          {/* TELÉFONOS */}
          <div className="flex flex-col items-center lg:items-start gap-3 pt-2">
            <div className="flex items-center gap-2 font-semibold text-abp-gold text-sm">
              <FiPhoneCall className="text-lg" />
              <span>Llámanos</span>
            </div>

            <div className="overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur-sm">
              <div className="grid grid-cols-1 divide-y divide-white/15">
                {phones.map((num) => (
                  <a
                    key={num}
                    href={`tel:${num}`}
                    className="px-4 py-2 text-white/90 text-sm hover:bg-white/10 transition"
                  >
                    ({num.replace("+57", "+57 ")})
                  </a>
                ))}
              </div>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};
