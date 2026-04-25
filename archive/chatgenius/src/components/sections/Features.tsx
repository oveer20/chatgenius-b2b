import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";

const integrations = ["Slack", "Notion", "HubSpot", "Stripe"];
const chartBars = [40, 55, 48, 65, 72, 60, 80, 100];

function CodeSnippet() {
  return (
    <div
      className="mt-6 rounded-xl p-4 font-mono text-[11px] leading-[1.8] overflow-hidden"
      style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
    >
      <span style={{ color: "#4a5568" }}>// Contexto activo</span><br />
      <span style={{ color: "#7dd3fc" }}>const</span>
      {" memory = "}
      <span style={{ color: "#c4b5fd" }}>loadContext</span>
      {"("}
      <span style={{ color: "#00e5a0" }}>"cliente_ID"</span>
      {");"}
      <br />
      <span style={{ color: "#4a5568" }}>// → 847 interacciones previas</span>
      <br />
      <span style={{ color: "#7dd3fc" }}>await</span>
      {" "}
      <span style={{ color: "#c4b5fd" }}>respond</span>
      {"(query, memory);"}
      <br />
      <span style={{ color: "#4a5568" }}>// Respuesta en 180ms ✓</span>
    </div>
  );
}

function MiniChart() {
  return (
    <div className="mt-6">
      <div className="flex items-end gap-1 h-[70px]">
        {chartBars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-[3px]"
            style={{
              height: `${h}%`,
              background:
                i === chartBars.length - 1
                  ? "#00e5a0"
                  : `rgba(0,229,160,${0.15 + i * 0.06})`,
              boxShadow:
                i === chartBars.length - 1
                  ? "0 0 12px rgba(0,229,160,0.4)"
                  : "none",
            }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-1">
        <span className="font-mono text-[10px] text-[var(--text-muted)]">LUN</span>
        <span className="font-mono text-[10px] text-[#00e5a0]">+34% esta semana</span>
      </div>
    </div>
  );
}

function LiveBadge({ label }: { label: string }) {
  return (
    <div
      className="inline-flex items-center gap-2 mt-4 px-3 py-1 rounded-full
        font-mono text-[11px]"
      style={{
        background: "rgba(0,229,160,0.08)",
        border: "1px solid rgba(0,229,160,0.2)",
        color: "#00e5a0",
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full bg-[#00e5a0]"
        style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
      />
      {label}
    </div>
  );
}

interface CellProps {
  className?: string;
  children: React.ReactNode;
}

function Cell({ className = "", children }: CellProps) {
  return (
    <div
      className={`relative overflow-hidden p-8 transition-colors duration-300
        hover:bg-[var(--bg3)] group ${className}`}
      style={{ background: "var(--bg2)" }}
    >
      {children}
    </div>
  );
}

function CellIcon({ children }: { children: string }) {
  return (
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-5"
      style={{ border: "1px solid var(--border-hover)", background: "var(--surface)" }}
    >
      {children}
    </div>
  );
}

function CellTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-serif text-[1.3rem] text-[var(--text-primary)] mb-2.5 tracking-[-0.01em]">
      {children}
    </h3>
  );
}

function CellText({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[13.5px] text-[var(--text-secondary)] leading-[1.65] font-light">
      {children}
    </p>
  );
}

export default function Features() {
  return (
    <section id="features" className="px-6 md:px-16 py-24 max-w-[1200px] mx-auto">
      <SectionLabel>Características</SectionLabel>

      <Reveal>
        <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] mb-6">
          Construido para
          <br />
          <em>resultados reales</em>
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="text-[1.05rem] text-[var(--text-secondary)] max-w-[520px] leading-[1.7] font-light mb-16">
          Cada función fue diseñada con un solo propósito: que tu equipo haga más, más rápido.
        </p>
      </Reveal>

      <Reveal delay={0.2}>
        <div
          className="grid gap-px rounded-2xl overflow-hidden"
          style={{
            gridTemplateColumns: "repeat(12, 1fr)",
            background: "var(--border)",
            border: "1px solid var(--border)",
          }}
        >
          {/* Row 1 */}
          <Cell className="col-span-12 md:col-span-7">
            <CellIcon>🧠</CellIcon>
            <CellTitle>IA con memoria contextual</CellTitle>
            <CellText>
              ChatGenius recuerda el historial completo de tu negocio, clientes y
              decisiones anteriores para respuestas profundamente relevantes.
            </CellText>
            <CodeSnippet />
          </Cell>

          <Cell className="col-span-12 md:col-span-5">
            <CellIcon>⚡</CellIcon>
            <CellTitle>Velocidad de respuesta</CellTitle>
            <CellText>
              Latencia promedio por debajo de 200ms. Tus clientes no esperan.
            </CellText>
            <div className="font-serif text-[3.5rem] text-[var(--text-primary)] tracking-[-0.03em] leading-none mt-4">
              0.18<span className="text-2xl text-[var(--text-secondary)]">s</span>
            </div>
            <div className="font-mono text-[11px] tracking-[0.05em] text-[var(--text-muted)] mt-2">
              LATENCIA PROMEDIO P95
            </div>
            <LiveBadge label="En tiempo real" />
          </Cell>

          {/* Row 2 */}
          <Cell className="col-span-12 md:col-span-4">
            <CellIcon>🔗</CellIcon>
            <CellTitle>Integraciones nativas</CellTitle>
            <CellText>
              Conecta Slack, Notion, CRMs, bases de datos propias y 200+ herramientas más.
            </CellText>
            <div className="flex flex-wrap gap-2 mt-4">
              {integrations.map((name) => (
                <span
                  key={name}
                  className="font-mono text-[11px] text-[var(--text-muted)] px-3 py-1 rounded-md"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                >
                  {name}
                </span>
              ))}
              <span
                className="font-mono text-[11px] text-[#00e5a0] px-3 py-1 rounded-md"
                style={{
                  background: "rgba(0,229,160,0.06)",
                  border: "1px solid rgba(0,229,160,0.2)",
                }}
              >
                +200 más
              </span>
            </div>
          </Cell>

          <Cell className="col-span-12 md:col-span-8">
            <CellIcon>📊</CellIcon>
            <CellTitle>Analytics de conversaciones en tiempo real</CellTitle>
            <CellText>
              Entiende patrones, mide satisfacción y optimiza automáticamente tus flujos
              con datos accionables.
            </CellText>
            <MiniChart />
          </Cell>

          {/* Row 3 */}
          <Cell className="col-span-12 md:col-span-6">
            <CellIcon>🛡️</CellIcon>
            <CellTitle>Seguridad empresarial</CellTitle>
            <CellText>
              SOC 2 Type II, cifrado end-to-end, datos soberanizados por región y
              controles de acceso granulares.
            </CellText>
            <LiveBadge label="ISO 27001 certificado" />
          </Cell>

          <Cell className="col-span-12 md:col-span-6">
            <CellIcon>🌐</CellIcon>
            <CellTitle>Multiidioma nativo</CellTitle>
            <CellText>
              Responde en el idioma de tu cliente automáticamente. Soporta 95 idiomas con
              matices culturales.
            </CellText>
            <div className="flex gap-2 mt-4 flex-wrap items-center">
              {["🇪🇸", "🇺🇸", "🇧🇷", "🇫🇷", "🇩🇪", "🇯🇵"].map((f) => (
                <span key={f} className="text-2xl">{f}</span>
              ))}
              <span className="font-mono text-[11px] text-[var(--text-muted)] ml-1">+89 más</span>
            </div>
          </Cell>
        </div>
      </Reveal>
    </section>
  );
}
