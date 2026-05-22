"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiPlus, FiMessageSquare, FiUser, FiBarChart2, FiExternalLink, FiHelpCircle, FiCpu, FiZap } from "react-icons/fi";
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
    <div className="bg-bg min-h-screen text-text-primary font-sans">
      {/* Header */}
      <header className="py-6 px-[5%] flex justify-between items-center border-b border-white/10 bg-bg/80 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <img src="/stratix_shield.svg" alt="Stratix" className="w-7 h-7" />
          <span className="font-sans text-xl font-bold">Stratix <span className="text-accent">Intelligence</span></span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-text-secondary">{user?.email}</span>
          <button onClick={handleLogout} className="px-5 py-[10px] bg-transparent border border-white/10 rounded-sm text-text-primary cursor-pointer text-sm">
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className="py-12 px-[5%] max-w-[1200px] mx-auto">
        {/* Bienvenida */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="font-serif text-[clamp(2rem,5vw,3rem)] font-normal mb-2">
            Hola, {displayName} 👋
          </h1>
          <p className="text-text-secondary text-lg">
            Este es tu centro de control de agentes IA. Aquí puedes crear y gestionar tus asistentes virtuales.
          </p>
        </motion.div>

        {/* Stats rápidas */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-6 mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="p-6 bg-bg/60 border border-white/10 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <FiCpu className="text-accent" />
              <span className="text-xs text-text-secondary uppercase tracking-widest">Agentes</span>
            </div>
            <div className="font-serif text-3xl text-accent">{activeBots}</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="p-6 bg-bg/60 border border-white/10 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <FiUser className="text-[#10b981]" />
              <span className="text-xs text-text-secondary uppercase tracking-widest">Total Leads</span>
            </div>
            <div className="font-serif text-3xl text-text-primary">{leadStats.total}</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="p-6 bg-bg/60 border border-white/10 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <FiZap className="text-[#D4AF37]" />
              <span className="text-xs text-text-secondary uppercase tracking-widest">HOT Leads</span>
            </div>
            <div className="font-serif text-3xl text-[#D4AF37]">{leadStats.hot}</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="p-6 bg-bg/60 border border-white/10 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <FiBarChart2 className="text-[#3B82F6]" />
              <span className="text-xs text-text-secondary uppercase tracking-widest">Conversión</span>
            </div>
            <div className="font-serif text-3xl text-[#10b981]">{conversionRate}%</div>
          </motion.div>
        </div>

        {/* Mini Score Distribution */}
        {leadStats.total > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="p-6 bg-bg/60 border border-white/10 rounded-lg mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs text-text-secondary uppercase tracking-widest">Distribución de Leads</span>
              {showSampleData && <span className="text-[0.7rem] text-accent bg-accent-dim px-2 py-[2px] rounded-xs">Datos de ejemplo</span>}
            </div>
            <div className="flex gap-1 h-2 rounded-xs overflow-hidden">
              <div style={{ flex: leadStats.hot }} className="bg-[#D4AF37] rounded-l-xs" />
              <div style={{ flex: leadStats.warm }} className="bg-[#FCD34D]" />
              <div style={{ flex: leadStats.cold }} className="bg-[#4a5568] rounded-r-xs" />
            </div>
            <div className="flex justify-between mt-3 text-xs">
              <span className="text-[#D4AF37]">● HOT {leadStats.hot}</span>
              <span className="text-[#FCD34D]">● WARM {leadStats.warm}</span>
              <span className="text-[#4a5568]">● COLD {leadStats.cold}</span>
            </div>
          </motion.div>
        )}

        {/* Acciones rápidas */}
        <div className="flex gap-4 mb-12 flex-wrap">
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="flex items-center gap-2 px-5 py-3 bg-accent-dim border border-accent rounded-md text-accent cursor-pointer text-sm font-semibold"
          >
            <FiHelpCircle /> {showHelp ? 'Ocultar ayuda' : '¿Cómo funciona?'}
          </button>
          <Link href="/dashboard/leads" className="flex items-center gap-2 px-5 py-3 bg-bg3 border border-white/10 rounded-md text-text-primary no-underline text-sm">
            <FiBarChart2 /> Ver Leads
          </Link>
          <Link href="/widget" target="_blank" className="flex items-center gap-2 px-5 py-3 bg-bg3 border border-white/10 rounded-md text-text-primary no-underline text-sm">
            <FiExternalLink /> Ver widget
          </Link>
        </div>

        {/* Panel de ayuda */}
        {showHelp && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-bg/60 p-8 rounded-xl mb-12 border border-accent">
            <h3 className="font-serif text-2xl mb-6 text-accent">¿Qué es Stratix Intelligence?</h3>
            <div className="grid gap-6 text-text-secondary">
              <div className="flex gap-4 items-start">
                <FiMessageSquare className="text-accent mt-1" />
                <div>
                  <strong className="text-text-primary">Agentes IA</strong>
                  <p className="text-sm mt-1">Son asistentes virtuales que hablan con tus clientes 24/7 en WhatsApp, Web o Instagram. Responden preguntas, califican leads y cierran citas.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <FiCpu className="text-accent mt-1" />
                <div>
                  <strong className="text-text-primary">Multi-Motor IA</strong>
                  <p className="text-sm mt-1">Stratix usa 4 motores de IA: Gemini, GPT-3.5, Groq y Mistral. Si uno falla, otro responde automáticamente.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <FiUser className="text-accent mt-1" />
                <div>
                  <strong className="text-text-primary">Leads</strong>
                  <p className="text-sm mt-1">Son los contactos que el agente captura. Cada conversación genera un lead con información del cliente.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tus Agentes */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-serif text-[clamp(1.5rem,4vw,2rem)]">Tus Agentes IA</h2>
          <Link href="/dashboard/bot/new" className="flex items-center gap-2 px-7 py-[14px] bg-accent rounded-[14px] text-[#030a05] no-underline font-bold text-[0.95rem]">
            <FiPlus /> Crear agente
          </Link>
        </div>

        {/* Lista de agentes */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6 mb-16">
          {isLoading ? (
            <div className="col-span-full text-center p-16 text-text-secondary">
              <FiZap size={32} className="mb-4 text-accent" />
              <p>Cargando agentes...</p>
            </div>
          ) : bots.length > 0 ? bots.map((bot) => {
            const aiInfo = AI_PROVIDERS[bot.model as keyof typeof AI_PROVIDERS] || AI_PROVIDERS.gemini;
            return (
              <motion.div
                key={bot.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-bg/60 backdrop-blur-xl p-8 rounded-xl border border-white/10 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-serif text-xl mb-1">{bot.name}</h3>
                    <p className="text-sm text-text-secondary">{bot.description}</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-[10px] py-1 bg-[#10b981]/10 rounded-full">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                    <span className="text-[0.7rem] text-[#10b981] font-semibold">Activo</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-6 px-3 py-2 bg-bg3 rounded-sm">
                  <div style={{ background: aiInfo.color }} className="w-2 h-2 rounded-full" />
                  <span className="text-xs text-text-secondary">{aiInfo.name}</span>
                  <span className="text-[0.65rem] px-[6px] py-[2px] rounded-xs font-semibold"
                    style={{
                      background: aiInfo.badge === 'GRATIS' ? 'rgba(16,185,129,0.2)' : 'var(--accent-glow)',
                      color: aiInfo.badge === 'GRATIS' ? '#10b981' : 'var(--accent)'
                    }}>
                    {aiInfo.badge}
                  </span>
                </div>
                
                <div className="flex gap-3">
                  <Link href={`/dashboard/bot/${bot.id}`} className="flex-1 text-center p-3 bg-accent-dim rounded-sm text-accent no-underline font-semibold text-sm">
                    Configurar
                  </Link>
                  <Link href="/widget" target="_blank" className="flex-1 text-center p-3 bg-transparent border border-white/10 rounded-sm text-text-primary no-underline font-semibold text-sm">
                    Probar
                  </Link>
                </div>
              </motion.div>
            );
          }) : (
            <div className="col-span-full text-center p-16 bg-bg/60 rounded-xl border border-dashed border-white/10">
              <FiMessageSquare size={40} className="text-text-muted mb-4" />
              <p className="text-text-secondary mb-6">No tienes agentes todavía</p>
              <Link href="/dashboard/bot/new" className="inline-flex items-center gap-2 px-7 py-[14px] bg-accent rounded-[14px] text-[#030a05] no-underline font-bold">
                <FiPlus /> Crear tu primer agente
              </Link>
            </div>
          )}
        </div>

        {/* Info de IAs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="p-8 bg-bg/60 border border-white/10 rounded-xl">
          <h3 className="font-serif text-[1.3rem] mb-6 text-accent">Motores de IA Disponibles</h3>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
            {Object.entries(AI_PROVIDERS).map(([key, info]) => (
              <div key={key} className="flex items-center gap-2 p-3 bg-bg3 rounded-sm">
                <div style={{ background: info.color }} className="w-2.5 h-2.5 rounded-full" />
                <div>
                  <div className="text-sm font-semibold">{info.name}</div>
                  <div className="text-[0.7rem] text-text-secondary">{info.badge}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-text-secondary">
            Cuando crees un agente, podrás elegir qué motor de IA usar. Todos incluyen failover automático.
          </p>
        </motion.div>
      </main>

      <Toaster theme="dark" position="top-center" />
    </div>
  );
}
