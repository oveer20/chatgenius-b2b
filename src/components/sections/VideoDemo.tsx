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

        <div style={{
          position: 'relative',
          maxWidth: '800px',
          margin: '0 auto',
          borderRadius: '20px',
          overflow: 'hidden',
          border: '1px solid rgba(212,175,55,0.2)',
          background: '#0d1017',
          aspectRatio: '16/9',
        }}>
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'clamp(1rem, 4vw, 2rem)',
          marginTop: '32px',
          flexWrap: 'wrap',
        }}>
          <motion.a
            href="/widget"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 24px',
              borderRadius: '12px',
              background: 'rgba(212,175,55,0.15)',
              border: '1px solid rgba(212,175,55,0.3)',
              color: '#D4AF37',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '14px',
              transition: 'all 0.3s ease',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
            </svg>
            Probar demo en vivo
          </motion.a>

          <motion.a
            href="https://wa.me/573159269287"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 24px',
              borderRadius: '12px',
              background: '#25D366',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '14px',
              transition: 'all 0.3s ease',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.617-2.030-.617-.77.001-3.855.293-6.162 1.393C6.963 17.5 6 18.463 6 19.453v1.034c0 .768.488 1.47 1.156 1.953l.73 1.297c.178.316.527.5.902.5l2.35-.001c.5 0 .973-.254 1.201-.643l2.156-3.373M12.57 2.001c2.487 0 4.807.965 6.538 2.572l-5.677 5.677c-.945-.256-1.933-.583-2.861-.933v9.18l-.001.001c-3.91-.005-7.558-1.579-10.365-4.215C1.492 11.8 0 9.082 0 6.132 0 2.767 2.686.012 6.132.012c1.732 0 3.385.598 4.737 1.685l1.701-1.696z"/>
            </svg>
            Escribir por WhatsApp
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}