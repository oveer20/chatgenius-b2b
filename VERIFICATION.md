# Verificación - Stratix Intelligence

## Endpoints Verificados (Producción)

| Endpoint | Status | URL |
|----------|--------|-----|
| Landing | ✅ | https://stratix-intelligence-ia.vercel.app |
| Health Check | ✅ | /api/health-check → 200 |
| Widget Bot (público) | ✅ | /api/widget/bots → trae agente |
| Widget | ✅ | /widget |
| Login | ✅ | /login |
| Dashboard | ✅ | /dashboard |

## Cómo usar el sistema

### 1. Crear nuevo agente
1. Ir a https://stratix-intelligence-ia.vercel.app/login
2. Login con email
3. Dashboard → "Nuevo Agente"
4. Llenar: nombre, prompt, modelo
5. Guardar

### 2. Para clientes (widget público)
- El widget siempre carga el **último agente creado**
- No requiere login
- URL: `https://stratix-intelligence-ia.vercel.app/widget`

### 3. Para embedding en web del cliente
```html
<iframe 
  src="https://stratix-intelligence-ia.vercel.app/widget" 
  width="100%" 
  height="600" 
  frameborder="0">
</iframe>
```

### 4. Por API (para developers)
```bash
# Obtener agente actual
curl https://stratix-intelligence-ia.vercel.app/api/widget/bots

# Chat con el agente (requiere API key)
curl -X POST https://stratix-intelligence-ia.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hola"}],"systemPrompt":"..."}'
```

## Checklist de Producción

- [x] Supabase: ✅
- [x] Gemini API: ✅
- [x] WhatsApp Business: ✅ (falta webhook en Meta)
- [x] MercadoPago: ✅
- [x] Firebase: ✅
- [x] Widget público: ✅
- [x] Build: ✅ sin errores
- [x] Deploy: ✅

## Notas
- El agente default es "Asesor de Ventas Stratix"
- Para cambiar, crear nuevo agente desde dashboard
- El widget siempre muestra el agente más reciente