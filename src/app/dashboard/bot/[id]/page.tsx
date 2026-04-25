"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  FiArrowLeft, FiSave, FiPlay, FiDatabase, FiSettings, FiCpu, FiRefreshCw,
  FiSend, FiZap, FiCode, FiGlobe, FiStar, FiLayout, FiShield, FiInfo,
  FiBarChart2, FiUsers, FiMail, FiPhone, FiCalendar, FiMessageCircle, FiPlus, FiDownload, FiActivity
} from "react-icons/fi";
import styles from "../../dashboard.module.css";
import { supabase } from "@/lib/supabase";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Toaster } from 'sonner';

export default function BotEditor() {
  const { id } = useParams();
  const router = useRouter();
  const isNew = id === "new";

  const [botData, setBotData] = useState({
    name: isNew ? "" : "Cargando...",
    description: "",
    systemPrompt: "",
    temperature: 0.7,
    model: "gpt-4o",
    whatsappPhoneNumber: "",
    whatsappPhoneId: "",
    whatsappToken: "",
    whatsappVerifyToken: "",
    emailAlertsTo: "",
  });

  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", content: "¡Sistema en línea! Soy tu activo de IA estratégica. ¿Qué vamos a probar hoy?" }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [knowledgeBase, setKnowledgeBase] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeTab, setActiveTab] = useState<'identidad' | 'cerebro' | 'entrenamiento' | 'despliegue'>('identidad');
  const [leads, setLeads] = useState<any[]>([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [crawlerUrl, setCrawlerUrl] = useState("");
  const [isCrawling, setIsCrawling] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages, isTyping]);

  useEffect(() => {
    async function loadBot() {
      if (isNew) return;
      const { data, error } = await supabase.from("bots").select("*").eq("id", id).single();
      if (data) {
        setBotData({
          name: data.name,
          description: data.description || "",
          systemPrompt: data.system_prompt || "",
          temperature: data.temperature || 0.7,
          model: data.model || "gpt-4o",
          whatsappPhoneNumber: data.whatsapp_phone_number || "",
          whatsappPhoneId: data.whatsapp_phone_number_id || "",
          whatsappToken: data.whatsapp_token || "",
          whatsappVerifyToken: data.whatsapp_verify_token || "",
          emailAlertsTo: data.email_alerts_to || "",
        });
        setKnowledgeBase(data.knowledge_base || "");
      }
    }
    loadBot();
  }, [id, isNew]);

  useEffect(() => {
    async function loadLeads() {
      if (isNew) return;
      setIsLoadingLeads(true);
      try {
        const { data } = await supabase
          .from("leads")
          .select("*")
          .eq("bot_id", id)
          .order("created_at", { ascending: false });
        
        if (data) setLeads(data);
      } catch (err) {
        console.error("Error cargando leads:", err);
      } finally {
        setIsLoadingLeads(false);
      }
    }
    loadLeads();
  }, [id, isNew]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = {
        name: botData.name,
        description: botData.description,
        system_prompt: botData.systemPrompt,
        knowledge_base: knowledgeBase,
        temperature: botData.temperature,
        model: botData.model,
        whatsapp_phone_number: botData.whatsappPhoneNumber,
        whatsapp_phone_number_id: botData.whatsappPhoneId,
        whatsapp_token: botData.whatsappToken,
        whatsapp_verify_token: botData.whatsappVerifyToken,
        email_alerts_to: botData.emailAlertsTo,
        updated_at: new Date().toISOString(),
      };

      let error;
      if (isNew) {
        const { data: { user } } = await supabase.auth.getUser();
        const { error: err } = await supabase.from("bots").insert([{ ...payload, user_id: user?.id }]);
        error = err;
      } else {
        const { error: err } = await supabase.from("bots").update(payload).eq("id", id);
        error = err;
      }

      if (error) throw error;
      alert("¡Activo IA sincronizado con éxito!");
      if (isNew) router.push("/dashboard");
    } catch (err: any) {
      alert("Error en la arquitectura: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSyncKnowledge = async () => {
    if (!knowledgeBase.trim()) return;
    setIsSyncing(true);
    try {
      const response = await fetch(`/api/bots/${id}/ingest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: knowledgeBase, source: "Editor Manual" })
      });
      const data = await response.json();
      if (data.success) {
        alert(`¡Éxito! ${data.chunks_count} fragmentos de conocimiento sincronizados vectorialmente.`);
      } else {
        throw new Error(data.error);
      }
    } catch (err: any) {
      alert("Fallo en la sincronización RAG: " + err.message);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch(`/api/bots/${id}/upload`, { method: "POST", body: formData });
      const data = await response.json();
      if (data.success) {
        alert(`¡Conocimiento absorbido!`);
        if (data.text) setKnowledgeBase(prev => prev + "\n\n--- DOCUMENTO ABSORBIDO ---\n" + data.text);
      } else {
        throw new Error(data.error);
      }
    } catch (err: any) {
      alert("Fallo en la asimilación: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCrawlUrl = async () => {
    if (!crawlerUrl || !crawlerUrl.startsWith("http")) {
      alert("Por favor ingresa una URL válida (http/https)");
      return;
    }
    setIsCrawling(true);
    try {
      const response = await fetch(`/api/bots/${id}/crawl`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: crawlerUrl })
      });
      const data = await response.json();
      if (data.success) {
        alert(`¡Página absorbida! Se generaron ${data.chunks} vectores de conocimiento.`);
        if (data.textSegment) {
          setKnowledgeBase(prev => prev + `\n\n--- SITE: ${crawlerUrl} ---\n` + data.textSegment + "\n[...]");
        }
        setCrawlerUrl(""); 
      } else {
        throw new Error(data.error);
      }
    } catch (err: any) {
      alert("Fallo al escanear sitio web: " + err.message);
    } finally {
      setIsCrawling(false);
    }
  };

  const handleExportCSV = () => {
    if (leads.length === 0) return;
    
    const headers = ["ID,Nombre,Email,Teléfono,Intención,Calificación,Fecha\n"];
    const csvContent = leads.map(l => {
      const date = new Date(l.created_at).toLocaleDateString();
      return `"${l.id}","${l.name || ''}","${l.email || ''}","${l.phone || ''}","${l.intent || ''}","${l.score || ''}","${date}"`;
    }).join("\n");
    
    const blob = new Blob([headers + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `leads_stratix_${id}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg = { role: "user", content: inputMessage };
    setChatMessages(prev => [...prev, userMsg]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...chatMessages, userMsg],
          systemPrompt: botData.systemPrompt,
          knowledgeBase: knowledgeBase,
          model: botData.model,
          botId: id
        })
      });
      const data = await response.json();
      if (data.message) setChatMessages(prev => [...prev, data.message]);
    } catch (err) {
      setChatMessages(prev => [...prev, { role: "assistant", content: "⚠️ Error de conexión con el núcleo de IA." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#060B14', height: '100vh', display: 'flex', flexDirection: 'column', color: 'white', fontFamily: 'Inter, sans-serif' }}>
      {/* Status Bar Elite (V50.0) */}
      <div style={{ background: 'rgba(0,0,0,0.4)', padding: '0.6rem 2.5rem', display: 'flex', gap: '2.5rem', borderBottom: '1px solid rgba(212,175,55,0.08)', fontSize: '0.65rem', letterSpacing: '1px' }}>
        <div style={{ color: '#D4AF37', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '6px' }}><FiZap /> NÚCLEO STRATIX ACTIVADO</div>
        <div style={{ opacity: 0.5 }}>OPAL LOGIC: <span style={{ color: '#10b981', fontWeight: 800 }}>ESTABLE</span></div>
        <div style={{ opacity: 0.5 }}>LATENCIA NEURAL: <span style={{ color: '#10b981', fontWeight: 800 }}>18ms</span></div>
        <div style={{ marginLeft: 'auto', opacity: 0.4 }}>V50.0 GOLDEN RELEASE</div>
      </div>

      {/* Header del Editor Elite */}
      <header style={{ padding: '1.5rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(6,11,20,0.8)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button onClick={() => router.push("/dashboard")} className="card-elite" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '10px', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.3s' }}>
            <FiArrowLeft size={18} />
          </button>
          <div>
            <h2 className="text-cinematic" style={{ fontSize: '1.5rem', margin: 0 }}>{isNew ? "Nueva Entidad de IA" : botData.name}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
              <span style={{ fontSize: '0.65rem', color: '#D4AF37', fontWeight: 900, background: 'rgba(212,175,55,0.1)', padding: '2px 8px', borderRadius: '4px', letterSpacing: '1px' }}>ID: {id}</span>
              <span style={{ fontSize: '0.65rem', opacity: 0.4, fontWeight: 700 }}>Protocolo de Inteligencia Activo</span>
            </div>
          </div>
        </div>
        <button 
          onClick={handleSave} 
          className="card-elite glow-gold" 
          style={{ background: '#D4AF37', color: '#000', padding: '12px 28px', borderRadius: '14px', fontWeight: 900, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '10px', border: 'none', cursor: 'pointer', transition: 'all 0.4s' }}
        >
          {isSaving ? <FiRefreshCw className="spin" /> : <FiSave />} 
          {isSaving ? "Sincronizando..." : "Sincronizar Arquitectura"}
        </button>
      </header>

      {/* Selector de Pestañas Elite (V50.0) */}
      <div style={{ background: 'rgba(6,11,20,0.5)', display: 'flex', gap: '3.5rem', padding: '0 3.5rem', borderBottom: '1px solid rgba(255,255,255,0.03)', overflowX: 'auto' }}>
        {[
          { id: 'identidad', label: 'IDENTIDAD', icon: <FiStar /> },
          { id: 'cerebro', label: 'MODULARIDAD AI', icon: <FiCpu /> },
          { id: 'entrenamiento', label: 'BASE DE CONOCIMIENTO', icon: <FiDatabase /> },
          { id: 'despliegue', label: 'CANALES & CÓDIGO', icon: <FiCode /> }
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            style={{ 
              padding: '1.5rem 0', background: 'none', border: 'none', 
              color: activeTab === tab.id ? '#D4AF37' : 'rgba(255,255,255,0.3)', 
              fontWeight: 900, fontSize: '0.7rem', cursor: 'pointer', letterSpacing: '2px',
              borderBottom: activeTab === tab.id ? '2px solid #D4AF37' : '2px solid transparent',
              display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.4s',
              opacity: activeTab === tab.id ? 1 : 0.6
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Área de Trabajo Split Screen (V50.0) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 500px', flex: 1, overflow: 'hidden' }}>

        {/* Panel de Contenido Principal (Scrollable) */}
        <div style={{ padding: '3.5rem', overflowY: 'auto', background: 'radial-gradient(circle at top left, rgba(212,175,55,0.03) 0%, transparent 70%)' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

            {/* PESTAÑA 1: IDENTIDAD ESTRATÉGICA */}
            {activeTab === 'identidad' && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <h3 className="text-cinematic" style={{ fontSize: '2rem', marginBottom: '2.5rem' }}>Perfil de la Entidad</h3>
                <div className="card-elite" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, opacity: 0.4, marginBottom: '1rem', letterSpacing: '1.5px' }}>IDENTIFICADOR DEL AGENTE</label>
                      <input 
                        value={botData.name} onChange={e => setBotData({...botData, name: e.target.value})}
                        style={{ width: '100%', padding: '18px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '15px', color: 'white', fontSize: '1.1rem', fontWeight: 600, outline: 'none' }} 
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, opacity: 0.4, marginBottom: '1rem', letterSpacing: '1.5px' }}>ROL OPERATIVO</label>
                      <input 
                        value={botData.description} onChange={e => setBotData({...botData, description: e.target.value})}
                        placeholder="Ej: Arquitecto de Ventas Elite"
                        style={{ width: '100%', padding: '18px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '15px', color: 'white', fontSize: '1rem', outline: 'none' }} 
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, opacity: 0.4, marginBottom: '1rem', letterSpacing: '1.5px' }}>CENTRO DE ALERTAS (EMAIL)</label>
                    <input 
                      type="email" value={botData.emailAlertsTo} onChange={e => setBotData({...botData, emailAlertsTo: e.target.value})}
                      placeholder="alertas@tudominio.ai"
                      style={{ width: '100%', padding: '18px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '15px', color: 'white', fontSize: '1rem', outline: 'none' }} 
                    />
                    <p style={{ marginTop: '1rem', fontSize: '0.75rem', opacity: 0.4 }}>Stratix enviará una Alerta Elite cada vez que se detecte un lead HOT.</p>
                  </div>
                </div>

                {/* Sección de Leads Integrada */}
                {leads.length > 0 && (
                  <div style={{ marginTop: '4rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                      <h3 className="text-cinematic" style={{ fontSize: '1.5rem' }}>Análisis de Conversión</h3>
                      <button onClick={handleExportCSV} className="card-elite" style={{ padding: '8px 16px', fontSize: '0.8rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '8px', cursor: 'pointer', fontWeight: 800 }}>EXPORTAR CSV</button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                        <div className="card-elite" style={{ padding: '2rem', background: 'rgba(0,0,0,0.2)', height: '250px' }}>
                           <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie data={[
                                  { name: 'Hot', value: leads.filter(l => l.score === 'Hot').length, color: '#D4AF37' },
                                  { name: 'Warm', value: leads.filter(l => l.score === 'Warm').length, color: '#FCD34D' },
                                  { name: 'Cold', value: leads.filter(l => l.score === 'Cold').length, color: '#9CA3AF' }
                                ]} dataKey="value" cx="50%" cy="50%" innerRadius={60} outerRadius={80}>
                                   <Cell fill="#D4AF37" /><Cell fill="#FCD34D" /><Cell fill="#9CA3AF" />
                                </Pie>
                                <Tooltip contentStyle={{ background: '#0B1120', border: '1px solid rgba(212,175,55,0.3)' }} />
                              </PieChart>
                           </ResponsiveContainer>
                        </div>
                        <div className="card-elite" style={{ padding: '1.5rem', overflowY: 'auto', maxHeight: '250px' }}>
                            <table style={{ width: '100%', fontSize: '0.8rem', borderCollapse: 'collapse' }}>
                               <thead><tr style={{ opacity: 0.4 }}><th>NOMBRE</th><th>SCORE</th></tr></thead>
                               <tbody>
                                  {leads.slice(0, 10).map(l => (
                                    <tr key={l.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                      <td style={{ padding: '10px 0' }}>{l.name}</td>
                                      <td><span style={{ color: l.score === 'Hot' ? '#D4AF37' : 'inherit' }}>{l.score}</span></td>
                                    </tr>
                                  ))}
                               </tbody>
                            </table>
                        </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* PESTAÑA 2: MODULARIDAD AI (CEREBRO) */}
            {activeTab === 'cerebro' && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <h3 className="text-cinematic" style={{ fontSize: '2rem', marginBottom: '2.5rem' }}>Arquitectura Cognitiva</h3>
                <div className="card-elite" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, opacity: 0.4, marginBottom: '1.2rem', letterSpacing: '1.5px' }}>NÚCLEO DE PERSONALIDAD (SYSTEM PROMPT)</label>
                    <textarea 
                      value={botData.systemPrompt} onChange={e => setBotData({...botData, systemPrompt: e.target.value})}
                      style={{ width: '100%', minHeight: '300px', padding: '25px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '20px', color: 'white', lineHeight: '1.8', fontSize: '1.05rem', outline: 'none' }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, opacity: 0.4, marginBottom: '1.2rem', letterSpacing: '1.5px' }}>MOTOR DE INTELIGENCIA</label>
                      <select 
                        value={botData.model} onChange={e => setBotData({...botData, model: e.target.value})}
                        style={{ width: '100%', padding: '16px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#D4AF37', fontWeight: 900 }}
                      >
                        <option value="gemini">Gemini 2.0 Flash (Principal)</option>
                        <option value="gpt">GPT-3.5 Turbo (Backup)</option>
                        <option value="groq">Llama 3.1 8B - Groq (GRATIS)</option>
                        <option value="mistral">Mistral Small (GRATIS)</option>
                      </select>
                      <p style={{ fontSize: '0.7rem', opacity: 0.5, marginTop: '0.5rem' }}>
                        Si falla uno, automáticamente responde otro
                      </p>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, opacity: 0.4, marginBottom: '1.5rem', letterSpacing: '1.5px' }}>TEMPERATURA</label>
                      <input 
                        type="range" min="0" max="1" step="0.1" value={botData.temperature}
                        onChange={e => setBotData({...botData, temperature: parseFloat(e.target.value)})}
                        style={{ width: '100%', accentColor: '#D4AF37' }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* PESTAÑA 3: ENTRENAMIENTO (RAG) */}
            {activeTab === 'entrenamiento' && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                  <h3 className="text-cinematic" style={{ fontSize: '2rem' }}>Memoria Profunda (RAG)</h3>
                  <button onClick={handleSyncKnowledge} className="card-elite glow-gold" style={{ padding: '12px 24px', background: '#D4AF37', color: '#000', borderRadius: '12px', fontWeight: 900, border: 'none' }}>
                    {isSyncing ? "PROCESANDO..." : "SINCRONIZAR NÚCLEO"}
                  </button>
                </div>
                
                <div className="card-elite" style={{ padding: '2.5rem', marginBottom: '3rem', background: 'rgba(212,175,55,0.03)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                    <FiActivity color="#D4AF37" />
                    <span style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: '1px' }}>NIVELES DE CONSCIENCIA NEURAL</span>
                  </div>
                  <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                    <div style={{ width: knowledgeBase ? '100%' : '15%', height: '100%', background: '#D4AF37' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', marginBottom: '3rem' }}>
                  <div className="card-elite" style={{ padding: '2rem' }}>
                    <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, opacity: 0.4, marginBottom: '1rem' }}>URL DE ABSORCIÓN</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <input value={crawlerUrl} onChange={e => setCrawlerUrl(e.target.value)} style={{ flex: 1, padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', color: 'white' }} />
                      <button onClick={handleCrawlUrl} style={{ background: '#D4AF37', border: 'none', borderRadius: '8px', padding: '0 15px' }}><FiGlobe /></button>
                    </div>
                  </div>
                  <div className="card-elite" style={{ padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <label style={{ cursor: 'pointer', color: '#D4AF37', fontWeight: 900 }}><FiPlus /> SUBIR PDF CORPORATIVO <input type="file" onChange={handleFileUpload} style={{ display: 'none' }} /></label>
                  </div>
                </div>

                <div className="card-elite" style={{ padding: '2rem' }}>
                  <textarea 
                    value={knowledgeBase} onChange={e => setKnowledgeBase(e.target.value)}
                    style={{ width: '100%', minHeight: '300px', background: 'transparent', border: 'none', color: 'white', outline: 'none', fontSize: '1rem', lineHeight: '1.8' }}
                  />
                </div>
              </motion.div>
            )}

            {/* PESTAÑA 4: DESPLIEGUE */}
            {activeTab === 'despliegue' && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <h3 className="text-cinematic" style={{ fontSize: '2rem', marginBottom: '3rem' }}>Protocolos de Salida</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                  <div className="card-elite" style={{ padding: '3rem', border: '1px solid rgba(37,211,102,0.2)' }}>
                    <FiMessageCircle size={30} color="#25D366" style={{ marginBottom: '1.5rem' }} />
                    <h4 style={{ fontWeight: 900 }}>WHATSAPP API</h4>
                    <div style={{ marginTop: '2rem' }}>
                      <label style={{ fontSize: '0.65rem', opacity: 0.4 }}>PHONE NUMBER ID</label>
                      <input value={botData.whatsappPhoneId} onChange={e => setBotData({...botData, whatsappPhoneId: e.target.value})} style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: 'none', borderRadius: '8px', color: 'white', marginTop: '5px' }} />
                    </div>
                  </div>
                  <div className="card-elite" style={{ padding: '3rem', border: '1px solid rgba(212,175,55,0.2)' }}>
                    <FiLayout size={30} color="#D4AF37" style={{ marginBottom: '1.5rem' }} />
                    <h4 style={{ fontWeight: 900 }}>WIDGET WEB</h4>
                    <code style={{ display: 'block', background: '#000', padding: '1rem', borderRadius: '8px', marginTop: '2rem', fontSize: '0.75rem', color: '#D4AF37' }}>
                      {`<script src="/widget.js" data-bot-id="${id}"></script>`}
                    </code>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Playground */}
        <div style={{ background: '#03070E', display: 'flex', flexDirection: 'column', borderLeft: '1px solid rgba(255,255,255,0.05)' }}>
           <div style={{ padding: '1.5rem', background: 'rgba(6,11,20,0.8)', borderBottom: '1px solid rgba(255,255,255,0.03)', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#D4AF37', letterSpacing: '2px' }}>NEURAL PLAYGROUND</span>
              <FiShield size={16} style={{ opacity: 0.3 }} />
           </div>
           <div ref={scrollRef} style={{ flex: 1, padding: '2rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {chatMessages.map((msg, i) => (
                <div key={i} style={{ alignSelf: msg.role === "user" ? "flex-end" : "flex-start", background: msg.role === "user" ? "#D4AF37" : "rgba(255,255,255,0.05)", color: msg.role === "user" ? "#000" : "white", padding: '1rem 1.5rem', borderRadius: '15px' }}>{msg.content}</div>
              ))}
              {isTyping && <div style={{ fontSize: '0.7rem', opacity: 0.4 }}>Stratix procesando...</div>}
           </div>
           <form onSubmit={handleSendMessage} style={{ padding: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '15px' }}>
              <input value={inputMessage} onChange={e => setInputMessage(e.target.value)} placeholder="Inyectar mensaje..." style={{ flex: 1, padding: '15px', background: 'rgba(255,255,255,0.03)', border: 'none', borderRadius: '12px', color: 'white' }} />
              <button type="submit" style={{ background: '#D4AF37', border: 'none', borderRadius: '12px', padding: '0 20px' }}><FiSend color="#000" /></button>
           </form>
        </div>
      </div>
      <Toaster theme="dark" richColors />
    </div>
  );
}