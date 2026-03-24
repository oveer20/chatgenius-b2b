"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiArrowRight, FiCheck, FiCpu, FiLayout, FiTarget, FiZap, FiShield, 
  FiChevronDown, FiPlayCircle, FiActivity, FiSmartphone, FiShoppingCart, 
  FiDatabase, FiGlobe, FiClock, FiLayers, FiUsers 
} from "react-icons/fi";

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: '#060B14', minHeight: '100vh', color: 'white', fontFamily: 'system-ui, sans-serif', overflowX: 'hidden' }}>
      
      {/* 1. NAVEGACIÓN PRO */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.2rem 5%', background: 'rgba(6, 11, 20, 0.95)', backdropFilter: 'blur(15px)', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid rgba(212, 175, 55, 0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FiShield style={{ color: '#D4AF37', fontSize: '1.8rem' }} />
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

      {/* 2. HERO: ARCHITECTURAL STRATEGIC INTELLIGENCE */}
      <header style={{ padding: '10rem 5% 6rem', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', width: '100%', height: '100%', background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)', zIndex: 0 }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ position: 'relative', zIndex: 1 }}>
          <span style={{ color: '#D4AF37', fontWeight: 800, letterSpacing: '5px', fontSize: '0.7rem', border: '1px solid rgba(212,175,55,0.3)', padding: '6px 15px', borderRadius: '20px' }}>ARCHITECTURAL STRATEGIC INTELLIGENCE</span>
          <h1 style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', fontWeight: 900, margin: '2rem 0', lineHeight: 0.9 }}>El Ecosistema IA <br /> <span style={{ color: '#D4AF37' }}>para Creadores</span></h1>
          <p style={{ maxWidth: '750px', margin: '0 auto 3rem', opacity: 0.6, fontSize: '1.2rem', lineHeight: 1.6 }}>Infraestructura autónoma diseñada para automatizar ventas y atención en WhatsApp e Instagram con precisión quirúrgica.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
            <Link href="/login" style={{ padding: '20px 40px', backgroundColor: '#D4AF37', color: '#000', borderRadius: '12px', fontWeight: 900, textDecoration: 'none', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>Comenzar Ahora Gratis <FiArrowRight /></Link>
            <a href="#demo" style={{ padding: '20px 40px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontWeight: 700, textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.02)' }}><FiPlayCircle /> Ver Demo</a>
          </div>
        </motion.div>
      </header>

      {/* 3. MÉTRICAS DE IMPACTO (NUEVO) */}
      <section style={{ padding: '4rem 5%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
        <div><h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#D4AF37' }}>99.9%</h2><p style={{ opacity: 0.5, fontSize: '0.8rem', letterSpacing: '1px' }}>UPTIME OPERATIVO</p></div>
        <div><h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#D4AF37' }}>24/7</h2><p style={{ opacity: 0.5, fontSize: '0.8rem', letterSpacing: '1px' }}>VENTAS AUTÓNOMAS</p></div>
        <div><h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#D4AF37' }}>&lt; 2s</h2><p style={{ opacity: 0.5, fontSize: '0.8rem', letterSpacing: '1px' }}>TIEMPO DE RESPUESTA</p></div>
        <div><h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#D4AF37' }}>+10k</h2><p style={{ opacity: 0.5, fontSize: '0.8rem', letterSpacing: '1px' }}>LEADS PROCESADOS</p></div>
      </section>

      {/* 4. CÓMO FUNCIONA (NUEVO) */}
      <section style={{ padding: '8rem 5%', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '5rem' }}>Tres Pasos hacia la <span style={{ color: '#D4AF37' }}>Eficiencia</span></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem', maxWidth: '1100px', margin: '0 auto' }}>
          {[
            { n: "01", t: "Conecta", d: "Vincula tu WhatsApp o Instagram en un clic con Stitch UI." },
            { n: "02", t: "Entrena", d: "Inyecta tu base de conocimientos en el cerebro de Opal Logic." },
            { n: "03", t: "Escala", d: "Tu agente empieza a cerrar ventas y calificar leads de inmediato." }
          ].map((step, i) => (
            <div key={i} style={{ position: 'relative' }}>
              <span style={{ fontSize: '5rem', fontWeight: 900, opacity: 0.05, position: 'absolute', top: '-40px', left: '50%', transform: 'translateX(-50%)', color: '#D4AF37' }}>{step.n}</span>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem', position: 'relative' }}>{step.t}</h3>
              <p style={{ opacity: 0.5, lineHeight: 1.6 }}>{step.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. ECOSISTEMA LABS */}
      <section id="labs" style={{ padding: '8rem 5%', background: '#0B1120' }}>
        <h2 style={{ textAlign: 'center', fontSize: '3rem', fontWeight: 900, marginBottom: '5rem' }}>Ecosistema <span style={{ color: '#D4AF37' }}>Labs</span></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { t: "Pomelli Branding", d: "Personalidad y voz de marca inconfundible.", i: <FiZap /> },
            { t: "Stitch UI", d: "Interfaces táctiles diseñadas para dispositivos móviles.", i: <FiLayout /> },
            { t: "Opal Logic", d: "Detección estratégica de intenciones de compra.", i: <FiTarget /> }
          ].map((item, i) => (
            <div key={i} style={{ padding: '3.5rem 2.5rem', background: 'rgba(255,255,255,0.01)', borderRadius: '30px', border: '1px solid rgba(212,175,55,0.1)', textAlign: 'center' }}>
              <div style={{ color: '#D4AF37', fontSize: '2.5rem', marginBottom: '1.5rem' }}>{item.i}</div>
              <h3 style={{ fontSize: '1.6rem', marginBottom: '1rem', fontWeight: 800 }}>{item.t}</h3>
              <p style={{ opacity: 0.4, lineHeight: 1.6, fontSize: '0.9rem' }}>{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. DEMO INTERACTIVO */}
      <section id="demo" style={{ padding: '8rem 5%', textAlign: 'center' }}>
         <div style={{ maxWidth: '1000px', margin: '0 auto', background: '#000', borderRadius: '40px', border: '1px solid rgba(212,175,55,0.3)', padding: '3rem', textAlign: 'left', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '2rem' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF5F56' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FFBD2E' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27C93F' }} />
            </div>
            <code style={{ fontSize: '1rem', color: '#D4AF37', display: 'block', marginBottom: '1rem' }}>&gt; Analizando entrada de usuario vía WhatsApp...</code>
            <code style={{ fontSize: '1.1rem', color: 'white', opacity: 0.9 }}>&gt; "Necesito implementar IA en mi flujo de ventas, presupuesto alto."</code>
            <motion.code initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} style={{ fontSize: '1.1rem', color: '#27C93F', display: 'block', marginTop: '1.5rem' }}>
              &gt; Opal Logic: Intención HIGH-TICKET detectada. Lead clasificado como HOT.
            </motion.code>
            <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', opacity: 0.05 }}><FiActivity fontSize="15rem" color="#D4AF37" /></div>
         </div>
      </section>

      {/* 7. BENTO GRID DE BENEFICIOS (NUEVO) */}
      <section style={{ padding: '8rem 5%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridAutoRows: '200px', gap: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
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

      {/* 8. PLANES */}
      <section id="planes" style={{ padding: '8rem 5%' }}>
        <h2 style={{ textAlign: 'center', fontSize: '3rem', fontWeight: 900, marginBottom: '5rem' }}>Inversión <span style={{ color: '#D4AF37' }}>Estratégica</span></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { n: "Starter", p: "19", f: ["1 Agente IA", "500 Mensajes", "Web Integration"] },
            { n: "Business Pro", p: "49", f: ["3 Agentes IA", "2,500 Mensajes", "WhatsApp + IG", "Lead Scoring"], m: true },
            { n: "Enterprise", p: "199", f: ["Agentes Ilimitados", "Custom CRM", "Soporte 24/7"] }
          ].map((plan, i) => (
            <div key={i} style={{ padding: '4rem 2.5rem', borderRadius: '35px', border: plan.m ? '2px solid #D4AF37' : '1px solid rgba(255,255,255,0.1)', background: plan.m ? 'rgba(212,175,55,0.03)' : 'none', textAlign: 'center' }}>
              <h3 style={{ marginBottom: '1rem', fontWeight: 800 }}>{plan.n}</h3>
              <div style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '2rem' }}>${plan.p}<span style={{ fontSize: '1rem', opacity: 0.4 }}>/mes</span></div>
              <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', marginBottom: '3rem' }}>
                {plan.f.map((f, fi) => <li key={fi} style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}><FiCheck color="#D4AF37" /> {f}</li>)}
              </ul>
              <Link href="/login" style={{ display: 'block', padding: '15px', backgroundColor: plan.m ? '#D4AF37' : 'transparent', border: '1px solid #D4AF37', color: plan.m ? '#000' : '#D4AF37', borderRadius: '12px', fontWeight: 900, textDecoration: 'none' }}>Seleccionar Plan</Link>
            </div>
          ))}
        </div>
      </section>

      {/* 9. PROPÓSITO, MISIÓN Y VISIÓN (EXPANDIDO) */}
      <section id="proposito" style={{ padding: '8rem 5%', background: 'linear-gradient(to bottom, #060B14, #0B1120)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '2rem' }}>La IA no debería ser un lujo.</h2>
          <p style={{ fontSize: '1.2rem', opacity: 0.6, lineHeight: 1.8, marginBottom: '5rem' }}>Democratizando tecnología de grado empresarial para el crecimiento global y la soberanía tecnológica de los creadores.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', textAlign: 'left' }}>
            <div>
              <h4 style={{ color: '#D4AF37', fontWeight: 900, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}><FiGlobe /> VISIÓN STRATIX</h4>
              <p style={{ fontSize: '0.9rem', opacity: 0.4, lineHeight: 1.7 }}>Eliminamos cuellos de botella operativos para que usted se enfoque en la creatividad. Construimos el aliado estratégico que trabaja 24/7 sin descanso.</p>
            </div>
            <div>
              <h4 style={{ color: '#D4AF37', fontWeight: 900, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}><FiBox /> MISIÓN ÉLITE</h4>
              <p style={{ fontSize: '0.85rem', opacity: 0.4, lineHeight: 1.7 }}>Proveer infraestructura táctica de IA que permita a marcas personales y empresas escalar su impacto sin necesidad de grandes equipos humanos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FAQ INTERACTIVO */}
      <section style={{ padding: '8rem 5%', background: '#060B14' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: 900, marginBottom: '4rem' }}>Preguntas <span style={{ color: '#D4AF37' }}>Frecuentes</span></h2>
        <div style={{ maxWidth: '750px', margin: '0 auto' }}>
          {[
            { q: "¿Necesito saber programar?", a: "No. Stratix está diseñado con una interfaz Stitch UI intuitiva para que configures todo sin tocar código." },
            { q: "¿En qué idiomas atiende?", a: "Nuestros agentes son políglotas nativos. Pueden conversar en más de 50 idiomas con fluidez perfecta." },
            { q: "¿Es segura mi información?", a: "Absolutamente. Usamos encriptación de grado militar y aislamiento de datos para cada cliente." }
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

      {/* 11. FINAL CTA (NUEVO) */}
      <section style={{ padding: '8rem 5%', textAlign: 'center' }}>
        <div style={{ background: 'linear-gradient(135deg, #0B1120 0%, #060B14 100%)', padding: '5rem 2rem', borderRadius: '40px', border: '1px solid rgba(212,175,55,0.2)', maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1.5rem' }}>¿Listo para el <span style={{ color: '#D4AF37' }}>Siguiente Nivel</span>?</h2>
          <p style={{ opacity: 0.5, marginBottom: '3rem', fontSize: '1.1rem' }}>Únase a los creadores y empresas que ya están automatizando su éxito.</p>
          <Link href="/login" style={{ padding: '20px 50px', backgroundColor: '#D4AF37', color: '#000', borderRadius: '15px', fontWeight: 900, textDecoration: 'none', fontSize: '1.2rem', boxShadow: '0 10px 40px rgba(212,175,55,0.3)' }}>Comenzar Despliegue Gratis</Link>
        </div>
      </section>

      {/* FOOTER CORPORATIVO */}
      <footer style={{ padding: '5rem 5% 3rem', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '3rem', opacity: 0.5, fontSize: '0.9rem', fontWeight: 600 }}>
          <span>Tecnología</span> <span>Planes</span> <span>Privacidad</span> <span>Términos</span>
        </div>
        <p style={{ opacity: 0.3, fontSize: '0.8rem' }}>© 2026 Stratix AI — Architectural Strategic Intelligence. Cartagena, CO.</p>
      </footer>
    </div>
  );
}