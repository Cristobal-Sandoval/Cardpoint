import { Suspense, lazy, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient.js';
import {
  sha256Hex,
  timingSafeEqual,
  hasStealthUnlock,
  isStealthLocked,
  registerStealthFail,
} from '../utils/security.js';

const AdminApp = lazy(() => import('../admin/AdminApp.jsx'));

export function AdminLoadingScreen() {
  return (
    <div className="min-h-screen bg-[#0a0d14] flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-[#0052FF] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400 mt-4 text-sm font-semibold">Cargando...</p>
      </div>
    </div>
  );
}

// Puerta stealth: valida el slug contra el hash guardado en Supabase
// (admin_settings.admin_route_hash) + exige unlock reciente por gesto.
// Sin config en DB o sin gesto previo, el llamador decide el fallback.
// El slug NUNCA está escrito en el código ni en el bundle.
export function AdminGate({ fallback }) {
  const { adminSlug } = useParams();
  const [granted, setGranted] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        if (!hasStealthUnlock()) {
          if (!cancelled) setGranted(false);
          return;
        }
        const { data, error } = await supabase
          .from('admin_settings')
          .select('data')
          .eq('id', 'admin_route_hash')
          .single();
        if (error || !data?.data) {
          if (!cancelled) setGranted(false);
          return;
        }
        const h = await sha256Hex(adminSlug || '');
        if (!cancelled) setGranted(!!h && timingSafeEqual(h, String(data.data).toLowerCase()));
      } catch {
        if (!cancelled) setGranted(false);
      }
    })();
    return () => { cancelled = true; };
  }, [adminSlug]);

  if (granted === null) return <AdminLoadingScreen />;
  if (!granted) return fallback;
  return (
    <Suspense fallback={<AdminLoadingScreen />}>
      <AdminApp />
    </Suspense>
  );
}

// Señuelo para la ruta legacy: solo se activa si en DB
// admin_settings.admin_legacy_decoy = true. Siempre falla, loguea el intento.
export function DecoyAdmin() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFakeLogin = async (e) => {
    e.preventDefault();
    if (isStealthLocked()) {
      setError('Demasiados intentos. Intenta más tarde.');
      return;
    }
    setLoading(true);
    setError('');
    registerStealthFail();
    try {
      await supabase.from('admin_access_logs').insert([{ via: 'decoy', at: new Date().toISOString() }]);
    } catch {
      /* tabla opcional */
    }
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setError('Credenciales incorrectas. Verifica tu email y contraseña.');
  };

  return (
    <div className="min-h-screen bg-[#080a10] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="font-black text-3xl tracking-tight mb-1">
            <span className="text-white">CARD</span>
            <span className="text-[#0052FF]">POINT</span>
            <span className="text-white">.CL</span>
          </div>
          <span className="text-xs font-bold tracking-[0.3em] text-slate-500 uppercase">Panel de Administración</span>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-1">Iniciar sesión</h2>
          <p className="text-slate-500 text-sm mb-6">Ingresa tus credenciales de administrador</p>
          {error && (
            <div className="bg-red-900/30 border border-red-500/30 text-red-400 text-sm rounded-xl p-3 mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleFakeLogin} className="space-y-4">
            <input
              type="email"
              required
              placeholder="admin@cardpoint.cl"
              autoComplete="email"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none"
            />
            <input
              type="password"
              required
              placeholder="••••••••"
              autoComplete="current-password"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#0052FF] text-white font-bold rounded-xl disabled:opacity-60"
            >
              {loading ? 'Iniciando sesión...' : 'Entrar al panel'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// Ruta legacy: funciona normal salvo que actives el señuelo en DB.
export function LegacyAdminRoute() {
  const [decoy, setDecoy] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await supabase
          .from('admin_settings')
          .select('data')
          .eq('id', 'admin_legacy_decoy')
          .single();
        if (!cancelled) setDecoy(data?.data === true);
      } catch {
        if (!cancelled) setDecoy(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  if (decoy === null) return <AdminLoadingScreen />;
  if (decoy) return <DecoyAdmin />;
  return (
    <Suspense fallback={<AdminLoadingScreen />}>
      <AdminApp />
    </Suspense>
  );
}
