"use client";

import { useLang } from "@/components/LangContext";
import { motion } from "framer-motion";

const CONTENT = {
  es: {
    label: "RIESGO CERO",
    title: "7 días gratis · Sin tarjeta · Cancela cuando quieras",
    badge: "Garantía de devolución 100%",
    desc: "Si Stratix no genera resultados en 30 días, te devolvemos el 100% de tu inversión.",
  },
  en: {
    label: "ZERO RISK",
    title: "7 days free · No card needed · Cancel anytime",
    badge: "100% money-back guarantee",
    desc: "If Stratix doesn't generate results in 30 days, we refund 100% of your investment.",
  },
};

export default function GuaranteeBanner() {
  const { lang } = useLang();
  const c = CONTENT[lang as 'es' | 'en'];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: 'linear-gradient(135deg, rgba(212,175,55,0.12) 0%, rgba(16,185,129,0.08) 100%)',
        borderTop: '1px solid rgba(212,175,55,0.2)',
        borderBottom: '1px solid rgba(16,185,129,0.15)',
        padding: '12px clamp(1.5rem, 5vw, 3rem)',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(12px, 3vw, 24px)', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 900, letterSpacing: '2px', color: '#D4AF37', background: 'rgba(212,175,55,0.15)', padding: '4px 10px', borderRadius: '6px' }}>
            {c.label}
          </span>
        </div>
        <span style={{ fontSize: '15px', fontWeight: 600, color: '#f0f2f8' }}>
          {c.title}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', color: '#10b981' }}>✓</span>
          <span style={{ fontSize: '13px', color: '#8892a4' }}>{c.badge}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', color: '#D4AF37' }}>🛡</span>
          <span style={{ fontSize: '13px', color: '#8892a4' }}>{c.desc}</span>
        </div>
      </div>
    </motion.div>
  );
}