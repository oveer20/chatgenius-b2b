"use client";

import Link from "next/link";

const FOOTER_LINKS = {
  producto: [
    { label: "Precios", href: "#planes" }
  ],
  empresa: [
    { label: "Contacto", href: "mailto:stratixintelligence@gmail.com" }
  ],
  soporte: [
    { label: "Consultoría", href: "mailto:stratixintelligence@gmail.com" },
    { label: "Soporte", href: "mailto:stratixintelligence@gmail.com" }
  ]
};

export default function LandingFooter() {
  return (
    <footer style={{ padding: '4rem 5% 2rem', background: '#030712', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
              <img src="/stratix_shield.svg" alt="Logo" style={{ width: '28px', height: '28px' }} />
              <span style={{ fontSize: '1.2rem', fontWeight: 900 }}>Stratix</span>
            </div>
            <p style={{ fontSize: '0.85rem', opacity: 0.4, lineHeight: 1.6 }}>
              Agentes IA conversacionales para automatizar tu atención y ventas.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.35, marginBottom: '1.2rem' }}>Producto</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {FOOTER_LINKS.producto.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} style={{ opacity: 0.55, fontSize: '0.85rem', textDecoration: 'none', color: 'inherit' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.35, marginBottom: '1.2rem' }}>Empresa</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {FOOTER_LINKS.empresa.map((link, i) => (
                <li key={i}>
                  <a href={link.href} style={{ opacity: 0.55, fontSize: '0.85rem', textDecoration: 'none', color: 'inherit' }}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.35, marginBottom: '1.2rem' }}>Soporte</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {FOOTER_LINKS.soporte.map((link, i) => (
                <li key={i}>
                  <a href={link.href} style={{ opacity: 0.55, fontSize: '0.85rem', textDecoration: 'none', color: 'inherit' }}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.04)', textAlign: 'center', opacity: 0.35, fontSize: '0.8rem' }}>
          © 2025 Stratix Intelligence. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}