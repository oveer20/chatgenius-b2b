"use client";

import { motion } from "framer-motion";
import { FiMessageSquare, FiCpu, FiUser } from "react-icons/fi";

export default function DashboardHelpPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="mb-12 rounded-xl border border-accent bg-bg/60 p-8"
    >
      <h3 className="mb-6 font-serif text-2xl text-accent">¿Qué es Stratix Intelligence?</h3>
      <div className="grid gap-6 text-text-secondary">
        {[
          { icon: FiMessageSquare, title: "Agentes IA", desc: "Son asistentes virtuales que hablan con tus clientes 24/7 en WhatsApp, Web o Instagram. Responden preguntas, califican leads y cierran citas." },
          { icon: FiCpu, title: "Multi-Motor IA", desc: "Stratix usa 4 motores de IA: Gemini, GPT-3.5, Groq y Mistral. Si uno falla, otro responde automáticamente." },
          { icon: FiUser, title: "Leads", desc: "Son los contactos que el agente captura. Cada conversación genera un lead con información del cliente." },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-4">
            <item.icon className="mt-1 text-accent" />
            <div>
              <strong className="text-text-primary">{item.title}</strong>
              <p className="mt-1 text-sm">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
