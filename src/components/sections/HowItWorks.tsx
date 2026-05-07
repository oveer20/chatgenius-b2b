"use client";

import { useLang } from "@/components/LangContext";
import SectionLabel from "@/components/ui/SectionLabel";
import { motion } from "framer-motion";

const STEPS = {
  es: [
    { num: "01", title: "Conecta tus canales", desc: "WhatsApp, Instagram, tu web... Stratix se integra en minutos." },
    { num: "02", title: "Sube tu información", desc: "PDFs, catálogos, precios, políticas. Sin código, sin complicaciones." },
    { num: "03", title: "Personaliza tu agente", desc: "Define el tono, personalidad y conocimientos de tu asistente IA." },
    { num: "04", title: "Listo para vender", desc: "Tu agente responde 24/7. Aprende de cada conversación." },
  ],
  en: [
    { num: "01", title: "Connect your channels", desc: "WhatsApp, Instagram, your web... Stratix integrates in minutes." },
    { num: "02", title: "Upload your information", desc: "PDFs, catalogs, prices, policies. No code, no complications." },
    { num: "03", title: "Customize your agent", desc: "Define the tone, personality and knowledge of your AI assistant." },
    { num: "04", title: "Ready to sell", desc: "Your agent responds 24/7. Learns from every conversation." },
  ],
};

export default function HowItWorks() {
  const { t, lang } = useLang();
  const steps = STEPS[lang as keyof typeof STEPS];

  return (
    <section id="como-funciona" style={{ padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <span style={{ width: '24px', height: '1px', background: '#D4AF37' }} />
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '12px', letterSpacing: '0.12em', color: '#D4AF37', textTransform: 'uppercase' }}>{t.how.label}</span>
      </div>
      <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '16px', color: '#f0f2f8' }}>{t.how.title}<br /><em style={{ color: '#D4AF37', fontStyle: 'italic' }}>{t.how.titleEm}</em></h2>
      <p style={{ fontSize: '16px', color: '#8892a4', marginBottom: '48px' }}>{t.how.subtitle}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
        {steps.map((step: any, i: number) => (
          <motion.div key={step.num} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} style={{ padding: '32px', background: '#0d1017', borderRight: i < steps.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none', position: 'relative' }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#4a5568', letterSpacing: '0.08em', marginBottom: '20px' }}>{step.num} —</div>
            <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: '1.3rem', marginBottom: '12px', color: '#f0f2f8' }}>{step.title}</h3>
            <p style={{ fontSize: '14px', color: '#8892a4', lineHeight: 1.65 }}>{step.desc}</p>
            {i < steps.length - 1 && <div style={{ position: 'absolute', top: '32px', right: 0, width: '1px', height: '50px', background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.07), transparent)' }} />}
          </motion.div>
        ))}
      </div>
    </section>
  );
}