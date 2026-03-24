"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  FiArrowLeft, FiSave, FiPlay, FiDatabase, FiSettings, FiCpu, FiRefreshCw,
  FiSend, FiZap, FiCode, FiGlobe, FiStar, FiLayout, FiShield, FiInfo
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
  });

  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", content: "¡Sistema en línea! Soy tu activo de IA estratégica. ¿Qué vamos a probar hoy?" }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [knowledgeBase, setKnowledgeBase] = useState("");

  const [stitchResult, setStitchResult] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll para el Playground
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages, isTyping]);

  // Carga de datos del Bot desde Supabase
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
          model: botData.model
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
        <div style={{ opacity: 0.6 }}>Sincronización: <span style={{ color: '#10b981' }}>100%</span></div>
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

      {/* Área de Trabajo Split Screen */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 450px', flex: 1, overflow: 'hidden' }}>

        {/* Panel de Configuración (Scrollable) */}
        <div style={{ padding: '2.5rem', overflowY: 'auto', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>

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
              <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', color: '#D4AF37' }}>
                <FiDatabase /> Base de Conocimiento Estratégico
              </h3>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '20px', border: '1px dashed rgba(212,175,55,0.3)' }}>
                <textarea
                  value={knowledgeBase}
                  onChange={e => setKnowledgeBase(e.target.value)}
                  style={{ width: '100%', minHeight: '150px', background: 'transparent', border: 'none', color: 'white', outline: 'none', fontSize: '0.9rem' }}
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