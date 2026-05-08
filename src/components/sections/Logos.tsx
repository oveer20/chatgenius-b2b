import Link from "next/link";
import { motion } from "framer-motion";
import { useLang } from "@/components/LangContext";

const LOGOS = ["WhatsApp", "Instagram", "Shopify", "Meta", "Google", "Vercel"];

export default function Logos() {
  const { t } = useLang();
  return (
    <div style={{ padding: '60px clamp(1.5rem, 5vw, 4rem)', textAlign: 'center', position: 'relative', zIndex: 2 }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.12em', color: '#4a5568', marginBottom: '32px' }}
      >
        {t.logos.badge}
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
              fontFamily: 'var(--font-sans)', 
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