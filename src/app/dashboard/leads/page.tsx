"use client";

import { useState, useEffect, Suspense } from "react";
import { FiDownload, FiSearch, FiArrowLeft, FiActivity, FiUsers, FiTarget, FiZap } from "react-icons/fi";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { toast, Toaster } from "sonner";
import { motion } from "framer-motion";

/**
 * STRATIX INTELLIGENCE — LEADS ANALYTICS DASHBOARD (V8.1)
 * Panel de gestión de prospectos calificados con IA.
 */

function LeadsDashboardContent() {
  const [leads, setLeads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isExporting, setIsExporting] = useState(false);

  // 1. Carga de Data con Supabase
  useEffect(() => {
    async function fetchLeads() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("leads")
        .select("*, bots(name)")
        .order("created_at", { ascending: false });

      if (error) {
        toast.error("Error cargando prospectos corporativos.");
      } else {
        setLeads(data || []);
      }
      setIsLoading(false);
    }
    fetchLeads();
  }, []);

  // 2. Motor de Exportación CSV
  const handleExport = async (botId: string | null) => {
    if (!botId && leads.length === 0) return;
    setIsExporting(true);
    toast.info("Generando reporte CSV de Inteligencia...");

    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ botId: botId || leads[0]?.bot_id })
      });

      if (!res.ok) throw new Error("Fallo en la generación del CSV");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Stratix_Leads_Elite_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      toast.success("Base de datos exportada con éxito.");
    } catch (err) {
      toast.error("Error al exportar los datos.");
    } finally {
      setIsExporting(false);
    }
  };

  const filteredLeads = leads.filter(l => 
    l.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const hotLeadsCount = leads.filter(l => l.score === 'Hot').length;

  return (
    <div style={{ minHeight: '100vh', background: '#060B14', color: 'white', padding: '2rem 5%' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header Estratégico */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <Link href="/dashboard" style={{ color: '#D4AF37', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', marginBottom: '1rem', fontWeight: 700 }}>
              <FiArrowLeft /> REGRESAR AL CENTRO DE CONTROL
            </Link>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-1px' }}>Intelligence <span style={{ color: '#D4AF37' }}>Lead Board</span></h1>
          </div>
          <button 
            onClick={() => handleExport(null)}
            disabled={isExporting || leads.length === 0}
            style={{ padding: '14px 28px', background: '#D4AF37', color: '#000', border: 'none', borderRadius: '12px', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <FiDownload /> {isExporting ? "EXPORTANDO..." : "REPORTAR CSV"}
          </button>
        </div>

        {/* Stats de Élite */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {[
            { label: 'PROSPECTOS TOTALES', value: leads.length, icon: <FiUsers />, color: '#4f7df5' },
            { label: 'LEADS CALIENTES (HOT)', value: hotLeadsCount, icon: <FiZap />, color: '#D4AF37' },
            { label: 'TASA DE INTENCIÓN', value: '84%', icon: <FiActivity />, color: '#27C93F' }
          ].map((stat, i) => (
            <div key={i} style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 900, opacity: 0.3, letterSpacing: '2px' }}>{stat.label}</span>
                <span style={{ color: stat.color }}>{stat.icon}</span>
              </div>
              <div style={{ fontSize: '2.2rem', fontWeight: 900 }}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Filtros y Tabla */}
        <div style={{ background: 'rgba(11,17,32,0.8)', padding: '1.5rem', borderRadius: '28px', border: '1px solid rgba(212,175,55,0.15)', backdropFilter: 'blur(30px)' }}>
          <div style={{ position: 'relative', marginBottom: '2rem' }}>
            <FiSearch style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} />
            <input 
              placeholder="Buscar por nombre, empresa o correo..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '16px 16px 16px 48px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '15px', color: 'white', outline: 'none' }}
            />
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.75rem', fontWeight: 900, opacity: 0.4, color: '#D4AF37' }}>
                  <th style={{ padding: '1rem' }}>CONTACTO / EMPRESA</th>
                  <th style={{ padding: '1rem' }}>BOT / CANAL</th>
                  <th style={{ padding: '1rem' }}>INTENCIÓN (OPAL)</th>
                  <th style={{ padding: '1rem' }}>SCORING</th>
                  <th style={{ padding: '1rem' }}>FECHA</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan={5} style={{ textAlign: 'center', padding: '4rem', opacity: 0.5 }}>Analizando base de datos...</td></tr>
                ) : filteredLeads.length === 0 ? (
                  <tr><td colSpan={5} style={{ textAlign: 'center', padding: '4rem', opacity: 0.5 }}>No se encontraron prospectos corporativos.</td></tr>
                ) : filteredLeads.map((lead, i) => (
                  <motion.tr 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                    key={lead.id} 
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', fontSize: '0.9rem' }}
                  >
                    <td style={{ padding: '1.2rem' }}>
                      <div style={{ fontWeight: 800 }}>{lead.name}</div>
                      <div style={{ fontSize: '0.75rem', opacity: 0.4 }}>{lead.company || "Perso"} • {lead.email}</div>
                    </td>
                    <td style={{ padding: '1.2rem' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.8rem' }}>{lead.bots?.name || "Opal Core"}</div>
                      <div style={{ fontSize: '0.65rem', opacity: 0.4, textTransform: 'uppercase' }}>{lead.whatsapp ? 'WhatsApp' : 'Web Widget'}</div>
                    </td>
                    <td style={{ padding: '1.2rem' }}>
                      <span style={{ padding: '4px 10px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', fontSize: '0.7rem', fontWeight: 800 }}>{lead.intent}</span>
                    </td>
                    <td style={{ padding: '1.2rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: lead.score === 'Hot' ? '#D4AF37' : lead.score === 'Warm' ? '#4f7df5' : '#666' }} />
                        <span style={{ fontWeight: 900, color: lead.score === 'Hot' ? '#D4AF37' : 'white' }}>{lead.score}</span>
                      </div>
                    </td>
                    <td style={{ padding: '1.2rem', fontSize: '0.75rem', opacity: 0.4 }}>
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Toaster theme="dark" richColors position="top-center" />
    </div>
  );
}

export default function LeadsDashboard() {
  return (
    <Suspense fallback={<div style={{ padding: '50px', color: 'white', textAlign: 'center' }}>Sincronizando Leads...</div>}>
      <LeadsDashboardContent />
    </Suspense>
  );
}
