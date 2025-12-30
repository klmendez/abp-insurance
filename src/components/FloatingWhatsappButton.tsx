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
        fixed z-50 flex items-center justify-center
        rounded-full bg-emerald-500 p-4
        text-white shadow-xl
        transition-transform duration-200
        hover:bg-emerald-600 hover:scale-110

        right-3 bottom-16
        md:right-2 md:bottom-40
      "
    >
      <FaWhatsapp className="h-6 w-6 md:h-7 md:w-7" />
    </a>
  );
};
