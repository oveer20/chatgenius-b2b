"use client";

import { motion } from "framer-motion";

export default function VideoDemo() {
  return (
    <section style={{ 
      padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
      maxWidth: '1100px',
      margin: '0 auto',
      textAlign: 'center',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span style={{
          display: 'inline-block',
          background: 'rgba(212,175,55,0.15)',
          color: '#D4AF37',
          fontSize: '13px',
          fontWeight: 600,
          padding: '6px 16px',
          borderRadius: '20px',
          marginBottom: '20px',
          letterSpacing: '0.5px',
        }}>
          VER EN ACCIÓN
        </span>

        <h2 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
          color: '#f0f2f8',
          marginBottom: '16px',
          lineHeight: 1.1,
        }}>
          Mira cómo Stratix cierra ventas <span style={{ color: '#D4AF37' }}>mientras tú duermes</span>
        </h2>

        <p style={{
          color: '#8892a4',
          fontSize: '16px',
          maxWidth: '500px',
          margin: '0 auto 40px',
          lineHeight: 1.6,
        }}>
          En 3 minutos verás cómo automatizamos leads, respondemos por WhatsApp y agendamos citas.
        </p>

        {/* Removed redundant buttons to clean up UI and avoid confusion with Hero section */}
      </motion.div>
    </section>
  );
}