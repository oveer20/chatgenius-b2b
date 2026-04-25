"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiCheck, FiShield, FiLock, FiDatabase } from "react-icons/fi";

const PRICING_PLANS = [
  { 
    name: "Starter", 
    priceUsd: 29, 
    priceCop: 119000, 
    description: "Para negocios que inician con IA",
    features: ["1 Agente IA", "1,000 msgs/mes", "Soporte Email", "WhatsApp + Web"],
    highlight: false 
  },
  { 
    name: "Professional", 
    priceUsd: 79, 
    priceCop: 329000, 
    description: "El más elegido por empresas",
    features: ["5 Agentes IA", "10,000 msgs/mes", "Prioridad Alta", "RAG Avanzado", "API Access"],
    highlight: true,
    popular: true
  },
  { 
    name: "Enterprise", 
    priceUsd: 249, 
    priceCop: 999000, 
    description: "Para equipos que necesitan escala",
    features: ["Agentes Unlimited", "Mensajes Unlimited", "Custom Training", "Account Manager", "SLA Garantizado"],
    highlight: false 
  }
];

export default function LandingPricing({ handleCheckout, currency, setCurrency }: { handleCheckout: (planId: string) => void; currency: 'USD' | 'COP'; setCurrency: (c: 'USD' | 'COP') => void }) {
  return (
    <section id="planes" style={{ padding: '6rem 5%', background: '#060B14' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ display: 'inline-block', padding: '8px 16px', background: 'rgba(212,175,55,0.1)', borderRadius: '30px', border: '1px solid rgba(212,175,55,0.2)', marginBottom: '1.5rem', fontSize: '0.7rem', fontWeight: 700, color: '#D4AF37', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Planes
          </span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Escoge el <span style={{ color: '#D4AF37' }}>Plan Ideal</span>
          </h2>
          <p style={{ fontSize: '1rem', opacity: 0.5, marginBottom: '2rem' }}>
            14 días gratis. Cancela cuando quieras.
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', marginTop: '2rem' }}>
            <span style={{ fontWeight: 700, opacity: currency === 'COP' ? 1 : 0.3, color: currency === 'COP' ? '#D4AF37' : '#666', fontSize: '0.9rem' }}>COP</span>
            <div onClick={() => setCurrency(currency === 'COP' ? 'USD' : 'COP')} style={{ width: '52px', height: '26px', background: 'rgba(212,175,55,0.15)', borderRadius: '13px', position: 'relative', cursor: 'pointer' }}>
              <motion.div animate={{ x: currency === 'COP' ? 3 : 27 }} transition={{ type: 'spring' }} style={{ width: '20px', height: '20px', background: '#D4AF37', borderRadius: '50%', marginTop: '3px' }} />
            </div>
            <span style={{ fontWeight: 800, opacity: currency === 'USD' ? 1 : 0.25, fontSize: '0.9rem' }}>USD</span>
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.5rem' }}>
          {PRICING_PLANS.map((plan) => (
            <div key={plan.name} style={{
              background: plan.highlight ? 'rgba(212,175,55,0.04)' : 'rgba(255,255,255,0.02)',
              borderRadius: '24px',
              padding: '2rem',
              border: plan.highlight ? '1px solid rgba(212,175,55,0.2)' : '1px solid rgba(255,255,255,0.05)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {plan.popular && (
                <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', padding: '6px 14px', background: '#D4AF37', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 800, color: '#000', letterSpacing: '1px' }}>
                  Popular
                </div>
              )}
              
              <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '0.5rem' }}>{plan.name}</h3>
              <p style={{ fontSize: '0.85rem', opacity: 0.5, marginBottom: '1.5rem' }}>{plan.description}</p>
              
              <div style={{ marginBottom: '2rem' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 900 }}>
                  {currency === 'COP' ? '$' + plan.priceCop.toLocaleString() : '$' + plan.priceUsd}
                </span>
                <span style={{ fontSize: '0.8rem', opacity: 0.5, marginLeft: '0.5rem' }}>/mes</span>
              </div>
              
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {plan.features.map((feature) => (
                  <li key={feature} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}>
                    <FiCheck size={16} color="#D4AF37" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => handleCheckout(plan.name.toLowerCase())}
                style={{ 
                  width: '100%', 
                  padding: '14px', 
                  background: plan.highlight ? '#D4AF37' : 'transparent', 
                  color: plan.highlight ? '#000' : '#fff',
                  border: plan.highlight ? 'none' : '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '12px', 
                  fontWeight: 800, 
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                Comenzar Gratis
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}