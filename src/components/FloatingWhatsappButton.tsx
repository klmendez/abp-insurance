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
      aria-label="Abrir conversación de WhatsApp con ABP"
      className="
        fixed bottom-[max(1rem,env(safe-area-inset-bottom,0.75rem))] left-[max(1rem,env(safe-area-inset-left,1rem))]
        z-40 flex h-14 w-14 items-center justify-center
        rounded-full bg-emerald-500 text-white shadow-xl transition-transform duration-200
        hover:scale-105 hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white

        sm:bottom-[max(1.5rem,env(safe-area-inset-bottom,1.25rem))]
        sm:left-[max(1.5rem,env(safe-area-inset-left,1.25rem))]
        lg:bottom-[max(2.5rem,env(safe-area-inset-bottom,1.75rem))]
      "
    >
      <FaWhatsapp className="h-6 w-6" />
    </a>
  );
};
