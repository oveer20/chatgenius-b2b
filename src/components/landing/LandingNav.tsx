"use client";

import Link from "next/link";

export default function LandingNav() {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 clamp(1.5rem, 4vw, 4rem)',
      height: '68px',
      background: 'rgba(7,9,16,0.8)',
      backdropFilter: 'blur(20px) saturate(180%)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
    }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
        <div style={{ width: '8px', height: '8px', background: '#D4AF37', borderRadius: '50%', boxShadow: '0 0 12px #D4AF37', animation: 'pulse 2s infinite' }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 500, color: '#f0f2f8' }}>Stratix</span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <a href="#productos" style={{ color: '#8892a4', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}>Producto</a>
        <a href="#como-funciona" style={{ color: '#8892a4', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}>Cómo Funciona</a>
        <a href="#planes" style={{ color: '#8892a4', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}>Planes</a>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Link href="/login" style={{ color: '#8892a4', fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none', padding: '8px 16px', borderRadius: '12px' }}>Iniciar sesión</Link>
        <Link href="/login" style={{ background: '#D4AF37', color: '#030a05', fontSize: '0.875rem', fontWeight: 600, padding: '9px 20px', borderRadius: '12px', textDecoration: 'none' }}>Empezar gratis →</Link>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 12px #D4AF37; }
          50% { opacity: 0.6; box-shadow: 0 0 20px #D4AF37; }
        }
      `}</style>
    </nav>
  );
}