"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { toast } from 'sonner';
import type { BotData, Lead, ChatMessage, TabId } from "./types";
import BotHeader from "./BotHeader";
import BotStats from "./BotStats";
import BotConversations from "./BotConversations";
import BotChannels from "./BotChannels";
import BotKnowledgeBase from "./BotKnowledgeBase";

export default function BotEditor() {
  const { id } = useParams();

  const [botData, setBotData] = useState<BotData>({
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
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isCrawling, setIsCrawling] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "¡Sistema en línea! Soy tu activo de IA estratégica. ¿Qué vamos a probar hoy?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [knowledgeBase, setKnowledgeBase] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('identidad');
  const [crawlerUrl, setCrawlerUrl] = useState("");
  const [isTogglingStatus, setIsTogglingStatus] = useState(false);

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
    } catch {
      toast.error("Error al guardar el agente. Intenta de nuevo.");
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
    } catch {
      toast.error("Error de sincronización. Intenta de nuevo.");
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
    } catch {
      toast.error("Error al procesar el documento. Intenta de nuevo.");
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
    } catch {
      toast.error("Error al escanear la URL. Intenta de nuevo.");
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
    } catch {
      toast.error("Error al cambiar el estado. Intenta de nuevo.");
    } finally {
      setIsTogglingStatus(false);
    }
  };

  const handleSendMessage = async (messageText: string) => {
    const userMsg: ChatMessage = { role: "user", content: messageText };
    setChatMessages(prev => [...prev, userMsg]);
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
      <BotHeader
        botName={botData.name}
        botId={id as string}
        botStatus={botStatus}
        isTogglingStatus={isTogglingStatus}
        isSaving={isSaving}
        activeTab={activeTab}
        onToggleStatus={handleToggleStatus}
        onSave={handleSave}
        onTabChange={setActiveTab}
      />

      <div className="grid grid-cols-[1fr_500px] flex-1 overflow-hidden">

        <div className="p-14 overflow-y-auto" style={{ background: 'radial-gradient(circle at top left, rgba(212,175,55,0.03) 0%, transparent 70%)' }}>
          <div className="mx-auto max-w-[1000px]">

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
                <BotStats leads={leads} onExportCSV={handleExportCSV} />
              </motion.div>
            )}

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

            {activeTab === 'entrenamiento' && (
              <BotKnowledgeBase
                knowledgeBase={knowledgeBase}
                setKnowledgeBase={setKnowledgeBase}
                isSyncing={isSyncing}
                handleSyncKnowledge={handleSyncKnowledge}
                crawlerUrl={crawlerUrl}
                setCrawlerUrl={setCrawlerUrl}
                isCrawling={isCrawling}
                handleCrawlUrl={handleCrawlUrl}
                isUploading={isUploading}
                handleFileUpload={handleFileUpload}
              />
            )}

            {activeTab === 'despliegue' && (
              <BotChannels
                botData={botData}
                setBotData={setBotData}
                botId={id as string}
              />
            )}

          </div>
        </div>

        <BotConversations
          chatMessages={chatMessages}
          isTyping={isTyping}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
}
