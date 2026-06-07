"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, ArrowLeft, FileText, CheckCircle } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function TermsOfService() {
  return (
    <div className="bg-bg text-text-primary min-h-screen font-sans">
      <div className="fixed top-0 right-0 w-[40%] h-[40%] pointer-events-none bg-[radial-gradient(circle_at_100%_0%,rgba(212,175,55,0.05)_0%,transparent_70%)]" />

      <nav className="px-[5%] py-6 border-b border-accent/10 flex justify-between items-center relative z-10 backdrop-blur-xl bg-bg/80">
        <Link href="/" className="text-accent no-underline flex items-center gap-2.5 font-extrabold text-sm tracking-[1px]">
          <ArrowLeft /> VOLVER AL ECOSISTEMA
        </Link>
        <div className="font-black text-[1.4rem] tracking-[-0.02em]">
          Strat<span className="text-accent">ix</span> Intelligence
        </div>
      </nav>

      <main className="max-w-[850px] mx-auto px-6 py-24 relative z-5">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
          <div className="mb-16 text-center">
            <h1 className="text-6xl font-black leading-[1.1] mb-6">Términos de <span className="text-accent">Servicio</span></h1>
            <p className="opacity-50 text-sm tracking-[2px] font-bold">VERSIÓN CORPORATIVA V45.0 — ACTUALIZADO 2026</p>
          </div>

          <div className="grid gap-14">

            <section>
              <div className="flex items-center gap-[15px] mb-6 text-accent">
                <Shield size={22} />
                <h2 className="text-[1.8rem] font-extrabold m-0 tracking-[-0.01em]">1. Estatus del Acuerdo</h2>
              </div>
              <p className="leading-[1.9] opacity-80 text-[1.05rem]">
                Al acceder a la infraestructura de de Stratix Intelligence, usted (el "Cliente") acepta este contrato vinculante de servicios tecnológicos. Stratix es una plataforma diseñada para la optimización comercial de alto nivel; cualquier uso para difamación, spam o actividades ilícitas resultará en la terminación inmediata del servicio sin reembolso.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-[15px] mb-6 text-accent">
                <FileText size={22} />
                <h2 className="text-[1.8rem] font-extrabold m-0">2. Licencia y Uso de RAG</h2>
              </div>
              <p className="leading-[1.9] opacity-80 text-[1.05rem]">
                El Cliente es el único responsable por el contenido inyectado en el motor de conocimiento (RAG). Stratix garantiza el procesamiento seguro de estos datos pero no se hará responsable por alucinaciones derivadas de manuales incompletos o documentos con errores de origen. Usted garantiza tener los derechos sobre toda la documentación cargada.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-[15px] mb-6 text-accent">
                <CheckCircle size={22} />
                <h2 className="text-[1.8rem] font-extrabold m-0">3. Planes Enterprise y Facturación</h2>
              </div>
              <p className="leading-[1.9] opacity-80 text-[1.05rem]">
                El acceso a las capas Professional Pro y Enterprise Elite está sujeto a pagos recurrentes procesados a través de aliados certificados. Debido a la naturaleza de los modelos de IA de alta computación, los créditos consumidos son definitivos y no sujetos a reembolso total una vez que el agente ha operado durante el primer ciclo de 24 horas.
              </p>
            </section>

          </div>

          <div className="p-10 bg-[linear-gradient(135deg,rgba(212,175,55,0.08)_0%,rgba(6,11,20,0.5)_100%)] rounded-3xl border border-accent/25 mt-24 text-center">
            <p className="opacity-80 m-0 text-base leading-[1.6]">
              Su confianza es nuestro activo más valioso. Si tiene dudas sobre la implementación legal de Stratix en su jurisdicción, le instamos a consultar con su departamento jurídico.
            </p>
          </div>
        </motion.div>
      </main>

      <footer className="text-center p-24 opacity-40 text-xs tracking-[1px]">
        &copy; 2026 STRATIX INTELLIGENCE &mdash; THE ARCHITECTURAL STANDARD OF AI.
      </footer>
    </div>
  );
}
