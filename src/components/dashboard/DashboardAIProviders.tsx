"use client";

import { motion } from "framer-motion";

const AI_PROVIDERS: Record<string, { name: string; color: string; badge: string }> = {
  gemini: { name: "Gemini 2.0 Flash", color: "#4285F4", badge: "Principal" },
  gpt: { name: "GPT-3.5 Turbo", color: "#10A37F", badge: "Backup" },
  groq: { name: "Llama 3.1 - Groq", color: "#FF6B35", badge: "GRATIS" },
  mistral: { name: "Mistral Small", color: "#9F7AEA", badge: "GRATIS" },
};

export default function DashboardAIProviders() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="rounded-xl border border-white/10 bg-bg/60 backdrop-blur-xl p-8"
    >
      <h3 className="mb-6 font-serif text-[1.3rem] text-accent">Motores de IA Disponibles</h3>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        {Object.entries(AI_PROVIDERS).map(([key, info]) => (
          <div key={key} className="flex items-center gap-2 rounded-sm bg-bg3 p-3">
            <div style={{ background: info.color }} className="h-2.5 w-2.5 rounded-full" />
            <div>
              <div className="text-sm font-semibold">{info.name}</div>
              <div className="text-[0.7rem] text-text-secondary">{info.badge}</div>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-text-secondary">
        Cuando crees un agente, podrás elegir qué motor de IA usar. Todos incluyen failover automático.
      </p>
    </motion.div>
  );
}
