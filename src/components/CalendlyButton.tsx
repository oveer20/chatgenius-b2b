"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function CalendlyButton() {
  const [isClient, setIsClient] = useState(false);
  const [tooltip, setTooltip] = useState(false);

  useEffect(() => setIsClient(true), []);

  const handleClick = () => {
    const target = document.getElementById("agendar");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.open("https://calendly.com/stratix-intelligence/demo", "_blank");
    }
  };

  if (!isClient) return null;

  return (
    <motion.div
      onMouseEnter={() => setTooltip(true)}
      onMouseLeave={() => setTooltip(false)}
      style={{
        position: "fixed",
        bottom: "100px",
        right: "24px",
        zIndex: 9998,
        display: "flex",
        flexDirection: "column-reverse",
        alignItems: "center",
        gap: "12px",
      }}
    >
      {tooltip && (
        <div
          style={{
            marginRight: "12px",
            background: "#D4AF37",
            color: "#000",
            padding: "6px 12px",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: 700,
            whiteSpace: "nowrap",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          }}
        >
          Agendar Demo 📅
        </div>
      )}
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "#D4AF37",
          color: "white",
          border: "3px solid white",
          boxShadow: "0 4px 12px rgba(212,175,55,0.4)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-label="Agendar Demo"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5z" />
        </svg>
      </motion.button>
    </motion.div>
  );
}
