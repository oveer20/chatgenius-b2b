"use client";

import { motion } from "framer-motion";
import { useLang } from "@/components/LangContext";

export default function BeforeAfter() {
  const { t } = useLang();
  return (
    <section style={{
      padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
      maxWidth: '1100px',
      margin: '0 auto',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <span style={{
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
        }}>
          SIN STRATIX VS CON STRATIX
        </span>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          color: '#f0f2f8',
          marginBottom: '16px',
        }}>
          {t.beforeAfter.titlePart1} <em style={{ color: '#D4AF37', fontStyle: 'italic' }}>{t.beforeAfter.titlePart2}</em>
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
      }}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          style={{
            background: 'rgba(255,95,86,0.03)',
            border: '1px solid rgba(255,95,86,0.2)',
            borderRadius: '20px',
            padding: '32px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,95,86,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff5f56', fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-sans)' }}>x</div>
            <div style={{ color: '#ff5f56', fontWeight: 700, fontSize: '18px', fontFamily: 'var(--font-sans)' }}>{t.beforeAfter.withoutTitle}</div>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {t.beforeAfter.withoutItems.map((item: string, i: number) => (
              <li key={i} style={{ display: 'flex', gap: '12px', color: '#8892a4', fontSize: '15px', lineHeight: 1.5, fontFamily: 'var(--font-sans)' }}>
                <span style={{ color: '#ff5f56', flexShrink: 0 }}>x</span> {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          style={{
            background: 'rgba(39,201,63,0.03)',
            border: '1px solid rgba(39,201,63,0.2)',
            borderRadius: '20px',
            padding: '32px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #27C93F, #D4AF37)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(39,201,63,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#27C93F', fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-sans)' }}>AI</div>
            <div style={{ color: '#27C93F', fontWeight: 700, fontSize: '18px', fontFamily: 'var(--font-sans)' }}>{t.beforeAfter.withTitle}</div>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {t.beforeAfter.withItems.map((item: string, i: number) => (
              <li key={i} style={{ display: 'flex', gap: '12px', color: '#f0f2f8', fontSize: '15px', lineHeight: 1.5, fontFamily: 'var(--font-sans)' }}>
                <span style={{ color: '#27C93F', flexShrink: 0 }}>v</span> {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
