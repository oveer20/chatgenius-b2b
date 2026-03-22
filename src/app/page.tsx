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
    <div style={{ textAlign: 'center', marginBottom: '5rem', position: 'relative', zIndex: 10 }}>
      <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={styles.badge} style={{ marginBottom: '1.5rem', display: 'inline-block' }}>
        {badge}
      </motion.span>
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className={styles.sectionTitle} style={{ fontSize: 'var(--text-5xl)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '1.5rem', textAlign: 'center', width: '100%' }}>
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
    checkMobile(); // Check inicial
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
      style={{ backgroundColor: '#0B1120', color: 'var(--text-primary)', position: 'relative', overflowX: 'hidden' }}
      onMouseMove={handleMouseMove}
    >
      {/* MAGIA RESPONSIVA SEGURA: 
        Este bloque inyecta CSS que SOLAMENTE se ejecuta en pantallas de celular (< 768px). 
        En Desktop, esto es invisible y respeta tu diseño original al 100%.
      */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @media (max-width: 768px) {
          .${styles.navLinks} { display: none !important; }
          
          .${styles.heroContent} { flex-direction: column !important; text-align: center !important; }
          .${styles.heroText}, .${styles.heroVisual} { width: 100% !important; margin-top: 1.5rem !important; }
          .${styles.heroTitle} { font-size: 2.5rem !important; line-height: 1.1 !important; }
          .${styles.heroSubtitle} { font-size: 1rem !important; }
          .${styles.heroCtas} { flex-direction: column !important; align-items: stretch !important; gap: 1rem !important; }
          .${styles.heroCtas} a, .${styles.heroCtas} button { width: 100% !important; justify-content: center !important; }
          
          /* Forzar los grids a 1 sola columna en celular */
          .${styles.useCasesBox}, .${styles.suiteGrid}, .${styles.pricingGrid}, .${styles.companyGrid}, .${styles.footerGrid} {
            grid-template-columns: 1fr !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 2rem !important;
          }
          
          .${styles.sectionTitle} { font-size: 2rem !important; }
          .container { padding: 0 1.5rem !important; }
        }
      `}} />

      {/* Glow Effect (solo Desktop) */}
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
          <div className={styles.navLinks}>
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
      <section className={styles.hero} style={{ position: 'relative', zIndex: 10 }}>
        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <motion.div initial="hidden" animate="visible" variants={fadeInUp} custom={0} className={styles.heroBadge} style={{ border: '1px solid rgba(0,112,255,0.3)', background: 'rgba(0,112,255,0.05)', display: 'inline-flex', marginBottom: '1.5rem' }}>
                <FiZap style={{ color: '#0070f3', marginRight: '8px' }} /> Inteligencia Artificial de Clase Mundial, para Todos.
              </motion.div>

              <motion.h1 className={styles.heroTitle} initial="hidden" animate="visible" variants={fadeInUp} custom={1}>
                El Ecosistema IA <br />
                <span style={{ color: 'var(--accent-blue)', textShadow: '0 0 40px rgba(0, 112, 255, 0.4)', display: 'inline-block' }}>
                  {words[index]}
                </span>
              </motion.h1>

              <motion.p className={styles.heroSubtitle} initial="hidden" animate="visible" variants={fadeInUp} custom={2}>
                No importa si trabajas solo, tienes una tienda online o diriges una multinacional. Stratix transforma tu atención al cliente y ventas en un sistema automático que no duerme.
              </motion.p>

              <motion.div className={styles.heroCtas} initial="hidden" animate="visible" variants={fadeInUp} custom={3}>
                <Link href="/dashboard" className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', boxShadow: '0 10px 30px rgba(0,112,255,0.25)' }}>
                  Crear mi Cuenta Gratis <FiArrowRight />
                </Link>
                <button onClick={() => document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' })} className="btn-secondary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', backdropFilter: 'blur(10px)' }}>
                  Pruébalo ahora <FiPlay />
                </button>
              </motion.div>
            </div>

            <motion.div className={styles.heroVisual} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 1 }}>
              <div className={styles.masterMockup}>
                <div className={styles.mockupGlass} style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(15, 23, 42, 0.6)' }}>
                  <div className={styles.mockupHeader}>
                    <div className={styles.mockupDots}><span></span><span></span><span></span></div>
                    <div className={styles.mockupTopBar} style={{ color: '#888' }}>Asistente Inteligente Activo</div>
                  </div>
                  <div className={styles.mockupContent}>
                    <div className={styles.chatMessage}><div className={styles.aiAvatar} style={{ background: '#0070f3' }}>AI</div><p>¡Hola! Analicé tu sitio web y tus redes sociales. Ya estoy listo para responder preguntas y cerrar ventas por ti.</p></div>
                    <div className={styles.chatMessageUser}><p>¡Increíble! ¿Puedes atender mi WhatsApp y mi Instagram al mismo tiempo?</p></div>
                    <div className={styles.chatMessage}><div className={styles.aiAvatar} style={{ background: '#0070f3' }}>AI</div><p>Sí, atiendo a miles de clientes a la vez en todas tus plataformas, las 24 horas del día. 🚀</p></div>
                  </div>
                </div>
                <div className={styles.mockupGlow}></div>
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
          style={{ display: 'inline-flex', gap: '5rem', opacity: 0.6, fontSize: '1.2rem', fontWeight: 'bold', color: '#888' }}
        >
          {Array(2).fill(0).map((_, i) => (
            <div key={i} style={{ display: 'flex', gap: '5rem' }}>
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
      <section className={styles.useCasesSection} id="features" style={{ position: 'relative', zIndex: 10, paddingTop: '5rem' }}>
        <div className="container">
          <SectionHeader badge="Para todos los tamaños" title="Diseñado para Escalar Contigo" subtitle="Desde tu primer cliente hasta tu millonésima venta. Stratix se adapta a ti." />
          <div className={styles.useCasesBox}>
            <motion.div className={styles.useCaseItem} whileHover={{ y: -5 }}>
              <FiUser style={{ fontSize: '2rem', color: 'var(--accent-blue)', marginBottom: '1rem' }} />
              <h5>Profesionales y Creadores</h5>
              <p>Eres una sola persona. Deja que la IA agende tus citas, responda DM's y mande cotizaciones mientras tú te enfocas en tu arte o profesión.</p>
            </motion.div>
            <motion.div className={styles.useCaseItem} whileHover={{ y: -5 }}>
              <FiShoppingBag style={{ fontSize: '2rem', color: 'var(--accent-blue)', marginBottom: '1rem' }} />
              <h5>PyMEs y Tiendas Online</h5>
              <p>Conecta todo tu inventario. La IA asesora a tus clientes 24/7, recomienda productos por WhatsApp y recupera carritos abandonados.</p>
            </motion.div>
            <motion.div className={styles.useCaseItem} whileHover={{ y: -5 }}>
              <FiGlobe style={{ fontSize: '2rem', color: 'var(--accent-blue)', marginBottom: '1rem' }} />
              <h5>Empresas y Corporaciones</h5>
              <p>Infraestructura Azure, cumplimiento normativo ISO y Big Data. Califica miles de leads al mes y envíalos directo a tu equipo de ventas.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Elite Suite */}
      <section className={styles.suiteSection} id="suite" style={{ position: 'relative', zIndex: 10 }}>
        <div className="container">
          <SectionHeader badge="El Ecosistema Tecnológico" title="Todo lo que necesitas en un solo lugar" subtitle="No necesitas saber programar. Nosotros unimos las piezas complejas por ti." />
          <div className={styles.suiteGrid}>
            <motion.div className={`${styles.suiteCard} ${activeTab === 'pomelli' ? styles.activeSuite : ''}`} onMouseEnter={() => setActiveTab('pomelli')} whileHover={{ scale: 1.02 }} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className={styles.suiteIcon} style={{ background: 'linear-gradient(135deg, #FF3D00, #FF9100)' }}><FiStar /></div>
              <div className={styles.suiteBody}>
                <h3>Pomelli Branding</h3><p>Le damos a tu IA la personalidad de tu marca. Sonará exactamente como tú o como el mejor vendedor de tu empresa.</p>
              </div>
            </motion.div>
            <motion.div className={`${styles.suiteCard} ${activeTab === 'stitch' ? styles.activeSuite : ''}`} onMouseEnter={() => setActiveTab('stitch')} whileHover={{ scale: 1.02 }} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className={styles.suiteIcon} style={{ background: 'linear-gradient(135deg, #00B0FF, #00E5FF)' }}><FiLayout /></div>
              <div className={styles.suiteBody}>
                <h3>Stitch UI Framework</h3><p>Si lo instalas en tu web, se verá increíble en celulares y computadoras con un diseño moderno y súper rápido.</p>
              </div>
            </motion.div>
            <motion.div className={`${styles.suiteCard} ${activeTab === 'opal' ? styles.activeSuite : ''}`} onMouseEnter={() => setActiveTab('opal')} whileHover={{ scale: 1.02 }} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className={styles.suiteIcon} style={{ background: 'linear-gradient(135deg, #6200EA, #AA00FF)' }}><FiLayers /></div>
              <div className={styles.suiteBody}>
                <h3>Opal Logic Core</h3><p>El "cerebro". La IA sabe cuándo un cliente solo está preguntando y cuándo está listo para comprar para avisarte al instante.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Universal */}
      <section className={styles.pricingSection} id="pricing" style={{ position: 'relative', zIndex: 10 }}>
        <div className="container">
          <SectionHeader badge="Planes Claros" title="Empieza gratis, crece sin límites" subtitle="Tecnología de punta al alcance de tu presupuesto." />

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '4rem', gap: '2rem' }}>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button onClick={() => setCurrency('USD')} className={currency === 'USD' ? 'btn-primary' : 'btn-secondary'} style={{ padding: '0.75rem 2rem', borderRadius: '100px' }}>Precios (USD)</button>
              <button onClick={() => setCurrency('COP')} className={currency === 'COP' ? 'btn-primary' : 'btn-secondary'} style={{ padding: '0.75rem 2rem', borderRadius: '100px' }}>Colombia (COP)</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.1)', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button onClick={() => setBillingCycle('monthly')} style={{ padding: '0.5rem 1.5rem', borderRadius: '100px', border: 'none', backgroundColor: billingCycle === 'monthly' ? 'var(--accent-blue)' : 'transparent', color: billingCycle === 'monthly' ? 'white' : 'var(--text-secondary)', cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.3s' }}>Mensual</button>
              <button onClick={() => setBillingCycle('annual')} style={{ padding: '0.5rem 1.5rem', borderRadius: '100px', border: 'none', backgroundColor: billingCycle === 'annual' ? 'var(--accent-blue)' : 'transparent', color: billingCycle === 'annual' ? 'white' : 'var(--text-secondary)', cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Anual <span style={{ backgroundColor: '#25D366', color: 'white', fontSize: '0.7rem', padding: '2px 6px', borderRadius: '10px' }}>Ahorra 20%</span></button>
            </div>
          </div>

          <div className={styles.pricingGrid}>
            <motion.div className={styles.priceCard} whileHover={{ y: -10 }}>
              <div className={styles.pHeader}>
                <h4>Starter / Freelance</h4><div className={styles.priceValue}>{currency === 'USD' ? `$${getPrice(19, 75)}` : `$${getPrice(19, 75)}k`}<span>/mes</span></div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginTop: '0.5rem' }}>Para creadores y marcas personales.</p>
              </div>
              <ul className={styles.pFeatures}><li><FiCheck /> 1 Agente de IA</li><li><FiCheck /> 500 Conversaciones/mes</li><li><FiCheck /> Integración Web</li></ul>
              <Link href="/dashboard" className="btn-secondary" style={{ width: '100%', marginTop: 'auto' }}>Empezar Prueba Gratis</Link>
            </motion.div>

            <motion.div className={`${styles.priceCard} ${styles.featuredPrice}`} whileHover={{ y: -10 }} style={{ border: '1px solid var(--accent-blue)', boxShadow: '0 0 30px rgba(0,112,255,0.15)' }}>
              <div className={styles.featuredBadge}>MÁS POPULAR — PYMES</div>
              <div className={styles.pHeader}>
                <h4>Business Pro</h4><div className={styles.priceValue}>{currency === 'USD' ? `$${getPrice(49, 195)}` : `$${getPrice(49, 195)}k`}<span>/mes</span></div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginTop: '0.5rem' }}>Para negocios y tiendas online.</p>
              </div>
              <ul className={styles.pFeatures}><li><FiCheck /> 3 Agentes de IA</li><li><FiCheck /> 2,500 Conversaciones/mes</li><li><FiCheck /> <b>Conexión a WhatsApp e IG</b></li><li><FiCheck /> Lead Scoring Automático</li></ul>
              <Link href="/dashboard" className="btn-primary" style={{ animation: 'pulse-blue 2s infinite', width: '100%', marginTop: 'auto' }}>Crear Cuenta Pro</Link>
            </motion.div>

            <motion.div className={styles.priceCard} whileHover={{ y: -10 }}>
              <div className={styles.pHeader}>
                <h4>Enterprise</h4><div className={styles.priceValue}>{currency === 'USD' ? `$${getPrice(199, 795)}` : `$${getPrice(199, 795)}k`}<span>/mes</span></div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginTop: '0.5rem' }}>Para agencias y corporaciones.</p>
              </div>
              <ul className={styles.pFeatures}><li><FiCheck /> Agentes Ilimitados</li><li><FiCheck /> Conversaciones Ilimitadas</li><li><FiCheck /> Integración API & CRM (Hubspot)</li><li><FiCheck /> Soporte Dedicado 24/7</li></ul>
              <Link href="/dashboard" className="btn-secondary" style={{ width: '100%', marginTop: 'auto' }}>Contactar Ventas</Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* El Manifiesto */}
      <section className={styles.companySection} id="company" style={{ position: 'relative', zIndex: 10, padding: '6rem 0', backgroundColor: '#060B14', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container">
          <SectionHeader
            badge="Nuestro Propósito"
            title="La Inteligencia Artificial no debería ser un lujo."
            subtitle="Creemos en democratizar la tecnología de grado empresarial para que cualquier negocio, sin importar su tamaño, pueda competir a nivel global."
          />
          <div className={styles.companyGrid} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginTop: '2rem' }}>

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

      {/* FAQ Ampliado */}
      <section className={styles.faqSection} id="faq" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
          <SectionHeader badge="Preguntas Frecuentes" title="Todo lo que necesitas saber" subtitle="Derribamos tus dudas para que empieces a escalar hoy mismo." />
          <div className={styles.faqList} style={{ margin: '0 auto', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
              <div key={idx} className={`${styles.faqItem} ${openFaq === idx ? styles.faqOpen : ''}`} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '1.2rem', cursor: 'pointer' }} onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                <div className={styles.faqQuestion} style={{ fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>{item.q} <FiChevronDown style={{ transform: openFaq === idx ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s' }} /></div>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className={styles.faqAnswer} style={{ overflow: 'hidden' }}>
                      <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Completo */}
      <footer className={styles.footer} style={{ position: 'relative', zIndex: 10, backgroundColor: '#060B14' }}>
        <div className="container">
          <div className={styles.footerGrid}>
            <div className={styles.footerBrand}>
              <div className={styles.footerLogo}>
                <img src="/stratix_shield.png" alt="Stratix Logo" className={styles.logoImage} />
                <span>Strat<span style={{ color: 'var(--accent-blue)' }}>ix</span> AI</span>
              </div>
              <p>Haciendo la Inteligencia Artificial accesible para todos.</p>
              <div className={styles.socialLinks}><a href="#"><FiInstagram /></a><a href="#"><FiLinkedin /></a></div>
            </div>
            <div className={styles.footerCol}>
              <h4>Compañía</h4><ul className={styles.footerLinks}><li><a href="#company" onClick={(e) => { e.preventDefault(); document.getElementById('company')?.scrollIntoView({ behavior: 'smooth' }); }}>El Manifiesto</a></li><li><a href="https://wa.me/573152597199" target="_blank">Contacto Directo</a></li></ul>
            </div>
            <div className={styles.footerCol}>
              <h4>Legal</h4><ul className={styles.footerLinks}><li><Link href="/legal/terms">Términos de Servicio</Link></li><li><Link href="/legal/privacy">Política de Privacidad</Link></li></ul>
            </div>
            <div className={styles.footerCol}>
              <h4>Producto</h4><ul className={styles.footerLinks}><li><a href="#features">Funcionalidades</a></li><li><a href="#pricing">Planes y Precios</a></li></ul>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>© 2026 Stratix AI. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}