# Stratix AI - Security Documentation

## Security Features Implemented

### 1. Environment Variables Protection
- `.env.local`, `.env.vercel` están en `.gitignore`
- Usar Vercel Environment Variables para producción
- **Acción requerida**: Rotar credenciales expuestas (ver `ROTATE_CREDENTIALS.md`)

### 2. Middleware Security (V2.0)
Ubicación: `src/middleware.ts`

**Protecciones activas:**
- Autenticación Supabase para rutas `/dashboard/*`
- Security headers (XSS, clickjacking, MIME sniffing)
- Rate limiting básico para `/api/*`
- Bloqueo de archivos sensibles (`.env`, `.pem`, `.key`, `.sql`)

### 3. Rate Limiting
Ubicación: `src/lib/rate-limit.ts`

**Endpoints protegidos:**
| Endpoint | Límite | Ventana |
|----------|--------|---------|
| `/api/chat` | 5 req | 1 segundo |
| `/api/auth` | 5 req | 1 minuto |
| `/api/checkout` | 10 req | 1 minuto |
| `/api/webhook` | 50 req | 1 segundo |
| `/api/leads` | 20 req | 1 minuto |

### 4. Webhook Signature Verification
Ubicación: `src/lib/webhook-verification.ts`

**Funciones disponibles:**
- `verifyStripeSignature()` - Verifica webhooks de Stripe
- `verifyWhatsAppSignature()` - Verifica webhooks de WhatsApp/Meta
- `verifyWhatsAppWebhook()` - Verificación inicial de setup

**Ejemplo de uso en API route:**
```typescript
import { verifyStripeSignature } from "@/lib/webhook-verification";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!verifyStripeSignature(body, signature, process.env.STRIPE_WEBHOOK_SECRET)) {
    return new Response("Invalid signature", { status: 401 });
  }

  // Procesar webhook...
}
```

### 5. Testing
Ubicación: `src/test/`

**Tests disponibles:**
- `rate-limit.test.ts` - Tests para rate limiter
- `webhook-verification.test.ts` - Tests para verificación de webhooks
- `smoke.test.ts` - Tests de humo generales

**Ejecutar tests:**
```bash
npm run test       # Tests en terminal
npm run test:ui    # Tests con UI
```

---

## Pending Security Actions

### 🔴 CRÍTICO (Hacer inmediatamente)

1. **Rotar credenciales expuestas**
   - Supabase Service Role Key
   - API keys de Gemini/OpenAI
   - Stripe/MercadoPago tokens
   - WhatsApp Access Token

2. **Configurar Vercel Environment Variables**
   - Ejecutar: `bash scripts/vercel-env-setup.sh`
   - Seguir instrucciones para configurar en dashboard

3. **Implementar rate limiting real**
   - El actual usa memoria (no funciona en múltiples instancias)
   - Recomendado: Upstash Redis o Supabase con TTL

### 🟡 IMPORTANTE

4. **Agregar logging de seguridad**
   - Logear intentos de acceso no autorizado
   - Logear rate limits excedidos

5. **Configurar CSP (Content Security Policy)**
   - Definir directivas para scripts, styles, imágenes

6. **Habilitar HTTPS forzado**
   - Configurar en Vercel o agregar redirect en middleware

---

## Security Checklist para Producción

- [ ] Credenciales rotadas
- [ ] Variables en Vercel configuradas
- [ ] Webhooks con verificación de firma
- [ ] Rate limiting con Redis
- [ ] HTTPS forzado
- [ ] CSP headers configurados
- [ ] Logging de seguridad activo
- [ ] Tests de seguridad pasando

---

## Contacto para Reportar Vulnerabilidades

Email: security@stratix.la
