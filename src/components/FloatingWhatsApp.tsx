"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_URL } from "@/lib/constants";

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);
  const message = "Hola! Quiero información sobre Stratix";
  const whatsappUrl = `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-6 right-6 z-[9999] flex items-center gap-3"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[#128C7E] px-[18px] py-[14px] rounded-[16px] shadow-[0_4px_20px_rgba(37,211,102,0.4)]"
        >
          <p className="m-0 text-white text-sm font-semibold whitespace-nowrap font-sans">
            ¡Escríbenos! 👋
          </p>
        </motion.div>
      )}

      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] shadow-[0_6px_24px_rgba(37,211,102,0.5)] cursor-pointer no-underline border-[3px] border-white"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaWhatsapp size={32} color="#fff" />
      </motion.a>
    </motion.div>
  );
}
