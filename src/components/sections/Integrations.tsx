"use client";

import { motion } from "framer-motion";
import { useStrings } from "@/lib/useStrings";

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
  const { s } = useStrings();
  const label = s("CONECTADO CON", "CONNECTED WITH");

  return (
    <section className="py-32 px-[clamp(1.5rem,5vw,4rem)] border-t border-white/5 border-b border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(212,175,55,0.03)_0%,transparent_60%)] pointer-events-none" />
      <div className="relative">
        <div className="text-center mb-10">
          <span className="font-mono text-[11px] tracking-[2px] text-text-muted uppercase">{label}</span>
        </div>
        <div className="flex justify-center items-center gap-[clamp(1.5rem,4vw,3rem)] flex-wrap">
          {INTEGRATIONS.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05, y: -3 }}
              className="group flex items-center gap-3 px-5 py-3 rounded-xl bg-bg/60 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition-all duration-300 hover:border-accent/30 hover:shadow-[0_15px_40px_rgba(0,0,0,0.4),0_0_30px_rgba(212,175,55,0.08)]"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill={item.color}>
                <path d={item.logo} />
              </svg>
              <span className="text-[14px] font-semibold text-text-secondary whitespace-nowrap group-hover:text-text-primary">
                {item.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
