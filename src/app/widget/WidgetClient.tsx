"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Cpu, Zap } from "lucide-react";
import { FiMessageSquare } from "react-icons/fi";
import { Toaster } from "sonner";
import Image from "next/image";
import { motion } from "framer-motion";

const DEMO_BOT = {
  id: "demo-agent-001",
  name: "Asesor de Ventas Stratix",
  description: "Agente IA conversacional especializado en cierre de ventas",
  system_prompt: `Eres un asesor de ventas profesional de Stratix Intelligence, la empresa líder en automatización de ventas con Inteligencia Artificial en Latinoamérica.

TU NOMBRE: Asesor Stratix

SOBRE LA EMPRESA:
- Stratix Intelligence ofrece agentes IA que automatizan la atención al cliente 24/7
- Sistemas de WhatsApp Business, Instagram y web integrados
- Reduces hasta 60% el costo de adquisición de clientes
- Más de 1,800 empresas ya lo usan

TU TRABAJO:
1. Saluda amablemente y pregunta el nombre del cliente
2. Descubre sus necesidades con preguntas clave
3. Presenta las soluciones de Stratix según su necesidad
4. Maneja objeciones de forma profesional
5. Busca siempre cerrar una cita o demostración

OBJETIVOS:
- Calificar al lead: Cold (solo información), Warm (interesado), Hot (listo para comprar)
- Recolectar: nombre, email, teléfono, empresa, presupuesto
- Agendar cita o demostración

TONO: Profesional, amigable, directo. Respuestas cortas y efectivas. Usa emojis estratégicamente.

CONOCIMIENTO DEL PRODUCTO:
- Planes: Starter ($29/USD - $79K COP), Professional ($79/USD - $219K COP), Enterprise ($199/USD - $599K COP)
- Características: Chat IA, WhatsApp, Instagram, analytics, memoria contextual, múltiples idiomas
- Garantía de 14 días
- Setup en 15 minutos

CIERRE: Si el cliente muestra interés, ofrece agendar una demo gratuita de 30 minutos o directamente una llamada de ventas.`
};

export default function WidgetPage() {
  const [botConfig, setBotConfig] = useState(DEMO_BOT);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [, setLoadingBot] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [botId, setBotId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("bot-id") || params.get("id");
    if (id) setBotId(id);

    async function loadBot() {
      try {
        const url = id ? `/api/widget/bots?id=${id}` : "/api/widget/bots";
        const res = await fetch(url);
        if (res.ok) {
          const bot = await res.json();
          if (bot && bot.id) {
            setBotConfig(bot);
            setMessages([{
              role: "assistant",
              content: `¡Hola! Soy ${bot.name}. ¿En qué puedo ayudarte hoy?`
            }]);
            setLoadingBot(false);
            return;
          }
        }
      } catch {
        // Using demo bot
      }
      setBotConfig(DEMO_BOT);
      setMessages([{
        role: "assistant",
        content: `¡Hola! Soy ${DEMO_BOT.name}. ¿En qué puedo ayudarte hoy?`
      }]);
      setLoadingBot(false);
    }
    loadBot();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !botConfig) return;

    const userMsg = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/widget/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          botId: botId || botConfig.id
        })
      });
      const data = await res.json();

      if (data.message) {
        setMessages(prev => [...prev, data.message]);
      } else {
        throw new Error("Sin respuesta");
      }
    } catch {
      const fallbacks = [
        "Hola! Soy Asesor Stratix. Dime, que tipo de negocio tienes y te cuento como podemos ayudarte.",
        "Te puedo ayudar con automatizacion de ventas. Cual es tu mayor desafio con clientes actualmente?",
        "Stratix reduce hasta 60% tu costo de atencion. Cuentame, como atiendes a tus leads ahora?",
        "Tenemos planes desde $29 USD. Te interesa saber cual se ajusta mejor a tu negocio?",
        "Automatizo tu WhatsApp, Instagram y Web 24/7. Te gustaria ver una demo gratuita?"
      ];
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: "assistant",
          content: fallbacks[Math.floor(Math.random() * fallbacks.length)]
        }]);
        setIsTyping(false);
      }, 500);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="bg-bg min-h-screen text-white font-sans">
      <header className="px-[5%] py-4 flex justify-between items-center border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <Image src="/stratix_shield.svg" alt="Stratix" width={28} height={28} className="w-7" />
          <span className="font-extrabold">Stratix AI</span>
          <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded">GEMINI 2.0</span>
        </div>
        <div className="flex items-center gap-2 text-xs opacity-50">
          <Cpu size={14} />
          Powered by Google AI
        </div>
      </header>

      <main className="max-w-[600px] mx-auto px-[5%] py-8">
        <div className="text-center mb-8">
          <h1 className="text-[1.8rem] font-black mb-2">Prueba el agente IA</h1>
          <p className="opacity-50">Conectado con {botConfig?.name || "Multi-Motor IA"}</p>
          <div className="flex justify-center gap-4 mt-4 text-xs opacity-40">
            <span className="flex items-center gap-1">
              <Zap size={12} /> Respuesta instantánea
            </span>
            <span className="flex items-center gap-1">
              <FiMessageSquare size={12} /> Contexto completo
            </span>
          </div>
        </div>

        <div className="bg-white/[0.02] rounded-[20px] border border-accent/15 overflow-hidden">
          <div className="p-4 bg-accent/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                <FiMessageSquare size={20} color="#000" />
              </div>
              <div>
                <div className="font-extrabold text-sm">{botConfig?.name || "Agente IA"}</div>
                <div className="text-xs opacity-50 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Multi-Motor IA ✓
                </div>
              </div>
            </div>
            <Zap color="#D4AF37" />
          </div>

          <div ref={scrollRef} className="h-[350px] overflow-y-auto p-4 flex flex-col gap-3">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`${
                  msg.role === 'assistant' ? 'bg-white/5 self-start' : 'bg-accent/15 self-end'
                } p-3 px-4 rounded-[14px] text-sm max-w-[85%]`}
              >
                {msg.content}
              </motion.div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-2 opacity-50 text-xs">
                <Cpu size={14} className="spin" />
                Gemini está pensando...
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t border-white/5 flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm outline-none"
            />
            <button type="submit" className="p-3 bg-accent border-none rounded-xl cursor-pointer">
              <Send size={18} color="#000" />
            </button>
          </form>
        </div>

        <p className="text-center mt-6 opacity-30 text-xs">
          Conectando con Multi-Motor IA - El sistema más robusto con 4 engines activos
        </p>
      </main>

      <Toaster theme="dark" position="top-center" />
    </div>
  );
}
