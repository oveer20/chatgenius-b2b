"use client";

import { useState, Suspense } from "react";
import { FiMessageSquare, FiExternalLink, FiMapPin, FiArrowRight, FiCheckCircle, FiInfo, FiZap } from "react-icons/fi";
import { motion } from "framer-motion";
import Link from "next/link";

/**
 * STRATIX INTELLIGENCE — MAGIC OUTREACH DASHBOARD (V10.0)
 * CRM de prospección activa con guiones corporativos de alta conversión.
 */

const OUTREACH_DATA = [
  {
    city: "Bogotá",
    targets: [
      {
        name: "Mubrick",
        whatsapp: "573173669778",
        description: "Referentes en tecnología inmobiliaria en la capital.",
        strategy: "Si ellos adoptan Stratix, el sector entero te verá como el estándar.",
        message: "Hola equipo de Mubrick! 🏠 Vi que son referentes en el sector, pero su atención fuera de horario aún es manual. He desarrollado una arquitectura de IA llamada Stratix que califica leads 'Hot' 24/7. ¿Les gustaría una Demo Estratégica de 7 días sin costo?"
      },
      {
        name: "Ospina",
        whatsapp: "573125767129",
        description: "Inmobiliaria con 65 años de trayectoria.",
        strategy: "Legacy absoluto. Stratix es el 'refresh' que necesitan para no perder leads jóvenes.",
        message: "Hola! Respeto mucho la trayectoria de Ospina. Me gustaría ofrecerles modernizar su atención con Stratix Intelligence, una IA que respeta su legado pero con velocidad de respuesta 24/7. ¿Hablamos de una demo gratuita entrenada con sus propios manuales?"
      },
      {
        name: "Épica",
        whatsapp: "573125767129",
        description: "Enfoque en agilidad y modernidad.",
        strategy: "Rapidez es su mantra. Stratix es agilidad pura.",
        message: "Hola equipo de Épica! Me encanta su enfoque en agilidad. Quería ofrecerles escalar esa agilidad con Stratix, una IA que atiende a sus interesados al instante incluso a las 3 AM. ¿Les interesa una prueba gratis para ver el ROI?"
      }
    ]
  },
  {
    city: "Medellín",
    targets: [
      {
        name: "Alberto Álvarez",
        whatsapp: "573208431030",
        description: "El gigante del mercado inmobiliario paisa.",
        strategy: "Si les ahorras el 10% de trabajo, te pagan lo que sea.",
        message: "Hola equipo de Alberto Álvarez! Manejan un volumen inmenso de consultas. He diseñado Stratix, una IA que ayuda a sus clientes a encontrar propiedades en segundos liberando a su equipo humano. ¿Les interesa una demo estrategica de 7 días?"
      },
      {
        name: "Grupo Panorama",
        whatsapp: "573015446892",
        description: "Múltiples sedes con cobertura total.",
        strategy: "Stratix unifica su cerebro comercial ante la dispersión de oficinas.",
        message: "Hola Panorama Inmobiliario! Vi que tienen cobertura total en la ciudad. ¿Les gustaría centralizar su atención con una arquitectura de IA que califique leads por ustedes mientras descansan? Es gratis probarlo por una semana."
      }
    ]
  }
];

