"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FiMessageSquare, FiSettings, FiLogOut, FiPlus, FiClock, FiStar,
  FiZap, FiCheck, FiTrendingUp, FiUsers, FiShield, FiUser, FiDownload, FiMail
} from "react-icons/fi";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line
} from "recharts";
import styles from "./dashboard.module.css";
import { supabase } from "@/lib/supabase";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
};

interface Bot {
  id: string; name: string; model: string; updated_at: string;
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"agents" | "leads" | "analytics" | "settings">("agents");
  const [bots, setBots] = useState<Bot[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  const analyticsData = [
    { name: 'Lun', leads: 4, msgs: 120 }, { name: 'Mar', leads: 6, msgs: 145 }, 
    { name: 'Mie', leads: 8, msgs: 180 }, { name: 'Jue', leads: 10, msgs: 210 }, 
    { name: 'Vie', leads: 12, msgs: 240 }, { name: 'Sab', leads: 5, msgs: 95 }, 
    { name: 'Dom', leads: 3, msgs: 70 },
  ];

  useEffect(() => {
    async function getUserData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const fullName = user.user_metadata?.full_name || user.email?.split('@')[0];
        setUser({ ...user, display_name: fullName, plan: "Pioneer Elite" });
      }
    }
    getUserData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      // Cargar Agentes
      const { data: bData } = await supabase.from("bots").select("*").order("updated_at", { ascending: false });
      if (bData) setBots(bData);
      
      // Cargar Leads con el nombre del bot asociado
      const { data: lData } = await supabase.from("leads").select("*, bots(name)").order("created_at", { ascending: false });
      if (lData) setLeads(lData);

      setLoading(false);
    }
    fetchData();
  }, [activeTab]); // Se recarga al cambiar de pestaña

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <div className={styles.dashboard} style={{ backgroundColor: '#0B1120', minHeight: '100vh', color: 'white' }}>
      
      {/* Sidebar Elite */}
      <aside className={styles.sidebar} style={{ borderRight: '1px solid rgba(212, 175, 55, 0.1)', background: '#060B14' }}>
        <Link href="/" className={styles.logo} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', padding: '2rem' }}>
          <img src="/stratix_shield.svg" alt="Stratix Logo" style={{ width: '32px' }} />
          <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'white' }}>Strat<span style={{ color: '#D4AF37' }}>ix</span> AI</span>
        </Link>

        <nav className={styles.nav} style={{ padding: '0 1rem' }}>
          <button className={`${styles.navItem} ${activeTab === "agents" ? styles.navItemActive : ""}`} onClick={() => setActiveTab("agents")}>
            <FiMessageSquare /> Mis Agentes Elite
          </button>
          <button className={`${styles.navItem} ${activeTab === "leads" ? styles.navItemActive : ""}`} onClick={() => setActiveTab("leads")}>
            <FiUsers /> Leads Capturados
          </button>
          <button className={`${styles.navItem} ${activeTab === "analytics" ? styles.navItemActive : ""}`} onClick={() => setActiveTab("analytics")}>
            <FiTrendingUp /> Inteligencia de Negocio
          </button>
        </nav>

        <div className={styles.sidebarFooter} style={{ padding: '2rem', marginTop: 'auto' }}>
          <div style={{ background: 'rgba(212, 175, 55, 0.05)', border: '1px solid rgba(212, 175, 55, 0.2)', padding: '10px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FiStar style={{ color: '#D4AF37' }} /> 
            <span style={{ fontWeight: 800, color: '#D4AF37', fontSize: '0.7rem', textTransform: 'uppercase' }}>Pioneer Access</span>
          </div>
          <button onClick={handleLogout} className={styles.logoutBtn} style={{ marginTop: '1.5rem', background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
             <FiLogOut /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.main} style={{ padding: '2rem', overflowY: 'auto' }}>
        <header className={styles.header} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1.5rem' }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ border: '1px solid rgba(212,175,55,0.3)', padding: '4px 12px', borderRadius: '20px', color: '#D4AF37', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <FiShield /> AES-256 SECURE
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.7rem', color: '#D4AF37', fontWeight: 800, display: 'block', letterSpacing: '0.05em' }}>BIENVENIDO, ELITE</span>
              <span style={{ fontSize: '1rem', fontWeight: 600 }}>{user?.display_name || "Cargando..."}</span>
            </div>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(212,175,55,0.1)', border: '1px solid #D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <FiUser color="#D4AF37" />
            </div>
          </div>
        </header>

        <div style={{ marginTop: '3rem' }}>
          
          {/* PESTAÑA: AGENTES */}
          {activeTab === "agents" && (
            <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 900 }}>Mis Activos IA</h1>
                <Link href="/dashboard/bot/new" className="btn-primary" style={{ background: '#D4AF37', color: '#000', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FiPlus /> Crear Agente
                </Link>
              </div>

              <div className={styles.resumeGrid} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {bots.length > 0 ? bots.map((bot) => (
                  <div key={bot.id} style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '20px', border: '1px solid rgba(212,175,55,0.1)' }}>
                    <h3 style={{ color: '#D4AF37', marginBottom: '0.5rem' }}>{bot.name}</h3>
                    <p style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: '1.5rem' }}>{bot.model} — Activo</p>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <Link href={`/dashboard/bot/${bot.id}`} style={{ flex: 1, textAlign: 'center', padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', textDecoration: 'none', color: 'white', fontSize: '0.8rem' }}>
                        Configurar
                      </Link>
                    </div>
                  </div>
                )) : (
                  <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', opacity: 0.5 }}>
                    <p>No hay agentes configurados aún.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* PESTAÑA: LEADS CAPTURADOS */}
          {activeTab === "leads" && (
            <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 900 }}>Inteligencia de Leads</h1>
                <button className="btn-primary" style={{ background: 'rgba(212,175,55,0.1)', color: '#D4AF37', border: '1px solid #D4AF37', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <FiDownload /> Exportar CSV
                </button>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
                  <thead>
                    <tr style={{ background: 'rgba(0,0,0,0.2)', color: '#D4AF37', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      <th style={{ padding: '1.5rem 1.5rem' }}>Contacto</th>
                      <th style={{ padding: '1.5rem 1rem' }}>Origen (Bot)</th>
                      <th style={{ padding: '1.5rem 1rem' }}>Intención</th>
                      <th style={{ padding: '1.5rem 1rem' }}>Score (Opal)</th>
                      <th style={{ padding: '1.5rem 1.5rem', textAlign: 'right' }}>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.length > 0 ? leads.map((lead) => (
                      <tr key={lead.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem', transition: 'background 0.3s' }} className={styles.tableRow}>
                        <td style={{ padding: '1.2rem 1.5rem' }}>
                          <div style={{ fontWeight: 600, color: 'white', marginBottom: '4px' }}>{lead.name || 'Usuario Anónimo'}</div>
                          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <FiMail /> {lead.email || 'Sin correo'}
                          </div>
                        </td>
                        <td style={{ padding: '1.2rem 1rem', color: 'rgba(255,255,255,0.7)' }}>
                          {lead.bots?.name || 'Widget Web'}
                        </td>
                        <td style={{ padding: '1.2rem 1rem' }}>
                          <span style={{ background: 'rgba(255,255,255,0.05)', padding: '6px 10px', borderRadius: '6px', fontSize: '0.75rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                            {lead.intent || 'Exploración'}
                          </span>
                        </td>
                        <td style={{ padding: '1.2rem 1rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800,
                            color: lead.score === 'Hot' ? '#ef4444' : lead.score === 'Warm' ? '#f59e0b' : '#3b82f6'
                          }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: lead.score === 'Hot' ? '#ef4444' : lead.score === 'Warm' ? '#f59e0b' : '#3b82f6', boxShadow: `0 0 10px ${lead.score === 'Hot' ? '#ef4444' : lead.score === 'Warm' ? '#f59e0b' : '#3b82f6'}` }} />
                            {lead.score || 'Cold'}
                          </div>
                        </td>
                        <td style={{ padding: '1.2rem 1.5rem', textAlign: 'right' }}>
                          {lead.whatsapp ? (
                            <a href={`https://wa.me/${lead.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" style={{ color: '#10b981', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '0.8rem', background: 'rgba(16,185,129,0.1)', padding: '8px 14px', borderRadius: '8px', border: '1px solid rgba(16,185,129,0.2)' }}>
                              <FiMessageSquare /> WhatsApp
                            </a>
                          ) : (
                            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', padding: '8px 14px' }}>Sin número</span>
                          )}
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={5} style={{ padding: '4rem', textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
                          <FiUsers size={40} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                          <p>No hay leads capturados aún. Instala el widget en tu web para empezar a recibir prospectos.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* PESTAÑA: ANALÍTICA */}
          {activeTab === "analytics" && (
            <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
              <h2 style={{ marginBottom: '2rem' }}>Analítica de Rendimiento</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', height: '350px' }}>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <p style={{ fontSize: '0.7rem', opacity: 0.5, marginBottom: '1.5rem', fontWeight: 800 }}>CAPTURA DE LEADS (7D)</p>
                  <ResponsiveContainer width="100%" height="80%">
                    <BarChart data={analyticsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="name" stroke="#555" fontSize={10} />
                      <YAxis stroke="#555" fontSize={10} />
                      <Tooltip contentStyle={{ background: '#0B1120', border: '1px solid #D4AF37', borderRadius: '8px' }} />
                      <Bar dataKey="leads" fill="#D4AF37" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <p style={{ fontSize: '0.7rem', opacity: 0.5, marginBottom: '1.5rem', fontWeight: 800 }}>VOLUMEN DE MENSAJES</p>
                  <ResponsiveContainer width="100%" height="80%">
                    <LineChart data={analyticsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="name" stroke="#555" fontSize={10} />
                      <YAxis stroke="#555" fontSize={10} />
                      <Tooltip contentStyle={{ background: '#0B1120', border: '1px solid #D4AF37', borderRadius: '8px' }} />
                      <Line type="monotone" dataKey="msgs" stroke="#D4AF37" strokeWidth={3} dot={{ fill: '#D4AF37', r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}