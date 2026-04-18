"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FiShoppingCart, FiLayout, FiActivity, FiCpu, FiTrendingUp, FiLayers, FiDatabase } from "react-icons/fi";
import { USE_CASES, INTEGRATIONS } from "@/lib/constants";

export default function LandingFeatures() {
  const [mounted, setMounted] = useState(false);
  const [activeUseCase, setActiveUseCase] = useState('ecommerce');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div style={{ minHeight: '400px' }} />;

  return (
    <>
      {/* 3. CASOS DE USO */}
      <section style={{ padding: '8rem 5%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, marginBottom: '4rem' }}>Una Solución para <span style={{ color: '#D4AF37' }}>Cada Industria</span></h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', marginBottom: '3.5rem', flexWrap: 'wrap' }}>
            {USE_CASES.map(uc => (
              <button key={uc.id} onClick={() => setActiveUseCase(uc.id)} style={{ padding: '11px 22px', borderRadius: '12px', border: '1px solid', borderColor: activeUseCase === uc.id ? '#D4AF37' : 'rgba(255,255,255,0.1)', background: activeUseCase === uc.id ? 'rgba(212,175,55,0.1)' : 'transparent', color: activeUseCase === uc.id ? '#D4AF37' : 'rgba(255,255,255,0.6)', fontWeight: 700, cursor: 'pointer', transition: '0.2s' }}>{uc.title}</button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            {USE_CASES.filter(uc => uc.id === activeUseCase).map(uc => (
              <motion.div key={uc.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '28px', padding: '3.5rem', border: '1px solid rgba(212,175,55,0.1)', display: 'flex', alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 380px' }}>
                  <div style={{ fontSize: '2.5rem', color: '#D4AF37', marginBottom: '1.8rem' }}>{uc.id === 'ecommerce' ? <FiShoppingCart /> : uc.id === 'realestate' ? <FiLayout /> : uc.id === 'health' ? <FiActivity /> : <FiCpu />}</div>
                   <h3 style={{ fontSize: '1.9rem', fontWeight: 800, marginBottom: '1.2rem' }}>{uc.title} Inteligente</h3>
                  <p style={{ opacity: 0.6, fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2rem' }}>{uc.description}</p>
                  <div style={{ padding: '13px 22px', background: 'rgba(212,175,55,0.08)', borderRadius: '12px', border: '1px solid rgba(212,175,55,0.2)', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                    <FiTrendingUp color="#D4AF37" /> <span style={{ fontWeight: 800, color: '#D4AF37' }}>Impacto: {uc.impact}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* 3.5 STRATIX LABS */}
      <section id="labs" style={{ padding: '8rem 5%', background: '#060B14', position: 'relative' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <div style={{ color: '#D4AF37', fontSize: '0.75rem', fontWeight: 900, letterSpacing: '4px', marginBottom: '1rem', textTransform: 'uppercase' }}>Ingeniería de Escala</div>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900 }}>Stratix Labs: <span style={{ color: '#D4AF37' }}>Arquitectura Neuronal</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
            {[
              { title: 'Opal Logic', desc: 'Motor de procesamiento natural que entiende el contexto y la intención de compra real del cliente.', icon: <FiCpu /> },
              { title: 'Stitch Engine', desc: 'Conector universal que sincroniza tu CRM, inventario y pasarelas de pago en tiempo real.', icon: <FiLayers /> },
              { title: 'RAG Neural', desc: 'Base de conocimiento dinámica que aprende de tus PDFs, webs y catálogos al instante con IA avanzada.', icon: <FiDatabase /> }
            ].map((lab, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ padding: '3.5rem', background: 'rgba(255,255,255,0.01)', borderRadius: '28px', border: '1px solid rgba(212,175,55,0.15)', backdropFilter: 'blur(10px)' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(212,175,55,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', color: '#D4AF37', marginBottom: '2rem' }}>{lab.icon}</div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '1.2rem' }}>{lab.title}</h3>
                <p style={{ opacity: 0.5, lineHeight: 1.7, fontSize: '1.05rem' }}>{lab.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. INTEGRATIONS CLOUD */}
      <section style={{ padding: '4rem 0', background: 'rgba(255,255,255,0.008)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
        <motion.div animate={{ x: [0, -1200] }} transition={{ repeat: Infinity, duration: 35, ease: "linear" }} style={{ display: 'flex', gap: '5rem', alignItems: 'center', whiteSpace: 'nowrap' }}>
          {[...INTEGRATIONS, ...INTEGRATIONS].map((int, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.35 }}>
              {int.icon && <img src={int.icon} alt={int.name} style={{ width: '22px', height: '22px', objectFit: 'contain', filter: 'grayscale(1) invert(1)' }} />}
              <span style={{ fontWeight: 700 }}>{int.name}</span>
            </div>
          ))}
        </motion.div>
      </section>
    </>
  );
}
