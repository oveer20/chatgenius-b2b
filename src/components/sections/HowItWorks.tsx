"use client";

import { useLang } from "@/components/LangContext";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

const STEP_ICONS = {
  es: [
    { icon: "🔗", label: "Integración" },
    { icon: "📄", label: "Conocimiento" },
    { icon: "⚙️", label: "Personalización" },
    { icon: "🚀", label: "Activación" },
  ],
  en: [
    { icon: "🔗", label: "Integration" },
    { icon: "📄", label: "Knowledge" },
    { icon: "⚙️", label: "Customization" },
    { icon: "🚀", label: "Launch" },
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

function StepCard({ step, icon, index, isLast }: { step: { num: string; title: string; desc: string }; icon: { icon: string; label: string }; index: number; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    setTilt({ x, y });
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
      {/* Icon circle */}
      <div style={{
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))',
        border: '1px solid rgba(212,175,55,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        marginBottom: '20px',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        boxShadow: isHovered ? '0 0 20px rgba(212,175,55,0.2)' : 'none',
      }}>
        {icon.icon}
      </div>

      {/* Step number */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        color: '#D4AF37',
        letterSpacing: '0.08em',
        marginBottom: '12px',
        opacity: isHovered ? 1 : 0.6,
        transition: 'opacity 0.3s ease',
      }}>
        {step.num} — {icon.label}
      </div>

      <h3 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '1.3rem',
        marginBottom: '12px',
        color: '#f0f2f8',
        transition: 'color 0.3s ease',
      }}>
        {step.title}
      </h3>
      <p style={{ fontSize: '14px', color: '#8892a4', lineHeight: 1.65 }}>
        {step.desc}
      </p>

      {/* Connector line */}
      {!isLast && (
        <div style={{
          position: 'absolute',
          top: '56px',
          right: '-1px',
          width: '2px',
          height: '40px',
          background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.3), transparent)',
          opacity: isHovered ? 1 : 0.3,
          transition: 'opacity 0.3s ease',
        }} />
      )}

      {/* Glow effect on hover */}
      {isHovered && (
        <motion.div
          layoutId="step-glow"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '16px',
            background: 'radial-gradient(circle at 50% 0%, rgba(212,175,55,0.08) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />
      )}
    </motion.div>
  );
}

export default function HowItWorks() {
  const { t, lang } = useLang();
  const steps = STEPS[lang as keyof typeof STEPS];
  const icons = STEP_ICONS[lang as keyof typeof STEP_ICONS];

  return (
    <section id="como-funciona" style={{
      padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
      maxWidth: '1200px',
      margin: '0 auto',
      position: 'relative',
    }}>
      {/* Background accent */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '-10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginBottom: '56px' }}
      >
        <span style={{
          display: 'inline-block',
          background: 'rgba(212,175,55,0.15)',
          color: '#D4AF37',
          fontSize: '13px',
          fontWeight: 600,
          padding: '6px 16px',
          borderRadius: '20px',
          marginBottom: '16px',
          letterSpacing: '0.5px',
        }}>
          {t.how.label}
        </span>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          marginBottom: '16px',
          color: '#f0f2f8',
        }}>
          {t.how.title}<br />
          <em style={{ color: '#D4AF37', fontStyle: 'italic' }}>{t.how.titleEm}</em>
        </h2>
        <p style={{ fontSize: '16px', color: '#8892a4' }}>{t.how.subtitle}</p>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '0',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(13,16,23,0.5)',
        backdropFilter: 'blur(10px)',
      }}>
        {steps.map((step: any, i: number) => (
          <StepCard key={step.num} step={step} icon={icons[i]} index={i} isLast={i === steps.length - 1} />
        ))}
      </div>
    </section>
  );
}
