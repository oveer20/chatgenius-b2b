"use client";

import { useRouter } from "next/navigation";
import { RefreshCw, Zap, Star, Cpu, Database, ArrowLeft, Save, Code } from "lucide-react";
import { TabId } from "./types";

interface BotHeaderProps {
  botName: string;
  botId: string;
  botStatus: 'active' | 'inactive' | 'loading';
  isTogglingStatus: boolean;
  isSaving: boolean;
  activeTab: TabId;
  onToggleStatus: () => void;
  onSave: () => void;
  onTabChange: (tab: TabId) => void;
}

export default function BotHeader({
  botName, botId, botStatus, isTogglingStatus, isSaving,
  activeTab, onToggleStatus, onSave, onTabChange
}: BotHeaderProps) {
  const router = useRouter();

  return (
    <>
      <div className="bg-white/3 border-b border-white/5 px-8 py-2 flex items-center gap-6 text-xs text-text-muted">
        <span className="flex items-center gap-1.5 text-accent font-semibold"><Zap /> Núcleo Activo</span>
        <span>Opal Logic: <span className="text-emerald-500 font-semibold">Estable</span></span>
        <span className="ml-auto">Latencia: <span className="text-emerald-500 font-semibold">18ms</span></span>
      </div>

      <header className="px-8 py-4 flex justify-between items-center bg-bg/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push("/dashboard")} className="bg-white/5 border border-white/10 text-text-primary p-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-white/10">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h2 className="font-serif text-2xl">{botName}</h2>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-accent font-semibold bg-accent-dim px-2 py-0.5 rounded">ID: {botId?.toString().slice(0, 8)}</span>
              <button
                onClick={onToggleStatus}
                disabled={isTogglingStatus || botStatus === 'loading'}
                className={`flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded border-none cursor-pointer transition-all duration-200 ${
                  botStatus === 'active'
                    ? 'bg-emerald-500/10 text-emerald-500'
                    : 'bg-red-500/10 text-red-500'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current inline-block" />
                {botStatus === 'loading' ? '...' : botStatus === 'active' ? 'Activo' : 'Inactivo'}
                {isTogglingStatus ? '...' : ''}
              </button>
            </div>
          </div>
        </div>
        <button
          onClick={onSave}
          className="py-2.5 px-5 bg-accent text-black rounded-xl font-bold text-sm flex items-center gap-2 border-none cursor-pointer transition-all duration-200 hover:scale-105"
        >
          {isSaving ? <RefreshCw className="animate-spin" /> : <Save />}
          {isSaving ? "Guardando..." : "Guardar"}
        </button>
      </header>

      <div className="bg-bg/50 flex gap-8 px-8 border-b border-white/5 overflow-x-auto">
        {[
          { id: 'identidad' as TabId, label: 'Identidad', icon: <Star /> },
          { id: 'cerebro' as TabId, label: 'Cerebro IA', icon: <Cpu /> },
          { id: 'entrenamiento' as TabId, label: 'Conocimiento', icon: <Database /> },
          { id: 'despliegue' as TabId, label: 'Canales', icon: <Code /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`py-4 bg-none border-none text-xs font-semibold cursor-pointer flex items-center gap-2 transition-all duration-200 border-b-2 ${
              activeTab === tab.id
                ? 'text-accent border-b-accent'
                : 'text-text-muted border-b-transparent hover:text-text-primary'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>
    </>
  );
}
