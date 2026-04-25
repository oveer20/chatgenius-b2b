"use client";

import { useState, useEffect, Suspense } from "react";
import {
  FiMessageSquare, FiMapPin, FiCheckCircle, FiInfo,
  FiArrowLeft, FiZap, FiUser, FiPhone, FiRefreshCw
} from "react-icons/fi";
import { motion } from "framer-motion";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";

/**
 * STRATIX INTELLIGENCE — MAGIC OUTREACH DASHBOARD (V11.0)
 * CRM de prospección activa — Auth real + leads Hot desde Supabase.
 */

const STATIC_TARGETS = [
  {
    city: "Bogotá",
    name: "Mubrick",
    whatsapp: "573173669778",
    description: "Referentes en tecnología inmobiliaria en la capital.",
    strategy: "Si ellos adoptan Stratix, el sector entero te verá como el estándar.",
    message: "Hola equipo de Mubrick! 🏠 Vi que son referentes en el sector, pero su atención fuera de horario aún es manual. He desarrollado una arquitectura de IA llamada Stratix que califica leads Hot 24/7. ¿Les gustaría una Demo Estratégica de 7 días sin costo?",
    source: "static"
  },
  {
    city: "Bogotá",
    name: "Ospina",
    whatsapp: "573125767129",
    description: "Inmobiliaria con 65 años de trayectoria.",
    strategy: "Legacy absoluto. Stratix es el refresh que necesitan para no perder leads jóvenes.",
    message: "Hola! Respeto mucho la trayectoria de Ospina. Me gustaría ofrecerles modernizar su atención con Stratix Intelligence, una IA que respeta su legado pero con velocidad de respuesta 24/7. ¿Hablamos de una demo gratuita entrenada con sus propios manuales?",
    source: "static"
  },
  {
    city: "Bogotá",
    name: "Épica",
    whatsapp: "573125767129",
    description: "Enfoque en agilidad y modernidad.",
    strategy: "Rapidez es su mantra. Stratix es agilidad pura.",
    message: "Hola equipo de Épica! Me encanta su enfoque en agilidad. Quería ofrecerles escalar esa agilidad con Stratix, una IA que atiende a sus interesados al instante incluso a las 3 AM. ¿Les interesa una prueba gratis para ver el ROI?",
    source: "static"
  },
  {
    city: "Medellín",
    name: "Alberto Álvarez",
    whatsapp: "573208431030",
    description: "El gigante del mercado inmobiliario paisa.",
    strategy: "Si les ahorras el 10% de trabajo, te pagan lo que sea.",
    message: "Hola equipo de Alberto Álvarez! Manejan un volumen inmenso de consultas. He diseñado Stratix, una IA que ayuda a sus clientes a encontrar propiedades en segundos liberando a su equipo humano. ¿Les interesa una demo estratégica de 7 días?",
    source: "static"
  },
  {
    city: "Medellín",
    name: "Grupo Panorama",
    whatsapp: "573015446892",
    description: "Múltiples sedes con cobertura total.",
    strategy: "Stratix unifica su cerebro comercial ante la dispersión de oficinas.",
    message: "Hola Panorama Inmobiliario! Vi que tienen cobertura total en la ciudad. ¿Les gustaría centralizar su atención con una arquitectura de IA que califique leads por ustedes mientras descansan? Es gratis probarlo por una semana.",
    source: "static"
  },
];

interface Target {
  city: string;
  name: string;
  whatsapp: string;
  description: string;
  strategy: string;
  message: string;
  source: string;
}

