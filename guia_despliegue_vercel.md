# Guía de Despliegue: ChatGenius B2B 🚀 (Vercel)

Sigue estos pasos para subir tu app a la nube y tener una URL pública hoy mismo.

## 1. Preparación del Código
Asegúrate de que todo el código esté en la carpeta del proyecto.
- No olvides que el archivo `.env.example` servirá de guía para las variables en Vercel.

## 2. GitHub (El Puente)
1. Crea un repositorio en [GitHub](https://github.com/new). Nombre recomendado: `chat-genius-b2b`.
2. Sube tu código (Ignorando `.env.local`).
   ```bash
   git init
   git add .
   git commit -m "Launch ready"
   git remote add origin https://github.com/tu-usuario/mi-repo.git
   git push -u origin main
   ```

## 3. Conexión con Vercel
1. Entra a [vercel.com](https://vercel.com) e inicia sesión con GitHub.
2. Haz clic en **"Add New" -> "Project"**.
3. Selecciona tu repositorio recién creado.

## 4. Configuración de Variables de Entorno (CRÍTICO) 🔑
En la pantalla de "Configure Project", despliega **"Environment Variables"** y añade las siguientes tal cual están en tu código:

| Key | Value (Ejemplo) |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Tu URL de Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Tu Anon Key |
| `STRIPE_SECRET_KEY` | Tu llave de Stripe (Live/Test) |
| `OPENAI_API_KEY` | Tu llave de OpenAI |
| `NEXT_PUBLIC_APP_URL` | La URL que te asigne Vercel (ej: `https://chat-genius-alpha.vercel.app`) |

## 5. Deployment Final
Haz clic en **"Deploy"**. En unos 60-90 segundos, tu web estará en vivo para todo el mundo.

---

### Verificación Post-Despliegue
Una vez que el despliegue termine:
1. Entra a la URL de Vercel.
2. Prueba que la Landing Page cargue correctamente.
3. Intenta entrar a `/dashboard` y crear un bot de prueba.
4. **Prueba el Widget**: Entra a tu web de Vercel + `/test-widget.html` para ver el widget funcionando en la nube.
