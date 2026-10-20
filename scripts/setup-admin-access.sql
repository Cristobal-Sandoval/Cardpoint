-- Acceso stealth al admin — CardPoint
-- ============================================================
-- EJECUTAR MANUALMENTE en Supabase Dashboard → SQL Editor.
-- NO commitear valores reales: este archivo solo deja plantillas.
-- Genera tus secretos LOCALMENTE (nunca en el repo):
--
--   Slug (ruta secreta, un solo segmento, ej. taller-oto-7f3k9d):
--     inventa algo largo y no obvio, sin tildes ni espacios.
--
--   Hash SHA-256 de la palabra secreta (ej. tu palabra + 4 dígitos):
--     node -e "const c=require('crypto');console.log(c.createHash('sha256').update('TU_PALABRA_AQUI','utf8').digest('hex'))"
--
--   Hash SHA-256 del slug (lo valida AdminGate sin exponerlo en código):
--     node -e "const c=require('crypto');console.log(c.createHash('sha256').update('TU_SLUG_AQUI','utf8').digest('hex'))"
--
-- 1) Ruta y hashes (reemplaza los placeholders antes de ejecutar)
-- ============================================================
-- upsert({ id: 'admin_route', ... }) guarda el slug en texto plano.
-- OJO: admin_settings hoy es legible con anon key (igual que cupones).
-- El slug NO queda en el código ni en el push, pero sí sería visible
-- vía API para quien conozca tu URL de Supabase. La puerta REAL sigue
-- siendo Supabase Auth (email+password) + RLS. Endurecimiento futuro:
-- mover esta validación a una Edge Function.

insert into admin_settings (id, data, updated_at) values
  ('admin_route', '"TU_SLUG_AQUI"', now()),
  ('admin_route_hash', '"HASH_SHA256_DE_TU_SLUG"', now()),
  ('admin_access_word_hash', '"HASH_SHA256_DE_TU_PALABRA"', now())
on conflict (id) do update set data = excluded.data, updated_at = now();

-- 2) Secuencia de hotspots (combo de clicks)
-- ------------------------------------------------------------
-- IDs disponibles hoy: "brand" (logo header), "legal" (© footer).
-- Cuando crees la sección Otakonce, agrega data-admin-hotspot="otakonce"
-- a su banner y suma {"id":"otakonce","clicks":2} a este arreglo.
-- Ejemplo: 3 clicks en logo + 2 clicks en banner Otakonce (ventana 4s).

insert into admin_settings (id, data, updated_at) values
  ('admin_hotspots', '[{"id":"brand","clicks":3},{"id":"legal","clicks":2}]', now())
on conflict (id) do update set data = excluded.data, updated_at = now();

-- 3) Tanner la ruta legacy como señuelo (opcional, default: apagado)
-- ------------------------------------------------------------
-- 'true'  → /acceso-privado-cp muestra login falso que siempre falla y loguea.
-- 'false' → /acceso-privado-cp sigue funcionando normal (compatibilidad).

insert into admin_settings (id, data, updated_at) values
  ('admin_legacy_decoy', 'false', now())
on conflict (id) do update set data = excluded.data, updated_at = now();

-- 4) Log de intentos (opcional pero recomendado)
-- ------------------------------------------------------------
create table if not exists admin_access_logs (
  id bigint generated always as identity primary key,
  via text,
  at timestamptz default now()
);
alter table admin_access_logs enable row level security;
-- Solo escritura anónima (nadie lee los logs desde el front):
drop policy if exists "anon insert logs" on admin_access_logs;
create policy "anon insert logs" on admin_access_logs
  for insert to anon with check (true);
