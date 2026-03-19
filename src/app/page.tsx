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
  FiLinkedin,
  FiLock
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
        style={{ fontSize: 'var(--text-5xl)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '1.5rem', textAlign: 'center', width: '100%' }}
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}
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
  const [currency, setCurrency] = useState<'USD' | 'COP'>('USD');
  
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
            <img src="/stratix_shield.png" alt="Stratix Logo" className={styles.logoImage} />
            <span style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>Strat<span style={{ color: 'var(--accent-blue)' }}>ix</span> <small style={{fontSize: '0.6rem', opacity: 0.5}}>AI</small></span>
          </Link>
          
          <div className={styles.navLinks}>
            <a href="#features">Tecnología</a>
            <a href="#arsenal">Ecosistema Labs</a>
            <a href="#pricing">Precios</a>
            <a href="#faq">FAQ</a>
            <div className={styles.navDivider}></div>
            <Link href="/login" className={styles.loginLink}>Ingresar</Link>
            <Link href="/dashboard" className="btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
              Comenzar Gratis <FiArrowRight />
            </Link>
          </div>

          <div className={styles.mobileActions}>
            <Link href="/login" className={styles.loginIcon}><FiLayout /></Link>
            <Link href="/dashboard" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '13px' }}>Pro</Link>
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
                El Ecosistema de <br />
                <span style={{ color: 'var(--accent-blue)', textShadow: '0 0 30px rgba(0, 112, 255, 0.3)' }}>IA B2B</span> Estratégico
              </motion.h1>
              
              <motion.p 
                className={styles.heroSubtitle}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                custom={2}
              >
                Integramos la potencia de <b>Pomelli, Stitch y Opal</b> en una suite de élite para transformar tu atención al cliente en una máquina de ventas automatizada e inteligente.
              </motion.p>
              
              <motion.div 
                className={styles.heroCtas}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                custom={3}
              >
                <Link href="/dashboard" className="btn-primary" style={{ padding: '1.2rem 2.5rem', fontSize: '1.2rem' }}>
                   Lanzar Suite Pro <FiArrowRight />
                </Link>
                <button 
                  onClick={() => document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-secondary" 
                  style={{ padding: '1.2rem 2.5rem', fontSize: '1.2rem' }}
                >
                  Ver Experiencia <FiPlay />
                </button>
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
                         <p>Analizando interés del lead... detectada intención de compra alta (98%). Activando protocolo Stratix.</p>
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

      {/* How It Works Layer */}
      <section className={styles.stepsSection}>
        <div className="container">
          <SectionHeader 
            badge="Simplicidad Radical"
            title="De Cero a Experto en Segundos"
            subtitle="Tres pasos para activar la suite de inteligencia más potente de tu industria."
          />
          <div className={styles.stepsGrid}>
            <motion.div className={styles.stepCard} variants={fadeInUp} custom={1}>
              <div className={styles.stepNumber}>01</div>
              <h3>Scan & Link</h3>
              <p>Pega tu URL o sube tus manuales. Nuestra IA absorbe cada detalle de tu negocio al instante.</p>
            </motion.div>
            <motion.div className={styles.stepCard} variants={fadeInUp} custom={2}>
              <div className={styles.stepNumber}>02</div>
              <h3>Train DNA</h3>
              <p>Pomelli y Opal definen tu tono de voz y lógica de ventas. Tu agente no solo habla, ¡convence!</p>
            </motion.div>
            <motion.div className={styles.stepCard} variants={fadeInUp} custom={3}>
              <div className={styles.stepNumber}>03</div>
              <h3>Deploy Suite</h3>
              <p>Inserta el código en tu web o conecta WhatsApp. Empieza a capturar leads calificados 24/7.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Arsenal Section (Google Labs Integration) */}
      <section className={styles.arsenalSection} id="arsenal">
        <div className="container">
          <SectionHeader 
            badge="El Ecosistema Google"
            title="Sincronización Total con Labs"
            subtitle="No es solo un chatbot. Es una arquitectura coordinada de las IA más avanzadas del mundo."
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

      {/* ROI & Comparison Section: Traditional vs Stratix */}
      <section className={styles.roiSection} id="roi">
        <div className="container">
          <SectionHeader 
            badge="Stratix vs Tradicional"
            title="El Costo de la Inacción"
            subtitle="Compara el impacto de automatizar tu estrategia vs. depender de métodos tradicionales."
          />

          <div className={styles.roiGrid}>
            <motion.div className={styles.roiTraditional} initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}>
              <h4>Métodos Tradicionales</h4>
              <p>Agencias externas, equipos humanos limitados.</p>
              <ul className={styles.roiList}>
                <li><FiX style={{ color: '#ef4444' }} /> Costos de $1,500+ USD / mes</li>
                <li><FiX style={{ color: '#ef4444' }} /> Horarios limitados (8/5)</li>
                <li><FiX style={{ color: '#ef4444' }} /> Lead Scoring manual y lento</li>
                <li><FiX style={{ color: '#ef4444' }} /> Respuestas en 2-4 horas</li>
              </ul>
            </motion.div>

            <div className={styles.roiVs}>VS</div>

            <motion.div className={styles.roiStratix} initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}>
              <div className={styles.heroBadge}>Recomendado</div>
              <h4>Stratix AI Evolution</h4>
              <p>Tecnología de grado empresarial de Google Labs a tu servicio.</p>
              <ul className={styles.roiList}>
                <li><FiCheck /> Inversión desde $49 USD / mes</li>
                <li><FiCheck /> Disponibilidad total 24/7/365</li>
                <li><FiCheck /> <b>Opal Intent Detection Instantáneo</b></li>
                <li><FiCheck /> Respuestas en menos de 2 segundos</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specialized Use Cases */}
      <section className={styles.useCasesSection}>
        <div className="container">
           <div className={styles.useCasesBox}>
              <div className={styles.useCaseItem}>
                 <FiGlobe />
                 <h5>Inmobiliarias Pro</h5>
                 <p>Califica leads interesados en propiedades 24/7 y agenda visitas automáticamente.</p>
              </div>
              <div className={styles.useCaseItem}>
                 <FiSmartphone />
                 <h5>E-commerce High-End</h5>
                 <p>Pomelli extrae tu catálogo y la IA vende como tu mejor vendedor estrella.</p>
              </div>
              <div className={styles.useCaseItem}>
                 <FiTrendingUp />
                 <h5>Agencias B2B</h5>
                 <p>Escala tu captación de clientes sin contratar más personal de ventas.</p>
              </div>
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

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4rem', gap: '1.5rem', flexWrap: 'wrap' }}>
             <button 
               onClick={() => setCurrency('USD')} 
               className={currency === 'USD' ? 'btn-primary' : 'btn-secondary'}
               style={{ padding: '0.75rem 2rem', fontSize: '1rem', minWidth: '220px', borderRadius: '100px', boxShadow: currency === 'USD' ? '0 10px 30px rgba(0, 112, 255, 0.3)' : 'none' }}
             >
               Global Elite (USD)
             </button>
             <button 
               onClick={() => setCurrency('COP')} 
               className={currency === 'COP' ? 'btn-primary' : 'btn-secondary'}
               style={{ padding: '0.75rem 2rem', fontSize: '1rem', minWidth: '220px', borderRadius: '100px', boxShadow: currency === 'COP' ? '0 10px 30px rgba(0, 112, 255, 0.3)' : 'none' }}
             >
               Mercado Colombia (COP)
             </button>
          </div>

          <div className={styles.pricingGrid}>
            <motion.div className={styles.priceCard} whileHover={{ y: -10 }}>
              <div className={styles.pHeader}>
                <h4>Stratix Suite</h4>
                <div className={styles.priceValue}>
                  {currency === 'USD' ? '$49' : '$195k'}<span>/mes</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginTop: '0.5rem' }}>Perfecto para validar ventas 24/7.</p>
              </div>
              <ul className={styles.pFeatures}>
                <li><FiCheck /> 1 Agente de IA Elite</li>
                <li><FiCheck /> 1,000 Oportunidades/mes</li>
                <li><FiCheck /> Entrenamiento Multi-Doc</li>
                <li><FiCheck /> Soporte Prioritario</li>
                <li className={styles.disabled}><FiX /> Lead Scoring Opal</li>
                <li className={styles.disabled}><FiX /> Branding Pomelli</li>
              </ul>
              <Link href="/dashboard?upgrade=starter" className="btn-secondary" style={{ width: '100%', marginTop: 'auto' }}>Comenzar Ahora</Link>
            </motion.div>

            <motion.div className={`${styles.priceCard} ${styles.featuredPrice}`} whileHover={{ y: -10 }}>
              <div className={styles.featuredBadge}>MÁS VENDIDO — MÁXIMO ROI</div>
              <div className={styles.pHeader}>
                <h4>Empire Evolution</h4>
                <div className={styles.priceValue}>
                  {currency === 'USD' ? '$99' : '$395k'}<span>/mes</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginTop: '0.5rem' }}>Domina tu nicho con inteligencia total.</p>
              </div>
              <ul className={styles.pFeatures}>
                <li><FiCheck /> 3 Agentes de IA Elite</li>
                <li><FiCheck /> 5,000 Oportunidades/mes</li>
                <li><FiCheck /> <b>Opal Intent Detection</b></li>
                <li><FiCheck /> <b>Pomelli Brand Kit</b></li>
                <li><FiCheck /> WhatsApp Business Ready</li>
                <li><FiCheck /> Soporte 24/7</li>
              </ul>
              <Link href="/dashboard?upgrade=pro" className="btn-primary" style={{ animation: 'pulse-blue 2s infinite', width: '100%', marginTop: 'auto' }}>Elevar Estrategia</Link>
            </motion.div>

            <motion.div className={styles.priceCard} whileHover={{ y: -10 }}>
              <div className={styles.pHeader}>
                <h4>Legendary (Enterprise)</h4>
                <div className={styles.priceValue}>
                  {currency === 'USD' ? '$249' : '$995k'}<span>/mes</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginTop: '0.5rem' }}>Personalización absoluta y escala masiva.</p>
              </div>
              <ul className={styles.pFeatures}>
                <li><FiCheck /> Agentes Ilimitados</li>
                <li><FiCheck /> Oportunidades Ilimitadas</li>
                <li><FiCheck /> Integración API Full</li>
                <li><FiCheck /> <b>White-Label Suite</b></li>
                <li><FiCheck /> Account Manager Dedicado</li>
                <li><FiCheck /> SLA Empresarial</li>
              </ul>
              <Link href="/dashboard?upgrade=enterprise" className="btn-secondary" style={{ width: '100%', marginTop: 'auto' }}>Consultoría Ejecutiva</Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section (Social Proof) */}
      <section className={styles.testimonialsSection}>
        <div className="container">
          <SectionHeader 
            badge="Opiniones de Élite"
            title="Liderazgo B2B Real"
            subtitle="Mira cómo Stratix AI está transformando equipos de ventas en sistemas de alto rendimiento."
          />
          <div className={styles.testimonialsGrid}>
            <motion.div className={styles.testiCard} whileHover={{ y: -5 }}>
              <div className={styles.testiStars}><FiStar/><FiStar/><FiStar/><FiStar/><FiStar/></div>
              <p>"Redujimos el tiempo de respuesta de 4 horas a 2 segundos. Las ventas por WhatsApp se dispararon un 40% en el primer mes."</p>
              <div className={styles.testiUser}>
                <strong>Carlos R.</strong>
                <span>Founder, PropTech Solutions</span>
              </div>
            </motion.div>
            <motion.div className={styles.testiCard} whileHover={{ y: -5 }}>
              <div className={styles.testiStars}><FiStar/><FiStar/><FiStar/><FiStar/><FiStar/></div>
              <p>"El Lead Scoring de Opal es brujería. Solo hablamos con gente que ya está lista para comprar. El ROI fue inmediato."</p>
              <div className={styles.testiUser}>
                <strong>Laura M.</strong>
                <span>Sales VP, High-End E-commerce</span>
              </div>
            </motion.div>
            <motion.div className={styles.testiCard} whileHover={{ y: -5 }}>
              <div className={styles.testiStars}><FiStar/><FiStar/><FiStar/><FiStar/><FiStar/></div>
              <p>"La estética de Stitch hizo que el bot se viera parte de nuestra marca, no un pegote barato. Nuestros clientes están impresionados."</p>
              <div className={styles.testiUser}>
                <strong>Andrés S.</strong>
                <span>Director Creativo, Agency X</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Live Demo Experience */}
      <section className={styles.demoSection} id="demo-section">
        <div className="container">
          <SectionHeader 
            badge="Live Experience"
            title="Vive la Suite en Vivo"
            subtitle="Interactúa con nuestro Asistente Estratégico y descubre cómo Stratix AI puede transformar tu negocio en segundos."
          />
          
          <div className={styles.demoBox}>
            <div className={styles.demoPhone}>
              <div className={styles.phoneHeader}>
                <div className={styles.phoneStatus}>
                   <div className={styles.statusDot} style={{ background: 'var(--success)' }}></div>
                   <span>Stratix Assistant Online</span>
                </div>
              </div>
              <div className={styles.phoneScreen}>
                {/* Visual representation of the chat */}
                <div className={styles.demoChatContainer}>
                   <div className={styles.demoMsg}>Hola, soy el Agente de Stratix. ¿Cómo puedo ayudarte a escalar hoy?</div>
                   <div className={styles.demoMsgUser}>¿Cómo funciona el Lead Scoring de Opal?</div>
                   <div className={styles.demoMsg}>Opal detecta la intención de compra en tiempo real. Si un cliente está listo, te lo notifico al instante como un lead 'Hot' en tu CRM. 🔥</div>
                </div>
                <div className={styles.phoneInput}>
                  Escribe un mensaje...
                  <FiArrowRight style={{ color: 'var(--accent-blue)' }} />
                </div>
              </div>
            </div>
            
            <div className={styles.demoInfo}>
              <div className={styles.demoFeature}>
                <FiZap />
                <div>
                  <h6>Respuesta Ultra-Rápida</h6>
                  <p>Menos de 2 segundos impulsado por Google Gemini 1.5 Pro.</p>
                </div>
              </div>
              <div className={styles.demoFeature}>
                <FiShield />
                <div>
                  <h6>Privacidad Blindada</h6>
                  <p>Tus datos se procesan en entornos seguros de Google Cloud.</p>
                </div>
              </div>
              <div style={{ marginTop: '2rem' }}>
                <Link href="/dashboard" className="btn-primary" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                   Adquirir este Agente para mi Web
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Restoration */}
      {/* Company Section: Mission & Vision */}
      <section className={styles.companySection} id="company">
        <div className="container">
          <SectionHeader 
            badge="Nuestra Esencia"
            title="Sólidos en Propósito, Élite en Ejecución"
            subtitle="Stratix AI no es solo software; es la evolución de la productividad B2B."
          />
          
          <div className={styles.companyGrid}>
            <motion.div className={styles.companyCard} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}>
              <div className={styles.companyIcon}><FiZap /></div>
              <h4>Nuestra Misión</h4>
              <p>
                Automatizar el crecimiento empresarial mediante tecnología de IA de vanguardia, 
                eliminando los cuellos de botella humanos para permitir que las empresas escalen 
                de forma inteligente, eficiente y sin límites.
              </p>
            </motion.div>
            
            <motion.div className={styles.companyCard} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
              <div className={styles.companyIcon}><FiGlobe /></div>
              <h4>Nuestra Visión</h4>
              <p>
                Consolidarnos como el estándar global de automatización estratégica, donde cada 
                interacción empresarial sea potenciada por un agente inteligente que actúe como 
                un copiloto de alto rendimiento.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

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
                q: "¿Qué diferencia a Stratix AI de un chatbot tradicional?",
                a: "A diferencia de los chatbots básicos, Stratix utiliza una suite integrada: Pomelli captura el ADN de tu marca, Stitch diseña una interfaz de alta gama, y Opal aplica lógica de ventas avanzada. No solo responde dudas; califica prospectos y agenda citas de manera autónoma."
              },
              {
                q: "¿Cómo entrena Stratix AI con la información de mi negocio?",
                a: "Muy fácil. Puedes subir archivos PDF, TXT o simplemente darnos la URL de tu sitio web. Nuestra IA 'escanea' y procesa toda la información para estar lista en menos de 2 minutos."
              },
              {
                q: "¿Puedo usar Stratix AI en WhatsApp y mi CRM?",
                a: "Absolutamente. Stratix es omnicanal. Puedes integrar tu agente en tu sitio web, WhatsApp Business, y conectarlo con tu CRM (Hubspot, Zoho, etc.) vía Webhooks para que cada lead detectado por nuestra IA llegue directo a tu equipo de ventas."
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
            <h2>¿Listo para optimizar tu Estrategia?</h2>
            <p>Únete a las empresas que ya están automatizando su crecimiento con IA.</p>
            <div className={styles.ctaActions}>
              <Link href="/dashboard" className="btn-primary" style={{ padding: '1.2rem 3.5rem', fontSize: '1.1rem' }}>Comenzar Ahora</Link>
              <button 
                onClick={() => document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary" 
                style={{ padding: '1.2rem 3.5rem', fontSize: '1.1rem' }}
              >
                Ver Demo en Vivo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Enriquecido */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerTrust}>
            <div className={styles.trustItem}><FiShield /> <span>Pagos Encriptados 256-bit</span></div>
            <div className={styles.trustItem}><FiLock /> <span>Nivel Bancario (PCI-DSS)</span></div>
            <div className={styles.trustItem}><FiCheck /> <span>Infraestructura Google Cloud</span></div>
            <div className={styles.trustItem}><FiStar /> <span>Soporte Elite 24/7</span></div>
          </div>
          <div className={styles.footerGrid}>
            <div className={styles.footerBrand}>
            <div className={styles.footerLogo}>
              <img src="/stratix_shield.png" alt="Stratix Logo" className={styles.logoImage} />
              <span>Strat<span style={{ color: 'var(--accent-blue)' }}>ix</span> AI</span>
            </div>
            <p>La Arquitectura de Inteligencia Estratégica.</p>
              <div className={styles.socialLinks}>
                <a href="#"><FiInstagram /></a>
                <a href="#"><FiLinkedin /></a>
              </div>
            </div>
            <div className={styles.footerCol}>
              <h4>Compañía</h4>
              <ul className={styles.footerLinks}>
                <li><a href="#company" onClick={(e) => { e.preventDefault(); document.getElementById('company')?.scrollIntoView({ behavior: 'smooth' }); }}>Nuestra Misión</a></li>
                <li><a href="#company" onClick={(e) => { e.preventDefault(); document.getElementById('company')?.scrollIntoView({ behavior: 'smooth' }); }}>Nuestra Visión</a></li>
                <li><a href="https://wa.me/573152597199" target="_blank" rel="noopener noreferrer">Contacto Directo</a></li>
              </ul>
            </div>
            <div className={styles.footerCol}>
              <h4>Legal</h4>
              <ul className={styles.footerLinks}>
                <li><Link href="/legal/terms">Términos</Link></li>
                <li><Link href="/legal/privacy">Privacidad</Link></li>
              </ul>
            </div>
            <div className={styles.footerCol}>
              <h4>Producto</h4>
              <ul className={styles.footerLinks}>
                <li><a href="#features">Tecnología</a></li>
                <li><a href="#pricing">Planes</a></li>
                <li><a href="#demo-section">Demo</a></li>
              </ul>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>© 2026 Stratix AI. Todos los derechos reservados.</p>
            <p>Powered by <b>Advanced Agentic Coding</b></p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FiX(props: any) {
    return <svg {...props} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
}
