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
  FiUsers
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

const analyticsData = [
  { name: 'Lun', leads: 4, msgs: 12 },
  { name: 'Mar', leads: 7, msgs: 25 },
  { name: 'Mie', leads: 5, msgs: 18 },
  { name: 'Jue', leads: 9, msgs: 30 },
  { name: 'Vie', leads: 12, msgs: 42 },
  { name: 'Sab', leads: 8, msgs: 28 },
  { name: 'Dom', leads: 15, msgs: 55 },
];

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
  const [activeTab, setActiveTab] = useState<"agents" | "leads" | "analytics" | "settings">("agents");
  const [bots, setBots] = useState<Bot[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Fetch bots from Supabase
  useEffect(() => {
    async function fetchBots() {
      const { data, error } = await supabase
        .from("bots")
        .select("*")
        .order("updated_at", { ascending: false });

      if (data) setBots(data);
      if (error) console.error("Error loading bots:", error);
      setLoading(false);
    }

    async function fetchLeads() {
      const { data, error } = await supabase
        .from("leads")
        .select("*, bots(name)")
        .order("created_at", { ascending: false });
      if (data) setLeads(data);
      if (error) console.error("Error loading leads:", error);
    }

    fetchBots();
    fetchLeads();
  }, []);

  const handleCopySnippet = (botId: string) => {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://chatgenius-b2b.vercel.app";
    const snippet = `<script src="${appUrl}/widget.js" data-bot-id="${botId}"></script>`;
    navigator.clipboard.writeText(snippet);
    setCopiedId(botId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleUpgrade = async (plan: string) => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, email: "demo@empresa.com" })
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert(data.error || "Error al iniciar el pago");
    } catch (err) {
      alert("Error de conexión");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <div className={styles.dashboard}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>✦</span>
          Chat<span className="gradient-text">Genius</span>
        </Link>

        <nav className={styles.nav}>
          <button
            className={`${styles.navItem} ${activeTab === "agents" ? styles.navItemActive : ""}`}
            onClick={() => setActiveTab("agents")}
          >
            <FiMessageSquare /> Mis Agentes de IA
          </button>
          <button
            className={`${styles.navItem} ${activeTab === "leads" ? styles.navItemActive : ""}`}
            onClick={() => setActiveTab("leads")}
          >
            <FiUsers /> Leads Capturados
          </button>
          <button
            className={`${styles.navItem} ${activeTab === "analytics" ? styles.navItemActive : ""}`}
            onClick={() => setActiveTab("analytics")}
          >
            <FiTrendingUp /> Analíticas
          </button>
          <button
            className={`${styles.navItem} ${activeTab === "settings" ? styles.navItemActive : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            <FiSettings /> Configuración
          </button>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.planBadge}>
            <FiStar /> Plan Starter
          </div>
          <button onClick={() => handleUpgrade('pro')} className="btn-primary" style={{ width: "100%", fontSize: "0.85rem", padding: "0.65rem" }}>
            <FiZap /> Upgrade a Growth
          </button>
          <button onClick={handleLogout} className={styles.logoutBtn}>
             <FiLogOut /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className={styles.main}>
        {activeTab === "agents" && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            <motion.div className={styles.header} variants={fadeInUp} custom={0}>
              <div>
                <h1>Gestión de Agentes</h1>
                <p>Configura, entrena y monitorea tus asistentes inteligentes impulsados por Google Gemini.</p>
              </div>
              <Link href="/dashboard/bot/new" className="btn-primary">
                <FiPlus /> Crear Nuevo Agente
              </Link>
            </motion.div>

            {loading ? (
              <div style={{ textAlign: "center", padding: "4rem", color: "var(--text-secondary)" }}>
                <FiZap size={32} style={{ animation: "pulse 1.5s infinite" }} />
                <p style={{ marginTop: "1rem" }}>Cargando tus agentes...</p>
              </div>
            ) : bots.length === 0 ? (
              <motion.div 
                variants={fadeInUp} 
                custom={1}
                style={{
                  textAlign: "center",
                  padding: "4rem 2rem",
                  background: "var(--bg-primary)",
                  borderRadius: "var(--radius-xl)",
                  border: "2px dashed var(--border)",
                  marginTop: "2rem"
                }}
              >
                <div style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem",
                  boxShadow: "0 8px 32px rgba(59, 130, 246, 0.3)"
                }}>
                  <FiBox size={36} color="white" />
                </div>
                <h2 style={{ fontSize: "1.5rem", fontWeight: "800", color: "var(--text-primary)", marginBottom: "0.75rem" }}>
                  ¡Crea tu primer agente de IA!
                </h2>
                <p style={{ color: "var(--text-secondary)", maxWidth: "400px", margin: "0 auto 2rem", lineHeight: "1.6" }}>
                  En menos de 2 minutos tendrás un chatbot inteligente respondiendo por ti 24/7. Solo necesitas darle un nombre y entrenarlo.
                </p>
                <Link href="/dashboard/bot/new" className="btn-primary" style={{ fontSize: "1rem", padding: "0.85rem 2rem" }}>
                  <FiPlus /> Crear Mi Primer Agente <FiArrowRight />
                </Link>
              </motion.div>
            ) : (
              <div className={styles.resumeGrid}>
                {bots.map((bot, i) => (
                  <motion.div
                    key={bot.id}
                    className={`glass-card ${styles.resumeCard}`}
                    variants={fadeInUp}
                    custom={i + 1}
                  >
                    <div className={styles.resumePreview}>
                      <FiMessageSquare size={32} />
                    </div>
                    <div className={styles.resumeInfo}>
                      <h3>{bot.name}</h3>
                      <div className={styles.resumeMeta}>
                        <span><FiClock /> {new Date(bot.updated_at).toLocaleDateString("es-ES")}</span>
                        <span><FiDatabase /> {bot.knowledge_base ? "Entrenado" : "Sin entrenar"}</span>
                      </div>
                      <span 
                        className={styles.templateBadge} 
                        style={{
                          backgroundColor: bot.knowledge_base ? "rgba(16, 185, 129, 0.1)" : "rgba(245, 158, 11, 0.1)", 
                          color: bot.knowledge_base ? "var(--success)" : "var(--warning)"
                        }}
                      >
                        {bot.knowledge_base ? "✅ Activo" : "⚠️ Pendiente"}
                      </span>
                    </div>
                    <div className={styles.resumeActions}>
                      <Link href={`/dashboard/bot/${bot.id}`} className="btn-secondary" style={{ fontSize: "0.8rem", padding: "0.5rem 1rem" }}>
                        <FiSettings /> Entrenar
                      </Link>
                      <button 
                        onClick={() => handleCopySnippet(bot.id)} 
                        className="btn-primary" 
                        style={{ fontSize: "0.8rem", padding: "0.5rem 1rem" }}
                      >
                        {copiedId === bot.id ? <><FiCheck /> ¡Copiado!</> : <><FiCode /> Instalar</>}
                      </button>
                    </div>
                  </motion.div>
                ))}
                <motion.div variants={fadeInUp} custom={bots.length + 1}>
                  <Link href="/dashboard/bot/new" className={styles.addCard}>
                    <FiPlus size={32} />
                    <span>Configurar nuevo asistente</span>
                  </Link>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === "leads" && (
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} custom={0}>
            <header className={styles.header}>
              <div>
                <h1 className={styles.title}>Leads Capturados</h1>
                <p className={styles.subtitle}>Personas que han dejado sus datos en tus bots.</p>
              </div>
            </header>

            <div className="glass-card" style={{ padding: "0", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", color: "var(--text-primary)" }}>
                <thead style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <tr>
                    <th style={{ textAlign: "left", padding: "1.25rem", fontSize: "0.85rem", opacity: 0.7 }}>Nombre</th>
                    <th style={{ textAlign: "left", padding: "1.25rem", fontSize: "0.85rem", opacity: 0.7 }}>Email</th>
                    <th style={{ textAlign: "left", padding: "1.25rem", fontSize: "0.85rem", opacity: 0.7 }}>WhatsApp</th>
                    <th style={{ textAlign: "left", padding: "1.25rem", fontSize: "0.85rem", opacity: 0.7 }}>Agente</th>
                    <th style={{ textAlign: "left", padding: "1.25rem", fontSize: "0.85rem", opacity: 0.7 }}>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.length > 0 ? leads.map((lead) => (
                    <tr key={lead.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                      <td style={{ padding: "1.25rem", fontSize: "0.9rem", fontWeight: "600" }}>{lead.name}</td>
                      <td style={{ padding: "1.25rem", fontSize: "0.9rem", color: "var(--text-secondary)" }}>{lead.email}</td>
                      <td style={{ padding: "1.25rem", fontSize: "0.9rem", color: "var(--text-secondary)" }}>{lead.whatsapp || "No provisto"}</td>
                      <td style={{ padding: "1.25rem", fontSize: "0.85rem" }}>
                        <span style={{ padding: "0.25rem 0.6rem", background: "rgba(79,125,245,0.1)", color: "var(--accent-blue)", borderRadius: "20px" }}>
                          {lead.bots?.name || "Bot"}
                        </span>
                      </td>
                      <td style={{ padding: "1.25rem", fontSize: "0.85rem", color: "var(--text-tertiary)" }}>
                        {new Date(lead.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={5} style={{ padding: "4rem", textAlign: "center", color: "var(--text-tertiary)" }}>
                        <FiUsers style={{ fontSize: "2rem", marginBottom: "1rem" }} />
                        <p>No se han capturado leads todavía.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
        {activeTab === "analytics" && (
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} custom={0}>
            <header className={styles.header}>
              <div>
                <h1 className={styles.title}>Analíticas de Rendimiento</h1>
                <p className={styles.subtitle}>Monitorea el crecimiento y efectividad de tus agentes.</p>
              </div>
            </header>

            {/* KPI Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
              <div className="glass-card" style={{ padding: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                  <span style={{ color: "var(--text-tertiary)", fontSize: "0.85rem", fontWeight: "600" }}>LEADS TOTALES</span>
                  <FiUsers style={{ color: "var(--accent-blue)" }} />
                </div>
                <div style={{ fontSize: "2rem", fontWeight: "800" }}>{leads.length * 12}</div>
                <div style={{ fontSize: "0.8rem", color: "var(--success)", marginTop: "0.5rem" }}>↑ 12% vs mes anterior</div>
              </div>

              <div className="glass-card" style={{ padding: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                  <span style={{ color: "var(--text-tertiary)", fontSize: "0.85rem", fontWeight: "600" }}>MENSAJES RESPONDIDOS</span>
                  <FiMessageSquare style={{ color: "#8b5cf6" }} />
                </div>
                <div style={{ fontSize: "2rem", fontWeight: "800" }}>2,482</div>
                <div style={{ fontSize: "0.8rem", color: "var(--success)", marginTop: "0.5rem" }}>↑ 8% vs mes anterior</div>
              </div>

              <div className="glass-card" style={{ padding: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                  <span style={{ color: "var(--text-tertiary)", fontSize: "0.85rem", fontWeight: "600" }}>TASA DE CONVERSIÓN</span>
                  <FiZap style={{ color: "#f59e0b" }} />
                </div>
                <div style={{ fontSize: "2rem", fontWeight: "800" }}>18.4%</div>
                <div style={{ fontSize: "0.8rem", color: "var(--success)", marginTop: "0.5rem" }}>↑ 2.1% vs mes anterior</div>
              </div>
            </div>

            {/* Charts Section */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "1.5rem" }}>
              <div className="glass-card" style={{ padding: "1.5rem", height: "400px" }}>
                <h3 style={{ marginBottom: "1.5rem", fontSize: "1rem" }}>Captura de Leads (7 días)</h3>
                <ResponsiveContainer width="100%" height="80%">
                  <BarChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="var(--text-tertiary)" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis 
                      stroke="var(--text-tertiary)" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <Tooltip 
                      contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="leads" fill="var(--accent-blue)" radius={[4, 4, 0, 0]} barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="glass-card" style={{ padding: "1.5rem", height: "400px" }}>
                <h3 style={{ marginBottom: "1.5rem", fontSize: "1rem" }}>Actividad de Mensajes</h3>
                <ResponsiveContainer width="100%" height="80%">
                  <LineChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="var(--text-tertiary)" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis 
                      stroke="var(--text-tertiary)" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <Tooltip 
                      contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="msgs" 
                      stroke="#8b5cf6" 
                      strokeWidth={3} 
                      dot={{ fill: '#8b5cf6', strokeWidth: 2 }} 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "settings" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className={styles.header}>
              <div>
                <h1>Configuración</h1>
                <p>Administra tu cuenta empresarial y preferencias</p>
              </div>
            </div>
            <div className={`glass-card ${styles.settingsCard}`}>
              <h3>🔗 Instalación del Widget</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>
                Copia y pega este código antes de cerrar la etiqueta <code>&lt;/body&gt;</code> en tu sitio web.
              </p>
              <div style={{ background: "#0f172a", padding: "1.25rem", borderRadius: "var(--radius-md)", position: "relative" }}>
                 <code style={{ fontSize: "0.8rem", color: "#34d399", display: "block", overflowX: "auto", lineHeight: "1.6" }}>
                   {`<script \n  src="${process.env.NEXT_PUBLIC_APP_URL || 'https://chatgenius-b2b.vercel.app'}/widget.js" \n  data-bot-id="TU-BOT-ID">\n</script>`}
                 </code>
                 <button 
                  onClick={() => {
                    navigator.clipboard.writeText(`<script src="${process.env.NEXT_PUBLIC_APP_URL || 'https://chatgenius-b2b.vercel.app'}/widget.js" data-bot-id="TU-BOT-ID"></script>`);
                    alert("¡Código copiado al portapapeles!");
                  }}
                  style={{ position: "absolute", top: "0.75rem", right: "0.75rem", padding: "0.4rem 0.8rem", fontSize: "0.75rem", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "6px", color: "#34d399", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                   <FiCopy /> Copiar
                 </button>
              </div>
            </div>
            {/* Account Settings */}
            <div className={`glass-card ${styles.settingsCard}`}>
              <h3>👤 Información de la Cuenta</h3>
              <div className={styles.settingsForm}>
                <div className={styles.settingsField}>
                  <label className="label">Nombre de la Empresa</label>
                  <input className="input" defaultValue="" placeholder="Tu empresa..." />
                </div>
                <div className={styles.settingsField}>
                  <label className="label">Email de Administración</label>
                  <input className="input" type="email" defaultValue="" placeholder="admin@tuempresa.com" />
                </div>
                <button className="btn-primary" style={{ alignSelf: "flex-start" }}>
                  Guardar Cambios
                </button>
              </div>
            </div>
            {/* Plan Info */}
            <div className={`glass-card ${styles.settingsCard}`}>
              <h3>💎 Plan Actual</h3>
              <div className={styles.planInfo}>
                <div>
                  <strong>Starter Mode</strong>
                  <p>1 Agente, 500 mensajes/mes, marca de agua de ChatGenius</p>
                </div>
                <button onClick={() => handleUpgrade('enterprise')} className="btn-primary">
                  Upgrade a Enterprise — $199/mes <FiArrowRight />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
