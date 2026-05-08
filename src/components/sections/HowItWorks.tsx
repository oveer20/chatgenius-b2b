"use client";

import { useLang } from "@/components/LangContext";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

const STEPS_SVG = {
  es: [
    { label: "Integración", path: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" },
    { label: "Conocimiento", path: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
    { label: "Personalización", path: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
    { label: "Activación", path: "M13 10V3L4 14h7v7l9-11h-7z" },
  ],
  en: [
    { label: "Integration", path: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" },
    { label: "Knowledge", path: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
    { label: "Customization", path: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
    { label: "Launch", path: "M13 10V3L4 14h7v7l9-11h-7z" },
  ],
};

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

function StepCard({ step, svgPath, svgLabel, index, isLast }: { step: { num: string; title: string; desc: string }; svgPath: string; svgLabel: string; index: number; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setTilt({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 8,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * -8,
    });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.15, duration: 0.5, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setTilt({ x: 0, y: 0 }); }}
      animate={isHovered ? { rotateY: tilt.x, rotateX: tilt.y } : {}}
      style={{
        padding: '32px',
        background: isHovered ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
        borderRight: isLast ? 'none' : '1px solid rgba(255,255,255,0.07)',
        position: 'relative',
        borderRadius: '16px',
        transformStyle: 'preserve-3d',
        transition: 'background 0.3s ease',
      }}
    >
      <div style={{
        width: '56px', height: '56px', borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))',
        border: '1px solid rgba(212,175,55,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '20px',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        boxShadow: isHovered ? '0 0 20px rgba(212,175,55,0.2)' : 'none',
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d={svgPath} />
        </svg>
      </div>

      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#D4AF37', letterSpacing: '0.08em', marginBottom: '12px', opacity: isHovered ? 1 : 0.6, transition: 'opacity 0.3s ease' }}>
        {step.num} — {svgLabel}
      </div>

      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', marginBottom: '12px', color: '#f0f2f8', transition: 'color 0.3s ease' }}>
        {step.title}
      </h3>
      <p style={{ fontSize: '14px', color: '#8892a4', lineHeight: 1.65 }}>{step.desc}</p>

      {!isLast && (
        <div style={{ position: 'absolute', top: '56px', right: '-1px', width: '2px', height: '40px', background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.3), transparent)', opacity: isHovered ? 1 : 0.3, transition: 'opacity 0.3s ease' }} />
      )}

      {isHovered && (
        <motion.div
          layoutId="step-glow"
          style={{ position: 'absolute', inset: 0, borderRadius: '16px', background: 'radial-gradient(circle at 50% 0%, rgba(212,175,55,0.08) 0%, transparent 60%)', pointerEvents: 'none' }}
        />
      )}
    </motion.div>
  );
}

export default function HowItWorks() {
  const { t, lang } = useLang();
  const steps = STEPS[lang as keyof typeof STEPS];
  const svgIcons = STEPS_SVG[lang as keyof typeof STEPS_SVG];

  return (
    <section id="como-funciona" style={{ padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)', maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '20%', right: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '56px' }}>
        <span style={{ display: 'inline-block', background: 'rgba(212,175,55,0.15)', color: '#D4AF37', fontSize: '13px', fontWeight: 600, padding: '6px 16px', borderRadius: '20px', marginBottom: '16px', letterSpacing: '0.5px' }}>
          {t.how.label}
        </span>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '16px', color: '#f0f2f8' }}>
          {t.how.title}<br />
          <em style={{ color: '#D4AF37', fontStyle: 'italic' }}>{t.how.titleEm}</em>
        </h2>
        <p style={{ fontSize: '16px', color: '#8892a4' }}>{t.how.subtitle}</p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(13,16,23,0.5)', backdropFilter: 'blur(10px)' }}>
        {steps.map((step, i) => (
          <StepCard key={step.num} step={step} svgPath={svgIcons[i].path} svgLabel={svgIcons[i].label} index={i} isLast={i === steps.length - 1} />
        ))}
      </div>
    </section>
  );
}