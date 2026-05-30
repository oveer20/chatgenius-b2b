import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * STRATIX AI - Security Middleware (V2.0)
 * - Protección de rutas del dashboard via Supabase SSR
 * - Security headers
 * - Rate limiting básico
 */

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Construir response base con security headers
  let response = NextResponse.next({ request });

  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Proteger rutas del dashboard — verificar sesión real de Supabase
  if (pathname.startsWith("/dashboard")) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      // Si no hay vars de entorno, dejar pasar (dev sin Supabase configurado)
      return response;
    }

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value }) =>
            response.cookies.set(name, value)
          );
        },
      },
    });

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Rate limiting básico para APIs (en producción usar Redis/Upstash)
  if (pathname.startsWith("/api")) {
    const rateLimitHeader = request.headers.get("X-RateLimit-Remaining");
    if (rateLimitHeader === "0") {
      return new NextResponse("Too Many Requests", {
        status: 429,
        headers: { "Retry-After": "60" },
      });
    }
  }

  // Bloquear acceso a archivos sensibles
  if (pathname.match(/\.(env|pem|key|sql)$/)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
