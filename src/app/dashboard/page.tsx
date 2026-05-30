"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiPlus, FiMessageSquare, FiUser, FiBarChart2, FiExternalLink, FiHelpCircle, FiCpu, FiZap, FiClock, FiArrowRight } from "react-icons/fi";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import OnboardingStepper from "@/components/dashboard/OnboardingStepper";

interface Bot {
  id: string;
  name: string;
  description: string;
  model: string;
  status: string;
  created_at: string;
}

const AI_PROVIDERS: Record<string, { name: string; color: string; badge: string }> = {
  gemini: { name: "Gemini 2.0 Flash", color: "#4285F4", badge: "Principal" },
  gpt: { name: "GPT-3.5 Turbo", color: "#10A37F", badge: "Backup" },
  groq: { name: "Llama 3.1 - Groq", color: "#FF6B35", badge: "GRATIS" },
  mistral: { name: "Mistral Small", color: "#9F7AEA", badge: "GRATIS" }
};

export default function DashboardPage() {
  const router = useRouter();
  const [bots, setBots] = useState<Bot[]>([]);
  const [user, setUser] = useState<{ id?: string; email?: string; user_metadata?: Record<string, string> } | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [leadStats, setLeadStats] = useState({ total: 0, hot: 0, warm: 0, cold: 0 });
  const [showSampleData, setShowSampleData] = useState(false);
  const [recentLeads, setRecentLeads] = useState<Array<{ id: string; name: string; score: string; source: string; created_at: string }>>([]);

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
      } catch {
        toast.error("No se pudieron cargar los agentes.");
      } finally {
        setIsLoading(false);
      }

      try {
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

      try {
        const res = await fetch("/api/leads?limit=5");
        if (res.ok) {
          const leads = await res.json();
          if (Array.isArray(leads)) setRecentLeads(leads.map((l: any) => ({ id: l.id, name: l.name || '—', score: l.score || 'Cold', source: l.source || 'web', created_at: l.created_at })));
        }
      } catch {}
    }
    init();
  }, [router]);

  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "bienvenido";
  const activeBots = bots.length;
  const conversionRate = leadStats.total > 0 ? Math.round((leadStats.hot / leadStats.total) * 100) : 0;

  return (
    <>
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tighter mb-2">
          Hola, {displayName}
        </h1>
        <p className="text-text-secondary text-lg">
          Este es tu centro de control de agentes IA. Aquí puedes crear y gestionar tus asistentes virtuales.
        </p>
      </motion.div>

      {/* Stats grid */}
      <div className="mb-12 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-6">
        {[
          { icon: FiCpu, label: "Agentes", value: activeBots, color: "text-accent", delay: 0.1 },
          { icon: FiUser, label: "Total Leads", value: leadStats.total, color: "text-[#10b981]", delay: 0.15 },
          { icon: FiZap, label: "HOT Leads", value: leadStats.hot, color: "text-[#D4AF37]", delay: 0.2 },
          { icon: FiBarChart2, label: "Conversión", value: `${conversionRate}%`, color: "text-[#10b981]", delay: 0.25 },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: stat.delay }}
            className="rounded-xl border border-white/10 bg-bg/60 p-6"
          >
            <div className="mb-2 flex items-center gap-2">
              <stat.icon className={stat.color} />
              <span className="text-xs uppercase tracking-widest text-text-secondary">{stat.label}</span>
            </div>
            <div className={`font-serif text-3xl ${stat.color}`}>{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Score distribution */}
      {leadStats.total > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8 rounded-xl border border-white/10 bg-bg/60 p-6"
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-text-secondary">Distribución de Leads</span>
            {showSampleData && (
              <span className="rounded-xs bg-accent-dim px-2 py-[2px] text-[0.7rem] text-accent">Datos de ejemplo</span>
            )}
          </div>
          <div className="flex h-2 overflow-hidden rounded-xs">
            <div style={{ flex: leadStats.hot }} className="rounded-l-xs bg-[#D4AF37]" />
            <div style={{ flex: leadStats.warm }} className="bg-[#FCD34D]" />
            <div style={{ flex: leadStats.cold }} className="rounded-r-xs bg-[#4a5568]" />
          </div>
          <div className="mt-3 flex justify-between text-xs">
            <span className="text-[#D4AF37]">● HOT {leadStats.hot}</span>
            <span className="text-[#FCD34D]">● WARM {leadStats.warm}</span>
            <span className="text-[#4a5568]">● COLD {leadStats.cold}</span>
          </div>
        </motion.div>
      )}

      {/* Actions */}
      <div className="mb-12 flex flex-wrap gap-4">
        <button
          onClick={() => setShowHelp(!showHelp)}
          className="flex cursor-pointer items-center gap-2 rounded-md border border-accent bg-accent-dim px-5 py-3 text-sm font-semibold text-accent"
        >
          <FiHelpCircle /> {showHelp ? 'Ocultar ayuda' : '¿Cómo funciona?'}
        </button>
        <Link href="/dashboard/leads" className="flex items-center gap-2 rounded-md border border-white/10 bg-bg3 px-5 py-3 text-sm no-underline text-text-primary">
          <FiBarChart2 /> Ver Leads
        </Link>
        <Link href="/widget" target="_blank" className="flex items-center gap-2 rounded-md border border-white/10 bg-bg3 px-5 py-3 text-sm no-underline text-text-primary">
          <FiExternalLink /> Ver widget
        </Link>
      </div>

      {/* Help panel */}
      {showHelp && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-12 rounded-xl border border-accent bg-bg/60 p-8"
        >
          <h3 className="mb-6 font-serif text-2xl text-accent">¿Qué es Stratix Intelligence?</h3>
          <div className="grid gap-6 text-text-secondary">
            {[
              { icon: FiMessageSquare, title: "Agentes IA", desc: "Son asistentes virtuales que hablan con tus clientes 24/7 en WhatsApp, Web o Instagram. Responden preguntas, califican leads y cierran citas." },
              { icon: FiCpu, title: "Multi-Motor IA", desc: "Stratix usa 4 motores de IA: Gemini, GPT-3.5, Groq y Mistral. Si uno falla, otro responde automáticamente." },
              { icon: FiUser, title: "Leads", desc: "Son los contactos que el agente captura. Cada conversación genera un lead con información del cliente." },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <item.icon className="mt-1 text-accent" />
                <div>
                  <strong className="text-text-primary">{item.title}</strong>
                  <p className="mt-1 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Recent leads */}
      {recentLeads.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 rounded-xl border border-white/10 bg-bg/60 p-6"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiClock className="text-text-muted" />
              <span className="text-xs font-semibold uppercase tracking-widest text-text-secondary">Leads Recientes</span>
            </div>
            <Link href="/dashboard/leads" className="flex items-center gap-1 text-xs font-bold text-accent no-underline">
              Ver todos <FiArrowRight />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 text-xs text-text-muted">
                  <th className="py-2 pr-4 text-left font-semibold">Nombre</th>
                  <th className="py-2 pr-4 text-left font-semibold">Score</th>
                  <th className="py-2 pr-4 text-left font-semibold">Fuente</th>
                  <th className="py-2 text-left font-semibold">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map(lead => (
                  <tr key={lead.id} className="border-b border-white/[0.02]">
                    <td className="py-2 pr-4">{lead.name}</td>
                    <td className={`py-2 pr-4 font-semibold ${lead.score === 'Hot' ? 'text-accent' : lead.score === 'Warm' ? 'text-blue-500' : 'text-text-muted'}`}>{lead.score}</td>
                    <td className="py-2 pr-4 text-xs uppercase">{lead.source}</td>
                    <td className="py-2 text-xs text-text-muted">{new Date(lead.created_at).toLocaleDateString('es-CO')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Agents */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="font-serif text-2xl font-bold tracking-tighter">Tus Agentes IA</h2>
        <Link
          href="/dashboard/bot/new"
          className="flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-bold text-[#030a05] no-underline transition-all duration-200 hover:scale-105"
        >
          <FiPlus /> Crear agente
        </Link>
      </div>

      <div className="mb-16 grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6">
        {isLoading ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6 col-span-full">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-bg/60 p-8 backdrop-blur-xl animate-pulse">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex-1">
                    <div className="h-5 bg-white/10 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-white/10 rounded w-1/2" />
                  </div>
                  <div className="h-5 w-16 bg-white/10 rounded-full" />
                </div>
                <div className="mb-6 h-8 bg-white/10 rounded w-2/3" />
                <div className="flex gap-3">
                  <div className="flex-1 h-10 bg-white/10 rounded-lg" />
                  <div className="flex-1 h-10 bg-white/10 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : bots.length > 0 ? (
          bots.map((bot) => {
            const aiInfo = AI_PROVIDERS[bot.model] || AI_PROVIDERS.gemini;
            return (
              <motion.div
                key={bot.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-white/10 bg-bg/60 p-8 backdrop-blur-xl transition-all duration-300"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="mb-1 font-serif text-xl">{bot.name}</h3>
                    <p className="text-sm text-text-secondary">{bot.description}</p>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span className="text-xs font-semibold text-emerald-500">Activo</span>
                  </div>
                </div>

                <div className="mb-6 flex items-center gap-2 rounded-lg bg-bg3 px-3 py-2">
                  <div style={{ background: aiInfo.color }} className="h-2 w-2 rounded-full" />
                  <span className="text-xs text-text-secondary">{aiInfo.name}</span>
                  <span
                    className="rounded px-1.5 py-0.5 text-[0.65rem] font-semibold"
                    style={{
                      background: aiInfo.badge === 'GRATIS' ? 'rgba(16,185,129,0.2)' : 'rgba(212,175,55,0.15)',
                      color: aiInfo.badge === 'GRATIS' ? '#10b981' : '#D4AF37',
                    }}
                  >
                    {aiInfo.badge}
                  </span>
                </div>

                <div className="flex gap-3">
                  <Link
                    href={`/dashboard/bot/${bot.id}`}
                    className="flex-1 rounded-lg bg-accent-dim p-3 text-center text-sm font-semibold text-accent no-underline transition-all duration-200 hover:scale-105"
                  >
                    Configurar
                  </Link>
                  <Link
                    href="/widget"
                    target="_blank"
                    className="flex-1 rounded-lg border border-white/10 bg-transparent p-3 text-center text-sm font-semibold text-text-primary no-underline transition-all duration-200 hover:scale-105"
                  >
                    Probar
                  </Link>
                </div>
              </motion.div>
            );
          })
        ) : (
          <OnboardingStepper />
        )}
      </div>

      {/* AI Providers info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl border border-white/10 bg-bg/60 p-8"
      >
        <h3 className="mb-6 font-serif text-[1.3rem] text-accent">Motores de IA Disponibles</h3>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
          {Object.entries(AI_PROVIDERS).map(([key, info]) => (
            <div key={key} className="flex items-center gap-2 rounded-sm bg-bg3 p-3">
              <div style={{ background: info.color }} className="h-2.5 w-2.5 rounded-full" />
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
    </>
  );
}
