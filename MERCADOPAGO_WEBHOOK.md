# MERCADO PAGO WEBHOOK CONFIGURATION

## Webhook URL
```
https://stratix-intelligence-ia.vercel.app/api/webhook/mercadopago
```

## Steps to Configure

1. Go to https://mercadopago.com.co/admin/merchants
2. Select your merchant account
3. Go to **Notifications / Webhooks**
4. Add webhook URL: `https://stratix-intelligence-ia.vercel.app/api/webhook/mercadopago`
5. Select event: **Merchant Order** and **Payment**
6. Save

## Alternative: Via API

```bash
curl -X POST https://api.mercadopago.com/v1/webhooks \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://stratix-intelligence-ia.vercel.app/api/webhook/mercadopago",
    "events": ["merchant_order", "payment"]
  }'
```

## Test

After configuring, make a test payment - the webhook will activate the plan automatically.