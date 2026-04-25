"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";

export default function PricingCard({ plan, exchangeRate = 1, symbol = '$', handleCheckout }: any) {
  if (!plan || !plan.features || !Array.isArray(plan.features)) {
    return null;
  }
  
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <motion.div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{ 
        padding: '3rem 2rem', 
        textAlign: 'center', 
        position: 'relative',
        overflow: 'hidden',
        border: plan.highlight ? '1px solid #6366f1' : '1px solid rgba(255,255,255,0.06)',
        background: plan.highlight ? 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(79,70,229,0.04) 100%)' : 'rgba(255,255,255,0.02)',
        borderRadius: '24px',
        boxShadow: plan.highlight ? '0 0 60px rgba(99,102,241,0.2)' : 'none'
      }}
    >
      {plan.popular && (
        <div style={{ 
          position: 'absolute', 
          top: '-20px', 
          left: '50%', 
          transform: 'translateX(-50%)', 
          background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', 
          color: '#fff', 
          padding: '6px 20px', 
          borderRadius: '20px', 
          fontSize: '0.65rem', 
          fontWeight: 800,
          letterSpacing: '1px',
          boxShadow: '0 4px 15px rgba(99,102,241,0.4)'
        }}>
          MÁS VENDIDO
        </div>
      )}
      
      <div style={{ marginTop: plan.popular ? '1.5rem' : '0' }}>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>{plan.name}</h3>
        <p style={{ fontSize: '0.8rem', opacity: 0.4, marginBottom: '1.5rem' }}>{plan.description}</p>
        
        <div style={{ fontSize: '2.8rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-1px' }}>
          <span style={{ fontSize: '0.9rem', opacity: 0.5 }}>{symbol}</span>
          {(plan.priceUsd * exchangeRate).toLocaleString()}
          <span style={{ fontSize: '0.7rem', opacity: 0.3, marginLeft: '3px' }}>/mes</span>
        </div>

        <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', marginBottom: '2rem' }}>
          {plan.features.map((f: string, fi: number) => (
            <li key={fi} style={{ marginBottom: '0.8rem', display: 'flex', gap: '10px', fontSize: '0.85rem', opacity: 0.7 }}>
              <FiCheck color="#818cf8" style={{ flexShrink: 0, marginTop: '2px' }} /> <span>{f}</span>
            </li>
          ))}
        </ul>

        <button 
          onClick={() => {
            const name = plan.name.toLowerCase();
            const slug = name.includes('enterprise') || name.includes('elite') ? 'enterprise' : (name.includes('professional') || name.includes('pro') ? 'pro' : 'starter');
            handleCheckout(slug);
          }} 
          style={{ 
            width: '100%', 
            padding: '14px', 
            background: plan.highlight ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' : 'transparent', 
            border: plan.highlight ? 'none' : '1px solid rgba(255,255,255,0.15)', 
            color: '#fff', 
            borderRadius: '12px', 
            fontWeight: 700, 
            cursor: 'pointer',
            fontSize: '0.9rem',
            transition: 'all 0.3s ease'
          }}
        >
          {plan.name.toLowerCase().includes('enterprise') ? 'Contactar Ventas' : 'Comenzar Ahora'}
        </button>
      </div>
    </motion.div>
  );
}
