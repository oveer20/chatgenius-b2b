"use client";

import { motion } from "framer-motion";
import { useLang } from "@/components/LangContext";

export default function CalendlyWidget() {
  const { lang } = useLang();

  const handleClick = () => {
    window.location.href = "mailto:stratixintelligence@gmail.com?subject=Agenda%20Demo%20-%20Stratix%20Intelligence&body=Hola,%20quiero%20agendar%20una%20demo%20de%20Stratix%20Intelligence.%0D%0A%0D%0ANombre:%20%0D%0AEmpresa:%20%0D%0ATel%C3%A9fono:%20";
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className="inline-flex items-center gap-[10px] px-8 py-4 rounded-[14px] bg-gradient-to-br from-accent to-accent2 text-[#030a05] no-underline font-semibold text-[15px] shadow-[0_4px_20px_rgba(212,175,55,0.3)] border-none cursor-pointer"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5z"/>
      </svg>
      {lang === "es" ? "Agendar Demo" : "Schedule Demo"}
    </motion.button>
  );
}
