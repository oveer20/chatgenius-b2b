"use client";

import { useState, useRef, useEffect } from "react";
import { FiSend } from "react-icons/fi";
import { ChatMessage } from "./types";

interface BotConversationsProps {
  chatMessages: ChatMessage[];
  isTyping: boolean;
  onSendMessage: (message: string) => void;
}

export default function BotConversations({ chatMessages, isTyping, onSendMessage }: BotConversationsProps) {
  const [inputMessage, setInputMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    onSendMessage(inputMessage);
    setInputMessage("");
  };

  return (
    <div className="bg-bg flex flex-col border-l border-white/5">
      <div className="px-6 py-4 bg-bg/80 border-b border-white/5 flex justify-between items-center">
        <span className="text-xs font-semibold text-accent">Playground</span>
      </div>
      <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto flex flex-col gap-4">
        {chatMessages.map((msg, i) => (
          <div key={i} className={`${msg.role === "user" ? "self-end bg-accent text-black" : "self-start bg-white/5 text-white"} px-4 py-3 rounded-xl max-w-[85%] text-sm leading-relaxed`}>{msg.content}</div>
        ))}
        {isTyping && <div className="text-xs text-text-muted">Escribiendo...</div>}
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t border-white/5 flex gap-2">
        <input
          value={inputMessage}
          onChange={e => setInputMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm outline-none focus:border-accent/30 transition-all duration-200"
        />
        <button type="submit" className="bg-accent border-none rounded-lg px-4 transition-all duration-200 hover:scale-105">
          <FiSend className="text-black" />
        </button>
      </form>
    </div>
  );
}
