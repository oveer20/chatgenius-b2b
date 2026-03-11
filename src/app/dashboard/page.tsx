"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FiMessageSquare,
  FiSettings,
  FiLogOut,
  FiPlus,
  FiClock,
  FiStar,
  FiArrowRight,
  FiZap,
  FiDatabase,
  FiCode
} from "react-icons/fi";
import styles from "./dashboard.module.css";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4 },
  }),
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"agents" | "settings">("agents");

  // Demo data
  const agents = [
    {
      id: "1",
      name: "Soporte E-commerce",
      model: "Gemini 1.5 Pro",
      updatedAt: "2026-03-10",
      conversations: 1250,
      status: "Activo"
    },
    {
      id: "2",
      name: "Agente Captación Leads Real Estate",
      model: "Gemini 1.5 Flash",
      desc: "Impulsado por Google Gemini y recuperación de documentos (RAG). Sin alucinaciones: responde estrictamente en base a tus manuales.",
      updatedAt: "2026-03-08",
      conversations: 340,
      status: "Entrenando..."
    },
  ];

  const handleUpgrade = async (plan: string) => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, email: "demo@empresa.com" })
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert(data.error || "Error al iniciar el pago");
    } catch (err) {
      alert("Error de conexión");
    }
  };

  return (
    <div className={styles.dashboard}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>✦</span>
          Chat<span className="gradient-text">Genius</span>
        </Link>

        <nav className={styles.nav}>
          <button
            className={`${styles.navItem} ${activeTab === "agents" ? styles.navItemActive : ""}`}
            onClick={() => setActiveTab("agents")}
          >
            <FiMessageSquare /> Mis Agentes de IA
          </button>
          <button
            className={`${styles.navItem} ${activeTab === "settings" ? styles.navItemActive : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            <FiSettings /> Configuración de Empresa
          </button>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.planBadge}>
            <FiStar /> Plan Starter
          </div>
          <button onClick={() => handleUpgrade('pro')} className="btn-primary" style={{ width: "100%", fontSize: "0.85rem", padding: "0.65rem" }}>
            <FiZap /> Upgrade a Growth
          </button>
          <button className={styles.logoutBtn}>
             <FiLogOut /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className={styles.main}>
        {activeTab === "agents" ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            <motion.div className={styles.header} variants={fadeInUp} custom={0}>
              <div>
                <h1>Gestión de Agentes</h1>
                <p>Configura, entrena y monitorea tus asistentes inteligentes impulsados por Google Gemini.</p>
              </div>
              <Link href="/dashboard/bot/new" className="btn-primary">
                <FiPlus /> Crear Nuevo Agente
              </Link>
            </motion.div>

            <div className={styles.resumeGrid}> {/* We keep the CSS class name for grid structure */}
              {agents.map((agent, i) => (
                <motion.div
                  key={agent.id}
                  className={`glass-card ${styles.resumeCard}`}
                  variants={fadeInUp}
                  custom={i + 1}
                >
                  <div className={styles.resumePreview}>
                    <FiMessageSquare size={32} />
                  </div>
                  <div className={styles.resumeInfo}>
                    <h3>{agent.name}</h3>
                    <div className={styles.resumeMeta}>
                      <span><FiClock /> {agent.updatedAt}</span>
                      <span><FiDatabase /> {agent.conversations} chats</span>
                    </div>
                    <span 
                      className={styles.templateBadge} 
                      style={{
                        backgroundColor: agent.status === "Activo" ? "rgba(16, 185, 129, 0.1)" : "rgba(245, 158, 11, 0.1)", 
                        color: agent.status === "Activo" ? "var(--success)" : "var(--warning)"
                      }}
                    >
                      {agent.status}
                    </span>
                  </div>
                  <div className={styles.resumeActions}>
                    <Link href={`/dashboard/bot/${agent.id}`} className="btn-secondary" style={{ fontSize: "0.8rem", padding: "0.5rem 1rem" }}>
                      <FiSettings /> Entrenar
                    </Link>
                    <button onClick={() => setActiveTab("settings")} className="btn-primary" style={{ fontSize: "0.8rem", padding: "0.5rem 1rem" }}>
                      <FiCode /> Instalar
                    </button>
                  </div>
                </motion.div>
              ))}

              {/* Add new card */}
              <motion.div variants={fadeInUp} custom={agents.length + 1}>
                <Link href="/dashboard/bot/new" className={styles.addCard}>
                  <FiPlus size={32} />
                  <span>Configurar nuevo asistente</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className={styles.header}>
              <div>
                <h1>Configuración</h1>
                <p>Administra tu cuenta empresarial y preferencias</p>
              </div>
            </div>

            <div className={`glass-card ${styles.settingsCard}`}>
              <h3>Instalación del Widget</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>
                Copia y pega este código antes de cerrar la etiqueta <code>&lt;/body&gt;</code> en tu sitio web.
              </p>
              <div style={{ background: "#000", padding: "1rem", borderRadius: "var(--radius-md)", position: "relative" }}>
                 <code style={{ fontSize: "0.8rem", color: "#34d399", display: "block", overflowX: "auto" }}>
                   {`<script 
  src="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/widget.js" 
  data-bot-id="tu-agente-id">
</script>`}
                 </code>
                 <button 
                  onClick={() => {
                    navigator.clipboard.writeText(`<script src="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/widget.js" data-bot-id="tu-agente-id"></script>`);
                    alert("¡Código copiado!");
                  }}
                  style={{ position: "absolute", top: "0.5rem", right: "0.5rem", padding: "0.2rem 0.5rem", fontSize: "0.7rem", background: "var(--bg-glass)", border: "1px solid var(--border)", borderRadius: "4px" }}>
                   Copiar
                 </button>
              </div>
            </div>

            <div className={`glass-card ${styles.settingsCard}`}>
              <h3>Información de la Cuenta</h3>
              <div className={styles.settingsForm}>
                <div className={styles.settingsField}>
                  <label className="label">Nombre de la Empresa</label>
                  <input className="input" defaultValue="TechCorp 3000" />
                </div>
                <div className={styles.settingsField}>
                  <label className="label">Email de Administración</label>
                  <input className="input" type="email" defaultValue="admin@techcorp.com" />
                </div>
                <button className="btn-primary" style={{ alignSelf: "flex-start" }}>
                  Guardar Cambios
                </button>
              </div>
            </div>

            <div className={`glass-card ${styles.settingsCard}`}>
              <h3>Plan Actual</h3>
              <div className={styles.planInfo}>
                <div>
                  <strong>Starter Mode</strong>
                  <p>1 Agente, 500 mensajes, marca de agua de ChatGenius</p>
                </div>
                <button onClick={() => handleUpgrade('enterprise')} className="btn-primary">
                  Upgrade a Enterprise — $199/mes <FiArrowRight />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
