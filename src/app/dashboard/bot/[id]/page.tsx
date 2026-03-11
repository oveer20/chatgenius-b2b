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
  FiZap
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
  });

  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", content: "¡Hola! Soy tu nuevo asistente de IA. ¿En qué puedo ayudarte hoy?" }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [knowledgeBase, setKnowledgeBase] = useState(isNew ? "" : "Nuestros envíos tardan 3-5 días hábiles. El costo de envío es de $5.");
  
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setKnowledgeBase(prev => prev + "\n" + text);
        alert("¡Documento procesado y añadido a la base del conocimiento!");
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
      if (data.message) {
        setChatMessages(prev => [...prev, data.message]);
      } else {
        throw new Error(data.error || "Error desconocido");
      }
    } catch (error) {
      console.error(error);
      setChatMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Error al conectar con el motor de IA."
      }]);
    } finally {
      setIsTyping(false);
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
             <span style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", fontWeight: "600" }}>PROYECTO: {id}</span>
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
                  <label className="label">Descripción Interna</label>
                  <textarea 
                    className="input" 
                    style={{ minHeight: "80px" }}
                    value={botData.description} 
                    onChange={e => setBotData({...botData, description: e.target.value})}
                    placeholder="Describe para qué sirve este bot..."
                  />
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
                  <div>
                    <label className="label">Creatividad: {botData.temperature}</label>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.1" 
                      value={botData.temperature} 
                      onChange={e => setBotData({...botData, temperature: parseFloat(e.target.value)})}
                      style={{ width: "100%", height: "40px", accentColor: "var(--accent-blue)" }}
                    />
                  </div>
                </div>
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
               <div style={{ textAlign: "center" }}>
                  <input 
                    type="file" 
                    id="file-upload" 
                    style={{ display: "none" }} 
                    onChange={handleFileUpload}
                    accept=".txt,.md"
                  />
                  <label htmlFor="file-upload" className="btn-secondary" style={{ cursor: "pointer", width: "100%", display: "flex", justifyContent: "center" }}>
                    <FiDatabase /> Subir Archivo (.txt, .md)
                  </label>
               </div>
            </section>
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

