"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/components/LangContext";

export default function ROICalculator() {
  const { t } = useLang();
  const [leads, setLeads] = useState(50);
  const [value, setValue] = useState(200000);
  const [responseTime, setResponseTime] = useState(60);

  const lossRate = Math.min(0.15 + (responseTime / 120) * 0.45, 0.6);
  const missedLeads = Math.round(leads * lossRate);
  const lostRevenue = missedLeads * value;
  const stratixCost = 79000;

  return (
    <section id="calculadora" style={{
      padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
      background: 'linear-gradient(180deg, #070910 0%, #111520 50%, #070910 100%)',
      borderTop: '1px solid rgba(212,175,55,0.1)',
      borderBottom: '1px solid rgba(212,175,55,0.1)',
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            display: 'inline-block',
            background: 'rgba(255,95,86,0.15)',
            color: '#ff5f56',
            fontSize: '13px',
            fontWeight: 600,
            padding: '6px 16px',
            borderRadius: '20px',
            marginBottom: '20px',
            fontFamily: 'var(--font-sans)',
            letterSpacing: '0.05em',
          }}
        >
          CALCULADORA DE PERDIDAS
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: '#f0f2f8',
            marginBottom: '16px',
          }}
        >
          {t.roi.titlePart1} <span style={{ color: '#ff5f56', fontStyle: 'italic' }}>{t.roi.titlePart2}</span> hoy?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ color: '#8892a4', fontSize: '16px', maxWidth: '600px', margin: '0 auto 50px', lineHeight: 1.6, fontFamily: 'var(--font-sans)' }}
        >
          {t.roi.subtitle}
        </motion.p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '50px',
          textAlign: 'left',
        }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.07)' }}>
            <label style={{ display: 'block', color: '#8892a4', fontSize: '14px', marginBottom: '12px', fontWeight: 500, fontFamily: 'var(--font-sans)' }}>
              {t.roi.leadsLabel}
            </label>
            <input
              type="range" min="10" max="500" value={leads}
              onChange={(e) => setLeads(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#D4AF37', marginBottom: '10px' }}
            />
            <div style={{ color: '#f0f2f8', fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-serif)' }}>
              {leads}
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.07)' }}>
            <label style={{ display: 'block', color: '#8892a4', fontSize: '14px', marginBottom: '12px', fontWeight: 500, fontFamily: 'var(--font-sans)' }}>
              {t.roi.valueLabel}
            </label>
            <input
              type="range" min="50000" max="5000000" step="50000" value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#D4AF37', marginBottom: '10px' }}
            />
            <div style={{ color: '#f0f2f8', fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-serif)' }}>
              ${value.toLocaleString('es-CO')}
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.07)' }}>
            <label style={{ display: 'block', color: '#8892a4', fontSize: '14px', marginBottom: '12px', fontWeight: 500, fontFamily: 'var(--font-sans)' }}>
              {t.roi.timeLabel} ({t.roi.timeSuffix})
            </label>
            <input
              type="range" min="5" max="120" value={responseTime}
              onChange={(e) => setResponseTime(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#D4AF37', marginBottom: '10px' }}
            />
            <div style={{ color: '#f0f2f8', fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-serif)' }}>
              {responseTime} {t.roi.timeSuffix}
            </div>
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, rgba(212,175,55,0.05) 0%, rgba(13,16,23,0.8) 100%)',
          border: '2px solid rgba(212,175,55,0.2)',
          borderRadius: '24px',
          padding: 'clamp(2rem, 5vw, 3rem)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '32px',
          textAlign: 'center',
        }}>
          <div>
            <div style={{ color: '#ff5f56', fontSize: '14px', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'var(--font-sans)' }}>{t.roi.missedLeadsLabel}</div>
            <div style={{ color: '#fff', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, fontFamily: 'var(--font-serif)', lineHeight: 1.1 }}>
              -{missedLeads}
            </div>
            <div style={{ color: '#8892a4', fontSize: '13px', fontFamily: 'var(--font-sans)', marginTop: '8px' }}>{t.roi.missedLeadsDesc}</div>
          </div>

          <div>
            <div style={{ color: '#ff5f56', fontSize: '14px', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'var(--font-sans)' }}>{t.roi.lostMoneyLabel}</div>
            <div style={{ color: '#fff', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 800, fontFamily: 'var(--font-serif)', lineHeight: 1.1 }}>
              -${lostRevenue.toLocaleString('es-CO')}
            </div>
            <div style={{ color: '#8892a4', fontSize: '13px', fontFamily: 'var(--font-sans)', marginTop: '8px' }}>{t.roi.lostMoneyDesc}</div>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{ color: '#D4AF37', fontSize: '14px', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'var(--font-sans)' }}>{t.roi.stratixCostLabel}</div>
            <div style={{ color: '#D4AF37', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 800, fontFamily: 'var(--font-serif)', lineHeight: 1.1 }}>
              ${stratixCost.toLocaleString('es-CO')}
            </div>
            <div style={{ color: '#8892a4', fontSize: '13px', fontFamily: 'var(--font-sans)', marginTop: '8px' }}>{t.roi.stratixCostDesc}</div>
          </div>
        </div>

        <motion.a
          href="/login"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            marginTop: '40px',
            display: 'inline-block',
            background: '#D4AF37',
            color: '#030a05',
            padding: '16px 32px',
            borderRadius: '14px',
            fontWeight: 700,
            fontSize: '16px',
            textDecoration: 'none',
            boxShadow: '0 4px 20px rgba(212,175,55,0.4)',
            fontFamily: 'var(--font-sans)',
            transition: 'transform 0.2s',
          }}
        >
          {t.roi.cta}
        </motion.a>
      </div>
    </section>
  );
}
