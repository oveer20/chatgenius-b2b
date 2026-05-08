"use client";

import { motion } from "framer-motion";
import { useLang } from "@/components/LangContext";

const INTEGRATIONS = [
  {
    name: "WhatsApp Business",
    color: "#25D366",
    logo: "M12 2C6.48 2 2 6.48 2 12c0 1.82.49 3.53 1.34 4.95L2 22l5.05-1.34C8.47 21.51 10.18 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm4.32 12.44c.28.15.63.2.96.12.33-.08.6-.28.75-.57l1.02-2.13c.12-.25.05-.55-.16-.73-.5-.45-1.44-.73-2.36-.92-.68-.14-1.34-.04-1.88.27-.55.31-.88.86-.84 1.43.04.6.44 1.1 1.14 1.42.4.18.82.23 1.37.23zM8 10h8v1H8v-1zm0 3h6v1H8v-1z",
  },
  {
    name: "Mercado Pago",
    color: "#00B1EA",
    logo: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
  },
  {
    name: "HubSpot",
    color: "#FF7A59",
    logo: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z",
  },
  {
    name: "Google Calendar",
    color: "#4285F4",
    logo: "M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z",
  },
  {
    name: "Notion",
    color: "#ffffff",
    logo: "M4 4h6v2H4V4zm0 3h6v2H4V7zm0 3h6v2H4v-2zm0 3h9v2H4v-2zm0 3h9v2H4v-2zm0 3h6v2H4v-2zm0 3h6v2H4v-2zm9-18h3v2h-3V4zm0 3h3v2h-3V7zm0 3h3v2h-3v-2zm0 3h3v2h-3v-2zm0 3h3v2h-3v-2zm0 3h3v2h-3v-2z",
  },
  {
    name: "Zapier",
    color: "#FF4A00",
    logo: "M13.5 3L12 6.5l2.5 2-2.5 1 1 3 2-2.5-2-1.5 1-2L17 4.5 14.5 7H10V3h3.5zM8 13L6 11l-2 2 3 3 2-1-1-3-2 1 1-2zm3 3l2-1-1-2-2 1 1 2z",
  },
];

export default function Integrations() {
  const { lang } = useLang();
  const label = lang === "es" ? "CONECTADO CON" : "CONNECTED WITH";

  return (
    <section style={{
      padding: 'clamp(2rem, 5vw, 4rem) clamp(1.5rem, 5vw, 4rem)',
      background: 'rgba(255,255,255,0.01)',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '2px', color: '#4a5568', textTransform: 'uppercase' }}>
{label}
        </span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 'clamp(1.5rem, 4vw, 3rem)', flexWrap: 'wrap' }}>
        {INTEGRATIONS.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.1 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '10px 16px', borderRadius: '10px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              color: item.color,
              transition: 'all 0.3s',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d={item.logo} />
            </svg>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#8892a4', whiteSpace: 'nowrap' }}>
              {item.name}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}