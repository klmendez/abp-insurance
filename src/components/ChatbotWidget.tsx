import { useEffect, useRef, useState } from "react";
import { FiSend, FiMessageCircle, FiX } from "react-icons/fi";

/* =========================
   Utils
========================= */
const normalizeText = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const includesAny = (haystack: string, needles: string[]) =>
  needles.some((needle) => normalizeText(haystack).includes(normalizeText(needle)));

const contactKeywords = [
  "asesor",
  "contacto",
  "contactarme",
  "contáctame",
  "contactame",
  "llamar",
  "llámame",
  "llamame",
  "llamada",
  "llamado",
  "whatsapp",
  "hablar",
  "comunicar",
  "comunícate",
  "comunicate",
  "agenda",
  "agendar",
  "acompañamiento",
  "asesoría",
  "asesoria",
];

const infoKeywords = [
  "continuar",
  "continuemos",
  "seguir",
  "sigue",
  "más",
  "mas",
  "información",
  "informacion",
  "servicio",
  "servicios",
  "portafolio",
  "seguro",
  "seguros",
  "cuéntame",
  "cuentame",
  "dime",
  "ver",
  "conocer",
  "si",
  "sí",
  "vale",
  "ok",
];

/* =========================
   Knowledge base
========================= */
const knowledgeBase = [
  {
    keywords: ["portafolio", "servicios", "productos", "model"],
    response:
      "Nuestro portafolio integra riesgos laborales (Acompañamiento), seguros de vida y bienestar, protección patrimonial y programas especiales como ciclistas y recicladores. Puedes explorarlo en /portafolio.",
  },
  {
    keywords: ["contacto", "asesoria", "asesoría", "whatsapp", "telefono", "teléfono", "hablar", "llamar"],
    response:
      "Nuestros asesores responden en los teléfonos (+57) 320 865 4369 y (+57) 300 568 7950. También puedes escribirnos a apbsegurosltda@gmail.com o usar el formulario en /contacto.",
  },
  {
    keywords: ["arl", "riesgos", "laborales", "sg-sst", "accidente"],
    response:
      "En riesgos laborales apoyamos afiliaciones y novedades ante la ARL, reporte y gestión de accidentes, seguimiento de incapacidades y fortalecimiento del SG-SST.",
  },
  {
    keywords: ["vida", "bienestar", "familia", "ahorro", "colaboradores"],
    response:
      "Los seguros de vida y bienestar incluyen pólizas con o sin ahorro, vida para deudores, colectivos empresariales y beneficios adicionales para colaboradores y familias.",
  },
  {
    keywords: ["generales", "patrimonio", "hogar", "responsabilidad", "rc", "empresa"],
    response:
      "En seguros generales protegemos patrimonio empresarial, responsabilidad civil, infraestructura, flotas, vehículos particulares y hogar con planes a la medida.",
  },
  {
    keywords: ["ciclistas", "bicicleta", "calculadora", "prima", "equipo"],
    response:
      "Para ciclistas tenemos coberturas de vida, bicicleta, viaje y combos integrales. En /ciclistas encuentras la calculadora referencial para estimar la prima de acuerdo con tu perfil y valor del equipo.",
  },
  {
    keywords: ["oficina", "cali", "bogota", "bogotá", "popayan", "popayán", "sede"],
    response:
      "Tenemos presencia en Cali (Centro Empresarial Santa Mónica), Bogotá (Torre Krystal, Oficina 2003) y Popayán (Edificio Albarracín). Contáctanos para agendar una visita.",
  },
  {
    keywords: ["empresarial", "empresa", "servicios complementarios"],
    response:
      "Nuestros servicios empresariales cubren programas integrales, análisis de riesgos, capacitación con ARL y acompañamiento consultivo en decisiones clave.",
  },
];

const fallbackResponse =
  "Puedo darte información general sobre nuestros servicios, oficinas y contacto. Si necesitas algo más específico, con gusto te conecto con un asesor por WhatsApp (+57) 320 865 4369.";

