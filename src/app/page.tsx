"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, Variants } from "framer-motion";
import Link from "next/link";
import {
  FiZap, FiStar, FiArrowRight, FiCpu, FiTrendingUp, FiShield,
  FiCheck, FiChevronDown, FiLayout, FiLayers, FiSmartphone,
  FiGlobe, FiPlay, FiInstagram, FiLinkedin, FiLock,
  FiDatabase, FiCloud, FiServer, FiActivity, FiUser, FiShoppingBag
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
    <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 5vw, 5rem)', position: 'relative', zIndex: 10, padding: '0 1rem' }}>
      <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={styles.badge} style={{ marginBottom: '1.5rem', display: 'inline-block' }}>
        {badge}
      </motion.span>
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className={styles.sectionTitle} style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '1.5rem', textAlign: 'center', width: '100%', lineHeight: 1.1 }}>
        {title}
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} style={{ color: 'var(--text-secondary)', fontSize: 'clamp(1rem, 3vw, 1.25rem)', maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
        {subtitle}
      </motion.p>
    </div>
  );
}

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("pomelli");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currency, setCurrency] = useState<'USD' | 'COP'>('USD');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [index, setIndex] = useState(0);

  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isMobile, setIsMobile] = useState(false);

  const getPrice = (baseUSD: number, baseCOP: number) => {
    const isAnnual = billingCycle === 'annual';
    const discount = 0.8;
    return currency === 'USD'
      ? (isAnnual ? Math.round(baseUSD * discount) : baseUSD)
      : (isAnnual ? Math.round(baseCOP * discount) : baseCOP);
  };

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

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMobile) {
      setMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  return (
    <div
      className={styles.landingWrapper}
      style={{ backgroundColor: '#0B1120', color: 'var(--text-primary)', position: 'relative', overflowX: 'hidden', width: '100vw' }}
      onMouseMove={handleMouseMove}
    >
      <style dangerouslySetInnerHTML={{
        __html: `
        @media (max-width: 768px) {
          .mobile-stack { flex-direction: column !important; align-items: stretch !important; }
          .mobile-stack button, .mobile-stack a { width: 100% !important; margin-bottom: 10px; text-align: center; justify-content: center; }
          .mobile-padding { padding: 3rem 1rem !important; }
          .pricing-grid-responsive { grid-template-columns: 1fr !important; }
          .use-cases-grid { grid-template-columns: 1fr !important; }
          .hide-on-mobile { display: none !important; }
          .hero-padding { padding: 100px 1rem 40px 1rem !important; }
          .company-grid-responsive { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
        }
      `}} />

      {!isMobile && (
        <div
          style={{
            position: 'fixed', top: mousePos.y - 300, left: mousePos.x - 300,
            width: '600px', height: '600px',
            background: 'radial-gradient(circle, rgba(0, 112, 255, 0.12) 0%, rgba(0, 0, 0, 0) 60%)',
            borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
            transition: 'opacity 0.3s ease',
            opacity: mousePos.x === -1000 ? 0 : 1
          }}
        />
      )}

      {/* Botón Flotante de WhatsApp */}
      <a href="https://wa.me/573152597199?text=Hola,%20quiero%20conocer%20m%C3%A1s%20sobre%20Stratix%20AI." target="_blank" rel="noopener noreferrer" style={{ position: 'fixed', bottom: '20px', right: '20px', backgroundColor: '#25D366', color: 'white', width: '55px', height: '55px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)', zIndex: 1000, cursor: 'pointer', transition: 'transform 0.3s ease' }}>
        <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
      </a>

      {/* Navigation */}
      <nav className={`${styles.navbar} ${scrolled ? styles.navScrolled : ""}`} style={{ zIndex: 100 }}>
        <div className={`container ${styles.navInner}`}>
          <Link href="/" className={styles.logo}>
            <div className={styles.logoGlow}></div>
            <img src="/stratix_shield.png" alt="Stratix Logo" className={styles.logoImage} />
            <span style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>Strat<span style={{ color: 'var(--accent-blue)' }}>ix</span> <small style={{ fontSize: '0.6rem', opacity: 0.5 }}>AI</small></span>
          </Link>
          <div className={`${styles.navLinks} hide-on-mobile`}>
            <a href="#features">Tecnología</a>
            <a href="#suite">Ecosistema Labs</a>
            <a href="#pricing">Planes</a>
            <a href="#faq">FAQ</a>
            <div className={styles.navDivider}></div>
            <Link href="/login" className={styles.loginLink}>Ingresar</Link>
            <Link href="/dashboard" className="btn-primary" style={{ padding: '0.75rem 1.5rem', boxShadow: '0 0 20px rgba(0,112,255,0.3)' }}>
              Comenzar Gratis <FiArrowRight />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={`${styles.hero} hero-padding`} style={{ position: 'relative', zIndex: 10, padding: '120px 20px 60px 20px' }}>
        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="container">
          <div className={styles.heroContent} style={{ flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', textAlign: isMobile ? 'center' : 'left' }}>
            <div className={styles.heroText} style={{ width: isMobile ? '100%' : '50%' }}>
              <motion.div initial="hidden" animate="visible" variants={fadeInUp} custom={0} className={styles.heroBadge} style={{ border: '1px solid rgba(0,112,255,0.3)', background: 'rgba(0,112,255,0.05)', display: 'inline-flex', marginBottom: '1.5rem', fontSize: isMobile ? '0.8rem' : '1rem' }}>
                <FiZap style={{ color: '#0070f3', marginRight: '8px' }} /> Inteligencia Artificial de Clase Mundial, para Todos.
              </motion.div>

              <motion.h1 className={styles.heroTitle} initial="hidden" animate="visible" variants={fadeInUp} custom={1} style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', lineHeight: 1.1 }}>
                El Ecosistema IA <br />
                <span style={{ color: 'var(--accent-blue)', textShadow: '0 0 40px rgba(0, 112, 255, 0.4)', display: 'inline-block' }}>
                  {words[index]}
                </span>
              </motion.h1>

              <motion.p className={styles.heroSubtitle} initial="hidden" animate="visible" variants={fadeInUp} custom={2} style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)' }}>
                No importa si trabajas solo, tienes una tienda online o diriges una multinacional. Stratix transforma tu atención al cliente y ventas en un sistema automático que no duerme.
              </motion.p>

              <motion.div className={`mobile-stack ${styles.heroCtas}`} initial="hidden" animate="visible" variants={fadeInUp} custom={3} style={{ display: 'flex', gap: '1rem', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                <Link href="/dashboard" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', boxShadow: '0 10px 30px rgba(0,112,255,0.25)' }}>
                  Crear mi Cuenta Gratis <FiArrowRight className="hide-on-mobile" style={{ marginLeft: '8px' }} />
                </Link>
                <button onClick={() => document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' })} className="btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', backdropFilter: 'blur(10px)' }}>
                  Pruébalo ahora <FiPlay className="hide-on-mobile" style={{ marginLeft: '8px' }} />
                </button>
              </motion.div>
            </div>

            <motion.div className={styles.heroVisual} initial={{ opacity: 0, x: isMobile ? 0 : 50, y: isMobile ? 30 : 0 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ delay: 0.5, duration: 1 }} style={{ width: isMobile ? '100%' : '50%', marginTop: isMobile ? '3rem' : '0' }}>
              <div className={styles.masterMockup} style={{ maxWidth: '100%', margin: '0 auto' }}>
                <div className={styles.mockupGlass} style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '12px', padding: '15px' }}>
                  <div className={styles.mockupHeader} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                    <div className={styles.mockupDots} style={{ display: 'flex', gap: '5px' }}><span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }}></span><span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }}></span><span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }}></span></div>
                    <div className={styles.mockupTopBar} style={{ color: '#888', fontSize: '0.8rem' }}>Asistente Inteligente Activo</div>
                  </div>
                  <div className={styles.mockupContent} style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
                    <div className={styles.chatMessage} style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px', fontSize: '0.9rem' }}><strong style={{ color: '#0070f3' }}>AI:</strong> ¡Hola! Analicé tu sitio web y tus redes sociales. Ya estoy listo para responder preguntas y cerrar ventas.</div>
                    <div className={styles.chatMessageUser} style={{ background: 'rgba(0,112,255,0.1)', padding: '10px', borderRadius: '8px', fontSize: '0.9rem', alignSelf: 'flex-end', border: '1px solid rgba(0,112,255,0.3)' }}>¡Increíble! ¿Puedes atender mi WhatsApp y mi Instagram al mismo tiempo?</div>
                    <div className={styles.chatMessage} style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px', fontSize: '0.9rem' }}><strong style={{ color: '#0070f3' }}>AI:</strong> Sí, atiendo a miles de clientes a la vez en todas tus plataformas, las 24 horas del día. 🚀</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Marquee */}
      <section style={{ overflow: 'hidden', whiteSpace: 'nowrap', width: '100%', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '1.5rem 0', background: '#060B14', position: 'relative', zIndex: 10 }}>
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          style={{ display: 'inline-flex', gap: '3rem', opacity: 0.6, fontSize: '1rem', fontWeight: 'bold', color: '#888' }}
        >
          {Array(2).fill(0).map((_, i) => (
            <div key={i} style={{ display: 'flex', gap: '3rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FiSmartphone color="#25D366" /> WhatsApp Business</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FiInstagram color="#E1306C" /> Instagram Direct</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FiShoppingBag color="#96bf48" /> Shopify & E-commerce</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FiCloud color="#00A4EF" /> Microsoft Azure Ready</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FiDatabase color="#F2C811" /> Excel & Power BI</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FiCheck color="#ff4d4d" /> Hubspot CRM</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Casos de Uso */}
      <section className="mobile-padding" id="features" style={{ position: 'relative', zIndex: 10, paddingTop: '5rem' }}>
        <div className="container">
          <SectionHeader badge="Para todos los tamaños" title="Diseñado para Escalar Contigo" subtitle="Desde tu primer cliente hasta tu millonésima venta. Stratix se adapta a ti." />
          <div className="use-cases-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <motion.div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }} whileHover={{ y: -5 }}>
              <FiUser style={{ fontSize: '2rem', color: 'var(--accent-blue)', marginBottom: '1rem' }} />
              <h5 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Profesionales y Creadores</h5>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Eres una sola persona. Deja que la IA agende tus citas, responda DM's y mande cotizaciones mientras tú te enfocas en tu arte o profesión.</p>
            </motion.div>
            <motion.div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }} whileHover={{ y: -5 }}>
              <FiShoppingBag style={{ fontSize: '2rem', color: 'var(--accent-blue)', marginBottom: '1rem' }} />
              <h5 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>PyMEs y Tiendas Online</h5>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Conecta todo tu inventario. La IA asesora a tus clientes 24/7, recomienda productos por WhatsApp y recupera carritos abandonados.</p>
            </motion.div>
            <motion.div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }} whileHover={{ y: -5 }}>
              <FiGlobe style={{ fontSize: '2rem', color: 'var(--accent-blue)', marginBottom: '1rem' }} />
              <h5 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Empresas y Corporaciones</h5>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Infraestructura Azure, cumplimiento normativo ISO y Big Data. Califica miles de leads al mes y envíalos directo a tu equipo de ventas.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Elite Suite */}
      <section className="mobile-padding" id="suite" style={{ position: 'relative', zIndex: 10, paddingTop: '5rem' }}>
        <div className="container">
          <SectionHeader badge="El Ecosistema Tecnológico" title="Todo lo que necesitas en un solo lugar" subtitle="No necesitas saber programar. Nosotros unimos las piezas complejas por ti." />
          <div className="use-cases-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <motion.div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }} whileHover={{ scale: 1.02 }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1rem', color: 'white', background: 'linear-gradient(135deg, #FF3D00, #FF9100)' }}><FiStar /></div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Pomelli Branding</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Le damos a tu IA la personalidad de tu marca. Sonará exactamente como tú o como el mejor vendedor de tu empresa.</p>
            </motion.div>
            <motion.div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }} whileHover={{ scale: 1.02 }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1rem', color: 'white', background: 'linear-gradient(135deg, #00B0FF, #00E5FF)' }}><FiLayout /></div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Stitch UI Framework</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Si lo instalas en tu web, se verá increíble en celulares y computadoras con un diseño moderno y súper rápido.</p>
            </motion.div>
            <motion.div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }} whileHover={{ scale: 1.02 }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1rem', color: 'white', background: 'linear-gradient(135deg, #6200EA, #AA00FF)' }}><FiLayers /></div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Opal Logic Core</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>El "cerebro". La IA sabe cuándo un cliente solo está preguntando y cuándo está listo para comprar para avisarte al instante.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Universal */}
      <section className="mobile-padding" id="pricing" style={{ position: 'relative', zIndex: 10, paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="container">
          <SectionHeader badge="Planes Claros" title="Empieza gratis, crece sin límites" subtitle="Tecnología de punta al alcance de tu presupuesto." />

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '3rem', gap: '1.5rem' }}>
            <div className="mobile-stack" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button onClick={() => setCurrency('USD')} className={currency === 'USD' ? 'btn-primary' : 'btn-secondary'} style={{ padding: '0.75rem 2rem', borderRadius: '100px' }}>Precios (USD)</button>
              <button onClick={() => setCurrency('COP')} className={currency === 'COP' ? 'btn-primary' : 'btn-secondary'} style={{ padding: '0.75rem 2rem', borderRadius: '100px' }}>Colombia (COP)</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.1)', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button onClick={() => setBillingCycle('monthly')} style={{ padding: '0.5rem 1rem', borderRadius: '100px', border: 'none', backgroundColor: billingCycle === 'monthly' ? 'var(--accent-blue)' : 'transparent', color: billingCycle === 'monthly' ? 'white' : 'var(--text-secondary)', cursor: 'pointer', fontWeight: 'bold' }}>Mensual</button>
              <button onClick={() => setBillingCycle('annual')} style={{ padding: '0.5rem 1rem', borderRadius: '100px', border: 'none', backgroundColor: billingCycle === 'annual' ? 'var(--accent-blue)' : 'transparent', color: billingCycle === 'annual' ? 'white' : 'var(--text-secondary)', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Anual <span style={{ backgroundColor: '#25D366', color: 'white', fontSize: '0.7rem', padding: '2px 6px', borderRadius: '10px' }}>-20%</span></button>
            </div>
          </div>

          <div className="pricing-grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <motion.div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Starter / Freelance</h4>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'flex-end', gap: '5px' }}>{currency === 'USD' ? `$${getPrice(19, 75)}` : `$${getPrice(19, 75)}k`}<span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 'normal', marginBottom: '8px' }}>/mes</span></div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginTop: '0.5rem' }}>Para creadores y marcas personales.</p>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}><FiCheck color="var(--accent-blue)" /> 1 Agente de IA</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}><FiCheck color="var(--accent-blue)" /> 500 Conversaciones/mes</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}><FiCheck color="var(--accent-blue)" /> Integración Web</li>
              </ul>
              <Link href="/dashboard" className="btn-secondary" style={{ width: '100%', marginTop: 'auto', textAlign: 'center', padding: '1rem' }}>Empezar Prueba Gratis</Link>
            </motion.div>

            <motion.div style={{ background: 'rgba(0,112,255,0.05)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--accent-blue)', display: 'flex', flexDirection: 'column', boxShadow: '0 0 30px rgba(0,112,255,0.15)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--accent-blue)', color: 'white', fontSize: '0.7rem', fontWeight: 'bold', padding: '4px 12px', borderRadius: '100px', letterSpacing: '1px', whiteSpace: 'nowrap' }}>MÁS POPULAR — PYMES</div>
              <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.5rem', marginTop: '1rem' }}>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Business Pro</h4>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'flex-end', gap: '5px' }}>{currency === 'USD' ? `$${getPrice(49, 195)}` : `$${getPrice(49, 195)}k`}<span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 'normal', marginBottom: '8px' }}>/mes</span></div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginTop: '0.5rem' }}>Para negocios y tiendas online.</p>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}><FiCheck color="var(--accent-blue)" /> 3 Agentes de IA</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}><FiCheck color="var(--accent-blue)" /> 2,500 Conversaciones/mes</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}><FiCheck color="var(--accent-blue)" /> <b>Conexión a WhatsApp e IG</b></li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}><FiCheck color="var(--accent-blue)" /> Lead Scoring Automático</li>
              </ul>
              <Link href="/dashboard" className="btn-primary" style={{ width: '100%', marginTop: 'auto', textAlign: 'center', padding: '1rem' }}>Crear Cuenta Pro</Link>
            </motion.div>

            <motion.div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Enterprise</h4>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'flex-end', gap: '5px' }}>{currency === 'USD' ? `$${getPrice(199, 795)}` : `$${getPrice(199, 795)}k`}<span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 'normal', marginBottom: '8px' }}>/mes</span></div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginTop: '0.5rem' }}>Para agencias y corporaciones.</p>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}><FiCheck color="var(--accent-blue)" /> Agentes Ilimitados</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}><FiCheck color="var(--accent-blue)" /> Conversaciones Ilimitadas</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}><FiCheck color="var(--accent-blue)" /> Integración API & CRM (Hubspot)</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}><FiCheck color="var(--accent-blue)" /> Soporte Dedicado 24/7</li>
              </ul>
              <Link href="/dashboard" className="btn-secondary" style={{ width: '100%', marginTop: 'auto', textAlign: 'center', padding: '1rem' }}>Contactar Ventas</Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* El Manifiesto (Sección Recuperada) */}
      <section className="mobile-padding" id="company" style={{ position: 'relative', zIndex: 10, padding: '5rem 0', backgroundColor: '#060B14', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container">
          <SectionHeader
            badge="Nuestro Propósito"
            title="La Inteligencia Artificial no debería ser un lujo."
            subtitle="Creemos en democratizar la tecnología de grado empresarial para que cualquier negocio, sin importar su tamaño, pueda competir a nivel global."
          />
          <div className="company-grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginTop: '2rem' }}>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ padding: '2.5rem', borderRadius: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <FiZap style={{ fontSize: '2rem', color: '#0070f3', marginBottom: '1.5rem' }} />
              <h4 style={{ fontSize: '1.3rem', marginBottom: '1rem', fontWeight: 'bold' }}>El Manifiesto Stratix</h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                Nacimos para eliminar los cuellos de botella operativos. Nuestra tecnología está diseñada para que dejes de responder mensajes repetitivos y te enfoques en lo que realmente importa: la estrategia, la creatividad y el crecimiento de tu empresa.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} style={{ padding: '2.5rem', borderRadius: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <FiGlobe style={{ fontSize: '2rem', color: '#0070f3', marginBottom: '1.5rem' }} />
              <h4 style={{ fontSize: '1.3rem', marginBottom: '1rem', fontWeight: 'bold' }}>Visión Global</h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                Aspiramos a ser el motor invisible detrás del millón de empresas más eficientes del mundo. Construimos infraestructura robusta, segura y ética que actúa como un aliado estratégico, trabajando incansablemente 24/7.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* FAQ Ampliado Estratégico (Las 6 Preguntas Recuperadas) */}
      <section className="mobile-padding" id="faq" style={{ position: 'relative', zIndex: 10, paddingBottom: '4rem', paddingTop: '4rem' }}>
        <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', padding: '0 10px', textAlign: 'center' }}>
          <SectionHeader badge="Preguntas Frecuentes" title="Todo lo que necesitas saber" subtitle="Derribamos tus dudas para que empieces a escalar hoy mismo." />
          <div style={{ margin: '0 auto', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              {
                q: "¿Necesito conocimientos técnicos o saber programar para usar Stratix?",
                a: "¡Para nada! La plataforma está diseñada con una interfaz intuitiva (Stitch UI). Solo necesitas pegar el enlace de tu sitio web o subir tus manuales en PDF, y nuestra IA estructurará su propio conocimiento en menos de 2 minutos."
              },
              {
                q: "¿Qué pasa si la IA no sabe una respuesta o el cliente pide un humano?",
                a: "Stratix cuenta con un protocolo de 'Hand-off' inteligente. Si detecta una consulta fuera de su entrenamiento o una solicitud explícita de soporte humano, pausa la automatización y notifica a tu equipo para que tomen el control del chat sin que el cliente note la transición."
              },
              {
                q: "¿Puedo conectar la IA con mis herramientas actuales (Shopify, Hubspot, etc.)?",
                a: "Absolutamente. Stratix se integra de forma nativa y mediante Webhooks con los CRMs y plataformas de e-commerce más populares del mercado. Los leads calificados por el motor de Opal irán directamente a tu base de datos en tiempo real."
              },
              {
                q: "¿La Inteligencia Artificial puede atender en otros idiomas?",
                a: "Sí, el ecosistema de Stratix es multilingüe por naturaleza. Puede conversar fluidamente en más de 50 idiomas, detectando y adaptándose automáticamente al idioma en el que tu cliente inicie la conversación."
              },
              {
                q: "¿Qué sucede si mi negocio crece y supero el límite de mi plan?",
                a: "Tu operación nunca se detendrá. Te notificaremos cuando estés al 90% de tu capacidad mensual. Podrás escalar al siguiente nivel con un solo clic o, si lo prefieres, pagar un micro-cargo por cada conversación adicional sin cambiar de plan."
              },
              {
                q: "¿Están seguros los datos confidenciales de mi empresa y mis clientes?",
                a: "La seguridad es el pilar de nuestra arquitectura. Operamos bajo modelos Zero Trust apoyados en la infraestructura de Microsoft Azure y Google Cloud. Cumplimos con estándares ISO para garantizar que tu información esté encriptada y jamás se use para entrenar modelos públicos."
              }
            ].map((item, idx) => (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '1.2rem', cursor: 'pointer' }} onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                <div style={{ fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.95rem' }}>{item.q} <FiChevronDown style={{ minWidth: '20px', transform: openFaq === idx ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s' }} /></div>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                      <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.9rem' }}>{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Completo y Responsivo */}
      <footer style={{ position: 'relative', zIndex: 10, backgroundColor: '#060B14', padding: '4rem 20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          <div className="company-grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <img src="/stratix_shield.png" alt="Stratix Logo" style={{ width: '30px', height: '30px' }} />
                <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Strat<span style={{ color: 'var(--accent-blue)' }}>ix</span> AI</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>Haciendo la Inteligencia Artificial accesible para todos.</p>
              <div style={{ display: 'flex', gap: '1rem' }}><a href="#" style={{ color: 'var(--text-secondary)' }}><FiInstagram size={20} /></a><a href="#" style={{ color: 'var(--text-secondary)' }}><FiLinkedin size={20} /></a></div>
            </div>
            <div>
              <h4 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Compañía</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <li><a href="#company" onClick={(e) => { e.preventDefault(); document.getElementById('company')?.scrollIntoView({ behavior: 'smooth' }); }} style={{ color: 'inherit', textDecoration: 'none' }}>El Manifiesto</a></li>
                <li><a href="https://wa.me/573152597199" target="_blank" style={{ color: 'inherit', textDecoration: 'none' }}>Contacto Directo</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Legal</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <li><Link href="/legal/terms" style={{ color: 'inherit', textDecoration: 'none' }}>Términos de Servicio</Link></li>
                <li><Link href="/legal/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>Política de Privacidad</Link></li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Producto</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <li><a href="#features" style={{ color: 'inherit', textDecoration: 'none' }}>Funcionalidades</a></li>
                <li><a href="#pricing" style={{ color: 'inherit', textDecoration: 'none' }}>Planes y Precios</a></li>
              </ul>
            </div>
          </div>
          <div style={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>
            <p>© 2026 Stratix AI. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}