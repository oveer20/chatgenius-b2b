"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowLeft, FiShield, FiLock, FiEye } from "react-icons/fi";

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
          <p style={{ opacity: 0.5, marginBottom: "3rem" }}>Última actualización: 31 de marzo, 2026</p>

          <section style={{ marginBottom: "3rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "1.5rem", color: "#D4AF37" }}>
              <FiShield size={24} />
              <h2 style={{ fontSize: "1.5rem", margin: 0 }}>Compromiso con la Data de Élite</h2>
            </div>
            <p style={{ lineHeight: 1.8, opacity: 0.8 }}>
              En Stratix Intelligence, entendemos que la data es el activo más valioso de su empresa. Nuestra infraestructura está diseñada bajo el principio de "Privacidad por Diseño", asegurando que cada interacción de sus bots y cada lead capturado esté protegido por protocolos de encriptación de grado bancario (AES-256).
            </p>
          </section>

          <section style={{ marginBottom: "3rem" }}>
             <h3 style={{ color: "#D4AF37", marginBottom: "1rem" }}>1. Recolección de Información Estratégica</h3>
             <p style={{ lineHeight: 1.8, opacity: 0.8 }}>
               Recolectamos únicamente la información necesaria para optimizar sus procesos de venta y soporte:
             </p>
             <ul style={{ paddingLeft: "1.5rem", opacity: 0.8, lineHeight: 2 }}>
               <li>Datos de contacto de leads (Nombre, Email, WhatsApp).</li>
               <li>Historial de conversaciones para entrenamiento de modelos RAG.</li>
               <li>Métricas de rendimiento de sus Agentes Inteligentes.</li>
             </ul>
          </section>

          <section style={{ marginBottom: "3rem" }}>
             <h3 style={{ color: "#D4AF37", marginBottom: "1rem" }}>2. Uso de Inteligencia Artificial</h3>
             <p style={{ lineHeight: 1.8, opacity: 0.8 }}>
               Su conocimiento empresarial (PDFs, URLs, Manuales) se utiliza exclusivamente para alimentar el motor de inferencia de sus propios bots. **Nunca** compartimos ni utilizamos su data para entrenar modelos globales o de terceros. Su ventaja competitiva permanece privada.
             </p>
          </section>

          <section style={{ marginBottom: "3rem" }}>
             <h3 style={{ color: "#D4AF37", marginBottom: "1rem" }}>3. Seguridad y Almacenamiento</h3>
             <p style={{ lineHeight: 1.8, opacity: 0.8 }}>
               Utilizamos infraestructura Zero-Trust. Sus datos residen en servidores de alto rendimiento con monitoreo 24/7 y respaldos automáticos, garantizando un 99.9% de disponibilidad operativa.
             </p>
          </section>

          <div style={{ padding: "2rem", background: "rgba(212,175,55,0.05)", borderRadius: "20px", border: "1px solid rgba(212,175,55,0.2)", marginTop: "5rem" }}>
            <p style={{ textAlign: "center", fontStyle: "italic", opacity: 0.7 }}>
              ¿Necesita una auditoría de sus datos? Contacte a nuestro Oficial de Privacidad en <span style={{ color: "#D4AF37" }}>legal@stratixintelligence.com</span>
            </p>
          </div>
        </motion.div>
      </main>

      <footer style={{ textAlign: "center", padding: "4rem", opacity: 0.3, fontSize: "0.8rem" }}>
        &copy; 2026 Stratix Intelligence — Todos los derechos reservados.
      </footer>
    </div>
  );
}
