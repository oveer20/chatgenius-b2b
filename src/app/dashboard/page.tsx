"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiPlus, FiMessageSquare, FiUser, FiBarChart2, FiExternalLink, FiHelpCircle, FiZap, FiSend } from "react-icons/fi";
import { toast, Toaster } from "sonner";
import { supabase } from "@/lib/supabase";

interface Bot {
  id: string;
  name: string;
  description: string;
  model: string;
  status: string;
  created_at: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [bots, setBots] = useState<Bot[]>([]);
  const [user, setUser] = useState<any>(null);
  const [showHelp, setShowHelp] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function init() {
      // Verificar sesión real de Supabase
      const { data: { user: supaUser } } = await supabase.auth.getUser();
      if (!supaUser) {
        router.push("/login");
        return;
      }
      setUser(supaUser);

      // Cargar bots reales desde la API
      try {
        const res = await fetch("/api/bots");
        if (!res.ok) throw new Error("Error cargando agentes");
        const data = await res.json();
        setBots(data || []);
      } catch (err) {
        toast.error("No se pudieron cargar los agentes.");
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "bienvenido";

  return (
    <div style={{ backgroundColor: '#060B14', minHeight: '100vh', color: 'white', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <header style={{ padding: '1.5rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/stratix_shield.svg" alt="Stratix" style={{ width: '28px', height: '28px' }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '1.4rem', fontWeight: 500 }}>Stratix <span style={{ color: '#D4AF37' }}>Intelligence</span></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.8rem', opacity: 0.4 }}>{user?.email}</span>
          <button onClick={handleLogout} style={{ padding: '10px 20px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white', cursor: 'pointer', fontSize: '0.85rem' }}>
            Cerrar sesión
          </button>
        </div>
      </header>

      <main style={{ padding: '3rem 5%', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Bienvenida */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>
            Hola, {displayName} 👋
          </h1>
          <p style={{ opacity: 0.5, fontSize: '1.1rem' }}>
            Este es tu centro de control de agentes IA. Aquí puedes crear y gestionar tus asistentes virtuales.
          </p>
        </motion.div>

        {/* Acciones rápidas */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setShowHelp(!showHelp)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', background: 'rgba(212,175,55,0.1)', border: '1px solid #D4AF37', borderRadius: '12px', color: '#D4AF37', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 700 }}
          >
            <FiHelpCircle /> {showHelp ? 'Ocultar ayuda' : '¿Cómo funciona?'}
          </button>
          <Link href="/dashboard/leads" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', textDecoration: 'none', fontSize: '0.9rem' }}>
            <FiBarChart2 /> Ver Leads
          </Link>
          <Link href="/dashboard/outreach" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', textDecoration: 'none', fontSize: '0.9rem' }}>
            <FiSend /> Magic Outreach
          </Link>
          <Link href="/widget" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', textDecoration: 'none', fontSize: '0.9rem' }}>
            <FiExternalLink /> Ver widget
          </Link>
        </div>

        {/* Panel de ayuda */}
        {showHelp && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '20px', marginBottom: '3rem', border: '1px solid rgba(212,175,55,0.2)' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.5rem', color: '#D4AF37', fontFamily: "'DM Mono', monospace" }}>¿Qué es Stratix Intelligence?</h3>
            <div style={{ display: 'grid', gap: '1.5rem', opacity: 0.8 }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <FiMessageSquare style={{ color: '#D4AF37', marginTop: '4px' }} />
                <div>
                  <strong>Agentes IA</strong>
                  <p style={{ fontSize: '0.9rem', opacity: 0.6, marginTop: '0.3rem' }}>Son asistentes virtuales que hablan con tus clientes 24/7 en WhatsApp, Web o Instagram. Responden preguntas, califican leads y cierran citas.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <FiUser style={{ color: '#D4AF37', marginTop: '4px' }} />
                <div>
                  <strong>Leads</strong>
                  <p style={{ fontSize: '0.9rem', opacity: 0.6, marginTop: '0.3rem' }}>Son los contactos que el agente captura. Cada conversación genera un lead con información del cliente.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <FiBarChart2 style={{ color: '#D4AF37', marginTop: '4px' }} />
                <div>
                  <strong>Estadísticas</strong>
                  <p style={{ fontSize: '0.9rem', opacity: 0.6, marginTop: '0.3rem' }}>Mide cuántas conversaciones tuvo el agente, cuántos leads cálidos se generaron y el rendimiento general.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tus Agentes */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900 }}>Tus Agentes IA</h2>
          <Link href="/dashboard/bot/new" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: '#D4AF37', borderRadius: '14px', color: '#000', textDecoration: 'none', fontWeight: 900, fontSize: '0.95rem' }}>
            <FiPlus /> Crear agente
          </Link>
        </div>

        {/* Lista de agentes */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
          {isLoading ? (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', opacity: 0.4 }}>
              <FiZap size={32} style={{ marginBottom: '1rem' }} />
              <p>Cargando agentes...</p>
            </div>
          ) : bots.length > 0 ? bots.map((bot) => (
            <motion.div
              key={bot.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '20px', border: '1px solid rgba(212,175,55,0.15)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.3rem' }}>{bot.name}</h3>
                  <p style={{ fontSize: '0.85rem', opacity: 0.5 }}>{bot.description}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 10px', background: 'rgba(16,185,129,0.1)', borderRadius: '20px' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
                  <span style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 700 }}>Activo</span>
                </div>
              </div>
              <p style={{ fontSize: '0.7rem', opacity: 0.3, marginBottom: '1.5rem', fontFamily: 'monospace' }}>
                Modelo: {bot.model} · ID: {bot.id.slice(0, 8)}...
              </p>
              <div style={{ display: 'flex', gap: '0.8rem' }}>
                <Link href={`/dashboard/bot/${bot.id}`} style={{ flex: 1, textAlign: 'center', padding: '12px', background: 'rgba(212,175,55,0.1)', borderRadius: '10px', color: '#D4AF37', textDecoration: 'none', fontWeight: 700, fontSize: '0.85rem' }}>
                  Configurar
                </Link>
                <Link href="/widget" target="_blank" style={{ flex: 1, textAlign: 'center', padding: '12px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white', textDecoration: 'none', fontWeight: 700, fontSize: '0.85rem' }}>
                  Probar
                </Link>
              </div>
            </motion.div>
          )) : (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: '1px dashed rgba(255,255,255,0.1)' }}>
              <FiMessageSquare size={40} style={{ opacity: 0.2, marginBottom: '1rem' }} />
              <p style={{ opacity: 0.5, marginBottom: '1.5rem' }}>No tienes agentes todavía</p>
              <Link href="/dashboard/bot/new" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: '#D4AF37', borderRadius: '14px', color: '#000', textDecoration: 'none', fontWeight: 900 }}>
                <FiPlus /> Crear tu primer agente
              </Link>
            </div>
          )}
        </div>
      </main>

      <Toaster theme="dark" position="top-center" />
    </div>
  );
}