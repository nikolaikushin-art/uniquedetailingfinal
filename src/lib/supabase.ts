import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase client for the UNIQUE Operations project.
 *
 * Configured entirely through environment variables so no keys live in the
 * repo. Set these on the host (Vercel → Project → Settings → Environment
 * Variables) and, for local dev, in a `.env` file:
 *
 *   VITE_SUPABASE_URL=https://<project-ref>.supabase.co
 *   VITE_SUPABASE_ANON_KEY=<anon public key>
 *
 * If the variables are absent the client is `null` and helpers degrade
 * gracefully (they report `supabase_not_configured` instead of throwing), so
 * the site still builds and runs before the backend is connected.
 */
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url as string, anonKey as string)
  : null;

export type Lead = {
  name?: string;
  phone?: string;
  email?: string;
  car?: string;
  service?: string;
  comment?: string;
};

export type SubmitResult = { ok: true } | { ok: false; error: string };

/**
 * Inserts a contact-form lead into the `leads` table.
 *
 * Expected table (create in the Supabase SQL editor):
 *
 *   create table public.leads (
 *     id uuid primary key default gen_random_uuid(),
 *     created_at timestamptz not null default now(),
 *     name text, phone text, email text, car text, service text, comment text
 *   );
 *   alter table public.leads enable row level security;
 *   create policy "anon can insert leads" on public.leads
 *     for insert to anon with check (true);
 */
export async function submitLead(lead: Lead): Promise<SubmitResult> {
  if (!supabase) return { ok: false, error: "supabase_not_configured" };
  const { error } = await supabase.from("leads").insert({
    name: lead.name || null,
    phone: lead.phone || null,
    email: lead.email || null,
    car: lead.car || null,
    service: lead.service || null,
    comment: lead.comment || null,
  });
  return error ? { ok: false, error: error.message } : { ok: true };
}
