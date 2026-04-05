"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "sonner";
import { 
  FiArrowRight, FiCheck, FiCpu, FiLayout, FiTarget, FiZap, FiShield, 
  FiChevronDown, FiPlayCircle, FiActivity, FiShoppingCart, 
  FiDatabase, FiGlobe, FiClock, FiLayers, FiUsers, FiTrendingUp, FiSend, FiMenu, FiX, FiStar
} from "react-icons/fi";
import { supabase } from "@/lib/supabase";
import { CURRENCIES, PRICING_PLANS, USE_CASES, INTEGRATIONS } from "@/lib/constants";

function LandingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [leads, setLeads] = useState(100);
  const [currency, setCurrency] = useState<'USD' | 'COP'>('USD');
  const [activeUseCase, setActiveUseCase] = useState('ecommerce');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [mobileMenuOpen]);

  const exchangeRate = CURRENCIES[currency].rate;
  const symbol = CURRENCIES[currency].symbol;

  const [hasAutoCheckedOut, setHasAutoCheckedOut] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", honey: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Demo chat
  const [demoMessages, setDemoMessages] = useState([
    { role: 'bot', text: 'Hola, soy el núcleo Opal. ¿En qué canal quieres automatizar hoy? (WhatsApp, IG, Web)' }
  ]);
  const [demoInput, setDemoInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [demoMessages, isTyping]);

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

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honey) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/widget/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ botId: "demo", name: formData.name, email: formData.email, phone: formData.phone, company: formData.company })
      });
      if (res.ok) setSubmitted(true);
    } catch (err) {
      console.error("Error enviando lead:", err);
      toast.error("Hubo un error al procesar tu solicitud. Intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  useEffect(() => {
    const planFromUrl = searchParams.get("plan");
    if (planFromUrl && !hasAutoCheckedOut) {
      setHasAutoCheckedOut(true);
      handleCheckout(planFromUrl);
    }
  }, [searchParams, hasAutoCheckedOut]);

  const handleCheckout = async (planId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push(`/login?redirect=/&plan=${planId}`); return; }
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId, email: user.email, userId: user.id })
      });
      const data = await response.json();
      if (data.url) { window.location.href = data.url; }
      else { toast.error("Error al iniciar el pago: " + (data.error || "Desconocido")); }
    } catch (err: any) {
      toast.error("Hubo un problema con la pasarela de pagos.");
    }
  };

  const savedPerInteraction = 9.6;
  const savingsMonthly = Math.round(leads * savedPerInteraction * 0.8);
  const hoursSaved = Math.round(leads * 0.25);

  return (
    <>

      <div style={{ backgroundColor: '#060B14', minHeight: '100vh', color: 'white', overflowX: 'hidden' }}>

        {/* 1. NAVEGACIÓN */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.2rem 5%', background: 'rgba(6,11,20,0.96)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid rgba(212,175,55,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Image src="/stratix_shield.svg" alt="Stratix Logo" width={32} height={32} priority />
            <span style={{ fontSize: '1.4rem', fontWeight: 900, letterSpacing: '-0.5px' }}>Strat<span style={{ color: '#D4AF37' }}>ix</span> Intelligence</span>
          </div>

          <div className="sx-desktop-nav" style={{ display: 'flex', gap: '2rem', alignItems: 'center', fontWeight: 600, fontSize: '0.85rem' }}>
            <a href="#proposito" className="sx-nav-link" style={{ color: 'white', textDecoration: 'none', opacity: 0.5 }}>Propósito</a>
            <a href="#labs" className="sx-nav-link" style={{ color: 'white', textDecoration: 'none', opacity: 0.5 }}>Labs</a>
            <a href="#planes" className="sx-nav-link" style={{ color: 'white', textDecoration: 'none', opacity: 0.5 }}>Planes</a>
            <Link href="/login" className="sx-nav-link" style={{ color: '#D4AF37', textDecoration: 'none', opacity: 0.8 }}>Ingresar</Link>
            <Link href="/login" style={{ padding: '11px 24px', backgroundColor: '#D4AF37', color: '#000', borderRadius: '10px', textDecoration: 'none', fontWeight: 900, letterSpacing: '0.3px', boxShadow: '0 8px 24px rgba(212,175,55,0.25)', transition: '0.2s' }}>Acceso Élite</Link>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="sx-mobile-menu-btn" 
            aria-label={mobileMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
            style={{ display: 'none', background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.5rem' }}
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </nav>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} style={{ position: 'fixed', top: '68px', left: 0, right: 0, zIndex: 99, background: 'rgba(6,11,20,0.98)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(212,175,55,0.1)', padding: '1.5rem 5%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {['#proposito', '#labs', '#planes'].map((href, i) => (
                <a key={i} href={href} onClick={() => setMobileMenuOpen(false)} style={{ color: 'white', textDecoration: 'none', fontWeight: 700, fontSize: '1.1rem', opacity: 0.7, padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  {href === '#proposito' ? 'Propósito' : href === '#labs' ? 'Labs' : 'Planes'}
                </a>
              ))}
              <Link href="/login" style={{ padding: '16px', backgroundColor: '#D4AF37', color: '#000', borderRadius: '12px', textDecoration: 'none', fontWeight: 900, textAlign: 'center' }}>Acceso Élite</Link>
            </motion.div>
          )}
        </AnimatePresence>

        <main>
          {/* 2. HERO */}
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
                      <Image src="/stratix_shield.svg" alt="Opal" width={22} height={22} />
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

          {/* 1.5 EL CUELLO DE BOTELLA */}
          <section style={{ padding: '8rem 5%', background: '#03070C' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '1.5rem' }}>El Cuello de <span style={{ color: '#D4AF37' }}>Botella Actual</span></h2>
                <p style={{ opacity: 0.5, fontSize: '1.2rem' }}>¿Cuánto dinero estás dejando sobre la mesa por procesos manuales?</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ padding: '4rem', background: 'rgba(255, 95, 87, 0.03)', borderRadius: '32px', border: '1px solid rgba(255, 95, 87, 0.1)' }}>
                  <h3 style={{ color: '#FF5F57', fontSize: '1.8rem', fontWeight: 900, marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '15px' }}><FiClock /> Sin Stratix</h3>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem', opacity: 0.7 }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><FiX color="#FF5F57" /> Leads perdidos en la madrugada</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><FiX color="#FF5F57" /> Respuestas lentas (&gt; 30 min)</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><FiX color="#FF5F57" /> Equipos saturados y estresados</li>
                  </ul>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} style={{ padding: '4rem', background: 'rgba(212, 175, 55, 0.05)', borderRadius: '32px', border: '1px solid rgba(212, 175, 55, 0.2)', boxShadow: '0 20px 60px rgba(212,175,55,0.05)' }}>
                  <h3 style={{ color: '#D4AF37', fontSize: '1.8rem', fontWeight: 900, marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '15px' }}><FiZap /> Con Stratix</h3>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><FiCheck color="#D4AF37" /> Atención 24/7 en milisegundos</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><FiCheck color="#D4AF37" /> Calificación automática</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><FiCheck color="#D4AF37" /> Cierre de ventas en piloto automático</li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </section>

          {/* 2.5 TRUSTED BY */}
          <section style={{ padding: '2.5rem 5%', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.8rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.68rem', fontWeight: 800, opacity: 0.25, letterSpacing: '3px', textTransform: 'uppercase' }}>Empresas que ya escalan con Stratix</span>
              <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '3.5rem', opacity: 0.35, filter: 'grayscale(1)' }}>
                {['STELLAR·LABS','VORTEX·MEDIA','OXIGEN·CORP','NEXUS·AI','ELEVATE·GROUP'].map(name => <span key={name} style={{ fontSize: '1rem', fontWeight: 900 }}>{name}</span>)}
              </div>
            </div>
          </section>

          {/* 3. CASOS DE USO */}
          <section style={{ padding: '8rem 5%' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <h2 style={{ textAlign: 'center', fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, marginBottom: '4rem' }}>Una Solución para <span style={{ color: '#D4AF37' }}>Cada Industria</span></h2>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', marginBottom: '3.5rem', flexWrap: 'wrap' }}>
                {USE_CASES.map(uc => (
                  <button key={uc.id} onClick={() => setActiveUseCase(uc.id)} style={{ padding: '11px 22px', borderRadius: '12px', border: '1px solid', borderColor: activeUseCase === uc.id ? '#D4AF37' : 'rgba(255,255,255,0.1)', background: activeUseCase === uc.id ? 'rgba(212,175,55,0.1)' : 'transparent', color: activeUseCase === uc.id ? '#D4AF37' : 'rgba(255,255,255,0.6)', fontWeight: 700, cursor: 'pointer' }}>{uc.title}</button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                {USE_CASES.filter(uc => uc.id === activeUseCase).map(uc => (
                  <motion.div key={uc.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '28px', padding: '3.5rem', border: '1px solid rgba(212,175,55,0.1)', display: 'flex', alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: '1 1 380px' }}>
                      <div style={{ fontSize: '2.5rem', color: '#D4AF37', marginBottom: '1.8rem' }}>{uc.id === 'ecommerce' ? <FiShoppingCart /> : uc.id === 'realestate' ? <FiLayout /> : uc.id === 'health' ? <FiActivity /> : <FiCpu />}</div>
                      <h3 style={{ fontSize: '1.9rem', fontWeight: 800, marginBottom: '1.2rem' }}>{uc.title} Inteligente</h3>
                      <p style={{ opacity: 0.6, fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2rem' }}>{uc.description}</p>
                      <div style={{ padding: '13px 22px', background: 'rgba(212,175,55,0.08)', borderRadius: '12px', border: '1px solid rgba(212,175,55,0.2)', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                        <FiTrendingUp color="#D4AF37" /> <span style={{ fontWeight: 800, color: '#D4AF37' }}>Impacto: {uc.impact}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>

          {/* 3.5 STRATIX LABS (Arquitectura Neuronal) */}
          <section id="labs" style={{ padding: '8rem 5%', background: '#060B14', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60%', height: '60%', background: 'radial-gradient(circle, rgba(212,175,55,0.03) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
              <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                <div style={{ color: '#D4AF37', fontSize: '0.75rem', fontWeight: 900, letterSpacing: '4px', marginBottom: '1rem', textTransform: 'uppercase' }}>Ingeniería de Escala</div>
                <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900 }}>Stratix Labs: <span style={{ color: '#D4AF37' }}>Arquitectura Neuronal</span></h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
                {[
                  { title: 'Opal Logic', desc: 'Motor de procesamiento natural que entiende el contexto y la intención de compra real del cliente.', icon: <FiCpu /> },
                  { title: 'Stitch Engine', desc: 'Conector universal que sincroniza tu CRM, inventario y pasarelas de pago en tiempo real.', icon: <FiLayers /> },
                  { title: 'RAG Neural', desc: 'Base de conocimiento dinámica que aprende de tus PDFs, webs y catálogos al instante con IA avanzada.', icon: <FiDatabase /> }
                ].map((lab, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ padding: '3.5rem', background: 'rgba(255,255,255,0.01)', borderRadius: '28px', border: '1px solid rgba(212,175,55,0.15)', backdropFilter: 'blur(10px)' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(212,175,55,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', color: '#D4AF37', marginBottom: '2rem' }}>{lab.icon}</div>
                    <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '1.2rem' }}>{lab.title}</h3>
                    <p style={{ opacity: 0.5, lineHeight: 1.7, fontSize: '1.05rem' }}>{lab.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* 4. INTEGRATIONS CLOUD */}
          <section style={{ padding: '4rem 0', background: 'rgba(255,255,255,0.008)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
            <motion.div animate={{ x: [0, -1200] }} transition={{ repeat: Infinity, duration: 35, ease: "linear" }} style={{ display: 'flex', gap: '5rem', alignItems: 'center', whiteSpace: 'nowrap' }}>
              {[...INTEGRATIONS, ...INTEGRATIONS].map((int, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.35 }}>
                  <Image src={int.icon} alt={int.name} width={22} height={22} style={{ objectFit: 'contain', filter: 'grayscale(1) invert(1)' }} />
                  <span style={{ fontWeight: 700 }}>{int.name}</span>
                </div>
              ))}
            </motion.div>
          </section>

          {/* 5. ROI CALCULATOR */}
          <section id="roi" style={{ padding: '10rem 5%', background: '#03070C' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
              <motion.div style={{ background: 'rgba(255,255,255,0.015)', backdropFilter: 'blur(30px)', borderRadius: '40px', border: '1px solid rgba(212,175,55,0.15)', padding: '5rem 3.5rem' }}>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginBottom: '4rem' }}>Calcula tu <span style={{ color: '#D4AF37' }}>ROI Mensual</span></h2>
                <div style={{ maxWidth: '650px', margin: '0 auto' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontWeight: 700 }}>
                    <span style={{ fontSize: '1.1rem' }}>Interacciones Mensuales</span>
                    <span style={{ color: '#D4AF37', fontSize: '1.4rem' }}>{leads.toLocaleString()}</span>
                  </div>
                  <input type="range" min="10" max="5000" step="10" value={leads} onChange={e => setLeads(parseInt(e.target.value))} />
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem', marginTop: '5rem' }}>
                    <div style={{ padding: '2.5rem', background: 'rgba(212,175,55,0.05)', borderRadius: '28px', border: '1px solid rgba(212,175,55,0.2)' }}>
                      <div style={{ fontSize: '0.72rem', fontWeight: 900, color: '#D4AF37', marginBottom: '1.2rem' }}>AHORRO OPERATIVO</div>
                      <div style={{ fontSize: '2.8rem', fontWeight: 900 }}>${savingsMonthly.toLocaleString()}</div>
                      <div style={{ fontSize: '0.72rem', opacity: 0.3, marginTop: '6px' }}>USD / MES</div>
                    </div>
                    <div style={{ padding: '2.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '28px' }}>
                      <div style={{ fontSize: '0.72rem', fontWeight: 900, opacity: 0.35, marginBottom: '1.2rem' }}>TIEMPO RECUPERADO</div>
                      <div style={{ fontSize: '2.8rem', fontWeight: 900, color: '#D4AF37' }}>{hoursSaved.toLocaleString()} <span style={{ fontSize: '1.2rem' }}>hrs</span></div>
                      <div style={{ fontSize: '0.72rem', opacity: 0.3, marginTop: '6px' }}>MES</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* 5.5 TESTIMONIALS */}
          <section style={{ padding: '8rem 5%', background: '#060B14' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900 }}>Voces de <span style={{ color: '#D4AF37' }}>Liderazgo</span></h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
                {[
                  { author: "Director de Operaciones", company: "Vortex Media", text: "Redujimos el costo de adquisición un 35% y ahora cerramos ventas a las 3 AM sin intervención humana." },
                  { author: "CEO & Founder", company: "Nexus AI Global", text: "Stratix no es un bot, es un arquitecto de ventas. La integración con nuestro CRM fue impecable." },
                  { author: "Head of Growth", company: "Elevate Group", text: "Pasamos de calificar leads en 24 horas a hacerlo en 400ms. El escalamiento ha sido masivo." }
                ].map((t, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ padding: '3rem', background: 'rgba(255,255,255,0.02)', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)' }}>
                    <div style={{ display: 'flex', gap: '4px', marginBottom: '1.5rem' }}>{[1,2,3,4,5].map(s => <FiStar key={s} size={14} color="#D4AF37" fill="#D4AF37" />)}</div>
                    <p style={{ fontSize: '1.1rem', fontStyle: 'italic', opacity: 0.8, marginBottom: '2.5rem', lineHeight: 1.6 }}>"{t.text}"</p>
                    <div>
                      <div style={{ fontWeight: 900, color: '#D4AF37' }}>{t.author}</div>
                      <div style={{ fontSize: '0.85rem', opacity: 0.4 }}>{t.company}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* 6. PLANES */}
          <section id="planes" style={{ padding: '8rem 5%' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900 }}>Inversión <span style={{ color: '#D4AF37' }}>Estratégica</span></h2>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', marginTop: '3rem' }}>
                  <span style={{ fontWeight: 800, opacity: currency === 'USD' ? 1 : 0.25 }}>USD</span>
                  <div onClick={() => setCurrency(currency === 'USD' ? 'COP' : 'USD')} style={{ width: '60px', height: '30px', background: 'rgba(212,175,55,0.1)', borderRadius: '15px', position: 'relative', cursor: 'pointer' }}>
                    <motion.div animate={{ x: currency === 'USD' ? 4 : 30 }} transition={{ type: 'spring' }} style={{ width: '22px', height: '22px', background: '#D4AF37', borderRadius: '50%', marginTop: '4px' }} />
                  </div>
                  <span style={{ fontWeight: 800, opacity: currency === 'COP' ? 1 : 0.25 }}>COP</span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem' }}>
                {PRICING_PLANS.map((plan, i) => (
                  <motion.div key={i} className="sx-plan-card" style={{ padding: '4rem 3rem', borderRadius: '36px', border: plan.highlight ? '2px solid #D4AF37' : '1px solid rgba(255,255,255,0.06)', background: plan.highlight ? 'rgba(212,175,55,0.03)' : 'rgba(255,255,255,0.01)', textAlign: 'center', position: 'relative' }}>
                    {plan.highlight && <div style={{ position: 'absolute', top: '-18px', left: '50%', transform: 'translateX(-50%)', background: '#D4AF37', color: '#000', padding: '7px 22px', borderRadius: '30px', fontSize: '0.75rem', fontWeight: 900 }}>RECOMENDADO</div>}
                    <h3 style={{ marginBottom: '1.2rem', fontWeight: 900, fontSize: '1.6rem' }}>{plan.name}</h3>
                    <div style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '2.5rem' }}>
                      <span style={{ fontSize: '1.2rem', opacity: 0.5 }}>{symbol}</span>{(plan.priceUsd * exchangeRate).toLocaleString()}<span style={{ fontSize: '0.85rem', opacity: 0.3 }}>/mes</span>
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', marginBottom: '3rem' }}>
                      {plan.features.map((f, fi) => (
                        <li key={fi} style={{ marginBottom: '1rem', display: 'flex', gap: '12px', fontSize: '0.95rem', opacity: 0.6 }}><FiCheck color="#D4AF37" /> {f}</li>
                      ))}
                    </ul>
                    <button onClick={() => handleCheckout(plan.name.toLowerCase())} style={{ width: '100%', padding: '18px', background: plan.highlight ? '#D4AF37' : 'transparent', border: '1px solid #D4AF37', color: plan.highlight ? '#000' : '#D4AF37', borderRadius: '14px', fontWeight: 900, cursor: 'pointer' }}>{plan.name === 'Enterprise' ? 'Contactar' : 'Elegir Plan'}</button>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* 7. DEMO FORM */}
          <section id="demo" style={{ padding: '8rem 5%', background: '#0B1120' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginBottom: '1.8rem' }}>¿Listo para escalar <span style={{ color: '#D4AF37' }}>sin límites?</span></h2>
                <p style={{ opacity: 0.55, fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>Deja tus datos y un arquitecto de IA diseñará tu solución en menos de 24 horas.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  {['Diagnóstico Gratis', 'ROI Proyectado', 'Sin Compromiso'].map(b => (
                    <div key={b} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}><FiCheck color="#D4AF37" /> <span style={{ fontWeight: 600 }}>{b}</span></div>
                  ))}
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2.8rem', borderRadius: '28px', border: '1px solid rgba(212,175,55,0.2)' }}>
                {submitted ? (
                  <div style={{ textAlign: 'center' }}><h3>¡Solicitud Enviada!</h3><p>Te contactaremos pronto.</p></div>
                ) : (
                  <form onSubmit={handleDemoSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.3rem' }}>
                    <input type="text" name="honey" style={{ display: 'none' }} value={formData.honey} onChange={e => setFormData({...formData, honey: e.target.value})} />
                    {[{ label: 'Nombre', key: 'name', type: 'text' }, { label: 'Empresa', key: 'company', type: 'text' }, { label: 'Email Corporativo', key: 'email', type: 'email' }, { label: 'WhatsApp', key: 'phone', type: 'tel' }].map(f => (
                      <div key={f.key}>
                        <label style={{ display: 'block', fontSize: '0.75rem', opacity: 0.45, marginBottom: '0.4rem' }}>{f.label}</label>
                        <input required type={f.type} value={formData[f.key as keyof typeof formData]} onChange={e => setFormData({...formData, [f.key]: e.target.value})} style={{ width: '100%', padding: '14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white' }} />
                      </div>
                    ))}
                    <button type="submit" disabled={isSubmitting} style={{ width: '100%', padding: '18px', background: '#D4AF37', color: '#000', borderRadius: '12px', fontWeight: 900, cursor: 'pointer', border: 'none' }}>{isSubmitting ? 'PROCESANDO...' : 'SOLICITAR DEMO'}</button>
                  </form>
                )}
              </div>
            </div>
          </section>
          {/* 8. CLOSING CTA */}
          <section style={{ padding: '6rem 5%', background: 'linear-gradient(135deg, #060B14 0%, #0B1120 100%)', textAlign: 'center', borderTop: '1px solid rgba(212,175,55,0.1)' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '2rem' }}>El futuro no espera.<br/><span style={{ color: '#D4AF37' }}>Tu competencia tampoco.</span></h2>
              <p style={{ fontSize: '1.2rem', opacity: 0.5, marginBottom: '3rem' }}>Únete a las empresas que ya están escalando con inteligencia real.</p>
              <Link href="/login" style={{ padding: '20px 45px', backgroundColor: '#D4AF37', color: '#000', borderRadius: '15px', fontWeight: 900, textDecoration: 'none', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '12px', boxShadow: '0 15px 45px rgba(212,175,55,0.3)' }}>
                EMPEZAR AHORA <FiArrowRight />
              </Link>
            </div>
          </section>
        </main>

        <footer style={{ padding: '7rem 5% 4rem', background: '#020508', borderTop: '1px solid rgba(212,175,55,0.05)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '3rem', marginBottom: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}><Image src="/stratix_shield.svg" alt="Logo" width={24} height={24} /><span style={{ fontWeight: 900 }}>Stratix Intelligence</span></div>
              <p style={{ opacity: 0.2, fontSize: '0.85rem' }}>Automatización para empresas que no aceptan límites.</p>
            </div>
            {['Empresa', 'Ecosistema', 'Legal'].map((cat, i) => (
              <div key={i}>
                <h4 style={{ fontSize: '0.75rem', fontWeight: 900, color: '#D4AF37', marginBottom: '1.5rem' }}>{cat}</h4>
                <ul style={{ listStyle: 'none', padding: 0, opacity: 0.3, fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {i === 0 ? (
                    ['Diagnóstico Gratis', 'Planes Élite', 'Casos de Éxito', 'Partners'].map(l => (
                      <li key={l}><a href={l === 'Planes Élite' ? '#planes' : '#demo'} className="sx-footer-link" style={{ color: 'inherit', textDecoration: 'none' }}>{l}</a></li>
                    ))
                  ) : i === 1 ? (
                    ['Opal Logic', 'Stitch Engine', 'RAG Neural', 'API Docs'].map(l => (
                      <li key={l}><a href="#proposito" className="sx-footer-link" style={{ color: 'inherit', textDecoration: 'none' }}>{l}</a></li>
                    ))
                  ) : (
                    ['Privacidad', 'Términos', 'Cookies'].map(l => (
                      <li key={l}><a href="#" className="sx-footer-link" style={{ color: 'inherit', textDecoration: 'none' }}>{l}</a></li>
                    ))
                  )}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', opacity: 0.2, fontSize: '0.75rem' }}>
            <span>© 2026 Stratix Intelligence. Colombia.</span>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <a href="https://x.com/stratixai" target="_blank" style={{ color: 'inherit', textDecoration: 'none' }}>TWITTER / X</a>
              <a href="https://linkedin.com/company/stratix" target="_blank" style={{ color: 'inherit', textDecoration: 'none' }}>LINKEDIN</a>
              <a href="https://instagram.com/stratixai" target="_blank" style={{ color: 'inherit', textDecoration: 'none' }}>INSTAGRAM</a>
            </div>
          </div>
        </footer>
        <Toaster theme="dark" richColors position="bottom-right" />
      </div>
    </>
  );
}

export default function LandingPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#060B14' }} />}>
      <LandingContent />
    </Suspense>
  );
}
