"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLang } from "@/components/LangContext";

function TypingIndicator() {
  return (
    <span style={{ display: 'flex', gap: '4px', alignItems: 'center', padding: '4px 0' }}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D4AF37', animation: `typing-bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
      ))}
    </span>
  );
}

function AnimatedAgent() {
  const [pulse, setPulse] = useState(true);
  
  useEffect(() => {
    const interval = setInterval(() => setPulse(p => !p), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      animate={{ 
        scale: pulse ? [1, 1.05, 1] : 1,
        y: pulse ? [0, -5, 0] : 0,
      }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      style={{ position: 'relative', width: '80px', height: '80px' }}
    >
      {/* Outer glow */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: 'absolute',
          inset: '-10px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 70%)',
        }}
      />
      
      {/* Avatar circle */}
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 32px rgba(212,175,55,0.5)',
        border: '3px solid rgba(255,255,255,0.2)',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* AI Icon */}
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      
      {/* Status indicator */}
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        style={{
          position: 'absolute',
          bottom: '2px',
          right: '2px',
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          background: '#25D366',
          border: '3px solid #111520',
        }}
      />
    </motion.div>
  );
}

function FloatingParticles() {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 400 - 200,
    y: Math.random() * 200 - 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
  }));

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          animate={{
            y: [p.y, p.y - 50, p.y],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
          }}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: '#D4AF37',
            boxShadow: `0 0 ${p.size * 2}px #D4AF37`,
          }}
        />
      ))}
    </div>
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
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 40% at 50% 20%, rgba(212,175,55,0.1) 0%, transparent 70%)' }} />
      <div style={{ position: 'absolute', top: '15%', left: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      {/* Animated Agent Section REMOVED for cleaner look */}

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
          fontWeight: 600
        }}
      >
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#25D366', boxShadow: '0 0 8px #25D366' }} />
        <span>{lang === "es" ? "Agente activo ahora" : "Agent active now"}</span>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(212,175,55,0.25)', background: 'rgba(212,175,55,0.06)', color: '#D4AF37', fontFamily: "'DM Mono', monospace", fontSize: '12px', letterSpacing: '0.08em', padding: '8px 16px', borderRadius: '100px', marginBottom: '24px' }}>
        {t.hero.badge}
      </motion.div>

      <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 'clamp(3rem, 8vw, 7rem)', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '32px', color: '#f0f2f8' }}>
        {t.hero.titleLine1}<br /><em style={{ color: '#D4AF37', fontStyle: 'italic' }}>{t.hero.titleLine2}</em>
      </motion.h1>

      <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} style={{ fontSize: '18px', color: '#8892a4', maxWidth: '560px', lineHeight: 1.7, marginBottom: '48px' }}>
        {t.hero.subtitle}
      </motion.p>

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '80px' }}>
        <Link href="/login" style={{ background: '#D4AF37', color: '#030a05', fontSize: '15px', fontWeight: 600, padding: '14px 32px', borderRadius: '14px', textDecoration: 'none', display: 'inline-block', transition: 'transform 0.2s, box-shadow 0.2s' }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(212,175,55,0.4)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
        >
          {t.hero.cta1}
        </Link>
        <Link href="/widget" style={{ padding: '13px 28px', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '14px', fontWeight: 500, textDecoration: 'none', color: '#f0f2f8', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.03)', fontSize: '15px', transition: 'background 0.2s, border-color 0.2s' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2"/><path d="M6.5 5.5L10.5 8L6.5 10.5V5.5Z" fill="currentColor"/></svg>
          {t.hero.cta2}
        </Link>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1 }} style={{ position: 'relative', width: '100%', maxWidth: '700px' }}>
        <div style={{ position: 'absolute', inset: '-40px', background: 'radial-gradient(ellipse 60% 40% at 50% 80%, rgba(212,175,55,0.12) 0%, transparent 70%)', filter: 'blur(20px)', pointerEvents: 'none' }} />

        <div style={{ background: '#111520', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 40px 120px rgba(0,0,0,0.8)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#febc2e' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840' }} />
            <span style={{ marginLeft: '12px', fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#4a5568', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', padding: '4px 12px', borderRadius: '6px' }}>{DEMO_TAB}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px', minHeight: '260px' }}>
            <div style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 600, fontFamily: "'DM Mono', monospace", background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.07)', color: '#8892a4' }}>{lang === "es" ? "TÚ" : "YOU"}</div>
              <div style={{ maxWidth: '75%', padding: '12px 16px', borderRadius: '16px', borderBottomRightRadius: '4px', fontSize: '14px', lineHeight: 1.55, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.07)', color: '#f0f2f8', fontFamily: "'DM Sans', sans-serif" }}>
                {DEMO_USER}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 600, fontFamily: "'DM Mono', monospace", background: 'linear-gradient(135deg, #D4AF37, #B8860B)', color: '#000' }}>AI</div>
              <div style={{ maxWidth: '75%', padding: '12px 16px', borderRadius: '16px', borderBottomLeftRadius: '4px', fontSize: '14px', lineHeight: 1.55, background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.15)', color: '#f0f2f8', fontFamily: "'DM Sans', sans-serif", minHeight: '40px' }}>
                {typing ? <TypingIndicator /> : aiText}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
            <span style={{ flex: 1, fontSize: '14px', color: '#4a5568', fontFamily: "'DM Sans', sans-serif" }}>{DEMO_PLACEHOLDER}</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#D4AF37', cursor: 'pointer' }}>
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
      `}</style>
    </section>
  );
}