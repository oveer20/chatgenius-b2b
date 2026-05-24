"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/components/LangContext";
import AIPlayground from "./AIPlayground";

function TypingIndicator() {
  return (
    <span className="flex gap-1 items-center py-1">
      {[0, 1, 2].map((i) => (
        <span key={i} className="w-1.5 h-1.5 rounded-full bg-accent" style={{ animation: `typing-bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
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
  const DEMO_TAB = lang === "es" ? "Stratix Intelligence · Agente Demo" : "Stratix Intelligence · Demo Agent";

  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', width: '100%', padding: '120px 5vw 80px', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 40% at 50% 20%,rgba(212,175,55,0.1) 0%,transparent 70%)' }} />
      <div style={{ position: 'absolute', top: '15%', left: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle,rgba(212,175,55,0.08) 0%,transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '40%', right: '5%', width: '250px', height: '250px', background: 'radial-gradient(circle,rgba(59,130,246,0.06) 0%,transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '20%', width: '200px', height: '200px', background: 'radial-gradient(circle,rgba(16,185,129,0.05) 0%,transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '9999px', background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)', color: '#D4AF37', fontSize: '12px', fontWeight: 600, backdropFilter: 'blur(8px)', marginBottom: '24px' }}>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#25D366', boxShadow: '0 0 8px #25D366' }} />
        <span>{lang === "es" ? "Agente activo ahora" : "Agent active now"}</span>
      </div>

      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(212,175,55,0.25)', background: 'rgba(212,175,55,0.08)', color: '#D4AF37', fontFamily: "'DM Mono', monospace", fontSize: '12px', fontWeight: 600, padding: '6px 16px', borderRadius: '9999px', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '24px' }}>
        {t.hero.badge}
      </div>

      <h1 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 'clamp(3rem,8vw,7rem)', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '32px', color: '#f0f2f8', maxWidth: '1200px' }}>
        {t.hero.titleLine1}<br /><em style={{ color: '#D4AF37', fontStyle: 'normal' }}>{t.hero.titleLine2}</em>
      </h1>

      <p style={{ fontSize: '1.125rem', color: '#8892a4', maxWidth: '560px', lineHeight: 1.6, marginBottom: '48px' }}>
        {t.hero.subtitle}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '80px' }}>
        <a href="/login" style={{ background: '#D4AF37', color: '#030a05', fontSize: '15px', fontWeight: 600, padding: '14px 32px', borderRadius: '12px', textDecoration: 'none', display: 'inline-block', boxShadow: '0 4px 20px rgba(212,175,55,0.3)' }}>
          {t.hero.cta1}
        </a>
        <a href="/widget" style={{ padding: '13px 28px', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', fontWeight: 500, textDecoration: 'none', color: '#f0f2f8', display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.03)', fontSize: '15px' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2"/><path d="M6.5 5.5L10.5 8L6.5 10.5V5.5Z" fill="currentColor"/></svg>
          {t.hero.cta2}
        </a>
        <AIPlayground />
      </div>

      <div style={{ position: 'relative', width: '100%', maxWidth: '700px' }}>
        <div style={{ position: 'absolute', inset: '-40px', background: 'radial-gradient(ellipse 60% 40% at 50% 80%,rgba(212,175,55,0.12) 0%,transparent 70%)', filter: 'blur(20px)', pointerEvents: 'none' }} />

        <div style={{ background: 'rgba(17,21,32,0.7)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 40px 120px rgba(0,0,0,0.7), 0 0 40px rgba(212,175,55,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#febc2e' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840' }} />
            <span style={{ marginLeft: '12px', fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#4a5568', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', padding: '4px 12px', borderRadius: '6px' }}>{DEMO_TAB}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px', minHeight: '260px' }}>
            <div style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 600, fontFamily: "'DM Mono', monospace", background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.07)', color: '#8892a4' }}>{lang === "es" ? "TÚ" : "YOU"}</div>
              <div style={{ maxWidth: '75%', padding: '12px 16px', borderRadius: '16px 16px 4px 16px', fontSize: '14px', lineHeight: 1.5, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.07)', color: '#f0f2f8', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
                {DEMO_USER}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 600, fontFamily: "'DM Mono', monospace", background: 'linear-gradient(135deg, #D4AF37, #B8860B)', color: '#000', boxShadow: '0 2px 8px rgba(212,175,55,0.3)' }}>AI</div>
              <div style={{ maxWidth: '75%', padding: '12px 16px', borderRadius: '16px 16px 16px 4px', fontSize: '14px', lineHeight: 1.5, background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.15)', color: '#f0f2f8', fontFamily: "'DM Sans', system-ui, sans-serif", minHeight: '40px' }}>
                {typing ? <TypingIndicator /> : aiText}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
            <span style={{ flex: 1, fontSize: '14px', color: '#4a5568', fontFamily: "'DM Sans', system-ui, sans-serif" }}>{lang === "es" ? "Escribe tu mensaje..." : "Type your message..."}</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#D4AF37', boxShadow: '0 2px 10px rgba(212,175,55,0.3)' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes typing-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
