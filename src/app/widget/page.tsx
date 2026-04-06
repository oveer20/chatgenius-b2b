"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { FiSend, FiMessageSquare, FiX, FiUser, FiMail, FiBriefcase, FiArrowRight, FiShield } from "react-icons/fi";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { toast, Toaster } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

/**
 * STRATIX INTELLIGENCE — CHAT WIDGET ELITE (V4.0)
 * Widget de generación de leads y atención omnicanal con IA.
 */

function ChatWidgetContent() {
  const searchParams = useSearchParams();
  const botId = searchParams.get("bot-id");

  // Estados de Interfaz
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"lead-capture" | "chat">("lead-capture");
  
  // Datos de Sesión
  const [sessionId] = useState(() => crypto.randomUUID());
  const [botConfig, setBotConfig] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Datos de Lead
  const [leadData, setLeadData] = useState({ name: "", email: "", company: "" });
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  // 1. Cargar Configuración del Bot
  useEffect(() => {
    async function loadBot() {
      if (!botId) return;
      const { data } = await supabase.from("bots").select("*").eq("id", botId).single();
      if (data) {
        setBotConfig(data);
        setMessages([{ 
          role: "assistant", 
          content: `¡Hola! Soy el núcleo de inteligencia de ${data.name}. ¿En qué podemos escalar tu empresa hoy?` 
        }]);
      }
    }
    loadBot();
  }, [botId]);

  // Auto-scroll al recibir mensajes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // 2. Manejo de Captura de Lead
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingLead(true);

    try {
      const res = await fetch("/api/widget/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          botId,
          ...leadData,
          sessionId,
          metadata: { source: "Chat Widget Lead Capture" }
        })
      });

      if (!res.ok) throw new Error("Error capturando lead");
      
      setStep("chat");
      toast.success("Protocolo de acceso validado. Conectando con Opal...");
    } catch (err) {
      toast.error("Error de sincronización. Intenta de nuevo.");
    } finally {
      setIsSubmittingLead(false);
    }
  };

  // 3. Manejo de Chat
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !botConfig) return;

    const userMsg = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({
          messages: [...messages, userMsg],
          systemPrompt: botConfig.system_prompt,
          knowledgeBase: botConfig.knowledge_base,
          model: botConfig.model
        })
      });
      const data = await res.json();
      if (data.message) setMessages(prev => [...prev, data.message]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant", content: "Lo siento, mi motor neuronal está recalibrando. Por favor, reintenta." }]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) {
    return (
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed', bottom: '20px', right: '20px',
          width: '64px', height: '64px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)', 
          border: 'none', cursor: 'pointer',
          boxShadow: '0 8px 32px rgba(212,175,55,0.4)', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
        }}
      >
        <FiMessageSquare size={30} color="#000" />
      </motion.button>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      style={{
        position: 'fixed', bottom: '20px', right: '20px',
        width: '380px', height: '600px', background: 'rgba(11, 17, 32, 0.95)',
        backdropFilter: 'blur(24px)', borderRadius: '24px', 
        border: '1px solid rgba(212,175,55,0.2)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        boxShadow: '0 20px 80px rgba(0,0,0,0.6)', zIndex: 9999
      }}
    >
      {/* Header Premium */}
      <div style={{ background: 'rgba(6,11,20,0.8)', padding: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(212,175,55,0.15)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '32px', height: '32px', background: '#D4AF37', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="/stratix_shield.svg" style={{ width: '20px' }} alt="Opal" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: 'white', fontWeight: 900, fontSize: '0.85rem', letterSpacing: '0.5px' }}>{botConfig?.name || "Stratix Intelligence"}</span>
            <span style={{ color: '#D4AF37', fontSize: '0.65rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#27C93F' }} /> Protocolo Activo
            </span>
          </div>
        </div>
        <FiX onClick={() => setIsOpen(false)} style={{ cursor: 'pointer', color: 'white', opacity: 0.5 }} />
      </div>

      <AnimatePresence mode="wait">
        {step === "lead-capture" ? (
          <motion.div 
            key="capture"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          >
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'white', marginBottom: '0.8rem' }}>Acceso Estratégico</h3>
              <p style={{ fontSize: '0.85rem', opacity: 0.5 }}>Identifícate para iniciar la sintonía neuronal con nuestra IA.</p>
            </div>

            <form onSubmit={handleLeadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div style={{ position: 'relative' }}>
                <FiUser style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#D4AF37' }} />
                <input required placeholder="Nombre Completo" value={leadData.name} onChange={e => setLeadData({...leadData, name: e.target.value})}
                  style={{ width: '100%', padding: '12px 14px 12px 42px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', fontSize: '0.9rem' }} />
              </div>
              <div style={{ position: 'relative' }}>
                <FiMail style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#D4AF37' }} />
                <input required type="email" placeholder="Email Corporativo" value={leadData.email} onChange={e => setLeadData({...leadData, email: e.target.value})}
                  style={{ width: '100%', padding: '12px 14px 12px 42px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', fontSize: '0.9rem' }} />
              </div>
              <button disabled={isSubmittingLead} type="submit" style={{ marginTop: '1rem', width: '100%', padding: '14px', background: '#D4AF37', color: '#000', borderRadius: '12px', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
                {isSubmittingLead ? "AUTORIZANDO..." : "INICIAR CHAT"} <FiArrowRight />
              </button>
            </form>
            
            <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', flex: 1 }} />
              <span style={{ fontSize: '0.65rem', opacity: 0.3, fontWeight: 800 }}>O TAMBIÉN</span>
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', flex: 1 }} />
            </div>

            <a 
              href={`https://wa.me/${botConfig?.whatsapp_phone_number?.replace(/\+/g, '') || "573223067822"}?text=${encodeURIComponent(`¡Hola! Vengo desde el ecosistema web de Stratix. Mi nombre es ${leadData.name}. [STRATIX-ID:${sessionId}]`)}`} 
              target="_blank" 
              style={{ marginTop: '1.5rem', textDecoration: 'none', width: '100%', padding: '12px', background: 'rgba(37, 211, 102, 0.1)', border: '1px solid rgba(37, 211, 102, 0.3)', color: '#25D366', borderRadius: '12px', fontWeight: 800, fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
            >
              <FiMessageSquare /> CONTINUAR EN WHATSAPP
            </a>
            
            <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', opacity: 0.3, fontSize: '0.6rem', letterSpacing: '1px' }}>
              <FiShield /> ENCRIPTACIÓN ZERO-TRUST ACTIVA
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="chat"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
          >
            <div ref={scrollRef} style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {messages.map((msg, i) => (
                <div key={i} style={{
                  alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                  background: msg.role === "user" ? "#D4AF37" : "rgba(255,255,255,0.06)",
                  color: msg.role === "user" ? "#000" : "white",
                  padding: '12px 16px', borderRadius: msg.role === "user" ? '18px 18px 2px 18px' : '18px 18px 18px 2px', 
                  fontSize: '0.88rem', maxWidth: '85%', lineHeight: 1.5,
                  boxShadow: msg.role === "user" ? '0 4px 15px rgba(212,175,55,0.2)' : 'none'
                }}>
                  {msg.content}
                </div>
              ))}
              {isTyping && (
                <div style={{ display: 'flex', gap: '4px', padding: '10px' }}>
                  {[0,1,2].map(i => <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D4AF37' }} />)}
                </div>
              )}
            </div>

            <form onSubmit={handleSendMessage} style={{ padding: '1.2rem', background: 'rgba(6,11,20,0.8)', display: 'flex', gap: '10px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu consulta estratégica..."
                style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px 15px', color: 'white', outline: 'none', fontSize: '0.88rem' }}
              />
              <button type="submit" style={{ width: '45px', height: '45px', background: '#D4AF37', border: 'none', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FiSend color="#000" size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <Toaster theme="dark" richColors position="top-center" />
    </motion.div>
  );
}

export default function ChatWidget() {
  return (
    <Suspense fallback={<div style={{ padding: '20px', color: 'white' }}>Iniciando Protocolos Stratix...</div>}>
      <ChatWidgetContent />
    </Suspense>
  );
}