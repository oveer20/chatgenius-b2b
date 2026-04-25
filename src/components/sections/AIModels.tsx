"use client";

import { motion } from "framer-motion";
import { useLang } from "@/components/LangContext";
import { useState } from "react";

const AI_MODELS = [
  {
    name: "Gemini 2.0 Flash",
    provider: "Google",
    badge: "Principal",
    color: "#4285F4",
    icon: "🎯",
    features: ["Ultra rápido", "Multimodal", "Contexto largo"]
  },
  {
    name: "GPT-3.5 Turbo",
    provider: "OpenAI",
    badge: "Backup",
    color: "#10A37F",
    icon: "⚡",
    features: ["Muy estable", "Conversacional", "Escalable"]
  },
  {
    name: "Llama 3.1 8B",
    provider: "Groq",
    badge: "GRATIS",
    color: "#FF6B35",
    icon: "🚀",
    features: ["1000 tok/seg", "Gratis", "Ultra rápido"]
  },
  {
    name: "Mistral Small",
    provider: "Mistral AI",
    badge: "GRATIS",
    color: "#9F7AEA",
    icon: "💨",
    features: ["Eficiente", "Versátil", "Bajo costo"]
  }
];

const TRANSLATIONS = {
  es: {
    badge: "MÚLTIPLES MOTORES DE IA",
    title: "No dependés de una sola IA",
    subtitle: "Stratix combina los mejores modelos de IA. Si uno falla, otro responde automáticamente. Siempre online, siempre disponible.",
    failoverTitle: "🔄 Failover Automático",
    failoverDesc: "Si Gemini falla → OpenAI responde. Si ambos fallan → Groq toma el control. Si todos fallan → Respuestas instantáneas locales. Tu agente siempre está online."
  },
  en: {
    badge: "MULTIPLE AI ENGINES",
    title: "Don't rely on a single AI",
    subtitle: "Stratix combines the best AI models. If one fails, another responds automatically. Always online, always available.",
    failoverTitle: "🔄 Automatic Failover",
    failoverDesc: "If Gemini fails → OpenAI responds. If both fail → Groq takes control. If all fail → Instant local responses. Your agent is always online."
  }
};

function AIModelCard({ model, index }: { model: typeof AI_MODELS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '28px',
        background: hovered
          ? 'rgba(13, 21, 32, 0.8)'
          : 'rgba(13, 16, 23, 0.6)',
        backdropFilter: hovered ? 'blur(20px)' : 'blur(10px)',
        border: hovered
          ? '1px solid rgba(212,175,55,0.4)'
          : '1px solid rgba(255,255,255,0.07)',
        borderRadius: '16px',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: hovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: hovered
          ? '0 25px 50px rgba(0,0,0,0.5), 0 0 40px rgba(212,175,55,0.1)'
          : '0 10px 40px rgba(0,0,0,0.3)',
        position: 'relative',
        overflow: 'hidden',
        minWidth: '220px',
        flex: 1,
      }}
    >
      {hovered && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: `linear-gradient(90deg, transparent, ${model.color}, transparent)`,
        }} />
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <span style={{ fontSize: '1.8rem' }}>{model.icon}</span>
        <div>
          <div style={{ fontWeight: 700, color: '#f0f2f8', fontSize: '0.95rem' }}>{model.name}</div>
          <div style={{ fontSize: '0.75rem', color: '#8892a4' }}>{model.provider}</div>
        </div>
      </div>

      <span style={{
        display: 'inline-block',
        padding: '4px 10px',
        borderRadius: '6px',
        background: model.badge === 'GRATIS' ? 'rgba(16,185,129,0.2)' : 'rgba(212,175,55,0.2)',
        color: model.badge === 'GRATIS' ? '#10b981' : '#D4AF37',
        fontSize: '0.7rem',
        fontWeight: 700,
        marginBottom: '16px',
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.05em'
      }}>
        {model.badge}
      </span>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {model.features.map((f, j) => (
          <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#8892a4' }}>
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: model.color }} />
            {f}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function AIModelsSection() {
  const { lang } = useLang();
  const t = TRANSLATIONS[lang];

  return (
    <section style={{
      padding: '8rem 5%',
      background: 'linear-gradient(180deg, #030712 0%, #0a1628 100%)',
      borderTop: '1px solid rgba(255,255,255,0.03)'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}
      >
        <span style={{
          display: 'inline-block',
          padding: '8px 20px',
          borderRadius: '100px',
          border: '1px solid rgba(212,175,55,0.3)',
          background: 'rgba(212,175,55,0.08)',
          color: '#D4AF37',
          fontSize: '0.7rem',
          fontWeight: 700,
          letterSpacing: '0.15em',
          marginBottom: '2rem',
          fontFamily: 'var(--font-mono)',
        }}>
          ✦ {t.badge}
        </span>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          color: '#f0f2f8',
          marginBottom: '1.2rem',
          lineHeight: 1.1,
          letterSpacing: '-0.02em'
        }}>
          {t.title}
        </h2>

        <p style={{
          fontSize: '1.1rem',
          color: '#8892a4',
          maxWidth: '600px',
          margin: '0 auto 4rem',
          lineHeight: 1.7
        }}>
          {t.subtitle}
        </p>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.5rem',
          maxWidth: '1000px',
          margin: '0 auto',
          justifyContent: 'center'
        }}>
          {AI_MODELS.map((model, i) => (
            <AIModelCard key={model.name} model={model} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{
            marginTop: '4rem',
            padding: '2rem',
            background: 'rgba(13, 16, 23, 0.6)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(212,175,55,0.2)',
            borderRadius: '16px',
            maxWidth: '700px',
            margin: '4rem auto 0'
          }}
        >
          <p style={{ color: '#D4AF37', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.9rem' }}>
            {t.failoverTitle}
          </p>
          <p style={{ color: '#8892a4', fontSize: '0.9rem', lineHeight: 1.6 }}>
            {t.failoverDesc}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}