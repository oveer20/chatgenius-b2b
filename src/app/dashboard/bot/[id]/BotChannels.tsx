"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiMessageCircle, FiLayout, FiShield, FiInfo } from "react-icons/fi";
import { BotData } from "./types";

interface BotChannelsProps {
  botData: BotData;
  setBotData: (data: BotData | ((prev: BotData) => BotData)) => void;
  botId: string;
}

export default function BotChannels({ botData, setBotData, botId }: BotChannelsProps) {
  const [showToken, setShowToken] = useState(false);

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
      <h3 className="font-serif text-3xl mb-8">Canales de Despliegue</h3>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-bg/60 border border-emerald-500/20 backdrop-blur-xl rounded-xl p-6">
          <FiMessageCircle size={24} className="text-[#25D366] mb-4" />
          <h4 className="font-semibold text-sm uppercase tracking-wider">WhatsApp API</h4>
          <div className="mt-6">
            <div>
              <label className="text-xs text-text-muted mb-1.5 block">WhatsApp Token</label>
              <div className="flex items-center gap-2">
                <input type={showToken ? 'text' : 'password'} value={botData.whatsappToken} onChange={e => setBotData({...botData, whatsappToken: e.target.value})} className="flex-1 px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm outline-none focus:border-accent/30 transition-all duration-200" />
                <button onClick={() => setShowToken(!showToken)} className="bg-white/5 border border-white/10 rounded-lg p-2.5 cursor-pointer text-text-muted hover:text-accent transition-all duration-200">
                  {showToken ? <FiShield size={14} /> : <FiInfo size={14} />}
                </button>
              </div>
              <p className="text-xs text-text-muted mt-1">{showToken ? 'Ocultar' : 'Mostrar'} token</p>
            </div>
          </div>
        </div>
        <div className="bg-bg/60 border border-accent/20 backdrop-blur-xl rounded-xl p-6">
          <FiLayout size={24} className="text-accent mb-4" />
          <h4 className="font-semibold text-sm uppercase tracking-wider">Widget Web</h4>
          <code className="block bg-white/5 p-4 rounded-lg mt-6 text-xs text-accent">
            {`<script src="/widget.js" data-bot-id="${botId}"></script>`}
          </code>
        </div>
      </div>
    </motion.div>
  );
}