/* =========================
   Types
========================= */
type Message = {
  sender: "bot" | "user";
  text: string;
};

type Step =
  | "askName"
  | "askProfile"
  | "askService"
  | "offerHelp"
  | "askContact"
  | "done";

type SendOptions = {
  skipKnowledge?: boolean;
};

/* =========================
   Options
========================= */
const profileOptions = [
  "Persona natural",
  "Empresa",
  "Independiente / contratista",
];

const serviceOptions = [
  "Seguros de vida y bienestar",
  "Riesgos laborales (ARL)",
  "Seguros generales y patrimonio",
  "Bicicletas y programas especiales",
];

/* =========================
   Component
========================= */
export const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("askName");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text:
        "Hola 👋\n\nSoy el asistente virtual de ABP Agencia de Seguros.\nEstoy aquí para acompañarte con calma y ayudarte a encontrar la mejor opción para ti.\n\nPara comenzar, ¿cómo te llamas?",
    },
  ]);

  const [input, setInput] = useState("");
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const [hasUnread, setHasUnread] = useState(false);

  /* =========================
     Auto scroll SOLO mensajes
  ========================= */
  useEffect(() => {
    if (!messagesRef.current) return;
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (open) return;
    if (!messages.length) return;

    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.sender === "bot") {
      setHasUnread(true);
    }
  }, [messages, open]);

  /* =========================
     Handlers
  ========================= */
  const findAnswer = (question: string) => {
    const normalized = normalizeText(question);

    const matches = knowledgeBase.filter((entry) =>
      entry.keywords.some((keyword) => normalized.includes(normalizeText(keyword))),
    );

    if (!matches.length) return null;

    return matches
      .slice(0, 2)
      .map((match) => match.response)
      .join("\n\n");
  };

  const handleSend = (text?: string, options?: SendOptions) => {
    const content = (text ?? input).trim();
    if (!content) return;

    setMessages((prev) => [...prev, { sender: "user", text: content }]);
    setInput("");

    setTimeout(() => {
      const knowledgeReply = options?.skipKnowledge ? null : findAnswer(content);
      const replies: Message[] = [];

      if (knowledgeReply) {
        replies.push({ sender: "bot", text: knowledgeReply });
      }

      if (step === "askName") {
        setName(content);
        replies.push({
          sender: "bot",
          text: `Gracias, ${content} 😊\n\nPara orientarte mejor, cuéntame:\n¿desde qué perfil nos escribes?`,
        });
        setStep("askProfile");
      } else if (step === "askProfile") {
        replies.push({
          sender: "bot",
          text:
            "Perfecto 👍\n\nABP trabaja desde tres pilares: acompañamiento, bienestar y protección.\n\n¿Cuál de estos servicios te gustaría conocer?",
        });
        setStep("askService");
      } else if (step === "askService") {
        replies.push({
          sender: "bot",
          text:
            "Gracias por contarnos ✨\n\nCon esta información, un asesor puede acompañarte mejor y resolver tus dudas específicas.\n\n¿Te gustaría que te contactemos sin costo?",
        });
        setStep("offerHelp");
      } else if (step === "offerHelp") {
        if (includesAny(content, ["no", "luego", "despues", "después", "mas tarde", "más tarde"])) {
          replies.push({
            sender: "bot",
            text:
              "Entendido 😊\nSi más adelante deseas hablar con un asesor, puedes escribirnos a WhatsApp (+57) 320 865 4369 o dejar tus datos en /contacto. ¡Estoy aquí si necesitas más información!",
          });
          setStep("done");
        } else {
          replies.push({
            sender: "bot",
            text:
              "Perfecto 😊\n\nDéjanos por favor tu número de teléfono o correo electrónico y un asesor de ABP se comunicará contigo.",
          });
          setStep("askContact");
        }
      } else if (step === "askContact") {
        setContact(content);

        fetch("https://formsubmit.co/ajax/apbsegurosltda@gmail.com", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre: name,
            contacto: content,
            origen: "Chatbot Web ABP",
          }),
        }).catch(() => {
          // Silently ignore errors; we still acknowledge receipt to the user.
        });

        replies.push({
          sender: "bot",
          text:
            "¡Gracias! 💛\n\nHemos recibido tu información.\nUn asesor de ABP se comunicará contigo muy pronto para acompañarte.",
        });
        setStep("done");
      } else if (step === "done") {
        const wantsContact = includesAny(content, contactKeywords);
        const wantsMoreInfo = includesAny(content, infoKeywords);

        if (wantsContact) {
          replies.push({
            sender: "bot",
            text:
              "Claro, con gusto te contactamos. Por favor déjanos tu número de teléfono o correo electrónico y un asesor de ABP se comunicará contigo.",
          });
          setStep("askContact");
        } else if (wantsMoreInfo) {
          replies.push({
            sender: "bot",
            text:
              "Perfecto. ¿Sobre qué línea te gustaría saber más? Puedes elegir entre:\n• Seguros de vida y bienestar\n• Riesgos laborales (ARL)\n• Seguros generales y patrimonio\n• Bicicletas y programas especiales",
          });
          setStep("askService");
        } else if (!knowledgeReply) {
          replies.push({
            sender: "bot",
            text:
              "Si quieres seguir explorando, puedo contarte más sobre nuestros servicios o conectarte con un asesor. ¡Solo dime en qué te ayudo!",
          });
        }
      }

      if (!replies.length) {
        replies.push({ sender: "bot", text: fallbackResponse });
      }

      setMessages((prev) => [...prev, ...replies]);
    }, 900);
  };

  const handleToggle = () => {
    setOpen((prev) => {
      const next = !prev;
      if (next) setHasUnread(false);
      return next;
    });
  };

  /* =========================
     Render
  ========================= */
  return (
    <div className="fixed bottom-24 right-4 z-40 flex flex-col items-end gap-4">
      {open && (
        <div className="w-[380px] max-w-[95vw] h-[520px] overflow-hidden rounded-3xl border bg-slate-50 shadow-xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between bg-[#102545] px-5 py-4 text-white">
            <div>
              <p className="text-sm font-semibold">Asistente ABP</p>
              <p className="text-xs text-white/70">
                Acompañamiento en seguros
              </p>
            </div>
            <button onClick={handleToggle}>
              <FiX />
            </button>
          </div>

          {/* Messages (SCROLL SOLO AQUÍ) */}
          <div
            ref={messagesRef}
            className="flex-1 overflow-y-auto px-5 py-6 space-y-5 text-sm"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed ${
                    m.sender === "user"
                      ? "bg-[#d4af37] text-[#102545]"
                      : "bg-white text-slate-800 shadow-sm"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Footer fijo */}
          <div className="border-t bg-white px-5 py-4">
            {step === "askProfile" && (
              <div className="grid gap-2 mb-3">
                {profileOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSend(opt, { skipKnowledge: true })}
                    className="rounded-xl border px-4 py-2 text-left text-sm hover:border-[#d4af37]"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {step === "askService" && (
              <div className="grid gap-2 mb-3">
                {serviceOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSend(opt)}
                    className="rounded-xl border px-4 py-2 text-left text-sm hover:border-[#d4af37]"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe aquí si lo prefieres…"
                className="flex-1 rounded-full border px-4 py-2 text-sm"
              />
              <button className="rounded-full bg-[#d4af37] p-2">
                <FiSend />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={handleToggle}
        className="flex items-center gap-2 rounded-full bg-[#102545] px-4 py-2 text-white shadow-lg"
      >
        <FiMessageCircle />
        {open ? "Cerrar" : "Habla con ABP"}
        {hasUnread && !open && (
          <span className="ml-2 rounded-full bg-[#d4af37] px-2 text-xs text-[#102545]">
            Nuevo
          </span>
        )}
      </button>
    </div>
  );
};
