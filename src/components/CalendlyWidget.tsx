"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLang } from "@/components/LangContext";

export default function CalendlyWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { lang } = useLang();

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: '16px 32px',
          borderRadius: '14px',
          background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
          color: '#030a05',
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: '15px',
          boxShadow: '0 4px 20px rgba(212,175,55,0.3)',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5z"/>
        </svg>
        {lang === "es" ? "Agendar Demo" : "Schedule Demo"}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(8px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#0d1017',
                borderRadius: '20px',
                width: '100%',
                maxWidth: '820px',
                height: '700px',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(212,175,55,0.2)',
              }}
            >
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  cursor: 'pointer',
                  color: '#fff',
                  fontSize: '20px',
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ×
              </button>

              <div style={{ 
                width: '100%', 
                height: '100%', 
                overflow: 'hidden',
                borderRadius: '20px',
              }}>
                <iframe
                  src="https://calendly.com/stratix-intelligence/demo?hide_gdpr_banner=1&background_color=0d1017&text_color=f0f2f8&primary_color=D4AF37"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ borderRadius: '20px' }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}