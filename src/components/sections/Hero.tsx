"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/components/LangContext";
import AIPlayground from "./AIPlayground";

function TypingIndicator() {
  return (
    <span style={{ display: 'flex', gap: '4px', alignItems: 'center', padding: '4px 0' }}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D4AF37', animation: `typing-bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
      ))}
    </span>
  );
}

export default function Hero() {
  const { t, lang } = useLang();
  const [aiText, setAiText] = useState("");
  const [typing, setTyping] = useState(true);
  const indexRef = useRef(0);

  const DEMO_TEXT = lang === "es" 
    ? "¡Perfecto! Tenemos apartamento de $520M en Chapinero, 85m², 3 habitaciones. ¿Te agendo una visita mañana?"
    : "Perfect! We have an apartment for $520M in Chapinero, 85m², 3 bedrooms. Can I schedule a visit tomorrow?";

  useEffect(() => {
    const timer = setTimeout(() => {
      setTyping(false);
      const interval = setInterval(() => {
        if (indexRef.current < DEMO_TEXT.length) {
          setAiText(DEMO_TEXT.slice(0, indexRef.current + 1));
          indexRef.current += 1;
        } else {
          clearInterval(interval);
        }
      }, 18);
      return () => clearInterval(interval);
    }, 2500);
    return () => clearTimeout(timer);
  }, [lang]);

  const DEMO_USER = lang === "es" ? "Hola, busco apartamento en Bogotá $500-550M" : "Hi, I'm looking for an apartment in Bogotá $500-550M";
  const DEMO_PLACEHOLDER = lang === "es" ? "Escribe tu mensaje..." : "Type your message...";
  const DEMO_TAB = lang === "es" ? "Stratix Intelligence · Agente Demo" : "Stratix Intelligence · Demo Agent";

  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px clamp(1.5rem, 5vw, 4rem) 80px', overflow: 'hidden' }}>
      {/* Mesh gradient background */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 40% at 50% 20%, rgba(212,175,55,0.1) 0%, transparent 70%)' }} />
      <div style={{ position: 'absolute', top: '15%', left: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div style={{ position: 'absolute', top: '40%', right: '5%', width: '250px', height: '250px', background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)', filter: 'blur(50px)' }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '20%', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      {/* Floating orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30 + i * 10, 0],
            x: [0, 20 - i * 8, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
          style={{
            position: 'absolute',
            left: `${15 + i * 18}%`,
            top: `${20 + i * 12}%`,
            width: 4 + i * 2,
            height: 4 + i * 2,
            borderRadius: '50%',
            background: i % 2 === 0 ? '#D4AF37' : '#B8860B',
            boxShadow: `0 0 ${8 + i * 4}px ${i % 2 === 0 ? 'rgba(212,175,55,0.5)' : 'rgba(184,134,11,0.4)'}`,
            opacity: 0.4 + i * 0.1,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Live status badge */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '8px', 
          padding: '8px 16px', 
          borderRadius: '100px', 
          marginBottom: '24px',
          background: 'rgba(212,175,55,0.08)',
          border: '1px solid rgba(212,175,55,0.2)',
          color: '#D4AF37',
          fontSize: '13px',
          fontWeight: 600,
          backdropFilter: 'blur(10px)',
        }}
      >
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#25D366', boxShadow: '0 0 8px #25D366', animation: 'pulse-glow 2s infinite' }} />
        <span>{lang === "es" ? "Agente activo ahora" : "Agent active now"}</span>
      </motion.div>

      {/* Section label */}
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(212,175,55,0.25)', background: 'rgba(212,175,55,0.06)', color: '#D4AF37', fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.08em', padding: '8px 16px', borderRadius: '100px', marginBottom: '24px' }}>
        {t.hero.badge}
      </motion.div>

      {/* Main heading */}
      <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(3rem, 8vw, 7rem)', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '32px', color: '#f0f2f8' }}>
        {t.hero.titleLine1}<br /><em style={{ color: '#D4AF37', fontStyle: 'italic' }}>{t.hero.titleLine2}</em>
      </motion.h1>

      {/* Subtitle */}
      <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} style={{ fontSize: '18px', color: '#8892a4', maxWidth: '560px', lineHeight: 1.7, marginBottom: '48px' }}>
        {t.hero.subtitle}
      </motion.p>

      {/* CTA Buttons */}
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '80px' }}>
        <motion.a 
          href="/login" 
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          style={{ background: '#D4AF37', color: '#030a05', fontSize: '15px', fontWeight: 600, padding: '14px 32px', borderRadius: '14px', textDecoration: 'none', display: 'inline-block', boxShadow: '0 4px 20px rgba(212,175,55,0.3)', transition: 'box-shadow 0.2s' }}
          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 40px rgba(212,175,55,0.5)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(212,175,55,0.3)'; }}
        >
          {t.hero.cta1}
        </motion.a>
        <motion.a 
          href="/widget" 
          whileHover={{ scale: 1.03, y: -2, borderColor: 'rgba(212,175,55,0.4)', background: 'rgba(212,175,55,0.06)' }}
          whileTap={{ scale: 0.98 }}
          style={{ padding: '13px 28px', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '14px', fontWeight: 500, textDecoration: 'none', color: '#f0f2f8', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.03)', fontSize: '15px', transition: 'all 0.2s' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2"/><path d="M6.5 5.5L10.5 8L6.5 10.5V5.5Z" fill="currentColor"/></svg>
          {t.hero.cta2}
        </motion.a>
        <AIPlayground />
      </motion.div>

      {/* Chat Mockup with glassmorphism */}
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1 }} style={{ position: 'relative', width: '100%', maxWidth: '700px' }}>
        {/* Glow behind chat */}
        <div style={{ position: 'absolute', inset: '-40px', background: 'radial-gradient(ellipse 60% 40% at 50% 80%, rgba(212,175,55,0.12) 0%, transparent 70%)', filter: 'blur(20px)', pointerEvents: 'none' }} />

        <div style={{ 
          background: 'rgba(17,21,32,0.7)', 
          backdropFilter: 'blur(20px)', 
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)', 
          borderRadius: '20px', 
          overflow: 'hidden', 
          boxShadow: '0 40px 120px rgba(0,0,0,0.7), 0 0 40px rgba(212,175,55,0.08), inset 0 1px 0 rgba(255,255,255,0.05)' 
        }}>
          {/* Browser chrome */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#febc2e' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840' }} />
            <span style={{ marginLeft: '12px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#4a5568', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', padding: '4px 12px', borderRadius: '6px' }}>{DEMO_TAB}</span>
          </div>

          {/* Messages */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px', minHeight: '260px' }}>
            <div style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 600, fontFamily: 'var(--font-mono)', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.07)', color: '#8892a4' }}>{lang === "es" ? "TÚ" : "YOU"}</div>
              <div style={{ maxWidth: '75%', padding: '12px 16px', borderRadius: '16px', borderBottomRightRadius: '4px', fontSize: '14px', lineHeight: 1.55, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.07)', color: '#f0f2f8', fontFamily: 'var(--font-sans)' }}>
                {DEMO_USER}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 600, fontFamily: 'var(--font-mono)', background: 'linear-gradient(135deg, #D4AF37, #B8860B)', color: '#000', boxShadow: '0 2px 8px rgba(212,175,55,0.3)' }}>AI</div>
              <div style={{ maxWidth: '75%', padding: '12px 16px', borderRadius: '16px', borderBottomLeftRadius: '4px', fontSize: '14px', lineHeight: 1.55, background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.15)', color: '#f0f2f8', fontFamily: 'var(--font-sans)', minHeight: '40px' }}>
                {typing ? <TypingIndicator /> : aiText}
              </div>
            </div>
          </div>

          {/* Input area */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
            <span style={{ flex: 1, fontSize: '14px', color: '#4a5568', fontFamily: 'var(--font-sans)' }}>{DEMO_PLACEHOLDER}</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#D4AF37', boxShadow: '0 2px 10px rgba(212,175,55,0.3)' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        </div>
      </motion.div>

      <style>{`
        @keyframes typing-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 4px #25D366; }
          50% { box-shadow: 0 0 12px #25D366; }
        }
      `}</style>
    </section>
  );
}
