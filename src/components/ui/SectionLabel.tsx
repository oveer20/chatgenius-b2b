export default function SectionLabel({ children }: { children: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
      <span style={{ width: '24px', height: '1px', background: '#D4AF37' }} />
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em', color: '#D4AF37', textTransform: 'uppercase' }}>
        {children}
      </span>
    </div>
  );
}