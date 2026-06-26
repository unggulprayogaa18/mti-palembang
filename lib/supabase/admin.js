import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Client service-role — HANYA untuk dipakai di server (Server Actions).
// Memakai secret key; bypass RLS. Jangan pernah diimpor di komponen client.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
