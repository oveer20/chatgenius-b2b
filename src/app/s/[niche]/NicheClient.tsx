"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NicheClient({ data, niche }: { data: any; niche: string }) {
  return (
    <div className="bg-bg text-text-primary min-h-screen">
      <nav className="px-[5%] py-5 flex justify-between items-center border-b border-white/5">
        <Link href="/" className="font-bold text-lg text-accent no-underline">Stratix</Link>
        <Link href="/login" className="text-text-secondary no-underline">Volver al inicio</Link>
      </nav>

      <section className="px-[5%] py-[clamp(4rem,10vw,8rem)] text-center max-w-[800px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-[64px] mb-6">
          {data.icon}
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-[clamp(2.5rem,5vw,4rem)] font-extrabold mb-6 leading-[1.1]">
          La IA que domina el sector <span className="text-accent">{niche}</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-lg text-text-secondary mb-10 leading-[1.6]">
          {data.desc}
        </motion.p>
        <motion.a href="/login" whileHover={{ scale: 1.05 }} className="inline-block bg-accent text-black px-8 py-4 rounded-[14px] font-bold no-underline text-base">
          {data.cta} →
        </motion.a>
      </section>

      <section className="px-[5%] py-16 max-w-[1000px] mx-auto">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
          {[
            "Atención 24/7 sin contratar personal extra",
            "Respuestas instantáneas que cierran ventas",
            "Integración directa con WhatsApp y tu Web"
          ].map((item, i) => (
            <div key={i} className="bg-white/[0.03] p-8 rounded-2xl border border-accent/10">
              <div className="text-[#27C93F] text-2xl mb-4">✓</div>
              <h3 className="text-text-primary mb-2">{item}</h3>
              <p className="text-text-secondary text-sm">Optimizado específicamente para tu flujo de trabajo en {niche}.</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
