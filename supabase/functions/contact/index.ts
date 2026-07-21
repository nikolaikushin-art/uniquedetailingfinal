// Public contact-form intake for the UNIQUE Detailing site.
//
// The `leads` table in the Unique Operations project is not writable by the
// `anon` role (row-level security intentionally blocks public inserts). Mirroring
// the project's existing pattern (e.g. the `r2-storage` function), this Edge
// Function accepts the public form, validates it server-side, and writes the row
// with the service-role key — which is injected into the function environment and
// never exposed to the browser.
//
// It maps the site's form fields onto the shared CRM schema:
//   name    -> full_name
//   phone   -> phone
//   email   -> email
//   car     -> car_model
//   service + comment -> notes
//   (constant) source='website', status='new'

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.47.10";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

type Payload = {
  name?: string;
  phone?: string;
  email?: string;
  car?: string;
  service?: string;
  comment?: string;
};

const clean = (v: unknown) => (typeof v === "string" ? v.trim() : "");
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ ok: false, error: "method_not_allowed" }, 405);

  let payload: Payload;
  try {
    payload = (await req.json()) as Payload;
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  const name = clean(payload.name);
  const phone = clean(payload.phone);
  const email = clean(payload.email);
  const car = clean(payload.car);
  const service = clean(payload.service);
  const comment = clean(payload.comment);

  // Server-side validation — a name and a contact channel are required.
  const errors: Record<string, string> = {};
  if (!name) errors.name = "required";
  if (!phone && !email) errors.contact = "phone_or_email_required";
  if (email && !isEmail(email)) errors.email = "invalid";
  if (Object.keys(errors).length > 0) {
    return json({ ok: false, error: "validation_failed", fields: errors }, 400);
  }

  const notes = [service ? `Услуга: ${service}` : "", comment].filter(Boolean).join("\n").trim();

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceKey) {
    return json({ ok: false, error: "server_misconfigured" }, 500);
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });

  const { error } = await supabase.from("leads").insert({
    full_name: name,
    phone: phone || null,
    email: email || null,
    car_model: car || null,
    notes: notes || null,
    source: "website",
    status: "new",
  });

  if (error) {
    console.error("lead insert failed:", error.message);
    return json({ ok: false, error: "insert_failed" }, 500);
  }

  return json({ ok: true });
});
