export default function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="w-6 h-px bg-[#00e5a0]" />
      <span
        className="font-mono text-[11px] tracking-[0.12em] text-[#00e5a0] uppercase"
      >
        {children}
      </span>
    </div>
  );
}
