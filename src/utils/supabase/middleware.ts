import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("⚠️ Advertencia: Variables de Supabase no encontradas en el Middleware. Continuando sin sesión.");
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

  try {
    // Refresca el token si es necesario
    const { data: { user } } = await supabase.auth.getUser();

    const pathname = request.nextUrl.pathname;

    // Protección de rutas: Redirigir a /login si no hay usuario en /dashboard
    if (!user && pathname.startsWith("/dashboard")) {
      const url = new URL("/login", request.url);
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }

    // Redirigir a /dashboard si ya hay usuario en /login
    if (user && pathname.startsWith("/login")) {
      const url = new URL("/dashboard", request.url);
      return NextResponse.redirect(url);
    }
  } catch (e) {
    console.error("❌ Error en Middleware de Supabase:", e);
  }

  return response;
}
