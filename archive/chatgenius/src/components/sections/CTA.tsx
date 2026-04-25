import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

export default function CTA() {
  return (
    <section className="px-6 md:px-16 py-24 max-w-[900px] mx-auto text-center">
      <Reveal>
        <div
          className="relative rounded-[24px] overflow-hidden px-8 md:px-20 py-20"
          style={{
            background: "var(--bg2)",
            border: "1px solid rgba(0,229,160,0.2)",
          }}
        >
          {/* Top glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,229,160,0.1) 0%, transparent 70%)",
            }}
          />

          <h2 className="relative font-serif text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] mb-4">
            Tu equipo merece
            <br />
            <em>la mejor IA</em>
          </h2>
          <p className="relative text-[1rem] text-[var(--text-secondary)] mb-10 font-light leading-[1.7] max-w-[460px] mx-auto">
            14 días gratis. Sin tarjeta de crédito. Sin promesas vacías.
            <br />
            Solo resultados desde el día uno.
          </p>

          <div className="relative flex justify-center gap-4 flex-wrap mb-6">
            <Button variant="primary" size="lg">
              Empezar ahora — es gratis →
            </Button>
            <Button variant="outline" size="lg">
              Hablar con el equipo
            </Button>
          </div>

          <div className="relative flex justify-center gap-8 flex-wrap font-mono text-[11px] text-[var(--text-muted)]">
            <span>✓ Sin tarjeta de crédito</span>
            <span>✓ Setup en 5 minutos</span>
            <span>✓ Cancela cuando quieras</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
