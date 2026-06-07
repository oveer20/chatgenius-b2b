"use client";

import { useLang } from "@/components/LangContext";
import { motion } from "framer-motion";
import { useState } from "react";

const FEATURES = [
  {
    id: "memory",
    gradient: "from-accent/20 via-accent/5 to-transparent",
    accent: "#D4AF37",
  },
  {
    id: "speed",
    gradient: "from-accent/20 via-accent/5 to-transparent",
    accent: "#D4AF37",
  },
  {
    id: "channels",
    gradient: "from-accent/20 via-accent/5 to-transparent",
    accent: "#D4AF37",
  },
  {
    id: "analytics",
    gradient: "from-accent/20 via-accent/5 to-transparent",
    accent: "#D4AF37",
  },
  {
    id: "security",
    gradient: "from-accent/20 via-accent/5 to-transparent",
    accent: "#D4AF37",
  },
  {
    id: "language",
    gradient: "from-accent/20 via-accent/5 to-transparent",
    accent: "#D4AF37",
  },
];

const CONTENT = {
  es: [
    { title: "IA con memoria contextual", desc: "Stratix recuerda el historial completo de cada cliente. Respuestas profundamente relevantes en cada interacción.", stat: "∞ contexto", unit: "sesiones" },
    { title: "Respuesta instantánea", desc: "Latencia promedio por debajo de 200ms. Tus clientes reciben respuesta mientras respiran.", stat: "0.18s", unit: "lATENCIA" },
    { title: "Multi-canal nativo", desc: "WhatsApp, Instagram, Web, Slack. Un solo agente inteligente opera en todos tus canales simultáneamente.", tags: ["WhatsApp", "Instagram", "Web", "Slack"] },
    { title: "Analytics predictivo", desc: "No solo reports. Stratix identifica patrones, predice tendencias y optimiza tus flujos automáticamente.", stat: "+34%", unit: "CONVERSIÓN PROMEDIO" },
    { title: "Seguridad enterprise", desc: "Cifrado E2E, datos soberanizados en Colombia, controles de acceso granulares. Cumplimos con GDPR.", badge: "GDPR" },
    { title: "Multilingüe automático", desc: "Detecta y responde en el idioma de tu cliente automáticamente. 8 idiomas soportados.", langs: ["ES", "EN", "PT", "FR"] },
  ],
  en: [
    { title: "Contextual memory AI", desc: "Stratix remembers each client's full history. Deeply relevant responses in every interaction.", stat: "∞ context", unit: "sessions" },
    { title: "Instant response", desc: "Average latency under 200ms. Your clients get a response in the blink of an eye.", stat: "0.18s", unit: "LATENCY" },
    { title: "Native multi-channel", desc: "WhatsApp, Instagram, Web, Slack. One intelligent agent operates across all your channels simultaneously.", tags: ["WhatsApp", "Instagram", "Web", "Slack"] },
    { title: "Predictive analytics", desc: "Not just reports. Stratix identifies patterns, predicts trends, and optimizes your flows automatically.", stat: "+34%", unit: "AVERAGE CONVERSION" },
    { title: "Enterprise security", desc: "E2E encryption, data sovereignty in Colombia, granular access controls. GDPR compliant.", badge: "GDPR" },
    { title: "Auto multilingual", desc: "Detects and responds in your client's language automatically. 8 languages supported.", langs: ["ES", "EN", "PT", "FR"] },
  ],
};

function MemorySVG() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="20" stroke="#D4AF37" strokeWidth="1.5" opacity="0.3"/>
      <circle cx="24" cy="24" r="12" stroke="#D4AF37" strokeWidth="1.5"/>
      <circle cx="24" cy="24" r="5" fill="#D4AF37" opacity="0.5"/>
      <line x1="24" y1="2" x2="24" y2="8" stroke="#D4AF37" strokeWidth="1" opacity="0.4"/>
      <line x1="24" y1="40" x2="24" y2="46" stroke="#D4AF37" strokeWidth="1" opacity="0.4"/>
      <line x1="2" y1="24" x2="8" y2="24" stroke="#D4AF37" strokeWidth="1" opacity="0.4"/>
      <line x1="40" y1="24" x2="46" y2="24" stroke="#D4AF37" strokeWidth="1" opacity="0.4"/>
    </svg>
  );
}

function SpeedSVG() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M24 4L28 16H40L30 24L34 36L24 28L14 36L18 24L8 16H20L24 4Z" fill="#D4AF37" opacity="0.25" stroke="#D4AF37" strokeWidth="1.2"/>
      <path d="M24 14L26 19H31L27 22L29 27L24 24L19 27L21 22L17 19H22L24 14Z" fill="#D4AF37" opacity="0.5"/>
    </svg>
  );
}

function ChannelsSVG() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="14" cy="16" r="6" stroke="#D4AF37" strokeWidth="1.5" opacity="0.5"/>
      <circle cx="34" cy="16" r="6" stroke="#D4AF37" strokeWidth="1.5" opacity="0.5"/>
      <circle cx="24" cy="36" r="6" stroke="#D4AF37" strokeWidth="1.5"/>
      <line x1="20" y1="32" x2="16" y2="21" stroke="#D4AF37" strokeWidth="1.2" opacity="0.4"/>
      <line x1="28" y1="32" x2="32" y2="21" stroke="#D4AF37" strokeWidth="1.2" opacity="0.4"/>
    </svg>
  );
}

