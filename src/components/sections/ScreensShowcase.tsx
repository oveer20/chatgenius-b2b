"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/components/LangContext";

const SCREENS = {
  es: [
    {
      title: "Dashboard de métricas",
      desc: "Ve en tiempo real cuántos leads llegan, su calificación y conversiones.",
      color: "#D4AF37",
    },
    {
      title: "Configuración del bot",
      desc: "Personaliza el tono, conocimiento y comportamiento en minutos.",
      color: "#10b981",
    },
    {
      title: "Leads calificados automáticamente",
      desc: "El bot打分 cada lead y solo pasa los HOT a tu equipo.",
      color: "#3B82F6",
    },
    {
      title: "WhatsApp real en acción",
      desc: "Respuestas automáticas en segundos, 24/7, en WhatsApp.",
      color: "#25D366",
    },
  ],
  en: [
    {
      title: "Metrics dashboard",
      desc: "See in real-time how many leads arrive, their scoring and conversions.",
      color: "#D4AF37",
    },
    {
      title: "Bot configuration",
      desc: "Customize tone, knowledge and behavior in minutes.",
      color: "#10b981",
    },
    {
      title: "Automatically scored leads",
      desc: "The bot scores every lead and only passes HOT ones to your team.",
      color: "#3B82F6",
    },
    {
      title: "Real WhatsApp in action",
      desc: "Automatic responses in seconds, 24/7, on WhatsApp.",
      color: "#25D366",
    },
  ],
};

const SCREEN_ICONS = [
  "📊",
  "⚙️",
  "🎯",
  "💬",
];

export default function ScreensShowcase() {
  const { lang } = useLang();
  const screens = SCREENS[lang as 'es' | 'en'];
  const [active, setActive] = useState(0);

  const next = () => setActive(a => (a + 1) % screens.length);
  const prev = () => setActive(a => (a - 1 + screens.length) % screens.length);

  const title = lang === "es" ? "Tu escritorio de ventas,potenciado con IA" : "Your sales desk, powered by AI";
  const subtitle = lang === "es" ? "Todo lo que ves aquí es tu dashboard real de Stratix" : "Everything you see here is your real Stratix dashboard";

  return (
    <section style={{
      padding: 'clamp(4rem, 10vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
      maxWidth: '1000px',
      margin: '0 auto',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginBottom: '3rem' }}
      >
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#f0f2f8', marginBottom: '12px' }}>
          {title.split(',')[0]},<br />
          <em style={{ color: '#D4AF37', fontStyle: 'italic' }}>{title.split(',')[1]}</em>
        </h2>
        <p style={{ color: '#8892a4', fontSize: '16px' }}>{subtitle}</p>
      </motion.div>

      <div style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35 }}
            style={{
              background: 'rgba(13,16,23,0.8)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: `1px solid ${screens[active].color}33`,
              borderRadius: '20px',
              padding: 'clamp(2rem, 5vw, 3rem)',
              boxShadow: `0 40px 80px rgba(0,0,0,0.5), 0 0 40px ${screens[active].color}15`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#febc2e' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840' }} />
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: screens[active].color, letterSpacing: '1px' }}>
                STRATIX DASHBOARD
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '16px',
                  background: `${screens[active].color}20`,
                  border: `1px solid ${screens[active].color}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '28px',
                  flexShrink: 0,
                }}>
                  {SCREEN_ICONS[active]}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: '#f0f2f8', marginBottom: '8px' }}>
                    {screens[active].title}
                  </h3>
                  <p style={{ color: '#8892a4', fontSize: '14px', lineHeight: 1.6 }}>
                    {screens[active].desc}
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {[
                  { label: lang === "es" ? "Leads hoy" : "Leads today", val: "47", color: "#D4AF37" },
                  { label: lang === "es" ? "HOT" : "HOT", val: "12", color: "#10b981" },
                  { label: lang === "es" ? "Tiempo avg" : "Avg time", val: "1.8s", color: "#3B82F6" },
                  { label: lang === "es" ? "Conversión" : "Conversion", val: "68%", color: "#D4AF37" },
                ].map((m, i) => (
                  <div key={i} style={{ padding: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700, color: m.color }}>{m.val}</div>
                    <div style={{ fontSize: '11px', color: '#4a5568', marginTop: '4px' }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '2rem', alignItems: 'center' }}>
          <button onClick={prev} style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#8892a4', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>

          <div style={{ display: 'flex', gap: '8px' }}>
            {screens.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  width: i === active ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: i === active ? '#D4AF37' : 'rgba(255,255,255,0.1)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
              />
            ))}
          </div>

          <button onClick={next} style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#8892a4', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
}