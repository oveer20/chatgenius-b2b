"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang, FAQS } from "@/components/LangContext";

function FAQItem({ faq, index }: { faq: { q: string; a: string }; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="border-b border-white/7"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full cursor-pointer items-center justify-between gap-5 border-none bg-none px-0 py-5 text-left"
      >
        <span
          className="font-serif text-[clamp(15px,2vw,18px)] transition-colors duration-300"
          style={{ color: isOpen ? '#D4AF37' : '#f0f2f8' }}
        >
          {faq.q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 text-[24px] font-light text-accent"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[15px] leading-[1.7] text-text-secondary">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const { lang, t } = useLang();
  const faqs = FAQS[lang as keyof typeof FAQS];

  return (
    <section className="mx-auto max-w-[800px] px-[clamp(1.5rem,5vw,4rem)] py-[clamp(4rem,10vw,8rem)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <span className="mb-4 inline-block rounded-full bg-accent/15 px-4 py-[6px] text-[13px] font-semibold tracking-[0.5px] text-accent">
          {t.faq.badge}
        </span>
        <h2 className="font-serif text-[clamp(2rem,5vw,3rem)] text-text-primary">
          {t.faq.titlePart1} <span className="text-accent">{t.faq.titlePart2}</span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-xl border border-white/7 bg-bg/60 px-6 backdrop-blur-xl"
      >
        {faqs.map((faq: {q: string; a: string}, i: number) => (
          <FAQItem key={i} faq={faq} index={i} />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-8 text-center"
      >
        <p className="text-[14px] text-text-secondary">
          {t.faq.noAnswer}{" "}
          <a href="https://wa.me/573159269287" target="_blank" rel="noopener noreferrer" className="text-accent no-underline">
            {t.faq.contactUs}
          </a>
        </p>
      </motion.div>
    </section>
  );
}
