"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";

export default function PricingCard({ plan, exchangeRate, symbol, handleCheckout }: any) {
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
      className={`card-elite ${plan.highlight ? 'glow-gold' : ''}`} 
      style={{ 
        padding: '4.5rem 3rem', 
        textAlign: 'center', 
        position: 'relative',
        overflow: 'hidden',
        border: plan.highlight ? '1px solid #D4AF37' : '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Efecto Flashlight (Glow) */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(212,175,55,0.2), transparent 70%)`,
          opacity: opacity,
          transition: 'opacity 0.5s ease',
          zIndex: 1
        }}
      />

      <div style={{ position: 'relative', zIndex: 10 }}>
        {plan.highlight && (
          <div style={{ 
            position: 'absolute', 
            top: '-25px', 
            left: '50%', 
            transform: 'translateX(-50%)', 
            background: '#D4AF37', 
            color: '#000', 
            padding: '8px 25px', 
            borderRadius: '30px', 
            fontSize: '0.7rem', 
            fontWeight: 900,
            letterSpacing: '2px',
            boxShadow: '0 10px 25px rgba(212,175,55,0.3)'
          }}>
            RECOMENDADO
          </div>
        )}
        
        <h3 className="text-cinematic" style={{ marginBottom: '1.5rem', fontSize: '1.8rem' }}>{plan.name}</h3>
        
        <div style={{ fontSize: '3.8rem', fontWeight: 900, marginBottom: '2.5rem', letterSpacing: '-2px' }}>
          <span style={{ fontSize: '1.2rem', opacity: 0.5, marginRight: '5px' }}>{symbol}</span>
          {(plan.priceUsd * exchangeRate).toLocaleString()}
          <span style={{ fontSize: '0.85rem', opacity: 0.3, marginLeft: '5px' }}>/mes</span>
        </div>

        <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', marginBottom: '3.5rem' }}>
          {plan.features.map((f: string, fi: number) => (
            <li key={fi} style={{ marginBottom: '1.2rem', display: 'flex', gap: '15px', fontSize: '0.95rem', opacity: 0.8, lineHeight: 1.4 }}>
              <FiCheck color="#D4AF37" style={{ flexShrink: 0, marginTop: '3px' }} /> <span>{f}</span>
            </li>
          ))}
        </ul>

        <button 
          onClick={() => {
            const name = plan.name.toLowerCase();
            const slug = name.includes('enterprise') || name.includes('elite') ? 'enterprise' : (name.includes('professional') || name.includes('pro') ? 'pro' : 'starter');
            handleCheckout(slug);
          }} 
          className={plan.highlight ? "glow-gold" : ""}
          style={{ 
            width: '100%', 
            padding: '20px', 
            background: plan.highlight ? '#D4AF37' : 'transparent', 
            border: '2px solid #D4AF37', 
            color: plan.highlight ? '#000' : '#D4AF37', 
            borderRadius: '16px', 
            fontWeight: 900, 
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontSize: '1rem'
          }}
        >
          {plan.name.toLowerCase().includes('enterprise') ? 'CONTACTAR ÉLITE' : 'COMENZAR AHORA'}
        </button>
      </div>
    </motion.div>
  );
}
