"use client";

import * as Sentry from "@sentry/nextjs";
import Link from "next/link";

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  Sentry.captureException(error);
  return (
    <html>
      <body className="m-0 flex min-h-screen items-center justify-center bg-bg p-0">
        <div className="text-center max-w-md">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-error/10">
            <span className="text-2xl text-error">!</span>
          </div>
          <h1 className="mb-2 font-serif text-3xl text-text-primary">Error crítico</h1>
          <p className="mb-6 text-sm text-text-secondary">Ocurrió un error inesperado. Nuestro equipo ha sido notificado.</p>
          <Link
            href="/"
            className="inline-block rounded-xl bg-accent px-6 py-3 text-sm font-bold text-bg no-underline transition-all hover:scale-105"
          >
            Volver al inicio
          </Link>
        </div>
      </body>
    </html>
  );
}
