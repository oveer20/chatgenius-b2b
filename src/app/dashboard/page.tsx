"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiPlus, FiMessageSquare, FiUser, FiBarChart2, FiExternalLink, FiHelpCircle, FiZap, FiCpu, FiShield } from "react-icons/fi";
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

const AI_PROVIDERS = {
  gemini: { name: "Gemini 2.0 Flash", color: "#4285F4", badge: "Principal" },
  gpt: { name: "GPT-3.5 Turbo", color: "#10A37F", badge: "Backup" },
  groq: { name: "Llama 3.1 - Groq", color: "#FF6B35", badge: "GRATIS" },
  mistral: { name: "Mistral Small", color: "#9F7AEA", badge: "GRATIS" }
};

export default function DashboardPage() {
  const router = useRouter();
  const [bots, setBots] = useState<Bot[]>([]);
  const [user, setUser] = useState<{id?: string; email?: string; user_metadata?: Record<string, string>} | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [leadStats, setLeadStats] = useState({ total: 0, hot: 0, warm: 0, cold: 0 });
  const [showSampleData, setShowSampleData] = useState(false);

  useEffect(() => {
    async function init() {
      const { data: { user: supaUser } } = await supabase.auth.getUser();
      if (!supaUser) {
        router.push("/login");
        return;
      }
      setUser(supaUser);

      try {
        const res = await fetch("/api/bots");
        if (!res.ok) throw new Error("Error cargando agentes");
        const data = await res.json();
        setBots(data || []);
      } catch (_err) {
        toast.error("No se pudieron cargar los agentes.");
      } finally {
        setIsLoading(false);
      }

      try {
        const leadsRes = await fetch("/api/seed");
        if (leadsRes.ok) {
          const seedData = await leadsRes.json();
          if (seedData.seeded) {
            toast.success(`${seedData.count} leads de ejemplo cargados`);
          }
        }
        const res = await fetch("/api/leads");
        if (res.ok) {
          const leads = await res.json();
          if (Array.isArray(leads) && leads.length > 0) {
            setLeadStats({
              total: leads.length,
              hot: leads.filter((l: { score?: string }) => l.score === 'Hot').length,
              warm: leads.filter((l: { score?: string }) => l.score === 'Warm').length,
              cold: leads.filter((l: { score?: string }) => l.score === 'Cold').length,
            });
            setShowSampleData(false);
          } else {
            setShowSampleData(true);
            setLeadStats({ total: 47, hot: 12, warm: 23, cold: 12 });
          }
        } else {
          setShowSampleData(true);
          setLeadStats({ total: 47, hot: 12, warm: 23, cold: 12 });
        }
      } catch {
        setShowSampleData(true);
        setLeadStats({ total: 47, hot: 12, warm: 23, cold: 12 });
      }
    }
    init();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "bienvenido";
  const activeBots = bots.length;
  const conversionRate = leadStats.total > 0 ? Math.round((leadStats.hot / leadStats.total) * 100) : 0;

  return (
    <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>
      {/* Header */}
      <header style={{ padding: '1.5rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', background: 'rgba(13,16,23,0.8)', backdropFilter: 'blur(10px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/stratix_shield.svg" alt="Stratix" style={{ width: '28px', height: '28px' }} />
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '1.2rem', fontWeight: 700 }}>Stratix <span style={{ color: 'var(--accent)' }}>Intelligence</span></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{user?.email}</span>
          <button onClick={handleLogout} style={{ padding: '10px 20px', background: 'transparent', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--text-primary)', cursor: 'pointer', fontSize: '0.85rem' }}>
            Cerrar sesión
          </button>
        </div>
      </header>

      <main style={{ padding: '3rem 5%', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Bienvenida */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 400, marginBottom: '0.5rem' }}>
            Hola, {displayName} 👋
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
            Este es tu centro de control de agentes IA. Aquí puedes crear y gestionar tus asistentes virtuales.
          </p>
        </motion.div>

        {/* Stats rápidas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ padding: '1.5rem', background: 'rgba(13,16,23,0.6)', border: '1px solid var(--border)', borderRadius: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
              <FiCpu style={{ color: 'var(--accent)' }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Agentes</span>
            </div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--accent)' }}>{activeBots}</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            style={{ padding: '1.5rem', background: 'rgba(13,16,23,0.6)', border: '1px solid var(--border)', borderRadius: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
              <FiUser style={{ color: '#10b981' }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Total Leads</span>
            </div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--text-primary)' }}>{leadStats.total}</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ padding: '1.5rem', background: 'rgba(13,16,23,0.6)', border: '1px solid var(--border)', borderRadius: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
              <FiZap style={{ color: '#D4AF37' }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>HOT Leads</span>
            </div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#D4AF37' }}>{leadStats.hot}</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            style={{ padding: '1.5rem', background: 'rgba(13,16,23,0.6)', border: '1px solid var(--border)', borderRadius: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
              <FiBarChart2 style={{ color: '#3B82F6' }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Conversión</span>
            </div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#10b981' }}>{conversionRate}%</div>
          </motion.div>
        </div>

        {/* Mini Score Distribution */}
        {leadStats.total > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ padding: '1.5rem', background: 'rgba(13,16,23,0.6)', border: '1px solid var(--border)', borderRadius: '16px', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Distribución de Leads</span>
              {showSampleData && <span style={{ fontSize: '0.7rem', color: 'var(--accent)', background: 'var(--accent-dim)', padding: '2px 8px', borderRadius: '4px' }}>Datos de ejemplo</span>}
            </div>
            <div style={{ display: 'flex', gap: '4px', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ flex: leadStats.hot, background: '#D4AF37', borderRadius: '4px 0 0 4px' }} />
              <div style={{ flex: leadStats.warm, background: '#FCD34D' }} />
              <div style={{ flex: leadStats.cold, background: '#4a5568', borderRadius: '0 4px 4px 0' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.8rem', fontSize: '0.75rem' }}>
              <span style={{ color: '#D4AF37' }}>● HOT {leadStats.hot}</span>
              <span style={{ color: '#FCD34D' }}>● WARM {leadStats.warm}</span>
              <span style={{ color: '#4a5568' }}>● COLD {leadStats.cold}</span>
            </div>
          </motion.div>
        )}

        {/* Acciones rápidas */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setShowHelp(!showHelp)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', background: 'var(--accent-dim)', border: '1px solid var(--accent)', borderRadius: '12px', color: 'var(--accent)', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600 }}
          >
            <FiHelpCircle /> {showHelp ? 'Ocultar ayuda' : '¿Cómo funciona?'}
          </button>
          <Link href="/dashboard/leads" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', color: 'var(--text-primary)', textDecoration: 'none', fontSize: '0.9rem' }}>
            <FiBarChart2 /> Ver Leads
          </Link>
          <Link href="/widget" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', color: 'var(--text-primary)', textDecoration: 'none', fontSize: '0.9rem' }}>
            <FiExternalLink /> Ver widget
          </Link>
        </div>

        {/* Panel de ayuda */}
        {showHelp && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ background: 'rgba(13,16,23,0.6)', padding: '2rem', borderRadius: '20px', marginBottom: '3rem', border: '1px solid var(--accent)' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--accent)' }}>¿Qué es Stratix Intelligence?</h3>
            <div style={{ display: 'grid', gap: '1.5rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <FiMessageSquare style={{ color: 'var(--accent)', marginTop: '4px' }} />
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>Agentes IA</strong>
                  <p style={{ fontSize: '0.9rem', marginTop: '0.3rem' }}>Son asistentes virtuales que hablan con tus clientes 24/7 en WhatsApp, Web o Instagram. Responden preguntas, califican leads y cierran citas.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <FiCpu style={{ color: 'var(--accent)', marginTop: '4px' }} />
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>Multi-Motor IA</strong>
                  <p style={{ fontSize: '0.9rem', marginTop: '0.3rem' }}>Stratix usa 4 motores de IA: Gemini, GPT-3.5, Groq y Mistral. Si uno falla, otro responde automáticamente.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <FiUser style={{ color: 'var(--accent)', marginTop: '4px' }} />
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>Leads</strong>
                  <p style={{ fontSize: '0.9rem', marginTop: '0.3rem' }}>Son los contactos que el agente captura. Cada conversación genera un lead con información del cliente.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tus Agentes */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>Tus Agentes IA</h2>
          <Link href="/dashboard/bot/new" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: 'var(--accent)', borderRadius: '14px', color: '#030a05', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem' }}>
            <FiPlus /> Crear agente
          </Link>
        </div>

        {/* Lista de agentes */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
          {isLoading ? (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
              <FiZap size={32} style={{ marginBottom: '1rem', color: 'var(--accent)' }} />
              <p>Cargando agentes...</p>
            </div>
          ) : bots.length > 0 ? bots.map((bot) => {
            const aiInfo = AI_PROVIDERS[bot.model as keyof typeof AI_PROVIDERS] || AI_PROVIDERS.gemini;
            return (
              <motion.div
                key={bot.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ background: 'rgba(13,16,23,0.6)', backdropFilter: 'blur(10px)', padding: '2rem', borderRadius: '20px', border: '1px solid var(--border)', transition: 'all 0.3s ease' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '0.3rem' }}>{bot.name}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{bot.description}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 10px', background: 'rgba(16,185,129,0.1)', borderRadius: '20px' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
                    <span style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 600 }}>Activo</span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem', padding: '8px 12px', background: 'var(--surface)', borderRadius: '8px' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: aiInfo.color }} />
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{aiInfo.name}</span>
                  <span style={{ fontSize: '0.65rem', padding: '2px 6px', background: aiInfo.badge === 'GRATIS' ? 'rgba(16,185,129,0.2)' : 'var(--accent-glow)', color: aiInfo.badge === 'GRATIS' ? '#10b981' : 'var(--accent)', borderRadius: '4px', fontWeight: 600 }}>{aiInfo.badge}</span>
                </div>
                
                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  <Link href={`/dashboard/bot/${bot.id}`} style={{ flex: 1, textAlign: 'center', padding: '12px', background: 'var(--accent-dim)', borderRadius: '10px', color: 'var(--accent)', textDecoration: 'none', fontWeight: 600, fontSize: '0.85rem' }}>
                    Configurar
                  </Link>
                  <Link href="/widget" target="_blank" style={{ flex: 1, textAlign: 'center', padding: '12px', background: 'transparent', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 600, fontSize: '0.85rem' }}>
                    Probar
                  </Link>
                </div>
              </motion.div>
            );
          }) : (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', background: 'rgba(13,16,23,0.6)', borderRadius: '20px', border: '1px dashed var(--border)' }}>
              <FiMessageSquare size={40} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>No tienes agentes todavía</p>
              <Link href="/dashboard/bot/new" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: 'var(--accent)', borderRadius: '14px', color: '#030a05', textDecoration: 'none', fontWeight: 700 }}>
                <FiPlus /> Crear tu primer agente
              </Link>
            </div>
          )}
        </div>

        {/* Info de IAs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ padding: '2rem', background: 'rgba(13,16,23,0.6)', border: '1px solid var(--border)', borderRadius: '20px' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', marginBottom: '1.5rem', color: 'var(--accent)' }}>Motores de IA Disponibles</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {Object.entries(AI_PROVIDERS).map(([key, info]) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', background: 'var(--surface)', borderRadius: '10px' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: info.color }} />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{info.name}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{info.badge}</div>
                </div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Cuando crees un agente, podrás elegir qué motor de IA usar. Todos incluyen failover automático.
          </p>
        </motion.div>
      </main>

      <Toaster theme="dark" position="top-center" />
    </div>
  );
}