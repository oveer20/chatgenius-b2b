"use client";

import { motion } from "framer-motion";
import { Globe, Plus, Activity } from "lucide-react";

interface BotKnowledgeBaseProps {
  knowledgeBase: string;
  setKnowledgeBase: (v: string) => void;
  isSyncing: boolean;
  handleSyncKnowledge: () => void;
  crawlerUrl: string;
  setCrawlerUrl: (v: string) => void;
  isCrawling: boolean;
  handleCrawlUrl: () => void;
  isUploading: boolean;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function BotKnowledgeBase({
  knowledgeBase, setKnowledgeBase, isSyncing, handleSyncKnowledge,
  crawlerUrl, setCrawlerUrl, isCrawling, handleCrawlUrl,
  isUploading, handleFileUpload
}: BotKnowledgeBaseProps) {
  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
      <div className="flex justify-between items-center mb-12">
        <h3 className="font-serif text-3xl">Base de Conocimiento</h3>
        <button onClick={handleSyncKnowledge} className="py-2.5 px-5 bg-accent text-black rounded-xl font-bold text-sm border-none transition-all duration-200 hover:scale-105">
          {isSyncing ? "Procesando..." : "Sincronizar"}
        </button>
      </div>

      <div className="bg-bg/60 border border-white/10 backdrop-blur-xl rounded-xl p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="text-accent" />
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Progreso del Conocimiento</span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div className={`h-full bg-accent transition-all duration-500 ${knowledgeBase ? 'w-full' : 'w-[15%]'}`} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-bg/60 border border-white/10 backdrop-blur-xl rounded-xl p-6">
          <label className="block text-xs font-semibold text-text-muted mb-3 uppercase tracking-wider">URL para Escanear</label>
          <div className="flex gap-2">
            <input value={crawlerUrl} onChange={e => setCrawlerUrl(e.target.value)} placeholder="https://ejemplo.com" className="flex-1 px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm outline-none focus:border-accent/30 transition-all duration-200" />
            <button onClick={handleCrawlUrl} disabled={isCrawling} className="bg-accent border-none rounded-lg px-4 text-sm font-semibold text-black disabled:opacity-50 transition-all duration-200 hover:scale-105">
              {isCrawling ? "..." : <Globe />}
            </button>
          </div>
        </div>
        <div className="bg-bg/60 border border-white/10 backdrop-blur-xl rounded-xl p-6 flex items-center justify-center">
          <label className="cursor-pointer text-accent font-semibold text-sm disabled:opacity-50 transition-all duration-200 hover:scale-105">
            {isUploading ? "Subiendo..." : <><Plus className="inline mr-1" /> Subir PDF</>}
            <input type="file" onChange={handleFileUpload} className="hidden" disabled={isUploading} />
          </label>
        </div>
      </div>

      <div className="bg-bg/60 border border-white/10 backdrop-blur-xl rounded-xl p-6">
        <textarea
          value={knowledgeBase}
          onChange={e => setKnowledgeBase(e.target.value)}
          className="w-full min-h-[300px] bg-transparent border-none text-white outline-none text-base leading-relaxed resize-none"
          placeholder="Escribe o pega aquí el conocimiento de tu agente..."
        />
      </div>
    </motion.div>
  );
}