function OutreachContent() {
  const [contacted, setContacted] = useState<string[]>([]);

  const handleContact = (target: any) => {
    const encodedText = encodeURIComponent(target.message);
    const url = `https://wa.me/${target.whatsapp}?text=${encodedText}`;
    window.open(url, "_blank");
    
    if (!contacted.includes(target.name)) {
      setContacted([...contacted, target.name]);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#060B14', color: 'white', padding: '2rem 5%' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header de Prospección */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.8rem' }}>
              Magic <span style={{ color: '#D4AF37' }}>Outreach</span>
            </h1>
            <p style={{ opacity: 0.6, fontSize: '1.1rem', maxWidth: '600px' }}>
              Proyecta el poder de **Stratix Intelligence** con guiones de alta conversión cargados en un solo clic.
            </p>
          </div>
          <div style={{ padding: '1.2rem', background: 'rgba(212,175,55,0.05)', borderRadius: '20px', border: '1px solid rgba(212,175,55,0.2)', textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 900, opacity: 0.5, marginBottom: '0.5rem' }}>PROGRESO DE CAMPAÑA</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900 }}>{contacted.length} / 5</div>
          </div>
        </div>

        {/* Campañas por Ciudad */}
        {OUTREACH_DATA.map((cityGroup, cityIndex) => (
          <div key={cityGroup.city} style={{ marginBottom: '4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
              <FiMapPin style={{ color: '#D4AF37' }} />
              <h2 style={{ fontSize: '1.2rem', fontWeight: 900, letterSpacing: '2px', textTransform: 'uppercase' }}>{cityGroup.city}</h2>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(212,175,55,0.2), transparent)' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
              {cityGroup.targets.map((target, targetIndex) => {
                const isContacted = contacted.includes(target.name);
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (cityIndex * 3 + targetIndex) * 0.1 }}
                    key={target.name} 
                    style={{
                      background: 'rgba(11,17,32,0.8)',
                      padding: '2rem',
                      borderRadius: '24px',
                      border: isContacted ? '2px solid #27C93F' : '1px solid rgba(255,255,255,0.08)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {isContacted && <FiCheckCircle style={{ position: 'absolute', top: '1rem', right: '1rem', color: '#27C93F' }} />}
                    
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>{target.name}</h3>
                    <p style={{ fontSize: '0.85rem', opacity: 0.5, marginBottom: '1.5rem' }}>{target.description}</p>
                    
                    <div style={{ marginBottom: '2rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '12px', borderLeft: '3px solid #D4AF37' }}>
                      <div style={{ fontSize: '0.65rem', fontWeight: 900, opacity: 0.4, marginBottom: '0.4rem', textTransform: 'uppercase' }}>Potencial Estratégico</div>
                      <div style={{ fontSize: '0.85rem', lineHeight: 1.5 }}>{target.strategy}</div>
                    </div>

                    <button 
                      onClick={() => handleContact(target)}
                      style={{
                        width: '100%',
                        padding: '16px',
                        background: isContacted ? 'rgba(255,255,255,0.05)' : '#D4AF37',
                        color: isContacted ? 'white' : '#000',
                        border: 'none',
                        borderRadius: '15px',
                        fontWeight: 900,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {isContacted ? "ENVIADO RE-CONTACTAR" : "DISPARAR WHATSAPP"} <FiMessageSquare size={18} />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Instrucciones Pro */}
        <div style={{ marginTop: '5rem', padding: '3rem', background: 'linear-gradient(135deg, rgba(212,175,55,0.1), transparent)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
            <FiInfo size={32} color="#D4AF37" />
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900 }}>Instrucciones de Élite</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            {[
              { step: "1", text: "Abre WhatsApp Web en tu navegador." },
              { step: "2", text: "Haz clic en el enlace del prospecto elegido." },
              { step: "3", text: "El mensaje se cargará solo. Presiona Enviar." },
              { step: "4", text: "Al responder, envíales tu Landing Page personalizada." }
            ].map(item => (
              <div key={item.step} style={{ display: 'flex', gap: '15px' }}>
                <span style={{ fontSize: '2rem', fontWeight: 900, color: '#D4AF37', opacity: 0.3 }}>{item.step}</span>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.6, opacity: 0.7 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '4rem', opacity: 0.2, fontSize: '0.8rem', letterSpacing: '4px' }}>
          STRATIX INTELLIGENCE — ACTIVACIÓN COMERCIAL UNIFICADA
        </div>

      </div>
    </div>
  );
}

export default function OutreachDashboard() {
  return (
    <Suspense fallback={<div style={{ padding: '50px', color: 'white', textAlign: 'center' }}>Preparando Campaña de Élite...</div>}>
      <OutreachContent />
    </Suspense>
  );
}
