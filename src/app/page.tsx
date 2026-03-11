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
   Hero
   ============================================ */
function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroGlow} />
      <div className="container">
        <motion.div
          className={styles.heroContent}
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div variants={fadeInUp} custom={0}>
            <span className="badge">✨ Respuestas Inteligentes B2B</span>
          </motion.div>
          <motion.h1 className={styles.heroTitle} variants={fadeInUp} custom={1}>
            Revoluciona tu atención al cliente
            <br />
            <span className="gradient-text">con IA en minutos</span>
          </motion.h1>
          <motion.p className={styles.heroSubtitle} variants={fadeInUp} custom={2}>
            Sube tus documentos, conecta tu tienda y nuestro asistente virtual responderá automáticamente a tus clientes, aumentando ventas y reduciendo tickets de soporte 24/7.
          </motion.p>
          <motion.div className={styles.heroCtas} variants={fadeInUp} custom={3}>
            <Link href="/dashboard" className="btn-primary">
              Crear Mi Chatbot Ahora <FiArrowRight />
            </Link>
            <a href="#features" className="btn-secondary">
              Ver Demo
            </a>
          </motion.div>
          <motion.div className={styles.heroStats} variants={fadeInUp} custom={4}>
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
              <span>Satisfacción del Cliente</span>
            </div>
          </motion.div>
        </motion.div>
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
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
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
                  style={{ "--template-color": usecases[selected].color, height: "350px", aspectRatio: "1/1" } as React.CSSProperties}
                >
                  <div className={styles.mockupHeader}>
                    <div className={styles.mockupAvatar} />
                    <div className={styles.mockupLines}>
                      <div className={styles.mockupLine} style={{ width: "60%" }} />
                      <div className={styles.mockupLine} style={{ width: "40%", height: "4px" }} />
                    </div>
                  </div>
                  <div className={styles.mockupBody}>
                     <div className={styles.mockupSection} style={{ alignItems: "flex-end" }}>
                        <div className={styles.mockupLine} style={{ width: "60%", background: usecases[selected].color, opacity: 0.8 }} />
                        <div className={styles.mockupLine} style={{ width: "40%", background: usecases[selected].color, opacity: 0.8 }} />
                     </div>
                     <div className={styles.mockupSection} style={{ alignItems: "flex-start" }}>
                        <div className={styles.mockupLine} style={{ width: "80%" }} />
                        <div className={styles.mockupLine} style={{ width: "75%" }} />
                        <div className={styles.mockupLine} style={{ width: "50%" }} />
                     </div>
                     <div className={styles.mockupSection} style={{ alignItems: "flex-end" }}>
                        <div className={styles.mockupLine} style={{ width: "40%", background: usecases[selected].color, opacity: 0.8 }} />
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
    period: "/mes",
    description: "Perfecto para validación",
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
    period: "/mes",
    description: "Para negocios en expansión",
    features: [
      "Agentes de IA Ilimitados",
      "Hasta 5,000 mensajes",
      "Entrenamiento con RAG Avanzado",
      "Sin marca de agua",
      "Personalización de marca",
      "Análisis de conversaciones",
    ],
    cta: "Comenzar Prueba de 14 días",
    href: "/dashboard",
    popular: true,
  },
  {
    name: "Empresarial",
    price: "$199",
    period: "/mes",
    description: "Volumen a gran escala",
    features: [
      "Todo lo de Growth",
      "Mensajes ilimitados",
      "Soporte dedicado por Slack",
      "Acceso a la API",
      "Conexión con CRM (Salesforce/Hubspot)",
      "Bases de conocimiento ilimitadas",
    ],
    cta: "Contactar a Ventas",
    href: "#",
    popular: false,
  },
];

function Pricing() {
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
            Paga una fracción del costo de un empleado de soporte humano, con una eficiencia 10 veces mayor.
          </motion.p>

          <div className={styles.pricingGrid}>
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                className={`glass-card ${styles.pricingCard} ${plan.popular ? styles.pricingPopular : ""}`}
                variants={fadeInUp}
                custom={i + 3}
              >
                {plan.popular && <div className={styles.popularBadge}>Más Popular</div>}
                <h3>{plan.name}</h3>
                <div className={styles.pricingAmount}>
                  <span className={styles.price}>{plan.price}</span>
                  <span className={styles.period}>{plan.period}</span>
                </div>
                <p className={styles.pricingDesc}>{plan.description}</p>
                <ul className={styles.pricingFeatures}>
                  {plan.features.map((f, j) => (
                    <li key={j}>
                      <FiCheck /> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={plan.popular ? "btn-primary" : "btn-secondary"}
                  style={{ width: "100%", marginTop: "auto" }}
                >
                  {plan.cta}
                </Link>
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
