import { FaWhatsapp } from 'react-icons/fa';

type FloatingWhatsappButtonProps = {
  phone?: string;
  message?: string;
};

export const FloatingWhatsappButton = ({
  phone = '573208654369',
  message = 'Hola, quiero hablar sobre soluciones ABP para mi empresa y mi familia.',
}: FloatingWhatsappButtonProps) => {
  const href = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed z-50 flex items-center gap-2
        rounded-full bg-emerald-500 px-4 py-2
        text-sm font-semibold text-white shadow-xl
        transition duration-200
        hover:bg-emerald-600 hover:-translate-y-0.5
        right-4 bottom-5
        md:right-0 md:top-1/2 md:-translate-y-1/2
        md:rounded-l-full md:rounded-r-none
      "
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
        <FaWhatsapp className="h-5 w-5 text-white" />
      </span>
      <span className="hidden md:inline">Cotiza ya</span>
    </a>
  );
};
