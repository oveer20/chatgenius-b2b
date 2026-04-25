#!/bin/bash
# STRATIX AI - Vercel Environment Setup Script
# Este script ayuda a configurar las variables de entorno en Vercel
# NO ejecutes esto si no tienes el Vercel CLI instalado

echo "🛡️ Stratix AI - Vercel Environment Setup"
echo "========================================"
echo ""

# Verificar si Vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI no está instalado. Instálalo con: npm i -g vercel"
    exit 1
fi

# Verificar si estamos logueados
if ! vercel whoami &> /dev/null; then
    echo "❌ No estás logueado en Vercel. Ejecuta: vercel login"
    exit 1
fi

echo "✅ Vercel CLI detectado y usuario logueado"
echo ""

# Obtener el proyecto
PROJECT_NAME="stratix-intelligence"
echo "📦 Proyecto: $PROJECT_NAME"
echo ""

# Instrucciones para el usuario
echo "📋 Sigue estos pasos en el dashboard de Vercel:"
echo ""
echo "1. Ve a https://vercel.com/dashboard"
echo "2. Selecciona tu proyecto (o impórtalo desde Git)"
echo "3. Ve a Settings → Environment Variables"
echo "4. Agrega las siguientes variables:"
echo ""
echo "   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   SUPABASE:"
echo "   - NEXT_PUBLIC_SUPABASE_URL"
echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "   - SUPABASE_SERVICE_ROLE_KEY"
echo ""
echo "   AI:"
echo "   - GOOGLE_GEMINI_API_KEY"
echo "   - OPENAI_API_KEY"
echo ""
echo "   PAGOS:"
echo "   - MP_ACCESS_TOKEN (MercadoPago)"
echo "   - MP_PUBLIC_KEY"
echo "   - STRIPE_SECRET_KEY"
echo "   - STRIPE_WEBHOOK_SECRET"
echo ""
echo "   COMUNICACIÓN:"
echo "   - WHATSAPP_ACCESS_TOKEN"
echo "   - WHATSAPP_VERIFY_TOKEN"
echo "   - WHATSAPP_PHONE_NUMBER_ID"
echo "   - RESEND_API_KEY"
echo "   - NOTIFICATION_EMAIL"
echo ""
echo "   FIREBASE (Firebase Pulse):"
echo "   - FIREBASE_SERVICE_ACCOUNT (JSON en una línea)"
echo "   - NEXT_PUBLIC_FIREBASE_API_KEY"
echo "   - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"
echo "   - NEXT_PUBLIC_FIREBASE_PROJECT_ID"
echo "   - NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"
echo "   - NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"
echo "   - NEXT_PUBLIC_FIREBASE_APP_ID"
echo "   - NEXT_PUBLIC_FIREBASE_VAPID_KEY"
echo ""
echo "   SEGURIDAD:"
echo "   - JWT_SECRET"
echo "   - NEXT_PUBLIC_APP_URL"
echo "   - APP_URL"
echo "   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "⚠️ IMPORTANTE: Después de configurar las variables, haz un redeploy"
echo ""
echo "🔗 Link directo: https://vercel.com/settings/environment-variables"
echo ""
