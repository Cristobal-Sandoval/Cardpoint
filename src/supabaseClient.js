import { createClient } from '@supabase/supabase-js'

// Las claves se leen de variables de entorno (nunca commitear .env).
// Fallback provisorio para no romper el desarrollo antes de enlazar
// Supabase/Cloudinary definitivo. Al rotar, basta setear el .env.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://satlrnugppdesfauxzrw.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_C2ZHLCdaqyl7m4nr3ImPLQ_c-eG27cU'

if (!import.meta.env.VITE_SUPABASE_ANON_KEY && import.meta.env.DEV) {
  console.warn('[CardPoint] Usando clave Supabase provisoria (fallback). Define VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en tu .env local (no commitear).');
}

// Custom fetch wrapper con timeout de 6 segundos para evitar bloqueos por DNS/IPv6 en conexiones Wi-Fi
const fetchWithTimeout = async (url, options = {}) => {
  const timeoutSignal = AbortSignal.timeout(6000);
  const signal = options.signal
    ? AbortSignal.any([options.signal, timeoutSignal])
    : timeoutSignal;
  return fetch(url, { ...options, signal });
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: {
    fetch: fetchWithTimeout,
  },
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
