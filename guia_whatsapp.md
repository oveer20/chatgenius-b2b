
# 🟢 Guía Maestra: Conexión de WhatsApp Cloud API

Sigue estos pasos para que tu bot de Stratix AI empiece a responder por WhatsApp.

## 1. Crear una App en Meta for Developers
1. Ve a [developers.facebook.com](https://developers.facebook.com/) e inicia sesión.
2. Haz clic en **"Mis aplicaciones"** -> **"Crear aplicación"**.
3. Selecciona el tipo de app **"Otro"** -> **"Siguiente"**.
4. Elige **"Empresa"** como tipo de aplicación.
5. Dale un nombre (ej. `Stratix AI_Bot`) y confirma.

## 2. Configurar el Producto de WhatsApp
1. En el panel lateral, busca **"WhatsApp"** y haz clic en **"Configurar"**.
2. Te pedirá elegir/crear una cuenta comercial de Meta (Meta Business Account). Selecciona la tuya.

## 3. Obtener el Token de Acceso Temporal (Prueba)
1. En el menú de WhatsApp, ve a **"Primeros pasos"**.
2. Ahí verás un **"Identificador de número de teléfono"** y un **"Identificador de cuenta de WhatsApp Business"**.
3. **¡Cópialos!** Los necesitaremos en las variables de entorno de Vercel.

## 4. Configurar el Webhook (Cerebro del Bot)
1. En el menú lateral de WhatsApp, ve a **"Configuración"**.
2. Haz clic en **"Editar"** en la sección de Webhooks.
3. **URL de devolución de llamada**: `https://arsenex-ai-b2b.vercel.app/api/webhook/whatsapp`
4. **Token de verificación**: `arsenex-ai_secret_token_2024` (Este es el que configuramos en tu código).
5. Haz clic en **"Verificar y guardar"**.
6. **MUY IMPORTANTE**: Haz clic en **"Administrar"** (Webhooks) y suscríbete al campo `messages`. Si no haces esto, el bot no recibirá nada.

## 5. Pasar a Producción (Token Permanente)
El token que te dan al inicio dura 24 horas. Para que sea permanente:
1. Ve a la configuración de tu **Meta Business Suite**.
2. Crea un **Sistema de Usuario** (en Usuarios del sistema).
3. Asígnale el rol de **Administrador**.
4. Haz clic en **"Generar nuevo token"**.
5. Selecciona tu App y marca los permisos: `whatsapp_business_messaging` y `whatsapp_business_management`.
6. Copia ese token y guárdalo en las variables de entorno de Vercel como `WHATSAPP_TOKEN`.

---

### ¿Necesitas ayuda?
Avísame cuando tengas los IDs y el Token para que los configuremos juntos en Vercel. Una vez hecho esto, ¡tu bot vivirá en WhatsApp!
