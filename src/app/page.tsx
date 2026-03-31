"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiArrowRight, FiCheck, FiCpu, FiLayout, FiTarget, FiZap, FiShield, 
  FiChevronDown, FiPlayCircle, FiActivity, FiSmartphone, FiShoppingCart, 
  FiDatabase, FiGlobe, FiClock, FiLayers, FiUsers, FiBox 
} from "react-icons/fi";
import { supabase } from "@/lib/supabase";

import { CURRENCIES, PRICING_PLANS, USE_CASES, INTEGRATIONS } from "@/lib/constants";

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [leads, setLeads] = useState(100);
  const [currency, setCurrency] = useState<'USD' | 'COP'>('USD');
  const [activeUseCase, setActiveUseCase] = useState('ecommerce');

  const exchangeRate = CURRENCIES[currency].rate;
  const symbol = CURRENCIES[currency].symbol;

  // Auto-checkout si regresamos del login con un plan seleccionado
  const [hasAutoCheckedOut, setHasAutoCheckedOut] = useState(false);
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const planFromUrl = params.get("plan");
    if (planFromUrl && !hasAutoCheckedOut) {
      setHasAutoCheckedOut(true);
      handleCheckout(planFromUrl);
    }
  }, []);

  const handleCheckout = async (planId: string) => {
    try {
      // 1. Verificar sesión del usuario
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // Redirigir al login si no hay sesión, guardando el plan deseado
        window.location.href = `/login?redirect=/&plan=${planId}`;
        return;
      }

      // 2. Llamar al API de Checkout
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: planId,
          email: user.email,
          userId: user.id
        })
      });

      const data = await response.json();
      
      if (data.url) {
        // 3. Redirigir a Mercado Pago
        window.location.href = data.url;
      } else {
        alert("Error al iniciar el pago: " + (data.error || "Desconocido"));
      }
    } catch (err: any) {
      console.error("Checkout flow failed:", err);
      alert("Hubo un problema con la pasarela de pagos.");
    }
  };

  return (
    <div style={{ backgroundColor: '#060B14', minHeight: '100vh', color: 'white', fontFamily: 'system-ui, sans-serif', overflowX: 'hidden' }}>
      
      {/* 1. NAVEGACIÓN ÉLITE */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.2rem 5%', background: 'rgba(6, 11, 20, 0.95)', backdropFilter: 'blur(15px)', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid rgba(212, 175, 55, 0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/stratix_shield.svg" alt="Stratix Logo" style={{ height: '32px', width: 'auto' }} />
          <span style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-1px' }}>Strat<span style={{ color: '#D4AF37' }}>ix</span> AI</span>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', fontWeight: 600, fontSize: '0.85rem' }}>
          <a href="#proposito" style={{ color: 'white', textDecoration: 'none', opacity: 0.6 }}>Propósito</a>
          <a href="#labs" style={{ color: 'white', textDecoration: 'none', opacity: 0.6 }}>Labs</a>
          <a href="#planes" style={{ color: 'white', textDecoration: 'none', opacity: 0.6 }}>Planes</a>
          <Link href="/login" style={{ color: '#D4AF37', textDecoration: 'none' }}>Ingresar</Link>
          <Link href="/login" style={{ padding: '10px 22px', backgroundColor: '#D4AF37', color: '#000', borderRadius: '8px', textDecoration: 'none', fontWeight: 900 }}>Acceso Élite</Link>
        </div>
      </nav>

      {/* 2. HERO: ARCHITECTURAL STRATEGIC INTELLIGENCE (REDESIGN) */}
      <header style={{ padding: '8rem 5% 4rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', width: '120%', height: '120%', background: 'radial-gradient(circle at center, rgba(212,175,55,0.08) 0%, transparent 60%)', zIndex: 0, filter: 'blur(60px)' }} />
        
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '4rem', position: 'relative', zIndex: 1 }}>
          
          {/* LADO IZQUIERDO: TEXTO E IMPACTO */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} style={{ flex: '1 1 500px', textAlign: 'left' }}>
            {/* HERO TEXT */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '8px 20px', background: 'rgba(212,175,55,0.1)', borderRadius: '30px', border: '1px solid rgba(212,175,55,0.2)', marginBottom: '2.5rem' }}>
              <div style={{ width: '8px', height: '8px', background: '#D4AF37', borderRadius: '50%' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#D4AF37', letterSpacing: '2px', textTransform: 'uppercase' }}>TU NEGOCIO EN PILOTO AUTOMÁTICO</span>
            </div>
            
            <h1 style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', fontWeight: 900, lineHeight: 0.95, marginBottom: '2.5rem', letterSpacing: '-3px' }}>
              Vende Más, <br />
              <span style={{ color: '#D4AF37' }}>Duerme Mejor.</span>
            </h1>
            
            <p style={{ fontSize: '1.25rem', opacity: 0.6, lineHeight: 1.6, marginBottom: '3.5rem', maxWidth: '550px' }}>
              Stratix AI es la infraestructura de inteligencia que atiende, califica y cierra ventas por ti en WhatsApp, Instagram y Web. <strong>Para todo tipo de empresas.</strong>
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <Link href="/login" style={{ padding: '20px 42px', backgroundColor: '#D4AF37', color: '#000', borderRadius: '14px', fontWeight: 900, textDecoration: 'none', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 10px 30px rgba(212,175,55,0.2)' }}>Comenzar Ahora <FiArrowRight /></Link>
              <a href="#demo" style={{ padding: '20px 42px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', fontWeight: 700, textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)' }}><FiPlayCircle /> Agendar Demo</a>
            </div>
          </motion.div>

          {/* LADO DERECHO: INTERACTIVE PLAYGROUND (NEW) */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} style={{ flex: '1 1 450px', position: 'relative' }}>
            <div style={{ background: 'rgba(11, 17, 32, 0.7)', backdropFilter: 'blur(20px)', borderRadius: '32px', border: '1px solid rgba(212,175,55,0.2)', padding: '24px', boxShadow: '0 40px 100px rgba(0,0,0,0.5)', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src="/stratix_shield.svg" style={{ width: '24px', height: '24px' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>Opal Logic Demo</div>
                  <div style={{ fontSize: '0.7rem', opacity: 0.4, display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#27C93F' }} /> Activo Ahora</div>
                </div>
              </div>
              
              <div style={{ height: '320px', overflowY: 'auto', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '15px', padding: '10px' }}>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px 16px', borderRadius: '16px', fontSize: '0.9rem', maxWidth: '85%', alignSelf: 'flex-start', borderBottomLeftRadius: '4px' }}>
                  Hola, soy el núcleo Opal. ¿En qué canal quieres automatizar hoy? (WhatsApp, IG, Web)
                </div>
                <div style={{ background: '#D4AF37', color: '#000', padding: '12px 16px', borderRadius: '16px', fontSize: '0.9rem', maxWidth: '85%', alignSelf: 'flex-end', borderBottomRightRadius: '4px', fontWeight: 600 }}>
                  Quiero escalar mis ventas por WhatsApp.
                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px 16px', borderRadius: '16px', fontSize: '0.9rem', maxWidth: '85%', alignSelf: 'flex-start', borderBottomLeftRadius: '4px' }}>
                   Entendido. Mi motor de clasificación de leads detectará intenciones calientes y agendará llamadas automáticamente. ¿Te gustaría ver un flujo simulado?
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '16px', padding: '10px 15px', display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid rgba(212,175,55,0.1)' }}>
                <span style={{ fontSize: '0.9rem', opacity: 0.4 }}>Escribe un mensaje...</span>
                <div style={{ marginLeft: 'auto', width: '35px', height: '35px', borderRadius: '10px', background: '#D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FiArrowRight color="#000" />
                </div>
              </div>
            </div>

            {/* ELEMENTOS DECORATIVOS */}
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', background: 'rgba(212,175,55,0.1)', padding: '10px 20px', borderRadius: '100px', backdropFilter: 'blur(5px)', border: '1px solid rgba(212,175,55,0.3)', fontSize: '0.75rem', fontWeight: 800, color: '#D4AF37' }}>PROBADO POR +500 EMPRESAS</div>
          </motion.div>

        </div>
      </header>

      {/* 2.5 TRUSTED BY */}
      <section style={{ padding: '2rem 5%', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 800, opacity: 0.3, letterSpacing: '2px', textTransform: 'uppercase' }}>Potenciando equipos en</span>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '4rem', opacity: 0.4, filter: 'grayscale(1)' }}>
             <span style={{ fontSize: '1.2rem', fontWeight: 900 }}>STELLAR<span style={{ color: '#D4AF37' }}>LABS</span></span>
             <span style={{ fontSize: '1.2rem', fontWeight: 900 }}>VORTEX<span style={{ color: '#D4AF37' }}>MEDIA</span></span>
             <span style={{ fontSize: '1.2rem', fontWeight: 900 }}>OXIGEN<span style={{ color: '#D4AF37' }}>CORP</span></span>
             <span style={{ fontSize: '1.2rem', fontWeight: 900 }}>NEXUS<span style={{ color: '#D4AF37' }}>AI</span></span>
             <span style={{ fontSize: '1.2rem', fontWeight: 900 }}>ELEVATE<span style={{ color: '#D4AF37' }}>GROUP</span></span>
          </div>
        </div>
      </section>

      {/* 2.7 CASOS DE USO (NEW - TABBED UI) */}
      <section style={{ padding: '8rem 5%', background: '#060B14' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: 900, marginBottom: '4rem' }}>Una Solución para <span style={{ color: '#D4AF37' }}>Cada Industria</span></h2>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '4rem', flexWrap: 'wrap' }}>
            {USE_CASES.map((uc) => (
              <button 
                key={uc.id}
                onClick={() => setActiveUseCase(uc.id)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '12px',
                  border: '1px solid',
                  borderColor: activeUseCase === uc.id ? '#D4AF37' : 'rgba(255,255,255,0.1)',
                  background: activeUseCase === uc.id ? 'rgba(212,175,55,0.1)' : 'transparent',
                  color: activeUseCase === uc.id ? '#D4AF37' : 'white',
                  fontWeight: 700,
                  transition: '0.3s'
                }}
              >
                {uc.title}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {USE_CASES.filter(uc => uc.id === activeUseCase).map(uc => (
              <motion.div 
                key={uc.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{ 
                  background: 'rgba(255,255,255,0.02)', 
                  borderRadius: '32px', 
                  padding: '4rem', 
                  border: '1px solid rgba(212,175,55,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4rem',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{ flex: '1 1 400px' }}>
                  <div style={{ fontSize: '3rem', color: '#D4AF37', marginBottom: '2rem' }}>
                    {uc.id === 'ecommerce' && <FiShoppingCart />}
                    {uc.id === 'realestate' && <FiLayout />}
                    {uc.id === 'health' && <FiActivity />}
                    {uc.id === 'education' && <FiCpu />}
                  </div>
                  <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem' }}>{uc.title} Inteligente</h3>
                  <p style={{ opacity: 0.6, fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem' }}>{uc.description}</p>
                  <div style={{ padding: '15px 25px', background: 'rgba(212,175,55,0.1)', borderRadius: '14px', border: '1px solid rgba(212,175,55,0.2)', display: 'inline-block' }}>
                    <span style={{ fontWeight: 800, color: '#D4AF37' }}>Impacto: {uc.impact}</span>
                  </div>
                </div>
                <div style={{ flex: '1 1 300px', height: '300px', background: 'rgba(0,0,0,0.3)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '0.8rem', opacity: 0.4, marginBottom: '10px' }}>Vista previa del Agente</div>
                      <div style={{ width: '200px', height: '10px', background: 'rgba(212,175,55,0.2)', borderRadius: '5px', overflow: 'hidden' }}>
                        <motion.div animate={{ x: [-200, 200] }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} style={{ width: '100%', height: '100%', background: '#D4AF37' }} />
                      </div>
                   </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* 2.9 INTEGRATION CLOUD (NEW) */}
      <section style={{ padding: '4rem 0', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', gap: '4rem', alignItems: 'center', overflow: 'hidden', whiteSpace: 'nowrap' }}>
          <motion.div 
            animate={{ x: [0, -1000] }} 
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            style={{ display: 'flex', gap: '5rem', alignItems: 'center' }}
          >
            {[...INTEGRATIONS, ...INTEGRATIONS].map((int, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', opacity: 0.4 }}>
                <img src={int.icon} style={{ height: '24px', filter: 'grayscale(1) invert(1)' }} />
                <span style={{ fontWeight: 700, fontSize: '1rem' }}>{int.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. MÉTRICAS DE IMPACTO */}
      <section style={{ padding: '4rem 5%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
        <div><h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#D4AF37' }}>99.9%</h2><p style={{ opacity: 0.5, fontSize: '0.8rem', letterSpacing: '1px' }}>UPTIME OPERATIVO</p></div>
        <div><h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#D4AF37' }}>24/7</h2><p style={{ opacity: 0.5, fontSize: '0.8rem', letterSpacing: '1px' }}>VENTAS AUTÓNOMAS</p></div>
        <div><h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#D4AF37' }}>&lt; 2s</h2><p style={{ opacity: 0.5, fontSize: '0.8rem', letterSpacing: '1px' }}>TIEMPO DE RESPUESTA</p></div>
        <div><h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#D4AF37' }}>+10k</h2><p style={{ opacity: 0.5, fontSize: '0.8rem', letterSpacing: '1px' }}>LEADS PROCESADOS</p></div>
      </section>
      
      {/* 4. CÓMO FUNCIONA (ANIMATED) */}
      <section style={{ padding: '10rem 5%', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '80%', background: 'radial-gradient(circle, rgba(212,175,55,0.03) 0%, transparent 70%)', zIndex: 0 }} />
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '6rem', position: 'relative', zIndex: 1 }}>Arquitectura de <span style={{ color: '#D4AF37' }}>Crecimiento</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '5rem', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            {[
              { n: "01", t: "Conexión Hub", d: "Vincula tus canales digitales en segundos. Stitch UI gestiona las llaves de acceso con encriptación total.", i: <FiZap /> },
              { n: "02", t: "Inyección Opal", d: "Entrena a tu agente con la base de conocimientos de tu empresa. El núcleo Opal digiere datos en milisegundos.", i: <FiCpu /> },
              { n: "03", t: "Escalado Táctico", d: "Tu agente comienza a operar 24/7, detectando oportunidades y cerrando ventas de forma autónoma.", i: <FiActivity /> }
            ].map((step, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                style={{ textAlign: 'left', background: 'rgba(255,255,255,0.02)', padding: '3rem 2.5rem', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}
              >
                <span style={{ fontSize: '4.5rem', fontWeight: 900, opacity: 0.03, position: 'absolute', top: '10px', right: '20px', color: '#D4AF37' }}>{step.n}</span>
                <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: 'rgba(212,175,55,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4AF37', fontSize: '1.5rem', marginBottom: '2rem' }}>{step.i}</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.2rem' }}>{step.t}</h3>
                <p style={{ opacity: 0.4, lineHeight: 1.8, fontSize: '1rem' }}>{step.d}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
      
      {/* 5. EL MOTOR DE CLASE MUNDIAL (REFINED) */}
      <section style={{ padding: '8rem 5%', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '6rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1.5rem' }}>Hecho para <span style={{ color: '#D4AF37' }}>Cualquier Escala</span></h2>
            <p style={{ fontSize: '1.25rem', opacity: 0.5, maxWidth: '800px', margin: '0 auto' }}>No importa si eres un emprendedor solitario o una multinacional; Stratix se adapta a tu ritmo.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
            {[
              { t: "Emprendedores y Marcas", d: "Libérate de contestar las mismas 100 preguntas al día. Tu IA vende mientras tú creas contenido.", i: <FiUsers /> },
              { t: "Corporativos y Equipos", d: "Instala una infraestructura de atención que califica prospectos y los entrega directamente a tu CRM.", i: <FiLayers /> },
              { t: "Agencias Digitales", d: "Ofrece a tus clientes bots de alta gama con marca blanca y lógica de cierre de ventas.", i: <FiTarget /> }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                whileHover={{ background: 'rgba(212,175,55,0.05)' }}
                style={{ padding: '3.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.05)', transition: '0.3s' }}
              >
                <div style={{ width: '60px', height: '60px', borderRadius: '18px', background: 'rgba(212,175,55,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4AF37', fontSize: '1.8rem', marginBottom: '2rem' }}>{item.i}</div>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1.2rem', fontWeight: 800 }}>{item.t}</h3>
                <p style={{ opacity: 0.5, lineHeight: 1.8, fontSize: '1.05rem' }}>{item.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. COMPONENTES NÚCLEO (EDUCATIONAL) */}
      <section id="labs" style={{ padding: '10rem 5%', background: '#0B1120', position: 'relative' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '6rem', alignItems: 'center' }}>
            <div>
              <span style={{ color: '#D4AF37', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase' }}>Tecnología Propietaria</span>
              <h2 style={{ fontSize: '3rem', fontWeight: 900, marginTop: '1.5rem', marginBottom: '2.5rem', lineHeight: 1.1 }}>¿Cómo Stratix <br /> lo hace posible?</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ minWidth: '40px', height: '40px', background: '#D4AF37', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}><FiTarget /></div>
                  <div>
                    <h4 style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '5px' }}>Opal Logic (El Intérprete)</h4>
                    <p style={{ opacity: 0.5, fontSize: '0.95rem' }}>No es un chat común. Opal entiende la psicología del comprador y sabe cuándo pedir el cierre de venta.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '20px' }}>
                   <div style={{ minWidth: '40px', height: '40px', background: '#D4AF37', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}><FiLayout /></div>
                   <div>
                    <h4 style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '5px' }}>Stitch UI (La Interfaz)</h4>
                    <p style={{ opacity: 0.5, fontSize: '0.95rem' }}>Una experiencia visual fluida que tus clientes amarán usar, integrada perfectamente en tu web o apps.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '20px' }}>
                   <div style={{ minWidth: '40px', height: '40px', background: '#D4AF37', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}><FiDatabase /></div>
                   <div>
                    <h4 style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '5px' }}>RAG Engine (La Memoria)</h4>
                    <p style={{ opacity: 0.5, fontSize: '0.95rem' }}>Sube tus PDFs, manuales o URLs. Tu IA tendrá el conocimiento de todo tu negocio en segundos.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{ position: 'relative' }}>
               <div style={{ width: '100%', aspectRatio: '1/1', background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)', position: 'absolute', top: '0', left: '0' }} />
               <div style={{ padding: '3rem', background: 'rgba(255,255,255,0.01)', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)' }}>
                  <img src="/stratix_shield.svg" style={{ width: '120px', margin: '0 auto 3rem', filter: 'drop-shadow(0 0 30px rgba(212,175,55,0.3))' }} />
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '10px' }}>Inyectando Inteligencia...</div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.4 }}>Procesando Base de Conocimientos</div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. AGENDAR DEMO ESTRATÉGICA (CONVERTING FORM) */}
      <section id="demo" style={{ padding: '8rem 5%', background: 'linear-gradient(to bottom, #0B1120, #060B14)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          
          <div style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#D4AF37', marginBottom: '1.5rem' }}>
              <FiZap /> <span style={{ fontWeight: 800, fontSize: '0.8rem', letterSpacing: '2px' }}>DEMO DE ÉLITE</span>
            </div>
            <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '2rem', lineHeight: 1.1 }}>¿Listo para escalar <br /><span style={{ color: '#D4AF37' }}>sin límites humanos?</span></h2>
            <p style={{ opacity: 0.6, fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
              Deja tus datos y uno de nuestros arquitectos de IA se pondrá en contacto para diseñar una solución a la medida de tu empresa.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '45px', height: '45px', background: 'rgba(212,175,55,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4AF37' }}><FiCheck /></div>
                <span style={{ fontWeight: 600 }}>Diagnóstico de Automatización Gratis</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '45px', height: '45px', background: 'rgba(212,175,55,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4AF37' }}><FiCheck /></div>
                <span style={{ fontWeight: 600 }}>Proyección de ROI en 15 minutos</span>
              </div>
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '3rem', borderRadius: '32px', border: '1px solid rgba(212,175,55,0.2)', position: 'relative' }}>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={(e) => { e.preventDefault(); alert('🚀 ¡Solicitud enviada! Un arquitecto de Stratix se pondrá en contacto pronto.'); }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', opacity: 0.5, marginBottom: '0.5rem' }}>Nombre Completo</label>
                <input required type="text" placeholder="Tu nombre..." style={{ width: '100%', padding: '15px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', opacity: 0.5, marginBottom: '0.5rem' }}>Email Corporativo</label>
                <input required type="email" placeholder="email@empresa.com" style={{ width: '100%', padding: '15px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', opacity: 0.5, marginBottom: '0.5rem' }}>WhatsApp de Contacto</label>
                <input required type="tel" placeholder="+57 300..." style={{ width: '100%', padding: '15px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white' }} />
              </div>
              <button type="submit" style={{ width: '100%', padding: '20px', background: '#D4AF37', color: '#000', borderRadius: '12px', fontWeight: 900, cursor: 'pointer', border: 'none', marginTop: '1rem', fontSize: '1rem' }}>SOLICITAR MI DEMO GRATIS</button>
            </form>
          </div>

        </div>
      </section>

      {/* 7.5 TESTIMONIOS (NEW) */}
      <section style={{ padding: '8rem 5%', background: '#060B14', overflow: 'hidden' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: 900, marginBottom: '5rem' }}>Confianza <span style={{ color: '#D4AF37' }}>Arquitectónica</span></h2>
        <div style={{ display: 'flex', gap: '2rem', maxWidth: '1200px', margin: '0 auto', overflowX: 'auto', paddingBottom: '2rem', scrollbarWidth: 'none' }}>
          {[
            { n: "Carlos Ruiz", r: "CEO, Nexo Digital", t: "Stratix no es un bot, es un empleado de élite que nunca duerme. Subimos las ventas en WhatsApp un 40% en un mes.", i: "https://i.pravatar.cc/150?u=carlos" },
            { n: "Elena M.", r: "Fundadora de Bloom", t: "La capacidad de Opal Logic para entender mis productos es asombrosa. Ahorro 20 horas de soporte a la semana.", i: "https://i.pravatar.cc/150?u=elena" },
            { n: "Julian S.", r: "Director Táctico, Elevate", t: "Buscábamos algo premium y Stratix superó las expectativas. La integración fue quirúrgica.", i: "https://i.pravatar.cc/150?u=julian" }
          ].map((test, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -10 }}
              style={{ minWidth: '350px', flex: '0 0 auto', background: 'rgba(255,255,255,0.02)', padding: '3rem', borderRadius: '32px', border: '1px solid rgba(212,175,55,0.1)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '2rem' }}>
                <img src={test.i} style={{ width: '50px', height: '50px', borderRadius: '50%', border: '2px solid #D4AF37' }} />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1rem' }}>{test.n}</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.4 }}>{test.r}</div>
                </div>
              </div>
              <p style={{ fontStyle: 'italic', opacity: 0.6, lineHeight: 1.7, fontSize: '0.95rem' }}>"{test.t}"</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 7.7 ROI CALCULATOR (NEW) */}
      <section style={{ padding: '8rem 5%', background: 'linear-gradient(to bottom, #060B14, #0B1120)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', background: 'rgba(212,175,55,0.05)', borderRadius: '40px', border: '1px solid rgba(212,175,55,0.2)', padding: '5rem 3rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>Calcula tu <span style={{ color: '#D4AF37' }}>Retorno Estratégico</span></h2>
          <p style={{ opacity: 0.5, marginBottom: '4rem' }}>Desliza para ver cuánto tiempo y dinero ahorras con Stratix.</p>
          
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontWeight: 800 }}>
              <span>Leads Mensuales</span>
              <span style={{ color: '#D4AF37' }}>{leads}</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="1000" 
              value={leads} 
              onChange={(e) => setLeads(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: '#D4AF37', cursor: 'pointer', marginBottom: '4rem' }}
            />
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
              <div style={{ padding: '2rem', background: 'rgba(0,0,0,0.2)', borderRadius: '24px' }}>
                <div style={{ fontSize: '0.8rem', opacity: 0.4, marginBottom: '0.5rem' }}>AHORRO OPERATIVO</div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#D4AF37' }}>${(leads * 0.8 * 12).toLocaleString()}</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.3 }}>USD / MES</div>
              </div>
              <div style={{ padding: '2rem', background: 'rgba(0,0,0,0.2)', borderRadius: '24px' }}>
                <div style={{ fontSize: '0.8rem', opacity: 0.4, marginBottom: '0.5rem' }}>TIEMPO RECUPERADO</div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#D4AF37' }}>{Math.round(leads * 0.25)}</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.3 }}>HORAS / MES</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. BENTO GRID DE BENEFICIOS */}
      <section style={{ padding: '8rem 5%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gridAutoRows: '200px', gap: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ gridColumn: 'span 2', background: 'rgba(212,175,55,0.05)', borderRadius: '25px', padding: '2rem', border: '1px solid rgba(212,175,55,0.2)' }}>
            <FiShield style={{ color: '#D4AF37', fontSize: '2rem' }} />
            <h3 style={{ marginTop: '1rem', fontWeight: 800 }}>Seguridad AES-256</h3>
            <p style={{ opacity: 0.5, fontSize: '0.9rem' }}>Tus datos empresariales están blindados bajo protocolos de grado militar.</p>
          </div>
          <div style={{ gridRow: 'span 2', background: 'rgba(255,255,255,0.02)', borderRadius: '25px', padding: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
            <FiGlobe style={{ color: '#D4AF37', fontSize: '2rem' }} />
            <h3 style={{ marginTop: '1rem', fontWeight: 800 }}>Políglota Nativo</h3>
            <p style={{ opacity: 0.5, fontSize: '0.9rem' }}>Atención fluida en más de 50 idiomas sin errores de traducción.</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '25px', padding: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
            <FiClock style={{ color: '#D4AF37', fontSize: '1.5rem' }} />
            <h4 style={{ fontWeight: 800 }}>Respuesta Instantánea</h4>
          </div>
          <div style={{ background: 'rgba(212,175,55,0.1)', borderRadius: '25px', padding: '2rem', border: '1px solid #D4AF37' }}>
            <FiLayers style={{ color: '#000', fontSize: '1.5rem' }} />
            <h4 style={{ fontWeight: 800, color: '#000' }}>Escalabilidad Infinita</h4>
          </div>
        </div>
      </section>

      {/* 9. PLANES (LOCALIZED) */}
      <section id="planes" style={{ padding: '8rem 5%', background: 'rgba(212,175,55,0.02)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '3rem', fontWeight: 900, marginBottom: '2rem' }}>Inversión <span style={{ color: '#D4AF37' }}>Estratégica</span></h2>
          <p style={{ textAlign: 'center', opacity: 0.5, marginBottom: '4rem' }}>Planes escalables diseñados para cada etapa de tu crecimiento.</p>
          
          {/* CURRENCY TOGGLE (NEW) */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginBottom: '5.5rem' }}>
            <span style={{ fontWeight: 700, opacity: currency === 'USD' ? 1 : 0.3 }}>USD</span>
            <div 
              onClick={() => setCurrency(currency === 'USD' ? 'COP' : 'USD')}
              style={{ width: '60px', height: '30px', background: 'rgba(212,175,55,0.2)', borderRadius: '15px', position: 'relative', cursor: 'pointer', border: '1px solid rgba(212,175,55,0.3)' }}
            >
              <motion.div 
                animate={{ x: currency === 'USD' ? 2 : 32 }}
                style={{ width: '26px', height: '26px', background: '#D4AF37', borderRadius: '50%', position: 'absolute', top: '1px' }}
              />
            </div>
            <span style={{ fontWeight: 700, opacity: currency === 'COP' ? 1 : 0.3 }}>COP</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {PRICING_PLANS.map((plan, i) => (
              <div 
                key={i} 
                style={{ 
                  padding: '4rem 2.5rem', 
                  borderRadius: '35px', 
                  border: plan.highlight ? '2px solid #D4AF37' : '1px solid rgba(255,255,255,0.1)', 
                  background: plan.highlight ? 'rgba(212,175,55,0.03)' : 'rgba(255,255,255,0.01)', 
                  textAlign: 'center',
                  position: 'relative'
                }}
              >
                {plan.highlight && <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: '#D4AF37', color: '#000', padding: '5px 20px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 900 }}>RECOMENDADO</div>}
                <h3 style={{ marginBottom: '1rem', fontWeight: 800 }}>{plan.name}</h3>
                <div style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '2rem' }}>
                  <span style={{ fontSize: '1.5rem', verticalAlign: 'middle', marginRight: '5px' }}>{symbol}</span>
                  {(plan.priceUsd * exchangeRate).toLocaleString()}
                  <span style={{ fontSize: '1rem', opacity: 0.4 }}>/mes</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', marginBottom: '3rem' }}>
                  {plan.features.map((f, fi) => <li key={fi} style={{ marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem' }}><FiCheck color="#D4AF37" /> {f}</li>)}
                </ul>
                <button 
                  onClick={() => handleCheckout(plan.name.toLowerCase())}
                  style={{ 
                    width: '100%', 
                    padding: '18px', 
                    backgroundColor: plan.highlight ? '#D4AF37' : 'transparent', 
                    border: '1px solid #D4AF37', 
                    color: plan.highlight ? '#000' : '#D4AF37', 
                    borderRadius: '15px', 
                    fontWeight: 900, 
                    cursor: 'pointer',
                    transition: '0.3s' 
                  }}
                >
                  {plan.name === 'Enterprise' ? 'Contactar Ventas' : 'Comenzar Ahora'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
  
      {/* 10. PROPÓSITO, MISIÓN Y VISIÓN */}
      <section id="proposito" style={{ padding: '8rem 5%', background: 'linear-gradient(to bottom, #060B14, #0B1120)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '2rem' }}>La IA no debería ser un lujo.</h2>
          <p style={{ fontSize: '1.2rem', opacity: 0.6, lineHeight: 1.8, marginBottom: '5rem' }}>Democratizando tecnología de grado empresarial para el crecimiento global.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', textAlign: 'left' }}>
            <div>
              <h4 style={{ color: '#D4AF37', fontWeight: 900, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}><FiGlobe /> VISIÓN STRATIX</h4>
              <p style={{ fontSize: '0.9rem', opacity: 0.4, lineHeight: 1.7 }}>Eliminamos cuellos de botella operativos para que usted se enfoque en la creatividad. Construimos el aliado estratégico que trabaja 24/7.</p>
            </div>
            <div>
              <h4 style={{ color: '#D4AF37', fontWeight: 900, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}><FiBox /> MISIÓN ÉLITE</h4>
              <p style={{ fontSize: '0.85rem', opacity: 0.4, lineHeight: 1.7 }}>Proveer infraestructura táctica de IA que permita a marcas personales y empresas escalar su impacto sin límites humanos.</p>
            </div>
          </div>
        </div>
      </section>
  
      {/* 11. FAQ COMPLETO */}
      <section style={{ padding: '8rem 5%', background: '#060B14' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: 900, marginBottom: '4rem' }}>Preguntas <span style={{ color: '#D4AF37' }}>Frecuentes</span></h2>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {[
            { q: "¿Cómo garantiza Stratix el ROI?", a: "Nuestros agentes reducen el costo operativo en un 60% al automatizar tareas repetitivas y aumentar la tasa de conversión mediante respuestas instantáneas 24/7." },
            { q: "¿Se puede integrar con mi CRM actual?", a: "Sí. Stratix se conecta vía webhooks con Salesforce, HubSpot, Zoho y cualquier sistema que permita integraciones API." },
            { q: "¿Qué soporte técnico ofrecen?", a: "Todos los planes incluyen soporte vía ticket. El plan Enterprise cuenta con un Gerente de Éxito dedicado y soporte prioritario 24/7." },
            { q: "¿Es segura mi información?", a: "Absolutamente. Usamos encriptación de grado militar (AES-256) y aislamiento de datos para cada cliente." },
            { q: "¿Cómo funciona la transición de IA a humano?", a: "Si el bot detecta una consulta compleja o una intención de alta prioridad, escala la conversación automáticamente a tu equipo humano." },
            { q: "¿Hay un límite de mensajes?", a: "Nuestros planes escalan contigo. El plan Starter incluye 1,000 interacciones, mientras que el Enterprise es totalmente ilimitado." }
          ].map((item, i) => (
            <div key={i} onClick={() => setActiveFaq(activeFaq === i ? null : i)} style={{ padding: '1.8rem', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{item.q}</h4>
                <FiChevronDown style={{ transform: activeFaq === i ? 'rotate(180deg)' : 'none', transition: '0.3s', color: '#D4AF37' }} />
              </div>
              <AnimatePresence>
                {activeFaq === i && (
                  <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 0.5 }} exit={{ height: 0, opacity: 0 }} style={{ marginTop: '1rem', fontSize: '0.95rem', overflow: 'hidden', lineHeight: 1.6 }}>{item.a}</motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
  
      {/* 12. FOOTER CORPORATIVO (REDESIGN) */}
      <footer style={{ padding: '8rem 5% 4rem', background: '#03070C', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem', marginBottom: '6rem' }}>
          
          {/* Logo y Misión */}
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
              <img src="/stratix_shield.svg" alt="Stratix Logo" style={{ height: '32px', width: 'auto' }} />
              <span style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-1px' }}>Strat<span style={{ color: '#D4AF37' }}>ix</span> AI</span>
            </div>
            <p style={{ opacity: 0.4, fontSize: '0.9rem', lineHeight: 1.8, maxWidth: '350px' }}>
              Redefiniendo el estándar global de inteligencia estratégica para empresas B2B de élite. Automatización pura, resultados exponenciales.
            </p>
          </div>

          {/* Columnas de Enlaces */}
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 900, letterSpacing: '2px', color: '#D4AF37', marginBottom: '2rem', textTransform: 'uppercase' }}>Compañía</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem', opacity: 0.5 }}>
              <li>Propósito</li>
              <li>Casos de Uso</li>
              <li>Blog Estratégico</li>
              <li>Prensa</li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 900, letterSpacing: '2px', color: '#D4AF37', marginBottom: '2rem', textTransform: 'uppercase' }}>Producto</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem', opacity: 0.5 }}>
              <li>Opal Logic</li>
              <li>Stitch UI</li>
              <li>RAG Engine</li>
              <li>Planes</li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 900, letterSpacing: '2px', color: '#D4AF37', marginBottom: '2rem', textTransform: 'uppercase' }}>Soporte</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem', opacity: 0.5 }}>
              <li>Documentación</li>
              <li>Centro de Ayuda</li>
              <li>Estado del Sistema</li>
              <li>Contacto</li>
            </ul>
          </div>
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          <p style={{ opacity: 0.3, fontSize: '0.8rem' }}>© 2026 Stratix AI — Architectural Strategic Intelligence. Cartagena, CO.</p>
          <div style={{ display: 'flex', gap: '2rem', opacity: 0.3, fontSize: '0.8rem', fontWeight: 700 }}>
            <span>Privacidad</span>
            <span>Términos</span>
            <span>Seguridad</span>
          </div>
        </div>
      </footer>
    </div>
  );
}