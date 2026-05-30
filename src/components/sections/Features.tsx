"use client";

import { useLang } from "@/components/LangContext";
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
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`p-7 min-w-[280px] flex-1 relative overflow-hidden border transition-all duration-500 ease-out ${
        hovered
          ? 'bg-bg/80 backdrop-blur-xl border-accent/30 shadow-[0_30px_60px_rgba(0,0,0,0.6),0_0_50px_rgba(212,175,55,0.12)] -translate-y-1'
          : 'bg-bg/60 backdrop-blur-lg border-white/10 shadow-[0_15px_45px_rgba(0,0,0,0.3)]'
      }`}
    >
      {hovered && (
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent" />
      )}
      <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center text-sm mb-5 border border-accent/30 text-accent font-mono font-semibold transition-all duration-[0.4s] ease-in-out ${
        hovered
          ? 'bg-gradient-to-br from-accent/30 to-[rgba(184,134,11,0.2)] shadow-[0_0_20px_rgba(212,175,55,0.3)]'
          : 'bg-accent/10'
      }`}>{feature.icon}</div>
      
      <h3 className={`font-serif text-xl mb-[10px] transition-all duration-[0.3s] ease-in-out ${hovered ? 'text-accent' : 'text-text-primary'}`}>
        {t[feature.titleKey as keyof typeof t]}
      </h3>
      
      <p className="text-sm text-text-secondary leading-[1.65] mb-4">
        {t[feature.descKey as keyof typeof t]}
      </p>

      {feature.stat && (
        <div>
          <div className="font-serif text-5xl text-text-primary tracking-[-0.03em] transition-all duration-[0.3s] ease-in-out">{feature.stat}</div>
          <div className="font-mono text-[10px] text-text-muted mt-2">{feature.statLabel}</div>
        </div>
      )}

      {feature.tags && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag: string) => (
            <span 
              key={tag} 
              className="font-mono text-xs text-text-secondary px-3 py-1.5 rounded-md bg-white/3 border border-white/7 transition-all duration-[0.2s] ease-in-out"
            >{tag}</span>
          ))}
        </div>
      )}

      {feature.chart && (
        <div className="mt-4">
          <div className="flex items-end gap-1 h-[60px]">
            {[40, 55, 48, 65, 72, 60, 80, 100].map((h, i) => (
              <motion.div 
                key={i} 
                initial={{ height: '0%' }}
                whileInView={{ height: `${h}%` }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.05 }}
                className={`flex-1 rounded-t transition-all duration-[0.3s] ease-in-out ${i === 7 ? 'bg-accent' : ''}`}
                style={{ background: i !== 7 ? `rgba(212,175,55,${0.15 + i * 0.05})` : undefined }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="font-mono text-[10px] text-text-muted">MON</span>
            <span className="font-mono text-[10px] text-accent">+34%</span>
          </div>
        </div>
      )}

      {feature.badge && (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-[11px] bg-accent/8 border border-accent/20 text-accent transition-all duration-[0.3s] ease-in-out">
          <span className="w-[6px] h-[6px] rounded-full bg-accent" />{feature.badge}
        </div>
      )}

      {feature.langs && (
        <div className="flex gap-3 flex-wrap">
          {["ES", "EN", "PT", "FR"].map((l: string) => (
            <motion.span 
              key={l}
              whileHover={{ scale: 1.1 }}
              className="font-mono text-sm text-accent font-semibold px-[10px] py-1.5 bg-accent/10 rounded-md cursor-pointer"
            >{l}</motion.span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function Features() {
  const { t } = useLang();

  return (
    <section 
      id="productos" 
      className="px-[clamp(1.5rem,5vw,4rem)] py-32 max-w-[1200px] mx-auto"
    >
      <div className="text-center mb-4">
        <span className="inline-block font-mono text-xs tracking-[0.12em] text-accent uppercase bg-accent-dim px-4 py-1.5 rounded-full">{t.features.label}</span>
      </div>
      
      <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-text-primary text-center">
        {t.features.title}<br />
        <em className="text-accent not-italic">{t.features.titleEm}</em>
      </h2>
      
      <p className="text-base text-text-secondary mb-12 text-center">{t.features.subtitle}</p>

      <motion.div className="flex flex-wrap rounded-[16px] overflow-hidden border border-white/10">
        {FEATURES.map((f, i) => (
          <FeatureCard key={f.icon} feature={f} index={i} />
        ))}
      </motion.div>
    </section>
  );
}
