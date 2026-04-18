"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { FiArrowRight, FiPlayCircle, FiStar, FiSend } from "react-icons/fi";

export default function LandingHero() {
  const [mounted, setMounted] = useState(false);
  const [demoMessages, setDemoMessages] = useState([
    { role: 'bot', text: 'Hola, soy el núcleo Opal (V50.30). ¿En qué canal quieres automatizar hoy? (WhatsApp, IG, Web)' }
  ]);
  const [demoInput, setDemoInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [demoMessages, isTyping, mounted]);

  if (!mounted) return <div style={{ minHeight: '800px' }} />;

  const handleDemoChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoInput.trim()) return;
    const userMsg = demoInput;
    setDemoMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setDemoInput("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setDemoMessages(prev => [...prev, { 
        role: 'bot', 
        text: '¡Entendido! Mi motor procesaría esto en < 500ms. Para ver esto con los datos de tu empresa, agenda una demo abajo. ⬇️' 
      }]);
    }, 1500);
  };

  return (
    <header style={{ padding: '12rem 5% 5rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '140%', height: '130%', background: 'radial-gradient(ellipse at 50% 30%, rgba(212,175,55,0.09) 0%, transparent 60%)', zIndex: 0, filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '4rem', position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} style={{ flex: '1 1 500px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '7px 18px', background: 'rgba(212,175,55,0.08)', borderRadius: '30px', border: '1px solid rgba(212,175,55,0.2)', marginBottom: '2.5rem' }}>
            <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ width: '7px', height: '7px', background: '#D4AF37', borderRadius: '50%' }} />
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#D4AF37', letterSpacing: '2px', textTransform: 'uppercase' }}>TU NEGOCIO EN PILOTO AUTOMÁTICO</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 900, lineHeight: 0.95, marginBottom: '2.5rem', letterSpacing: '-3px' }}>
            Vende Más,<br /><span style={{ color: '#D4AF37' }}>Duerme Mejor.</span>
          </h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.6, lineHeight: 1.7, marginBottom: '3.5rem', maxWidth: '520px' }}>
            Stratix Intelligence atiende, califica y cierra ventas por ti en WhatsApp, Instagram y Web — 24/7, sin intervención humana.
          </p>
          <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
            <Link href="/login" style={{ padding: '18px 38px', backgroundColor: '#D4AF37', color: '#000', borderRadius: '14px', fontWeight: 900, textDecoration: 'none', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 12px 35px rgba(212,175,55,0.25)' }}>
              Comenzar Ahora <FiArrowRight />
            </Link>
            <a href="#demo" style={{ padding: '18px 38px', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '14px', fontWeight: 700, textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)' }}>
              <FiPlayCircle /> Ver Demo
            </a>
          </div>
          <div style={{ marginTop: '3rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex' }}>
              {[1,2,3,4].map(i => (
                <div key={i} style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #060B14', background: `hsl(${i * 40}, 60%, 50%)`, marginLeft: i === 1 ? 0 : '-10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700 }}>{['JR','MC','AP','SB'][i-1]}</div>
              ))}
            </div>
            <div>
              <div style={{ display: 'flex', gap: '2px', marginBottom: '2px' }}>{[1,2,3,4,5].map(i => <FiStar key={i} size={12} color="#D4AF37" fill="#D4AF37" />)}</div>
              <span style={{ fontSize: '0.8rem', opacity: 0.5, fontWeight: 600 }}>+500 empresas activas</span>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }} style={{ flex: '1 1 420px', position: 'relative', maxWidth: '500px' }}>
          <div style={{ background: 'rgba(11,17,32,0.8)', backdropFilter: 'blur(24px)', borderRadius: '28px', border: '1px solid rgba(212,175,55,0.2)', padding: '22px', boxShadow: '0 40px 120px rgba(0,0,0,0.6)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px', paddingBottom: '14px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '11px', background: '#D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="/stratix_shield.svg" alt="Opal" style={{ width: '22px', height: '22px' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 800 }}>Opal Logic Demo</div>
                <div style={{ fontSize: '0.68rem', opacity: 0.4, display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#27C93F' }} />
                  Activo Ahora
                </div>
              </div>
              <div style={{ display: 'flex', gap: '5px' }}>{['#FF5F57','#FEBC2E','#28C840'].map(c => <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />)}</div>
            </div>
            <div style={{ height: '280px', overflowY: 'auto', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '12px', padding: '4px' }}>
              <AnimatePresence initial={false}>
                {demoMessages.map((msg, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    style={{ background: msg.role === 'bot' ? 'rgba(255,255,255,0.06)' : '#D4AF37', color: msg.role === 'bot' ? 'white' : '#000', padding: '10px 14px', borderRadius: '14px', fontSize: '0.83rem', maxWidth: '88%', alignSelf: msg.role === 'bot' ? 'flex-start' : 'flex-end' }}
                  >{msg.text}</motion.div>
                ))}
                {isTyping && (
                  <div style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.05)', borderRadius: '14px', alignSelf: 'flex-start', display: 'flex', gap: '5px' }}>
                    {[0,1,2].map(i => <motion.div key={i} animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }} style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#D4AF37' }} />)}
                  </div>
                )}
              </AnimatePresence>
              <div ref={chatEndRef} />
            </div>
            <form onSubmit={handleDemoChat} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '14px', padding: '8px 10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input type="text" placeholder="Prueba a Opal aquí..." value={demoInput} onChange={e => setDemoInput(e.target.value)} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '0.85rem', outline: 'none', flex: 1 }} />
              <button type="submit" aria-label="Enviar mensaje de prueba" style={{ width: '32px', height: '32px', borderRadius: '9px', background: '#D4AF37', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiSend color="#000" size={14} /></button>
            </form>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
