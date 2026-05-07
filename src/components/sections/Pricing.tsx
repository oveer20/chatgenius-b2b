"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/components/LangContext";
import { useState, useEffect } from "react";
import { PRICING_PLANS } from "@/lib/constants";

export default function Pricing() {
  const { t } = useLang();
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const [isAnnual, setIsAnnual] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  const getPriceDisplay = (plan: typeof PRICING_PLANS[0]) => {
    if (!isClient) return "Loading...";
    const base = isAnnual ? plan.priceUsdAnnual : plan.priceUsd;
    const copPrice = isAnnual ? plan.priceCopAnnual : plan.priceCop;
    
    // Show COP by default, or USD if user prefers
    // Since useLang hook doesn't always expose currency preference directly in all implementations, 
    // we'll default to the logic that matches the visual style: $XX for USD or $XXK for COP.
    // Here we will just return COP for better local relevance, or a generic format.
    // To match previous behavior:
    return {
      price: `$${base}`,
      period: isAnnual ? "/mes (facturado anual)" : "/mes",
      saving: isAnnual ? `Ahorras ~20%` : null
    };
  };

  return (
    <section id="planes" style={{ padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <span style={{
          display: 'inline-block',
          background: 'rgba(212,175,55,0.15)',
          color: '#D4AF37',
          fontSize: '13px',
          fontWeight: 600,
          padding: '6px 16px',
          borderRadius: '20px',
          marginBottom: '20px',
        }}>
          {t.pricing.label || "INVERSION INTELIGENTE"}
        </span>
        
        <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '16px', color: '#f0f2f8' }}>
          {t.pricing.title} <em style={{ color: '#D4AF37', fontStyle: 'italic' }}>{t.pricing.titleEm}</em>
        </h2>
        
        {/* Toggle Anual/Mensual */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '32px' }}>
          <span style={{ color: !isAnnual ? '#fff' : '#8892a4', fontSize: '14px', fontWeight: !isAnnual ? 700 : 500, transition: 'color 0.3s' }}>Mensual</span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            style={{
              width: '56px',
              height: '28px',
              borderRadius: '14px',
              background: isAnnual ? '#D4AF37' : 'rgba(255,255,255,0.1)',
              position: 'relative',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.3s',
            }}
          >
            <div style={{
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              background: '#000',
              position: 'absolute',
              top: '3px',
              left: isAnnual ? '31px' : '3px',
              transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }} />
          </button>
          <span style={{ color: isAnnual ? '#fff' : '#8892a4', fontSize: '14px', fontWeight: isAnnual ? 700 : 500, transition: 'color 0.3s' }}>
            Anual <span style={{ color: '#D4AF37', fontSize: '12px' }}>(Ahorra 20%)</span>
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', alignItems: 'center' }}>
        {PRICING_PLANS.map((plan) => {
          const priceInfo = getPriceDisplay(plan);
          const isHighlighted = plan.popular;
          const isHovered = hoveredPlan === plan.name;
          
          return (
            <motion.div 
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredPlan(plan.name)}
              onMouseLeave={() => setHoveredPlan(null)}
              whileHover={{ y: isHighlighted ? 0 : -8 }}
              style={{ 
                position: 'relative', 
                borderRadius: '24px', 
                padding: isHighlighted ? '40px 32px' : '32px',
                display: 'flex', 
                flexDirection: 'column', 
                height: '100%', 
                background: isHighlighted 
                  ? 'linear-gradient(180deg, rgba(212,175,55,0.15) 0%, #0d1017 100%)'
                  : isHovered ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.01)',
                border: isHighlighted 
                  ? '2px solid #D4AF37' 
                  : isHovered ? '1px solid rgba(212,175,55,0.3)' : '1px solid rgba(255,255,255,0.05)',
                transition: 'all 0.3s ease',
                boxShadow: isHighlighted ? '0 20px 60px rgba(212,175,55,0.15)' : isHovered ? '0 10px 30px rgba(0,0,0,0.3)' : 'none',
                transform: isHighlighted ? 'scale(1.05)' : 'scale(1)',
                zIndex: isHighlighted ? 10 : 1,
              }}
            >
              {isHighlighted && (
                <div style={{
                  position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
                  background: '#D4AF37', color: '#000', fontSize: '12px', fontWeight: 700,
                  padding: '6px 16px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '1px'
                }}>
                  Más Popular
                </div>
              )}
              
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '8px', marginTop: isHighlighted ? '8px' : '0' }}>
                {plan.name}
              </h3>
              <p style={{ color: '#8892a4', fontSize: '14px', marginBottom: '24px' }}>{plan.description}</p>
              
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', marginBottom: '4px' }}>
                <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: '3.5rem', fontWeight: 700, color: '#fff', lineHeight: 1 }}>
                  ${isAnnual ? plan.priceCopAnnual.toLocaleString('es-CO') : (plan.priceCop / 1000).toFixed(0) + 'K'}
                </span>
                <span style={{ color: '#8892a4', fontSize: '14px', marginBottom: '12px' }}>COP{priceInfo.period}</span>
              </div>
              
              {isAnnual && (
                <div style={{ color: '#27C93F', fontSize: '13px', fontWeight: 600, marginBottom: '24px' }}>
                  Incluye 2 meses gratis
                </div>
              )}
              
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '0 0 24px' }} />
              
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px', flex: 1 }}>
                {plan.features.map((f, i) => (
                  <li key={i} style={{ display: 'flex', gap: '12px', color: '#e2e8f0', fontSize: '14px' }}>
                    <span style={{ color: '#D4AF37' }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              
              <motion.a
                href="/login"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '12px',
                  textAlign: 'center',
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: 700,
                  display: 'block',
                  background: isHighlighted ? '#D4AF37' : 'transparent',
                  color: isHighlighted ? '#000' : '#fff',
                  border: isHighlighted ? 'none' : '1px solid rgba(255,255,255,0.2)',
                  transition: 'all 0.3s ease',
                }}
              >
                {isHighlighted ? "Empezar prueba gratis 🚀" : "Comenzar"}
              </motion.a>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
