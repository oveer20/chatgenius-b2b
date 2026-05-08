"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/components/LangContext";

interface Msg {
  role: "user" | "bot";
  text: string;
}

const DEMO_RESPONSES_ES = [
  "¡Hola! 👋 Soy tu asistente Stratix. Veo que te interesa automatizar la atención de tu empresa. Cuéntame, ¿de qué industria eres?",
  "Perfecto, {industry}. ¿Cuántos leads recibes aproximadamente al día?",
  "Entiendo. ¿Actualmente cómo atienden a sus prospectos? ¿WhatsApp, llamada, email?",
  "Con Stratix podrías automatizar el 80% de esas conversaciones. El bot responde en 2 segundos, agenda citas y califica leads automáticamente. ¿Quieres ver cómo se ve en tu WhatsApp?",
];

const DEMO_RESPONSES_EN = [
  "Hi! 👋 I'm your Stratix assistant. I see you're interested in automating your business. Tell me, what industry are you in?",
  "Great, {industry}. How many leads do you get approximately per day?",
  "I see. How do you currently handle your prospects? WhatsApp, calls, email?",
  "With Stratix you could automate 80% of those conversations. The bot responds in 2 seconds, books appointments and scores leads automatically. Want to see how it looks on your WhatsApp?",
];

const QUICK_REPLIES_ES = [
  ["Inmobiliarias", "Restaurantes", "Salud", "Retail"],
  ["Menos de 10", "10-50", "50-200", "Más de 200"],
  ["Solo WhatsApp", "WhatsApp + Web", "Varias fuentes"],
  ["¡Sí, quiero!", "Cuéntame más"],
];

const QUICK_REPLIES_EN = [
  ["Real Estate", "Restaurants", "Healthcare", "Retail"],
  ["Under 10", "10-50", "50-200", "More than 200"],
  ["WhatsApp only", "WhatsApp + Web", "Multiple sources"],
  ["Yes, please!", "Tell me more"],
];

export default function InteractiveDemo() {
  const { lang } = useLang();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [step, setStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [industry, setIndustry] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const responses = lang === "es" ? DEMO_RESPONSES_ES : DEMO_RESPONSES_EN;
  const quickReplies = lang === "es" ? QUICK_REPLIES_ES : QUICK_REPLIES_EN;
  const isStarted = step > 0;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (!isStarted) return;
    setIsTyping(true);
    const timer = setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { role: "bot", text: responses[step - 1].replace("{industry}", industry) }]);
    }, 1200 + Math.random() * 600);
    return () => clearTimeout(timer);
  }, [step]);

  const handleQuickReply = (reply: string) => {
    setMessages(prev => [...prev, { role: "user", text: reply }]);
    if (step === 1) setIndustry(reply);
    setStep(s => s + 1);
  };

  const startDemo = () => {
    setStep(1);
    setMessages([]);
  };

  const title = lang === "es" ? "Prueba el demo en vivo" : "Try the live demo";
  const subtitle = lang === "es" ? "Sin registro. Sin tarjeta. Solo escribe y ve cómo funciona." : "No signup. No card. Just type and see how it works.";

  return (
    <section style={{
      padding: 'clamp(4rem, 10vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
      maxWidth: '600px',
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
          background: 'rgba(17,21,32,0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(212,175,55,0.15)',
          borderRadius: '20px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#febc2e' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840' }} />
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#D4AF37', letterSpacing: '1px' }}>
            STRATIX INTELLIGENCE · DEMO
          </span>
        </div>

        <div ref={scrollRef} style={{ padding: '20px', minHeight: '320px', maxHeight: '400px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {!isStarted ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '280px', gap: '24px' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #D4AF37, #B8860B)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(212,175,55,0.4)' }}>
                <span style={{ fontSize: '28px' }}>🤖</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: '#f0f2f8', marginBottom: '8px' }}>
                  {lang === "es" ? "Asistente IA Demo" : "AI Assistant Demo"}
                </h3>
                <p style={{ color: '#8892a4', fontSize: '14px' }}>
                  {lang === "es" ? "3 preguntas · 60 segundos" : "3 questions · 60 seconds"}
                </p>
              </div>
              <button onClick={startDemo} style={{ padding: '12px 32px', background: '#D4AF37', color: '#000', border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>
                {lang === "es" ? "Iniciar demo" : "Start demo"}
              </button>
            </div>
          ) : (
            <>
              {messages.map((msg, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'flex-start', gap: '10px' }}>
                  {msg.role === "bot" && (
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #D4AF37, #B8860B)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontSize: '12px' }}>🤖</span>
                    </div>
                  )}
                  <div style={{ maxWidth: '78%', padding: '12px 16px', borderRadius: '14px', fontSize: '14px', lineHeight: 1.6, background: msg.role === "user" ? '#D4AF37' : 'rgba(255,255,255,0.05)', color: msg.role === "user" ? '#000' : '#f0f2f8', border: msg.role === "bot" ? '1px solid rgba(212,175,55,0.1)' : 'none' }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #D4AF37, #B8860B)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '12px' }}>🤖</span>
                  </div>
                  <div style={{ display: 'flex', gap: '4px', padding: '12px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,175,55,0.1)', borderRadius: '14px' }}>
                    {[0, 1, 2].map(i => (
                      <span key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D4AF37', animation: `typing-bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                    ))}
                  </div>
                </div>
              )}
              {step > 0 && step < responses.length && !isTyping && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                  {quickReplies[step - 1]?.map((reply) => (
                    <motion.button
                      key={reply}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleQuickReply(reply)}
                      style={{ padding: '8px 16px', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '20px', color: '#D4AF37', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      {reply}
                    </motion.button>
                  ))}
                </div>
              )}
              {step >= responses.length && !isTyping && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', padding: '16px', background: 'rgba(16,185,129,0.1)', borderRadius: '14px', border: '1px solid rgba(16,185,129,0.2)' }}>
                  <p style={{ color: '#10b981', fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>
                    {lang === "es" ? "¡Eso es todo! ¿Listo para el siguiente paso?" : "That's all! Ready for the next step?"}
                  </p>
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <a href="/login" style={{ padding: '10px 20px', background: '#D4AF37', color: '#000', borderRadius: '10px', fontWeight: 700, fontSize: '13px', textDecoration: 'none' }}>
                      {lang === "es" ? "Crear mi bot gratis" : "Create my bot free"}
                    </a>
                    <a href="https://wa.me/573159269287" target="_blank" rel="noopener noreferrer" style={{ padding: '10px 20px', background: 'rgba(37,211,102,0.1)', color: '#25D366', border: '1px solid rgba(37,211,102,0.3)', borderRadius: '10px', fontWeight: 700, fontSize: '13px', textDecoration: 'none' }}>
                      {lang === "es" ? "Hablar con humano" : "Talk to human"}
                    </a>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </div>
      </motion.div>

      <style>{`@keyframes typing-bounce { 0%, 60%, 100% { transform: translateY(0); opacity: 0.4; } 30% { transform: translateY(-5px); opacity: 1; } }`}</style>
    </section>
  );
}