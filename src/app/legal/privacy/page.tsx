import React from 'react';
import styles from '../../landing.module.css';
import { FiArrowLeft, FiShield } from 'react-icons/fi';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <main className={styles.legalPage} style={{ background: '#050505', minHeight: '100vh', padding: '100px 20px', color: 'var(--text-primary)' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-blue)', textDecoration: 'none', marginBottom: '40px', fontWeight: 'bold' }}>
          <FiArrowLeft /> Volver al Inicio
        </Link>
        <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <FiShield style={{ color: 'var(--accent-blue)' }} /> Política de Privacidad
        </h1>
        <p style={{ color: 'var(--text-tertiary)', marginBottom: '40px' }}>Tu seguridad es nuestra prioridad máxima.</p>
        
        <div className={styles.legalContent} style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
          <section style={{ marginBottom: '40px', background: 'rgba(255,255,255,0.02)', padding: '30px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ color: 'var(--accent-blue)', marginBottom: '20px', fontSize: '1.5rem' }}>Tratamiento de Datos de Élite</h3>
            <p>En Stratix AI, aplicamos cifrado de alta seguridad (AES-256) a toda la información sensible. No vendemos tus datos a terceros; los usamos exclusivamente para potenciar la inteligencia de tus agentes.</p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h3 style={{ color: 'var(--accent-blue)', marginBottom: '20px', fontSize: '1.5rem' }}>1. Recolección de Información</h3>
            <p>Recolectamos datos de contacto de leads generados por tus bots (Nombre, WhatsApp, Email) y la información de entrenamiento que subes al sistema (PDFs, URLs).</p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h3 style={{ color: 'var(--accent-blue)', marginBottom: '20px', fontSize: '1.5rem' }}>2. Uso de la Información</h3>
            <p>Usamos Google Cloud y Supabase para el almacenamiento seguro. La IA procesa tus datos bajo protocolos de privacidad estricto, asegurando que el "ADN de tu marca" nunca salga de tu control.</p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h3 style={{ color: 'var(--accent-blue)', marginBottom: '20px', fontSize: '1.5rem' }}>3. Derechos del Usuario</h3>
            <p>Puedes solicitar la eliminación total de tus datos y los de tus leads en cualquier momento enviando un correo a soporte o desde la configuración de tu panel.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
