"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiClock, FiStar, FiShield, FiGlobe, FiLayers } from "react-icons/fi";

export default function LandingROI() {
  const [mounted, setMounted] = useState(false);
  const [leads, setLeads] = useState(100);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* 5. ROI CALCULATOR */}
      <section id="roi" style={{ padding: '12rem 5%', background: '#03070C', position: 'relative' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ background: 'rgba(255,255,255,0.01)', backdropFilter: 'blur(30px)', borderRadius: '50px', border: '1px solid rgba(212,175,55,0.15)', padding: '6rem 4rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-2px' }}>Calcula tu <span style={{ color: '#D4AF37' }}>ROI Real (V50.30)</span></h2>
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontWeight: 800 }}>
                <span style={{ fontSize: '1.2rem' }}>Interacciones Mensuales</span>
                <span style={{ color: '#D4AF37', fontSize: '1.8rem' }}>{leads.toLocaleString()}</span>
              </div>
              <input type="range" min="10" max="5000" step="10" value={leads} onChange={(e) => setLeads(parseInt(e.target.value))} style={{ width: '100%', height: '8px', background: 'rgba(212,175,55,0.1)', cursor: 'pointer', appearance: 'none' }} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', marginTop: '4rem' }}>
                <div style={{ padding: '3.5rem', background: 'rgba(212,175,55,0.05)', borderRadius: '35px', border: '1px solid rgba(212,175,55,0.2)' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 900, color: '#D4AF37', marginBottom: '1.5rem' }}>AHORRO USD</div>
                  <div style={{ fontSize: '3.5rem', fontWeight: 900 }}>${(leads * 0.8).toLocaleString()}</div>
                </div>
                <div style={{ padding: '3.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '35px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 900, opacity: 0.4, marginBottom: '1.5rem' }}>TIEMPO HRS</div>
                  <div style={{ fontSize: '3.5rem', fontWeight: 900, color: '#D4AF37' }}>{Math.round(leads * 0.25)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5.5 TESTIMONIALS */}
      <section style={{ padding: '8rem 5%', background: '#060B14' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {[
              { author: "Director de Operaciones", company: "Vortex Media", text: "Redujimos el costo de adquisición un 35% y ahora cerramos ventas a las 3 AM." },
              { author: "CEO & Founder", company: "Nexus AI Global", text: "Stratix no es un bot, es un arquitecto de ventas. La integración fue impecable." }
            ].map((t, i) => (
              <motion.div key={i} style={{ padding: '3rem', background: 'rgba(255,255,255,0.02)', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '1.5rem' }}>{[1,2,3,4,5].map(s => <FiStar key={s} size={14} color="#D4AF37" fill="#D4AF37" />)}</div>
                <p style={{ fontSize: '1.1rem', fontStyle: 'italic', opacity: 0.8, marginBottom: '2.5rem' }}>"{t.text}"</p>
                <div><div style={{ fontWeight: 900, color: '#D4AF37' }}>{t.author}</div><div style={{ fontSize: '0.85rem', opacity: 0.4 }}>{t.company}</div></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5.7 BENTO GRID */}
      <section style={{ padding: '12rem 5%', background: '#060B14' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gridAutoRows: '280px', gap: '2rem', maxWidth: '1300px', margin: '0 auto' }}>
          <div style={{ gridColumn: 'span 2', background: 'rgba(212,175,55,0.03)', borderRadius: '35px', padding: '3.5rem', border: '1px solid rgba(212,175,55,0.15)' }}>
            <FiShield style={{ color: '#D4AF37', fontSize: '2.5rem', marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.8rem', fontWeight: 900 }}>Seguridad de Aislamiento</h3>
          </div>
          <div style={{ gridRow: 'span 2', background: 'rgba(255,255,255,0.01)', borderRadius: '35px', padding: '3.5rem', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
            <FiGlobe style={{ color: '#D4AF37', fontSize: '3rem', margin: '0 auto 2rem' }} />
            <h3 style={{ fontSize: '1.8rem', fontWeight: 900 }}>Escalado Global</h3>
          </div>
          <div style={{ background: '#D4AF37', borderRadius: '35px', padding: '2.5rem', display: 'flex', alignItems: 'center', gap: '2rem', color: '#000' }}>
            <FiLayers size={30} /><h4 style={{ fontSize: '1.2rem', fontWeight: 900 }}>Conectividad Full</h4>
          </div>
        </div>
      </section>
    </>
  );
}
