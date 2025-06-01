import { NextRequest } from 'next/server';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

export interface RateLimitConfig {
  windowMs: number; // Okno czasowe w milisekundach
  maxRequests: number; // Maksymalna liczba requestów w oknie
}

export function rateLimit(config: RateLimitConfig) {
  return function checkRateLimit(request: NextRequest): { success: boolean; limit: number; remaining: number; reset: number } {
    const ip = getClientIP(request);
    const key = `${ip}:${request.nextUrl.pathname}`;
    const now = Date.now();
    
    // Wyczyść stare wpisy
    if (store[key] && now > store[key].resetTime) {
      delete store[key];
    }
    
    // Inicjalizuj lub zaktualizuj licznik
    if (!store[key]) {
      store[key] = {
        count: 1,
        resetTime: now + config.windowMs
      };
    } else {
      store[key].count++;
    }
    
    const isAllowed = store[key].count <= config.maxRequests;
    const remaining = Math.max(0, config.maxRequests - store[key].count);
    const reset = Math.ceil((store[key].resetTime - now) / 1000);
    
    return {
      success: isAllowed,
      limit: config.maxRequests,
      remaining,
      reset
    };
  };
}

function getClientIP(request: NextRequest): string {
  // Sprawdź różne nagłówki dla IP klienta
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  
  // Fallback dla development
  return '127.0.0.1';
}

// Predefiniowane konfiguracje
export const rateLimitConfigs = {
  // Formularz kontaktowy - 5 requestów na 15 minut
  contact: {
    windowMs: 15 * 60 * 1000, // 15 minut
    maxRequests: 5
  },
  
  // API specjalistów - 100 requestów na minutę
  api: {
    windowMs: 60 * 1000, // 1 minuta
    maxRequests: 100
  },
  
  // Logowanie admin - 5 prób na 15 minut
  auth: {
    windowMs: 15 * 60 * 1000, // 15 minut
    maxRequests: 5
  }
}; 