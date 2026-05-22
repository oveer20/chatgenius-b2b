"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import {
  FiArrowLeft, FiSave, FiDatabase, FiCpu, FiRefreshCw,
  FiSend, FiZap, FiCode, FiGlobe, FiStar, FiLayout, FiShield, FiInfo,
  FiActivity, FiPlus, FiMessageCircle
} from "react-icons/fi";
import { supabase } from "@/lib/supabase";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
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
    isActive: true,
  });
  const [botStatus, setBotStatus] = useState<'active' | 'inactive' | 'loading'>('loading');
  const [leads, setLeads] = useState<{id: string; name?: string; email?: string; phone?: string; intent?: string; score?: string; created_at: string}[]>([]);
  const [isCrawling, setIsCrawling] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", content: "¡Sistema en línea! Soy tu activo de IA estratégica. ¿Qué vamos a probar hoy?" }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [knowledgeBase, setKnowledgeBase] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeTab, setActiveTab] = useState<'identidad' | 'cerebro' | 'entrenamiento' | 'despliegue'>('identidad');
  const [crawlerUrl, setCrawlerUrl] = useState("");
  const [showToken, setShowToken] = useState(false);
  const [isTogglingStatus, setIsTogglingStatus] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages, isTyping]);

  useEffect(() => {
    async function loadBot() {
      if (isNew) { setBotStatus('inactive'); return; }
      const { data } = await supabase.from("bots").select("*").eq("id", id).single();
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
          isActive: data.is_active !== undefined ? data.is_active : true,
        });
        setKnowledgeBase(data.knowledge_base || "");
        setBotStatus(data.is_active === false ? 'inactive' : 'active');
      }
    }
    loadBot();
    const interval = setInterval(loadBot, 30000);
    return () => clearInterval(interval);
  }, [id, isNew]);

  useEffect(() => {
    async function loadLeads() {
      if (isNew) return;
      const { data } = await supabase
        .from("leads")
        .select("*")
        .eq("bot_id", id)
        .order("created_at", { ascending: false });
      if (data) setLeads(data);
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
        is_active: botStatus === 'active',
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
    } catch (err) {
      alert("Error en la arquitectura: " + (err as Error).message);
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
    } catch (err) {
      alert("Fallo en la sincronización RAG: " + (err as Error).message);
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
    } catch (err) {
      alert("Fallo en la asimilación: " + (err as Error).message);
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
    } catch (err) {
      alert("Fallo al escanear sitio web: " + (err as Error).message);
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

  const handleToggleStatus = async () => {
    if (isNew || isTogglingStatus) return;
    setIsTogglingStatus(true);
    const newStatus = botStatus === 'active' ? false : true;
    try {
      const { error } = await supabase.from("bots").update({ is_active: newStatus }).eq("id", id);
      if (error) throw error;
      setBotStatus(newStatus ? 'active' : 'inactive');
    } catch (err) {
      alert("Error: " + (err as Error).message);
    } finally {
      setIsTogglingStatus(false);
    }
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
    <div className="bg-bg h-screen flex flex-col text-white font-sans">
      {/* Status Bar Elite (V50.0) */}
      <div className="bg-black/40 px-10 py-[0.6rem] flex gap-10 border-b border-accent/10 text-[0.65rem] tracking-[1px]">
        <div className="text-accent font-black flex items-center gap-1.5"><FiZap /> NÚCLEO STRATIX ACTIVADO</div>
        <div className="opacity-50">OPAL LOGIC: <span className="text-emerald-500 font-extrabold">ESTABLE</span></div>
        <div className="opacity-50">LATENCIA NEURAL: <span className="text-emerald-500 font-extrabold">18ms</span></div>
        <div className="ml-auto opacity-40">V50.0 GOLDEN RELEASE</div>
      </div>

      {/* Header del Editor Elite */}
      <header className="p-6 px-10 flex justify-between items-center bg-bg/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-6">
          <button onClick={() => router.push("/dashboard")} className="card-elite bg-white/[0.03] border border-white/10 text-white p-[10px] rounded-md cursor-pointer transition-all duration-200">
            <FiArrowLeft size={18} />
          </button>
          <div>
            <h2 className="text-cinematic text-2xl m-0">{isNew ? "Nueva Entidad de IA" : botData.name}</h2>
            <div className="flex items-center gap-2.5 mt-1">
              <span className="text-[0.65rem] text-accent font-black bg-accent/10 px-2 py-0.5 rounded-xs tracking-[1px]">ID: {id}</span>
              {!isNew && (
                <button
                  onClick={handleToggleStatus}
                  disabled={isTogglingStatus || botStatus === 'loading'}
                  className={`flex items-center gap-1.5 text-[0.65rem] font-extrabold tracking-[1px] px-2 py-0.5 rounded-xs border-none cursor-pointer transition-all duration-200 ${
                    botStatus === 'active'
                      ? 'bg-emerald-500/15 text-emerald-500'
                      : 'bg-red-500/15 text-red-500'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current inline-block" />
                  {botStatus === 'loading' ? '...' : botStatus === 'active' ? 'ACTIVO' : 'INACTIVO'}
                  {isTogglingStatus ? '...' : ''}
                </button>
              )}
              <span className="text-[0.65rem] opacity-40 font-bold">Protocolo de Inteligencia Activo</span>
            </div>
          </div>
        </div>
        <button
          onClick={handleSave}
          className="card-elite glow-gold py-3 px-7 bg-accent text-black rounded-[14px] font-black text-[0.9rem] flex items-center gap-2.5 border-none cursor-pointer transition-all duration-200"
        >
          {isSaving ? <FiRefreshCw className="spin" /> : <FiSave />}
          {isSaving ? "Sincronizando..." : "Sincronizar Arquitectura"}
        </button>
      </header>

      {/* Selector de Pestañas Elite (V50.0) */}
      <div className="bg-bg/50 flex gap-14 px-14 border-b border-white/5 overflow-x-auto">
        {[
          { id: 'identidad', label: 'IDENTIDAD', icon: <FiStar /> },
          { id: 'cerebro', label: 'MODULARIDAD AI', icon: <FiCpu /> },
          { id: 'entrenamiento', label: 'BASE DE CONOCIMIENTO', icon: <FiDatabase /> },
          { id: 'despliegue', label: 'CANALES & CÓDIGO', icon: <FiCode /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-6 bg-none border-none font-black text-[0.7rem] cursor-pointer tracking-[2px] flex items-center gap-2.5 transition-all duration-200 border-b-2 ${
              activeTab === tab.id
                ? 'text-accent border-b-accent opacity-100'
                : 'text-white/30 border-b-transparent opacity-60'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Área de Trabajo Split Screen (V50.0) */}
      <div className="grid grid-cols-[1fr_500px] flex-1 overflow-hidden">

        {/* Panel de Contenido Principal (Scrollable) */}
        <div className="p-14 overflow-y-auto" style={{ background: 'radial-gradient(circle at top left, rgba(212,175,55,0.03) 0%, transparent 70%)' }}>
          <div className="mx-auto max-w-[1000px]">

            {/* PESTAÑA 1: IDENTIDAD ESTRATÉGICA */}
            {activeTab === 'identidad' && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <h3 className="text-cinematic text-3xl mb-10">Perfil de la Entidad</h3>
                <div className="card-elite p-12 flex flex-col gap-10">
                  <div className="grid grid-cols-2 gap-10">
                    <div>
                      <label className="block text-[0.7rem] font-black opacity-40 mb-4 tracking-[1.5px]">IDENTIFICADOR DEL AGENTE</label>
                      <input
                        value={botData.name} onChange={e => setBotData({...botData, name: e.target.value})}
                        className="w-full p-[18px] bg-black/40 border border-white/5 rounded-[15px] text-white text-[1.1rem] font-semibold outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[0.7rem] font-black opacity-40 mb-4 tracking-[1.5px]">ROL OPERATIVO</label>
                      <input
                        value={botData.description} onChange={e => setBotData({...botData, description: e.target.value})}
                        placeholder="Ej: Arquitecto de Ventas Elite"
                        className="w-full p-[18px] bg-black/40 border border-white/5 rounded-[15px] text-white text-base outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[0.7rem] font-black opacity-40 mb-4 tracking-[1.5px]">CENTRO DE ALERTAS (EMAIL)</label>
                    <input
                      type="email" value={botData.emailAlertsTo} onChange={e => setBotData({...botData, emailAlertsTo: e.target.value})}
                      placeholder="alertas@tudominio.ai"
                      className="w-full p-[18px] bg-black/40 border border-white/5 rounded-[15px] text-white text-base outline-none"
                    />
                    <p className="mt-4 text-xs opacity-40">Stratix enviará una Alerta Elite cada vez que se detecte un lead HOT.</p>
                  </div>
                </div>

                {/* Sección de Leads Integrada */}
                {leads.length > 0 && (
                  <div className="mt-16">
                    <div className="flex justify-between items-center mb-10">
                      <h3 className="text-cinematic text-2xl">Análisis de Conversión</h3>
                      <button onClick={handleExportCSV} className="card-elite px-4 py-2 text-[0.8rem] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-sm cursor-pointer font-extrabold">EXPORTAR CSV</button>
                    </div>
                    <div className="grid grid-cols-2 gap-8 mb-8">
                        <div className="card-elite p-8 bg-black/20 h-[250px]">
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
                        <div className="card-elite p-6 overflow-y-auto max-h-[250px]">
                            <table className="w-full text-[0.8rem] border-collapse">
                               <thead><tr className="opacity-40"><th>NOMBRE</th><th>SCORE</th></tr></thead>
                               <tbody>
                                  {leads.slice(0, 10).map(l => (
                                    <tr key={l.id} className="border-b border-white/5">
                                      <td className="py-[10px]">{l.name}</td>
                                      <td><span className={l.score === 'Hot' ? 'text-accent' : ''}>{l.score}</span></td>
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
                <h3 className="text-cinematic text-3xl mb-10">Arquitectura Cognitiva</h3>
                <div className="card-elite p-12 flex flex-col gap-12">
                  <div>
                    <label className="block text-[0.7rem] font-black opacity-40 mb-[1.2rem] tracking-[1.5px]">NÚCLEO DE PERSONALIDAD (SYSTEM PROMPT)</label>
                    <textarea
                      value={botData.systemPrompt} onChange={e => setBotData({...botData, systemPrompt: e.target.value})}
                      className="w-full min-h-[300px] p-[25px] bg-black/50 border border-accent/10 rounded-xl text-white leading-[1.8] text-[1.05rem] outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-[1.2fr_0.8fr] gap-12">
                    <div>
                      <label className="block text-[0.7rem] font-black opacity-40 mb-[1.2rem] tracking-[1.5px]">MOTOR DE INTELIGENCIA</label>
                      <select
                        value={botData.model} onChange={e => setBotData({...botData, model: e.target.value})}
                        className="w-full p-4 bg-black/40 border border-white/10 rounded-md text-accent font-black"
                      >
                        <option value="gemini">Gemini 2.0 Flash (Principal)</option>
                        <option value="gpt">GPT-3.5 Turbo (Backup)</option>
                        <option value="groq">Llama 3.1 8B - Groq (GRATIS)</option>
                        <option value="mistral">Mistral Small (GRATIS)</option>
                      </select>
                      <p className="text-[0.7rem] opacity-50 mt-2">
                        Si falla uno, automáticamente responde otro
                      </p>
                    </div>
                    <div>
                      <label className="block text-[0.7rem] font-black opacity-40 mb-6 tracking-[1.5px]">TEMPERATURA</label>
                      <input
                        type="range" min="0" max="1" step="0.1" value={botData.temperature}
                        onChange={e => setBotData({...botData, temperature: parseFloat(e.target.value)})}
                        className="w-full accent-[#D4AF37]"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* PESTAÑA 3: ENTRENAMIENTO (RAG) */}
            {activeTab === 'entrenamiento' && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="flex justify-between items-center mb-12">
                  <h3 className="text-cinematic text-3xl">Memoria Profunda (RAG)</h3>
                  <button onClick={handleSyncKnowledge} className="card-elite glow-gold py-3 px-6 bg-accent text-black rounded-md font-black border-none">
                    {isSyncing ? "PROCESANDO..." : "SINCRONIZAR NÚCLEO"}
                  </button>
                </div>

                <div className="card-elite p-10 mb-12 bg-accent/[0.03]">
                  <div className="flex items-center gap-2.5 mb-6">
                    <FiActivity color="#D4AF37" />
                    <span className="text-xs font-black tracking-[1px]">NIVELES DE CONSCIENCIA NEURAL</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-[10px] overflow-hidden">
                    <div className={`h-full bg-accent ${knowledgeBase ? 'w-full' : 'w-[15%]'}`} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-10 mb-12">
                  <div className="card-elite p-8">
                    <label className="block text-[0.7rem] font-black opacity-40 mb-4">URL DE ABSORCIÓN</label>
                    <div className="flex gap-2.5">
                      <input value={crawlerUrl} onChange={e => setCrawlerUrl(e.target.value)} className="flex-1 p-3 bg-black/30 border border-white/5 rounded-sm text-white" />
                      <button onClick={handleCrawlUrl} className="bg-accent border-none rounded-sm px-[15px]"><FiGlobe /></button>
                    </div>
                  </div>
                  <div className="card-elite p-8 flex items-center justify-center">
                     <label className="cursor-pointer text-accent font-black"><FiPlus /> SUBIR PDF CORPORATIVO <input type="file" onChange={handleFileUpload} className="hidden" /></label>
                  </div>
                </div>

                <div className="card-elite p-8">
                  <textarea
                    value={knowledgeBase} onChange={e => setKnowledgeBase(e.target.value)}
                    className="w-full min-h-[300px] bg-transparent border-none text-white outline-none text-base leading-[1.8]"
                  />
                </div>
              </motion.div>
            )}

            {/* PESTAÑA 4: DESPLIEGUE */}
            {activeTab === 'despliegue' && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <h3 className="text-cinematic text-3xl mb-12">Protocolos de Salida</h3>
                <div className="grid grid-cols-2 gap-12">
                  <div className="card-elite p-12" style={{ border: '1px solid rgba(37,211,102,0.2)' }}>
                    <FiMessageCircle size={30} color="#25D366" className="mb-6" />
                    <h4 className="font-black">WHATSAPP API</h4>
                    <div className="mt-8">
                      <div>
                      <label className="text-[0.65rem] opacity-40">WHATSAPP TOKEN</label>
                      <div className="flex items-center gap-2 mt-[5px]">
                        <input type={showToken ? 'text' : 'password'} value={botData.whatsappToken} onChange={e => setBotData({...botData, whatsappToken: e.target.value})} className="flex-1 p-3 bg-black/30 border-none rounded-sm text-white" />
                        <button onClick={() => setShowToken(!showToken)} className="bg-white/5 border-none rounded-sm p-[10px] cursor-pointer text-accent">
                          {showToken ? <FiShield size={14} /> : <FiInfo size={14} />}
                        </button>
                      </div>
                      <p className="text-[0.65rem] opacity-30 mt-1">{showToken ? 'Ocultar' : 'Mostrar'} token</p>
                    </div>
                    </div>
                  </div>
                  <div className="card-elite p-12 border border-accent/20">
                    <FiLayout size={30} color="#D4AF37" className="mb-6" />
                    <h4 className="font-black">WIDGET WEB</h4>
                    <code className="block bg-black p-4 rounded-sm mt-8 text-xs text-accent">
                      {`<script src="/widget.js" data-bot-id="${id}"></script>`}
                    </code>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Playground */}
        <div className="bg-[#03070E] flex flex-col border-l border-white/5">
           <div className="p-6 bg-bg/80 border-b border-white/5 flex justify-between">
              <span className="text-xs font-black text-accent tracking-[2px]">NEURAL PLAYGROUND</span>
              <FiShield size={16} className="opacity-30" />
           </div>
           <div ref={scrollRef} className="flex-1 p-8 overflow-y-auto flex flex-col gap-6">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`${msg.role === "user" ? "self-end bg-accent text-black" : "self-start bg-white/5 text-white"} p-4 px-6 rounded-[15px]`}>{msg.content}</div>
              ))}
              {isTyping && <div className="text-[0.7rem] opacity-40">Stratix procesando...</div>}
           </div>
           <form onSubmit={handleSendMessage} className="p-8 border-t border-white/5 flex gap-[15px]">
              <input value={inputMessage} onChange={e => setInputMessage(e.target.value)} placeholder="Inyectar mensaje..." className="flex-1 p-[15px] bg-white/[0.03] border-none rounded-md text-white" />
              <button type="submit" className="bg-accent border-none rounded-md px-5"><FiSend color="#000" /></button>
           </form>
        </div>
      </div>
      <Toaster theme="dark" richColors />
    </div>
  );
}
