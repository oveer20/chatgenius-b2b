const FOOTER_COLS = [
  {
    title: "PRODUCTO",
    links: ["Características", "Integraciones", "Changelog", "Roadmap"],
  },
  {
    title: "EMPRESA",
    links: ["Acerca de", "Blog", "Careers", "Press"],
  },
  {
    title: "SOPORTE",
    links: ["Documentación", "API Reference", "Status", "Contacto"],
  },
  {
    title: "LEGAL",
    links: ["Privacidad", "Términos", "Cookies", "GDPR"],
  },
];

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-16 py-12">
        <div className="flex justify-between items-start flex-wrap gap-12">
          {/* Brand */}
          <div>
            <a href="#" className="flex items-center gap-2.5 no-underline mb-3">
              <span
                className="w-2 h-2 rounded-full bg-[#00e5a0]"
                style={{
                  boxShadow: "0 0 12px #00e5a0",
                  animation: "pulse-dot 2s ease-in-out infinite",
                }}
              />
              <span className="font-mono text-[1.05rem] font-medium text-[var(--text-primary)] tracking-tight">
                ChatGenius
              </span>
            </a>
            <p className="text-[13px] text-[var(--text-muted)] font-light leading-[1.6] max-w-[180px]">
              IA que entiende tu negocio. Respuestas que convierten.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-12 md:gap-16 flex-wrap">
            {FOOTER_COLS.map((col) => (
              <div key={col.title}>
                <h4 className="font-mono text-[10px] tracking-[0.1em] text-[var(--text-muted)] mb-4">
                  {col.title}
                </h4>
                <ul className="list-none flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-[13.5px] text-[var(--text-secondary)] no-underline font-light
                          transition-colors hover:text-[var(--text-primary)]"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex justify-between items-center flex-wrap gap-4 mt-12 pt-8"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p className="font-mono text-[11px] text-[var(--text-muted)]">
            © 2025 ChatGenius. Todos los derechos reservados.
          </p>
          <p className="font-mono text-[11px] text-[var(--text-muted)]">
            Hecho con ✦ para equipos ambiciosos
          </p>
        </div>
      </div>
    </footer>
  );
}
