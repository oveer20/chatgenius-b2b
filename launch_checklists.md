# 🚀 Checklists para el Lanzamiento Comercial

Sigue estos pasos para pasar de "Modo Desarrollo" a "Modo Producción" y empezar a recibir pagos y clientes reales.

## 1. Stripe: Activación de Pagos Reales 💳
Para dejar de usar tarjetas de prueba y recibir dinero real:

1.  **Activa tu cuenta de Stripe**: Completa tu perfil empresarial en [dashboard.stripe.com](https://dashboard.stripe.com).
2.  **Obtén las 'Live Keys'**: Cambia el toggle de "Test Mode" a "Live Mode" y copia las nuevas claves (`pk_live...` y `sk_live...`).
3.  **Actualiza Vercel**:
    - Ve a la configuración de tu proyecto en Vercel.
    - Cambia `STRIPE_SECRET_KEY` y `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` por las versiones `live`.
4.  **Configura el Webhook de Producción**:
    - Crea un nuevo endpoint en Stripe apuntando a `https://tu-dominio.com/api/webhook/stripe`.
    - Copia el `STRIPE_WEBHOOK_SECRET` de producción a Vercel.

---

## 2. WhatsApp Business API: Verificación de Meta 📲
Para usar un número oficial de empresa sin riesgo de baneo:

1.  **Business Manager**: Crea o entra a tu cuenta en [business.facebook.com](https://business.facebook.com).
2.  **Verificación de Empresa**: Sube los documentos legales de tu negocio (Registro mercantil, facturas de servicios) en la sección "Centro de Seguridad".
3.  **App de WhatsApp**: Crea una nueva app tipo "Business" en el panel de desarrolladores de Meta.
4.  **Número de Teléfono**: Agrega un número que no tenga WhatsApp activo. Deberás recibir un código por SMS o llamada.
5.  **Token de Acceso Permanente**: Genera un System User Token para que la conexión no expire.

---

## 3. Email de Notificaciones (Resend) 📧
1.  **Dominio Propio**: En Resend, añade tu dominio (ej. `tuempresa.com`) y configura los registros DNS (SPF/DKIM) para que tus correos no lleguen a SPAM.
2.  **API Key**: Cambia la clave de prueba por una de producción en las variables de entorno de Vercel (`RESEND_API_KEY`).

---

## 4. Checklist Final de Seguridad 🔒
- [ ] Cambia las contraseñas de las bases de datos.
- [ ] Asegúrate de que las RLS (Row Level Security) de Supabase estén activas para las tablas `bots`, `leads` y `messages`.
- [ ] Solo permite dominios autorizados en el script del widget.
