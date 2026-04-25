"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiMessageSquare, FiShield, FiCpu, FiDatabase, FiLock, FiActivity, FiCheck, FiZap, FiGlobe, FiTrendingUp } from "react-icons/fi";

const PRODUCTS = [
  {
    id: "agents",
    title: "Agentes IA",
    subtitle: "Asesores virtuales que conversan como humanos",
    icon: <FiMessageSquare />,
    features: [
      "Comprensión contextual avanzada",
      "Calificación automática de leads",
      "Seguimiento persistente",
      "Múltiples idiomas",
      "Soporte 24/7/365"
    ],
    color: "#D4AF37",
    stat: " +40% Conversión"
  },
  {
    id: "knowledge",
    title: "Motor de Conocimiento",
    subtitle: "Tu base de conocimientos con IA avanzada",
    icon: <FiDatabase />,
    features: [
      "RAG con embeddings deGemini",
      "Procesamiento de PDFs y documentos",
      "Crawl automático de tu web",
      "Búsqueda semántica precisa",
      "Actualización en tiempo real"
    ],
    color: "#10b981",
    stat: " -70% Tiempo de Respuesta"
  },
  {
    id: "security",
    title: "Seguridad Empresarial",
    subtitle: "Protección de datos de nivel corporativo",
    icon: <FiShield />,
    features: [
      "Encriptación E2E",
      "GDPR & SOC2 Compliant",
      "Aislamiento de datos",
      "Auditorías completas",
      "Backups automatizados"
    ],
    color: "#818cf8",
    stat: " 100% Cumplimiento"
  }
];

const SPECS = [
  { label: "Infraestructura", value: "Vercel Edge Functions", icon: <FiGlobe /> },
  { label: "Modelos IA", value: "Gemini 2.0 Pro & GPT-4o", icon: <FiCpu /> },
  { label: "Almacenamiento", value: "Supabase + Vector Store", icon: <FiDatabase /> },
  { label: "Seguridad", value: "SOC2 + GDPR Compliant", icon: <FiLock /> }
];

const INDUSTRIES = [
  { value: "+45%", label: "Inmobiliarias" },
  { value: "+60%", label: "Fintech" },
  { value: "+35%", label: "Salud" },
  { value: "+50%", label: "Educación" },
  { value: "+55%", label: "E-commerce" }
];

export default function LandingSolutions() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div style={{ minHeight: '600px', background: '#030712' }} />;

  return (
    <>
      <section id="productos" style={{ padding: '10rem 5%', background: '#030712', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '10px 20px', background: 'rgba(212,175,55,0.08)', borderRadius: '30px', border: '1px solid rgba(212,175,55,0.2)', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#D4AF37', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Productos</span>
              </div>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
              La stack más<span style={{ color: '#D4AF37' }}> avanzada</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} style={{ fontSize: '1.1rem', opacity: 0.5, maxWidth: '540px', margin: '0 auto' }}>
              Todo lo que necesitas para automatizar ventas y atención al cliente con inteligencia artificial de última generación.
            </motion.p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.8rem' }}>
            {PRODUCTS.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                style={{
                  background: 'rgba(255,255,255,0.015)',
                  borderRadius: '28px',
                  padding: '2.8rem',
                  border: `1px solid ${product.color}25`
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '18px', background: `${product.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', color: product.color }}>
                    {product.icon}
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: product.color }}>{product.stat}</span>
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.6rem' }}>{product.title}</h3>
                <p style={{ fontSize: '0.95rem', opacity: 0.5, marginBottom: '1.8rem' }}>{product.subtitle}</p>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                  {product.features.map((feature, fi) => (
                    <li key={fi} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem', opacity: 0.7 }}>
                      <FiCheck color={product.color} size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="industrias" style={{ padding: '8rem 5%', background: '#0a0a0f' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: '3.5rem' }}>
            Diseñado para<span style={{ color: '#D4AF37' }}> Cualquier Industria</span>
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            {INDUSTRIES.map((ind, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ padding: '2rem 2.5rem', background: 'rgba(255,255,255,0.015)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#D4AF37', marginBottom: '0.4rem' }}>{ind.value}</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.5 }}>{ind.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '8rem 5%', background: '#030712' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900 }}>Especificaciones<span style={{ color: '#D4AF37' }}> Técnicas</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {SPECS.map((spec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  padding: '2rem',
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: '20px',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}
              >
                <div style={{ color: '#D4AF37', marginBottom: '1rem' }}>{spec.icon}</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', opacity: 0.35, marginBottom: '0.5rem' }}>{spec.label}</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{spec.value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}