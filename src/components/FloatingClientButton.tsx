import { FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

export const FloatingClientButton = () => {
  return (
    <div
      className="
        fixed bottom-[5.5rem] right-[max(1rem,env(safe-area-inset-right,1rem))]
        z-40 flex flex-col items-center gap-1.5

        sm:bottom-[7rem]
        sm:right-[max(1.5rem,env(safe-area-inset-right,1.25rem))]
        lg:bottom-[8.5rem]
      "
    >
      {/* Etiqueta "Clientes" siempre visible */}
      <span className="
        inline-block rounded-full bg-abp-gold px-2.5 py-0.5
        text-[0.65rem] font-bold uppercase tracking-wider text-[#030712]
        shadow-md ring-1 ring-white/30
      ">
        Clientes
      </span>

      {/* Botón circular */}
      <Link
        to="/login-clientes"
        aria-label="Área de clientes"
        className="
          flex h-14 w-14 items-center justify-center
          rounded-full bg-abp-gold text-[#030712] shadow-xl transition-transform duration-200
          hover:scale-105 hover:bg-abp-goldDark focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-abp-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white
        "
      >
        <FiUser className="h-6 w-6" />
      </Link>
    </div>
  );
};
