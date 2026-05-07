"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AIPlayground() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/widget/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, botId: "demo" }),
      });
      
      const data = await res.json();
      setMessages(prev => [...prev, { role: "ai", text: data.response || "Hola, en que puedo ayudarte?" }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: "ai", text: "Hola, soy Nova. Preguntame sobre precios o como automatizar tus ventas." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 24px',
          borderRadius: '12px',
          background: 'transparent',
          border: '1px solid rgba(255,255,255,0.2)',
          color: '#f0f2f8',
          fontSize: '14px',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.2s',
          fontFamily: 'var(--font-sans)',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
      >
        Prueba Nova en vivo
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              background: 'rgba(0,0,0,0.8)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '450px',
                height: '600px',
                background: '#0d1017',
                border: '1px solid rgba(212,175,55,0.3)',
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
              }}
            >
              <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ color: '#D4AF37', margin: 0, fontSize: '16px', fontWeight: 700, fontFamily: 'var(--font-sans)' }}>Nova · Agente IA</h3>
                  <p style={{ color: '#27C93F', margin: 0, fontSize: '12px', fontFamily: 'var(--font-sans)' }}>En linea · Demo en vivo</p>
                </div>
                <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#8892a4', fontSize: '24px', cursor: 'pointer' }}>x</button>
              </div>

              <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {messages.length === 0 && (
                  <div style={{ textAlign: 'center', color: '#4a5568', fontSize: '13px', marginTop: '40px', fontFamily: 'var(--font-sans)' }}>
                    Hola, soy Nova. Preguntame sobre precios, caracteristicas o pidele una demo a mi creador.
                  </div>
                )}
                {messages.map((msg, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                    <div style={{
                      padding: '10px 14px',
                      borderRadius: '12px',
                      maxWidth: '80%',
                      fontSize: '14px',
                      lineHeight: 1.4,
                      background: msg.role === "user" ? "rgba(212,175,55,0.15)" : "rgba(255,255,255,0.05)",
                      color: '#f0f2f8',
                      border: msg.role === "user" ? "1px solid rgba(212,175,55,0.2)" : "1px solid rgba(255,255,255,0.07)",
                      fontFamily: 'var(--font-sans)',
                    }}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div style={{ display: 'flex', gap: '4px', padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', width: 'fit-content' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8892a4', animation: 'bounce 1.4s infinite' }} />
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8892a4', animation: 'bounce 1.4s infinite 0.2s' }} />
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8892a4', animation: 'bounce 1.4s infinite 0.4s' }} />
                  </div>
                )}
              </div>

              <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '8px' }}>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Escribe tu mensaje..."
                  style={{
                    flex: 1,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    color: '#fff',
                    outline: 'none',
                    fontFamily: 'var(--font-sans)',
                  }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isTyping}
                  style={{
                    background: input.trim() ? '#D4AF37' : 'rgba(255,255,255,0.05)',
                    color: input.trim() ? '#000' : '#8892a4',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0 16px',
                    fontWeight: 600,
                    cursor: input.trim() ? 'pointer' : 'not-allowed',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
      `}</style>
    </>
  );
}
