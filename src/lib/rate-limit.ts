/**
 * STRATIX AI - Rate Limiter Middleware
 * Implementa throttling para endpoints de API usando un enfoque simple basado en memoria.
 * Para producción, considera usar Redis o Supabase para almacenamiento distribuido.
 */

type RateLimitConfig = {
  interval: number; // ventana de tiempo en ms
  maxRequests: number; // maximo de requests por ventana
};

type Window = {
  start: number;
  count: number;
};

const windows = new Map<string, Window>();

const defaultConfig: RateLimitConfig = {
  interval: 60 * 1000, // 1 minuto
  maxRequests: 10,
};

// Configs específicas por endpoint
export const rateLimitConfigs: Record<string, RateLimitConfig> = {
  '/api/chat': { interval: 1000, maxRequests: 5 }, // 5 req/segundo
  '/api/leads': { interval: 60000, maxRequests: 20 }, // 20 req/minuto
  '/api/webhook': { interval: 1000, maxRequests: 50 }, // 50 req/segundo para webhooks
  '/api/auth': { interval: 60000, maxRequests: 5 }, // 5 intentos/minuto
  '/api/checkout': { interval: 60000, maxRequests: 10 }, // 10 checkouts/minuto
};

export function checkRateLimit(identifier: string, config: RateLimitConfig = defaultConfig): {
  allowed: boolean;
  remaining: number;
  resetAt: number;
} {
  const now = Date.now();
  const key = `${config.interval}-${identifier}`;
  const window = windows.get(key);

  if (!window || now - window.start > config.interval) {
    // Nueva ventana
    windows.set(key, { start: now, count: 1 });
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetAt: now + config.interval,
    };
  }

  if (window.count >= config.maxRequests) {
    // Rate limit excedido
    return {
      allowed: false,
      remaining: 0,
      resetAt: window.start + config.interval,
    };
  }

  // Incrementar contador
  window.count++;
  return {
    allowed: true,
    remaining: config.maxRequests - window.count,
    resetAt: window.start + config.interval,
  };
}

export function createRateLimitHandler(endpoint: string) {
  const config = rateLimitConfigs[endpoint] || defaultConfig;

  return (identifier: string) => {
    return checkRateLimit(`${endpoint}:${identifier}`, config);
  };
}

// Cleanup de ventanas expiradas (ejecutar periodicamente)
export function cleanupExpiredWindows() {
  const now = Date.now();
  const maxInterval = Math.max(...Object.values(rateLimitConfigs).map(c => c.interval));

  for (const [key, window] of windows.entries()) {
    if (now - window.start > maxInterval * 2) {
      windows.delete(key);
    }
  }
}
