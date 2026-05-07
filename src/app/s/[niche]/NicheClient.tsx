"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NicheClient({ data, niche }: { data: any; niche: string }) {
  return (
    <div style={{ background: '#060B14', color: '#f0f2f8', minHeight: '100vh' }}>
      {/* Navbar Simple */}
      <nav style={{ padding: '20px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <Link href="/" style={{ fontWeight: 700, fontSize: '18px', color: '#D4AF37', textDecoration: 'none' }}>Stratix</Link>
        <Link href="/login" style={{ color: '#8892a4', textDecoration: 'none' }}>Volver al inicio</Link>
      </nav>

      {/* Hero de Nicho */}
      <section style={{ padding: 'clamp(4rem, 10vw, 8rem) 5%', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: '64px', marginBottom: '24px' }}>
          {data.icon}
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, marginBottom: '24px', lineHeight: 1.1 }}>
          La IA que domina el sector <span style={{ color: '#D4AF37' }}>{niche}</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ fontSize: '18px', color: '#8892a4', marginBottom: '40px', lineHeight: 1.6 }}>
          {data.desc}
        </motion.p>
        <motion.a href="/login" whileHover={{ scale: 1.05 }} style={{ display: 'inline-block', background: '#D4AF37', color: '#000', padding: '16px 32px', borderRadius: '14px', fontWeight: 700, textDecoration: 'none', fontSize: '16px' }}>
          {data.cta} →
        </motion.a>
      </section>

      {/* Beneficios del Nicho */}
      <section style={{ padding: '4rem 5%', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {[
            "Atención 24/7 sin contratar personal extra",
            "Respuestas instantáneas que cierran ventas",
            "Integración directa con WhatsApp y tu Web"
          ].map((item, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', padding: '32px', borderRadius: '16px', border: '1px solid rgba(212,175,55,0.1)' }}>
              <div style={{ color: '#27C93F', fontSize: '24px', marginBottom: '16px' }}>✓</div>
              <h3 style={{ color: '#f0f2f8', marginBottom: '8px' }}>{item}</h3>
              <p style={{ color: '#8892a4', fontSize: '14px' }}>Optimizado específicamente para tu flujo de trabajo en {niche}.</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
