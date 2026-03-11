import { MercadoPagoConfig } from 'mercadopago';

// Fallback to a placeholder if the token is not set yet
export const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN || 'APP_USR-placeholder' 
});
