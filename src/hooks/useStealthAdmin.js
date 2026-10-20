import { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import {
  sha256Hex,
  timingSafeEqual,
  isStealthLocked,
  registerStealthFail,
  resetStealthFails,
  grantStealthUnlock,
} from '../utils/security';

// Acceso stealth al admin — CardPoint
// ─────────────────────────────────────────────────────────────
// SEGURIDAD: este hook NO contiene secretos. Todo (slug de ruta,
// hash SHA-256 de la palabra, secuencia de hotspots) se lee en
// runtime desde Supabase `admin_settings` y se configura con SQL
// fuera del repo (ver scripts/setup-admin-access.sql).
// Si Supabase no responde o no hay config, el acceso stealth queda
// DESHABILITADO (fail-closed). La puerta real sigue siendo
// Supabase Auth + RLS; esto solo oculta dónde está la puerta.
//
// HOTSPOTS: cualquier elemento con `data-admin-hotspot="<id>"`
// participa. IDs actuales: "brand" (logo header), "legal" (© footer).
// Cuando exista la sección Otakonce, basta agregar
// `data-admin-hotspot="otakonce"` a su banner/contenedor y sumar
// {"id":"otakonce","clicks":N} a la secuencia en DB. Sin tocar código.

const CLICK_WINDOW_MS = 4000;
const WORD_BUFFER_MAX = 32;
const WORD_IDLE_RESET_MS = 3000;

function isTypingTarget(el) {
  if (!el) return false;
  const tag = (el.tagName || '').toLowerCase();
  return (
    tag === 'input' ||
    tag === 'textarea' ||
    tag === 'select' ||
    el.isContentEditable
  );
}

export function useStealthAdmin() {
  const navigate = useNavigate();
  const cfgRef = useRef({ slug: '', wordHash: '', sequence: [] });
  const progressRef = useRef({ stepIdx: 0, count: 0, firstAt: 0 });
  const wordBufRef = useRef('');
  const wordTimerRef = useRef(null);
  const readyRef = useRef(false);

  // Cargar config sensible solo desde Supabase (nunca del bundle)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data, error } = await supabase
          .from('admin_settings')
          .select('id,data')
          .in('id', ['admin_route', 'admin_access_word_hash', 'admin_hotspots']);
        if (error || !data || cancelled) return;
        const byId = Object.fromEntries(data.map((r) => [r.id, r.data]));
        const slug = typeof byId.admin_route === 'string' ? byId.admin_route.replace(/^\/+|\/+$/g, '') : '';
        const wordHash = typeof byId.admin_access_word_hash === 'string' ? byId.admin_access_word_hash : '';
        const sequence = Array.isArray(byId.admin_hotspots) ? byId.admin_hotspots : [];
        const validSeq = sequence.filter(
          (s) => s && typeof s.id === 'string' && Number.isFinite(Number(s.clicks)) && Number(s.clicks) > 0,
        );
        if (slug && wordHash && validSeq.length > 0) {
          cfgRef.current = { slug, wordHash: wordHash.toLowerCase(), sequence: validSeq };
          readyRef.current = true;
        }
      } catch {
        /* fail-closed: stealth deshabilitado */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const unlock = useCallback((via) => {
    if (!readyRef.current || isStealthLocked()) return;
    const { slug } = cfgRef.current;
    if (!slug) return;
    resetStealthFails();
    grantStealthUnlock();
    // Log best-effort (si la tabla no existe, se ignora en silencio)
    try {
      supabase.from('admin_access_logs').insert([{ via, at: new Date().toISOString() }]);
    } catch {
      /* noop */
    }
    navigate(`/${slug}`);
  }, [navigate]);

  // 1) Combo de clicks por hotspots (delegación global)
  useEffect(() => {
    const onClick = (e) => {
      if (!readyRef.current || isStealthLocked()) return;
      const t = e.target?.closest?.('[data-admin-hotspot]');
      if (!t) return;
      const id = t.getAttribute('data-admin-hotspot');
      const { sequence } = cfgRef.current;
      const prog = progressRef.current;
      const now = Date.now();

      if (now - (prog.firstAt || 0) > CLICK_WINDOW_MS) {
        prog.stepIdx = 0;
        prog.count = 0;
        prog.firstAt = now;
      }
      const expected = sequence[prog.stepIdx];
      if (!expected) {
        prog.stepIdx = 0;
        prog.count = 0;
        return;
      }
      if (id === expected.id) {
        if (prog.count === 0) prog.firstAt = now;
        prog.count += 1;
        if (prog.count >= Number(expected.clicks)) {
          prog.stepIdx += 1;
          prog.count = 0;
          if (prog.stepIdx >= sequence.length) {
            prog.stepIdx = 0;
            unlock('hotspot');
          }
        }
      } else {
        // Click fuera de secuencia: ¿reinicia en el primer paso?
        if (id === sequence[0]?.id) {
          prog.stepIdx = 0;
          prog.count = 1;
          prog.firstAt = now;
        } else {
          prog.stepIdx = 0;
          prog.count = 0;
          registerStealthFail();
        }
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [unlock]);

  // 2) Palabra secreta tipiada (hash comparado, nunca plaintext en código)
  useEffect(() => {
    const onKeyDown = async (e) => {
      if (!readyRef.current || isStealthLocked()) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (isTypingTarget(e.target)) return;
      if (e.key.length !== 1) return;
      const ch = e.key.toLowerCase();
      if (!/[a-z0-9]/.test(ch)) return;

      wordBufRef.current = (wordBufRef.current + ch).slice(-WORD_BUFFER_MAX);
      if (wordTimerRef.current) clearTimeout(wordTimerRef.current);
      wordTimerRef.current = setTimeout(() => {
        wordBufRef.current = '';
      }, WORD_IDLE_RESET_MS);

      const { wordHash } = cfgRef.current;
      if (wordBufRef.current.length >= 4) {
        const h = await sha256Hex(wordBufRef.current);
        if (h && timingSafeEqual(h, wordHash)) {
          wordBufRef.current = '';
          unlock('word');
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      if (wordTimerRef.current) clearTimeout(wordTimerRef.current);
    };
  }, [unlock]);
}
