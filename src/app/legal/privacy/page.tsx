"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowLeft, FiLock, FiShield, FiDatabase } from "react-icons/fi";

export default function PrivacyPolicy() {
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
          <h1 style={{ fontSize: "3rem", fontWeight: 900, marginBottom: "1rem" }}>Política de <span style={{ color: "#D4AF37" }}>Privacidad</span></h1>
          <p style={{ opacity: 0.5, marginBottom: "3rem" }}>Protección de datos y ética en IA — Stratix 2026</p>

          <section style={{ marginBottom: "3rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "1.5rem", color: "#D4AF37" }}>
              <FiLock size={24} />
              <h2 style={{ fontSize: "1.5rem", margin: 0 }}>Compromiso de Confidencialidad</h2>
            </div>
            <p style={{ lineHeight: 1.8, opacity: 0.8 }}>
              En **Stratix Intelligence**, la privacidad no es una opción, es la base de nuestra infraestructura. Procesamos información empresarial sensible utilizando los más altos estándares de encriptación y anonimización de datos.
            </p>
          </section>

          <section style={{ marginBottom: "3rem" }}>
             <h3 style={{ color: "#D4AF37", marginBottom: "1rem" }}>1. Recolección de Datos Estratégicos</h3>
             <p style={{ lineHeight: 1.8, opacity: 0.8 }}>
               Recopilamos datos de contacto (nombre, email, empresa) y metadatos de sesión para mejorar la precisión de nuestras respuestas de IA. Estos datos se utilizan exclusivamente para la gestión de leads y soporte técnico dentro de su instancia privada.
             </p>
          </section>

          <section style={{ marginBottom: "3rem" }}>
             <h3 style={{ color: "#D4AF37", marginBottom: "1rem" }}>2. Procesamiento Neural y RAG</h3>
             <p style={{ lineHeight: 1.8, opacity: 0.8 }}>
               Sus documentos y catálogos se transforman en vectores matemáticos (embeddings). Esta información reside en un entorno segregado y se procesa mediante los modelos de infraestructura de **Google (Gemini)** y **OpenAI (GPT-4o)**. Stratix garantiza que sus datos nunca se utilizan para entrenar los modelos base públicos de estas entidades.
             </p>
          </section>

          <section style={{ marginBottom: "3rem" }}>
             <h3 style={{ color: "#D4AF37", marginBottom: "1rem" }}>3. Seguridad de Terceros y Transferencia</h3>
             <p style={{ lineHeight: 1.8, opacity: 0.8 }}>
               Al utilizar servicios de IA de vanguardia, los datos necesarios para generar respuestas se transmiten de forma encriptada a los servidores oficiales de Google Cloud y OpenAI. Estos proveedores cumplen con los estándares internacionales de seguridad (SOC2, ISO 27001).
             </p>
          </section>

          <section style={{ marginBottom: "3rem" }}>
             <h3 style={{ color: "#D4AF37", marginBottom: "1rem" }}>4. Derechos del Titular y Eliminación</h3>
             <p style={{ lineHeight: 1.8, opacity: 0.8 }}>
               Usted mantiene el control total. En cualquier momento puede solicitar la eliminación completa de su base de conocimientos vectorizada. Al eliminar un agente en su Dashboard, todos los vectores asociados son purgados de nuestra base de datos en tiempo real.
             </p>
          </section>

          <div style={{ padding: "2rem", background: "rgba(212,175,55,0.05)", borderRadius: "20px", border: "1px solid rgba(212,175,55,0.2)", marginTop: "5rem" }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <FiShield color="#D4AF37" size={24} />
              <p style={{ opacity: 0.7, margin: 0 }}>
                Stratix cumple con los protocolos internacionales de protección de datos, asegurando que su ventaja competitiva se mantenga privada.
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
