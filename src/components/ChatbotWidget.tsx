import { useState, useRef, useEffect } from "react";
import { FiSend, FiMessageCircle, FiX } from "react-icons/fi";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hola 👋 Soy el asistente virtual de ABP Agencia de Seguros. ¿En qué puedo ayudarte hoy?",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const handleChat = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/.netlify/functions/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage.content }),
      });

      if (!response.ok) throw new Error("Error en la función");

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "⚠️ Lo siento, hubo un problema de conexión. Intenta nuevamente.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      {isOpen && (
        <div className="mb-4 w-80 h-[450px] bg-white border shadow-2xl rounded-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-[#102545] p-4 text-white flex justify-between items-center">
            <span className="font-bold text-sm">Asistente ABP</span>
            <button onClick={() => setIsOpen(false)}>
              <FiX />
            </button>
          </div>

          {/* Mensajes */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 text-sm text-slate-700"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-xl max-w-[85%] ${
                    m.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white border shadow-sm"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-xs italic text-gray-400">
                ABP está analizando tu consulta...
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t flex gap-2">
            <input
              className="flex-1 bg-gray-100 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 ring-blue-500"
              placeholder="Escribe tu duda..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleChat()}
              disabled={loading}
            />
            <button
              onClick={handleChat}
              className="bg-[#102545] text-white p-2 rounded-lg disabled:opacity-50"
              disabled={loading}
            >
              <FiSend />
            </button>
          </div>
        </div>
      )}

      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#102545] w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white text-2xl hover:scale-105 transition-transform"
      >
        <FiMessageCircle />
      </button>
    </div>
  );
};
