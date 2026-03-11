This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

### 🚀 Despliegue en Vercel (Producción)

1. Sube este código a un repositorio privado en **GitHub**.
2. Conecta el repositorio en [Vercel](https://vercel.com).
3. Configura las siguientes variables de entorno:
   - `OPENAI_API_KEY`: Tu llave de producción de OpenAI.
   - `STRIPE_SECRET_KEY`: Tu llave de Stripe (modo Live).
   - `NEXT_PUBLIC_SUPABASE_URL`: URL de tu proyecto Supabase.
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: API Key anon de Supabase.
   - `NEXT_PUBLIC_APP_URL`: La URL final de tu dominio (ej: `https://chatgenius.ai`).
4. ¡Listo! Tu SaaS estará vivo.

## 🛠️ Estructura del Proyecto
- `/src/app`: Rutas del Dashboard y Landing.
- `/public/widget.js`: El motor del chat para los clientes.
- `/src/api/widget/chat`: El endpoint que procesa los mensajes del widget.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
