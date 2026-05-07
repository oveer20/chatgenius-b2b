"use client";

import Link from "next/link";
import { useLang } from "@/components/LangContext";
import SectionLabel from "@/components/ui/SectionLabel";
import { motion } from "framer-motion";
import { useState } from "react";

const FEATURES = [
  { icon: "01", titleKey: "memory", descKey: "memoryDesc" },
  { icon: "02", titleKey: "speed", descKey: "speedDesc", stat: "0.18s", statLabel: "LATENCY" },
  { icon: "03", titleKey: "channels", descKey: "channelsDesc", tags: true },
  { icon: "04", titleKey: "analytics", descKey: "analyticsDesc", chart: true },
  { icon: "05", titleKey: "security", descKey: "securityDesc", badge: "GDPR" },
  { icon: "06", titleKey: "language", descKey: "languageDesc", langs: true },
];

const TRANSLATIONS = {
  es: {
    memory: "IA con memoria contextual", memoryDesc: "Stratix recuerda el historial completo de tus clientes para respuestas profundamente relevantes.",
    speed: "Respuesta instantánea", speedDesc: "Latencia promedio por debajo de 200ms. Tus clientes no esperan.",
    channels: "Multi-canal", channelsDesc: "WhatsApp, Instagram, Web y más. Un solo agente para todos tus canales.",
    analytics: "Analytics en tiempo real", analyticsDesc: "Entiende patrones, mide satisfacción y optimiza automáticamente tus flujos.",
    security: "Seguridad empresarial", securityDesc: "Cifrado end-to-end, datos soberanizados y controles de acceso granulares.",
    language: "Habla su idioma", languageDesc: "Responde en el idioma de tu cliente automáticamente.",
  },
  en: {
    memory: "Contextual memory AI", memoryDesc: "Stratix remembers your clients' complete history for deeply relevant responses.",
    speed: "Instant response", speedDesc: "Average latency under 200ms. Your clients don't wait.",
    channels: "Multi-channel", channelsDesc: "WhatsApp, Instagram, Web and more. One agent for all your channels.",
    analytics: "Real-time analytics", analyticsDesc: "Understand patterns, measure satisfaction and automatically optimize your flows.",
    security: "Enterprise security", securityDesc: "End-to-end encryption, data sovereignty and granular access controls.",
    language: "Speaks their language", languageDesc: "Responds in your client's language automatically.",
  },
};

const TAGS = { es: ["WhatsApp", "Instagram", "Web", "Slack"], en: ["WhatsApp", "Instagram", "Web", "Slack"] };

