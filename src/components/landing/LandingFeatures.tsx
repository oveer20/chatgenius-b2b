"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FiCpu, FiMessageSquare, FiBarChart2, FiCheck, FiTrendingUp } from "react-icons/fi";

const USE_CASES = [
  {
    id: "ventas",
    title: "Ventas",
    description: "Tu agente IA cierra citas y califica leads automáticamente mientras duermes.",
    impact: "+40% en conversiones",
    icon: <FiMessageSquare />
  },
  {
    id: "soporte",
    title: "Soporte",
    description: "Respuestas instantáneas a dudas de clientes los 365 días del año.",
    impact: "-80% en tickets",
    icon: <FiCpu />
  },
  {
    id: "cobr",
    title: "Cobranza",
    description: "Recuperación de cartera con negociación inteligente y persistente.",
    impact: "+60% recuperación",
    icon: <FiBarChart2 />
  }
];

export default function LandingFeatures() {
  const [mounted, setMounted] = useState(false);
  const [activeUseCase, setActiveUseCase] = useState('ventas');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div style={{ minHeight: '400px' }} />;
  
  const activeCase = USE_CASES.find(uc => uc.id === activeUseCase) || USE_CASES[0];

  return (
    <>
      <section id="usuarios" style={{ padding: '10rem 5%', background: '#030712' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span style={{ display: 'inline-block', padding: '10px 20px', background: 'rgba(212,175,55,0.08)', borderRadius: '30px', border: '1px solid rgba(212,175,55,0.2)', marginBottom: '1.5rem', fontSize: '0.7rem', fontWeight: 800, color: '#D4AF37', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Casos de Uso</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} style={{ fontSize: 'clamp(2.2rem, 5vw, 3rem)', fontWeight: 900, marginBottom: '1rem' }}>Potencia cada<span style={{ color: '#D4AF37' }}> Área</span></motion.h2>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '4rem', flexWrap: 'wrap' }}>
            {USE_CASES.map(uc => (
              <button 
                key={uc.id} 
                onClick={() => setActiveUseCase(uc.id)} 
                style={{ 
                  padding: '14px 28px', 
                  borderRadius: '14px', 
                  border: '1px solid', 
                  borderColor: activeUseCase === uc.id ? '#D4AF37' : 'rgba(255,255,255,0.1)', 
                  background: activeUseCase === uc.id ? 'rgba(212,175,55,0.1)' : 'transparent', 
                  color: activeUseCase === uc.id ? '#D4AF37' : 'rgba(255,255,255,0.5)', 
                  fontWeight: 700, 
                  cursor: 'pointer', 
                  transition: '0.2s',
                  fontSize: '0.95rem'
                }}
              >
                {uc.title}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCase.id}
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -15 }} 
              style={{ 
                background: 'rgba(255,255,255,0.02)', 
                borderRadius: '32px', 
                padding: '4rem', 
                border: '1px solid rgba(212,175,55,0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: '4rem',
                flexWrap: 'wrap'
              }}
            >
              <div style={{ flex: '1 1 380px' }}>
                <div style={{ fontSize: '3rem', color: '#D4AF37', marginBottom: '2rem' }}>
                  {activeCase.icon}
                </div>
                <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.2rem' }}>{activeCase.title} Inteligente</h3>
                <p style={{ opacity: 0.6, fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem' }}>{activeCase.description}</p>
                <div style={{ padding: '16px 24px', background: 'rgba(212,175,55,0.08)', borderRadius: '14px', border: '1px solid rgba(212,175,55,0.25)', display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
                  <FiTrendingUp color="#D4AF37" /> 
                  <span style={{ fontWeight: 800, color: '#D4AF37', fontSize: '1.1rem' }}>{activeCase.impact}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section style={{ padding: '6rem 0', background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)', overflow: 'hidden' }}>
        <motion.div 
          animate={{ x: [0, -1000] }} 
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }} 
          style={{ display: 'flex', gap: '4rem', alignItems: 'center', whiteSpace: 'nowrap', width: '200%' }}
        >
          {[...USE_CASES, ...USE_CASES].map((uc, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.3 }}>
              <span style={{ fontWeight: 700, fontSize: '1rem' }}>{uc.title}</span>
            </div>
          ))}
        </motion.div>
      </section>
    </>
  );
}