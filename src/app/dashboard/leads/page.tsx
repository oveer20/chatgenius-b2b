"use client";

import { useState, useEffect, Suspense } from "react";
import { FiDownload, FiSearch, FiArrowLeft, FiActivity, FiUsers, FiZap, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { toast, Toaster } from "sonner";
import { motion } from "framer-motion";

function LeadsDashboardContent() {
  const [leads, setLeads] = useState<Array<{id: string; name: string; email: string; phone: string; company: string; bot_id: string; score: string; intent: string; source: string; created_at: string; bots?: {name: string}}>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 25;

  useEffect(() => {
    async function fetchLeads() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data, error } = await supabase
        .from("leads")
        .select("*, bots(name)")
        .order("created_at", { ascending: false });
      if (error) toast.error("Error cargando prospectos corporativos.");
      else setLeads(data || []);
      setIsLoading(false);
    }
    fetchLeads();
  }, []);

  const handleExport = async (botId: string | null) => {
    if (!botId && leads.length === 0) return;
    setIsExporting(true);
    toast.info("Generando reporte CSV de Inteligencia...");
    try {
      const res = await fetch("/api/download", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ botId: botId || leads[0]?.bot_id })
      });
      if (!res.ok) throw new Error("Fallo en la generación del CSV");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Stratix_Leads_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      toast.success("Base de datos exportada con éxito.");
    } catch { toast.error("Error al exportar los datos."); }
    finally { setIsExporting(false); }
  };

  const filteredLeads = leads.filter(l =>
    l.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filteredLeads.length / PAGE_SIZE));
  const paginatedLeads = filteredLeads.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const hotLeadsCount = leads.filter(l => l.score === 'Hot').length;
  const intentionRate = leads.length > 0 ? Math.round((hotLeadsCount / leads.length) * 100) : 0;

  const getSourceColor = (source: string) => {
    const colors: Record<string, string> = { whatsapp: '#25D366', web: '#4285F4', instagram: '#E4405F', facebook: '#1877F2', phone: '#D4AF37' };
    return colors[source] || '#666';
  };

  return (
    <div className="min-h-screen bg-bg text-text-primary p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-12 flex-wrap gap-4">
          <div>
            <Link href="/dashboard" className="text-accent no-underline flex items-center gap-2 text-xs font-bold mb-4">
              <FiArrowLeft /> REGRESAR AL DASHBOARD
            </Link>
            <h1 className="text-4xl font-black tracking-tight">
              Intelligence <span className="text-accent">Lead Board</span>
            </h1>
          </div>
          <button onClick={() => handleExport(null)} disabled={isExporting || leads.length === 0}
            className="px-7 py-3.5 bg-accent text-black border-none rounded-md font-black cursor-pointer flex items-center gap-2.5 transition-all duration-200 disabled:opacity-50">
            <FiDownload /> {isExporting ? "EXPORTANDO..." : "EXPORTAR CSV"}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'PROSPECTOS TOTALES', value: leads.length, icon: <FiUsers />, colorClass: 'text-blue-500' },
            { label: 'LEADS HOT', value: hotLeadsCount, icon: <FiZap />, colorClass: 'text-accent' },
            { label: 'TASA DE CONVERSIÓN', value: `${intentionRate}%`, icon: <FiActivity />, colorClass: 'text-green-500' }
          ].map((stat, i) => (
            <div key={i} className="p-8 bg-white/[0.02] rounded-2xl border border-white/5">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-black opacity-30 tracking-widest">{stat.label}</span>
                <span className={stat.colorClass}>{stat.icon}</span>
              </div>
              <div className="text-4xl font-black">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="bg-bg2/80 p-6 rounded-3xl border border-accent/15 backdrop-blur-xl">
          <div className="relative mb-8">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" />
            <input placeholder="Buscar por nombre, empresa o correo..."
              value={searchTerm} onChange={e => { setSearchTerm(e.target.value); setPage(1); }}
              className="w-full py-4 px-4 pl-12 bg-white/[0.03] border border-white/10 rounded-lg text-text-primary outline-none focus:border-accent/30 transition-all duration-200" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-white/5 text-xs font-black opacity-40 text-accent">
                  <th className="p-4">CONTACTO</th>
                  <th className="p-4">BOT</th>
                  <th className="p-4">INTENCIÓN</th>
                  <th className="p-4">SCORE</th>
                  <th className="p-4">FECHA</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan={5} className="text-center p-16 opacity-50">Analizando base de datos...</td></tr>
                ) : paginatedLeads.length === 0 ? (
                  <tr><td colSpan={5} className="text-center p-16 opacity-50">No se encontraron prospectos. Ve al dashboard para cargar leads de ejemplo.</td></tr>
                ) : paginatedLeads.map((lead, i) => {
                  const sourceColor = getSourceColor(lead.source);
                  return (
                  <motion.tr key={lead.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                    className="border-b border-white/[0.03] text-sm cursor-pointer hover:bg-white/[0.02] transition-all duration-200">
                    <td className="p-5">
                      <div className="font-extrabold mb-1">{lead.name}</div>
                      <div className="text-xs opacity-45 flex gap-2 items-center">
                        <span>{lead.company || '—'}</span>
                        <span>·</span>
                        <span>{lead.email}</span>
                      </div>
                      <div className="mt-1.5 flex gap-1.5 items-center">
                        <span style={{ fontSize: '0.65rem', padding: '2px 8px', borderRadius: '4px', background: `${sourceColor}22`, color: sourceColor, fontWeight: 800, border: `1px solid ${sourceColor}44` }}>
                          {lead.source?.toUpperCase() || 'WEB'}
                        </span>
                        {lead.phone && <span className="text-xs opacity-4">{lead.phone}</span>}
                      </div>
                    </td>
                    <td className="p-5 text-sm font-bold opacity-60">{lead.bots?.name || 'Stratix Core'}</td>
                    <td className="p-5">
                      <span className="px-2.5 py-1 rounded-sm bg-white/[0.04] text-xs font-extrabold leading-tight block max-w-52 truncate"
                        title={lead.intent || ''}>
                        {lead.intent || '—'}
                      </span>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${lead.score === 'Hot' ? 'bg-accent' : lead.score === 'Warm' ? 'bg-blue-500' : 'bg-neutral-600'}`} />
                        <span className={`font-black ${lead.score === 'Hot' ? 'text-accent' : 'text-text-primary'}`}>{lead.score || '—'}</span>
                      </div>
                    </td>
                    <td className="p-5 text-xs opacity-4">
                      <div>{new Date(lead.created_at).toLocaleDateString('es-CO')}</div>
                      <div className="opacity-60 text-xs">{new Date(lead.created_at).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}</div>
                    </td>
                  </motion.tr>
                )})}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/5">
              <span className="text-sm opacity-4">
                Mostrando {((page - 1) * PAGE_SIZE) + 1}–{Math.min(page * PAGE_SIZE, filteredLeads.length)} de {filteredLeads.length}
              </span>
              <div className="flex gap-2 items-center">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                  className="w-9 h-9 rounded-sm bg-white/5 border border-white/[0.08] text-text-primary cursor-pointer flex items-center justify-center transition-all duration-200 disabled:opacity-30 hover:bg-white/10">
                  <FiChevronLeft size={16} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button key={p} onClick={() => setPage(p)}
                    className={`min-w-9 h-9 rounded-sm border font-black text-sm transition-all duration-200 ${page === p ? 'bg-accent border-accent text-black' : 'bg-white/5 border-white/[0.08] text-text-primary hover:bg-white/10'}`}>
                    {p}
                  </button>
                ))}
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="w-9 h-9 rounded-sm bg-white/5 border border-white/[0.08] text-text-primary cursor-pointer flex items-center justify-center transition-all duration-200 disabled:opacity-30 hover:bg-white/10">
                  <FiChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Toaster theme="dark" richColors position="top-center" />
    </div>
  );
}

export default function LeadsDashboard() {
  return (
    <Suspense fallback={<div className="p-12 text-text-primary text-center">Sincronizando Leads...</div>}>
      <LeadsDashboardContent />
    </Suspense>
  );
}
