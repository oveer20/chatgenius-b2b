import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";

const STEPS = [
  {
    num: "01",
    title: "Conecta tus fuentes",
    desc: "Importa documentos, bases de datos, sitios web y APIs. ChatGenius los indexa automáticamente en segundos.",
  },
  {
    num: "02",
    title: "Entrena sin código",
    desc: "Define la personalidad, tono y límites de tu asistente con lenguaje natural. Sin ML, sin ingenieros.",
  },
  {
    num: "03",
    title: "Despliega donde quieras",
    desc: "Embed en tu web, Slack, WhatsApp, o accede vía API. Un widget, infinitos canales.",
  },
  {
    num: "04",
    title: "Mejora sola",
    desc: "La IA aprende de cada conversación. Cuanto más la usas, más precisa se vuelve. Automáticamente.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="px-6 md:px-16 py-24 max-w-[1200px] mx-auto">
      <SectionLabel>Proceso</SectionLabel>

      <Reveal>
        <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] mb-6">
          En marcha en
          <br />
          <em>menos de 5 minutos</em>
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="text-[1.05rem] text-[var(--text-secondary)] max-w-[520px] leading-[1.7] font-light mb-16">
          Sin instalaciones. Sin contratos anuales. Sin fricción.
        </p>
      </Reveal>

      <Reveal delay={0.2}>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden"
          style={{ background: "var(--border)", border: "1px solid var(--border)" }}
        >
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className="relative p-10 transition-colors duration-300 hover:bg-[var(--bg3)]"
              style={{ background: "var(--bg2)" }}
            >
              {/* Separator line (not on last) */}
              {i < STEPS.length - 1 && (
                <div
                  className="hidden lg:block absolute top-10 right-0 w-px h-16"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent, var(--border), transparent)",
                  }}
                />
              )}

              <div className="font-mono text-[11px] tracking-[0.08em] text-[var(--text-muted)] mb-6">
                {step.num} —
              </div>
              <h3 className="font-serif text-[1.5rem] text-[var(--text-primary)] mb-3 tracking-[-0.01em]">
                {step.title}
              </h3>
              <p className="text-[13.5px] text-[var(--text-secondary)] leading-[1.65] font-light">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
