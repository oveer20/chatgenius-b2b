"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function ShareButton() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  const shareData = {
    title: "Stratix Intelligence | IA que Cierra Ventas 24/7",
    text: "¡Automatiza tus ventas con Inteligencia Artificial! Prueba esta demo:",
    url: typeof window !== "undefined" ? window.location.href : "https://stratix-intelligence-ia.vercel.app",
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Share canceled");
      }
    } else {
      // Fallback to WhatsApp
      const text = encodeURIComponent(`${shareData.text} ${shareData.url}`);
      window.open(`https://wa.me/?text=${text}`, "_blank");
    }
  };

  if (!isClient) return null;

  return (
    <motion.button
      onClick={handleShare}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      style={{
        position: "fixed",
        bottom: "100px",
        right: "24px",
        zIndex: 9998,
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        background: "#25D366",
        color: "white",
        border: "3px solid white",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-label="Share this page"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <polyline points="16 6 12 2 8 6" />
        <line x1="12" y1="2" x2="12" y2="15" />
      </svg>
    </motion.button>
  );
}
