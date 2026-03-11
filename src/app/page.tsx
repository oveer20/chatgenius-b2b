"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  FiFileText,
  FiZap,
  FiCheck,
  FiStar,
  FiChevronDown,
  FiArrowRight,
  FiLayout,
  FiCpu,
  FiShield,
  FiMessageSquare,
  FiDatabase,
  FiCode,
  FiMenu,
  FiX
} from "react-icons/fi";
import styles from "./landing.module.css";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ============================================
   Navbar
   ============================================ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.navScrolled : ""}`}>
      <div className={`container ${styles.navInner}`}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>✦</span>
          <span>Chat<span className="gradient-text">Genius</span></span>
        </Link>
        
        {/* Desktop Links */}
        <div className={styles.navLinks}>
          <a href="#features">Cómo Funciona</a>
          <a href="#usecases">Casos de Uso</a>
          <a href="#pricing">Precios</a>
        </div>
        
        <div className={styles.navActions}>
          <div className={styles.desktopOnly}>
            <Link href="/login" className={styles.navLogin}>
              Iniciar Sesión
            </Link>
          </div>
          <Link href="/dashboard" className="btn-primary">
            Empezar <span className={styles.desktopOnly}>Gratis</span> <FiArrowRight />
          </Link>
          
          {/* Mobile Toggle */}
          <button 
            className={styles.mobileMenuToggle} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className={styles.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className={styles.mobileMenuContent}>
              <a href="#features" onClick={() => setMobileMenuOpen(false)}>Cómo Funciona</a>
              <a href="#usecases" onClick={() => setMobileMenuOpen(false)}>Casos de Uso</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Precios</a>
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Iniciar Sesión</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ============================================
   Hero with Interactive Demo Chat
   ============================================ */
function Hero() {
  const [demoMessages, setDemoMessages] = useState([
    { role: "assistant", content: "¡Hola! 👋 Soy un ejemplo de ChatGenius. Pregúntame lo que quieras o haz clic en una sugerencia." }
  ]);
  const [demoInput, setDemoInput] = useState("");
  const [demoTyping, setDemoTyping] = useState(false);

  const demoResponses: Record<string, string> = {
    "¿Qué es ChatGenius?": "ChatGenius es una plataforma de chatbots con IA que permite a las empresas atender a sus clientes 24/7, reduciendo tickets de soporte en un 60% y aumentando ventas. 🚀",
    "¿Cuánto cuesta?": "Tenemos un plan gratuito con 500 mensajes/mes. Nuestro plan Growth cuesta solo $49/mes (antes $99) con agentes ilimitados. ¡Un agente humano te costaría $1,200/mes! 💰",
    "¿Cómo funciona?": "Es muy simple: 1️⃣ Subes tu conocimiento (textos, PDFs), 2️⃣ Personalizas el tono de tu bot, 3️⃣ Copias un código en tu web. ¡Listo en 2 minutos!",
  };

  const handleDemoSend = (text?: string) => {
    const msg = text || demoInput.trim();
    if (!msg) return;
    setDemoMessages(prev => [...prev, { role: "user", content: msg }]);
    setDemoInput("");
    setDemoTyping(true);
    
    setTimeout(() => {
      const response = demoResponses[msg] || "¡Excelente pregunta! Para darte la mejor respuesta, te invito a crear tu cuenta gratis y probar el poder completo de la IA. 🤖✨";
      setDemoMessages(prev => [...prev, { role: "assistant", content: response }]);
      setDemoTyping(false);
    }, 1200);
  };

  return (
    <section className={styles.hero}>
      <div className={styles.heroGlow} />
      <div className="container">
        <div className={styles.heroGrid}>
          {/* Left: Text */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div variants={fadeInUp} custom={0}>
              <span className="badge">✨ Respuestas Inteligentes B2B</span>
            </motion.div>
            <motion.h1 className={styles.heroTitle} variants={fadeInUp} custom={1} style={{ textAlign: "left" }}>
              Revoluciona tu atención al cliente
              <br />
              <span className="gradient-text">con IA en minutos</span>
            </motion.h1>
            <motion.p className={styles.heroSubtitle} variants={fadeInUp} custom={2} style={{ textAlign: "left" }}>
              Sube tus documentos, conecta tu tienda y nuestro asistente virtual responderá automáticamente a tus clientes, aumentando ventas y reduciendo tickets de soporte 24/7.
            </motion.p>
            <motion.div className={styles.heroCtas} variants={fadeInUp} custom={3} style={{ justifyContent: "flex-start" }}>
              <Link href="/dashboard" className="btn-primary">
                Crear Mi Chatbot Ahora <FiArrowRight />
              </Link>
            </motion.div>
            <motion.div className={styles.heroStats} variants={fadeInUp} custom={4} style={{ justifyContent: "flex-start" }}>
              <div className={styles.heroStat}>
                <strong>1M+</strong>
                <span>Mensajes Respondidos</span>
              </div>
              <div className={styles.heroStatDivider} />
              <div className={styles.heroStat}>
                <strong>80%</strong>
                <span>Tickets Resueltos por IA</span>
              </div>
              <div className={styles.heroStatDivider} />
              <div className={styles.heroStat}>
                <strong>4.9★</strong>
                <span>Satisfacción</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Interactive Demo Chat */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{
              background: "white",
              borderRadius: "1.25rem",
              boxShadow: "0 25px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.05)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              height: "460px"
            }}
          >
            {/* Chat Header */}
            <div style={{
              padding: "1rem 1.25rem",
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              flexShrink: 0
            }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>
                🤖
              </div>
              <div>
                <div style={{ fontWeight: "700", fontSize: "0.9rem" }}>Asistente ChatGenius</div>
                <div style={{ fontSize: "0.7rem", opacity: 0.8 }}>● En línea — pruébame ahora</div>
              </div>
            </div>

            {/* Chat Messages */}
            <div style={{ flex: 1, padding: "1rem", overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.75rem", background: "#f8fafc" }}>
              {demoMessages.map((msg, i) => (
                <div key={i} style={{
                  alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                  padding: "0.65rem 0.9rem",
                  borderRadius: msg.role === "user" ? "1rem 1rem 0.2rem 1rem" : "1rem 1rem 1rem 0.2rem",
                  fontSize: "0.82rem",
                  lineHeight: "1.5",
                  background: msg.role === "user" ? "linear-gradient(135deg, #3b82f6, #8b5cf6)" : "white",
                  color: msg.role === "user" ? "white" : "#1e293b",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.08)"
                }}>
                  {msg.content}
                </div>
              ))}
              {demoTyping && (
                <div style={{ alignSelf: "flex-start", padding: "0.65rem 0.9rem", borderRadius: "1rem", background: "white", fontSize: "0.82rem", color: "#94a3b8", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
                  <span style={{ animation: "pulse 1.5s infinite" }}>escribiendo...</span>
                </div>
              )}
            </div>

            {/* Suggestion Chips */}
            <div style={{ padding: "0.5rem 1rem", display: "flex", gap: "0.4rem", flexWrap: "wrap", borderTop: "1px solid #e2e8f0", background: "white" }}>
              {Object.keys(demoResponses).map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleDemoSend(q)}
                  style={{
                    padding: "0.35rem 0.7rem",
                    borderRadius: "2rem",
                    border: "1px solid #e2e8f0",
                    background: "#f1f5f9",
                    fontSize: "0.7rem",
                    color: "#3b82f6",
                    cursor: "pointer",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    transition: "all 0.2s"
                  }}
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); handleDemoSend(); }}
              style={{ padding: "0.75rem 1rem", display: "flex", gap: "0.5rem", borderTop: "1px solid #e2e8f0", background: "white", flexShrink: 0 }}
            >
              <input
                value={demoInput}
                onChange={(e) => setDemoInput(e.target.value)}
                placeholder="Escribe algo..."
                style={{
                  flex: 1,
                  padding: "0.6rem 1rem",
                  border: "1px solid #e2e8f0",
                  borderRadius: "2rem",
                  fontSize: "0.82rem",
                  outline: "none",
                  background: "#f8fafc"
                }}
              />
              <button
                type="submit"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <FiArrowRight size={16} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


/* ============================================
   How It Works
   ============================================ */
const steps = [
  {
    icon: <FiDatabase />,
    title: "Sube tu conocimiento",
    description:
      "Conecta tu web, sube manuales en PDF, FAQs o agrega textos con las reglas y productos de tu negocio.",
  },
  {
    icon: <FiCpu />,
    title: "Personaliza su IA",
    description:
      "Define el tono de voz, instrucciones específicas y el comportamiento de tu asistente para que represente tu marca.",
  },
  {
    icon: <FiCode />,
    title: "Integra en tu sitio",
    description:
      "Copia y pega un simple código en tu sitio web y empieza a atender clientes de forma autónoma sin descanso.",
  },
];

function HowItWorks() {
  return (
    <section id="features" className="section">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          <motion.p className={styles.sectionBadge} variants={fadeInUp} custom={0}>
            <span className="badge">⚡ Rápido y Escalable</span>
          </motion.p>
          <motion.h2 className="section-title" variants={fadeInUp} custom={1}>
            Automatiza tu soporte en 3 pasos
          </motion.h2>
          <motion.p className="section-subtitle" variants={fadeInUp} custom={2}>
            No necesitas saber programar. ChatGenius procesa tu información y entrena a un agente experto sobre tu empresa en instantes.
          </motion.p>

          <div className={styles.stepsGrid}>
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className={`glass-card ${styles.stepCard}`}
                variants={fadeInUp}
                custom={i + 3}
              >
                <div className={styles.stepNumber}>{i + 1}</div>
                <div className={styles.stepIcon}>{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================
   Features
   ============================================ */
const features = [
  {
    icon: <FiMessageSquare />,
    title: "Soporte Multilingüe",
    desc: "Tu chatbot entiende y responde fluidamente en más de 50 idiomas con precisión nativa y el contexto adecuado.",
  },
  {
    icon: <FiLayout />,
    title: "Personalización Total",
    desc: "Ajusta la interfaz gráfica, logotipo y los colores del chat para integrarse perfectamente al manual de tu marca.",
  },
  {
    icon: <FiCpu />,
    title: "IA Avanzada (RAG)",
    desc: "Impulsado por Google Gemini y recuperación de documentos (RAG). Sin alucinaciones: responde estrictamente en base a tus manuales.",
  },
  {
    icon: <FiShield />,
    title: "Seguridad Internacional",
    desc: "Cumplimiento de estándares de privacidad para proteger la información y data sensible de tus usuarios corporativos.",
  },
];

function Features() {
  return (
    <section className="section">
      <div className="container">
        <motion.div
          className={styles.featuresGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              className={`glass-card ${styles.featureCard}`}
              variants={fadeInUp}
              custom={i}
            >
              <div className={styles.featureIcon}>{f.icon}</div>
              <div className={styles.featureContent}>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================
   Use Cases (Templates Equivalent)
   ============================================ */
const usecases = [
  { name: "E-Commerce", desc: "Resuelve dudas de envío, políticas de devolución y recomienda productos", color: "#2563eb" },
  { name: "SaaS", desc: "Atiende dudas complejas y reduce la carga del equipo humano", color: "#10b981" },
  { name: "Bienes Raíces", desc: "Captura leads 24/7 y reserva citas según inventario disponible", color: "#7c3aed" },
  { name: "Agencias", desc: "Califica a los prospectos en frío antes de pasarlos a un asesor comercial", color: "#f59e0b" },
];

function UseCases() {
  const [selected, setSelected] = useState(0);

  return (
    <section id="usecases" className="section">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          <motion.p className={styles.sectionBadge} variants={fadeInUp} custom={0}>
            <span className="badge">🎯 Adaptable a Cualquier Nicho</span>
          </motion.p>
          <motion.h2 className="section-title" variants={fadeInUp} custom={1}>
            Soluciones por Industria
          </motion.h2>
          <motion.p className="section-subtitle" variants={fadeInUp} custom={2}>
            Independientemente de lo que vendas, nuestro bot aprende de tu conocimiento para cerrar ventas.
          </motion.p>

          <motion.div className={styles.templatesShowcase} variants={fadeInUp} custom={3}>
            <div className={styles.templateTabs}>
              {usecases.map((t, i) => (
                <button
                  key={i}
                  className={`${styles.templateTab} ${selected === i ? styles.templateTabActive : ""}`}
                  onClick={() => setSelected(i)}
                  style={{ "--tab-color": t.color } as React.CSSProperties}
                >
                  <span className={styles.templateTabDot} style={{ background: t.color }} />
                  {t.name}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                className={styles.templatePreview}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={styles.templateMockup}
                  style={{ "--template-color": usecases[selected].color } as React.CSSProperties}
                >
                  <div className={styles.mockupHeader}>
                    <div className={styles.mockupAvatar} />
                    <div className={styles.mockupLines}>
                      <span style={{ fontWeight: 800, fontSize: '0.8rem' }}>AI Assistant</span>
                      <div className={styles.mockupStatus} style={{ fontSize: '0.6rem', color: 'var(--success)', fontWeight: 700 }}>● Online</div>
                    </div>
                  </div>
                  <div className={styles.mockupBody}>
                      {/* User message */}
                      <div className={styles.mockupSection} style={{ alignItems: "flex-end" }}>
                        <div style={{ background: usecases[selected].color, color: 'white', padding: '8px 12px', borderRadius: '12px 12px 0 12px', fontSize: '0.7rem', maxWidth: '80%' }}>
                           {selected === 0 && "¿Tienen envíos a Ciudad de México?"}
                           {selected === 1 && "¿Cómo conecto mi base de datos?"}
                           {selected === 2 && "¿Qué departamentos hay disponibles?"}
                           {selected === 3 && "¿Me podrías dar un presupuesto?"}
                        </div>
                      </div>
                      {/* AI response */}
                      <div className={styles.mockupSection} style={{ alignItems: "flex-start" }}>
                        <div style={{ background: '#f1f5f9', color: 'var(--text-primary)', padding: '8px 12px', borderRadius: '12px 12px 12px 0', fontSize: '0.7rem', maxWidth: '85%', border: '1px solid var(--border)' }}>
                           {selected === 0 && "¡Claro! Enviamos a todo México. El tiempo de entrega es de 3 a 5 días hábiles."}
                           {selected === 1 && "Es muy sencillo. Solo ve a Configuración > API y sigue nuestra guía paso a paso."}
                           {selected === 2 && "Actualmente tenemos 3 lofts en el centro y una casa familiar en zona norte."}
                           {selected === 3 && "¡Por supuesto! Para darte una cifra exacta, ¿cuántos agentes necesitas?"}
                        </div>
                      </div>
                      {/* Interactive pill */}
                      <div style={{ marginTop: 'auto', display: 'flex', gap: '5px' }}>
                        <div style={{ height: '6px', width: '20px', borderRadius: '10px', background: 'var(--border)' }}></div>
                        <div style={{ height: '6px', width: '40px', borderRadius: '10px', background: 'var(--border)' }}></div>
                      </div>
                  </div>
                </div>
                <div className={styles.templateInfo}>
                  <h3>{usecases[selected].name}</h3>
                  <p>{usecases[selected].desc}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================
   Pricing
   ============================================ */
const plans = [
  {
    name: "Starter",
    price: "$0",
    originalPrice: null,
    period: "/mes",
    description: "Para validar tu idea sin riesgo",
    features: [
      "1 Agente de IA",
      "Hasta 500 mensajes/mes",
      "Soporte web básico",
      "Marca de agua ChatGenius",
    ],
    cta: "Empezar Gratis",
    href: "/dashboard",
    popular: false,
  },
  {
    name: "Growth",
    price: "$49",
    copPrice: "195.000",
    originalPrice: "$99",
    period: "/mes",
    description: "Para negocios que quieren escalar",
    features: [
      "Agentes de IA Ilimitados",
      "Hasta 5,000 mensajes",
      "Entrenamiento con RAG Avanzado",
      "Sin marca de agua",
      "Personalización de marca completa",
      "Análisis de conversaciones",
    ],
    cta: "Comenzar Ahora",
    planId: "pro",
    href: "#",
    popular: true,
  },
  {
    name: "Empresarial",
    price: "$199",
    copPrice: "795.000",
    originalPrice: "$399",
    period: "/mes",
    description: "Volumen a gran escala con soporte VIP",
    features: [
      "Todo lo de Growth",
      "Mensajes ilimitados",
      "Soporte dedicado por Slack",
      "Acceso completo a la API",
      "Conexión con CRM (Salesforce/Hubspot)",
      "Bases de conocimiento ilimitadas",
    ],
    cta: "Contactar a Ventas",
    planId: "enterprise",
    href: "https://wa.me/573000000000?text=Hola,%20me%20interesa%20el%20plan%20Empresarial%20de%20ChatGenius",
    popular: false,
  },
];

function Pricing() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (plan: any) => {
    if (plan.name === "Starter") return;
    if (plan.name === "Empresarial") {
      window.open(plan.href, "_blank");
      return;
    }

    setLoading(plan.planId);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: plan.planId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Error al procesar el pago");
      }
    } catch (err) {
      alert("Error de conexión");
    } finally {
      setLoading(null);
    }
  };

  return (
    <section id="pricing" className="section">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          <motion.p className={styles.sectionBadge} variants={fadeInUp} custom={0}>
            <span className="badge">💎 Inversión Rentable</span>
          </motion.p>
          <motion.h2 className="section-title" variants={fadeInUp} custom={1}>
            Precios diseñados para escalar
          </motion.h2>
          <motion.p className="section-subtitle" variants={fadeInUp} custom={2}>
            Un agente humano cuesta ~$1,200/mes. ChatGenius hace lo mismo desde <strong>$0</strong>. Haz la cuenta.
          </motion.p>

          <div className={styles.pricingGrid}>
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                className={`glass-card ${styles.pricingCard} ${plan.popular ? styles.pricingPopular : ""}`}
                variants={fadeInUp}
                custom={i + 3}
              >
                {plan.popular && <div className={styles.popularBadge}>⭐ Más Popular</div>}
                <h3>{plan.name}</h3>
                <div className={styles.pricingAmount}>
                  {plan.originalPrice && (
                    <span style={{ 
                      textDecoration: "line-through", 
                      color: "var(--text-tertiary)", 
                      fontSize: "1.2rem", 
                      marginRight: "0.5rem",
                      fontWeight: "400"
                    }}>
                      {plan.originalPrice}
                    </span>
                  )}
                  <span className={styles.price}>{plan.price}</span>
                  <span className={styles.period}>{plan.period}</span>
                </div>
                {(plan as any).copPrice && (
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginBottom: '1rem', fontWeight: 600 }}>
                    ~ ${(plan as any).copPrice} COP
                  </div>
                )}
                <p className={styles.pricingDesc}>{plan.description}</p>
                {plan.popular && (
                  <div style={{
                    background: "rgba(16, 185, 129, 0.1)",
                    border: "1px solid rgba(16, 185, 129, 0.2)",
                    borderRadius: "var(--radius-md)",
                    padding: "0.6rem 1rem",
                    fontSize: "0.8rem",
                    color: "var(--success)",
                    fontWeight: "600",
                    textAlign: "center",
                    marginBottom: "0.5rem"
                  }}>
                    💰 Ahorras $1,151/mes vs. un agente humano
                  </div>
                )}
                <ul className={styles.pricingFeatures}>
                  {plan.features.map((f, j) => (
                    <li key={j}>
                      <FiCheck /> {f}
                    </li>
                  ))}
                </ul>
                <button
                  disabled={loading === (plan as any).planId}
                  onClick={() => handleCheckout(plan)}
                  className={plan.popular ? "btn-primary" : "btn-secondary"}
                  style={{ width: "100%", marginTop: "auto" }}
                >
                  {loading === (plan as any).planId ? "Procesando..." : plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


/* ============================================
   Testimonials
   ============================================ */
const testimonials = [
  {
    name: "Roberto Gómez",
    role: "CEO en E-Shop Latam",
    text: "En dos semanas redujimos los tickets de soporte en un 60%. La IA puede responder preguntas de tallas y despachos al instante, salvando muchísimas ventas abandonadas.",
    rating: 5,
  },
  {
    name: "Valeria Mendoza",
    role: "Directora de Ventas, InmoTech",
    text: "El agente captura leads a las 3 AM cuando nosotros dormimos. Logramos agendar 15% más visitas físicas usando ChatGenius.",
    rating: 5,
  },
  {
    name: "Felipe Arango",
    role: "CTO, CloudSaaS",
    text: "La precisión del RAG es increíble. Subimos nuestra documentación técnica completa y el bot responde preguntas de API sin equivocarse.",
    rating: 5,
  },
];

function Testimonials() {
  return (
    <section className="section">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          <motion.p className={styles.sectionBadge} variants={fadeInUp} custom={0}>
            <span className="badge">⭐ Testimonios B2B</span>
          </motion.p>
          <motion.h2 className="section-title" variants={fadeInUp} custom={1}>
            Empresas que confían en nosotros
          </motion.h2>
          <motion.p className="section-subtitle" variants={fadeInUp} custom={2}>
            Mira cómo ChatGenius está transformando la operación de negocios modernos.
          </motion.p>

          <div className={styles.testimonialsGrid}>
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                className={`glass-card ${styles.testimonialCard}`}
                variants={fadeInUp}
                custom={i + 3}
              >
                <div className={styles.testimonialStars}>
                  {[...Array(t.rating)].map((_, j) => (
                    <FiStar key={j} />
                  ))}
                </div>
                <p>&ldquo;{t.text}&rdquo;</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.testimonialAvatar}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================
   FAQ
   ============================================ */
const faqs = [
  {
    q: "¿Qué sucede si el bot no sabe la respuesta a una pregunta?",
    a: "Puedes configurar el sistema para que diga que no sabe y transfiera automáticamente el chat a un asesor humano o solicite un correo electrónico para seguimiento.",
  },
  {
    q: "¿Cómo entreno a la Inteligencia Artificial?",
    a: "Solo tienes que subir archivos PDF, vincular URLs de tu centro de ayuda, o pegar fragmentos de texto dentro de nuestro Dashboard. El proceso toma solo un par de minutos.",
  },
  {
    q: "¿Necesito conocimientos técnicos para instalarlo?",
    a: "Para nada, ChatGenius te generará un script que instalas en el <head> o <body> de tu web (con tutoriales paso a paso para Shopify, WordPress, Webflow, etc).",
  },
  {
    q: "¿Qué modelo de Inteligencia Artificial usan?",
    a: "Dependiendo del requerimiento y la velocidad, usamos modelos avanzados de Google como Gemini 1.5 Pro por debajo de nuestra tecnología RAG patentada.",
  },
  {
    q: "¿Pueden las respuestas sonar amables o estrictamente corporativas?",
    a: "Tú defines la personalidad a través del Promp Inicial (instrucciones del sistema). Puede ser amigable usando emojis o increíblemente formal y corporativo.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="section">
      <div className="container container-sm">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          <motion.p className={styles.sectionBadge} variants={fadeInUp} custom={0}>
            <span className="badge">❓ Preguntas Frecuentes</span>
          </motion.p>
          <motion.h2 className="section-title" variants={fadeInUp} custom={1}>
            Resolvemos tus dudas
          </motion.h2>
          <motion.p className="section-subtitle" variants={fadeInUp} custom={2}>
            Todo lo que necesitas saber antes de implementar tu bot de ventas.
          </motion.p>

          <div className={styles.faqList}>
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                className={`${styles.faqItem} ${open === i ? styles.faqOpen : ""}`}
                variants={fadeInUp}
                custom={i + 3}
              >
                <button
                  className={styles.faqQuestion}
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span>{faq.q}</span>
                  <FiChevronDown className={styles.faqChevron} />
                </button>
                <AnimatePresence>
                  {open === i && (
                     <motion.div
                       className={styles.faqAnswer}
                       initial={{ height: 0, opacity: 0 }}
                       animate={{ height: "auto", opacity: 1 }}
                       exit={{ height: 0, opacity: 0 }}
                       transition={{ duration: 0.3 }}
                     >
                       <p>{faq.a}</p>
                     </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================
   CTA
   ============================================ */
function CTA() {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <motion.div
          className={styles.ctaContent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.h2 className={styles.ctaTitle} variants={fadeInUp} custom={0}>
            ¿Listo para automatizar
            <br />
            <span className="gradient-text">tu servicio al cliente?</span>
          </motion.h2>
          <motion.p className={styles.ctaSubtitle} variants={fadeInUp} custom={1}>
            Únete a cientos de empresas que ya mejoraron su atención 24/7 y redujeron sus costos operativos.
          </motion.p>
          <motion.div variants={fadeInUp} custom={2}>
            <Link href="/dashboard" className="btn-primary">
              Crea tu Agente Gratis <FiArrowRight />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================
   Footer
   ============================================ */
function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoIcon}>✦</span>
              <span>Chat<span className="gradient-text">Genius</span></span>
            </Link>
            <p>
              Agentes de Inteligencia artificial entrenados en segundos para soporte B2B, cierre de ventas y automatización.
            </p>
          </div>
          <div className={styles.footerLinks}>
            <h4>Producto</h4>
            <Link href="/dashboard">Sube tus manuales</Link>
            <a href="#usecases">Casos de Uso</a>
            <a href="#pricing">Precios B2B</a>
          </div>
          <div className={styles.footerLinks}>
            <h4>Soporte</h4>
            <a href="#faq">FAQ</a>
            <a href="#">Contacto de Ventas</a>
            <a href="#">Documentación API</a>
          </div>
          <div className={styles.footerLinks}>
            <h4>Legal</h4>
            <a href="#">Privacidad de Datos</a>
            <a href="#">Términos Contractuales</a>
            <a href="#">Seguridad (Compliance)</a>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} ChatGenius B2B. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

/* ============================================
   Main Page
   ============================================ */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <UseCases />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
