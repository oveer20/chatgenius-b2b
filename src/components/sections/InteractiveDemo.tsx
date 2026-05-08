"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/components/LangContext";

interface Msg {
  role: "user" | "bot";
  text: string;
}

const KNOWLEDGE = `
Stratix Intelligence es una plataforma de automatización de ventas con IA.
Planes: Starter ($49 USD/mes, 1 agente), Growth ($199 USD/mes, 3 agentes), Enterprise ($499 USD/mes, agentes ilimitados).
Características: Respuesta automática 24/7 en WhatsApp, Instagram y Web. Scoring automático de leads (Hot/Warm/Cold). Integración con Mercado Pago. Dashboard en tiempo real. Configuración en 15 minutos sin código.
Garantía: 7 días gratis y devolución del 100% en 30 días.
No se requiere tarjeta de crédito para comenzar.
`;

const SYSTEM_PROMPT = `
Eres un asesor de ventas experto de Stratix Intelligence, una plataforma B2B de automatización de ventas con IA.
TU TONO: Profesional, cálido, ejecutivo y resolutivo. Siempre en español.
TU IDIOMA: Responde siempre en el idioma que use el usuario.
REGLAS:
1. Sé conciso - máximo 2-3 oraciones por respuesta
2. Habla de beneficios concretos (leads, ventas, tiempo)
3. Si preguntan por precio, menciona los planes y los 7 días gratis
4. Siempre invita a agendar una demo si hay interés
5. Nunca menciones que eres una IA
6. Clasifica la intención: si quiere comprar/agendar = HOT, si pregunta detalles = WARM, si solo curiosea = COLD
`;

export default function InteractiveDemo() {
  const { lang } = useLang();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isStarted = messages.length > 0;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    const userMsg: Msg = { role: "user", text };
    const history = messages.map(m => ({ role: m.role, content: m.text }));
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...history, { role: "user", content: text }],
          systemPrompt: SYSTEM_PROMPT,
          knowledgeBase: KNOWLEDGE,
          model: "gemini",
          botId: "demo",
        }),
      });
      const data = await response.json();
      const reply = data.message?.content || data.message?.text || (lang === "es"
        ? "Gracias por tu mensaje. Para darte la mejor información, ¿me puedes contar más sobre tu negocio?"
        : "Thanks for your message. To give you the best information, can you tell me more about your business?");
      setMessages(prev => [...prev, { role: "bot", text: reply }]);
    } catch {
      const fallback = lang === "es"
        ? "Gracias por tu mensaje. ¿Te gustaría agendar una demo personalizada?"
        : "Thanks for your message. Would you like to schedule a personalized demo?";
      setMessages(prev => [...prev, { role: "bot", text: fallback }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input.trim());
  };

  const startDemo = () => {
    const intro = lang === "es"
      ? "¡Hola! 👋 Soy tu asesor virtual de Stratix. Cuéntame, ¿en qué tipo de negocio estás?"
      : "Hi! 👋 I'm your Stratix virtual advisor. Tell me, what type of business are you in?";
    setMessages([{ role: "bot", text: intro }]);
  };

  const title = lang === "es" ? "Prueba el demo en vivo" : "Try the live demo";
  const subtitle = lang === "es"
    ? "Conversa con nuestra IA. Sin registro. Sin tarjeta. Solo escribe."
    : "Chat with our AI. No signup. No card. Just type.";

  return (
    <section style={{
      padding: 'clamp(4rem, 10vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
      maxWidth: '700px',
      margin: '0 auto',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginBottom: '2rem', position: 'relative' }}
      >
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#f0f2f8', marginBottom: '12px' }}>
          {title}
        </h2>
        <p style={{ color: '#8892a4', fontSize: '16px' }}>{subtitle}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          background: 'rgba(17,21,32,0.9)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(212,175,55,0.15)',
          borderRadius: '20px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
          <div style={{ display: 'flex', gap: '5px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#febc2e' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840' }} />
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#D4AF37', letterSpacing: '1px' }}>
            STRATIX AI · DEMO
          </span>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981' }} />
            <span style={{ fontSize: '10px', color: '#10b981', fontFamily: 'var(--font-mono)' }}>ONLINE</span>
          </div>
        </div>

        <div ref={scrollRef} style={{ padding: '20px', minHeight: '300px', maxHeight: '380px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {!isStarted ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '260px', gap: '20px' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #D4AF37, #B8860B)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(212,175,55,0.4)', fontSize: '28px' }}>
                🤖
              </div>
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: '#f0f2f8', marginBottom: '6px' }}>
                  {lang === "es" ? "Asistente IA Demo" : "AI Assistant Demo"}
                </h3>
                <p style={{ color: '#8892a4', fontSize: '13px' }}>
                  {lang === "es" ? "IA real · Respuestas en segundos" : "Real AI · Responses in seconds"}
                </p>
              </div>
              <button onClick={startDemo} style={{ padding: '12px 32px', background: '#D4AF37', color: '#000', border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 20px rgba(212,175,55,0.3)' }}>
                {lang === "es" ? "Iniciar chat" : "Start chat"}
              </button>
            </div>
          ) : (
            <>
              {messages.map((msg, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: msg.role === "user" ? "row-reverse" : "row", alignItems: 'flex-start', gap: '10px' }}>
                  {msg.role === "bot" && (
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #D4AF37, #B8860B)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '12px' }}>
                      🤖
                    </div>
                  )}
                  <div style={{ maxWidth: '75%', padding: '10px 14px', borderRadius: '14px', fontSize: '14px', lineHeight: 1.6, background: msg.role === "user" ? '#D4AF37' : 'rgba(255,255,255,0.05)', color: msg.role === "user" ? '#000' : '#f0f2f8', border: msg.role === "bot" ? '1px solid rgba(212,175,55,0.1)' : 'none' }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #D4AF37, #B8860B)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>
                    🤖
                  </div>
                  <div style={{ display: 'flex', gap: '4px', padding: '10px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,175,55,0.1)', borderRadius: '14px' }}>
                    {[0,1,2].map(i => (
                      <span key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D4AF37', animation: `typing-bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {isStarted && (
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', padding: '14px 18px', borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={lang === "es" ? "Escribe tu mensaje..." : "Type your message..."}
              disabled={isTyping}
              style={{ flex: 1, padding: '10px 14px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', color: '#f0f2f8', fontSize: '14px', outline: 'none' }}
            />
            <button type="submit" disabled={!input.trim() || isTyping} style={{ padding: '10px 16px', background: '#D4AF37', color: '#000', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: input.trim() ? 'pointer' : 'default', opacity: input.trim() ? 1 : 0.5 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
              </svg>
            </button>
          </form>
        )}
      </motion.div>

      {!isStarted && (
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <a href="/login" style={{ color: '#8892a4', fontSize: '14px', textDecoration: 'none' }}>
            {lang === "es" ? "¿Listo para el dashboard completo? " : "Ready for the full dashboard? "}
            <span style={{ color: '#D4AF37', fontWeight: 600 }}>{lang === "es" ? "Crea tu cuenta gratis →" : "Create free account →"}</span>
          </a>
        </div>
      )}

      <style>{`@keyframes typing-bounce { 0%, 60%, 100% { transform: translateY(0); opacity: 0.4; } 30% { transform: translateY(-5px); opacity: 1; } }`}</style>
    </section>
  );
}