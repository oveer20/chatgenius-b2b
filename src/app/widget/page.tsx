"use client";

import { useState, useEffect, useRef } from "react";
import { FiSend, FiMessageSquare, FiShield, FiZap, FiCpu } from "react-icons/fi";
import { toast, Toaster } from "sonner";
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
  const [isOpen, setIsOpen] = useState(true);
  const [step, setStep] = useState<"lead-capture" | "chat">("chat");
  const [sessionId] = useState(() => "demo-" + Date.now());
  const [botConfig, setBotConfig] = useState<any>(DEMO_BOT);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [leadData, setLeadData] = useState({ name: "", email: "", phone: "" });
  const [loadingBot, setLoadingBot] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadBot() {
      try {
        const res = await fetch("/api/widget/bots");
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
      } catch (e) {
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

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadData.name) {
      toast.error("Ingresa tu nombre");
      return;
    }
    setStep("chat");
    setMessages(prev => [...prev, { 
      role: "assistant", 
      content: `¡Mucho gusto ${leadData.name}! ¿Qué tipo de propiedad estás buscando?` 
    }]);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !botConfig) return;

    const userMsg = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    const userInput = input;
    setInput("");
    setIsTyping(true);

    try {
      // Usar Google Gemini API real
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          systemPrompt: botConfig.system_prompt,
          knowledgeBase: "",
          model: "gemini-2.0-flash"
        })
      });
      const data = await res.json();
      
      if (data.message) {
        setMessages(prev => [...prev, data.message]);
      } else {
        throw new Error("Sin respuesta");
      }
    } catch (err) {
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
    <div style={{ background: '#060B14', minHeight: '100vh', color: 'white', fontFamily: 'Inter, sans-serif' }}>
      <header style={{ padding: '1rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/stratix_shield.svg" alt="Stratix" style={{ width: '28px' }} />
          <span style={{ fontWeight: 800 }}>Stratix AI</span>
          <span style={{ fontSize: '0.7rem', background: 'rgba(212,175,55,0.2)', color: '#D4AF37', padding: '2px 8px', borderRadius: '4px' }}>GEMINI 2.0</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', opacity: 0.5 }}>
          <FiCpu size={14} />
          Powered by Google AI
        </div>
      </header>

      <main style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem 5%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.5rem' }}>Prueba el agente IA</h1>
          <p style={{ opacity: 0.5 }}>Conectado con {botConfig?.name || "Multi-Motor IA"}</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem', fontSize: '0.75rem', opacity: 0.4 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <FiZap size={12} /> Respuesta instantánea
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <FiMessageSquare size={12} /> Contexto completo
            </span>
          </div>
        </div>

        {/* Chat */}
        <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: '1px solid rgba(212,175,55,0.15)', overflow: 'hidden' }}>
          {/* Header */}
          <div style={{ padding: '1rem', background: 'rgba(212,175,55,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FiMessageSquare size={20} color="#000" />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{botConfig?.name || "Agente IA"}</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.5, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
                  Multi-Motor IA ✓
                </div>
              </div>
            </div>
            <FiZap color="#D4AF37" />
          </div>

          {/* Messages */}
          <div ref={scrollRef} style={{ height: '350px', overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: msg.role === 'assistant' ? 'rgba(255,255,255,0.05)' : 'rgba(212,175,55,0.15)',
                  padding: '0.8rem 1rem',
                  borderRadius: '14px',
                  fontSize: '0.9rem',
                  maxWidth: '85%',
                  alignSelf: msg.role === 'assistant' ? 'flex-start' : 'flex-end'
                }}
              >
                {msg.content}
              </motion.div>
            ))}
            {isTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.5, fontSize: '0.8rem' }}>
                <FiCpu size={14} className="spin" />
                Gemini está pensando...
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '0.8rem' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu mensaje..."
              style={{ flex: 1, padding: '12px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', fontSize: '0.9rem', outline: 'none' }}
            />
            <button type="submit" style={{ padding: '12px', background: '#D4AF37', border: 'none', borderRadius: '12px', cursor: 'pointer' }}>
              <FiSend size={18} color="#000" />
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', opacity: 0.3, fontSize: '0.75rem' }}>
          Conectando con Multi-Motor IA - El sistema más robusto con 4 engines activos
        </p>
      </main>

      <Toaster theme="dark" position="top-center" />
    </div>
  );
}