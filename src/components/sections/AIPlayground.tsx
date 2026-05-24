"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/components/LangContext";

export default function AIPlayground() {
  const { t } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/widget/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, botId: "demo" }),
      });

      const data = await res.json();
      setMessages(prev => [...prev, { role: "ai", text: data.response || t.aiPlayground.fallback }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: "ai", text: t.aiPlayground.errorFallback }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-transparent border border-white/20 text-text-primary text-sm font-semibold cursor-pointer transition-all duration-200 font-sans hover:bg-white/5"
      >
        {t.aiPlayground.openBtn}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-xl flex items-center justify-center p-5"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[450px] h-[600px] bg-bg border border-accent/30 rounded-2xl flex flex-col overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
            >
              <div className="p-5 border-b border-white/10 flex justify-between items-center">
                <div>
                  <h3 className="text-accent m-0 text-base font-bold font-sans">{t.aiPlayground.header}</h3>
                  <p className="text-[#27C93F] m-0 text-xs font-sans">{t.aiPlayground.status}</p>
                </div>
                <button onClick={() => setIsOpen(false)} className="bg-transparent border-none text-text-secondary text-2xl cursor-pointer">x</button>
              </div>

              <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-3">
                {messages.length === 0 && (
                  <div className="text-center text-text-muted text-xs mt-10 font-sans">
                    {t.aiPlayground.welcome}
                  </div>
                )}
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`px-3.5 py-2.5 rounded-xl max-w-[80%] text-sm leading-[1.4] font-sans text-text-primary ${msg.role === "user" ? "bg-accent/15 border border-accent/20" : "bg-white/5 border border-white/5"}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-1 p-2.5 bg-white/5 rounded-xl w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-text-secondary animate-bounce-dot" />
                    <span className="w-1.5 h-1.5 rounded-full bg-text-secondary animate-bounce-dot animation-delay-200" />
                    <span className="w-1.5 h-1.5 rounded-full bg-text-secondary animate-bounce-dot animation-delay-400" />
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-white/10 flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder={t.aiPlayground.placeholder}
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white outline-none font-sans"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isTyping}
                  className={`rounded-lg px-4 font-semibold font-sans transition-colors ${input.trim() ? "bg-accent text-black cursor-pointer" : "bg-white/5 text-text-secondary cursor-not-allowed"}`}
                >
                  →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
        .animate-bounce-dot {
          animation: bounce 1.4s infinite;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </>
  );
}
