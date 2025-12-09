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

        right-4 bottom-4
        md:right-0 md:bottom-8
        md:rounded-l-full md:rounded-r-none
      "
    >
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10">
        <FaWhatsapp className="h-5 w-5 text-white" />
      </span>

      <span className="hidden md:inline text-base font-medium">
        Cotiza ya
      </span>
    </a>
  );
};
