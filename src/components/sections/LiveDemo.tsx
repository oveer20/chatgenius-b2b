"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/components/LangContext";
import { FiSend, FiCpu } from "react-icons/fi";

const DEMO_MESSAGES = [
  { role: "assistant", content: "¡Hola! Soy Martina, tu asesora inmobiliaria. 👋 ¿En qué puedo ayudarte hoy?" },
];

export default function LiveDemo() {
  const { lang } = useLang();
  const [messages, setMessages] = useState(DEMO_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: "user" as const, content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setHasStarted(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          systemPrompt: `Eres Martina, una asesora inmobiliaria profesional y amable de Colombia.
- Saluda amablemente
- Pregunta el tipo de propiedad que busca
- Pregunta la zona o barrio de preferencia
- Pregunta el presupuesto
- Ofrece agendar cita si está interesado

ESTILO: Amiga, profesional, respuestas cortas en español colombiano. Usa emojis estratégicamente.`,
          knowledgeBase: "",
          model: "gemini"
        })
      });
      const data = await res.json();
      if (data.message) {
        setMessages(prev => [...prev, data.message]);
      } else {
        throw new Error("No response");
      }
    } catch {
      const fallbacks = [
        "¡Excelente! Para darte mejores opciones, ¿cuál es tu presupuesto aproximado?",
        "Perfecto. ¿En qué zona de Colombia te interesa buscar?",
        "Tenemos varias propiedades increíbles. ¿Te gustaría agendar una visita guiada?",
        "¿Estás buscando para vivir o para invertir?",
      ];
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: "assistant", 
          content: fallbacks[Math.floor(Math.random() * fallbacks.length)] 
        }]);
      }, 1500);
    }
    setIsTyping(false);
  };

  return (
    <section style={{ 
      padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
      maxWidth: '800px',
      margin: '0 auto',
      textAlign: 'center',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span style={{
          display: 'inline-block',
          background: 'rgba(212,175,55,0.15)',
          color: '#D4AF37',
          fontSize: '13px',
          fontWeight: 600,
          padding: '6px 16px',
          borderRadius: '20px',
          marginBottom: '20px',
          letterSpacing: '0.5px',
        }}>
          PRUEBA AHORA
        </span>

        <h2 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 'clamp(1.8rem, 5vw, 3rem)',
          color: '#f0f2f8',
          marginBottom: '16px',
          lineHeight: 1.1,
        }}>
          Chatea con Stratix <span style={{ color: '#D4AF37' }}>en tiempo real</span>
        </h2>

        <p style={{
          color: '#8892a4',
          fontSize: '16px',
          marginBottom: '32px',
          lineHeight: 1.6,
        }}>
          {lang === "es" 
            ? "Este es un agente IA real. Pregúntale sobre propiedades, precios o agenda una cita."
            : "This is a real AI agent. Ask about properties, prices or schedule an appointment."}
        </p>

        <div style={{
          background: '#0d1017',
          border: '1px solid rgba(212,175,55,0.2)',
          borderRadius: '20px',
          overflow: 'hidden',
          maxWidth: '500px',
          margin: '0 auto',
        }}>
          {/* Header */}
          <div style={{
            padding: '16px 20px',
            background: 'rgba(212,175,55,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
            }}>
              🏠
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700, color: '#f0f2f8', fontSize: '15px' }}>
                Martina - Inmobiliaria IA
              </div>
              <div style={{ fontSize: '12px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
                En línea
              </div>
            </div>
          </div>

          {/* Messages */}
          <div 
            ref={scrollRef}
            style={{ 
              height: '350px', 
              overflowY: 'auto', 
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: msg.role === 'assistant' 
                    ? 'rgba(255,255,255,0.05)' 
                    : 'rgba(212,175,55,0.15)',
                  padding: '12px 16px',
                  borderRadius: msg.role === 'assistant' ? '0 16px 16px 16px' : '16px 16px 0 16px',
                  fontSize: '14px',
                  color: '#f0f2f8',
                  lineHeight: 1.5,
                  maxWidth: '85%',
                  alignSelf: msg.role === 'assistant' ? 'flex-start' : 'flex-end',
                }}
              >
                {msg.content}
              </motion.div>
            ))}
            {isTyping && (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                color: '#8892a4',
                fontSize: '13px',
                background: 'rgba(255,255,255,0.05)',
                padding: '12px 16px',
                borderRadius: '0 16px 16px 16px',
                alignSelf: 'flex-start',
              }}>
                <FiCpu className="spin" size={14} />
                Martina está escribiendo...
              </div>
            )}
          </div>

          {/* Input */}
          <form 
            onSubmit={handleSend}
            style={{ 
              padding: '16px',
              borderTop: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              gap: '10px',
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={lang === "es" ? "Escribe un mensaje..." : "Type a message..."}
              style={{
                flex: 1,
                padding: '12px 16px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: '#f0f2f8',
                fontSize: '14px',
                outline: 'none',
              }}
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '12px',
                background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FiSend size={18} color="#000" />
            </motion.button>
          </form>
        </div>

        <p style={{ 
          fontSize: '12px', 
          color: '#4a5568', 
          marginTop: '16px' 
        }}>
          {lang === "es" 
            ? "Multi-Engine IA · Sin registro necesario"
            : "Multi-Engine AI · No registration needed"}
        </p>
      </motion.div>
    </section>
  );
}