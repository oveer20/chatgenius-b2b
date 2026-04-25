"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiSend, FiMessageSquare, FiMic, FiImage, FiFileText, FiCpu, FiZap, FiCheck } from "react-icons/fi";

const MODES = [
  { id: "chat", icon: <FiMessageSquare />, label: "Chat" },
  { id: "voice", icon: <FiMic />, label: "Voz" },
  { id: "vision", icon: <FiImage />, label: "Visión" },
  { id: "docs", icon: <FiFileText />, label: "Documentos" }
];

export default function StratixEngine() {
  const [mounted, setMounted] = useState(false);
  const [input, setInput] = useState("");
  const [activeMode, setActiveMode] = useState("chat");
  const [messages, setMessages] = useState([
    { role: "bot", text: "Stratix Engine v1.0 listo. ¿En qué puedo ayudarte?" }
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div style={{ minHeight: '400px', background: '#030712' }} />;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: "user", text: input }]);
    setInput("");
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "bot", text: "Procesando tu solicitud... Conectando con modelos Gemini 1.5 Pro + GPT-4o" }]);
    }, 1000);
  };

  return (
    <section id="engine" style={{ padding: '8rem 5%', background: '#0a0a0f', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '10px 20px', background: 'rgba(139,92,246,0.1)', borderRadius: '30px', border: '1px solid rgba(139,92,246,0.25)', marginBottom: '1.5rem' }}>
            <FiCpu color="#8b5cf6" size={16} />
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#8b5cf6', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Stratix Engine v1.0</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: '0.5rem' }}>
            Acceso<span style={{ color: '#8b5cf6' }}> Multimodal</span>
          </h2>
          <p style={{ fontSize: '0.9rem', opacity: 0.5 }}>Chat, Voz, Visión y Documentos — todo en un solo lugar.</p>
        </div>

        {/* Engine Console */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            background: 'rgba(10,10,15,0.8)',
            borderRadius: '20px',
            border: '1px solid rgba(139,92,246,0.2)',
            overflow: 'hidden'
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(139,92,246,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FiCpu color="#fff" size={16} />
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>Stratix Engine</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.4 }}>v1.0 · Multimodal</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', opacity: 0.5 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
              Online
            </div>
          </div>

          {/* Mode Selector */}
          <div style={{ display: 'flex', gap: '1rem', padding: '1rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
            {MODES.map(mode => (
              <button
                key={mode.id}
                onClick={() => setActiveMode(mode.id)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '10px',
                  border: 'none',
                  background: activeMode === mode.id ? 'rgba(139,92,246,0.15)' : 'transparent',
                  color: activeMode === mode.id ? '#8b5cf6' : 'rgba(255,255,255,0.4)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  transition: 'all 0.2s ease'
                }}
              >
                {mode.icon}
                {mode.label}
              </button>
            ))}
          </div>

          {/* Chat Area */}
          <div style={{ height: '250px', overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: msg.role === 'bot' ? 'rgba(255,255,255,0.03)' : 'rgba(139,92,246,0.15)',
                  color: msg.role === 'bot' ? 'rgba(255,255,255,0.7)' : '#fff',
                  padding: '1rem 1.2rem',
                  borderRadius: '14px',
                  fontSize: '0.9rem',
                  maxWidth: '85%',
                  alignSelf: msg.role === 'bot' ? 'flex-start' : 'flex-end'
                }}
              >
                {msg.text}
              </motion.div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} style={{ display: 'flex', gap: '1rem', padding: '1rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu mensaje o pregunta..."
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                padding: '1rem 1.2rem',
                color: '#fff',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              style={{
                padding: '1rem 1.5rem',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.9rem'
              }}
            >
              <FiSend size={18} />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}