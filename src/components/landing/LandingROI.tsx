"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { FiMessageSquare, FiSend, FiStar, FiCheck, FiArrowRight, FiZap } from "react-icons/fi";

const STEPS = [
  { num: "1", title: "Conecta tu WhatsApp", desc: "Vinculamos tu número empresarial en minutos" },
  { num: "2", title: "Sube tu información", desc: "PDFs, catálogos, precios, políticas" },
  { num: "3", title: "Listo para vender", desc: "Tu agente responde 24/7 automáticamente" }
];

const TESTIMONIALS = [
  { author: "María González", role: "Directora Comercial", company: "Inmobiliaria Cúcuta", text: "Cerramos 3 propiedades en 2 semanas sin atender WhatsApp manualmente." },
  { author: "Carlos Mendoza", role: "CEO", company: "TiendaTech", text: "Nuestro chatbot se convirtió en una máquina de ventas 24/7." },
  { author: "Andrea Ruiz", role: "Gerenta de Operaciones", company: "Clínica Dental Plus", text: "Reducimos citas perdidas por falta de respuesta en un 85%." }
];

export default function LandingHowItWorks() {
  const [mounted, setMounted] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'bot', text: '¡Hola! Soy el agente IA de Stratix. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  if (!mounted) return <div style={{ minHeight: '400px' }} />;

  const handleChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        "¡Excelente pregunta! Déjame consultarlo en nuestra base de conocimientos...",
        "Perfecto, te cuento más sobre eso. ¿Tienes otras dudas?",
        "¡Claro! Te paso esa información. ¿En qué más puedo ayudarte?"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setChatMessages(prev => [...prev, { role: 'bot', text: randomResponse }]);
    }, 1500);
  };

  return (
    <>
      {/* CÓMO FUNCIÓNA */}
      <section id="como-funciona" style={{ padding: '10rem 5%', background: '#030712' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span style={{ display: 'inline-block', padding: '10px 20px', background: 'rgba(212,175,55,0.08)', borderRadius: '30px', border: '1px solid rgba(212,175,55,0.2)', marginBottom: '1.5rem', fontSize: '0.7rem', fontWeight: 800, color: '#D4AF37', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Cómo Funciona</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} style={{ fontSize: 'clamp(2.2rem, 5vw, 3rem)', fontWeight: 900, marginBottom: '1rem' }}>En 3 pasos<span style={{ color: '#D4AF37' }}>STARTIX</span></motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} style={{ fontSize: '1.1rem', opacity: 0.5, maxWidth: '500px', margin: '0 auto' }}>Configura tu agente IA en minutos. Sin código, sin complicaciones.</motion.p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                style={{ padding: '2.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid rgba(212,175,55,0.15)', textAlign: 'center' }}
              >
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '1.3rem', fontWeight: 900, color: '#000' }}>{step.num}</div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.5rem' }}>{step.title}</h3>
                <p style={{ fontSize: '0.95rem', opacity: 0.5 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO INTERACTIVA */}
      <section id="demo" style={{ padding: '10rem 5%', background: '#060B14' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ display: 'inline-block', padding: '10px 20px', background: 'rgba(212,175,55,0.08)', borderRadius: '30px', border: '1px solid rgba(212,175,55,0.2)', marginBottom: '1.5rem', fontSize: '0.7rem', fontWeight: 800, color: '#D4AF37', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Prueba Gratis</span>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, marginBottom: '1rem' }}>Chatea con<span style={{ color: '#D4AF37' }}> nuestro agente</span></h2>
            <p style={{ fontSize: '1rem', opacity: 0.5 }}>Pregúntale lo que quieras. Es gratis y no te pide nada.</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid rgba(212,175,55,0.15)', overflow: 'hidden' }}
          >
            <div style={{ padding: '1rem 1.5rem', background: 'rgba(212,175,55,0.08)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FiMessageSquare size={18} color="#000" />
                </div>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800 }}>Stratix Agent</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.5 }}>IA Premium · Siempre disponible</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: '#10B981' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }} />
                Online
              </div>
            </div>

            <div style={{ height: '300px', overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {chatMessages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    background: msg.role === 'bot' ? 'rgba(255,255,255,0.05)' : 'rgba(212,175,55,0.15)',
                    color: '#fff',
                    padding: '1rem 1.2rem',
                    borderRadius: '16px',
                    fontSize: '0.95rem',
                    maxWidth: '85%',
                    alignSelf: msg.role === 'bot' ? 'flex-start' : 'flex-end'
                  }}
                >
                  {msg.text}
                </motion.div>
              ))}
              {isTyping && (
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem 1.2rem', borderRadius: '16px', fontSize: '0.85rem', opacity: 0.5 }}>
                  Escribiendo...
                </div>
              )}
              <div ref={chatRef} />
            </div>

            <form onSubmit={handleChat} style={{ padding: '1rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '1rem' }}>
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Escribe tu mensaje..."
                style={{ flex: 1, padding: '14px 18px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '0.95rem', outline: 'none' }}
              />
              <button type="submit" style={{ padding: '14px 20px', background: '#D4AF37', border: 'none', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FiSend size={18} color="#000" />
              </button>
            </form>
          </motion.div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <a href="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '16px 32px', background: '#D4AF37', color: '#000', borderRadius: '14px', fontWeight: 900, fontSize: '1rem', textDecoration: 'none' }}>
              Crear mi agente gratis <FiArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '8rem 5%', background: '#030712' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ display: 'inline-block', padding: '10px 20px', background: 'rgba(212,175,55,0.08)', borderRadius: '30px', border: '1px solid rgba(212,175,55,0.2)', marginBottom: '1.5rem', fontSize: '0.7rem', fontWeight: 800, color: '#D4AF37', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Casos de Éxito</span>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900 }}>Lo que dicen<span style={{ color: '#D4AF37' }}> nuestros clientes</span></h2>
        </div>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ padding: '2.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '1.5rem' }}>{[1,2,3,4,5].map(s => <FiStar key={s} size={14} color="#D4AF37" fill="#D4AF37" />)}</div>
              <p style={{ fontSize: '1.05rem', opacity: 0.8, marginBottom: '2rem', lineHeight: 1.6 }}>"{t.text}"</p>
              <div>
                <div style={{ fontWeight: 800, color: '#D4AF37', fontSize: '1rem' }}>{t.author}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.4 }}>{t.role} @ {t.company}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* GARANTÍAS */}
      <section style={{ padding: '8rem 5%', background: '#060B14' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {[
            { icon: <FiZap />, title: "Setup en 15 minutos", desc: "Tu agente funcionando el mismo día" },
            { icon: <FiCheck />, title: "14 días gratis", desc: "Sin tarjeta, sin compromiso" },
            { icon: <FiMessageSquare />, title: "Soporte real", desc: "Te ayudamos en Español siempre" }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}
            >
              <div style={{ fontSize: '1.8rem', color: '#D4AF37', marginBottom: '1rem' }}>{item.icon}</div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>{item.title}</h4>
              <p style={{ fontSize: '0.9rem', opacity: 0.5 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}