"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowLeft, FiLock, FiShield } from "react-icons/fi";

export default function PrivacyPolicy() {
  return (
    <div className="bg-bg text-text-primary min-h-screen font-sans">
      <nav className="px-[5%] py-6 border-b border-accent/10 flex justify-between items-center">
        <Link href="/" className="text-accent no-underline flex items-center gap-2.5 font-bold">
          <FiArrowLeft /> VOLVER AL ECOSISTEMA
        </Link>
        <div className="font-black text-[1.2rem]">
          Strat<span className="text-accent">ix</span> Intelligence
        </div>
      </nav>

      <main className="max-w-[800px] mx-auto px-6 py-20">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-black mb-4">Política de <span className="text-accent">Privacidad</span></h1>
          <p className="opacity-50 mb-12">Protección de datos y ética en IA — Stratix 2026</p>

          <section className="mb-12">
            <div className="flex items-center gap-[15px] mb-6 text-accent">
              <FiLock size={24} />
              <h2 className="text-2xl m-0">Compromiso de Confidencialidad</h2>
            </div>
            <p className="leading-[1.8] opacity-80">
              En **Stratix Intelligence**, la privacidad no es una opción, es la base de nuestra infraestructura. Procesamos información empresarial sensible utilizando los más altos estándares de encriptación y anonimización de datos.
            </p>
          </section>

          <section className="mb-12">
             <h3 className="text-accent mb-4">1. Recolección de Datos Estratégicos</h3>
             <p className="leading-[1.8] opacity-80">
               Recopilamos datos de contacto (nombre, email, empresa) y metadatos de sesión para mejorar la precisión de nuestras respuestas de IA. Estos datos se utilizan exclusivamente para la gestión de leads y soporte técnico dentro de su instancia privada.
             </p>
          </section>

          <section className="mb-12">
             <h3 className="text-accent mb-4">2. Procesamiento Neural y RAG</h3>
             <p className="leading-[1.8] opacity-80">
               Sus documentos y catálogos se transforman en vectores matemáticos (embeddings). Esta información reside en un entorno segregado y se procesa mediante los modelos de infraestructura de **Google (Gemini)** y **OpenAI (GPT-4o)**. Stratix garantiza que sus datos nunca se utilizan para entrenar los modelos base públicos de estas entidades.
             </p>
          </section>

          <section className="mb-12">
             <h3 className="text-accent mb-4">3. Seguridad de Terceros y Transferencia</h3>
             <p className="leading-[1.8] opacity-80">
               Al utilizar servicios de IA de vanguardia, los datos necesarios para generar respuestas se transmiten de forma encriptada a los servidores oficiales de Google Cloud y OpenAI. Estos proveedores cumplen con los estándares internacionales de seguridad (SOC2, ISO 27001).
             </p>
          </section>

          <section className="mb-12">
             <h3 className="text-accent mb-4">4. Derechos del Titular y Eliminación</h3>
             <p className="leading-[1.8] opacity-80">
               Usted mantiene el control total. En cualquier momento puede solicitar la eliminación completa de su base de conocimientos vectorizada. Al eliminar un agente en su Dashboard, todos los vectores asociados son purgados de nuestra base de datos en tiempo real.
             </p>
          </section>

          <div className="p-8 bg-accent/5 rounded-[20px] border border-accent/20 mt-20">
            <div className="flex items-center gap-[15px]">
              <FiShield color="#D4AF37" size={24} />
              <p className="opacity-70 m-0">
                Stratix cumple con los protocolos internacionales de protección de datos, asegurando que su ventaja competitiva se mantenga privada.
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      <footer className="text-center p-16 opacity-30 text-xs">
        &copy; 2026 Stratix Intelligence — Todos los derechos reservados.
      </footer>
    </div>
  );
}
