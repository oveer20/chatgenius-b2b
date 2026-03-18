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
  FiTrash2
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
  const [activeTab, setActiveTab] = useState<"agents" | "leads" | "chats" | "analytics" | "settings">("agents");
  const [bots, setBots] = useState<Bot[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [chats, setChats] = useState<any[]>([]);
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }
    getUser();
  }, []);

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

    async function fetchChats() {
      const { data, error } = await supabase
        .from("chats")
        .select(`
          *,
          bots(name),
          messages(role, content, created_at)
        `)
        .order("created_at", { ascending: false });
      
      if (data) {
        // Enlazar chats con leads por session_id (offline join)
        const enrichedChats = data.map(chat => {
          const lead = (leads || []).find(l => l.session_id === chat.session_id);
          return { ...chat, lead };
        });
        setChats(enrichedChats);
      }
      if (error) console.error("Error loading chats:", error);
    }

    fetchBots();
    fetchLeads().then(() => fetchChats());
  }, [leads.length]); // Re-fetch when leads change

  const handleCopySnippet = (botId: string) => {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://arsenex.ai";
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
        body: JSON.stringify({ 
          plan, 
          email: user?.email,
          userId: user?.id
        })
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

  const handleDeleteBot = async (botId: string, botName: string) => {
    if (!confirm(`¿Estás seguro de que deseas eliminar permanentemente el agente "${botName}"? Esta acción no se puede deshacer.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/bots/${botId}`, {
        method: "DELETE"
      });

      if (res.ok) {
        setBots(bots.filter(b => b.id !== botId));
        alert("Agente eliminado correctamente.");
      } else {
        const error = await res.json();
        alert(`Error al eliminar: ${error.error}`);
      }
    } catch (err) {
      alert("Error de conexión al intentar eliminar el agente.");
    }
  };

  return (
    <div className={styles.dashboard}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <Link href="/" className={styles.logo}>
          <img src="/arsenex_shield.png" alt="Arsenex Logo" className={styles.logoImage} style={{ filter: 'brightness(1.2)' }} />
          <span style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>Arsen<span style={{ color: 'var(--accent-blue)' }}>ex</span> <small style={{fontSize: '0.6rem', opacity: 0.5}}>AI</small></span>
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
            className={`${styles.navItem} ${activeTab === "chats" ? styles.navItemActive : ""}`}
            onClick={() => setActiveTab("chats")}
          >
            <FiActivity /> Conversaciones
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
          <div className={styles.planBadge} style={{ background: 'rgba(0, 112, 255, 0.05)', border: '1px solid rgba(0, 112, 255, 0.1)' }}>
            <FiStar style={{ color: 'var(--accent-blue)' }} /> <span style={{ fontWeight: 800, color: 'var(--accent-blue)' }}>EXECUTIVE ACCESS</span>
          </div>
          <button onClick={() => handleUpgrade('enterprise')} className="btn-primary" style={{ width: "100%", fontSize: "0.85rem", padding: "0.65rem", boxShadow: 'var(--shadow-glow)' }}>
            <FiZap /> Upgrade a Enterprise
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
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)' }}>Gestión de Agentes</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Configura y entrena tus asistentes inteligentes con tecnología de vanguardia.</p>
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
                      <button 
                        onClick={() => handleDeleteBot(bot.id, bot.name)} 
                        className="btn-secondary" 
                        style={{ fontSize: "0.8rem", padding: "0.5rem", background: "rgba(239, 68, 68, 0.1)", color: "#ef4444", borderColor: "rgba(239, 68, 68, 0.2)" }}
                        title="Eliminar Agente"
                      >
                        <FiTrash2 />
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

        {activeTab === "chats" && (
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} custom={0} style={{ height: "calc(100vh - 120px)", display: "flex", flexDirection: "column" }}>
            <header className={styles.header}>
              <div>
                <h1 className={styles.title}>Conversaciones en Vivo</h1>
                <p className={styles.subtitle}>Mira qué están preguntando tus clientes en tiempo real.</p>
              </div>
            </header>

            <div style={{ display: "grid", gridTemplateColumns: "350px 1fr", gap: "1.5rem", flex: 1, minHeight: 0 }}>
              {/* Chat List */}
              <div className="glass-card" style={{ padding: "1rem", overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {chats.length > 0 ? chats.map((chat) => (
                  <div 
                    key={chat.id} 
                    onClick={() => setSelectedChat(chat)}
                    style={{ 
                      padding: "1rem", 
                      borderRadius: "12px", 
                      background: selectedChat?.id === chat.id ? "rgba(79,125,245,0.1)" : "rgba(255,255,255,0.02)",
                      border: "1px solid",
                      borderColor: selectedChat?.id === chat.id ? "var(--accent-blue)" : "transparent",
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                      <strong style={{ fontSize: "0.9rem" }}>{chat.lead?.name || "Visitante Anónimo"}</strong>
                      <span style={{ fontSize: "0.75rem", opacity: 0.5 }}>{new Date(chat.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {chat.bots?.name || "Asistente"}
                    </div>
                  </div>
                )) : (
                  <div style={{ textAlign: "center", padding: "2rem", color: "var(--text-tertiary)" }}>
                    <FiMessageSquare size={32} style={{ marginBottom: "1rem", opacity: 0.3 }} />
                    <p style={{ fontSize: "0.85rem" }}>No hay conversaciones aún.</p>
                  </div>
                )}
              </div>

              {/* Chat Detail */}
              <div className="glass-card" style={{ padding: "0", display: "flex", flexDirection: "column", background: "rgba(10,15,25,0.4)" }}>
                {selectedChat ? (
                  <>
                    <div style={{ padding: "1.25rem", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.02)" }}>
                      <h3 style={{ fontSize: "1rem" }}>{selectedChat.lead?.name || "Anónimo"}</h3>
                      <p style={{ fontSize: "0.8rem", opacity: 0.6 }}>Chateando con: {selectedChat.bots?.name}</p>
                    </div>
                    <div style={{ flex: 1, padding: "1.5rem", overflowY: "auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
                      {selectedChat.messages?.map((msg: any, idx: number) => (
                        <div key={idx} style={{ 
                          alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                          maxWidth: "80%",
                          padding: "0.8rem 1rem",
                          borderRadius: "15px",
                          fontSize: "0.9rem",
                          background: msg.role === 'user' ? "var(--accent-blue)" : "rgba(255,255,255,0.05)",
                          color: msg.role === 'user' ? "white" : "var(--text-primary)",
                          borderBottomRightRadius: msg.role === 'user' ? "0" : "15px",
                          borderBottomLeftRadius: msg.role === 'user' ? "15px" : "0",
                        }}>
                          {msg.content}
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-tertiary)", flexDirection: "column", gap: "1rem" }}>
                    <FiActivity size={48} style={{ opacity: 0.1 }} />
                    <p>Selecciona una conversación para ver los detalles.</p>
                  </div>
                )}
              </div>
            </div>
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
                    <th style={{ textAlign: "left", padding: "1.25rem", fontSize: "0.85rem", opacity: 0.7 }}>Propósito</th>
                    <th style={{ textAlign: "left", padding: "1.25rem", fontSize: "0.85rem", opacity: 0.7 }}>Prioridad</th>
                    <th style={{ textAlign: "left", padding: "1.25rem", fontSize: "0.85rem", opacity: 0.7 }}>Agente</th>
                    <th style={{ textAlign: "left", padding: "1.25rem", fontSize: "0.85rem", opacity: 0.7 }}>Fecha</th>
                    <th style={{ textAlign: "center", padding: "1.25rem", fontSize: "0.85rem", opacity: 0.7 }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.length > 0 ? leads.map((lead) => (
                    <tr key={lead.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                      <td style={{ padding: "1.25rem", fontSize: "0.9rem", fontWeight: "600" }}>{lead.name}</td>
                      <td style={{ padding: "1.25rem", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          {lead.email}
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText(lead.email);
                              alert("Email copiado");
                            }}
                            className={styles.miniActionBtn}
                            title="Copiar Email"
                          >
                            <FiCopy size={12} />
                          </button>
                        </div>
                      </td>
                      <td style={{ padding: "1.25rem", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                        {lead.whatsapp || "No provisto"}
                      </td>
                      <td style={{ padding: "1.25rem", fontSize: "0.85rem" }}>
                        <span style={{ 
                          padding: "0.25rem 0.6rem", 
                          background: lead.intent === 'Sales' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.05)', 
                          color: lead.intent === 'Sales' ? 'var(--success)' : 'var(--text-secondary)', 
                          borderRadius: "20px",
                          fontWeight: "600",
                          fontSize: "0.75rem"
                        }}>
                          {lead.intent || "General"}
                        </span>
                      </td>
                      <td style={{ padding: "1.25rem", fontSize: "0.85rem" }}>
                        <span style={{ 
                          padding: "0.25rem 0.6rem", 
                          background: lead.score === 'Hot' ? 'rgba(239, 68, 68, 0.1)' : lead.score === 'Warm' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(59, 130, 246, 0.1)', 
                          color: lead.score === 'Hot' ? '#ef4444' : lead.score === 'Warm' ? '#f59e0b' : 'var(--accent-blue)', 
                          borderRadius: "20px",
                          fontWeight: "800",
                          fontSize: "0.75rem"
                        }}>
                          {lead.score || "Cold"}
                        </span>
                      </td>
                      <td style={{ padding: "1.25rem", fontSize: "0.85rem" }}>
                        <span style={{ padding: "0.25rem 0.6rem", background: "rgba(79,125,245,0.1)", color: "var(--accent-blue)", borderRadius: "20px" }}>
                          {lead.bots?.name || "Bot"}
                        </span>
                      </td>
                      <td style={{ padding: "1.25rem", fontSize: "0.85rem", color: "var(--text-tertiary)" }}>
                        {new Date(lead.created_at).toLocaleDateString()}
                      </td>
                      <td style={{ padding: "1.25rem", textAlign: "center" }}>
                        <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem" }}>
                          {lead.whatsapp && (
                            <a 
                              href={`https://wa.me/${lead.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(`Hola ${lead.name}, gracias por contactar a través de nuestra IA. ¿En qué podemos ayudarte?`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.contactBtnWhatsapp}
                              title="Contactar por WhatsApp"
                            >
                              <FiPhone size={14} /> WhatsApp
                            </a>
                          )}
                          <button className={styles.miniActionBtn} title="Ver detalles">
                            <FiExternalLink size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={8} style={{ padding: "4rem", textAlign: "center", color: "var(--text-tertiary)" }}>
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
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)' }}>Panel de Control Ejecutivo</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Monitorea el crecimiento y la efectividad de tu arsenal de IA.</p>
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
                    {`<script \n  src="${process.env.NEXT_PUBLIC_APP_URL || 'https://arsenex-ai.vercel.app'}/widget.js" \n  data-bot-id="TU-BOT-ID">\n</script>`}
                  </code>
                 <button 
                  onClick={() => {
                    navigator.clipboard.writeText(`<script src="${process.env.NEXT_PUBLIC_APP_URL || 'https://arsenex-ai.vercel.app'}/widget.js" data-bot-id="TU-BOT-ID"></script>`);
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
                  <p>1 Agente, 500 mensajes/mes, marca de agua de Arsenex</p>
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
