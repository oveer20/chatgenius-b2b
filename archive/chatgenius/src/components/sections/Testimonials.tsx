import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";

interface Testimonial {
  text: string;
  name: string;
  role: string;
  initials: string;
  color: string;
  textColor: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    text: "ChatGenius redujo nuestro tiempo de respuesta de 4 horas a 12 segundos. Nuestro CSAT pasó de 72% a 94% en el primer mes.",
    name: "María Rodríguez",
    role: "Head of CX · Shopify Partner",
    initials: "MR",
    color: "rgba(0,229,160,0.1)",
    textColor: "#00e5a0",
  },
  {
    text: "Integramos ChatGenius con nuestro CRM en 20 minutos. Ahora el equipo de ventas tiene IA en cada punto de contacto. Es mágico.",
    name: "Juan Carlos Méndez",
    role: "CTO · FinTech Startup",
    initials: "JC",
    color: "rgba(120,80,255,0.1)",
    textColor: "#a78bfa",
  },
  {
    text: "Probamos 7 herramientas de IA. ChatGenius es la única que realmente entendió el contexto de nuestro producto sin meses de fine-tuning.",
    name: "Ana García",
    role: "CEO · SaaS B2B",
    initials: "AG",
    color: "rgba(251,146,60,0.1)",
    textColor: "#fb923c",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="px-6 md:px-16 py-24 max-w-[1200px] mx-auto">
      <SectionLabel>Clientes</SectionLabel>

      <Reveal>
        <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] mb-16">
          Lo que dicen
          <br />
          <em>los que ya vuelan</em>
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.1}>
            <div
              className="relative rounded-2xl p-7 flex flex-col h-full overflow-hidden
                transition-all duration-300"
              style={{ background: "var(--bg2)", border: "1px solid var(--border)" }}
            >
              {/* Large quote mark */}
              <div
                className="absolute top-4 right-6 font-serif text-[5rem] leading-none pointer-events-none select-none"
                style={{ color: "#00e5a0", opacity: 0.12 }}
              >
                &ldquo;
              </div>

              {/* Stars */}
              <div className="text-[#00e5a0] text-[11px] tracking-[2px] mb-4">★★★★★</div>

              {/* Text */}
              <p className="text-[14px] text-[var(--text-secondary)] leading-[1.7] font-light italic flex-1 mb-6">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center
                    font-mono text-[11px] font-semibold flex-shrink-0"
                  style={{
                    background: t.color,
                    color: t.textColor,
                    border: "1px solid var(--border)",
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-[14px] font-medium text-[var(--text-primary)]">
                    {t.name}
                  </div>
                  <div className="font-mono text-[11px] text-[var(--text-muted)]">
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
