"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function CalendlyButton() {
  const [isClient, setIsClient] = useState(false);
  const [tooltip, setTooltip] = useState(false);

  useEffect(() => setIsClient(true), []);

  const handleClick = () => {
    const target = document.getElementById("contacto");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.href = "mailto:stratixintelligence@gmail.com?subject=Agenda%20Demo%20-%20Stratix%20Intelligence&body=Hola,%20quiero%20agendar%20una%20demo%20de%20Stratix%20Intelligence.%0D%0A%0D%0ANombre:%20%0D%0AEmpresa:%20%0D%0ATel%C3%A9fono:%20";
    }
  };

  if (!isClient) return null;

  return (
    <motion.div
      onMouseEnter={() => setTooltip(true)}
      onMouseLeave={() => setTooltip(false)}
      className="fixed bottom-[100px] right-6 z-[9998] flex flex-col-reverse items-center gap-3"
    >
      {tooltip && (
        <div className="mr-3 bg-accent text-black px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
          Agendar Demo 📅
        </div>
      )}
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-accent text-white border-[3px] border-white shadow-[0_4px_12px_rgba(212,175,55,0.4)] cursor-pointer flex items-center justify-center"
        aria-label="Agendar Demo"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5z" />
        </svg>
      </motion.button>
    </motion.div>
  );
}
