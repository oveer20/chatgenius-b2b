"use client";

import { motion } from "framer-motion";

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

export default function AIModelsSection() {
  return (
    <section style={{ 
      padding: '6rem 5%', 
      background: 'linear-gradient(180deg, #030712 0%, #0a1628 100%)',
      borderTop: '1px solid rgba(255,255,255,0.05)'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}
      >
        <span style={{
          display: 'inline-block',
          padding: '6px 16px',
          borderRadius: '100px',
          border: '1px solid rgba(212,175,55,0.3)',
          background: 'rgba(212,175,55,0.1)',
          color: '#D4AF37',
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          marginBottom: '1.5rem'
        }}>
          ⚙️ MÚLTIPLES MOTORES DE IA
        </span>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          color: '#f0f2f8',
          marginBottom: '1rem'
        }}>
          No dependés de una sola IA
        </h2>

        <p style={{
          fontSize: '1.1rem',
          color: '#8892a4',
          maxWidth: '600px',
          margin: '0 auto 3rem'
        }}>
          Stratix combina los mejores modelos de IA. Si uno falla, otro responde automáticamente. Siempre online, siempre disponible.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {AI_MODELS.map((model, i) => (
            <motion.div
              key={model.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '1.5rem',
                textAlign: 'left',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: model.color
              }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                <span style={{ fontSize: '2rem' }}>{model.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, color: '#f0f2f8', fontSize: '1rem' }}>{model.name}</div>
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
                marginBottom: '1rem'
              }}>
                {model.badge}
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {model.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#8892a4' }}>
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: model.color }} />
                    {f}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{
          marginTop: '3rem',
          padding: '1.5rem',
          background: 'rgba(212,175,55,0.05)',
          border: '1px solid rgba(212,175,55,0.2)',
          borderRadius: '12px',
          maxWidth: '700px',
          margin: '3rem auto 0'
        }}>
          <p style={{ color: '#D4AF37', fontWeight: 600, marginBottom: '0.5rem' }}>
            🔄 Failover Automático
          </p>
          <p style={{ color: '#8892a4', fontSize: '0.9rem' }}>
            Si Gemini falla → OpenAI responde. Si ambos fallan → Groq toma el control. Si todos fallan → Respuestas instantáneas locales. Tu agent siempre está online.
          </p>
        </div>
      </motion.div>
    </section>
  );
}