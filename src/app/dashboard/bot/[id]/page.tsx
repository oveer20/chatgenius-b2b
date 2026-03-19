"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiSave,
  FiPlay,
  FiDatabase,
  FiSettings,
  FiCpu,
  FiRefreshCw,
  FiSend,
  FiZap,
  FiCode,
  FiGlobe,
  FiStar,
  FiLayout
} from "react-icons/fi";
import styles from "../../dashboard.module.css";
import { supabase } from "@/lib/supabase";

export default function BotEditor() {
  const { id } = useParams();
  const router = useRouter();
  const isNew = id === "new";

  const [botData, setBotData] = useState({
    name: isNew ? "" : "Soporte E-commerce",
    description: isNew ? "" : "Agente entrenado para responder dudas sobre envíos y productos.",
    systemPrompt: isNew ? "" : "Eres un asistente de atención al cliente amable de una tienda de electrónica. Tu objetivo es ayudar a los clientes con sus dudas y recomendar productos basados en sus necesidades.",
    temperature: 0.7,
    model: "gemini-1.5-flash",
    whatsappPhoneNumber: "",
  });

  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", content: "¡Hola! Soy tu nuevo asistente de IA. ¿En qué puedo ayudarte hoy?" }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [knowledgeBase, setKnowledgeBase] = useState(isNew ? "" : "Nuestros envíos tardan 3-5 días hábiles. El costo de envío es de $5.");
  
  // Arsenal State
  const [pomelliLoading, setPomelliLoading] = useState(false);
  const [pomelliUrl, setPomelliUrl] = useState("");
  const [showPomelliModal, setShowPomelliModal] = useState(false);
  const [stitchLoading, setStitchLoading] = useState(false);
  const [stitchResult, setStitchResult] = useState<any>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages, isTyping]);

  useEffect(() => {
    async function loadBot() {
      if (isNew) return;
      
      const { data, error } = await supabase
        .from("bots")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        setBotData({
          name: data.name,
          description: data.description || "",
          systemPrompt: data.system_prompt || "",
          temperature: data.temperature || 0.7,
          model: data.model || "gemini-1.5-flash",
          whatsappPhoneNumber: data.whatsapp_phone_number || "",
        });
        setKnowledgeBase(data.knowledge_base || "");
      }
    }
    loadBot();
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
        updated_at: new Date().toISOString(),
      };

      let error;
      if (isNew) {
        const { error: err } = await supabase.from("bots").insert([{ ...payload, user_id: (await supabase.auth.getUser()).data.user?.id }]);
        error = err;
      } else {
        const { error: err } = await supabase.from("bots").update(payload).eq("id", id);
        error = err;
      }

      if (error) throw error;
      alert("¡Bot actualizado y entrenado con éxito!");
      if (isNew) router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      alert("Error al guardar: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type === "application/pdf") {
      try {
        const { getDocument, GlobalWorkerOptions } = await import("pdfjs-dist");
        // Set worker from a CDN for simplicity in Next.js
        GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.mjs`;
        
        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;
        
        let fullText = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item: any) => item.str).join(" ");
          fullText += pageText + "\n";
        }
        
        setKnowledgeBase(prev => prev + "\n" + fullText);
        alert("¡PDF procesado y texto extraído con éxito!");
      } catch (err) {
        console.error("PDF Error:", err);
        alert("Error al procesar el PDF. Asegúrate de que no esté protegido.");
      }
    } else {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setKnowledgeBase(prev => prev + "\n" + text);
        alert("¡Archivo de texto procesado!");
      };
      reader.readAsText(file);
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
          messages: [...chatMessages, userMsg].map(m => ({ role: m.role, content: m.content })),
          systemPrompt: botData.systemPrompt,
          knowledgeBase: knowledgeBase,
          temperature: botData.temperature,
          model: botData.model
        })
      });

      const data = await response.json();
      if (data.error) {
        setChatMessages(prev => [...prev, { 
          role: "assistant", 
          content: "🤖 " + (data.message?.content || data.error)
        }]);
      } else if (data.message) {
        setChatMessages(prev => [...prev, data.message]);
      }
    } catch (err: any) {
      console.error(err);
      setChatMessages(prev => [...prev, { 
        role: "assistant", 
        content: "🤖 Lo siento, estoy procesando mucha información. Dame un momento y vuelve a intentarlo." 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handlePomelliAnalysis = async () => {
    if (!pomelliUrl) return alert("Ingresa una URL");
    setPomelliLoading(true);
    try {
      const res = await fetch("/api/arsenal/pomelli", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: pomelliUrl })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      
      // Update bot data with suggestions
      setBotData(prev => ({
        ...prev,
        systemPrompt: data.systemPromptSuggestion,
        description: data.mission
      }));
      setPomelliUrl("");
      setShowPomelliModal(false);
      alert("¡ADN de Marca detectado y aplicado con éxito!");
    } catch (err: any) {
      alert("Error en análisis Pomelli: " + err.message);
    } finally {
      setPomelliLoading(false);
    }
  };

  const handleStitchReview = async () => {
    setStitchLoading(true);
    try {
      const res = await fetch("/api/arsenal/stitch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config: { name: botData.name, model: botData.model, temperature: botData.temperature } })
      });
      const data = await res.json();
      setStitchResult(data);
    } catch (err: any) {
      alert("Error en revisión Stitch");
    } finally {
      setStitchLoading(false);
    }
  };

  return (
    <div className={styles.dashboard} style={{ 
      height: "100vh", 
      maxHeight: "100vh", 
      overflow: "hidden", 
      flexDirection: "column",
      minHeight: "0" // Override module CSS min-height: 100vh
    }}>
      {/* Intelligent Suite Header */}
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', padding: '0.75rem 2rem', display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-tertiary)' }}>
          <FiZap style={{ color: '#FFD700' }} /> SUITE LABS STATUS:
        </div>
        <div className={styles.arsenalStatusItem}>
          <div className={styles.statusDot} style={{ background: '#FF3D00' }}></div>
          <span>Pomelli Branding: <b>Sincronizado</b></span>
        </div>
        <div className={styles.arsenalStatusItem}>
          <div className={styles.statusDot} style={{ background: '#00B0FF' }}></div>
          <span>Stitch UI: <b>Optimizado</b></span>
        </div>
        <div className={styles.arsenalStatusItem}>
          <div className={styles.statusDot} style={{ background: '#6200EA' }}></div>
          <span>Opal Logic: <b>Activo</b></span>
        </div>
      </div>

      {/* Header Editor */}
      <header className={styles.header} style={{ 
        padding: "1rem 2rem", 
        borderBottom: "1px solid var(--border)", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        background: "var(--bg-primary)",
        margin: 0,
        height: "70px",
        flexShrink: 0
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button onClick={() => router.back()} className="btn-secondary" style={{ padding: "0.5rem", borderRadius: "var(--radius-md)" }}>
            <FiArrowLeft />
          </button>
          <div style={{ display: "flex", flexDirection: "column" }}>
             <h2 style={{ fontSize: "1.2rem", fontWeight: "800", color: "var(--text-primary)" }}>{isNew ? "Crear Nuevo Agente" : botData.name}</h2>
             <span style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", fontWeight: "600" }}>STRATIX PROJECT: {id}</span>
          </div>
        </div>
        <button onClick={handleSave} className="btn-primary" disabled={isSaving}>
          {isSaving ? <FiRefreshCw className="animate-spin" /> : <FiSave />} 
          {isSaving ? "Guardando..." : "Guardar Cambios"}
        </button>
      </header>

      {/* Editor Content */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 450px", flex: 1, minHeight: 0, overflow: "hidden" }}>
        {/* Settings Panel */}
        <div style={{ padding: "2.5rem", overflowY: "auto", borderRight: "1px solid var(--border)", background: "var(--bg-secondary)" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <section style={{ marginBottom: "3rem" }}>
              <h3 style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "1.1rem", fontWeight: "700", color: "var(--text-primary)" }}>
                <FiSettings style={{ color: "var(--accent-blue)" }} /> Configuración Básica
              </h3>
              <div className="glass-card" style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem", background: "var(--bg-primary)" }}>
                <div>
                  <label className="label">Nombre del Agente</label>
                  <input 
                    className="input" 
                    value={botData.name} 
                    onChange={e => setBotData({...botData, name: e.target.value})} 
                    placeholder="Ej. Soporte Ventas WhatsApp"
                  />
                </div>
                <div>
                  <label className="label">WhatsApp Business Phone (Meta ID)</label>
                  <input 
                    className="input" 
                    value={botData.whatsappPhoneNumber} 
                    onChange={e => setBotData({...botData, whatsappPhoneNumber: e.target.value})} 
                    placeholder="Ej. 10459382745102 (Meta ID)"
                  />
                  <p style={{ fontSize: "0.7rem", color: "var(--text-tertiary)", marginTop: "0.4rem" }}>
                    Vincula este bot a tu cuenta de WhatsApp Business para automatizar ventas.
                  </p>
                </div>
              </div>
            </section>

            <section style={{ marginBottom: "3rem" }}>
              <h3 style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "1.1rem", fontWeight: "700", color: "var(--text-primary)" }}>
                <FiCpu style={{ color: "var(--accent-blue)" }} /> Inteligencia & Comportamiento
              </h3>
              <div className="glass-card" style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem", background: "var(--bg-primary)" }}>
                <div>
                  <label className="label" style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>System Prompt (Instrucciones Maestras)</span>
                  </label>
                  <textarea 
                    className="input" 
                    style={{ minHeight: "200px", fontSize: "0.95rem", lineHeight: "1.6" }}
                    value={botData.systemPrompt} 
                    onChange={e => setBotData({...botData, systemPrompt: e.target.value})}
                    placeholder="Eres un experto en... Tu objetivo es... No menciones que eres una IA..."
                  />
                  <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginTop: "0.75rem", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    <FiZap style={{ color: "var(--warning)" }} /> Estas instrucciones definen la personalidad y límites de tu bot.
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "1.5rem" }}>
                  <div>
                    <label className="label">Modelo de IA</label>
                    <select 
                      className="input" 
                      value={botData.model} 
                      onChange={e => setBotData({...botData, model: e.target.value})}
                    >
                      <option value="gemini-1.5-flash">Gemini 1.5 Flash (Gratis y Rápido)</option>
                      <option value="gemini-1.5-pro">Gemini 1.5 Pro (Más Inteligente)</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>

            {/* Intelligent Suite (Dedicated Section) */}
            <section style={{ marginBottom: "3rem" }}>
              <h3 style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "1.1rem", fontWeight: "700", color: "var(--text-primary)" }}>
                <FiZap style={{ color: "var(--accent-blue)" }} /> Elite Suite Integrated Tools
              </h3>
              <div className="glass-card" style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem", background: "var(--bg-primary)" }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  Utiliza las herramientas experimentales de Google Labs para optimizar tu agente.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <button 
                    onClick={() => setShowPomelliModal(true)}
                    disabled={pomelliLoading}
                    className={styles.labsTool} 
                    style={{ background: 'rgba(255, 61, 0, 0.05)', border: '1px solid rgba(255, 61, 0, 0.2)' }}
                  >
                    {pomelliLoading ? <FiRefreshCw className="spin" /> : <FiStar style={{ color: '#FF3D00' }} />} DNA Brand (Pomelli)
                  </button>
                  <button 
                    onClick={handleStitchReview}
                    disabled={stitchLoading}
                    className={styles.labsTool} 
                    style={{ background: 'rgba(0, 176, 255, 0.05)', border: '1px solid rgba(0, 176, 255, 0.2)' }}
                  >
                    {stitchLoading ? <FiRefreshCw className="spin" /> : <FiLayout style={{ color: '#00B0FF' }} />} UI Health (Stitch)
                  </button>
                </div>

                {stitchResult && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Health Score: <b>{stitchResult.score}/100</b></span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--accent-blue)', textTransform: 'uppercase' }}>{stitchResult.status}</span>
                    </div>
                    <ul style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', paddingLeft: '1rem', listStyle: 'none' }}>
                      {stitchResult.suggestions.map((s: string, idx: number) => <li key={idx} style={{ marginBottom: '4px' }}>• {s}</li>)}
                    </ul>
                  </motion.div>
                )}
              </div>
            </section>

            <section style={{ marginBottom: "3rem" }}>
              <h3 style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "1.1rem", fontWeight: "700", color: "var(--text-primary)" }}>
                <FiZap style={{ color: "var(--accent-blue)" }} /> Opal Decision Engine (Reglas)
              </h3>
              <div className="glass-card" style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem", background: "var(--bg-primary)" }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                   <div style={{ padding: '1rem', background: 'rgba(98, 0, 234, 0.05)', border: '1px solid rgba(98, 0, 234, 0.2)', borderRadius: '12px' }}>
                      <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#6200EA', marginBottom: '0.5rem' }}>IF LEAD PRIORITY IS:</p>
                      <select className="input" style={{ fontSize: '0.8rem', height: '35px' }}>
                        <option>HOT (Muy Interesado)</option>
                        <option>WARM (Explorando)</option>
                      </select>
                   </div>
                   <div style={{ padding: '1rem', background: 'rgba(98, 0, 234, 0.05)', border: '1px solid rgba(98, 0, 234, 0.2)', borderRadius: '12px' }}>
                      <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#6200EA', marginBottom: '0.5rem' }}>THEN ACTION IS:</p>
                      <select className="input" style={{ fontSize: '0.8rem', height: '35px' }}>
                        <option>Notificar vía WhatsApp</option>
                        <option>Enviar Email a Admin</option>
                      </select>
                   </div>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                  Opal utiliza el Logic Engine para ejecutar acciones preventivas basadas en el sentimiento del cliente detectado en tiempo real.
                </p>
              </div>
            </section>

            <section style={{ marginBottom: "2rem" }}>
               <h3 style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "1.1rem", fontWeight: "700", color: "var(--text-primary)" }}>
                 <FiDatabase style={{ color: "var(--accent-blue)" }} /> Base de Conocimiento (RAG)
               </h3>
               <div className="glass-card" style={{ padding: "1.5rem", border: "2px dashed var(--border)", marginBottom: "1.5rem", background: "var(--bg-primary)" }}>
                  <textarea 
                    className="input" 
                    style={{ minHeight: "150px", background: "transparent", border: "none", fontSize: "0.9rem", lineHeight: "1.5" }}
                    value={knowledgeBase}
                    onChange={e => setKnowledgeBase(e.target.value)}
                    placeholder="Escribe o sube documentos con la información de tu empresa (precios, horarios, envíos...)"
                  />
               </div>
                <div style={{ textAlign: "center", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <input 
                      type="file" 
                      id="file-upload" 
                      style={{ display: "none" }} 
                      onChange={handleFileUpload}
                      accept=".txt,.md,.pdf"
                    />
                    <label htmlFor="file-upload" className="btn-secondary" style={{ cursor: "pointer", width: "100%", display: "flex", justifyContent: "center", fontSize: "0.85rem" }}>
                      <FiDatabase /> Subir TXT / PDF
                    </label>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <input 
                      type="text" 
                      placeholder="https://tu-web.com"
                      className="input"
                      style={{ fontSize: "0.8rem", padding: "0.5rem 0.75rem" }}
                      id="crawl-url"
                    />
                    <button 
                      className="btn-primary" 
                      style={{ padding: "0 1rem", fontSize: "0.8rem" }}
                      onClick={async () => {
                        const urlInput = (document.getElementById('crawl-url') as HTMLInputElement).value;
                        if (!urlInput) return alert("Ingresa una URL");
                        
                        const btn = document.activeElement as HTMLButtonElement;
                        btn.disabled = true;
                        btn.innerText = "...";
                        
                        try {
                          const res = await fetch("/api/crawl", {
                            method: "POST",
                            body: JSON.stringify({ url: urlInput })
                          });
                          const data = await res.json();
                          if (data.text) {
                            setKnowledgeBase(prev => prev + "\n" + data.text);
                            alert("¡Contenido extraído con éxito!");
                          } else {
                            alert("No se pudo extraer texto de esa URL.");
                          }
                        } catch(e) {
                          alert("Error al conectar con el servidor de crawling.");
                        } finally {
                          btn.disabled = false;
                          btn.innerText = "Entrenar";
                        }
                      }}
                    >
                      Entrenar
                    </button>
                  </div>
                </div>
            </section>

            {/* Installation Section */}
            {!isNew && (
              <section style={{ marginBottom: "2rem" }}>
                <h3 style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "1.1rem", fontWeight: "700", color: "var(--text-primary)" }}>
                  <FiCode style={{ color: "var(--accent-blue)" }} /> Instalar en tu Sitio Web
                </h3>
                <div className="glass-card" style={{ padding: "1.5rem", background: "var(--bg-primary)" }}>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1rem", lineHeight: "1.5" }}>
                    Copia y pega este código antes de <code style={{ background: "var(--bg-tertiary)", padding: "0.15rem 0.4rem", borderRadius: "4px" }}>&lt;/body&gt;</code> en tu sitio web para activar el chat.
                  </p>
                  <div style={{ 
                    background: "#0f172a", 
                    padding: "1.25rem", 
                    borderRadius: "var(--radius-md)", 
                    position: "relative",
                    border: "1px solid rgba(255,255,255,0.1)" 
                  }}>
                    <code style={{ fontSize: "0.78rem", color: "#34d399", display: "block", overflowX: "auto", lineHeight: "1.7", fontFamily: "monospace" }}>
                      {`<script\n  src="/widget.js"\n  data-bot-id="${id}">\n</script>`}
                    </code>
                    <button
                      onClick={() => {
                        const appUrl = typeof window !== 'undefined' ? window.location.origin : '';
                        navigator.clipboard.writeText(`<script src="${appUrl}/widget.js" data-bot-id="${id}"></script>`);
                        alert("✅ ¡Código copiado al portapapeles!");
                      }}
                      style={{ 
                        position: "absolute", 
                        top: "0.75rem", 
                        right: "0.75rem", 
                        padding: "0.4rem 0.8rem", 
                        fontSize: "0.75rem", 
                        background: "rgba(255,255,255,0.1)", 
                        border: "1px solid rgba(255,255,255,0.2)", 
                        borderRadius: "6px", 
                        color: "#34d399", 
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem",
                        fontWeight: "600"
                      }}
                    >
                      📋 Copiar
                    </button>
                  </div>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginTop: "0.75rem" }}>
                    💡 Tu ID de bot es: <code style={{ background: "var(--bg-tertiary)", padding: "0.1rem 0.3rem", borderRadius: "4px", fontWeight: "600" }}>{id}</code>
                  </p>
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Playground Area - FIXED and SCROLLABLE */}
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          background: "var(--bg-primary)",
          height: "100%",
          minHeight: 0, // Critical: allows flex children to shrink within CSS grid
          overflow: "hidden",
          position: "relative"
        }}>
          <div style={{ 
            padding: "1.25rem", 
            borderBottom: "1px solid var(--border)", 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
            background: "var(--bg-secondary)",
            flexShrink: 0 // Prevent header from shrinking
          }}>
             <span style={{ fontSize: "0.85rem", fontWeight: "800", color: "var(--text-primary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Playground / Vista Previa</span>
             <button onClick={() => setChatMessages([{ role: "assistant", content: "Chat reiniciado. ¿En qué puedo ayudarte?" }])} style={{ color: "var(--text-tertiary)", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: "0.25rem", fontWeight: "600" }}>
               <FiRefreshCw /> Reiniciar
             </button>
          </div>
          
          <div 
            ref={scrollRef}
            style={{ 
              flex: 1, 
              padding: "1.5rem", 
              overflowY: "auto", 
              display: "flex", 
              flexDirection: "column", 
              gap: "1rem",
              background: "var(--bg-primary)" 
            }}
          >
            {chatMessages.map((msg, i) => (
              <div key={i} style={{ 
                alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                maxWidth: "85%",
                padding: "0.85rem 1.1rem",
                borderRadius: "1.25rem",
                fontSize: "0.95rem",
                lineHeight: "1.5",
                background: msg.role === "user" ? "var(--accent-blue)" : "var(--bg-tertiary)",
                color: msg.role === "user" ? "white" : "var(--text-primary)",
                borderBottomRightRadius: msg.role === "user" ? "0.2rem" : "1.25rem",
                borderBottomLeftRadius: msg.role === "assistant" ? "0.2rem" : "1.25rem",
                boxShadow: "var(--shadow-sm)"
              }}>
                {msg.content}
              </div>
            ))}
            {isTyping && (
              <div style={{ alignSelf: "flex-start", padding: "0.85rem 1.1rem", borderRadius: "1.25rem", background: "var(--bg-tertiary)", color: "var(--text-muted)", fontSize: "0.85rem", borderBottomLeftRadius: "0.2rem" }}>
                <span className="animate-pulse">Escribiendo...</span>
              </div>
            )}
          </div>

          <div style={{ 
            padding: "1.5rem", 
            borderTop: "1px solid var(--border)", 
            background: "var(--bg-secondary)",
            flexShrink: 0 // Ensure input section doesn't collapse
          }}>
            <form onSubmit={handleSendMessage} style={{ display: "flex", gap: "0.75rem" }}>
              <input 
                className="input" 
                placeholder="Escribe un mensaje de prueba..." 
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                style={{ borderRadius: "var(--radius-full)", background: "var(--bg-primary)", boxShadow: "var(--shadow-sm)" }}
              />
              <button type="submit" className="btn-primary" style={{ padding: "0", borderRadius: "var(--radius-full)", width: "48px", height: "48px", minWidth: "48px" }}>
                <FiSend />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

