"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiCloud, FiShield, FiCpu, FiActivity, FiCheck, FiLock, FiServer, FiZap, FiDatabase, FiCode } from "react-icons/fi";

const LAYERS = [
  {
    id: "infra",
    title: "Capa 1: Infraestructura Cloud & Edge",
    subtitle: "Despliegue optimizado en Vercel",
    icon: <FiCloud />,
    features: [
      "Serverless Edge Computing",
      "Distribución global CDN",
      "Auto-scaling inteligente",
      "Latencia < 50ms"
    ],
    color: "#D4AF37"
  },
  {
    id: "security",
    title: "Capa 2: Ciberseguridad & Datos",
    subtitle: "Encriptación AES-256 y cumplimiento",
    icon: <FiShield />,
    features: [
      "Encriptación AES-256",
      "SSL/TLS 1.3 completo",
      "Cumplimiento GDPR",
      "Datos en reposo y tránsito"
    ],
    color: "#D4AF37"
  },
  {
    id: "ai",
    title: "Capa 3: Inteligencia Adaptativa",
    subtitle: "Gemini 1.5 Pro + GPT-4o",
    icon: <FiCpu />,
    features: [
      "Análisis multimodal",
      " Procesamiento de lenguaje natural",
      "Machine learning adaptativo",
      "Context awareness"
    ],
    color: "#D4AF37"
  },
  {
    id: "automation",
    title: "Capa 4: Automatización de Procesos",
    subtitle: "Sectores Comercial, IT e Industrial",
    icon: <FiActivity />,
    features: [
      "Flujos de trabajo automatizados",
      "Integración con CRMs",
      "Monitoreo en tiempo real",
      "Alertas predictivas"
    ],
    color: "#D4AF37"
  }
];

export default function EcosystemLayers() {
  const [mounted, setMounted] = useState(false);
  const LAYERS_ARRAY = LAYERS || [];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div style={{ minHeight: '500px', background: '#030712' }} />;

  return (
    <section id="ecosistema" style={{ padding: '10rem 5%', background: '#030712', borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '8px 16px', background: 'rgba(99,102,241,0.1)', borderRadius: '30px', border: '1px solid rgba(99,102,241,0.25)', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#818cf8', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Arquitectura</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Ecosistema de<span style={{ color: '#818cf8' }}> Capas</span>
          </h2>
          <p style={{ fontSize: '1rem', opacity: 0.5, maxWidth: '560px', margin: '0 auto' }}>Modelo SaaS de 4 pilares para máxima capacidad técnica.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {LAYERS_ARRAY.map((layer: any, i: number) => (
            <motion.div
              key={layer.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: 'rgba(255,255,255,0.015)',
                borderRadius: '20px',
                padding: '2rem',
                border: `1px solid ${layer.color}20`,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '3px', background: layer.color }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: `${layer.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', color: layer.color }}>
                  {layer.icon}
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', opacity: 0.4, marginBottom: '2px' }}>{layer.id}</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{layer.title}</div>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', opacity: 0.5, marginBottom: '1.5rem' }}>{layer.subtitle}</p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {layer.features.map((feature: string, fi: number) => (
                  <li key={fi} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', opacity: 0.7 }}>
                    <FiCheck color={layer.color} size={14} />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}