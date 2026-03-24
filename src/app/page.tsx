"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiCpu, FiMessageSquare, FiTrendingUp, FiShield } from "react-icons/fi";

export default function LandingPage() {
  return (
    <div style={{ backgroundColor: '#060B14', minHeight: '100vh', color: 'white', fontFamily: 'system-ui, sans-serif', overflowX: 'hidden' }}>
      
      {/* Navegación Elite */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 5%', borderBottom: '1px solid rgba(212, 175, 55, 0.1)', background: 'rgba(6, 11, 20, 0.8)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FiShield style={{ color: '#D4AF37', fontSize: '1.5rem' }} />
          <span style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.5px' }}>Strat<span style={{ color: '#D4AF37' }}>ix</span> AI</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link href="/login" style={{ padding: '8px 20px', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
            Portal Clientes
          </Link>
          <Link href="/login" style={{ padding: '10px 24px', backgroundColor: '#D4AF37', color: '#000', textDecoration: 'none', fontWeight: 800, borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)' }}>
            Acceso Élite <FiArrowRight />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main style={{ padding: '8rem 5%', textAlign: 'center', position: 'relative' }}>
        {/* Glow de fondo corregido */}
        <div style={{ 
          position: 'absolute', 
          top: '0', 
          left: '50%', 
          transform: 'translateX(-50%)', 
          width: '800px', 
          height: '500px', 
          background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, rgba(6,11,20,0) 70%)', 
          zIndex: 0, 
          pointerEvents: 'none' 
        }} />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto' }}
        >
          <div style={{ display: 'inline-block', border: '1px solid rgba(212,175,55,0.3)', padding: '8px 20px', borderRadius: '30px', color: '#D4AF37', fontSize: '0.75rem', fontWeight: 900, letterSpacing: '2px', marginBottom: '2.5rem', background: 'rgba(212,175,55,0.05)' }}>
            SOLUCIONES DE INTELIGENCIA ARTIFICIAL B2B
          </div>
          
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, lineHeight: 1, marginBottom: '2rem', letterSpacing: '-2px' }}>
            La Próxima Generación de <br />
            <span style={{ color: '#D4AF37', background: 'linear-gradient(to right, #D4AF37, #F5E6AD)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Ventas Autónomas</span>
          </h1>
          
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.5)', marginBottom: '3.5rem', lineHeight: 1.6, maxWidth: '700px', margin: '0 auto 3.5rem' }}>
            Despliega agentes de IA con el ADN de tu empresa. Captura, califica y cierra leads de alto valor de forma totalmente automática.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <Link href="/login" style={{ padding: '18px 40px', backgroundColor: '#D4AF37', color: '#000', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 900, borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 10px 30px rgba(212, 175, 55, 0.2)' }}>
              Comenzar Despliegue <FiCpu />
            </Link>
          </div>
        </motion.div>
      </main>

      {/* Features Grid */}
      <section style={{ padding: '6rem 5%', background: '#0B1120' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          
          <div style={{ background: 'rgba(255,255,255,0.01)', padding: '3rem', borderRadius: '24px', border: '1px solid rgba(212,175,55,0.1)', transition: 'transform 0.3s' }}>
            <div style={{ backgroundColor: 'rgba(212,175,55,0.1)', width: '60px', height: '600px', maxHeight: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <FiMessageSquare style={{ fontSize: '1.8rem', color: '#D4AF37' }} />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>Omnicanalidad IA</h3>
            <p style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>Widget nativo para tu sitio web que procesa el conocimiento técnico de tu empresa y responde en milisegundos.</p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.01)', padding: '3rem', borderRadius: '24px', border: '1px solid rgba(212,175,55,0.1)' }}>
            <div style={{ backgroundColor: 'rgba(212,175,55,0.1)', width: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <FiTrendingUp style={{ fontSize: '1.8rem', color: '#D4AF37' }} />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>Opal Lead Scoring</h3>
            <p style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>Clasificación inteligente de prospectos mediante análisis de sentimiento y urgencia. Identifica leads "Hot" al instante.</p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.01)', padding: '3rem', borderRadius: '24px', border: '1px solid rgba(212,175,55,0.1)' }}>
            <div style={{ backgroundColor: 'rgba(212,175,55,0.1)', width: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <FiShield style={{ fontSize: '1.8rem', color: '#D4AF37' }} />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>Seguridad de Grado Militar</h3>
            <p style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>Infraestructura encriptada y aislamiento de datos para asegurar que el conocimiento de tu negocio sea privado.</p>
          </div>

        </div>
      </section>

      {/* Footer Simple */}
      <footer style={{ padding: '4rem 5%', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        © 2026 STRATIX AI — SISTEMAS DE INTELIGENCIA AUTÓNOMA.
      </footer>
    </div>
  );
}