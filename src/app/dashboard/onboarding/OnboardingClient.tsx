"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useStrings } from "@/lib/useStrings";
import { supabase } from "@/lib/supabase";

const INDUSTRIES = [
  { key: "inmobiliaria", es: "Inmobiliaria", en: "Real Estate", icon: "🏠" },
  { key: "salud", es: "Salud", en: "Healthcare", icon: "🏥" },
  { key: "educacion", es: "Educación", en: "Education", icon: "🎓" },
  { key: "ecommerce", es: "E-commerce", en: "E-commerce", icon: "🛒" },
  { key: "otro", es: "Otro", en: "Other", icon: "💼" },
];

const PURPOSES = [
  { key: "leads", es: "Captar leads", en: "Capture leads", desc_es: "Responde preguntas y captura datos de contacto", desc_en: "Answer questions and capture contact info" },
  { key: "atencion", es: "Atender clientes", en: "Customer support", desc_es: "Resuelve dudas y da soporte 24/7", desc_en: "Answer questions and provide 24/7 support" },
  { key: "calificar", es: "Calificar prospectos", en: "Qualify prospects", desc_es: "Evalúa interés y asigna score automático", desc_en: "Evaluate interest and assign automatic scores" },
  { key: "todo", es: "Todo", en: "Everything", desc_es: "Un agente completo que hace de todo", desc_en: "A complete agent that does it all" },
];

export default function WelcomeWizard() {
  const { s } = useStrings();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [industry, setIndustry] = useState("");
  const [purpose, setPurpose] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateAgent = async () => {
    setLoading(true);
    try {
      const systemPrompt = s(
        `Eres un asistente IA especializado en la industria ${industry}. Tu propósito principal es: ${purpose}. Responde de forma profesional y amable en español.`,
        `You are an AI assistant specialized in ${industry}. Your main purpose is: ${purpose}. Respond professionally and kindly in English.`
      );

      const { data: { user } } = await supabase.auth.getUser();
      const { error } = await supabase.from("bots").insert([{
        name: s(`Agente ${industry}`, `${industry} Agent`),
        description: s(`Agente IA para ${purpose} en ${industry}`, `AI agent for ${purpose} in ${industry}`),
        system_prompt: systemPrompt,
        model: "gemini",
        user_id: user?.id,
        whatsapp_phone_number: whatsapp || null,
        is_active: true,
      }]);

      if (error) throw error;

      localStorage.setItem("stratix_onboarded", "true");
      router.push("/dashboard");
    } catch (err) {
      console.error("Onboarding error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg p-5">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[520px] rounded-3xl border border-accent/20 bg-gradient-to-br from-[#0d1017] to-[#151922] p-[clamp(24px,5vw,40px)] shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
      >
        {/* Step indicators */}
        <div className="mb-8 flex gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                s <= step ? "bg-accent" : "bg-white/10"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="mb-2 font-serif text-2xl text-text-primary">
                {s("¿Cuál es tu industria?", "What's your industry?")}
              </h2>
              <p className="mb-8 text-sm text-text-secondary">
                {s("Esto ayuda a personalizar tu agente IA", "This helps personalize your AI agent")}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {INDUSTRIES.map((ind) => (
                  <button
                    key={ind.key}
                    onClick={() => { setIndustry(ind.key); setStep(2); }}
                    className={`flex items-center gap-3 rounded-xl border p-4 text-left text-sm font-medium transition-all duration-200 ${
                      industry === ind.key
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-white/10 bg-white/5 text-text-primary hover:border-accent/50"
                    }`}
                  >
                    <span className="text-xl">{ind.icon}</span>
                    {s(ind.es, ind.en)}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="mb-2 font-serif text-2xl text-text-primary">
                {s("¿Qué necesitas automatizar?", "What do you need to automate?")}
              </h2>
              <p className="mb-8 text-sm text-text-secondary">
                {s("Elige el propósito principal de tu agente", "Choose your agent's main purpose")}
              </p>
              <div className="flex flex-col gap-3">
                {PURPOSES.map((p) => (
                  <button
                    key={p.key}
                    onClick={() => { setPurpose(p.key); setStep(3); }}
                    className={`rounded-xl border p-4 text-left transition-all duration-200 ${
                      purpose === p.key
                        ? "border-accent bg-accent/10"
                        : "border-white/10 bg-white/5 hover:border-accent/50"
                    }`}
                  >
                    <div className="font-medium text-text-primary">{s(p.es, p.en)}</div>
                    <div className="mt-0.5 text-xs text-text-secondary">{s(p.desc_es, p.desc_en)}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="mb-2 font-serif text-2xl text-text-primary">
                {s("Conecta tu WhatsApp", "Connect your WhatsApp")}
              </h2>
              <p className="mb-8 text-sm text-text-secondary">
                {s("Opcional — puedes configurarlo después", "Optional — you can set it up later")}
              </p>
              <input
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder={s("+57 300 000 0000", "+1 555 000 0000")}
                className="mb-6 w-full rounded-xl border border-white/15 bg-white/5 px-[18px] py-[14px] text-[15px] text-text-primary outline-none transition-colors duration-200 focus:border-accent"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 py-[14px] text-sm font-medium text-text-primary transition-all duration-200 hover:bg-white/10"
                >
                  {s("Atrás", "Back")}
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="flex-1 rounded-xl bg-accent py-[14px] text-sm font-semibold text-[#030a05] transition-all duration-200 hover:bg-accent/90"
                >
                  {s("Continuar", "Continue")}
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-accent to-[#B8860B] text-4xl">
                🚀
              </div>
              <h2 className="mb-2 font-serif text-2xl text-text-primary">
                {s("¡Tu agente IA está activo!", "Your AI agent is live!")}
              </h2>
              <p className="mb-8 text-sm text-text-secondary">
                {s(
                  "Recibirás tus primeros leads en minutos. Mientras tanto, explora el dashboard.",
                  "You'll receive your first leads in minutes. In the meantime, explore the dashboard."
                )}
              </p>
              <button
                onClick={handleCreateAgent}
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-br from-accent to-[#E5C555] py-[14px] text-sm font-bold text-[#030a05] shadow-[0_4px_20px_rgba(212,175,55,0.4)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(212,175,55,0.5)] disabled:opacity-50"
              >
                {loading
                  ? s("Creando agente...", "Creating agent...")
                  : s("Ir al Dashboard →", "Go to Dashboard →")}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
