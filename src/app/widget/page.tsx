"use client";

import { useState, useEffect, useRef } from "react";
import { FiSend, FiMessageSquare, FiX } from "react-icons/fi";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ChatWidget() {
  const searchParams = useSearchParams();
  const botId = searchParams.get("bot-id");

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", content: "¡Hola! ¿En qué puedo ayudarte hoy?" }]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [botConfig, setBotConfig] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Cargar configuración del bot al iniciar
  useEffect(() => {
    async function getBot() {
      if (!botId) return;
      const { data } = await supabase.from("bots").select("*").eq("id", botId).single();
      if (data) setBotConfig(data);
    }
    getBot();
  }, [botId]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

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
      setMessages(prev => [...prev, { role: "assistant", content: "Lo siento, tengo problemas de conexión." }]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed', bottom: '20px', right: '20px',
          width: '60px', height: '60px', borderRadius: '50%',
          background: '#D4AF37', border: 'none', cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}
      >
        <FiMessageSquare size={28} color="#000" />
      </button>
    );
  }

  return (
    <div style={{
      position: 'fixed', bottom: '20px', right: '20px',
      width: '380px', height: '600px', background: '#0B1120',
      borderRadius: '20px', border: '1px solid rgba(212,175,55,0.2)',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
      boxShadow: '0 10px 40px rgba(0,0,0,0.5)', zIndex: 9999
    }}>
      {/* Header Widget */}
      <div style={{ background: '#060B14', padding: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(212,175,55,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/stratix_shield.svg" style={{ width: '24px' }} alt="Logo" />
          <span style={{ color: 'white', fontWeight: 800, fontSize: '0.9rem' }}>{botConfig?.name || "Stratix AI"}</span>
        </div>
        <FiX onClick={() => setIsOpen(false)} style={{ cursor: 'pointer', color: 'white' }} />
      </div>

      {/* Messages Area */}
      <div ref={scrollRef} style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
            background: msg.role === "user" ? "#D4AF37" : "rgba(255,255,255,0.05)",
            color: msg.role === "user" ? "#000" : "white",
            padding: '10px 15px', borderRadius: '15px', fontSize: '0.9rem', maxWidth: '85%'
          }}>
            {msg.content}
          </div>
        ))}
        {isTyping && <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem' }}>Escribiendo...</div>}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSendMessage} style={{ padding: '1rem', background: '#060B14', display: 'flex', gap: '8px' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe aquí..."
          style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '10px', padding: '10px', color: 'white', outline: 'none' }}
        />
        <button type="submit" style={{ background: '#D4AF37', border: 'none', borderRadius: '10px', padding: '10px', cursor: 'pointer' }}>
          <FiSend color="#000" />
        </button>
      </form>
    </div>
  );
}