function OutreachContent() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [targets, setTargets] = useState<Target[]>(STATIC_TARGETS);
  const [contacted, setContacted] = useState<string[]>([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState(true);

  // 1. Verificar auth y cargar leads Hot reales
  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUserId(user.id);

      // Restaurar estado "contactado" por usuario desde localStorage
      const saved = localStorage.getItem(`stratix_contacted_${user.id}`);
      if (saved) setContacted(JSON.parse(saved));

      // Cargar leads Hot reales como targets adicionales
      try {
        const res = await fetch("/api/leads?score=Hot");
        if (res.ok) {
          const hotLeads = await res.json();
          const dynamicTargets: Target[] = hotLeads
            .filter((l: any) => l.whatsapp)
            .map((l: any) => ({
              city: "Tus Leads Hot 🔥",
              name: l.name || "Prospecto",
              whatsapp: l.whatsapp.replace(/\D/g, ""),
              description: `${l.email || "Sin email"} · Bot: ${l.bots?.name || "Stratix"}`,
              strategy: `Lead calificado como HOT por Opal Logic. Conversión estimada: alta.`,
              message: `Hola ${l.name || ""}! Vi que estuviste interesado en nuestros servicios. ¿Podemos agendar una llamada rápida para contarte más sobre lo que Stratix puede hacer por ti? 🚀`,
              source: "dynamic"
            }));
          if (dynamicTargets.length > 0) {
            setTargets([...dynamicTargets, ...STATIC_TARGETS]);
            toast.success(`${dynamicTargets.length} leads Hot cargados como targets`);
          }
        }
      } catch (_) {
        // Silencioso — los targets estáticos siguen disponibles
      } finally {
        setIsLoadingLeads(false);
      }
    }
    init();
  }, [router]);

  // 2. Abrir WhatsApp y marcar como contactado
  const handleContact = (target: Target) => {
    const encodedText = encodeURIComponent(target.message);
    window.open(`https://wa.me/${target.whatsapp}?text=${encodedText}`, "_blank");

    if (!contacted.includes(target.name)) {
      const updated = [...contacted, target.name];
      setContacted(updated);
      if (userId) {
        localStorage.setItem(`stratix_contacted_${userId}`, JSON.stringify(updated));
      }
      toast.success(`${target.name} marcado como contactado`);
    }
  };

  // 3. Agrupar por ciudad
  const grouped = targets.reduce<Record<string, Target[]>>((acc, t) => {
    if (!acc[t.city]) acc[t.city] = [];
    acc[t.city].push(t);
    return acc;
  }, {});

  const totalTargets = targets.length;
  const contactedCount = contacted.filter(n => targets.some(t => t.name === n)).length;

  return (
    <div style={{ minHeight: '100vh', background: '#060B14', color: 'white', padding: '2rem 5%', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
          <div>
            <Link href="/dashboard" style={{ color: '#D4AF37', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', marginBottom: '1rem', fontWeight: 700 }}>
              <FiArrowLeft /> REGRESAR AL CENTRO DE CONTROL
            </Link>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.8rem' }}>
              Magic <span style={{ color: '#D4AF37' }}>Outreach</span>
            </h1>
            <p style={{ opacity: 0.6, fontSize: '1rem', maxWidth: '600px' }}>
              Proyecta el poder de Stratix Intelligence con guiones de alta conversión en un clic.
              {isLoadingLeads && (
                <span style={{ color: '#D4AF37', marginLeft: '10px', fontSize: '0.8rem' }}>
                  <FiRefreshCw style={{ display: 'inline', marginRight: '4px' }} />
                  Cargando leads Hot...
                </span>
              )}
            </p>
          </div>

          {/* Progreso */}
          <div style={{ padding: '1.5rem 2rem', background: 'rgba(212,175,55,0.05)', borderRadius: '20px', border: '1px solid rgba(212,175,55,0.2)', textAlign: 'center', minWidth: '140px' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 900, opacity: 0.5, marginBottom: '0.5rem', letterSpacing: '2px' }}>PROGRESO</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#D4AF37', lineHeight: 1 }}>
              {contactedCount}
            </div>
            <div style={{ fontSize: '0.8rem', opacity: 0.4, marginTop: '4px' }}>de {totalTargets}</div>
            <div style={{ marginTop: '10px', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ width: `${totalTargets > 0 ? (contactedCount / totalTargets) * 100 : 0}%`, height: '100%', background: '#D4AF37', transition: 'width 0.5s ease' }} />
            </div>
          </div>
        </div>

        {/* Grupos por ciudad */}
        {Object.entries(grouped).map(([city, cityTargets], cityIndex) => (
          <div key={city} style={{ marginBottom: '4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
              <FiMapPin style={{ color: cityTargets[0]?.source === 'dynamic' ? '#ef4444' : '#D4AF37' }} />
              <h2 style={{ fontSize: '1.1rem', fontWeight: 900, letterSpacing: '2px', textTransform: 'uppercase' }}>{city}</h2>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(212,175,55,0.2), transparent)' }} />
              <span style={{ fontSize: '0.7rem', opacity: 0.4 }}>{cityTargets.length} targets</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
              {cityTargets.map((target, i) => {
                const isContacted = contacted.includes(target.name);
                const isDynamic = target.source === 'dynamic';
                return (
                  <motion.div
                    key={`${target.name}-${i}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (cityIndex * 3 + i) * 0.08 }}
                    style={{
                      background: isDynamic ? 'rgba(239,68,68,0.03)' : 'rgba(11,17,32,0.8)',
                      padding: '2rem',
                      borderRadius: '24px',
                      border: isContacted
                        ? '2px solid #27C93F'
                        : isDynamic
                          ? '1px solid rgba(239,68,68,0.3)'
                          : '1px solid rgba(255,255,255,0.08)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Badge tipo lead */}
                    {isDynamic && (
                      <span style={{ position: 'absolute', top: '1rem', left: '1rem', background: '#ef4444', color: 'white', fontSize: '0.55rem', fontWeight: 900, padding: '2px 8px', borderRadius: '4px', letterSpacing: '1px' }}>
                        LEAD HOT REAL
                      </span>
                    )}
                    {isContacted && <FiCheckCircle style={{ position: 'absolute', top: '1rem', right: '1rem', color: '#27C93F' }} />}

                    <div style={{ marginTop: isDynamic ? '1.8rem' : 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.4rem' }}>
                        {isDynamic ? <FiUser style={{ color: '#ef4444', flexShrink: 0 }} /> : <FiZap style={{ color: '#D4AF37', flexShrink: 0 }} />}
                        <h3 style={{ fontSize: '1.3rem', fontWeight: 900 }}>{target.name}</h3>
                      </div>
                      <p style={{ fontSize: '0.82rem', opacity: 0.5, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FiPhone size={12} /> {target.description}
                      </p>

                      <div style={{ marginBottom: '1.8rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '12px', borderLeft: `3px solid ${isDynamic ? '#ef4444' : '#D4AF37'}` }}>
                        <div style={{ fontSize: '0.6rem', fontWeight: 900, opacity: 0.4, marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Potencial Estratégico</div>
                        <div style={{ fontSize: '0.82rem', lineHeight: 1.6, opacity: 0.8 }}>{target.strategy}</div>
                      </div>

                      <button
                        onClick={() => handleContact(target)}
                        style={{
                          width: '100%',
                          padding: '16px',
                          background: isContacted ? 'rgba(255,255,255,0.05)' : isDynamic ? '#ef4444' : '#D4AF37',
                          color: isContacted ? 'white' : '#000',
                          border: 'none',
                          borderRadius: '15px',
                          fontWeight: 900,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '12px',
                          fontSize: '0.85rem',
                          letterSpacing: '0.5px',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <FiMessageSquare size={16} />
                        {isContacted ? 'RE-CONTACTAR' : 'DISPARAR WHATSAPP'}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Instrucciones */}
        <div style={{ marginTop: '4rem', padding: '3rem', background: 'linear-gradient(135deg, rgba(212,175,55,0.08), transparent)', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
            <FiInfo size={28} color="#D4AF37" />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 900 }}>Instrucciones de Élite</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            {[
              { step: "1", text: "Abre WhatsApp Web en tu navegador." },
              { step: "2", text: "Haz clic en el target elegido — el mensaje se precarga." },
              { step: "3", text: "Presiona Enviar. El progreso se guarda automáticamente." },
              { step: "4", text: "Los leads Hot de tus bots aparecen aquí en tiempo real." }
            ].map(item => (
              <div key={item.step} style={{ display: 'flex', gap: '15px' }}>
                <span style={{ fontSize: '2rem', fontWeight: 900, color: '#D4AF37', opacity: 0.3, lineHeight: 1 }}>{item.step}</span>
                <p style={{ fontSize: '0.88rem', lineHeight: 1.6, opacity: 0.7 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem', opacity: 0.15, fontSize: '0.7rem', letterSpacing: '4px' }}>
          STRATIX INTELLIGENCE — ACTIVACIÓN COMERCIAL UNIFICADA V11.0
        </div>
      </div>
      <Toaster theme="dark" richColors position="top-center" />
    </div>
  );
}

export default function OutreachDashboard() {
  return (
    <Suspense fallback={<div style={{ padding: '50px', color: 'white', textAlign: 'center' }}>Preparando campaña de élite...</div>}>
      <OutreachContent />
    </Suspense>
  );
}
