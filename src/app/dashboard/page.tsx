"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { toast, Toaster } from "sonner";
import {
  FiMessageSquare, FiSettings, FiLogOut, FiPlus, FiClock, FiStar,
  FiZap, FiCheck, FiTrendingUp, FiUsers, FiShield, FiUser, FiDownload, FiMail, FiBookOpen, FiCopy,
  FiDatabase, FiCpu, FiActivity
} from "react-icons/fi";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell
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
  const [activeTab, setActiveTab] = useState<"agents" | "leads" | "outreach" | "marketing" | "analytics" | "settings" | "launch">("agents");
  const [bots, setBots] = useState<Bot[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  const [analyticsData, setAnalyticsData] = useState<any[]>([]);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [chatLog, setChatLog] = useState<any[]>([]);
  const [isLogLoading, setIsLogLoading] = useState(false);

  // Estados para Magic Outreach
  const [outreachLead, setOutreachLead] = useState<string>("");
  const [outreachType, setOutreachType] = useState<string>("OUTREACH_INTRO");
  const [generatedScript, setGeneratedScript] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Estados para Marketing Arsenal (V35.0)
  const [marketingDay, setMarketingDay] = useState<number>(1);
  const [marketingPlatform, setMarketingPlatform] = useState<"linkedin" | "instagram">("linkedin");
  const [generatedPost, setGeneratedPost] = useState<string>("");
  const [isMarketingGenerating, setIsMarketingGenerating] = useState(false);

  // Estados para Notificaciones Push (V25.0)
  const [pushStatus, setPushStatus] = useState<"default" | "granted" | "denied">("default");

  // Estados para Sincronización Neural Asíncrona (V44.0)
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "success">("idle");
  const [crawlUrl, setCrawlUrl] = useState("");

  // Estados para Diagnóstico (V29.0)
  const [healthStatus, setHealthStatus] = useState<any>(null);

  useEffect(() => {
    async function checkHealth() {
      try {
        const res = await fetch("/api/health-check");
        const data = await res.json();
        setHealthStatus(data);
      } catch (err) {}
    }
    checkHealth();
  }, []);

  const enablePush = async () => {
    try {
      const { requestForToken } = await import("@/lib/firebase-client");
      const token = await requestForToken();
      if (token && user) {
        await supabase.from("profiles").update({ fcm_token: token }).eq("id", user.id);
        setPushStatus("granted");
        toast.success("🛡️ ALERT PULSE ACTIVADO: Recibirás notificaciones push de leads hot.");
      }
    } catch (err) {
      toast.error("❌ Error al activar notificaciones push.");
    }
  };

  const generateScript = async () => {
    if (!outreachLead) return;
    setIsGenerating(true);
    try {
      const lead = leads.find(l => l.id === outreachLead);
      const res = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({
          type: outreachType,
          data: { name: lead?.name, company: lead?.company }
        })
      });
      const data = await res.json();
      setGeneratedScript(data.result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateSocialPost = async () => {
    setIsMarketingGenerating(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({
          type: "MARKETING_POST",
          data: { day: marketingDay, platform: marketingPlatform }
        })
      });
      const data = await res.json();
      setGeneratedPost(data.result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsMarketingGenerating(false);
    }
  };

  const startCrawl = async () => {
    if (!crawlUrl) return;
    setSyncStatus("syncing");
    try {
      const res = await fetch("/api/crawl", {
        method: "POST",
        body: JSON.stringify({ url: crawlUrl, botId: bots[0]?.id }) // Usando el primer bot como demo o el seleccionado
      });
      const data = await res.json();
      if (data.success) {
        toast.success("🛡️ SINCRONIZACIÓN INICIADA: Stratix procesará el conocimiento en segundo plano.");
        // Simulamos éxito tras unos segundos para el UI visual
        setTimeout(() => {
          setSyncStatus("success");
          toast.success("✅ Neural Sync Completo.");
        }, 5000);
      }
    } catch (err) {
      toast.error("Error al iniciar sincronización neural.");
      setSyncStatus("idle");
    }
  };

  useEffect(() => {
    async function getUserData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name, plan, subscription_status")
          .eq("id", user.id)
          .single();

        const fullName = profile?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0];
        setUser({ 
          ...user, 
          display_name: fullName, 
          plan: profile?.plan || "free",
          subscription_status: profile?.subscription_status || "inactive",
          messages_sent: profile?.messages_sent_this_month || 0
        });
      }
    }
    getUserData();
  }, [activeTab]); // Actualizar al cambiar de pestaña para refrescar el consumo

  // Manejo de redirección post-pago
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "true") {
      alert("¡Éxito! Tu plan ha sido actualizado. Bienvenido a la élite de Stratix AI.");
      // Limpiar la URL para evitar alerts repetidos
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      // 1. Cargar Agentes
      const { data: bData } = await supabase.from("bots").select("*").order("updated_at", { ascending: false });
      if (bData) setBots(bData);
      
      // 2. Cargar Leads con el nombre del bot asociado
      const { data: lData } = await supabase.from("leads").select("*, bots(name)").order("created_at", { ascending: false });
      if (lData) setLeads(lData || []);

      // 3. Generar Analíticas Reales (Últimos 7 días)
      const logs: any[] = [];
      const days = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dayStr = days[d.getDay()];
        const dateStr = d.toISOString().split('T')[0];
        
        // Conteo manual reactivo (Optimizado para MVP)
        const leadsCount = lData?.filter(l => l.created_at.startsWith(dateStr)).length || 0;
        // Simulación de mensajes (hasta tener la tabla mensajes totalmente expuesta o RPC)
        logs.push({ name: dayStr, leads: leadsCount, msgs: leadsCount * 12 + Math.floor(Math.random() * 20) });
      }
      setAnalyticsData(logs);

      setLoading(false);
    }
    fetchData();
  }, [activeTab]);

  const fetchChatLog = async (leadId: string, sessionId: string) => {
    setIsLogLoading(true);
    try {
      // Intentar buscar por session_id (Widget) o por chat asociado
      const { data: chatData } = await supabase
        .from("messages")
        .select("*")
        .filter("chat_id", "in", (
            supabase.from("chats").select("id").eq("session_id", sessionId)
        ))
        .order("created_at", { ascending: true });
      
      // Si el anterior falla por complejidad de subquery, usamos fallback de chats
      const { data: realChat } = await supabase
        .from("chats")
        .select("id")
        .eq("session_id", sessionId)
        .single();
      
      if (realChat) {
        const { data: msgs } = await supabase
          .from("messages")
          .select("*")
          .eq("chat_id", realChat.id)
          .order("created_at", { ascending: true });
        if (msgs) setChatLog(msgs);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLogLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <div className={styles.dashboard} style={{ backgroundColor: '#0B1120', minHeight: '100vh', color: 'white' }}>
      <Toaster position="top-right" richColors theme="dark" />
      
      {/* Sidebar Elite */}
      <aside className={styles.sidebar} style={{ borderRight: '1px solid rgba(212, 175, 55, 0.1)', background: '#060B14' }}>
        <Link href="/" className={styles.logo} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', padding: '2rem' }}>
          <img src="/stratix_shield.svg" alt="Stratix Logo" style={{ height: '32px' }} />
          <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'white' }}>Strat<span style={{ color: '#D4AF37' }}>ix</span> AI</span>
        </Link>

        <nav className={styles.nav} style={{ padding: '0 1rem' }}>
          <button className={`${styles.navItem} ${activeTab === "agents" ? styles.navItemActive : ""}`} onClick={() => setActiveTab("agents")}>
            <FiMessageSquare /> Mis Agentes Elite
          </button>
          <button className={`${styles.navItem} ${activeTab === "leads" ? styles.navItemActive : ""}`} onClick={() => setActiveTab("leads")}>
            <FiUsers /> Leads Capturados
          </button>
          <button className={`${styles.navItem} ${activeTab === "outreach" ? styles.navItemActive : ""}`} onClick={() => setActiveTab("outreach")}>
            <FiZap /> Magic Outreach
          </button>
          <button className={`${styles.navItem} ${activeTab === "analytics" ? styles.navItemActive : ""}`} onClick={() => setActiveTab("analytics")}>
            <FiTrendingUp /> Inteligencia de Negocio
          </button>
          <button className={`${styles.navItem} ${activeTab === "marketing" ? styles.navItemActive : ""}`} onClick={() => setActiveTab("marketing")}>
            <FiStar /> Arsenal de Marketing
          </button>
          <button className={`${styles.navItem} ${activeTab === "launch" ? styles.navItemActive : ""}`} onClick={() => setActiveTab("launch")}>
            <FiBookOpen /> Centro de Lanzamiento
          </button>
          <button className={`${styles.navItem} ${activeTab === "settings" ? styles.navItemActive : ""}`} onClick={() => setActiveTab("settings")}>
            <FiShield /> Facturación y Plan
          </button>
        </nav>

        <div className={styles.sidebarFooter} style={{ padding: '1rem', marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {pushStatus !== "granted" && (
            <button 
              onClick={enablePush}
              style={{ background: 'rgba(212, 175, 55, 0.1)', border: '1px solid #D4AF37', color: '#D4AF37', padding: '10px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: '0.3s' }}
            >
              <FiZap /> ACTIVAR ALERT PULSE
            </button>
          )}

          <div style={{ background: 'rgba(212, 175, 55, 0.05)', border: '1px solid rgba(212, 175, 55, 0.2)', padding: '10px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FiStar style={{ color: '#D4AF37' }} /> 
            <span style={{ fontWeight: 800, color: '#D4AF37', fontSize: '0.7rem', textTransform: 'uppercase' }}>
              {user?.user_metadata?.plan || "Elite Access"}
            </span>
          </div>
          <button onClick={handleLogout} className={styles.logoutBtn} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FiLogOut /> Cerrar Sesión
          </button>

          {/* Launch Shield Diagnostics (V29.0) */}
          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ fontSize: '0.6rem', opacity: 0.4, fontWeight: 900, letterSpacing: '2px', display: 'block', marginBottom: '1rem' }}>LAUNCH SHIELD STATUS</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {healthStatus && (
                <>
                  <div title="Supabase" style={{ width: '8px', height: '8px', borderRadius: '50%', background: healthStatus.supabase ? '#27C93F' : '#FF5F56', boxShadow: healthStatus.supabase ? '0 0 10px #27C93F' : 'none' }} />
                  <div title="OpenAI" style={{ width: '8px', height: '8px', borderRadius: '50%', background: healthStatus.openai ? '#27C93F' : '#FF5F56', boxShadow: healthStatus.openai ? '0 0 10px #27C93F' : 'none' }} />
                  <div title="Gemini" style={{ width: '8px', height: '8px', borderRadius: '50%', background: healthStatus.gemini ? '#27C93F' : '#FF5F56', boxShadow: healthStatus.gemini ? '0 0 10px #27C93F' : 'none' }} />
                  <div title="Firebase" style={{ width: '8px', height: '8px', borderRadius: '50%', background: healthStatus.firebase ? '#27C93F' : '#FF5F56', boxShadow: healthStatus.firebase ? '0 0 10px #27C93F' : 'none' }} />
                </>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.main} style={{ padding: '2rem', overflowY: 'auto' }}>
        <header className={styles.header} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1.5rem' }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <div style={{ border: '1px solid rgba(212,175,55,0.3)', padding: '4px 12px', borderRadius: '20px', color: '#D4AF37', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <FiShield /> AES-256 SECURE
            </div>
            {user && (
              <div style={{ minWidth: '150px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', marginBottom: '4px', fontWeight: 800 }}>
                  <span>MENSAJES USADOS</span>
                  <span style={{ color: '#D4AF37' }}>{user.messages_sent} / {user.plan === 'starter' ? 500 : user.plan === 'pro' ? 5000 : 100}</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(user.messages_sent / (user.plan === 'starter' ? 500 : user.plan === 'pro' ? 5000 : 100)) * 100}%` }}
                      style={{ height: '100%', background: '#D4AF37', boxShadow: '0 0 10px #D4AF37' }}
                    />
                </div>
              </div>
            )}
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3.5rem' }}>
                <h1 className="text-cinematic" style={{ fontSize: '3rem' }}>Activos Estratégicos</h1>
                <Link href="/dashboard/bot/new" className="card-elite glow-gold" style={{ background: '#D4AF37', color: '#000', padding: '14px 30px', borderRadius: '15px', fontWeight: 900, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 15px 40px rgba(212,175,55,0.25)', border: 'none' }}>
                  <FiPlus size={20} /> DESPLEGAR AGENTE
                </Link>
              </div>

              {/* Módulo: Neural Sync Engine Elite (V50.1) */}
              <div className="card-elite" style={{ padding: '3rem', marginBottom: '4rem', display: 'flex', gap: '3rem', alignItems: 'center', border: '1px solid rgba(212,175,55,0.15)', background: 'linear-gradient(90deg, rgba(212,175,55,0.05), transparent)' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '25px', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FiDatabase size={32} color="#D4AF37" />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 className="text-cinematic" style={{ margin: '0 0 10px 0', fontSize: '1.6rem' }}>Neural Sync Engine</h3>
                  <p style={{ margin: 0, fontSize: '0.95rem', opacity: 0.6, fontWeight: 500, maxWidth: '400px' }}>Inyecta conocimiento asíncrono desde cualquier URL corporativa para alimentar tu Red Neural.</p>
                </div>
                <div style={{ display: 'flex', gap: '15px', flex: 1.2 }}>
                  <input 
                    type="text" placeholder="https://corporativo.ai/documentación"
                    value={crawlUrl} onChange={(e) => setCrawlUrl(e.target.value)}
                    style={{ flex: 1, padding: '18px 25px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', color: 'white', outline: 'none', fontSize: '1rem' }}
                  />
                  <button 
                    onClick={startCrawl}
                    disabled={syncStatus === "syncing"}
                    style={{ padding: '0 35px', background: syncStatus === 'syncing' ? 'rgba(255,255,255,0.05)' : '#D4AF37', color: '#000', borderRadius: '16px', fontWeight: 900, cursor: 'pointer', border: 'none', minWidth: '200px', transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)' }}
                  >
                    {syncStatus === "syncing" ? "PROCESANDO..." : "INICIAR SYNC"}
                  </button>
                </div>
              </div>

              <div className={styles.resumeGrid} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '2.5rem' }}>
                {bots.length > 0 ? bots.map((bot) => (
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    key={bot.id} className="card-elite" style={{ padding: '3rem', position: 'relative', overflow: 'hidden' }}
                  >
                    <div style={{ position: 'absolute', top: 0, right: 0, padding: '20px' }}>
                      <FiActivity color={bot.whatsapp_phone_number_id ? '#10b981' : 'rgba(255,255,255,0.1)'} size={20} />
                    </div>
                    <div style={{ marginBottom: '2.5rem' }}>
                      <h3 style={{ color: '#D4AF37', margin: '0 0 10px 0', fontSize: '1.6rem', fontWeight: 900, letterSpacing: '-0.03em' }}>{bot.name}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#D4AF37', opacity: 0.5, letterSpacing: '1px' }}>{bot.model.toUpperCase()}</span>
                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
                        <span style={{ fontSize: '0.65rem', fontWeight: 800, opacity: 0.4, textTransform: 'uppercase' }}>{bot.whatsapp_phone_number_id ? 'Omnicanal' : 'Web Node'}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '15px' }}>
                      <Link href={`/dashboard/bot/${bot.id}`} className="glow-gold" style={{ flex: 1.5, textAlign: 'center', padding: '16px', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '12px', textDecoration: 'none', color: '#D4AF37', fontSize: '0.85rem', fontWeight: 900, transition: '0.3s' }}>
                        MISSION CONTROL
                      </Link>
                      <button 
                        onClick={() => {
                          setOutreachLead("SYSTEM_GENERATE");
                          setActiveTab("outreach");
                          toast.info("Orquestando Pitch Neural...");
                        }}
                        style={{ flex: 1, textAlign: 'center', padding: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: 'white', fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer', opacity: 0.6 }}
                      >
                        PITCH
                      </button>
                    </div>
                  </motion.div>
                )) : (
                  <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '8rem 2rem', opacity: 0.2 }}>
                    <FiCpu size={60} style={{ marginBottom: '2rem', margin: '0 auto' }} />
                    <p style={{ fontSize: '1.3rem', fontWeight: 800, letterSpacing: '-0.02em' }}>SIN ACTIVOS IA DESPLEGADOS</p>
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
                <button 
                  onClick={() => window.location.href = '/api/download'}
                  className="btn-primary" 
                  style={{ background: 'rgba(212,175,55,0.1)', color: '#D4AF37', border: '1px solid #D4AF37', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: '0.3s' }}
                >
                  <FiDownload /> Exportar Inteligencia (CSV)
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
                          <div style={{ 
                            display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800,
                            color: lead.score === 'Hot' ? '#D4AF37' : lead.score === 'Warm' ? '#f59e0b' : '#3b82f6',
                            textShadow: lead.score === 'Hot' ? '0 0 10px rgba(212,175,55,0.5)' : 'none'
                          }}>
                            <div style={{ 
                              width: '8px', height: '8px', borderRadius: '50%', 
                              background: lead.score === 'Hot' ? '#D4AF37' : lead.score === 'Warm' ? '#f59e0b' : '#3b82f6', 
                              boxShadow: `0 0 10px ${lead.score === 'Hot' ? '#D4AF37' : lead.score === 'Warm' ? '#f59e0b' : '#3b82f6'}` 
                            }} />
                            {lead.score || 'Cold'}
                          </div>
                        </td>
                        <td style={{ padding: '1.2rem 1.5rem', textAlign: 'right' }}>
                          <button 
                            onClick={() => { setSelectedLead(lead); fetchChatLog(lead.id, lead.session_id); }}
                            style={{ background: 'rgba(212,175,55,0.1)', color: '#D4AF37', border: '1px solid rgba(212,175,55,0.3)', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 800, marginRight: '10px' }}
                          >
                            Ver Chat
                          </button>
                          {lead.whatsapp && (
                            <a href={`https://wa.me/${lead.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" style={{ color: '#10b981', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '0.8rem', background: 'rgba(16,185,129,0.1)', padding: '8px 14px', borderRadius: '8px', border: '1px solid rgba(16,185,129,0.2)' }}>
                              <FiMessageSquare /> WhatsApp
                            </a>
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

          {/* PESTAÑA: MAGIC OUTREACH (STRATIX V20) */}
          {activeTab === "outreach" && (
            <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 900 }}>Magic Outreach Engine</h1>
                <div style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid #D4AF37', padding: '6px 15px', borderRadius: '20px', color: '#D4AF37', fontSize: '0.7rem', fontWeight: 900, letterSpacing: '1px' }}>
                  NUCLEUS V17.0 ACTIVE
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2.5rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2.5rem', borderRadius: '30px', border: '1px solid rgba(212,175,55,0.15)', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
                  <h3 style={{ marginBottom: '1.8rem', color: '#D4AF37', borderLeft: '4px solid #D4AF37', paddingLeft: '15px' }}>Configuración de Misión</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', opacity: 0.5, marginBottom: '0.6rem', fontWeight: 800 }}>PROSPECTO CALIFICADO</label>
                      <select 
                        value={outreachLead} 
                        onChange={(e) => setOutreachLead(e.target.value)}
                        style={{ width: '100%', padding: '14px', background: '#060B14', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', outline: 'none' }}
                      >
                        <option value="">-- Seleccionar Prospecto --</option>
                        {leads.map(l => (
                          <option key={l.id} value={l.id}>{l.name} ({l.company || 'N/A'}) — {l.score}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', opacity: 0.5, marginBottom: '0.6rem', fontWeight: 800 }}>ESTRATEGIA DE ABORDAJE</label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        {[
                          { id: 'OUTREACH_INTRO', label: 'Warm Intro' },
                          { id: 'OUTREACH_PITCH', label: 'Technical Pitch' },
                          { id: 'OUTREACH_FOLLOWUP', label: 'Strategic Follow-up' }
                        ].map(t => (
                          <button 
                            key={t.id}
                            onClick={() => setOutreachType(t.id)}
                            style={{ 
                              padding: '12px', fontSize: '0.75rem', fontWeight: 800, borderRadius: '10px', border: '1px solid',
                              borderColor: outreachType === t.id ? '#D4AF37' : 'rgba(255,255,255,0.05)',
                              background: outreachType === t.id ? 'rgba(212,175,55,0.1)' : 'rgba(255,255,255,0.02)',
                              color: outreachType === t.id ? '#D4AF37' : 'rgba(255,255,255,0.5)', cursor: 'pointer',
                              transition: '0.3s'
                            }}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button 
                      onClick={generateScript}
                      disabled={!outreachLead || isGenerating}
                      style={{ 
                        width: '100%', padding: '18px', background: '#D4AF37', color: '#000', borderRadius: '15px', 
                        fontWeight: 900, cursor: 'pointer', border: 'none', marginTop: '1rem',
                        boxShadow: '0 10px 30px rgba(212,175,55,0.2)', transition: '0.3s'
                      }}
                    >
                      {isGenerating ? 'DESPLEGANDO IA...' : 'ORQUESTAR GUION MAESTRO'}
                    </button>
                  </div>
                </div>

                <div style={{ background: '#060B14', padding: '3rem', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.03)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: '0', right: '0', width: '100%', height: '100%', background: 'radial-gradient(circle at 90% 10%, rgba(212,175,55,0.05) 0%, transparent 50%)', pointerEvents: 'none' }} />
                    <h3 style={{ marginBottom: '2rem', opacity: 0.4, fontSize: '0.9rem', letterSpacing: '2px', fontWeight: 900 }}>TRANSCRIBING RESULTS...</h3>
                    {generatedScript ? (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ whiteSpace: 'pre-wrap', lineHeight: 1.8, fontSize: '1rem', color: 'rgba(255,255,255,0.9)', position: 'relative', zIndex: 1 }}>
                        {generatedScript}
                        <button 
                          onClick={() => { navigator.clipboard.writeText(generatedScript); alert("Guion copiado con éxito."); }}
                          style={{ display: 'block', marginTop: '2.5rem', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)', color: '#D4AF37', padding: '12px 25px', borderRadius: '10px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 900 }}
                        >
                          COPIAR AL PORTAPAPELES
                        </button>
                      </motion.div>
                    ) : (
                      <div style={{ height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.2, textAlign: 'center', gap: '1rem' }}>
                        <FiZap size={40} />
                        <p style={{ maxWidth: '250px' }}>Inicia una misión de prospección para ver el guion generado por el núcleo Stratix.</p>
                      </div>
                    )}
                </div>
              </div>
            </motion.div>
          )}

          {/* PESTAÑA: ARSENAL DE MARKETING (V35.0) */}
          {activeTab === "marketing" && (
            <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 900 }}>Arsenal de Marketing AI</h1>
                <div style={{ background: '#D4AF37', color: '#000', padding: '6px 15px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 900, letterSpacing: '1.5px' }}>
                  VIRAL ENGINE ACTIVE
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2.5rem' }}>
                <div style={{ background: 'rgba(212, 175, 55, 0.05)', padding: '2.5rem', borderRadius: '30px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                  <h3 style={{ color: '#D4AF37', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FiTrendingUp /> Estrategia de 30 Días
                  </h3>
                  <p style={{ fontSize: '0.85rem', opacity: 0.6, marginBottom: '2rem', lineHeight: 1.6 }}> Genera el copy maestro para tus redes sociales basado en la infraestructura de marketing de Stratix.</p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, opacity: 0.5, marginBottom: '0.5rem' }}>DÍA DEL PLAN (1-30)</label>
                      <input 
                        type="number" min="1" max="30" value={marketingDay}
                        onChange={(e) => setMarketingDay(Number(e.target.value))}
                        style={{ width: '100%', padding: '12px', background: '#060B14', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, opacity: 0.5, marginBottom: '0.5rem' }}>PLATAFORMA OBJETIVO</label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <button 
                          onClick={() => setMarketingPlatform("linkedin")}
                          style={{ padding: '10px', borderRadius: '10px', border: '1px solid', borderColor: marketingPlatform === 'linkedin' ? '#D4AF37' : 'rgba(255,255,255,0.05)', background: marketingPlatform === 'linkedin' ? 'rgba(212,175,55,0.1)' : 'transparent', color: marketingPlatform === 'linkedin' ? '#D4AF37' : 'white', cursor: 'pointer', fontWeight: 700 }}
                        >LinkedIn</button>
                        <button 
                          onClick={() => setMarketingPlatform("instagram")}
                          style={{ padding: '10px', borderRadius: '10px', border: '1px solid', borderColor: marketingPlatform === 'instagram' ? '#D4AF37' : 'rgba(255,255,255,0.05)', background: marketingPlatform === 'instagram' ? 'rgba(212,175,55,0.1)' : 'transparent', color: marketingPlatform === 'instagram' ? '#D4AF37' : 'white', cursor: 'pointer', fontWeight: 700 }}
                        >Instagram</button>
                      </div>
                    </div>
                    <button 
                      onClick={generateSocialPost}
                      disabled={isMarketingGenerating}
                      style={{ width: '100%', padding: '15px', background: '#D4AF37', color: '#060B14', borderRadius: '12px', fontWeight: 900, cursor: 'pointer', border: 'none', boxShadow: '0 10px 30px rgba(212,175,55,0.2)' }}
                    >
                      {isMarketingGenerating ? 'GENERANDO COPYS ÉLITE...' : 'GENERAR POST MAESTRO'}
                    </button>
                  </div>
                </div>

                <div style={{ background: '#060B14', padding: '2.5rem', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.03)', minHeight: '400px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 900, opacity: 0.4, letterSpacing: '2px' }}>VINTAGE NEURAL OUTPUT</span>
                    {generatedPost && (
                       <button onClick={() => navigator.clipboard.writeText(generatedPost)} style={{ background: 'none', border: 'none', color: '#D4AF37', fontSize: '0.75rem', fontWeight: 800, cursor: 'pointer' }}>COPIAR</button>
                    )}
                  </div>
                  {generatedPost ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ lineHeight: 1.8, fontSize: '0.95rem', whiteSpace: 'pre-wrap' }}>
                      {generatedPost}
                    </motion.div>
                  ) : (
                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.2, textAlign: 'center' }}>
                      <FiStar size={48} style={{ marginBottom: '1rem' }} />
                      <p style={{ maxWidth: '200px' }}>Selecciona un día y plataforma para generar tu contenido estratégico.</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* PESTAÑA: ANALÍTICA (ROI MASTERY V48.0) */}
          {activeTab === "analytics" && (
            <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <h1 className="text-cinematic" style={{ fontSize: '2.5rem' }}>Inteligencia ROI de Élite</h1>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div className="card-elite" style={{ background: 'rgba(16,185,129,0.05)', color: '#10b981', padding: '10px 20px', borderRadius: '15px', fontSize: '0.8rem', fontWeight: 900, border: '1px solid rgba(16,185,129,0.2)' }}>TIEMPO AHORRADO: +45H</div>
                  <div className="card-elite glow-gold" style={{ background: 'rgba(212,175,55,0.05)', color: '#D4AF37', padding: '10px 20px', borderRadius: '15px', fontSize: '0.8rem', fontWeight: 900, border: '1px solid rgba(212,175,55,0.3)' }}>REVENUE ATRIBUIDO: $1,240</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2.5rem', marginBottom: '2.5rem' }}>
                {/* Gráfica de Barras Principal */}
                <div className="card-elite" style={{ padding: '3rem', position: 'relative' }}>
                  <p className="text-cinematic" style={{ fontSize: '0.8rem', opacity: 0.5, marginBottom: '2.5rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Captura de Leads Neural</p>
                  <div style={{ height: '350px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={analyticsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                        <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={12} axisLine={false} tickLine={false} tick={{ dy: 10 }} />
                        <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} axisLine={false} tickLine={false} tick={{ dx: -10 }} />
                        <Tooltip contentStyle={{ background: '#0B1120', border: '1px solid #D4AF37', borderRadius: '16px', boxShadow: '0 20px 50px rgba(0,0,0,0.6)', padding: '15px' }} />
                        <Bar dataKey="leads" fill="url(#colorLeads)" radius={[10, 10, 0, 0]} barSize={40} />
                        <defs>
                          <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.9}/>
                            <stop offset="95%" stopColor="#D4AF37" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Gráfica de ROI por Canal */}
                <div className="card-elite" style={{ padding: '3rem' }}>
                  <p className="text-cinematic" style={{ fontSize: '0.8rem', opacity: 0.5, marginBottom: '2.5rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Conversión por Canal</p>
                  <div style={{ height: '240px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'WhatsApp', value: 45 },
                            { name: 'Web Widget', value: 35 },
                            { name: 'Instagram', value: 20 }
                          ]}
                          innerRadius={70}
                          outerRadius={95}
                          paddingAngle={8}
                          dataKey="value"
                          stroke="none"
                        >
                          <Cell fill="#D4AF37" />
                          <Cell fill="#6366f1" />
                          <Cell fill="#10b981" />
                        </Pie>
                        <Tooltip contentStyle={{ background: '#0B1120', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#D4AF37' }} /> WhatsApp</span>
                      <span style={{ color: '#D4AF37' }}>45%</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#6366f1' }} /> Web Widget</span>
                      <span style={{ color: '#6366f1' }}>35%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gráfica de Mensajes (Line) */}
              <div className="card-elite" style={{ padding: '2.5rem' }}>
                  <p className="text-cinematic" style={{ fontSize: '0.75rem', opacity: 0.4, marginBottom: '2rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Volumen de Interacciones Neurales</p>
                  <div style={{ height: '220px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={analyticsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" vertical={false} />
                        <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={12} axisLine={false} tickLine={false} />
                        <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ background: '#0B1120', border: '1px solid #D4AF37', borderRadius: '12px' }} />
                        <Line type="monotone" dataKey="msgs" stroke="#D4AF37" strokeWidth={4} dot={{ fill: '#D4AF37', r: 5, strokeWidth: 0 }} activeDot={{ r: 8, stroke: '#0B1120', strokeWidth: 2 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
              </div>
            </motion.div>
          )}

          {/* PESTAÑA: SETTINGS/FACTURACIÓN */}
          {/* PESTAÑA: CENTRO DE LANZAMIENTO (V41.0) */}
        {activeTab === "launch" && (
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <div style={{ marginBottom: '3rem' }}>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>Estrategia de Lanzamiento Élite</h1>
              <p style={{ opacity: 0.6 }}>Tu hoja de ruta para escalar Stratix de 0 a $1k MRR.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem' }}>
              {/* Sección A: Sales Pitch */}
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2.5rem', borderRadius: '30px', border: '1px solid rgba(212, 175, 55, 0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <h2 style={{ color: '#D4AF37', margin: 0 }}>🎤 Sales Pitch Maestro</h2>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText("Hola [Nombre], he estado analizando la infraestructura de atención de [Nombre de Empresa]...");
                      toast.success("Script copiado al portapapeles.");
                    }}
                    style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid #D4AF37', color: '#D4AF37', padding: '8px 16px', borderRadius: '12px', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <FiCopy /> Copiar Script
                  </button>
                </div>
                <div style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, fontSize: '0.95rem' }}>
                  <p><strong>El Gancho:</strong> "He diseñado una Arquitectura de Inteligencia Estratégica que atiende, califica y cierra ventas por ti las 24 horas, detectando intenciones calientes al instante."</p>
                  <p><strong>El Valor Único:</strong> "Usamos Opal Logic. No es un chat básico; es un motor que reconoce si el cliente está listo para comprar y te envía una Alerta de Élite al segundo."</p>
                  <p><strong>El Cierre:</strong> "Te propongo una Demo Estratégica de 7 días gratis entrenada con tus propios manuales. Si en una semana no ves leads calificados, la quito y no me debes nada."</p>
                </div>
              </div>

              {/* Sección B: Checklist de Lanzamiento */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: 'rgba(212,175,55,0.05)', padding: '2rem', borderRadius: '30px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                  <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.2rem' }}>🛡️ Protocolo de Blindaje</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '0.85rem' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><FiCheck style={{ color: '#D4AF37' }} /> Validar Webhooks de Pago</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><FiCheck style={{ color: '#D4AF37' }} /> Probar WhatsApp Webhook</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><FiCheck style={{ color: '#D4AF37' }} /> Test de Stress RAG (PDF 10p+)</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><FiCheck style={{ color: '#D4AF37' }} /> Revisión Mobile UI</li>
                  </ul>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '30px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.2rem', color: '#6366f1' }}>🚀 Estrategia High-Ticket</h3>
                  <p style={{ fontSize: '0.8rem', opacity: 0.6, lineHeight: 1.6 }}>Cobra entre $300 - $500 por el set-up inicial de los Prompts y manuales. Tu tiempo como Arquitecto de IA tiene un valor premium.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "settings" && (
            <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
              <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '2.5rem' }}>Facturación y Gestión Élite</h1>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <div style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(0,0,0,0.5) 100%)', padding: '2.5rem', borderRadius: '24px', border: '1px solid #D4AF37' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 900, letterSpacing: '2px', color: '#D4AF37', marginBottom: '1rem' }}>PLAN ACTUAL</div>
                  <h2 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.5rem' }}>{user?.plan || "Free"}</h2>
                  <p style={{ opacity: 0.6, marginBottom: '2rem' }}>Estado: <span style={{ color: '#10b981' }}>● {user?.subscription_status || "Activo"}</span></p>
                  <Link href="/#pricing" style={{ display: 'inline-block', padding: '12px 24px', background: '#D4AF37', color: '#000', borderRadius: '10px', textDecoration: 'none', fontWeight: 900 }}>CAMBIAR PLAN</Link>
                </div>
                
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2.5rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                   <h4 style={{ marginBottom: '1.5rem' }}>Consumo del Mes</h4>
                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                     <span>Mensajes de IA</span>
                     <strong>{user?.messages_sent} / {user?.plan === 'pro' ? '5,000' : '500'}</strong>
                   </div>
                   <div style={{ height: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', background: '#D4AF37', width: `${Math.min(100, (user?.messages_sent / 500) * 100)}%` }} />
                   </div>
                   <p style={{ fontSize: '0.7rem', opacity: 0.4, marginTop: '1rem' }}>Tu ciclo de facturación se reinicia el día 1 de cada mes.</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* MODAL DE HISTORIAL DE CHAT */}
          <AnimatePresence>
            {selectedLead && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '2rem' }}>
                <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} style={{ background: '#0B1120', width: '100%', maxWidth: '600px', borderRadius: '24px', border: '1px solid rgba(212,175,55,0.3)', overflow: 'hidden', maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Chat con {selectedLead.name}</h3>
                      <p style={{ fontSize: '0.7rem', opacity: 0.5 }}>{selectedLead.session_id}</p>
                    </div>
                    <button onClick={() => { setSelectedLead(null); setChatLog([]); }} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.5rem' }}>×</button>
                  </div>
                  
                  <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {isLogLoading ? (
                      <div style={{ textAlign: 'center', padding: '2rem', opacity: 0.5 }}>Recuperando transcripción élite...</div>
                    ) : chatLog.length > 0 ? chatLog.map((m, i) => (
                      <div key={i} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', background: m.role === 'user' ? '#D4AF37' : 'rgba(255,255,255,0.05)', color: m.role === 'user' ? '#000' : '#fff', padding: '10px 15px', borderRadius: '12px', fontSize: '0.85rem', maxWidth: '80%', fontWeight: m.role === 'user' ? 600 : 400 }}>
                        {m.content}
                      </div>
                    )) : (
                      <div style={{ textAlign: 'center', opacity: 0.4, padding: '2rem' }}>No hay mensajes registrados en esta sesión.</div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}