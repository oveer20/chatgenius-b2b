"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  FiMessageSquare,
  FiSettings,
  FiLogOut,
  FiPlus,
  FiClock,
  FiStar,
  FiArrowRight,
  FiZap,
  FiDatabase,
  FiCode,
  FiCopy,
  FiCheck,
  FiBox,
  FiTrendingUp,
  FiUsers,
  FiPhone,
  FiExternalLink,
  FiActivity,
  FiTrash2,
  FiGlobe,
  FiShield
} from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";
import styles from "./dashboard.module.css";
import { supabase } from "@/lib/supabase";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4 },
  }),
};

interface Bot {
  id: string;
  name: string;
  description: string | null;
  model: string;
  knowledge_base: string | null;
  created_at: string;
  updated_at: string;
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"agents" | "leads" | "chats" | "analytics" | "settings">("agents");
  const [bots, setBots] = useState<Bot[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [chats, setChats] = useState<any[]>([]);
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [currency, setCurrency] = useState<'USD' | 'COP'>('USD');

  // Datos de analíticas con colores corporativos
  const analyticsData = [
    { name: 'Lun', leads: 4, msgs: 120 }, { name: 'Mar', leads: 6, msgs: 145 }, { name: 'Mie', leads: 8, msgs: 180 },
    { name: 'Jue', leads: 10, msgs: 210 }, { name: 'Vie', leads: 12, msgs: 240 }, { name: 'Sab', leads: 5, msgs: 95 }, { name: 'Dom', leads: 3, msgs: 70 },
  ];

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        const { data: profile } = await supabase.from("profiles").select("plan").eq("id", user.id).single();
        if (profile) setUser((prev: any) => ({ ...prev, plan: profile.plan }));
      }
    }
    getUser();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const { data: bData } = await supabase.from("bots").select("*").order("updated_at", { ascending: false });
      if (bData) setBots(bData);

      const { data: lData } = await supabase.from("leads").select("*, bots(name)").order("created_at", { ascending: false });
      if (lData) setLeads(lData);

      const { data: cData } = await supabase.from("chats").select("*, bots(name), messages(*)").order("created_at", { ascending: false });
      if (cData) setChats(cData);

      setLoading(false);
    }
    fetchData();
  }, []);

  const handleCopySnippet = (botId: string) => {
    const snippet = `<script src="https://stratix-ai.vercel.app/widget.js" data-bot-id="${botId}"></script>`;
    navigator.clipboard.writeText(snippet);
    setCopiedId(botId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <div className={styles.dashboard} style={{ backgroundColor: '#0B1120' }}>
      {/* Sidebar con Logo SVG Dorado */}
      <aside className={styles.sidebar} style={{ borderRight: '1px solid rgba(212, 175, 55, 0.1)' }}>
        <Link href="/" className={styles.logo}>
          <img src="/stratix_shield.svg" alt="Stratix Logo" className={styles.logoImage} style={{ width: '32px' }} />
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>Strat<span style={{ color: '#D4AF37' }}>ix</span> AI</span>
        </Link>

        <nav className={styles.nav}>
          <button className={`${styles.navItem} ${activeTab === "agents" ? styles.navItemActive : ""}`} onClick={() => setActiveTab("agents")}>
            <FiMessageSquare /> Mis Agentes Elite
          </button>
          <button className={`${styles.navItem} ${activeTab === "leads" ? styles.navItemActive : ""}`} onClick={() => setActiveTab("leads")}>
            <FiUsers /> Leads Capturados
          </button>
          <button className={`${styles.navItem} ${activeTab === "analytics" ? styles.navItemActive : ""}`} onClick={() => setActiveTab("analytics")}>
            <FiTrendingUp /> Inteligencia de Negocio
          </button>
          <button className={`${styles.navItem} ${activeTab === "settings" ? styles.navItemActive : ""}`} onClick={() => setActiveTab("settings")}>
            <FiSettings /> Configuración
          </button>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.planBadge} style={{ background: 'rgba(212, 175, 55, 0.05)', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
            <FiStar style={{ color: '#D4AF37' }} />
            <span style={{ fontWeight: 800, color: '#D4AF37', textTransform: 'uppercase', fontSize: '0.7rem' }}>
              Pioneer Elite Access
            </span>
          </div>
          <button onClick={handleLogout} className={styles.logoutBtn} style={{ marginTop: '1rem' }}>
            <FiLogOut /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        <header className={styles.header} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1.5rem' }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div className={styles.securityBadge} style={{ border: '1px solid rgba(212,175,55,0.3)', color: '#D4AF37' }}>
              <FiShield /> Encryption: AES-256
            </div>
            <div className={styles.securityBadge} style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
              Status: Live
            </div>
          </div>
          <div className={styles.userProfile}>
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{user?.email || "oveer20@icloud.com"}</span>
          </div>
        </header>

        <div style={{ marginTop: '2rem' }}>
          {activeTab === "agents" && (
            <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
              <div className={styles.header}>
                <h1 style={{ fontSize: '2rem', fontWeight: 900 }}>Gestión de Activos IA</h1>
                <Link href="/dashboard/bot/new" className="btn-primary" style={{ background: '#D4AF37', color: '#000' }}>
                  <FiPlus /> Crear Agente Elite
                </Link>
              </div>

              <div className={styles.resumeGrid} style={{ marginTop: '2rem' }}>
                {bots.map((bot, i) => (
                  <div key={bot.id} className="glass-card" style={{ padding: '2rem', border: '1px solid rgba(212,175,55,0.1)' }}>
                    <h3 style={{ color: '#D4AF37', marginBottom: '1rem' }}>{bot.name}</h3>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                      <span style={{ fontSize: '0.7rem', opacity: 0.6 }}><FiClock /> {new Date(bot.updated_at).toLocaleDateString()}</span>
                      <span style={{ fontSize: '0.7rem', color: '#10b981' }}><FiCheck /> Activo</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => handleCopySnippet(bot.id)} className="btn-primary" style={{ flex: 1, fontSize: '0.8rem' }}>
                        {copiedId === bot.id ? "¡Copiado!" : "Copiar ID"}
                      </button>
                      <Link href={`/dashboard/bot/${bot.id}`} className="btn-secondary" style={{ padding: '0.5rem' }}>
                        <FiSettings />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "analytics" && (
            <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
              <h2 style={{ marginBottom: '2rem' }}>Analítica Estratégica</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', height: '400px' }}>
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                  <p style={{ opacity: 0.6, fontSize: '0.8rem', marginBottom: '1rem' }}>CONVERSIÓN DE LEADS</p>
                  <ResponsiveContainer width="100%" height="90%">
                    <BarChart data={analyticsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="name" stroke="#888" fontSize={12} />
                      <YAxis stroke="#888" fontSize={12} />
                      <Tooltip contentStyle={{ background: '#0B1120', border: '1px solid #D4AF37' }} />
                      <Bar dataKey="leads" fill="#D4AF37" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                  <p style={{ opacity: 0.6, fontSize: '0.8rem', marginBottom: '1rem' }}>FLUJO DE MENSAJES</p>
                  <ResponsiveContainer width="100%" height="90%">
                    <LineChart data={analyticsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="name" stroke="#888" fontSize={12} />
                      <YAxis stroke="#888" fontSize={12} />
                      <Tooltip contentStyle={{ background: '#0B1120', border: '1px solid #D4AF37' }} />
                      <Line type="monotone" dataKey="msgs" stroke="#D4AF37" strokeWidth={3} dot={{ fill: '#D4AF37' }} />
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