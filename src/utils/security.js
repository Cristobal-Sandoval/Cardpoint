// Utilidades de seguridad — CardPoint
// Principio: NINGÚN secreto vive en este archivo ni en el bundle.
// Los valores sensibles (slug de acceso, hash de palabra, secuencia de clicks)
// se leen en runtime desde Supabase (admin_settings) y nunca se commitean.

const DANGEROUS_TAGS = /<\/?(script|iframe|object|embed|link|style|meta|base|form|input|button|textarea|select|option|noscript|template|slot|canvas|svg|math)[^>]*>/gi;
const EVENT_ATTRS = /\s+on[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi;
const JS_URLS = /\b(href|src|xlink:href|action)\s*=\s*("javascript:[^"]*"|'javascript:[^']*'|javascript:[^\s>]+)/gi;
const DATA_TEXT_HTML = /\b(href|src)\s*=\s*("data:text\/html[^"]*"|'data:text\/html[^']*')/gi;

/** Sanitiza HTML externo (noticias scrapeadas) antes de dangerouslySetInnerHTML. */
export function sanitizeExternalHtml(html) {
  if (!html || typeof html !== 'string') return '';
  return html
    .replace(DANGEROUS_TAGS, '')
    .replace(EVENT_ATTRS, '')
    .replace(JS_URLS, '$1="#"')
    .replace(DATA_TEXT_HTML, '$1="#"');
}

/** SHA-256 hex con SubtleCrypto. Retorna '' si no hay crypto disponible (http inseguro viejo). */
export async function sha256Hex(str) {
  try {
    const cryptoObj = typeof window !== 'undefined' ? window.crypto : globalThis.crypto;
    if (!cryptoObj?.subtle) return '';
    const data = new TextEncoder().encode(String(str));
    const digest = await cryptoObj.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  } catch {
    return '';
  }
}

/** Comparación en tiempo constante para hashes (evita timing attacks básicos). */
export function timingSafeEqual(a, b) {
  const sa = String(a || '');
  const sb = String(b || '');
  if (!sa || !sb || sa.length !== sb.length) return false;
  let diff = 0;
  for (let i = 0; i < sa.length; i++) {
    diff |= sa.charCodeAt(i) ^ sb.charCodeAt(i);
  }
  return diff === 0;
}

// ── Rate limit / lockout para intentos de acceso stealth (local, anti-fuerza bruta) ──
const RL_KEY = 'cp_stealth_rl';

function readRL() {
  try {
    return JSON.parse(localStorage.getItem(RL_KEY) || '{"fails":0,"lockedUntil":0}');
  } catch {
    return { fails: 0, lockedUntil: 0 };
  }
}

export function isStealthLocked() {
  const rl = readRL();
  return Date.now() < (rl.lockedUntil || 0);
}

export function stealthLockRemainingSec() {
  const rl = readRL();
  return Math.max(0, Math.ceil(((rl.lockedUntil || 0) - Date.now()) / 1000));
}

/** Registra un intento fallido. A los 5 fallos bloquea 5 minutos (progresivo simple). */
export function registerStealthFail() {
  try {
    const rl = readRL();
    const fails = (rl.fails || 0) + 1;
    const lockedUntil = fails >= 5 ? Date.now() + 5 * 60 * 1000 : rl.lockedUntil || 0;
    localStorage.setItem(RL_KEY, JSON.stringify({ fails, lockedUntil }));
    return { fails, lockedUntil };
  } catch {
    return { fails: 0, lockedUntil: 0 };
  }
}

export function resetStealthFails() {
  try {
    localStorage.setItem(RL_KEY, JSON.stringify({ fails: 0, lockedUntil: 0 }));
  } catch {
    /* noop */
  }
}

// ── Validación de IDs de tracking antes de inyectar scripts (anti stored-XSS) ──
const TRACKING_PATTERNS = {
  gtm: /^GTM-[A-Z0-9]{4,}$/i,
  pixel: /^\d{8,20}$/,
  clarity: /^[a-z0-9]{6,20}$/i,
};

export function isValidTrackingId(kind, value) {
  if (!value || typeof value !== 'string') return false;
  const v = value.trim();
  if (v.includes('<') || v.includes('>') || v.includes('"') || v.includes("'") || v.includes(';')) return false;
  const re = TRACKING_PATTERNS[kind];
  return re ? re.test(v) : false;
}

// ── Unlock token de sesión (doble factor de oscuridad: gesto + slug) ──
const UNLOCK_KEY = 'cp_stealth_unlock';
const UNLOCK_TTL_MS = 10 * 60 * 1000;

export function grantStealthUnlock() {
  try {
    sessionStorage.setItem(UNLOCK_KEY, JSON.stringify({ at: Date.now() }));
  } catch {
    /* noop */
  }
}

export function hasStealthUnlock() {
  try {
    const raw = sessionStorage.getItem(UNLOCK_KEY);
    if (!raw) return false;
    const { at } = JSON.parse(raw);
    return Date.now() - (at || 0) < UNLOCK_TTL_MS;
  } catch {
    return false;
  }
}
