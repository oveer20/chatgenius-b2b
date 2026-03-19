import React from 'react';
import styles from '../../landing.module.css';
import { FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <main className={styles.legalPage} style={{ background: '#050505', minHeight: '100vh', padding: '100px 20px', color: 'var(--text-primary)' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-blue)', textDecoration: 'none', marginBottom: '40px', fontWeight: 'bold' }}>
          <FiArrowLeft /> Volver al Inicio
        </Link>
        <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '20px', letterSpacing: '-0.02em' }}>Términos de Servicio</h1>
        <p style={{ color: 'var(--text-tertiary)', marginBottom: '40px' }}>Última actualización: 18 de Marzo, 2026</p>
        
        <div className={styles.legalContent} style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
          <section style={{ marginBottom: '40px' }}>
            <h3 style={{ color: 'var(--accent-blue)', marginBottom: '20px', fontSize: '1.5rem' }}>1. Aceptación de los Términos</h3>
            <p>Al acceder y utilizar la "Suite" de Stratix AI, usted acepta estar sujeto a estos Términos de Servicio. Nuestra tecnología está diseñada para uso empresarial estratégico y profesional.</p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h3 style={{ color: 'var(--accent-blue)', marginBottom: '20px', fontSize: '1.5rem' }}>2. Uso del Ecosistema</h3>
            <p>Usted es responsable de la información que entrena en sus agentes de IA. Stratix AI proporciona la Suite de herramientas (Pomelli, Stitch, Opal), pero la veracidad del contenido corre por cuenta del usuario.</p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h3 style={{ color: 'var(--accent-blue)', marginBottom: '20px', fontSize: '1.5rem' }}>3. Limitación de Responsabilidad</h3>
            <p>Stratix AI utiliza modelos avanzados de Google Gemini. Aunque buscamos la máxima precisión, no somos responsables por alucinaciones de IA o decisiones comerciales tomadas basadas en respuestas del bot.</p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h3 style={{ color: 'var(--accent-blue)', marginBottom: '20px', fontSize: '1.5rem' }}>4. Suscripciones y Pagos</h3>
            <p>Los planes Pioneer Elite, Empire Evolution y Custom Suite se facturan mensualmente. La cancelación puede hacerse en cualquier momento desde el Dashboard, manteniendo el acceso hasta el fin del periodo pagado.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
