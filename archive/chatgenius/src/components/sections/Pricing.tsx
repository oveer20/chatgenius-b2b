import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";

interface Plan {
  tier: string;
  price: string | number;
  period: string;
  features: string[];
  cta: string;
  featured?: boolean;
}

const PLANS: Plan[] = [
  {
    tier: "STARTER",
    price: 0,
    period: "/ mes · Para siempre",
    cta: "Empezar gratis",
    features: [
      "1.000 mensajes / mes",
      "1 asistente activo",
      "Integraciones básicas",
      "Analytics básico",
      "Soporte por email",
    ],
  },
  {
    tier: "PRO",
    price: 49,
    period: "/ mes por workspace",
    cta: "Probar 14 días gratis →",
    featured: true,
    features: [
      "50.000 mensajes / mes",
      "10 asistentes activos",
      "200+ integraciones",
      "Analytics avanzado",
      "Memoria contextual completa",
      "Soporte prioritario 24/7",
      "Multiidioma completo",
    ],
  },
  {
    tier: "ENTERPRISE",
    price: "Custom",
    period: "contacto directo",
    cta: "Hablar con ventas →",
    features: [
      "Mensajes ilimitados",
      "Asistentes ilimitados",
      "Infraestructura dedicada",
      "SSO + SAML",
      "SLA garantizado 99.9%",
      "Onboarding dedicado",
      "Contrato a medida",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="px-6 md:px-16 py-24 max-w-[1200px] mx-auto">
      <SectionLabel>Precios</SectionLabel>

      <Reveal>
        <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] mb-6">
          Transparente.
          <br />
          <em>Sin sorpresas.</em>
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="text-[1.05rem] text-[var(--text-secondary)] max-w-[520px] leading-[1.7] font-light mb-16">
          Empieza gratis. Escala cuando lo necesites. Cancela en un clic.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PLANS.map((plan, i) => (
          <Reveal key={plan.tier} delay={i * 0.1}>
            <div
              className="relative rounded-2xl p-8 flex flex-col h-full transition-all duration-300 hover:-translate-y-[2px]"
              style={{
                background: plan.featured
                  ? "linear-gradient(135deg, rgba(0,229,160,0.06) 0%, rgba(0,229,160,0.02) 100%)"
                  : "var(--bg2)",
                border: plan.featured
                  ? "1px solid rgba(0,229,160,0.3)"
                  : "1px solid var(--border)",
              }}
            >
              {/* Popular badge */}
              {plan.featured && (
                <div
                  className="absolute top-0 right-0 font-mono text-[10px] font-semibold
                    tracking-[0.1em] px-4 py-1.5 rounded-bl-xl text-black"
                  style={{ background: "#00e5a0" }}
                >
                  MÁS POPULAR
                </div>
              )}

              <div className="font-mono text-[11px] tracking-[0.1em] text-[var(--text-muted)] mb-4">
                {plan.tier}
              </div>

              <div
                className="font-serif leading-none tracking-[-0.03em] text-[var(--text-primary)] mb-1"
                style={{ fontSize: typeof plan.price === "number" ? "3rem" : "2rem", paddingTop: typeof plan.price !== "number" ? "0.5rem" : 0 }}
              >
                {typeof plan.price === "number" ? (
                  <>
                    <sup className="text-xl text-[var(--text-secondary)] font-light font-sans" style={{ verticalAlign: "super" }}>$</sup>
                    {plan.price}
                  </>
                ) : (
                  plan.price
                )}
              </div>
              <div className="font-mono text-[11px] text-[var(--text-muted)] mb-6">
                {plan.period}
              </div>

              <div className="h-px mb-6" style={{ background: "var(--border)" }} />

              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[13.5px] text-[var(--text-secondary)]">
                    <span className="font-mono text-[#00e5a0] flex-shrink-0 mt-[1px]">→</span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className="w-full py-3 rounded-xl font-semibold text-[14px] cursor-pointer transition-all duration-200"
                style={
                  plan.featured
                    ? {
                        background: "#00e5a0",
                        color: "#030a05",
                        border: "none",
                      }
                    : {
                        background: "none",
                        color: "var(--text-primary)",
                        border: "1px solid var(--border-hover)",
                      }
                }
                onMouseOver={(e) => {
                  if (plan.featured) {
                    (e.currentTarget as HTMLButtonElement).style.background = "#00ffc2";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 30px rgba(0,229,160,0.4)";
                  } else {
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)";
                  }
                }}
                onMouseOut={(e) => {
                  if (plan.featured) {
                    (e.currentTarget as HTMLButtonElement).style.background = "#00e5a0";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                  } else {
                    (e.currentTarget as HTMLButtonElement).style.background = "none";
                  }
                }}
              >
                {plan.cta}
              </button>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
