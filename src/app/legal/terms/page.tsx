"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowLeft, FiFileText, FiAlertCircle, FiTrendingUp } from "react-icons/fi";

export default function TermsOfService() {
  return (
    <div style={{ backgroundColor: "#060B14", color: "white", minHeight: "100vh", fontFamily: "sans-serif" }}>
      {/* Header */}
      <nav style={{ padding: "1.5rem 5%", borderBottom: "1px solid rgba(212,175,55,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/" style={{ color: "#D4AF37", textDecoration: "none", display: "flex", alignItems: "center", gap: "10px", fontWeight: "bold" }}>
          <FiArrowLeft /> VOLVER AL ECOSISTEMA
        </Link>
        <div style={{ fontWeight: 900, fontSize: "1.2rem" }}>
          Strat<span style={{ color: "#D4AF37" }}>ix</span> Intelligence
        </div>
      </nav>

      <main style={{ maxWidth: "800px", margin: "0 auto", padding: "5rem 1.5rem" }}>
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
        >
          <h1 style={{ fontSize: "3rem", fontWeight: 900, marginBottom: "1rem" }}>Términos de <span style={{ color: "#D4AF37" }}>Servicio</span></h1>
          <p style={{ opacity: 0.5, marginBottom: "3rem" }}>Vigente para el ecosistema Stratix Intelligence en 2026</p>

          <section style={{ marginBottom: "3rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "1.5rem", color: "#D4AF37" }}>
              <FiFileText size={24} />
              <h2 style={{ fontSize: "1.5rem", margin: 0 }}>Acuerdo de Élite</h2>
            </div>
            <p style={{ lineHeight: 1.8, opacity: 0.8 }}>
              Al acceder a la infraestructura de **Stratix Intelligence**, usted acepta vincularse a este contrato de servicio estratégico. Diseñamos herramientas para líderes empresariales; por lo tanto, el uso indebido de nuestra IA para actividades ilícitas o spam está estrictamente prohibido.
            </p>
          </section>

          <section style={{ marginBottom: "3rem" }}>
             <h3 style={{ color: "#D4AF37", marginBottom: "1rem" }}>1. Licencia de Infraestructura IA</h3>
             <p style={{ lineHeight: 1.8, opacity: 0.8 }}>
               Stratix otorga una licencia limitada e intransferible para operar agentes inteligentes bajo su marca. Usted es responsable de la configuración de sus bots y de asegurar que el contenido cargado en su base de conocimientos cumpla con las leyes de propiedad intelectual de su jurisdicción.
             </p>
          </section>

          <section style={{ marginBottom: "3rem" }}>
             <h3 style={{ color: "#D4AF37", marginBottom: "1rem" }}>2. Planes y Suscripciones de Élite</h3>
             <p style={{ lineHeight: 1.8, opacity: 0.8 }}>
               El acceso a funciones avanzadas (RAG, WhatsApp API Ilimitado) está sujeto a la suscripción activa de un plan Élite. Los pagos procesados a través de **Mercado Pago** no son reembolsables una vez activado el consumo de créditos del modelo.
             </p>
          </section>

          <section style={{ marginBottom: "3rem" }}>
             <h3 style={{ color: "#D4AF37", marginBottom: "1rem" }}>3. Garantía Operativa</h3>
             <p style={{ lineHeight: 1.8, opacity: 0.8 }}>
               Nos esforzamos por mantener una disponibilidad del 99.9%. Sin embargo, no nos hacemos responsables por interrupciones menores derivadas de actualizaciones en las redes troncales de WhatsApp o servicios de Google Labs. Su éxito es nuestro motor prioritario.
             </p>
          </section>

          <div style={{ padding: "2rem", background: "rgba(212,175,55,0.05)", borderRadius: "20px", border: "1px solid rgba(212,175,55,0.2)", marginTop: "5rem" }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <FiAlertCircle color="#D4AF37" size={24} />
              <p style={{ opacity: 0.7, margin: 0 }}>
                El uso continuado de Stratix Intelligence implica su total aceptación a estos términos de alto rendimiento.
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      <footer style={{ textAlign: "center", padding: "4rem", opacity: 0.3, fontSize: "0.8rem" }}>
        &copy; 2026 Stratix Intelligence — Todos los derechos reservados.
      </footer>
    </div>
  );
}
