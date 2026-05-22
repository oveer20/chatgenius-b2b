"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/components/LangContext";

export default function ContactForm() {
  const { lang } = useLang();
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "landing_contact" }),
      });
      setStatus('success');
      setForm({ name: "", email: "", company: "", message: "" });
    } catch {
      setStatus('error');
    }
  };

  const labels = {
    name: lang === "es" ? "Tu nombre" : "Your name",
    email: lang === "es" ? "Tu email" : "Your email",
    company: lang === "es" ? "Empresa" : "Company",
    message: lang === "es" ? "¿En qué te ayudamos?" : "How can we help?",
    submit: lang === "es" ? "Enviar mensaje" : "Send message",
    success: lang === "es" ? "¡Mensaje enviado! Te contactamos en <4h" : "Message sent! We'll contact you in <4h",
    error: lang === "es" ? "Error. Intenta por WhatsApp." : "Error. Try via WhatsApp.",
    title: lang === "es" ? "¿Listo para automatizar?" : "Ready to automate?",
    subtitle: lang === "es" ? "Cuéntanos de tu negocio y te diseñamos un plan personalizado." : "Tell us about your business and we'll design a personalized plan.",
  };

  return (
    <section id="contacto" className="relative mx-auto max-w-[700px] px-[clamp(1.5rem,5vw,4rem)] py-[clamp(4rem,10vw,6rem)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,0.06)_0%,transparent_60%)]" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative mb-12 text-center"
      >
        <h2 className="mb-3 font-serif text-[clamp(2rem,5vw,3rem)] text-text-primary">
          {labels.title}
        </h2>
        <p className="text-base text-text-secondary">{labels.subtitle}</p>
      </motion.div>

      {status === 'success' ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl border border-[rgba(16,185,129,0.3)] bg-[rgba(16,185,129,0.1)] p-12 text-center"
        >
          <div className="mb-4 text-5xl">✅</div>
          <p className="text-base font-semibold text-[#10b981]">{labels.success}</p>
        </motion.div>
      ) : (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="relative flex flex-col gap-6 rounded-2xl border border-white/5 bg-bg3/60 p-[clamp(2rem,5vw,3rem)] backdrop-blur-xl"
        >
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[1px] text-text-muted">{labels.name}</label>
              <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full rounded-xl border border-white/5 bg-black/30 px-4 py-3.5 text-[15px] text-text-primary outline-none" />
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[1px] text-text-muted">{labels.email}</label>
              <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full rounded-xl border border-white/5 bg-black/30 px-4 py-3.5 text-[15px] text-text-primary outline-none" />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-[1px] text-text-muted">{labels.company}</label>
            <input value={form.company} onChange={e => setForm({...form, company: e.target.value})} className="w-full rounded-xl border border-white/5 bg-black/30 px-4 py-3.5 text-[15px] text-text-primary outline-none" />
          </div>
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-[1px] text-text-muted">{labels.message}</label>
            <textarea required rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="min-h-[100px] w-full resize-y rounded-xl border border-white/5 bg-black/30 px-4 py-3.5 text-[15px] text-text-primary outline-none" />
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="submit" disabled={status === 'loading'} className={`flex-1 rounded-xl bg-accent px-4 py-[15px] text-[15px] font-bold text-black border-none transition-all duration-300 ${status === 'loading' ? 'cursor-wait opacity-70' : 'cursor-pointer opacity-100'}`}>
              {status === 'loading' ? (lang === "es" ? "Enviando..." : "Sending...") : labels.submit}
            </button>
            <a href="https://wa.me/573159269287" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-xl border border-[rgba(37,211,102,0.3)] bg-[rgba(37,211,102,0.1)] px-5 py-[15px] text-sm font-bold text-[#25D366] no-underline">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.617-2.030-.617-.77.001-3.855.293-6.162 1.393C6.963 17.5 6 18.463 6 19.453v1.034c0 .768.488 1.47 1.156 1.953l.73 1.297c.178.316.527.5.902.5l2.35-.001c.5 0 .973-.254 1.201-.643l2.156-3.373m3.81-.386s1.39-.715 1.912-.797c.523-.082 1.023-.126 1.153-.053.128.073.2.477.5 1.406.3.929.522 1.656.56 1.876.037.22.026.668-.202 1.174-.229.506-.673.82-.924.895-.25.075-1.146.108-3.047-.41m-3.633.803c.53.003 1.14.037 1.74.138.6.1.92.08 1.19.035.272-.045.73-.25 1.12-.81.39-.558.59-1.23.59-1.79 0-.563-.204-1.1-.566-1.56l-1.063.002m-3.976-.2s.39-.15.67-.24c.28-.09.62-.04.85.29.22.33.37.73.37 1.13 0 .4-.15.8-.37 1.13-.24.33-.57.38-.85.29-.28-.09-.67-.24-.67-.24s-.76-.3-1.26-.3c-.5 0-.93.14-1.24.3-.31.16-.59.18-.82.1-.23-.08-.59-.22-.88-.45-.29-.23-.56-.58-.56-1.07 0-.49.27-.84.56-1.07.3-.23.6-.37.88-.45.28-.08.57-.07.82.1.25.17.66.33.98.4.33.07.63.1.89.09z"/></svg>
              WhatsApp
            </a>
          </div>
          {status === 'error' && (
            <p className="text-center text-[13px] text-red-400">{labels.error}</p>
          )}
        </motion.form>
      )}
    </section>
  );
}
