import Link from "next/link";
import { motion } from "framer-motion";

const LOGOS = ["WhatsApp", "Instagram", "Shopify", "Meta", "Google", "Vercel"];

export default function Logos() {
  return (
    <div style={{ padding: '60px clamp(1.5rem, 5vw, 4rem)', textAlign: 'center', position: 'relative', zIndex: 2 }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ fontFamily: "'DM Mono', monospace", fontSize: '12px', letterSpacing: '0.12em', color: '#4a5568', marginBottom: '32px' }}
      >
        CONFIADO POR EQUIPOS EN CRECIMIENTO
      </motion.div>
      
      <motion.div 
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '48px', flexWrap: 'wrap' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        {LOGOS.map((name, i) => (
          <motion.span
            key={name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * i }}
            whileHover={{ 
              scale: 1.1, 
              color: '#D4AF37',
              transition: { duration: 0.2 }
            }}
            style={{ 
              fontFamily: "'DM Sans', sans-serif", 
              fontSize: '16px', 
              color: '#8892a4', 
              letterSpacing: '0.03em', 
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            {name}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}