function FeatureCard({ feature, index }: { feature: typeof FEATURES[0]; index: number }) {
  const { lang } = useLang();
  const [hovered, setHovered] = useState(false);
  const t = TRANSLATIONS[lang as keyof typeof TRANSLATIONS];
  const tags = TAGS[lang as keyof typeof TAGS];

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
        borderRight: '1px solid rgba(255,255,255,0.07)', 
        borderBottom: '1px solid rgba(255,255,255,0.07)', 
        minWidth: '280px', 
        flex: 1,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: hovered ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: hovered 
          ? '0 25px 50px rgba(0,0,0,0.5), 0 0 40px rgba(212,175,55,0.1)' 
          : '0 10px 40px rgba(0,0,0,0.3)',
        border: hovered 
          ? '1px solid rgba(212,175,55,0.4)' 
          : '1px solid rgba(255,255,255,0.07)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {hovered && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
        }} />
      )}
      <div style={{ 
        width: '48px', 
        height: '48px', 
        borderRadius: '14px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        fontSize: '14px', 
        marginBottom: '20px', 
        background: hovered 
          ? 'linear-gradient(135deg, rgba(212,175,55,0.3), rgba(184,134,11,0.2))' 
          : 'rgba(212,175,55,0.1)', 
        border: '1px solid rgba(212,175,55,0.3)', 
        color: '#D4AF37', 
        fontFamily: "'DM Mono', monospace", 
        fontWeight: 600,
        transition: 'all 0.4s ease',
        boxShadow: hovered ? '0 0 20px rgba(212,175,55,0.3)' : 'none',
      }}>{feature.icon}</div>
      
      <h3 style={{ 
        fontFamily: "'DM Serif Display', Georgia, serif", 
        fontSize: '1.25rem', 
        marginBottom: '10px', 
        color: hovered ? '#D4AF37' : '#f0f2f8',
        transition: 'all 0.3s ease',
      }}>{t[feature.titleKey as keyof typeof t]}</h3>
      
      <p style={{ 
        fontSize: '14px', 
        color: '#8892a4', 
        lineHeight: 1.65, 
        marginBottom: '16px' 
      }}>{t[feature.descKey as keyof typeof t]}</p>

      {feature.stat && (
        <div>
          <div style={{ 
            fontFamily: "'DM Serif Display', Georgia, serif', serif", 
            fontSize: '3rem', 
            color: '#f0f2f8', 
            letterSpacing: '-0.03em',
            transition: 'all 0.3s ease',
          }}>{feature.stat}</div>
          <div style={{ 
            fontFamily: "'DM Mono', monospace", 
            fontSize: '10px', 
            color: '#4a5568', 
            marginTop: '8px' 
          }}>{feature.statLabel}</div>
        </div>
      )}

      {feature.tags && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {tags.map((tag: string) => (
            <span 
              key={tag} 
              style={{ 
                fontFamily: "'DM Mono', monospace", 
                fontSize: '12px', 
                color: '#8892a4', 
                padding: '6px 12px', 
                borderRadius: '8px', 
                background: 'rgba(255,255,255,0.03)', 
                border: '1px solid rgba(255,255,255,0.07)',
                transition: 'all 0.2s ease',
              }}
            >{tag}</span>
          ))}
        </div>
      )}

      {feature.chart && (
        <div style={{ marginTop: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '60px' }}>
            {[40, 55, 48, 65, 72, 60, 80, 100].map((h, i) => (
              <motion.div 
                key={i} 
                initial={{ height: '0%' }}
                whileInView={{ height: `${h}%` }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.05 }}
                style={{ 
                  flex: 1, 
                  borderRadius: '4px 4px 0 0', 
                  background: i === 7 ? '#D4AF37' : `rgba(212,175,55,${0.15 + i * 0.05})`,
                  transition: 'all 0.3s ease',
                }} 
              />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', color: '#4a5568' }}>MON</span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', color: '#D4AF37' }}>+34%</span>
          </div>
        </div>
      )}

      {feature.badge && (
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '8px', 
          padding: '6px 12px', 
          borderRadius: '100px', 
          fontFamily: "'DM Mono', monospace", 
          fontSize: '11px', 
          background: 'rgba(212,175,55,0.08)', 
          border: '1px solid rgba(212,175,55,0.2)', 
          color: '#D4AF37',
          transition: 'all 0.3s ease',
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D4AF37' }} />{feature.badge}
        </div>
      )}

      {feature.langs && (
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {["ES", "EN", "PT", "FR"].map((l: string) => (
            <motion.span 
              key={l}
              whileHover={{ scale: 1.1 }}
              style={{ 
                fontFamily: "'DM Mono', monospace", 
                fontSize: '14px', 
                color: '#D4AF37', 
                fontWeight: 600, 
                padding: '6px 10px', 
                background: 'rgba(212,175,55,0.1)', 
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >{l}</motion.span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function Features() {
  const { lang, t } = useLang();

  return (
    <section 
      id="productos" 
      style={{ 
        padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)', 
        maxWidth: '1200px', 
        margin: '0 auto' 
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <span style={{ width: '24px', height: '1px', background: '#D4AF37' }} />
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '12px', letterSpacing: '0.12em', color: '#D4AF37', textTransform: 'uppercase' }}>{t.features.label}</span>
      </div>
      
      <h2 style={{ 
        fontFamily: "'DM Serif Display', Georgia, serif", 
        fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
        lineHeight: 1.1, 
        letterSpacing: '-0.02em', 
        marginBottom: '16px', 
        color: '#f0f2f8',
      }}>
        {t.features.title}<br />
        <em style={{ color: '#D4AF37', fontStyle: 'italic' }}>{t.features.titleEm}</em>
      </h2>
      
      <p style={{ fontSize: '16px', color: '#8892a4', marginBottom: '48px' }}>{t.features.subtitle}</p>

      <motion.div 
        style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          borderRadius: '16px', 
          overflow: 'hidden', 
          border: '1px solid rgba(255,255,255,0.07)' 
        }}
      >
        {FEATURES.map((f, i) => (
          <FeatureCard key={f.icon} feature={f} index={i} />
        ))}
      </motion.div>
    </section>
  );
}