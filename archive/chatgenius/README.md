# ChatGenius Landing Page

Landing page revolucionaria para ChatGenius SaaS. Construida con **Next.js 14 + TypeScript + Tailwind CSS + Framer Motion**.

## Stack

| Tech | Uso |
|------|-----|
| Next.js 14 | App Router, SSR, metadata |
| TypeScript | Type safety completo |
| Tailwind CSS v3 | Estilos utilitarios |
| Framer Motion | Animaciones de scroll y entrada |

## Estructura

```
src/
├── app/
│   ├── layout.tsx          # Root layout + metadata SEO
│   ├── page.tsx            # Ensambla todas las secciones
│   └── globals.css         # Design tokens + fuentes
│
└── components/
    ├── ui/
    │   ├── AnimatedBackground.tsx   # Canvas orbs + grid animado
    │   ├── Button.tsx               # Botón reutilizable (primary/outline/ghost)
    │   ├── Reveal.tsx               # Wrapper de animación scroll
    │   └── SectionLabel.tsx         # Etiqueta de sección con línea
    │
    └── sections/
        ├── Navbar.tsx         # Nav fijo con blur + scroll effect
        ├── Hero.tsx           # Hero + chat demo con typewriter
        ├── Logos.tsx          # Social proof logos
        ├── Features.tsx       # Bento grid de características
        ├── HowItWorks.tsx     # 4 pasos horizontales
        ├── Pricing.tsx        # 3 planes de precio
        ├── Testimonials.tsx   # Grid de testimonios
        ├── CTA.tsx            # Call to action final
        └── Footer.tsx         # Footer con columnas de links
```

## Setup rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Servidor de desarrollo
npm run dev
# → http://localhost:3000

# 3. Build de producción
npm run build
npm start
```

## Deploy en Vercel

```bash
# Con Vercel CLI
npx vercel

# O conecta el repo en vercel.com → New Project → Import Git Repository
```

## Personalización

### Colores (globals.css)
```css
:root {
  --accent: #00e5a0;        /* Verde esmeralda → cambia a tu color */
  --bg: #070910;            /* Fondo principal */
  --text-primary: #f0f2f8;  /* Texto principal */
}
```

### Contenido
- **Hero**: edita `AI_RESPONSE` en `Hero.tsx`
- **Features**: edita el array en `Features.tsx`
- **Pricing**: edita `PLANS` en `Pricing.tsx`
- **Testimonios**: edita `TESTIMONIALS` en `Testimonials.tsx`
- **Footer**: edita `FOOTER_COLS` en `Footer.tsx`

### Fuentes (globals.css)
Cambia el import de Google Fonts por las fuentes que prefieras.

## Performance

- ✅ Componentes server-side por defecto (solo `"use client"` donde se necesita)
- ✅ Fonts con `display=swap` para evitar FOUT
- ✅ Imágenes optimizadas con `next/image`
- ✅ Animaciones desactivadas si el usuario prefiere `reduced-motion`
