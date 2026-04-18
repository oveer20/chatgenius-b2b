"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import PricingCard from "@/components/landing/PricingCard";
import { CURRENCIES, PRICING_PLANS } from "@/lib/constants";
import { FiShield, FiLock, FiDatabase } from "react-icons/fi";

interface LandingPricingProps {
  handleCheckout: (planId: string) => void;
  currency: 'USD' | 'COP';
  setCurrency: (currency: 'USD' | 'COP') => void;
}

export default function LandingPricing({ handleCheckout, currency, setCurrency }: LandingPricingProps) {
  const [mounted, setMounted] = useState(false);
  const exchangeRate = CURRENCIES[currency].rate;
  const symbol = CURRENCIES[currency].symbol;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <section id="planes" style={{ padding: '8rem 5%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900 }}>Inversión <span style={{ color: '#D4AF37' }}>Estratégica</span></h2>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', marginTop: '3rem' }}>
              <span style={{ fontWeight: 800, opacity: currency === 'USD' ? 1 : 0.25 }}>USD</span>
              <div onClick={() => setCurrency(currency === 'USD' ? 'COP' : 'USD')} style={{ width: '60px', height: '30px', background: 'rgba(212,175,55,0.1)', borderRadius: '15px', position: 'relative', cursor: 'pointer' }}>
                <motion.div animate={{ x: currency === 'USD' ? 4 : 30 }} transition={{ type: 'spring' }} style={{ width: '22px', height: '22px', background: '#D4AF37', borderRadius: '50%', marginTop: '4px' }} />
              </div>
              <span style={{ fontWeight: 800, opacity: currency === 'COP' ? 1 : 0.25 }}>COP</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem' }}>
            {PRICING_PLANS.map((plan: any, i: number) => (
              <PricingCard 
                key={i} 
                plan={plan} 
                exchangeRate={exchangeRate} 
                symbol={symbol} 
                handleCheckout={handleCheckout} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6.5 SEGURIDAD EMPRESARIAL */}
      <section style={{ padding: '5rem 5%', background: '#020508', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4rem', alignItems: 'center', opacity: 0.6 }}>
          {[
            { icon: <FiShield />, text: "Encriptación End-to-End" },
            { icon: <FiLock />, text: "Cumplimiento GDPR" },
            { icon: <FiDatabase />, text: "Datos Aislados" }
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
              <span style={{ color: '#D4AF37', fontSize: '1.3rem' }}>{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
