import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://satlrnugppdesfauxzrw.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhdGxybnVncHBkZXNmYXV4enJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwMzE0NDQsImV4cCI6MjA5NjYwNzQ0NH0.L2g1dhmNJfwg7_UjcX7642JSu6umvrFTbCyRltlleZs'

// Custom fetch wrapper con timeout de 6 segundos para evitar bloqueos por DNS/IPv6 en conexiones Wi-Fi
const fetchWithTimeout = async (url, options = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);
  try {
    const response = await fetch(url, {
      ...options,
      signal: options.signal || controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
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
