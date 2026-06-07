"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useStrings } from "@/lib/useStrings";

interface Msg {
  role: "user" | "bot";
  text: string;
}

const KNOWLEDGE = `
Stratix Intelligence es una plataforma de automatización de ventas con IA.
Planes: Starter ($49 USD/mes, 1 agente), Growth ($199 USD/mes, 3 agentes), Enterprise ($499 USD/mes, agentes ilimitados).
Características: Respuesta automática 24/7 en WhatsApp, Instagram y Web. Scoring automático de leads (Hot/Warm/Cold). Integración con Mercado Pago. Dashboard en tiempo real. Configuración en 15 minutos sin código.
Garantía: 7 días gratis y devolución del 100% en 30 días.
No se requiere tarjeta de crédito para comenzar.
`;

const SYSTEM_PROMPT = `
Eres un asesor de ventas experto de Stratix Intelligence, una plataforma B2B de automatización de ventas con IA.
TU TONO: Profesional, cálido, ejecutivo y resolutivo. Siempre en español.
TU IDIOMA: Responde siempre en el idioma que use el usuario.
REGLAS:
1. Sé conciso - máximo 2-3 oraciones por respuesta
2. Habla de beneficios concretos (leads, ventas, tiempo)
3. Si preguntan por precio, menciona los planes y los 7 días gratis
4. Siempre invita a agendar una demo si hay interés
5. Nunca menciones que eres una IA
6. Clasifica la intención: si quiere comprar/agendar = HOT, si pregunta detalles = WARM, si solo curiosea = COLD
`;

export default function InteractiveDemo() {
  const { s, lang } = useStrings();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isStarted = messages.length > 0;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    const userMsg: Msg = { role: "user", text };
    const history = messages.map(m => ({ role: m.role, content: m.text }));
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...history, { role: "user", content: text }],
          systemPrompt: SYSTEM_PROMPT,
          knowledgeBase: KNOWLEDGE,
          model: "gemini",
          botId: "demo",
        }),
      });
      const data = await response.json();
      const reply = data.message?.content || data.message?.text || s(
        "Gracias por tu mensaje. Para darte la mejor información, ¿me puedes contar más sobre tu negocio?",
        "Thanks for your message. To give you the best information, can you tell me more about your business?");
      setMessages(prev => [...prev, { role: "bot", text: reply }]);
    } catch {
      const fallback = s("Gracias por tu mensaje. ¿Te gustaría agendar una demo personalizada?", "Thanks for your message. Would you like to schedule a personalized demo?");
      setMessages(prev => [...prev, { role: "bot", text: fallback }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input.trim());
  };

  const startDemo = () => {
    const intro = s("¡Hola! 👋 Soy tu asesor virtual de Stratix. Cuéntame, ¿en qué tipo de negocio estás?", "Hi! 👋 I'm your Stratix virtual advisor. Tell me, what type of business are you in?");
    setMessages([{ role: "bot", text: intro }]);
  };

  const title = s("Prueba el demo en vivo", "Try the live demo");
  const subtitle = s("Conversa con nuestra IA. Sin registro. Sin tarjeta. Solo escribe.", "Chat with our AI. No signup. No card. Just type.");

  return (
    <section className="relative mx-auto max-w-[700px] px-[clamp(1.5rem,5vw,4rem)] py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(212,175,55,0.06)_0%,transparent_60%)]" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative mb-8 text-center"
      >
        <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tighter text-text-primary mb-3">
          {title}
        </h2>
        <p className="text-text-secondary text-base">{subtitle}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-2xl border border-accent/10 bg-bg4/90 backdrop-blur-xl"
      >
        <div className="flex items-center gap-2.5 border-b border-white/5 bg-white/[0.02] px-[18px] py-3.5">
          <div className="flex gap-1">
            <div className="size-2.5 rounded-full bg-[#ff5f57]" />
            <div className="size-2.5 rounded-full bg-[#febc2e]" />
            <div className="size-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="font-mono text-[11px] tracking-[1px] text-accent">
            STRATIX AI · DEMO
          </span>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="size-1.5 rounded-full bg-success shadow-[0_0_6px_#10b981]" />
            <span className="font-mono text-[10px] text-success">ONLINE</span>
          </div>
        </div>

        <div ref={scrollRef} className="flex min-h-[300px] max-h-[380px] flex-col gap-3.5 overflow-y-auto p-5">
          {!isStarted ? (
            <div className="flex h-[260px] flex-col items-center justify-center gap-5">
              <div className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent2 text-[28px] shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                🤖
              </div>
              <div className="text-center">
                <h3 className="mb-1.5 font-serif text-[1.3rem] text-text-primary">
                  {s("Asistente IA Demo", "AI Assistant Demo")}
                </h3>
                <p className="text-[13px] text-text-secondary">
                  {s("IA real · Respuestas en segundos", "Real AI · Responses in seconds")}
                </p>
              </div>
              <button onClick={startDemo} className="cursor-pointer rounded-xl bg-accent px-8 py-3 text-sm font-bold text-black shadow-accent-glow-strong">
                {s("Iniciar chat", "Start chat")}
              </button>
            </div>
          ) : (
            <>
              {messages.map((msg, i) => (
                <div key={i} className={`flex items-start gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  {msg.role === "bot" && (
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent2 text-xs">
                      🤖
                    </div>
                  )}
                  <div className={`max-w-[75%] rounded-[14px] px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-accent text-black shadow-[0_4px_15px_rgba(212,175,55,0.3)]"
                      : "border border-accent/10 bg-bg/80 backdrop-blur-lg text-text-primary"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-2.5">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent2 text-xs">
                    🤖
                  </div>
                  <div className="flex gap-1 rounded-[14px] border border-accent/10 bg-white/5 px-3.5 py-2.5">
                    {[0,1,2].map(i => (
                      <span key={i} className="size-1.5 rounded-full bg-accent" style={{ animation: `typing-bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {isStarted && (
          <form onSubmit={handleSubmit} className="flex gap-2.5 border-t border-white/5 bg-white/[0.02] px-[18px] py-3.5">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={s("Escribe tu mensaje...", "Type your message...")}
              disabled={isTyping}
              className="flex-1 rounded-xl border border-white/5 bg-black/30 px-3.5 py-2.5 text-sm text-text-primary outline-none"
            />
            <button type="submit" aria-label={s("Enviar mensaje", "Send message")} disabled={!input.trim() || isTyping} className={`rounded-xl bg-accent px-4 py-2.5 font-bold text-black border-none ${input.trim() ? "cursor-pointer opacity-100" : "cursor-default opacity-50"}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
              </svg>
            </button>
          </form>
        )}
      </motion.div>

      {!isStarted && (
        <div className="mt-6 text-center">
          <a href="/login" className="text-sm text-text-secondary no-underline">
            {s("¿Listo para el dashboard completo? ", "Ready for the full dashboard? ")}
            <span className="font-semibold text-accent">{s("Crea tu cuenta gratis →", "Create free account →")}</span>
          </a>
        </div>
      )}

      <style>{`@keyframes typing-bounce { 0%, 60%, 100% { transform: translateY(0); opacity: 0.4; } 30% { transform: translateY(-5px); opacity: 1; } }`}</style>
    </section>
  );
}
