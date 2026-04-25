# 🔐 Credential Rotation Guide

## Por qué rotar credenciales

Las siguientes credenciales estuvieron expuestas en el repositorio (`.env.local`, `.env.vercel`):
- Supabase keys
- Google Gemini API Key
- OpenAI API Key
- MercadoPago / Stripe tokens
- WhatsApp Access Token
- Resend API Key
- Firebase credentials

**Aunque los archivos ya se eliminaron del gitignore, las credenciales deben considerarse comprometidas.**

---

## Pasos para Rotar

### 1. Supabase

1. Ve a https://app.supabase.com
2. Selecciona tu proyecto
3. Ve a **Settings** → **API**
4. Haz clic en **Reveal** y luego en **Regenerate** para:
   - `anon` public key
   - `service_role` secret key
5. **Importante**: Actualiza las variables en Vercel inmediatamente

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=nuevo_anon_key_generado
SUPABASE_SERVICE_ROLE_KEY=nuevo_service_role_key_generado
```

---

### 2. Google Gemini API

1. Ve a https://aistudio.google.com/app/apikey
2. Haz clic en tu API key existente
3. Selecciona **Delete** o **Regenerate**
4. Crea una nueva key si es necesario
5. Actualiza en Vercel:

```
GOOGLE_GEMINI_API_KEY=nueva_key_generada
```

---

### 3. OpenAI API Key

1. Ve a https://platform.openai.com/api-keys
2. Encuentra tu key actual
3. Haz clic en **Delete** (OpenAI no permite regenerar, hay que crear una nueva)
4. Crea una nueva API key
5. Actualiza en Vercel:

```
OPENAI_API_KEY=sk-nueva_key_generada
```

---

### 4. Stripe

1. Ve a https://dashboard.stripe.com/apikeys
2. Para **Secret Key** (`sk_live_...`):
   - Haz clic en **Roll secret key**
3. Para **Webhook Secret** (`whsec_...`):
   - Ve a **Developers** → **Webhooks**
   - Selecciona tu webhook
   - Haz clic en **Add secret** o **Regenerate**
4. Actualiza en Vercel:

```
STRIPE_SECRET_KEY=sk_live_nueva_key_generada
STRIPE_WEBHOOK_SECRET=whsec_nuevo_secret_generado
```

---

### 5. MercadoPago

1. Ve a https://www.mercadopago.com.ar/developers/panel
2. Ve a **Tus integraciones** → **Credenciales de producción**
3. Haz clic en **Ver** y luego **Rotar** para:
   - Access Token
   - Public Key
4. Actualiza en Vercel:

```
MP_ACCESS_TOKEN=APP_USR-nuevo_token_generado
MP_PUBLIC_KEY=APP_USR-nueva_public_key_generada
```

---

### 6. WhatsApp Cloud API (Meta)

1. Ve a https://developers.facebook.com/apps/
2. Selecciona tu app de WhatsApp
3. Ve a **WhatsApp** → **API Setup**
4. Para rotar el **Access Token**:
   - Ve a **Users** → **System Users**
   - Selecciona el usuario del sistema
   - Haz clic en **Generate New Token**
5. Para el **Verify Token** (el que tú configuraste):
   - Simplemente cámbialo en tu código y en Meta
6. Actualiza en Vercel:

```
WHATSAPP_ACCESS_TOKEN=nuevo_token_generado
WHATSAPP_VERIFY_TOKEN=nuevo_verify_token_elegido_por_ti
WHATSAPP_PHONE_NUMBER_ID=tu_phone_number_id (no cambia)
```

---

### 7. Resend (Email)

1. Ve a https://resend.com/api-keys
2. Haz clic en **Create API Key** o **Revoke** la existente y crea una nueva
3. Actualiza en Vercel:

```
RESEND_API_KEY=re_nueva_key_generada
NOTIFICATION_EMAIL=admin@stratix.la
```

---

### 8. Firebase (Firebase Pulse)

1. Ve a https://console.firebase.google.com/
2. Selecciona tu proyecto
3. Ve a **Project Settings** → **Service Accounts**
4. Haz clic en **Generate New Private Key**
5. Esto descarga un JSON - copia TODO el contenido en una línea
6. Para las keys del cliente SDK:
   - Ve a **Project Settings** → **General** → **Your apps**
   - Copia las nuevas credenciales
7. Actualiza en Vercel:

```
FIREBASE_SERVICE_ACCOUNT='{"project_id":"...","private_key":"..."}'
NEXT_PUBLIC_FIREBASE_API_KEY=nueva_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxxxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxxxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxxxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxxxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxxxx
NEXT_PUBLIC_FIREBASE_VAPID_KEY=nuevo_vapid_key
```

---

### 9. JWT Secret

Este lo generas tú mismo. Usa este comando:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copia el output y actualiza en Vercel:

```
JWT_SECRET=output_generado_aqui
```

---

## Después de Rotar

### Checklist:

- [ ] Todas las credenciales rotadas
- [ ] Variables actualizadas en Vercel
- [ ] `.env.local` actualizado localmente
- [ ] Tests pasando localmente
- [ ] Deploy triggered en Vercel
- [ ] Verificar que WhatsApp webhooks funcionan
- [ ] Verificar que Stripe webhooks funcionan
- [ ] Verificar que login funciona

### Verificar en Vercel:

1. Ve a tu proyecto en Vercel
2. **Settings** → **Environment Variables**
3. Verifica que todas las variables estén actualizadas
4. Haz clic en **Redeploy** para que los cambios surtan efecto

---

## Prevención Futura

1. **Nunca commitear `.env*`** - Ya está en `.gitignore`
2. **Usar Vercel CLI** para sync de variables:
   ```bash
   vercel env pull
   ```
3. **Rotar cada 90 días** - Configurar recordatorio
4. **Usar pre-commit hooks** para detectar secrets:
   ```bash
   npm install -g git-secrets
   ```
