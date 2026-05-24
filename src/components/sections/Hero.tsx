"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/components/LangContext";
import AIPlayground from "./AIPlayground";

function TypingIndicator() {
  return (
    <span className="flex gap-1 items-center py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-accent"
          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
        />
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
    indexRef.current = 0;
    setAiText("");
    setTyping(true);

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
    }, 2500);

    return () => {
      clearTimeout(timer);
    };
  }, [lang]);

  const DEMO_USER = lang === "es" ? "Hola, busco apartamento en Bogotá $500-550M" : "Hi, I'm looking for an apartment in Bogotá $500-550M";
  const DEMO_TAB = lang === "es" ? "Stratix Intelligence · Agente Demo" : "Stratix Intelligence · Demo Agent";

  const fadeUp = (delay = 0) => ({ initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: "easeOut" as const, delay } });

  return (
    <section style={{ position: 'relative', minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', width: '100%', padding: '120px 5vw 80px', overflow: 'hidden', background: 'radial-gradient(ellipse 100% 60% at 50% 0%, rgba(212,175,55,0.04) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(59,130,246,0.03) 0%, transparent 50%), var(--color-bg)' }}>
      <motion.div
        animate={{ scale: [1, 1.03, 1], rotate: [0, 1, -1, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 40% at 50% 20%,rgba(212,175,55,0.12) 0%,transparent 70%)', pointerEvents: 'none' }}
      />
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: 'absolute', top: '15%', left: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle,rgba(212,175,55,0.08) 0%,transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }}
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{ position: 'absolute', top: '40%', right: '5%', width: '250px', height: '250px', background: 'radial-gradient(circle,rgba(59,130,246,0.06) 0%,transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none' }}
      />
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{ position: 'absolute', bottom: '10%', left: '20%', width: '200px', height: '200px', background: 'radial-gradient(circle,rgba(16,185,129,0.05) 0%,transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }}
      />

      <motion.div {...fadeUp()} style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <motion.div {...fadeUp()} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '9999px', background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)', color: '#D4AF37', fontSize: '12px', fontWeight: 600, backdropFilter: 'blur(8px)', marginBottom: '24px' }}>
          <motion.span
            animate={{ boxShadow: ['0 0 4px #25D366', '0 0 12px #25D366', '0 0 4px #25D366'] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#25D366', display: 'inline-block' }}
          />
          <span>{lang === "es" ? "Agente activo ahora" : "Agent active now"}</span>
        </motion.div>

        <motion.div {...fadeUp()} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(212,175,55,0.25)', background: 'rgba(212,175,55,0.08)', color: '#D4AF37', fontFamily: "'DM Mono', monospace", fontSize: '12px', fontWeight: 600, padding: '6px 16px', borderRadius: '9999px', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '24px' }}>
          {t.hero.badge}
        </motion.div>

        <motion.h1 {...fadeUp()} style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 'clamp(3rem,8vw,7rem)', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '32px', color: '#f0f2f8', maxWidth: '1200px' }}>
          {t.hero.titleLine1}<br /><em style={{ color: '#D4AF37', fontStyle: 'normal' }}>{t.hero.titleLine2}</em>
        </motion.h1>

        <motion.p {...fadeUp()} style={{ fontSize: '1.125rem', color: '#8892a4', maxWidth: '560px', lineHeight: 1.6, marginBottom: '48px' }}>
          {t.hero.subtitle}
        </motion.p>

        <motion.div {...fadeUp()} style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '80px' }}>
          <motion.a
            href="/login"
            whileHover={{ scale: 1.04, boxShadow: '0 6px 30px rgba(212,175,55,0.4)' }}
            whileTap={{ scale: 0.97 }}
            style={{ background: '#D4AF37', color: '#030a05', fontSize: '15px', fontWeight: 600, padding: '14px 32px', borderRadius: '12px', textDecoration: 'none', display: 'inline-block', boxShadow: '0 4px 20px rgba(212,175,55,0.3)' }}
          >
            {t.hero.cta1}
          </motion.a>
          <motion.a
            href="/widget"
            whileHover={{ scale: 1.04, background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.25)' }}
            whileTap={{ scale: 0.97 }}
            style={{ padding: '13px 28px', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', fontWeight: 500, textDecoration: 'none', color: '#f0f2f8', display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.03)', fontSize: '15px' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2"/><path d="M6.5 5.5L10.5 8L6.5 10.5V5.5Z" fill="currentColor"/></svg>
            {t.hero.cta2}
          </motion.a>
          <AIPlayground />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.9, ease: "easeOut", delay: 0.6 }} style={{ position: 'relative', width: '100%', maxWidth: '700px' }}>
          <div style={{ position: 'absolute', inset: '-40px', background: 'radial-gradient(ellipse 60% 40% at 50% 80%,rgba(212,175,55,0.12) 0%,transparent 70%)', filter: 'blur(20px)', pointerEvents: 'none' }} />

          <motion.div
            whileHover={{ boxShadow: '0 40px 120px rgba(0,0,0,0.7), 0 0 60px rgba(212,175,55,0.15)' }}
            style={{ background: 'rgba(17,21,32,0.7)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 40px 120px rgba(0,0,0,0.7), 0 0 40px rgba(212,175,55,0.08)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#febc2e' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840' }} />
              <span style={{ marginLeft: '12px', fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#4a5568', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', padding: '4px 12px', borderRadius: '6px' }}>{DEMO_TAB}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px', minHeight: '260px' }}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'flex-start', gap: '12px' }}
              >
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 600, fontFamily: "'DM Mono', monospace", background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.07)', color: '#8892a4' }}>{lang === "es" ? "TÚ" : "YOU"}</div>
                <div style={{ maxWidth: '75%', padding: '12px 16px', borderRadius: '16px 16px 4px 16px', fontSize: '14px', lineHeight: 1.5, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.07)', color: '#f0f2f8', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
                  {DEMO_USER}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}
              >
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 600, fontFamily: "'DM Mono', monospace", background: 'linear-gradient(135deg, #D4AF37, #B8860B)', color: '#000', boxShadow: '0 2px 8px rgba(212,175,55,0.3)' }}>AI</div>
                <div style={{ maxWidth: '75%', padding: '12px 16px', borderRadius: '16px 16px 16px 4px', fontSize: '14px', lineHeight: 1.5, background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.15)', color: '#f0f2f8', fontFamily: "'DM Sans', system-ui, sans-serif", minHeight: '40px' }}>
                  {typing ? <TypingIndicator /> : aiText}
                </div>
              </motion.div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
              <span style={{ flex: 1, fontSize: '14px', color: '#4a5568', fontFamily: "'DM Sans', system-ui, sans-serif" }}>{lang === "es" ? "Escribe tu mensaje..." : "Type your message..."}</span>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{ width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#D4AF37', boxShadow: '0 2px 10px rgba(212,175,55,0.3)' }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
