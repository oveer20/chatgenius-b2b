"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, Variants } from "framer-motion";
import Link from "next/link";
import {
  FiZap,
  FiStar,
  FiArrowRight,
  FiCpu,
  FiTrendingUp,
  FiShield,
  FiCheck,
  FiChevronDown,
  FiMessageSquare,
  FiLayout,
  FiLayers,
  FiSmartphone,
  FiGlobe,
  FiPlay,
  FiInstagram,
  FiLinkedin
} from "react-icons/fi";
import styles from "./landing.module.css";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.8, ease: [0.215, 0.610, 0.355, 1.0] }
  }),
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

/* ============================================
   Componentes Enriquecidos
   ============================================ */

function SectionHeader({ badge, title, subtitle }: { badge: string, title: string, subtitle: string }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
      <motion.span 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={styles.badge}
        style={{ marginBottom: '1.5rem' }}
      >
        {badge}
      </motion.span>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className={styles.sectionTitle}
        style={{ fontSize: 'var(--text-5xl)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto' }}
      >
        {subtitle}
      </motion.p>
    </div>
  );
}

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("pomelli");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.landingWrapper} style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Navigation */}
      <nav className={`${styles.navbar} ${scrolled ? styles.navScrolled : ""}`}>
        <div className={`container ${styles.navInner}`}>
          <Link href="/" className={styles.logo}>
            <div className={styles.logoGlow}></div>
            <img src="/arsenex_shield.png" alt="Arsenex Logo" style={{ height: '32px', filter: 'brightness(1.5)', opacity: 0.9 }} />
            <span style={{ letterSpacing: '0.02em' }}>Arsen<span style={{ color: 'var(--accent-blue)' }}>ex</span> <small className={styles.proBadge}>AI</small></span>
          </Link>
          
          <div className={styles.navLinks}>
            <a href="#features">Tecnología</a>
            <a href="#arsenal">Arsenal Labs</a>
            <a href="#pricing">Precios</a>
            <a href="#faq">FAQ</a>
            <div className={styles.navDivider}></div>
            <Link href="/login" className={styles.loginLink}>Ingresar</Link>
            <Link href="/dashboard" className="btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
              Comenzar Gratis <FiArrowRight />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section Masterpiece */}
      <section className={styles.hero} ref={targetRef}>
        <motion.div style={{ opacity, scale }} className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                custom={0}
                className={styles.heroBadge}
              >
                <FiZap /> Powered by Gemini 2.5 Pro & Google Labs
              </motion.div>
              
              <motion.h1 
                className={styles.heroTitle}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                custom={1}
              >
                El Arsenal de <br />
                <span style={{ color: 'var(--accent-blue)', textShadow: '0 0 30px rgba(0, 112, 255, 0.3)' }}>IA B2B</span> Definitivo
              </motion.h1>
              
              <motion.p 
                className={styles.heroSubtitle}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                custom={2}
              >
                Integramos la potencia de <b>Pomelli, Stitch y Opal</b> para transformar tu atención al cliente en una máquina de ventas automatizada, inteligente y estéticamente superior.
              </motion.p>
              
              <motion.div 
                className={styles.heroCtas}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                custom={3}
              >
                <Link href="/dashboard" className="btn-primary" style={{ padding: '1.2rem 2.5rem', fontSize: '1.2rem' }}>
                   Lanzar Agente Pro <FiArrowRight />
                </Link>
                <Link href="#arsenal" className="btn-secondary" style={{ padding: '1.2rem 2.5rem', fontSize: '1.2rem' }}>
                  Explorar Tecnología <FiLayers />
                </Link>
              </motion.div>

              <motion.div 
                className={styles.heroStats}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                custom={4}
              >
                <div className={styles.statItem}>
                  <strong>+95%</strong>
                  <span>Precisión IA</span>
                </div>
                <div className={styles.statDivider}></div>
                <div className={styles.statItem}>
                  <strong>24/7</strong>
                  <span>Operación</span>
                </div>
                <div className={styles.statDivider}></div>
                <div className={styles.statItem}>
                  <strong>&lt; 2s</strong>
                  <span>Respuesta</span>
                </div>
              </motion.div>
            </div>

            <motion.div 
              className={styles.heroVisual}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <div className={styles.masterMockup}>
                 <div className={styles.mockupGlass}>
                    <div className={styles.mockupHeader}>
                      <div className={styles.mockupDots}><span></span><span></span><span></span></div>
                      <div className={styles.mockupTopBar}>Opal Intelligence Active</div>
                    </div>
                    <div className={styles.mockupContent}>
                       <div className={styles.chatMessage}>
                         <div className={styles.aiAvatar}>AX</div>
                         <p>Analizando interés del lead... detectada intención de compra alta (98%). Activando protocolo Arsenex.</p>
                       </div>
                       <div className={styles.chatMessageUser}>
                         <p>Me interesa el plan Enterprise para mi equipo de 50 personas.</p>
                       </div>
                       <div className={styles.analysisCard}>
                         <div className={styles.analysisHeader}>
                           <FiCpu /> <span>Lead Scoring Engine</span>
                         </div>
                         <div className={styles.analysisStats}>
                            <div className={styles.aStat}><span>Intent</span><strong>Ventas</strong></div>
                            <div className={styles.aStat}><span>Score</span><strong style={{ color: '#ff4d4d' }}>Hot 🔥</strong></div>
                         </div>
                       </div>
                    </div>
                 </div>
                 <div className={styles.mockupGlow}></div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* The Arsenal Section (Google Labs Integration) */}
      <section className={styles.arsenalSection} id="arsenal">
        <div className="container">
          <SectionHeader 
            badge="El Arsenal de Google"
            title="Sincronización Total con Labs"
            subtitle="No es solo un chatbot. Es un ecosistema coordinado de las IA más avanzadas del mundo."
          />

          <div className={styles.arsenalGrid}>
            <motion.div 
              className={`${styles.arsenalCard} ${activeTab === 'pomelli' ? styles.activeArsenal : ''}`}
              onMouseEnter={() => setActiveTab('pomelli')}
              whileHover={{ scale: 1.02 }}
            >
              <div className={styles.arsenalIcon} style={{ background: 'linear-gradient(135deg, #FF3D00, #FF9100)' }}>
                <FiStar />
              </div>
              <div className={styles.arsenalBody}>
                <h3>Pomelli Branding</h3>
                <p>Nuestra IA analiza tu sitio web y redes sociales (vía Pomelli) para capturar el ADN de tu marca automáticamente.</p>
                <ul className={styles.arsenalList}>
                  <li><FiCheck /> Extracción de Colores Pro</li>
                  <li><FiCheck /> Tono de Voz Coherente</li>
                  <li><FiCheck /> Identidad Visual Única</li>
                </ul>
              </div>
            </motion.div>

            <motion.div 
              className={`${styles.arsenalCard} ${activeTab === 'stitch' ? styles.activeArsenal : ''}`}
              onMouseEnter={() => setActiveTab('stitch')}
              whileHover={{ scale: 1.02 }}
            >
              <div className={styles.arsenalIcon} style={{ background: 'linear-gradient(135deg, #00B0FF, #00E5FF)' }}>
                <FiLayout />
              </div>
              <div className={styles.arsenalBody}>
                <h3>Stitch UI Design</h3>
                <p>Generación instantánea de interfaces adaptativas. Tu chatbot se verá impecable en cualquier dispositivo.</p>
                <ul className={styles.arsenalList}>
                  <li><FiCheck /> Layouts Glassmorphism</li>
                  <li><FiCheck /> Animaciones Ultra-fluidas</li>
                  <li><FiCheck /> Responsive de Alta Gama</li>
                </ul>
              </div>
            </motion.div>

            <motion.div 
              className={`${styles.arsenalCard} ${activeTab === 'opal' ? styles.activeArsenal : ''}`}
              onMouseEnter={() => setActiveTab('opal')}
              whileHover={{ scale: 1.02 }}
            >
              <div className={styles.arsenalIcon} style={{ background: 'linear-gradient(135deg, #6200EA, #AA00FF)' }}>
                <FiLayers />
              </div>
              <div className={styles.arsenalBody}>
                <h3>Opal Logic Builder</h3>
                <p>Configura el comportamiento de tu IA mediante nodos lógicos. Potencia sin necesidad de código.</p>
                <ul className={styles.arsenalList}>
                  <li><FiCheck /> Árboles de Decisión IA</li>
                  <li><FiCheck /> Integración de Datos Real</li>
                  <li><FiCheck /> Flujos de Venta Proactivos</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Restoration & Enrichment */}
      <section className={styles.pricingSection} id="pricing">
        <div className="container">
          <SectionHeader 
            badge="Precios Transparentes"
            title="Inversión que se Paga Sola"
            subtitle="Elige el plan que mejor se adapte al volumen de tu operación. Sin contratos ocultos."
          />

          <div className={styles.pricingGrid}>
            <motion.div className={styles.priceCard} whileHover={{ y: -10 }}>
              <div className={styles.pHeader}>
                <h4>Starter</h4>
                <div className={styles.priceValue}>$49<span>/mes</span></div>
              </div>
              <ul className={styles.pFeatures}>
                <li><FiCheck /> 1 Agente de IA</li>
                <li><FiCheck /> 1,000 Mensajes/mes</li>
                <li><FiCheck /> Entrenamiento Word/PDF</li>
                <li><FiCheck /> Soporte vía Email</li>
                <li className={styles.disabled}><FiX /> Lead Scoring Opal</li>
                <li className={styles.disabled}><FiX /> Branding Pomelli</li>
              </ul>
              <Link href="/dashboard" className="btn-secondary" style={{ width: '100%', marginTop: 'auto' }}>Elegir Starter</Link>
            </motion.div>

            <motion.div className={`${styles.priceCard} ${styles.featuredPrice}`} whileHover={{ y: -10 }}>
              <div className={styles.featuredBadge}>MÁS POPULAR</div>
              <div className={styles.pHeader}>
                <h4>Professional</h4>
                <div className={styles.priceValue}>$99<span>/mes</span></div>
              </div>
              <ul className={styles.pFeatures}>
                <li><FiCheck /> 3 Agentes de IA</li>
                <li><FiCheck /> 5,000 Mensajes/mes</li>
                <li><FiCheck /> Entrenamiento URL & Docs</li>
                <li><FiCheck /> <b>Lead Scoring Opal</b></li>
                <li><FiCheck /> Branding Personalizado</li>
                <li><FiCheck /> Soporte Prioritario</li>
              </ul>
              <Link href="/dashboard" className="btn-primary" style={{ width: '100%', marginTop: 'auto' }}>Elegir Professional</Link>
            </motion.div>

            <motion.div className={styles.priceCard} whileHover={{ y: -10 }}>
              <div className={styles.pHeader}>
                <h4>Enterprise</h4>
                <div className={styles.priceValue}>$249<span>/mes</span></div>
              </div>
              <ul className={styles.pFeatures}>
                <li><FiCheck /> Agentes Ilimitados</li>
                <li><FiCheck /> Mensajes Ilimitados</li>
                <li><FiCheck /> Integración API Full</li>
                <li><FiCheck /> <b>Custom Arsenal Labs</b></li>
                <li><FiCheck /> Dashboard de Analíticas</li>
                <li><FiCheck /> Account Manager</li>
              </ul>
              <Link href="/dashboard" className="btn-secondary" style={{ width: '100%', marginTop: 'auto' }}>Contactar Ventas</Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Restoration */}
      <section className={styles.faqSection} id="faq">
        <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
          <SectionHeader 
            badge="Preguntas Frecuentes"
            title="Despeja tus Dudas"
            subtitle="Todo lo que necesitas saber para empezar a escalar hoy mismo."
          />

          <div className={styles.faqList} style={{ margin: '0 auto' }}>
            {[
              {
                q: "¿Qué diferencia a Arsenex AI de un chatbot tradicional?",
                a: "A diferencia de los chatbots básicos, Arsenex utiliza 'The Arsenal': Pomelli captura el ADN de tu marca, Stitch diseña una interfaz de alta gama, y Opal aplica lógica de ventas avanzada. No solo responde dudas; califica prospectos y agenda citas de manera autónoma."
              },
              {
                q: "¿Cómo entrena Arsenex AI con la información de mi negocio?",
                a: "Es un proceso de segundos. Puedes subir archivos PDF, documentos de Word o simplemente pegar la URL de tu sitio web. Nuestra tecnología basada en Gemini de Google procesa el contenido y lo convierte en conocimiento estratégico para tu agente."
              },
              {
                q: "¿Puedo usar Arsenex AI en WhatsApp y mi CRM?",
                a: "Absolutamente. Arsenex es omnicanal. Puedes integrar tu agente en tu sitio web, WhatsApp Business, y conectarlo con tu CRM (Hubspot, Zoho, etc.) vía Webhooks para que cada lead detectado por nuestra IA llegue directo a tu equipo de ventas."
              },
              {
                q: "¿Qué es el Lead Scoring de Opal y cómo ayuda a mis ventas?",
                a: "Opal analiza cada interacción en tiempo real y clasifica a tus visitantes como 'Hot', 'Warm' o 'Cold' basándose en su intención de compra detectada. Así, tu equipo comercial recibe solo los prospectos que realmente están listos para comprar."
              },
              {
                q: "¿Es seguro el manejo de los datos de mi empresa?",
                a: "La seguridad es nuestra prioridad. Utilizamos encriptación de grado empresarial y cumplimos con los estándares de privacidad de datos de Google Cloud, asegurando que tu información y la de tus clientes esté siempre protegida."
              }
            ].map((item, idx) => (
              <div key={idx} className={`${styles.faqItem} ${openFaq === idx ? styles.faqOpen : ''}`} onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                <div className={styles.faqQuestion}>
                  {item.q}
                  <FiChevronDown />
                </div>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className={styles.faqAnswer}
                    >
                      <p>{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className={styles.ctaFinal}>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.ctaBox}
          >
            <h2>¿Listo para activar tu Arsenal?</h2>
            <p>Únete a las empresas que ya están automatizando su crecimiento con IA.</p>
            <div className={styles.ctaActions}>
              <Link href="/dashboard" className="btn-primary" style={{ padding: '1rem 3rem' }}>Empezar Ahora</Link>
              <Link href="/login" className="btn-secondary" style={{ padding: '1rem 3rem' }}>Ver Demo</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Enriquecido */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerGrid}>
            <div className={styles.footerBrand}>
              <div className={styles.logo} style={{ marginBottom: '1.5rem' }}>
                <img src="/logo.png" alt="Logo" style={{ width: '30px' }} />
                <span>Arsenex AI</span>
              </div>
              <p>Liderando la revolución de la IA estratégica empresarial con el respaldo tecnológico de Google Labs.</p>
              <div className={styles.socialLinks}>
                <a href="#"><FiInstagram /></a>
                <a href="#"><FiLinkedin /></a>
              </div>
            </div>
            <div className={styles.footerLinks}>
              <h4>Producto</h4>
              <a href="#features">Tecnología</a>
              <a href="#arsenal">Arsenal</a>
              <a href="#pricing">Precios</a>
            </div>
            <div className={styles.footerLinks}>
              <h4>Compañía</h4>
              <a href="#">Sobre Nosotros</a>
              <a href="#">Blog</a>
              <a href="#">Contacto</a>
            </div>
            <div className={styles.footerLinks}>
              <h4>Legal</h4>
              <a href="#">Privacidad</a>
              <a href="#">Términos</a>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>© 2026 Arsenex AI. Todos los derechos reservados.</p>
            <p>Backed by <b>DeepMind Advanced Agentic Coding</b></p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FiX() {
    return <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
}