function AnalyticsSVG() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect x="6" y="32" width="8" height="10" rx="1" fill="#D4AF37" opacity="0.3"/>
      <rect x="18" y="22" width="8" height="20" rx="1" fill="#D4AF37" opacity="0.5"/>
      <rect x="30" y="14" width="8" height="28" rx="1" fill="#D4AF37"/>
      <line x1="6" y1="38" x2="42" y2="38" stroke="#D4AF37" strokeWidth="1" opacity="0.3"/>
      <path d="M6 34L18 28L30 22L38 16" stroke="#D4AF37" strokeWidth="1.2" strokeDasharray="2 2" opacity="0.5"/>
    </svg>
  );
}

function SecuritySVG() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M24 6L8 14V26C8 36 24 44 24 44C24 44 40 36 40 26V14L24 6Z" stroke="#D4AF37" strokeWidth="1.5" opacity="0.3" fill="#D4AF37" fillOpacity="0.05"/>
      <path d="M24 6L8 14V26C8 34.2 18 40.6 24 43" stroke="#D4AF37" strokeWidth="1.5"/>
      <path d="M18 24L22 28L30 20" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function LanguageSVG() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="18" stroke="#D4AF37" strokeWidth="1.2" opacity="0.3"/>
      <ellipse cx="24" cy="24" rx="8" ry="18" stroke="#D4AF37" strokeWidth="1"/>
      <line x1="10" y1="24" x2="38" y2="24" stroke="#D4AF37" strokeWidth="1" opacity="0.4"/>
      <path d="M20 14C18 18 18 30 20 34" stroke="#D4AF37" strokeWidth="1.2" opacity="0.5"/>
      <path d="M28 14C30 18 30 30 28 34" stroke="#D4AF37" strokeWidth="1.2" opacity="0.5"/>
      <circle cx="24" cy="24" r="3" fill="#D4AF37" opacity="0.4"/>
    </svg>
  );
}

const SVG_MAP: Record<string, React.FC> = {
  memory: MemorySVG,
  speed: SpeedSVG,
  channels: ChannelsSVG,
  analytics: AnalyticsSVG,
  security: SecuritySVG,
  language: LanguageSVG,
};

function FeatureCard({ feat, index }: { feat: typeof FEATURES[0]; index: number }) {
  const { lang } = useLang();
  const [hovered, setHovered] = useState(false);
  const content = CONTENT[lang as keyof typeof CONTENT][index];
  const IconSVG = SVG_MAP[feat.id];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group"
    >
      <div className={`p-8 h-full rounded-2xl border transition-all duration-500 ${
        hovered
          ? 'bg-bg/80 backdrop-blur-xl border-accent/30 shadow-[0_30px_60px_rgba(0,0,0,0.6),0_0_60px_rgba(212,175,55,0.1)] -translate-y-1 scale-[1.01]'
          : 'bg-bg/60 backdrop-blur-xl border-white/10 shadow-[0_15px_45px_rgba(0,0,0,0.3)]'
      }`}>
        {hovered && (
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feat.gradient} opacity-60 pointer-events-none`} />
        )}
        <div className="relative">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border transition-all duration-500 ${
            hovered
              ? 'border-accent/40 bg-accent/10 shadow-[0_0_30px_rgba(212,175,55,0.2)] scale-110'
              : 'border-white/10 bg-white/[0.03]'
          }`}>
            {IconSVG && <IconSVG />}
          </div>

          <h3 className={`font-serif text-xl mb-3 transition-all duration-300 ${hovered ? 'text-accent' : 'text-text-primary'}`}>
            {content.title}
          </h3>

          <p className="text-sm text-text-secondary leading-[1.7] mb-5">
            {content.desc}
          </p>

          {"stat" in content && content.stat && (
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-4xl font-bold text-text-primary tracking-tight">{content.stat}</span>
              <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider">{content.unit}</span>
            </div>
          )}

          {"tags" in content && content.tags && (
            <div className="flex flex-wrap gap-2">
              {content.tags.map((tag: string) => (
                <span key={tag} className="font-mono text-[11px] text-text-secondary px-3 py-1.5 rounded-md bg-white/3 border border-white/10">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {"badge" in content && content.badge && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-[11px] bg-accent/10 border border-accent/20 text-accent">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />{content.badge}
            </div>
          )}

          {"langs" in content && content.langs && (
            <div className="flex gap-2 flex-wrap">
              {content.langs.map((l: string) => (
                <span key={l} className="font-mono text-sm text-accent font-semibold px-3 py-1.5 bg-accent/10 rounded-lg">{l}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Features() {
  const { t } = useLang();

  return (
    <section id="productos" className="px-[clamp(1.5rem,5vw,4rem)] py-32 max-w-[1200px] mx-auto">
      <div className="text-center mb-4">
        <span className="inline-block font-mono text-xs tracking-[0.12em] text-accent uppercase bg-accent-dim px-4 py-1.5 rounded-full">{t.features.label}</span>
      </div>
      <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-text-primary text-center">
        {t.features.title}<br />
        <em className="text-accent not-italic">{t.features.titleEm}</em>
      </h2>
      <p className="text-base text-text-secondary mb-12 text-center max-w-[600px] mx-auto">{t.features.subtitle}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {FEATURES.map((f, i) => (
          <FeatureCard key={f.id} feat={f} index={i} />
        ))}
      </div>
    </section>
  );
}
