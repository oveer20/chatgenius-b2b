"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HelpCircle, BarChart3, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import DashboardStats from "@/components/dashboard/DashboardStats";
import DashboardHelpPanel from "@/components/dashboard/DashboardHelpPanel";
import DashboardRecentLeads from "@/components/dashboard/DashboardRecentLeads";
import DashboardAgentList from "@/components/dashboard/DashboardAgentList";
import DashboardAIProviders from "@/components/dashboard/DashboardAIProviders";

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
  const [user, setUser] = useState<{ id?: string; email?: string; user_metadata?: Record<string, string> } | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [leadStats, setLeadStats] = useState({ total: 0, hot: 0, warm: 0, cold: 0 });
  const [showSampleData, setShowSampleData] = useState(false);
  const [recentLeads, setRecentLeads] = useState<Array<{ id: string; name: string; score: string; source: string; created_at: string }>>([]);

  useEffect(() => {
    async function init() {
      const { data: { user: supaUser } } = await supabase.auth.getUser();
      if (!supaUser) { router.push("/login"); return; }
      setUser(supaUser);

      try {
        const res = await fetch("/api/bots");
        if (!res.ok) throw new Error("Error cargando agentes");
        setBots((await res.json()) || []);
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
          if (Array.isArray(leads)) setRecentLeads(leads);
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
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tighter mb-2">
          Hola, {displayName}
        </h1>
        <p className="text-text-secondary text-lg">
          Este es tu centro de control de agentes IA. Aquí puedes crear y gestionar tus asistentes virtuales.
        </p>
      </motion.div>

      <DashboardStats
        stats={{
          total: leadStats.total,
          hot: leadStats.hot,
          warm: leadStats.warm,
          cold: leadStats.cold,
          activeBots,
          conversionRate,
          showSampleData,
        }}
      />

      <div className="mb-12 flex flex-wrap gap-4">
        <button
          onClick={() => setShowHelp(!showHelp)}
          className="flex cursor-pointer items-center gap-2 rounded-md border border-accent bg-accent-dim px-5 py-3 text-sm font-semibold text-accent"
        >
          <HelpCircle /> {showHelp ? 'Ocultar ayuda' : '¿Cómo funciona?'}
        </button>
        <Link href="/dashboard/leads" className="flex items-center gap-2 rounded-md border border-white/10 bg-bg3 px-5 py-3 text-sm no-underline text-text-primary">
          <BarChart3 /> Ver Leads
        </Link>
        <Link href="/widget" target="_blank" className="flex items-center gap-2 rounded-md border border-white/10 bg-bg3 px-5 py-3 text-sm no-underline text-text-primary">
          <ExternalLink /> Ver widget
        </Link>
      </div>

      {showHelp && <DashboardHelpPanel />}

      <DashboardRecentLeads leads={recentLeads} />
      <DashboardAgentList bots={bots} isLoading={isLoading} />
      <DashboardAIProviders />
    </>
  );
}
