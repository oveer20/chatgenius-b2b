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
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: showTooltip ? '12px' : '0',
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            background: '#128C7E',
            padding: '14px 18px',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)',
          }}
        >
          <p style={{ margin: 0, color: 'white', fontSize: '14px', fontWeight: 600, whiteSpace: 'nowrap', fontFamily: 'var(--font-sans)' }}>
            ¡Escríbenos! 👋
          </p>
        </motion.div>
      )}

      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
          boxShadow: '0 6px 24px rgba(37, 211, 102, 0.5)',
          cursor: 'pointer',
          textDecoration: 'none',
          border: '4px solid white',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
<FaWhatsapp size={32} color="#fff" />
      </motion.a>
    </motion.div>
  );
}