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
import { toast } from 'sonner';

export default function BotEditor() {
  const { id } = useParams();
  const router = useRouter();

  const [botData, setBotData] = useState({
    name: "Cargando...",
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
  }, [id]);

  useEffect(() => {
    async function loadLeads() {
      const { data } = await supabase
        .from("leads")
        .select("*")
        .eq("bot_id", id)
        .order("created_at", { ascending: false });
      if (data) setLeads(data);
    }
    loadLeads();
  }, [id]);

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

      const { error: err } = await supabase.from("bots").update(payload).eq("id", id);

      if (err) throw err;
      toast.success("Agente guardado correctamente");
    } catch (err) {
      toast.error("Error al guardar: " + (err as Error).message);
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
        toast.success(`${data.chunks_count} fragmentos sincronizados`);
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      toast.error("Error de sincronización: " + (err as Error).message);
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
        toast.success("Documento procesado correctamente");
        if (data.text) setKnowledgeBase(prev => prev + "\n\n--- DOCUMENTO ABSORBIDO ---\n" + data.text);
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      toast.error("Error al procesar: " + (err as Error).message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCrawlUrl = async () => {
    if (!crawlerUrl || !crawlerUrl.startsWith("http")) {
      toast.error("Ingresa una URL válida (http/https)");
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
        toast.success(`${data.chunks} vectores de conocimiento generados`);
        if (data.textSegment) {
          setKnowledgeBase(prev => prev + `\n\n--- SITE: ${crawlerUrl} ---\n` + data.textSegment + "\n[...]");
        }
        setCrawlerUrl("");
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      toast.error("Error al escanear: " + (err as Error).message);
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
    if (isTogglingStatus) return;
    setIsTogglingStatus(true);
    const newStatus = botStatus === 'active' ? false : true;
    try {
      const { error } = await supabase.from("bots").update({ is_active: newStatus }).eq("id", id);
      if (error) throw error;
      setBotStatus(newStatus ? 'active' : 'inactive');
    } catch (err) {
      toast.error("Error: " + (err as Error).message);
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
    } catch {
      setChatMessages(prev => [...prev, { role: "assistant", content: "⚠️ Error de conexión con el núcleo de IA." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="bg-bg h-screen flex flex-col text-white font-sans">
      {/* Status Bar */}
      <div className="bg-white/3 border-b border-white/5 px-8 py-2 flex items-center gap-6 text-xs text-text-muted">
        <span className="flex items-center gap-1.5 text-accent font-semibold"><FiZap /> Núcleo Activo</span>
        <span>Opal Logic: <span className="text-emerald-500 font-semibold">Estable</span></span>
        <span className="ml-auto">Latencia: <span className="text-emerald-500 font-semibold">18ms</span></span>
      </div>

      {/* Header */}
      <header className="px-8 py-4 flex justify-between items-center bg-bg/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push("/dashboard")} className="bg-white/5 border border-white/10 text-text-primary p-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-white/10">
            <FiArrowLeft size={18} />
          </button>
          <div>
            <h2 className="font-serif text-2xl">{botData.name}</h2>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-accent font-semibold bg-accent-dim px-2 py-0.5 rounded">ID: {id?.toString().slice(0, 8)}</span>
              <button
                onClick={handleToggleStatus}
                disabled={isTogglingStatus || botStatus === 'loading'}
                className={`flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded border-none cursor-pointer transition-all duration-200 ${
                  botStatus === 'active'
                    ? 'bg-emerald-500/10 text-emerald-500'
                    : 'bg-red-500/10 text-red-500'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current inline-block" />
                {botStatus === 'loading' ? '...' : botStatus === 'active' ? 'Activo' : 'Inactivo'}
                {isTogglingStatus ? '...' : ''}
              </button>
            </div>
          </div>
        </div>
        <button
          onClick={handleSave}
          className="py-2.5 px-5 bg-accent text-black rounded-xl font-bold text-sm flex items-center gap-2 border-none cursor-pointer transition-all duration-200 hover:scale-105"
        >
          {isSaving ? <FiRefreshCw className="animate-spin" /> : <FiSave />}
          {isSaving ? "Guardando..." : "Guardar"}
        </button>
      </header>

      {/* Tab Selector */}
      <div className="bg-bg/50 flex gap-8 px-8 border-b border-white/5 overflow-x-auto">
        {[
          { id: 'identidad', label: 'Identidad', icon: <FiStar /> },
          { id: 'cerebro', label: 'Cerebro IA', icon: <FiCpu /> },
          { id: 'entrenamiento', label: 'Conocimiento', icon: <FiDatabase /> },
          { id: 'despliegue', label: 'Canales', icon: <FiCode /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-4 bg-none border-none text-xs font-semibold cursor-pointer flex items-center gap-2 transition-all duration-200 border-b-2 ${
              activeTab === tab.id
                ? 'text-accent border-b-accent'
                : 'text-text-muted border-b-transparent hover:text-text-primary'
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
                <h3 className="font-serif text-3xl mb-10">Perfil del Agente</h3>
                <div className="bg-bg/60 border border-white/10 backdrop-blur-xl rounded-xl p-8 flex flex-col gap-8">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs font-semibold text-text-muted mb-2 uppercase tracking-wider">Nombre del Agente</label>
                      <input
                        value={botData.name} onChange={e => setBotData({...botData, name: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-base font-semibold outline-none focus:border-accent/30 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-text-muted mb-2 uppercase tracking-wider">Descripción</label>
                      <input
                        value={botData.description} onChange={e => setBotData({...botData, description: e.target.value})}
                        placeholder="Ej: Asesor de ventas"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-base outline-none focus:border-accent/30 transition-all duration-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-text-muted mb-2 uppercase tracking-wider">Email para Alertas</label>
                    <input
                      type="email" value={botData.emailAlertsTo} onChange={e => setBotData({...botData, emailAlertsTo: e.target.value})}
                      placeholder="alertas@tudominio.ai"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-base outline-none focus:border-accent/30 transition-all duration-200"
                    />
                    <p className="mt-2 text-xs text-text-muted">Stratix enviará una alerta cuando se detecte un lead HOT.</p>
                  </div>
                </div>

                {/* Sección de Leads Integrada */}
                {leads.length > 0 && (
                  <div className="mt-16">
                    <div className="flex justify-between items-center mb-10">
                      <h3 className="font-serif text-2xl">Análisis de Conversión</h3>
                      <button onClick={handleExportCSV} className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-lg px-4 py-2 text-xs font-semibold cursor-pointer transition-all duration-200 hover:scale-105">Exportar CSV</button>
                    </div>
                    <div className="grid grid-cols-2 gap-8 mb-8">
                        <div className="bg-bg/60 border border-white/10 backdrop-blur-xl rounded-xl p-6 h-[250px]">
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
                        <div className="bg-bg/60 border border-white/10 backdrop-blur-xl rounded-xl p-6 overflow-y-auto max-h-[250px]">
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
                <h3 className="font-serif text-3xl mb-10">Arquitectura del Agente</h3>
                <div className="bg-bg/60 border border-white/10 backdrop-blur-xl rounded-xl p-8 flex flex-col gap-8">
                  <div>
                    <label className="block text-xs font-semibold text-text-muted mb-2 uppercase tracking-wider">System Prompt (Personalidad)</label>
                    <textarea
                      value={botData.systemPrompt} onChange={e => setBotData({...botData, systemPrompt: e.target.value})}
                      className="w-full min-h-[300px] p-5 bg-white/5 border border-white/10 rounded-xl text-white leading-relaxed text-base outline-none focus:border-accent/30 transition-all duration-200"
                    />
                  </div>
                  <div className="grid grid-cols-[1.2fr_0.8fr] gap-8">
                    <div>
                      <label className="block text-xs font-semibold text-text-muted mb-2 uppercase tracking-wider">Motor de IA</label>
                      <select
                        value={botData.model} onChange={e => setBotData({...botData, model: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-accent font-semibold outline-none focus:border-accent/30 transition-all duration-200"
                      >
                        <option value="gemini">Gemini 2.0 Flash (Principal)</option>
                        <option value="gpt">GPT-3.5 Turbo (Backup)</option>
                        <option value="groq">Llama 3.1 8B - Groq (GRATIS)</option>
                        <option value="mistral">Mistral Small (GRATIS)</option>
                      </select>
                      <p className="text-xs text-text-muted mt-2">
                        Si falla uno, otro responde automáticamente
                      </p>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-text-muted mb-3 uppercase tracking-wider">Temperatura</label>
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
                  <h3 className="font-serif text-3xl">Base de Conocimiento</h3>
                  <button onClick={handleSyncKnowledge} className="py-2.5 px-5 bg-accent text-black rounded-xl font-bold text-sm border-none transition-all duration-200 hover:scale-105">
                    {isSyncing ? "Procesando..." : "Sincronizar"}
                  </button>
                </div>

                <div className="bg-bg/60 border border-white/10 backdrop-blur-xl rounded-xl p-6 mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <FiActivity className="text-accent" />
                    <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Progreso del Conocimiento</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full bg-accent transition-all duration-500 ${knowledgeBase ? 'w-full' : 'w-[15%]'}`} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-bg/60 border border-white/10 backdrop-blur-xl rounded-xl p-6">
                    <label className="block text-xs font-semibold text-text-muted mb-3 uppercase tracking-wider">URL para Escanear</label>
                    <div className="flex gap-2">
                      <input value={crawlerUrl} onChange={e => setCrawlerUrl(e.target.value)} placeholder="https://ejemplo.com" className="flex-1 px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm outline-none focus:border-accent/30 transition-all duration-200" />
                      <button onClick={handleCrawlUrl} disabled={isCrawling} className="bg-accent border-none rounded-lg px-4 text-sm font-semibold text-black disabled:opacity-50 transition-all duration-200 hover:scale-105">{isCrawling ? "..." : <FiGlobe />}</button>
                    </div>
                  </div>
                  <div className="bg-bg/60 border border-white/10 backdrop-blur-xl rounded-xl p-6 flex items-center justify-center">
                    <label className="cursor-pointer text-accent font-semibold text-sm disabled:opacity-50 transition-all duration-200 hover:scale-105">
                      {isUploading ? "Subiendo..." : <><FiPlus className="inline mr-1" /> Subir PDF</>}
                      <input type="file" onChange={handleFileUpload} className="hidden" disabled={isUploading} />
                    </label>
                  </div>
                </div>

                <div className="bg-bg/60 border border-white/10 backdrop-blur-xl rounded-xl p-6">
                  <textarea
                    value={knowledgeBase} onChange={e => setKnowledgeBase(e.target.value)}
                    className="w-full min-h-[300px] bg-transparent border-none text-white outline-none text-base leading-relaxed resize-none"
                    placeholder="Escribe o pega aquí el conocimiento de tu agente..."
                  />
                </div>
              </motion.div>
            )}

            {/* PESTAÑA 4: DESPLIEGUE */}
            {activeTab === 'despliegue' && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <h3 className="font-serif text-3xl mb-8">Canales de Despliegue</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-bg/60 border border-emerald-500/20 backdrop-blur-xl rounded-xl p-6">
                    <FiMessageCircle size={24} className="text-[#25D366] mb-4" />
                    <h4 className="font-semibold text-sm uppercase tracking-wider">WhatsApp API</h4>
                    <div className="mt-6">
                      <div>
                      <label className="text-xs text-text-muted mb-1.5 block">WhatsApp Token</label>
                      <div className="flex items-center gap-2">
                        <input type={showToken ? 'text' : 'password'} value={botData.whatsappToken} onChange={e => setBotData({...botData, whatsappToken: e.target.value})} className="flex-1 px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm outline-none focus:border-accent/30 transition-all duration-200" />
                        <button onClick={() => setShowToken(!showToken)} className="bg-white/5 border border-white/10 rounded-lg p-2.5 cursor-pointer text-text-muted hover:text-accent transition-all duration-200">
                          {showToken ? <FiShield size={14} /> : <FiInfo size={14} />}
                        </button>
                      </div>
                      <p className="text-xs text-text-muted mt-1">{showToken ? 'Ocultar' : 'Mostrar'} token</p>
                    </div>
                    </div>
                  </div>
                  <div className="bg-bg/60 border border-accent/20 backdrop-blur-xl rounded-xl p-6">
                    <FiLayout size={24} className="text-accent mb-4" />
                    <h4 className="font-semibold text-sm uppercase tracking-wider">Widget Web</h4>
                    <code className="block bg-white/5 p-4 rounded-lg mt-6 text-xs text-accent">
                      {`<script src="/widget.js" data-bot-id="${id}"></script>`}
                    </code>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Playground */}
        <div className="bg-bg flex flex-col border-l border-white/5">
          <div className="px-6 py-4 bg-bg/80 border-b border-white/5 flex justify-between items-center">
            <span className="text-xs font-semibold text-accent">Playground</span>
           </div>
              <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto flex flex-col gap-4">
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`${msg.role === "user" ? "self-end bg-accent text-black" : "self-start bg-white/5 text-white"} px-4 py-3 rounded-xl max-w-[85%] text-sm leading-relaxed`}>{msg.content}</div>
                  ))}
                  {isTyping && <div className="text-xs text-text-muted">Escribiendo...</div>}
               </div>
               <form onSubmit={handleSendMessage} className="p-4 border-t border-white/5 flex gap-2">
                  <input value={inputMessage} onChange={e => setInputMessage(e.target.value)} placeholder="Escribe un mensaje..." className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm outline-none focus:border-accent/30 transition-all duration-200" />
                  <button type="submit" className="bg-accent border-none rounded-lg px-4 transition-all duration-200 hover:scale-105"><FiSend className="text-black" /></button>
               </form>
        </div>
      </div>
    </div>
  );
}
