// Contact-form backend client.
//
// Leads are written through the shared Unique Operations Supabase project. The
// `leads` table blocks anonymous inserts by design (row-level security), so the
// form submits to the `contact` Edge Function, which validates the payload and
// persists it with the service role. The browser only ever sends the public
// anon key.

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(url && anonKey);

export type Lead = {
  name?: string;
  phone?: string;
  email?: string;
  car?: string;
  service?: string;
  comment?: string;
};

export type SubmitResult = { ok: true } | { ok: false; error: string };

export async function submitLead(lead: Lead): Promise<SubmitResult> {
  if (!isSupabaseConfigured) return { ok: false, error: "supabase_not_configured" };

  const endpoint = `${(url as string).replace(/\/+$/, "")}/functions/v1/contact`;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: anonKey as string,
        Authorization: `Bearer ${anonKey}`,
      },
      body: JSON.stringify(lead),
    });

    const data = (await res.json().catch(() => null)) as SubmitResult | null;
    if (!res.ok || !data?.ok) {
      return { ok: false, error: data && "error" in data ? data.error : `http_${res.status}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "network_error" };
  }
}
