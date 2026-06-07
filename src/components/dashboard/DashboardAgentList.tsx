"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Plus } from "lucide-react";
import OnboardingStepper from "@/components/dashboard/OnboardingStepper";

interface Bot {
  id: string;
  name: string;
  description: string;
  model: string;
  status: string;
  created_at: string;
}

const AI_PROVIDERS: Record<string, { name: string; color: string; badge: string }> = {
  gemini: { name: "Gemini 2.0 Flash", color: "#4285F4", badge: "Principal" },
  gpt: { name: "GPT-3.5 Turbo", color: "#10A37F", badge: "Backup" },
  groq: { name: "Llama 3.1 - Groq", color: "#FF6B35", badge: "GRATIS" },
  mistral: { name: "Mistral Small", color: "#9F7AEA", badge: "GRATIS" },
};

export default function DashboardAgentList({ bots, isLoading }: { bots: Bot[]; isLoading: boolean }) {
  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="font-serif text-2xl font-bold tracking-tighter">Tus Agentes IA</h2>
        <Link
          href="/dashboard/bot/new"
          className="flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-bold text-bg no-underline transition-all duration-200 hover:scale-105"
        >
          <Plus /> Crear agente
        </Link>
      </div>

      <div className="mb-16 grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6">
        {isLoading ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6 col-span-full">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-bg/60 p-8 backdrop-blur-xl animate-pulse">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex-1">
                    <div className="h-5 bg-white/10 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-white/10 rounded w-1/2" />
                  </div>
                  <div className="h-5 w-16 bg-white/10 rounded-full" />
                </div>
                <div className="mb-6 h-8 bg-white/10 rounded w-2/3" />
                <div className="flex gap-3">
                  <div className="flex-1 h-10 bg-white/10 rounded-lg" />
                  <div className="flex-1 h-10 bg-white/10 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : bots.length > 0 ? (
          bots.map((bot) => {
            const aiInfo = AI_PROVIDERS[bot.model] || AI_PROVIDERS.gemini;
            return (
              <motion.div
                key={bot.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-white/10 bg-bg/60 p-8 backdrop-blur-xl transition-all duration-300"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="mb-1 font-serif text-xl">{bot.name}</h3>
                    <p className="text-sm text-text-secondary">{bot.description}</p>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span className="text-xs font-semibold text-emerald-500">Activo</span>
                  </div>
                </div>

                <div className="mb-6 flex items-center gap-2 rounded-lg bg-bg3 px-3 py-2">
                  <div style={{ background: aiInfo.color }} className="h-2 w-2 rounded-full" />
                  <span className="text-xs text-text-secondary">{aiInfo.name}</span>
                  <span
                    className="rounded px-1.5 py-0.5 text-[0.65rem] font-semibold"
                    style={{
                      background: aiInfo.badge === 'GRATIS' ? 'rgba(16,185,129,0.2)' : 'rgba(212,175,55,0.15)',
                      color: aiInfo.badge === 'GRATIS' ? '#10b981' : '#D4AF37',
                    }}
                  >
                    {aiInfo.badge}
                  </span>
                </div>

                <div className="flex gap-3">
                  <Link
                    href={`/dashboard/bot/${bot.id}`}
                    className="flex-1 rounded-lg bg-accent-dim p-3 text-center text-sm font-semibold text-accent no-underline transition-all duration-200 hover:scale-105"
                  >
                    Configurar
                  </Link>
                  <Link
                    href="/widget"
                    target="_blank"
                    className="flex-1 rounded-lg border border-white/10 bg-transparent p-3 text-center text-sm font-semibold text-text-primary no-underline transition-all duration-200 hover:scale-105"
                  >
                    Probar
                  </Link>
                </div>
              </motion.div>
            );
          })
        ) : (
          <OnboardingStepper />
        )}
      </div>
    </>
  );
}
