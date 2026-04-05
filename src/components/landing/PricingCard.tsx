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
      className="sx-plan-card" 
      style={{ 
        padding: '4rem 3rem', 
        borderRadius: '36px', 
        border: plan.highlight ? '2px solid #D4AF37' : '1px solid rgba(255,255,255,0.06)', 
        background: plan.highlight ? 'rgba(212,175,55,0.03)' : 'rgba(255,255,255,0.01)', 
        textAlign: 'center', 
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Efecto Flashlight (Glow) - Intensificado para visibilidad Pro */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(212,175,55,0.3), transparent 70%)`,
          opacity: opacity,
          transition: 'opacity 0.5s ease',
          zIndex: 1
        }}
      />

      <div style={{ position: 'relative', zIndex: 10 }}>
        {plan.highlight && <div style={{ position: 'absolute', top: '-18px', left: '50%', transform: 'translateX(-50%)', background: '#D4AF37', color: '#000', padding: '7px 22px', borderRadius: '30px', fontSize: '0.75rem', fontWeight: 900 }}>RECOMENDADO</div>}
        <h3 style={{ marginBottom: '1.2rem', fontWeight: 900, fontSize: '1.6rem' }}>{plan.name}</h3>
        <div style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '1.2rem', opacity: 0.5 }}>{symbol}</span>{(plan.priceUsd * exchangeRate).toLocaleString()}<span style={{ fontSize: '0.85rem', opacity: 0.3 }}>/mes</span>
        </div>
        <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', marginBottom: '3rem' }}>
          {plan.features.map((f: string, fi: number) => (
            <li key={fi} style={{ marginBottom: '1rem', display: 'flex', gap: '12px', fontSize: '0.95rem', opacity: 0.6 }}><FiCheck color="#D4AF37" /> {f}</li>
          ))}
        </ul>
        <button onClick={() => handleCheckout(plan.name.toLowerCase())} style={{ width: '100%', padding: '18px', background: plan.highlight ? '#D4AF37' : 'transparent', border: '1px solid #D4AF37', color: plan.highlight ? '#000' : '#D4AF37', borderRadius: '14px', fontWeight: 900, cursor: 'pointer' }}>{plan.name === 'Enterprise' ? 'Contactar' : 'Elegir Plan'}</button>
      </div>
    </motion.div>
  );
}
