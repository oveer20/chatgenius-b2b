export default function LoadingSpinner({ label = "Cargando..." }: { label?: string }) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-accent/30 border-t-accent" />
        <p className="text-sm text-text-secondary">{label}</p>
      </div>
    </div>
  );
}
