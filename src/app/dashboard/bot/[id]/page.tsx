"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  FiArrowLeft, FiSave, FiPlay, FiDatabase, FiSettings, FiCpu, FiRefreshCw,
  FiSend, FiZap, FiCode, FiGlobe, FiStar, FiLayout, FiShield, FiInfo,
  FiBarChart2, FiUsers, FiMail, FiPhone, FiCalendar, FiMessageCircle, FiPlus, FiDownload
} from "react-icons/fi";
import styles from "../../dashboard.module.css";
import { supabase } from "@/lib/supabase";

export default function BotEditor() {
  const { id } = useParams();
  const router = useRouter();
  const isNew = id === "new";

  const [botData, setBotData] = useState({
    name: isNew ? "" : "Cargando...",
    description: "",
    systemPrompt: "",
    temperature: 0.7,
    model: "gpt-4o", // Modelo Elite por defecto
    whatsappPhoneNumber: "",
    whatsappPhoneId: "",
    whatsappToken: "",
    whatsappVerifyToken: "",
  });

  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", content: "¡Sistema en línea! Soy tu activo de IA estratégica. ¿Qué vamos a probar hoy?" }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [knowledgeBase, setKnowledgeBase] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeTab, setActiveTab] = useState<'config' | 'analytics' | 'integrations'>('config');
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
        });
        setKnowledgeBase(data.knowledge_base || "");
      }
    }
    loadBot();
  }, [id, isNew]);

  useEffect(() => {
    async function loadLeads() {
      if (isNew || activeTab !== 'analytics') return;
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
  }, [id, isNew, activeTab]);

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
        setCrawlerUrl(""); // Limpiar
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
    <div style={{ backgroundColor: '#0B1120', height: '100vh', display: 'flex', flexDirection: 'column', color: 'white' }}>
      {/* Status Bar Elite */}
      <div style={{ background: '#060B14', padding: '0.5rem 2rem', display: 'flex', gap: '2rem', borderBottom: '1px solid rgba(212,175,55,0.1)', fontSize: '0.7rem' }}>
        <div style={{ color: '#D4AF37', fontWeight: 800 }}><FiZap /> ECOSISTEMA STRATIX ACTIVO</div>
        <div style={{ opacity: 0.6 }}>Opal Logic: <span style={{ color: '#10b981' }}>Estable</span></div>
        <div style={{ opacity: 0.6 }}>Sincronización RAG: <span style={{ color: '#10b981' }}>100%</span></div>
      </div>
      {/* Header del Editor */}
      <header style={{ padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0B1120', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={() => router.push("/dashboard")} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}>
            <FiArrowLeft />
          </button>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 900 }}>{isNew ? "Nuevo Activo IA" : botData.name}</h2>
            <span style={{ fontSize: '0.7rem', color: '#D4AF37', fontWeight: 800 }}>ID: {id}</span>
          </div>
        </div>
        <button onClick={handleSave} className="btn-primary" style={{ background: '#D4AF37', color: '#000', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {isSaving ? <FiRefreshCw className="spin" /> : <FiSave />} {isSaving ? "Sincronizando..." : "Guardar Cambios"}
        </button>
      </header>

      {/* Selector de Pestañas (NUEVO) */}
      <div style={{ background: '#0B1120', display: 'flex', gap: '2rem', padding: '0 2rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <button 
          onClick={() => setActiveTab('config')}
          style={{ 
            padding: '1rem 0', 
            background: 'none', 
            border: 'none', 
            color: activeTab === 'config' ? '#D4AF37' : 'white', 
            fontWeight: 800, 
            fontSize: '0.8rem', 
            cursor: 'pointer', 
            borderBottom: activeTab === 'config' ? '2px solid #D4AF37' : '2px solid transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            opacity: activeTab === 'config' ? 1 : 0.5
          }}
        >
          <FiSettings /> CONFIGURACIÓN TÁCTICA
        </button>
        <button 
          onClick={() => setActiveTab('analytics')}
          style={{ 
            padding: '1rem 0', 
            background: 'none', 
            border: 'none', 
            color: activeTab === 'analytics' ? '#D4AF37' : 'white', 
            fontWeight: 800, 
            fontSize: '0.8rem', 
            cursor: 'pointer', 
            borderBottom: activeTab === 'analytics' ? '2px solid #D4AF37' : '2px solid transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            opacity: activeTab === 'analytics' ? 1 : 0.5
          }}
        >
          <FiBarChart2 /> ANALÍTICAS DE LEADS
        </button>
      </div>

      {/* Área de Trabajo Split Screen */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 450px', flex: 1, overflow: 'hidden' }}>

        {/* Panel de Contenido Principal (Scrollable) */}
        <div style={{ padding: '2.5rem', overflowY: 'auto', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>

            {activeTab === 'config' ? (
              <>
                {/* Configuración de IA */}
                <section style={{ marginBottom: '3rem' }}>
                  <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', color: '#D4AF37' }}>
                    <FiCpu /> Arquitectura Cognitiva
                  </h3>
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', opacity: 0.6, marginBottom: '0.5rem' }}>Instrucciones Maestras (System Prompt)</label>
                      <textarea
                        value={botData.systemPrompt}
                        onChange={e => setBotData({ ...botData, systemPrompt: e.target.value })}
                        style={{ width: '100%', minHeight: '150px', padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white', lineHeight: '1.6' }}
                        placeholder="Ej: Eres un asistente experto en ventas de lujo..."
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', opacity: 0.6, marginBottom: '0.5rem' }}>Modelo de Inteligencia</label>
                        <select
                          value={botData.model}
                          onChange={e => setBotData({ ...botData, model: e.target.value })}
                          style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white' }}
                        >
                          <option value="gpt-4o">GPT-4o (Elite)</option>
                          <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Base de Conocimiento (RAG) */}
                <section style={{ marginBottom: '3rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', color: '#D4AF37' }}>
                      <FiDatabase /> Base de Conocimiento Estratégico (RAG)
                    </h3>
                    <button 
                      onClick={handleSyncKnowledge}
                      disabled={isSyncing || !knowledgeBase}
                      style={{ 
                        padding: '8px 16px', 
                        background: isSyncing ? 'rgba(212,175,55,0.1)' : 'rgba(212,175,55,0.2)', 
                        color: '#D4AF37', 
                        border: '1px solid rgba(212,175,55,0.3)', 
                        borderRadius: '8px', 
                        fontSize: '0.8rem', 
                        fontWeight: 800,
                        cursor: (isSyncing || !knowledgeBase) ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      {isSyncing ? <FiRefreshCw className="spin" /> : <FiZap />} {isSyncing ? "Sincronizando..." : "Sincronizar Núcleo"}
                    </button>
                  </div>
                  
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '20px', border: '1px dashed rgba(212,175,55,0.3)', position: 'relative' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: '2rem', marginBottom: '2rem' }}>
                      <p style={{ fontSize: '0.75rem', opacity: 0.4 }}>
                        <FiInfo style={{ verticalAlign: 'middle', marginRight: '5px' }} /> 
                        Al sincronizar, convertimos tu texto o documentos en vectores matemáticos de alta densidad para una búsqueda semántica ultrarrápida.
                      </p>
                      <label style={{ 
                        padding: '10px', 
                        background: isUploading ? 'rgba(255,255,255,0.05)' : 'rgba(212,175,55,0.1)', 
                        border: '1px solid rgba(212,175,55,0.3)', 
                        borderRadius: '10px', 
                        cursor: isUploading ? 'not-allowed' : 'pointer',
                        textAlign: 'center',
                        fontSize: '0.7rem',
                        fontWeight: 900,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        color: '#D4AF37'
                      }}>
                        {isUploading ? <FiRefreshCw className="spin" /> : <FiPlus />}
                        {isUploading ? "SUBIENDO..." : "SUBIR PDF PRO"}
                        <input type="file" accept=".pdf" onChange={handleFileUpload} style={{ display: 'none' }} disabled={isUploading} />
                      </label>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                      <input
                        type="url"
                        value={crawlerUrl}
                        onChange={e => setCrawlerUrl(e.target.value)}
                        placeholder="https://www.tu-empresa.com"
                        style={{ flex: 1, padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '10px', color: 'white', fontSize: '0.85rem' }}
                        disabled={isCrawling}
                      />
                      <button
                        onClick={handleCrawlUrl}
                        disabled={isCrawling || !crawlerUrl}
                        style={{ padding: '0 20px', background: 'rgba(212,175,55,0.1)', color: '#D4AF37', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 900, cursor: (isCrawling || !crawlerUrl) ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                      >
                        {isCrawling ? <FiRefreshCw className="spin" /> : <FiGlobe />}
                        {isCrawling ? "ESCANEANDO..." : "ABSORBER WEB"}
                      </button>
                    </div>

                    <textarea
                      value={knowledgeBase}
                      onChange={e => setKnowledgeBase(e.target.value)}
                      style={{ width: '100%', minHeight: '180px', background: 'transparent', border: 'none', color: 'white', outline: 'none', fontSize: '0.9rem', lineHeight: '1.6' }}
                      placeholder="Pega aquí manuales, precios o información técnica para entrenar al bot..."
                    />
                  </div>
                </section>

                {/* Instalación */}
                {!isNew && (
                  <section>
                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', color: '#D4AF37' }}>
                      <FiCode /> Despliegue en Sitio Web
                    </h3>
                    <div style={{ background: '#060B14', padding: '1.5rem', borderRadius: '15px', border: '1px solid rgba(212,175,55,0.1)' }}>
                      <code style={{ fontSize: '0.8rem', color: '#10b981' }}>
                        {`<script src="/widget.js" data-bot-id="${id}"></script>`}
                      </code>
                    </div>
                  </section>
                )}
              </>
            ) : (
              <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.5rem', fontWeight: 900 }}>
                    <FiUsers color="#D4AF37" /> Prospectos Capturados
                  </h3>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ padding: '10px 20px', background: 'rgba(212,175,55,0.1)', borderRadius: '12px', border: '1px solid rgba(212,175,55,0.2)', fontSize: '0.9rem' }}>
                      Total: <strong style={{ color: '#D4AF37' }}>{leads.length}</strong>
                    </div>
                    {leads.length > 0 && (
                      <button 
                        onClick={handleExportCSV}
                        style={{ padding: '10px 20px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '12px', cursor: 'pointer', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}
                      >
                        <FiDownload /> Exportar a Excel
                      </button>
                    )}
                  </div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                  {isLoadingLeads ? (
                    <div style={{ padding: '4rem', textAlign: 'center', opacity: 0.5 }}>Cargando analíticas...</div>
                  ) : leads.length === 0 ? (
                    <div style={{ padding: '4rem', textAlign: 'center' }}>
                      <FiUsers style={{ fontSize: '3rem', opacity: 0.1, marginBottom: '1rem' }} />
                      <div style={{ opacity: 0.4 }}>Aún no se han capturado leads para este activo.</div>
                    </div>
                  ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                      <thead>
                        <tr style={{ background: 'rgba(0,0,0,0.2)', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>
                          <th style={{ padding: '1.2rem 1.5rem', opacity: 0.5 }}>Nombre</th>
                          <th style={{ padding: '1.2rem 1.5rem', opacity: 0.5 }}>Contacto</th>
                          <th style={{ padding: '1.2rem 1.5rem', opacity: 0.5 }}>Intención AI</th>
                          <th style={{ padding: '1.2rem 1.5rem', opacity: 0.5 }}>Calificación</th>
                          <th style={{ padding: '1.2rem 1.5rem', opacity: 0.5 }}>Fecha</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leads.map((lead, i) => (
                          <tr key={lead.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', transition: '0.3s' }}>
                            <td style={{ padding: '1.2rem 1.5rem', fontWeight: 700 }}>{lead.name}</td>
                            <td style={{ padding: '1.2rem 1.5rem' }}>
                              <div style={{ fontSize: '0.9rem' }}><FiMail style={{ marginRight: '5px', opacity: 0.5 }} /> {lead.email || '-'}</div>
                              <div style={{ fontSize: '0.8rem', opacity: 0.5 }}><FiPhone style={{ marginRight: '5px', opacity: 0.5 }} /> {lead.phone || '-'}</div>
                            </td>
                            <td style={{ padding: '1.2rem 1.5rem' }}>
                              <span style={{ 
                                padding: '4px 10px', 
                                background: lead.intent === 'Sales' ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.05)', 
                                color: lead.intent === 'Sales' ? '#10b981' : '#fff', 
                                borderRadius: '6px', 
                                fontSize: '0.75rem', 
                                fontWeight: 800,
                                border: `1px solid ${lead.intent === 'Sales' ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.1)'}`
                              }}>
                                {lead.intent || 'Analizando...'}
                              </span>
                            </td>
                            <td style={{ padding: '1.2rem 1.5rem' }}>
                              <span style={{ 
                                padding: '4px 10px', 
                                background: lead.score === 'Hot' ? 'rgba(212,175,55,0.2)' : 'rgba(255,255,255,0.05)', 
                                color: lead.score === 'Hot' ? '#D4AF37' : '#fff', 
                                borderRadius: '6px', 
                                fontSize: '0.75rem', 
                                fontWeight: 800,
                                border: `1px solid ${lead.score === 'Hot' ? 'rgba(212,175,55,0.3)' : 'rgba(255,255,255,0.1)'}`
                              }}>
                                {lead.score || 'Cold'}
                              </span>
                            </td>
                            <td style={{ padding: '1.2rem 1.5rem', fontSize: '0.85rem', opacity: 0.6 }}>
                              <FiCalendar style={{ marginRight: '5px' }} /> {new Date(lead.created_at).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Playground (Vista Previa en Tiempo Real) */}
        <div style={{ background: '#060B14', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.05)', background: '#0B1120', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#D4AF37' }}>PLAYGROUND / PRUEBA DE NÚCLEO</span>
            <FiShield style={{ opacity: 0.5 }} />
          </div>

          {/* Área de Chat */}
          <div ref={scrollRef} style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {chatMessages.map((msg, i) => (
              <div key={i} style={{
                alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                background: msg.role === "user" ? "#D4AF37" : "rgba(255,255,255,0.05)",
                color: msg.role === "user" ? "#000" : "white",
                padding: '0.8rem 1.2rem',
                borderRadius: '15px',
                fontSize: '0.9rem',
                maxWidth: '85%',
                fontWeight: msg.role === "user" ? 600 : 400
              }}>
                {msg.content}
              </div>
            ))}
            {isTyping && <div style={{ fontSize: '0.7rem', opacity: 0.5 }}>Stratix está procesando...</div>}
          </div>

          {/* Input del Chat */}
          <form onSubmit={handleSendMessage} style={{ padding: '1.5rem', background: '#0B1120', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '10px' }}>
            <input
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              placeholder="Escribe un mensaje de prueba..."
              style={{ flex: 1, padding: '12px', background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '10px', color: 'white' }}
            />
            <button type="submit" style={{ background: '#D4AF37', border: 'none', padding: '10px 15px', borderRadius: '10px', cursor: 'pointer' }}>
              <FiSend color="#000" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}