const LOGOS = ["NOTION", "SHOPIFY", "STRIPE", "VERCEL", "LINEAR", "FIGMA", "INTERCOM"];

export default function Logos() {
  return (
    <div className="relative z-10 py-12 px-6 md:px-16 text-center">
      <p className="font-mono text-[11px] tracking-[0.1em] text-[var(--text-muted)] mb-8">
        CONFIADO POR EQUIPOS EN CRECIMIENTO
      </p>
      <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap opacity-40">
        {LOGOS.map((name) => (
          <span
            key={name}
            className="font-mono text-[13px] text-[var(--text-muted)] tracking-[0.05em]
              font-medium hover:opacity-100 hover:text-[var(--text-secondary)] transition-all cursor-default"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
