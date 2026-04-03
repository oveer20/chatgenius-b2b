"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowLeft, FiShield } from "react-icons/fi";
import Image from "next/image";

export default function NotFound() {
  return (
    <div style={{ 
      backgroundColor: '#060B14', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      color: 'white', 
      fontFamily: 'system-ui, sans-serif',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '100px', height: '100px', background: 'rgba(212,175,55,0.1)', borderRadius: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(212,175,55,0.2)' }}>
            <Image src="/stratix_shield.svg" alt="Stratix Shield" width={60} height={60} />
          </div>
        </div>
        
        <h1 style={{ fontSize: '6rem', fontWeight: 900, color: '#D4AF37', marginBottom: '1rem', letterSpacing: '-4px' }}>404</h1>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem' }}>Arquitectura No Encontrada</h2>
        <p style={{ opacity: 0.5, fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 3rem', lineHeight: 1.6 }}>
          El recurso solicitado no existe en nuestro clúster actual. Es posible que la página haya sido movida o aún esté en fase de despliegue.
        </p>

        <Link href="/" style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '12px', 
          padding: '16px 32px', 
          backgroundColor: '#D4AF37', 
          color: '#000', 
          borderRadius: '12px', 
          textDecoration: 'none', 
          fontWeight: 900,
          boxShadow: '0 10px 30px rgba(212,175,55,0.2)',
          transition: '0.3s'
        }}>
          <FiArrowLeft /> Regresar a la Base
        </Link>
      </motion.div>

      <div style={{ position: 'absolute', bottom: '2rem', opacity: 0.2, fontSize: '0.8rem', letterSpacing: '2px' }}>
        STRATIX INTELLIGENCE — SECURE PROTOCOL
      </div>
    </div>
  );
}
