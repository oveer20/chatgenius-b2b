"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function ChatFloat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 9997,
      }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            style={{
              background: "#0d1017",
              border: "1px solid rgba(212,175,55,0.2)",
              borderRadius: "16px",
              padding: "20px",
              marginBottom: "12px",
              width: "280px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            }}
          >
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "16px",
            }}>
              <div style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#000">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                </svg>
              </div>
              <div>
                <div style={{ fontWeight: 700, color: "#f0f2f8", fontSize: "14px" }}>
                  Stratix AI
                </div>
                <div style={{ fontSize: "12px", color: "#10b981" }}>
                  En línea ahora
                </div>
              </div>
            </div>
            <p style={{
              fontSize: "13px",
              color: "#8892a4",
              marginBottom: "16px",
              lineHeight: 1.5,
            }}>
              ¿Quieres ver cómo funciona nuestro agente IA?
            </p>
            <Link
              href="/widget"
              onClick={() => setIsOpen(false)}
              style={{
                display: "block",
                textAlign: "center",
                background: "linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)",
                color: "#000",
                fontWeight: 600,
                fontSize: "14px",
                padding: "12px 20px",
                borderRadius: "10px",
                textDecoration: "none",
              }}
            >
              Probar demo en vivo →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(212,175,55,0.4)",
          cursor: "pointer",
          marginLeft: "auto",
        }}
      >
        <motion.div
          animate={isOpen ? { rotate: 90 } : { rotate: 0 }}
          transition={{ duration: 0.2 }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#000">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
          </svg>
        </motion.div>
      </motion.button>
    </motion.div>
  );
}