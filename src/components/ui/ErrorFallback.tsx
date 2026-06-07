"use client";

export default function ErrorFallback({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-error/10">
          <span className="text-2xl text-error">!</span>
        </div>
        <h2 className="mb-2 font-serif text-2xl text-text-primary">Algo sali\u00f3 mal</h2>
        <p className="mb-6 text-sm text-text-secondary">{error.message || "Ocurri\u00f3 un error inesperado."}</p>
        <button
          onClick={reset}
          className="rounded-xl bg-accent px-6 py-3 text-sm font-bold text-bg transition-all hover:scale-105"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
}
