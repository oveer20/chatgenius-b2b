# Guía de Configuración - Stratix Intelligence

## 1. WhatsApp Business API

### Paso 1: Crear cuenta de Meta Business
1. Ve a https://business.facebook.com
2. Crea una cuenta de Business
3. Verifica tu negocio

### Paso 2: Crear WhatsApp Business Account
1. En Meta Business Suite, ve a "WhatsApp"
2. Click "Configurar WhatsApp Business"
3. Sigue las instrucciones

### Paso 3: Obtener credentials
1. Ve a https://developers.facebook.com/apps
2. Crea una app o selecciona la existente
3. En "WhatsApp" → "API de WhatsApp Business"
4. Copia:
   - **Phone Number ID**
   - **WhatsApp Business Account ID**
   - **Token de acceso permanente**

### Paso 4: Configurar en Vercel
```bash
vercel env add WHATSAPP_PHONE_NUMBER_ID production
# Ingresa: tu_phone_number_id

vercel env add WHATSAPP_ACCESS_TOKEN production  
# Ingresa: tu_access_token

vercel env add WHATSAPP_WEBHOOK_VERIFY_TOKEN production
# Ingresa: stratix_secret_token
```

### Paso 5: Configurar webhook
1. En Meta Developers, ve a Webhooks
2. Suscribe a: `messages`, `message_deliveries`, `message_reads`
3. URL: `https://stratix-intelligence-ia.vercel.app/api/webhook/whatsapp`
4. Verify Token: `stratix_secret_token`

---

## 2. MercadoPago

### Paso 1: Crear cuenta
1. Ve a https://www.mercadopago.com.co
2. Crea cuenta de vendedor

### Paso 2: Obtener credentials
1. Ve a https://mercadopago.com.co/developers
2. Panel → Credenciales
3. Copia:
   - **Access Token** (producción)
   - **Public Key**

### Paso 3: Configurar en Vercel
```bash
vercel env add MP_ACCESS_TOKEN production
# Ingresa tu access token de MercadoPago

vercel env add NEXT_PUBLIC_MP_PUBLIC_KEY production
# Ingresa tu public key
```

### Paso 4: Configurar webhook
1. En MercadoPago Developers → Webhooks
2. URL: `https://stratix-intelligence-ia.vercel.app/api/webhooks/mercadopago`

---

## 3. Firebase (para notificaciones push)

### Paso 1: Crear proyecto Firebase
1. Ve a https://console.firebase.google.com
2. Crea nuevo proyecto

### Paso 2: Obtener configuración
1. Configuración del proyecto → General
2. Copia: `apiKey`, `authDomain`, `projectId`, etc.

### Paso 3: Configurar Cloud Messaging
1. Configuración → Cloud Messaging
2. Genera clave de servidor (VAPID)

### Paso 4: Configurar en Vercel
```bash
vercel env add FIREBASE_API_KEY production
vercel env add FIREBASE_AUTH_DOMAIN production
vercel env add FIREBASE_PROJECT_ID production
vercel env add FIREBASE_MESSAGING_SENDER_ID production
vercel env add FIREBASE_APP_ID production
```

---

## 4. Dominio personalizado (opcional)

### Para stratix.la:
1. Ve a Vercel Dashboard → Settings → Domains
2. Agrega: `stratix.la`
3. Configura los DNS:
   - A: @ → Vercel IP
   - CNAME: www → cname.vercel-dns.com

---

## Checklist Final

- [ ] Supabase: ✅ Configurado
- [ ] Gemini API: ✅ Configurado
- [ ] WhatsApp Business: ✅ Configurado
- [ ] MercadoPago: ✅ Configurado
- [ ] Firebase: ✅ Configurado
- [ ] Dominio: ⬜ Por hacer (opcional)

---

## Soporte

Email: stratixintelligence@gmail.com
WhatsApp: https://wa.me/573159269287