"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowLeft, FiFileText, FiShield, FiCheckCircle } from "react-icons/fi";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function TermsOfService() {
  return (
    <div style={{ backgroundColor: "#060B14", color: "white", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      {/* Cinematic Background Ornament */}
      <div style={{ position: 'fixed', top: 0, right: 0, width: '40%', height: '40%', background: 'radial-gradient(circle at 100% 0%, rgba(212,175,55,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
      
      {/* Header Elite */}
      <nav style={{ padding: "1.5rem 5%", borderBottom: "1px solid rgba(212,175,55,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center", position: 'relative', zIndex: 10, backdropFilter: 'blur(20px)', backgroundColor: 'rgba(6,11,20,0.8)' }}>
        <Link href="/" style={{ color: "#D4AF37", textDecoration: "none", display: "flex", alignItems: "center", gap: "10px", fontWeight: 800, fontSize: '0.85rem', letterSpacing: '1px' }}>
          <FiArrowLeft /> VOLVER AL ECOSISTEMA
        </Link>
        <div style={{ fontWeight: 900, fontSize: "1.4rem", letterSpacing: '-0.02em' }}>
          Strat<span style={{ color: "#D4AF37" }}>ix</span> Intelligence
        </div>
      </nav>

      <main style={{ maxWidth: "850px", margin: "0 auto", padding: "6rem 1.5rem", position: 'relative', zIndex: 5 }}>
        <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
          <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
            <h1 style={{ fontSize: "4rem", fontWeight: 900, lineHeight: 1.1, marginBottom: "1.5rem" }}>Términos de <span style={{ color: "#D4AF37" }}>Servicio</span></h1>
            <p style={{ opacity: 0.5, fontSize: '0.9rem', letterSpacing: '2px', fontWeight: 700 }}>VERSIÓN CORPORATIVA V45.0 — ACTUALIZADO 2026</p>
          </div>

          <div style={{ display: 'grid', gap: '3.5rem' }}>
            
            <section>
              <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "1.5rem", color: "#D4AF37" }}>
                <FiShield size={22} />
                <h2 style={{ fontSize: "1.8rem", fontWeight: 800, margin: 0, letterSpacing: '-0.01em' }}>1. Estatus del Acuerdo</h2>
              </div>
              <p style={{ lineHeight: 1.9, opacity: 0.8, fontSize: '1.05rem' }}>
                Al acceder a la infraestructura de de Stratix Intelligence, usted (el "Cliente") acepta este contrato vinculante de servicios tecnológicos. Stratix es una plataforma diseñada para la optimización comercial de alto nivel; cualquier uso para difamación, spam o actividades ilícitas resultará en la terminación inmediata del servicio sin reembolso.
              </p>
            </section>

            <section>
              <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "1.5rem", color: "#D4AF37" }}>
                <FiFileText size={22} />
                <h2 style={{ fontSize: "1.8rem", fontWeight: 800, margin: 0 }}>2. Licencia y Uso de RAG</h2>
              </div>
              <p style={{ lineHeight: 1.9, opacity: 0.8, fontSize: '1.05rem' }}>
                El Cliente es el único responsable por el contenido inyectado en el motor de conocimiento (RAG). Stratix garantiza el procesamiento seguro de estos datos pero no se hará responsable por alucinaciones derivadas de manuales incompletos o documentos con errores de origen. Usted garantiza tener los derechos sobre toda la documentación cargada.
              </p>
            </section>

            <section>
              <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "1.5rem", color: "#D4AF37" }}>
                <FiCheckCircle size={22} />
                <h2 style={{ fontSize: "1.8rem", fontWeight: 800, margin: 0 }}>3. Planes Enterprise y Facturación</h2>
              </div>
              <p style={{ lineHeight: 1.9, opacity: 0.8, fontSize: '1.05rem' }}>
                El acceso a las capas Professional Pro y Enterprise Elite está sujeto a pagos recurrentes procesados a través de aliados certificados. Debido a la naturaleza de los modelos de IA de alta computación, los créditos consumidos son definitivos y no sujetos a reembolso total una vez que el agente ha operado durante el primer ciclo de 24 horas.
              </p>
            </section>

          </div>

          <div style={{ padding: "2.5rem", background: "linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(6,11,20,0.5) 100%)", borderRadius: "30px", border: "1px solid rgba(212,175,55,0.25)", marginTop: "6rem", textAlign: 'center' }}>
            <p style={{ opacity: 0.8, margin: 0, fontSize: '1rem', lineHeight: 1.6 }}>
              Su confianza es nuestro activo más valioso. Si tiene dudas sobre la implementación legal de Stratix en su jurisdicción, le instamos a consultar con su departamento jurídico.
            </p>
          </div>
        </motion.div>
      </main>

      <footer style={{ textAlign: "center", padding: "6rem", opacity: 0.4, fontSize: "0.75rem", letterSpacing: '1px' }}>
        &copy; 2026 STRATIX INTELLIGENCE &mdash; THE ARCHITECTURAL STANDARD OF AI.
      </footer>
    </div>
  );
}
