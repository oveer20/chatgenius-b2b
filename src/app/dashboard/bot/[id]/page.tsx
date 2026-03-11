"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiSave,
  FiPlay,
  FiDatabase,
  FiMessageSquare,
  FiSettings,
  FiChevronRight,
  FiCpu,
  FiRefreshCw,
  FiSend
} from "react-icons/fi";
import styles from "../../dashboard.module.css";

export default function BotEditor() {
  const { id } = useParams();
  const router = useRouter();
  const isNew = id === "new";

  const [botData, setBotData] = useState({
    name: isNew ? "" : "Soporte E-commerce",
    description: isNew ? "" : "Agente entrenado para responder dudas sobre envíos y productos.",
    systemPrompt: isNew ? "" : "Eres un asistente de atención al cliente amable de una tienda de electrónica. Tu objetivo es ayudar a los clientes con sus dudas y recomendar productos basados en sus necesidades.",
    temperature: 0.7,
    model: "gpt-4o",
  });

  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", content: "¡Hola! Soy tu nuevo asistente de IA. ¿En qué puedo ayudarte hoy?" }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [knowledgeBase, setKnowledgeBase] = useState(isNew ? "" : "Nuestros envíos tardan 3-5 días hábiles. El costo de envío es de $5.");

  useEffect(() => {
    if (!isNew) {
      // In a real app, fetch from /api/bots/[id]
      console.log("Cargando bot:", id);
    }
  }, [id, isNew]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate real save to /api/bots
      await new Promise(r => setTimeout(r, 1000));
      alert("Configuración y Base de Conocimientos guardadas correctamente");
    } catch (err) {
      alert("Error al guardar");
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simple text reading for MVP RAG
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
          knowledgeBase: knowledgeBase, // Critical: Injecting context
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
    <div className={styles.dashboard} style={{ display: "flex", flexDirection: "column" }}>
      {/* Header Editor */}
      <header className={styles.header} style={{ padding: "1.5rem 2rem", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--bg-secondary)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button onClick={() => router.back()} className="btn-secondary" style={{ padding: "0.5rem" }}>
            <FiArrowLeft />
          </button>
          <div style={{ display: "flex", flexDirection: "column" }}>
             <h2 style={{ fontSize: "1.2rem", fontWeight: "700" }}>{isNew ? "Crear Nuevo Agente" : botData.name}</h2>
             <span style={{ fontSize: "0.8rem", color: "var(--text-tertiary)" }}>ID: {id}</span>
          </div>
        </div>
        <button onClick={handleSave} className="btn-primary">
          <FiSave /> Guardar Cambios
        </button>
      </header>

      {/* Editor Content */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", flex: 1, overflow: "hidden" }}>
        {/* Settings Panel */}
        <div style={{ padding: "2rem", overflowY: "auto", borderRight: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <section style={{ marginBottom: "2rem" }}>
              <h3 style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}><FiSettings /> Configuración Básica</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
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

            <section style={{ marginBottom: "2rem" }}>
              <h3 style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}><FiCpu /> Inteligencia & Comportamiento</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div>
                  <label className="label" style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>System Prompt (Instrucciones Maestras)</span>
                    <span style={{ color: "var(--accent-blue)", cursor: "pointer", fontSize: "0.8rem" }}>Ver Plantillas</span>
                  </label>
                  <textarea 
                    className="input" 
                    style={{ minHeight: "180px", fontSize: "0.9rem", lineHeight: "1.5" }}
                    value={botData.systemPrompt} 
                    onChange={e => setBotData({...botData, systemPrompt: e.target.value})}
                    placeholder="Eres un experto en... Tu objetivo es... No menciones que eres una IA..."
                  />
                  <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginTop: "0.5rem" }}>
                    Estas son las instrucciones que definen la personalidad y límites de tu bot.
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label className="label">Modelo de IA</label>
                    <select 
                      className="input" 
                      value={botData.model} 
                      onChange={e => setBotData({...botData, model: e.target.value})}
                    >
                      <option value="gpt-4o">GPT-4o (Más inteligente)</option>
                      <option value="gpt-4o-mini">GPT-4o Mini (Más rápido)</option>
                    </select>
                  </div>
                  <div>
                    <label className="label">Creatividad (Temp: {botData.temperature})</label>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.1" 
                      value={botData.temperature} 
                      onChange={e => setBotData({...botData, temperature: parseFloat(e.target.value)})}
                      style={{ width: "100%", height: "40px" }}
                    />
                  </div>
                </div>
              </div>
            </section>

            <section>
               <h3 style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}><FiDatabase /> Base de Conocimiento (RAG)</h3>
               <div className="glass-card" style={{ padding: "1.5rem", border: "2px dashed var(--border)", marginBottom: "1rem" }}>
                  <textarea 
                    className="input" 
                    style={{ minHeight: "120px", background: "transparent", border: "none", fontSize: "0.85rem" }}
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
                  <label htmlFor="file-upload" className="btn-secondary" style={{ cursor: "pointer" }}>
                    <FiDatabase /> Subir Archivo (.txt, .md)
                  </label>
                  <p style={{ fontSize: "0.7rem", color: "var(--text-tertiary)", marginTop: "0.5rem" }}>
                    El bot usará este texto extra para responder de forma precisa.
                  </p>
               </div>
            </section>
          </div>
        </div>

        {/* Playground Area */}
        <div style={{ display: "flex", flexDirection: "column", background: "var(--bg-primary)" }}>
          <div style={{ padding: "1rem", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
             <span style={{ fontSize: "0.9rem", fontWeight: "600", color: "var(--text-secondary)" }}>Playground / Prueba en vivo</span>
             <button onClick={() => setChatMessages([{ role: "assistant", content: "Chat reiniciado. ¿En qué puedo ayudarte?" }])} style={{ color: "var(--text-tertiary)", fontSize: "0.8rem" }}>
               <FiRefreshCw /> Reiniciar
             </button>
          </div>
          
          <div style={{ flex: 1, padding: "1rem", overflowY: "auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {chatMessages.map((msg, i) => (
              <div key={i} style={{ 
                alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                maxWidth: "85%",
                padding: "0.8rem 1rem",
                borderRadius: "1rem",
                fontSize: "0.9rem",
                background: msg.role === "user" ? "var(--accent-blue)" : "var(--bg-tertiary)",
                color: "white",
                borderBottomRightRadius: msg.role === "user" ? "0" : "1rem",
                borderBottomLeftRadius: msg.role === "assistant" ? "0" : "1rem",
              }}>
                {msg.content}
              </div>
            ))}
            {isTyping && (
              <div style={{ alignSelf: "flex-start", padding: "0.8rem 1rem", borderRadius: "1rem", background: "var(--bg-tertiary)", color: "var(--text-tertiary)", fontSize: "0.8rem" }}>
                Escribiendo...
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} style={{ padding: "1rem", borderTop: "1px solid var(--border)", display: "flex", gap: "0.5rem" }}>
            <input 
              className="input" 
              placeholder="Escribe un mensaje de prueba..." 
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              style={{ borderRadius: "var(--radius-full)" }}
            />
            <button type="submit" className="btn-primary" style={{ padding: "0.5rem", borderRadius: "50%", width: "45px", height: "45px" }}>
              <FiSend />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
