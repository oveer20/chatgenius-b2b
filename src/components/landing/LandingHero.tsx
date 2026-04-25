"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const DEMO_MESSAGES = [
  { role: 'user', text: '¿Cuánto cuesta el apartamento en zona norte?', avatar: 'TU' },
  { role: 'bot', text: 'Tenemos opciones desde $480M hasta $850M en la zona norte. ¿Te interesa alguna gama en particular?', avatar: 'AI' },
  { role: 'user', text: 'Algo alrededor de $500 millones', avatar: 'TU' },
  { role: 'bot', text: 'Perfecto, hay varios apartamentos de $480-520M en Chapinero y Cedro Bolívar. ¿Te agendo una visita esta semana?', avatar: 'AI' },
];

export default function LandingHero() {
  const [messages, setMessages] = useState<typeof DEMO_MESSAGES>([]);
  const [showTyping, setShowTyping] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < DEMO_MESSAGES.length) {
        setMessages(prev => [...prev, DEMO_MESSAGES[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section style={{ position: 'relative', zIndex: 2, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px clamp(1.5rem, 5vw, 4rem) 80px', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 40% at 50% 20%, rgba(212,175,55,0.12) 0%, transparent 70%)' }} />

      <div style={{ position: 'absolute', top: '15%', left: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', opacity: 0, animation: 'fadeUp 0.8s ease forwards 0.2s' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(212,175,55,0.25)', background: 'rgba(212,175,55,0.06)', color: '#D4AF37', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.08em', padding: '6px 14px', borderRadius: '100px', marginBottom: '2.5rem' }}>
          ✦ Multi-Motor IA · 4 engines activos
        </div>

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '2rem', color: '#f0f2f8' }}>
          Tu agente IA que<br />
          <span style={{ color: '#D4AF37', fontStyle: 'italic' }}>vende 24/7</span>
        </h1>

        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: '#8892a4', maxWidth: '580px', lineHeight: 1.7, marginBottom: '3rem', fontWeight: 300 }}>
          Automatiza tu atención en WhatsApp, Web e Instagram. Califica leads, agenda citas y cierra ventas mientras duermes.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '4rem', opacity: 0, animation: 'fadeUp 0.8s ease forwards 0.6s' }}>
          <Link href="/login" style={{ background: '#D4AF37', color: '#030a05', fontSize: '0.95rem', fontWeight: 600, padding: '14px 32px', borderRadius: '16px', textDecoration: 'none', boxShadow: '0 0 30px rgba(212,175,55,0.3)' }}>Probar gratis 14 días →</Link>
          <Link href="/widget" style={{ padding: '13px 28px', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '16px', fontWeight: 500, textDecoration: 'none', color: '#f0f2f8', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2"/><path d="M6.5 5.5L10.5 8L6.5 10.5V5.5Z" fill="currentColor"/></svg>
            Ver demo en vivo
          </Link>
        </div>

        <div style={{ position: 'relative', maxWidth: '700px', margin: '0 auto', opacity: 0, animation: 'fadeUp 0.8s ease forwards 0.8s' }}>
          <div style={{ position: 'absolute', inset: '-40px', background: 'radial-gradient(ellipse 60% 40% at 50% 80%, rgba(212,175,55,0.1) 0%, transparent 70%)', filter: 'blur(20px)', pointerEvents: 'none' }} />

          <div style={{ background: '#111520', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 40px 120px rgba(0,0,0,0.8)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#febc2e' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840' }} />
              <div style={{ marginLeft: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#4a5568', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', padding: '3px 12px', borderRadius: '6px' }}>Stratix · Agente Demo</div>
            </div>

            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: '260px' }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 600, fontFamily: 'var(--font-mono)', background: msg.role === 'bot' ? 'linear-gradient(135deg, #D4AF37, #B8860B)' : 'rgba(255,255,255,0.1)', border: msg.role === 'user' ? '1px solid rgba(255,255,255,0.07)' : 'none', color: msg.role === 'bot' ? '#000' : '#8892a4' }}>
                    {msg.avatar}
                  </div>
                  <div style={{ maxWidth: '75%', padding: '10px 14px', borderRadius: '14px', fontSize: '0.85rem', lineHeight: 1.55, background: msg.role === 'bot' ? 'rgba(212,175,55,0.08)' : 'rgba(255,255,255,0.06)', border: msg.role === 'bot' ? '1px solid rgba(212,175,55,0.15)' : '1px solid rgba(255,255,255,0.07)', color: '#f0f2f8', borderBottomLeftRadius: msg.role === 'bot' ? '4px' : '14px', borderBottomRightRadius: msg.role === 'user' ? '4px' : '14px' }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {showTyping && messages.length < DEMO_MESSAGES.length && (
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center', padding: '4px 0' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D4AF37', animation: 'bounce 1.2s ease-in-out infinite' }} />
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D4AF37', animation: 'bounce 1.2s ease-in-out infinite 0.2s' }} />
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D4AF37', animation: 'bounce 1.2s ease-in-out infinite 0.4s' }} />
                </div>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0.75rem 1rem', borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
              <div style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: '#8892a4', fontFamily: 'var(--font-sans)', fontSize: '0.82rem' }}>Escribe tu pregunta...</div>
              <div style={{ width: '28px', height: '28px', background: '#D4AF37', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </section>
  );
}