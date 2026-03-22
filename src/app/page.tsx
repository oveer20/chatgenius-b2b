"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, Variants } from "framer-motion";
import Link from "next/link";
import {
  FiZap, FiStar, FiArrowRight, FiChevronDown, FiLayout, FiLayers, FiSmartphone,
  FiGlobe, FiPlay, FiInstagram, FiLinkedin, FiCheck, FiUser, FiShoppingBag, FiDatabase, FiCloud
} from "react-icons/fi";
import styles from "./landing.module.css";

const words = ["para Creadores", "para PyMEs", "para Empresas", "para Ti"];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.8, ease: [0.215, 0.610, 0.355, 1.0] }
  }),
};

function SectionHeader({ badge, title, subtitle }: { badge: string, title: string, subtitle: string }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '5rem', position: 'relative', zIndex: 10 }}>
      <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={styles.badge} style={{ marginBottom: '1.5rem', display: 'inline-block' }}>
        {badge}
      </motion.span>
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className={styles.sectionTitle} style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '1.5rem', textAlign: 'center', width: '100%' }}>
        {title}
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
        {subtitle}
      </motion.p>
    </div>
  );
}

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currency, setCurrency] = useState<'USD' | 'COP'>('USD');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setIndex((prev) => (prev + 1) % words.length), 3000);
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const heroY = useTransform(scrollY, [0, 600], [0, 150]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.landingWrapper} style={{ backgroundColor: '#0B1120', color: 'var(--text-primary)', position: 'relative', overflowX: 'hidden' }}>

      {/* INYECCIÓN CSS RESPONSIVO PARA IPHONE */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @media (max-width: 768px) {
          .${styles.navLinks} { display: none !important; }
          .${styles.heroContent} { flex-direction: column !important; text-align: center !important; padding-top: 100px !important; }
          .${styles.heroText}, .${styles.heroVisual} { width: 100% !important; margin-top: 2rem !important; }
          .${styles.heroTitle} { font-size: 2.5rem !important; line-height: 1.1 !important; }
          .${styles.heroCtas} { flex-direction: column !important; align-items: stretch !important; gap: 1rem !important; }
          .${styles.useCasesBox}, .${styles.suiteGrid}, .${styles.pricingGrid}, .${styles.companyGrid}, .${styles.footerGrid} {
            grid-template-columns: 1fr !important; display: flex !important; flex-direction: column !important; gap: 2rem !important;
          }
          .container { padding: 0 1.5rem !important; }
        }
      `}} />

      {/* WhatsApp Link */}
      <a href="https://wa.me/573152597199" target="_blank" rel="noopener noreferrer" style={{ position: 'fixed', bottom: '20px', right: '20px', backgroundColor: '#25D366', color: 'white', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, boxShadow: '0 10px 25px rgba(37,211,102,0.3)' }}>
        <FiZap size={28} />
      </a>

      {/* Navbar */}
      <nav className={`${styles.navbar} ${scrolled ? styles.navScrolled : ""}`} style={{ zIndex: 100 }}>
        <div className={`container ${styles.navInner}`}>
          <Link href="/" className={styles.logo}>
            <img src="/stratix_shield.svg" alt="Stratix Logo" style={{ width: '35px', height: '35px' }} />
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 'bold' }}>Strat<span style={{ color: 'var(--accent-blue)' }}>ix</span> AI</span>
          </Link>
          <div className={styles.navLinks}>
            <a href="#features">Tecnología</a>
            <a href="#suite">Labs</a>
            <a href="#pricing">Planes</a>
            <a href="#faq">FAQ</a>
            <div className={styles.navDivider}></div>
            <Link href="/login" className={styles.loginLink}>Ingresar</Link>
            <Link href="/dashboard" className="btn-primary" style={{ padding: '0.75rem 1.5rem', borderRadius: '8px' }}>Comenzar Gratis</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero} style={{ paddingTop: '160px', position: 'relative' }}>
        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <motion.div initial="hidden" animate="visible" variants={fadeInUp} custom={0} className={styles.heroBadge} style={{ border: '1px solid rgba(212,175,55,0.3)', background: 'rgba(212,175,55,0.05)', color: '#D4AF37', marginBottom: '1.5rem' }}>
                <FiStar style={{ marginRight: '8px' }} /> Architectural Strategic Intelligence
              </motion.div>
              <motion.h1 className={styles.heroTitle} initial="hidden" animate="visible" variants={fadeInUp} custom={1} style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900 }}>
                El Ecosistema IA <br />
                <span style={{ color: '#D4AF37' }}>{words[index]}</span>
              </motion.h1>
              <motion.p className={styles.heroSubtitle} initial="hidden" animate="visible" variants={fadeInUp} custom={2}>
                Automatiza tu atención al cliente y ventas en WhatsApp e Instagram con tecnología de grado empresarial que no duerme.
              </motion.p>
              <motion.div className={styles.heroCtas} initial="hidden" animate="visible" variants={fadeInUp} custom={3}>
                <Link href="/dashboard" className="btn-primary" style={{ padding: '1.2rem 2.5rem', fontSize: '1.1rem' }}>Comenzar Ahora Gratis <FiArrowRight /></Link>
              </motion.div>
            </div>
            <div className={styles.heroVisual}>
              <img src="/stratix_shield.svg" alt="Elite Shield" style={{ width: '100%', maxWidth: '450px', filter: 'drop-shadow(0 0 50px rgba(212,175,55,0.15))' }} />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Marquee */}
      <section style={{ overflow: 'hidden', whiteSpace: 'nowrap', padding: '2.5rem 0', background: '#060B14', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, ease: "linear", duration: 25 }} style={{ display: 'inline-flex', gap: '5rem', opacity: 0.5, fontWeight: 'bold', color: '#888' }}>
          {Array(2).fill(0).map((_, i) => (
            <div key={i} style={{ display: 'flex', gap: '5rem' }}>
              <span><FiSmartphone /> WhatsApp Business</span>
              <span><FiInstagram /> Instagram Direct</span>
              <span><FiShoppingBag /> Shopify</span>
              <span><FiCloud /> Azure AI</span>
              <span><FiDatabase /> Hubspot CRM</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Casos de Uso */}
      <section id="features" style={{ padding: '100px 0' }}>
        <div className="container">
          <SectionHeader badge="Flexibilidad Total" title="Diseñado para Escalar" subtitle="Desde marcas personales hasta corporaciones multinacionales." />
          <div className={styles.useCasesBox}>
            {[
              { icon: <FiUser />, t: "Profesionales", d: "Agende citas y responda DMs mientras se enfoca en su arte." },
              { icon: <FiShoppingBag />, t: "PyMEs y Tiendas Online", d: "La IA vende por usted en WhatsApp 24/7 y recupera carritos." },
              { icon: <FiGlobe />, t: "Empresas", d: "Infraestructura robusta para calificar y procesar miles de leads." }
            ].map((item, idx) => (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', padding: '2.5rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: '2.5rem', color: '#D4AF37', marginBottom: '1.5rem' }}>{item.icon}</div>
                <h4 style={{ marginBottom: '1rem', fontSize: '1.3rem' }}>{item.t}</h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Elite Suite */}
      <section id="suite" style={{ padding: '100px 0', background: '#060B14' }}>
        <div className="container">
          <SectionHeader badge="Ecosistema Labs" title="La Suite de Inteligencia" subtitle="Tres pilares tecnológicos diseñados para la excelencia operativa." />
          <div className={styles.suiteGrid}>
            {[
              { t: "Pomelli Branding", d: "Le damos a su IA la personalidad y voz exacta de su marca corporativa.", color: "linear-gradient(135deg, #FF3D00, #FF9100)" },
              { t: "Stitch UI", d: "Interfaz fluida y moderna que se adapta a cualquier dispositivo táctil.", color: "linear-gradient(135deg, #00B0FF, #00E5FF)" },
              { t: "Opal Logic", d: "El cerebro estratégico que detecta intenciones de compra y califica leads.", color: "linear-gradient(135deg, #6200EA, #AA00FF)" }
            ].map((item, idx) => (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', padding: '3rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: item.color, marginBottom: '1.5rem' }} />
                <h4 style={{ marginBottom: '1rem' }}>{item.t}</h4>
                <p style={{ color: 'var(--text-secondary)' }}>{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Planes */}
      <section id="pricing" style={{ padding: '100px 0' }}>
        <div className="container">
          <SectionHeader badge="Planes" title="Inversión Estratégica" subtitle="Tecnología de élite al alcance de su presupuesto." />
          <div className={styles.pricingGrid}>
            {[
              { t: "Starter", p: "19", f: ["1 Agente IA", "500 Mensajes", "Web Integration"] },
              { t: "Business Pro", p: "49", f: ["3 Agentes IA", "2,500 Mensajes", "WhatsApp + IG", "Lead Scoring"], featured: true },
              { t: "Enterprise", p: "199", f: ["Agentes Ilimitados", "Custom CRM", "Soporte 24/7"] }
            ].map((item, idx) => (
              <div key={idx} style={{ background: item.featured ? '#0B1120' : 'rgba(255,255,255,0.02)', padding: '3rem', borderRadius: '24px', border: item.featured ? '2px solid #D4AF37' : '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
                {item.featured && <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: '#D4AF37', color: '#000', padding: '4px 15px', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.8rem' }}>MÁS POPULAR</div>}
                <h4>{item.t}</h4>
                <div style={{ fontSize: '3.5rem', fontWeight: 900, margin: '1.5rem 0' }}>${item.p}<small style={{ fontSize: '1rem', color: '#888' }}>/mes</small></div>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '2.5rem' }}>
                  {item.f.map((f, i) => <li key={i}><FiCheck color="#D4AF37" /> {f}</li>)}
                </ul>
                <Link href="/dashboard" className={item.featured ? "btn-primary" : "btn-secondary"} style={{ width: '100%', textAlign: 'center' }}>Seleccionar Plan</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* El Manifiesto */}
      <section id="company" style={{ padding: '100px 0', background: '#060B14' }}>
        <div className="container">
          <SectionHeader badge="Propósito" title="La IA no debería ser un lujo." subtitle="Democratizando tecnología de grado empresarial para el crecimiento global." />
          <div className={styles.companyGrid}>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '3rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <FiZap size={40} color="#D4AF37" style={{ marginBottom: '1.5rem' }} />
              <h4>Visión Stratix</h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>Eliminamos cuellos de botella operativos para que usted se enfoque en la creatividad. Construimos el aliado estratégico que trabaja incansablemente 24/7.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: '100px 0' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <SectionHeader badge="FAQ" title="Preguntas Frecuentes" subtitle="Resolvemos sus dudas técnicas y comerciales." />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { q: "¿Necesito saber programar?", a: "No. La plataforma Stitch UI está diseñada para ser intuitiva. Solo pegue su link o suba un PDF." },
              { q: "¿Qué pasa si la IA no sabe responder?", a: "El protocolo Hand-off detecta dudas complejas y transfiere el chat a un humano al instante." },
              { q: "¿Se integra con mi CRM actual?", a: "Sí, conectamos nativamente con Shopify, Hubspot y herramientas vía Webhooks." },
              { q: "¿En qué idiomas atiende?", a: "Soporta más de 50 idiomas con detección automática de lenguaje." },
              { q: "¿Es segura mi información?", a: "Operamos bajo modelos Zero Trust en infraestructura Azure para garantizar privacidad total." },
              { q: "¿Puedo cancelar en cualquier momento?", a: "Sin contratos. Puede pausar o cancelar su suscripción desde el panel con un clic." }
            ].map((item, idx) => (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', cursor: 'pointer' }} onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                <div style={{ fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>{item.q} <FiChevronDown style={{ transform: openFaq === idx ? 'rotate(180deg)' : 'rotate(0)' }} /></div>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                      <p style={{ marginTop: '1rem', color: '#888', lineHeight: 1.6 }}>{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Final */}
      <footer style={{ padding: '6rem 0', background: '#060B14', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <img src="/stratix_shield.svg" alt="Logo Final" style={{ width: '50px', marginBottom: '2.5rem' }} />
          <div style={{ display: 'flex', gap: '3rem', justifyContent: 'center', marginBottom: '3rem', opacity: 0.6 }}>
            <Link href="#features">Tecnología</Link>
            <Link href="#pricing">Planes</Link>
            <Link href="https://wa.me/573152597199">Contacto</Link>
          </div>
          <p style={{ color: '#444', fontSize: '0.85rem' }}>© 2026 Stratix AI — Architectural Strategic Intelligence. Cartagena, CO.</p>
        </div>
      </footer>
    </div>
  );
}