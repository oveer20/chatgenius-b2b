"use client";

import { motion } from "framer-motion";
import { useLang } from "@/components/LangContext";

export default function VideoDemo() {
  const { lang } = useLang();

  const title = lang === "es"
    ? "Mira cómo funciona en 60 segundos"
    : "See how it works in 60 seconds";
  const sub = lang === "es"
    ? "Automatización real, no simulaciones"
    : "Real automation, not simulations";

  return (
    <section style={{
      padding: 'clamp(4rem, 10vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
      maxWidth: '900px',
      margin: '0 auto',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginBottom: '2.5rem' }}
      >
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#f0f2f8', marginBottom: '12px' }}>
          {title}
        </h2>
        <p style={{ color: '#8892a4', fontSize: '16px' }}>{sub}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', cursor: 'pointer', aspectRatio: '16/9', background: '#0d1017', border: '1px solid rgba(255,255,255,0.1)', maxWidth: '800px', margin: '0 auto' }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.08) 0%, transparent 70%)' }} />

        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: '80px', height: '80px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #D4AF37, #B8860B)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 40px rgba(212,175,55,0.5)',
              cursor: 'pointer',
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M8 5v14l11-7z" fill="#000" />
            </svg>
          </motion.div>
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: '#f0f2f8', marginBottom: '4px' }}>
              {lang === "es" ? "Ver video de demo" : "Watch demo video"}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#D4AF37', letterSpacing: '2px' }}>
              ▶ 0:60
            </div>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: '16px', right: '16px', display: 'flex', gap: '12px' }}>
          {["ES", "EN", "PT"].map((lang_code, i) => (
            <span key={lang_code} style={{
              fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700,
              color: i === 0 ? '#D4AF37' : '#4a5568',
              background: i === 0 ? 'rgba(212,175,55,0.2)' : 'transparent',
              padding: '4px 8px', borderRadius: '4px',
              cursor: 'pointer',
            }}>
              {lang_code}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}