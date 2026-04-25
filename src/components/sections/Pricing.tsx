"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLang } from "@/components/LangContext";
import { useState } from "react";

const PLANS = [
  {
    tier: "STARTER",
    description: { es: "Para negocios que inician", en: "For businesses getting started" },
    priceUSD: 29, priceCop: 79000,
    features: { es: ["1 Agente IA", "1,000 msgs/mes", "WhatsApp", "Analytics básico", "Soporte email"], en: ["1 AI Agent", "1,000 msgs/month", "WhatsApp", "Basic analytics", "Email support"] },
  },
  {
    tier: "PROFESSIONAL",
    description: { es: "El más elegido", en: "The most popular" },
    priceUSD: 79, priceCop: 219000, featured: true,
    features: { es: ["5 Agentes IA", "10,000 msgs/mes", "Todos los canales", "RAG Avanzado", "Analytics completo", "Soporte prioritario"], en: ["5 AI Agents", "10,000 msgs/month", "All channels", "Advanced RAG", "Complete analytics", "Priority support"] },
  },
  {
    tier: "ENTERPRISE",
    description: { es: "Para equipos", en: "For teams" },
    priceUSD: 199, priceCop: 599000,
    features: { es: ["Agentes ilimitados", "Mensajes ilimitados", "Training personalizado", "Account Manager", "SLA garantizado"], en: ["Unlimited agents", "Unlimited messages", "Custom training", "Account Manager", "Guaranteed SLA"] },
  },
];

export default function Pricing() {
  const { lang, showUSD, t } = useLang();
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  return (
    <section id="planes" style={{ padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <span style={{ width: '24px', height: '1px', background: '#D4AF37' }} />
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '12px', letterSpacing: '0.12em', color: '#D4AF37', textTransform: 'uppercase' }}>{t.pricing.label}</span>
      </div>

      <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '16px', color: '#f0f2f8' }}>
        {t.pricing.title} <em style={{ color: '#D4AF37', fontStyle: 'italic' }}>{t.pricing.titleEm}</em>
      </h2>
      <p style={{ fontSize: '16px', color: '#8892a4', marginBottom: '48px' }}>{t.pricing.subtitle}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {PLANS.map((plan) => (
          <motion.div 
            key={plan.tier}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onMouseEnter={() => setHoveredPlan(plan.tier)}
            onMouseLeave={() => setHoveredPlan(null)}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ 
              position: 'relative', 
              borderRadius: '20px', 
              padding: '32px', 
              display: 'flex', 
              flexDirection: 'column', 
              height: '100%', 
              background: hoveredPlan === plan.tier 
                ? 'linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(212,175,55,0.04) 100%)' 
                : plan.featured 
                  ? 'linear-gradient(135deg, rgba(212,175,55,0.06) 0%, rgba(212,175,55,0.02) 100%)' 
                  : '#0d1017', 
              border: hoveredPlan === plan.tier 
                ? '1px solid rgba(212,175,55,0.5)' 
                : plan.featured 
                  ? '1px solid rgba(212,175,55,0.3)' 
                  : '1px solid rgba(255,255,255,0.07)',
              transition: 'all 0.3s ease',
              boxShadow: hoveredPlan === plan.tier ? '0 20px 40px rgba(0,0,0,0.4)' : 'none',
            }}
          >
            {plan.featured && (
              <motion.div 
                whileHover={{ scale: 1.05 }}
                style={{ 
                  position: 'absolute', 
                  top: 0, 
                  right: 0, 
                  background: '#D4AF37', 
                  color: '#000', 
                  fontFamily: "'DM Mono', monospace", 
                  fontSize: '10px', 
                  fontWeight: 600, 
                  letterSpacing: '0.1em', 
                  padding: '6px 14px', 
                  borderBottomLeftRadius: '14px' 
                }}
              >
                {t.pricing.popular}
              </motion.div>
            )}
            
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '12px', letterSpacing: '0.1em', color: '#4a5568', marginBottom: '8px' }}>{plan.tier}</div>
            <div style={{ fontSize: '14px', color: '#8892a4', marginBottom: '16px' }}>{plan.description[lang]}</div>
            
            <motion.div 
              style={{ 
                fontFamily: "'DM Serif Display', Georgia, serif", 
                fontSize: '2.5rem', 
                color: hoveredPlan === plan.tier ? '#D4AF37' : '#f0f2f8', 
                letterSpacing: '-0.02em', 
                marginBottom: '4px',
                transition: 'all 0.3s ease',
              }}
            >
              ${showUSD ? plan.priceUSD : (plan.priceCop / 1000).toFixed(0) + 'K'}
            </motion.div>
            
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '12px', color: '#4a5568', marginBottom: '24px' }}>{(showUSD ? 'USD' : 'COP') + t.pricing.period}</div>
            
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', margin: '0 0 24px' }} />
            
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px', flex: 1 }}>
              {(plan.features[lang] as string[]).map((f, i) => (
                <motion.li 
                  key={f}
                  whileHover={{ x: 4 }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '14px', color: '#8892a4' }}
                >
                  <motion.span 
                    style={{ color: '#D4AF37', fontFamily: "'DM Mono', monospace", flexShrink: 0 }}
                    animate={{ x: hoveredPlan === plan.tier ? 4 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    →
                  </motion.span> 
                  {f}
                </motion.li>
              ))}
            </ul>
            
            <motion.a
              href={`/login?plan=${plan.tier.toLowerCase()}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '12px',
                textAlign: 'center',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 600,
                display: 'block',
                background: hoveredPlan === plan.tier || plan.featured ? '#D4AF37' : 'transparent',
                color: hoveredPlan === plan.tier || plan.featured ? '#030a05' : '#f0f2f8',
                border: plan.featured || hoveredPlan === plan.tier ? 'none' : '1px solid rgba(255,255,255,0.15)',
                transition: 'all 0.3s ease',
                boxShadow: hoveredPlan === plan.tier ? '0 8px 24px rgba(212,175,55,0.3)' : 'none',
              }}
            >
              {plan.featured ? `${t.pricing.cta} →` : t.pricing.ctaFree}
            </motion.a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}