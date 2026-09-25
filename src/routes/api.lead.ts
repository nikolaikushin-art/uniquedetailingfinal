import { createFileRoute } from "@tanstack/react-router";

/**
 * POST /api/lead — server-side handler for the booking / request form.
 *
 * Why it exists: the browser-only Supabase call was the only delivery path, so a
 * missing env var or RLS problem meant the form silently "did not work". This
 * endpoint delivers a lead through EVERY channel that is configured and reports
 * success if at least one of them worked:
 *
 *   1. Supabase  — RPC `submit_website_lead` (CRM)   ← VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY
 *   2. E-mail    — Resend                             ← RESEND_API_KEY (+ LEAD_NOTIFY_TO, LEAD_FROM_EMAIL)
 *   3. Telegram  — bot message to the studio chat     ← TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID
 *
 * All secrets are server-only env vars (never exposed to the browser).
 */

type LeadPayload = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  car?: unknown;
  service?: unknown;
  comment?: unknown;
  consentData?: unknown;
  consentPolicy?: unknown;
  /** Honeypot — real users never fill this field. */
  website?: unknown;
  page?: unknown;
};

const env = (k: string): string | undefined =>
  (typeof process !== "undefined" ? process.env?.[k] : undefined) ||
  ((import.meta as unknown as { env?: Record<string, string> }).env?.[k] as string | undefined);

const str = (v: unknown, max: number) =>
  Array.from(typeof v === "string" ? v : "")
    .map((ch) => (ch.charCodeAt(0) < 32 || ch.charCodeAt(0) === 127 ? " " : ch))
    .join("")
    .trim()
    .slice(0, max);

/* Tiny in-memory rate limiter (per server instance) — blocks trivial flooding. */
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  list.push(now);
  hits.set(ip, list);
  return list.length > 6;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

function splitCar(car: string) {
  const parts = car.split(/\s+/).filter(Boolean);
  return { brand: parts[0] ?? null, model: parts.length > 1 ? parts.slice(1).join(" ") : null };
}

async function toSupabase(l: Record<string, string>, notes: string) {
  const url = env("VITE_SUPABASE_URL");
  const key = env("VITE_SUPABASE_ANON_KEY");
  if (!url || !key) return "skipped" as const;
  const { brand, model } = splitCar(l.car);
  const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/rpc/submit_website_lead`, {
    method: "POST",
    headers: { apikey: key, authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify({
      p_full_name: l.name || "Без имени",
      p_phone: l.phone || null,
      p_email: l.email || null,
      p_car_brand: brand,
      p_car_model: model,
      p_notes: notes || null,
    }),
  });
  if (!res.ok) throw new Error(`supabase ${res.status}`);
  return "ok" as const;
}

async function toEmail(subject: string, text: string) {
  const key = env("RESEND_API_KEY");
  if (!key) return "skipped" as const;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify({
      from: env("LEAD_FROM_EMAIL") || "UNIQUE Detailing <info@uniquedetailing.ru>",
      to: [env("LEAD_NOTIFY_TO") || "info@uniquedetailing.ru"],
      subject,
      text,
    }),
  });
  if (!res.ok) throw new Error(`resend ${res.status}`);
  return "ok" as const;
}

async function toTelegram(text: string) {
  const token = env("TELEGRAM_BOT_TOKEN");
  const chat = env("TELEGRAM_CHAT_ID");
  if (!token || !chat) return "skipped" as const;
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ chat_id: chat, text }),
  });
  if (!res.ok) throw new Error(`telegram ${res.status}`);
  return "ok" as const;
}

export const Route = createFileRoute("/api/lead")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: LeadPayload;
        try {
          body = (await request.json()) as LeadPayload;
        } catch {
          return json({ ok: false, error: "bad_request" }, 400);
        }

        // Honeypot: pretend success so bots do not retry.
        if (str(body.website, 100)) return json({ ok: true });

        const ip =
          request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
          request.headers.get("x-real-ip") ||
          "unknown";
        if (rateLimited(ip)) return json({ ok: false, error: "rate_limited" }, 429);

        const lead = {
          name: str(body.name, 120),
          phone: str(body.phone, 40),
          email: str(body.email, 160),
          car: str(body.car, 120),
          service: str(body.service, 300),
          comment: str(body.comment, 2000),
        };
        const digits = lead.phone.replace(/\D/g, "");
        if (lead.name.length < 2) return json({ ok: false, error: "name" }, 422);
        if (digits.length < 10 || digits.length > 15)
          return json({ ok: false, error: "phone" }, 422);
        if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email))
          return json({ ok: false, error: "email" }, 422);
        if (body.consentData !== true || body.consentPolicy !== true)
          return json({ ok: false, error: "consent" }, 422);

        // 152-ФЗ: keep evidence of the consent (when, which documents) with the lead.
        const stamp = new Date().toISOString();
        const notes = [
          lead.service && `Услуга: ${lead.service}`,
          lead.comment && `Комментарий: ${lead.comment}`,
          `Согласие на обработку ПДн и политика конфиденциальности приняты ${stamp} (страницы /soglasie, /politika)`,
          str(body.page, 200) && `Страница: ${str(body.page, 200)}`,
        ]
          .filter(Boolean)
          .join("\n");

        const text = [
          "Новая заявка с сайта UNIQUE Detailing",
          `Имя: ${lead.name}`,
          `Телефон: ${lead.phone}`,
          lead.email && `Email: ${lead.email}`,
          lead.car && `Автомобиль: ${lead.car}`,
          notes,
        ]
          .filter(Boolean)
          .join("\n");

        const results = await Promise.allSettled([
          toSupabase(lead, notes),
          toEmail(`Заявка с сайта: ${lead.name}, ${lead.phone}`, text),
          toTelegram(text),
        ]);
        const names = ["supabase", "email", "telegram"];
        const delivered = results.filter((r) => r.status === "fulfilled" && r.value === "ok");
        results.forEach((r, i) => {
          if (r.status === "rejected") console.error(`[lead] ${names[i]} failed:`, r.reason);
        });

        if (delivered.length > 0) return json({ ok: true });
        const configured = results.some((r) => r.status === "rejected");
        return json(
          { ok: false, error: configured ? "delivery_failed" : "not_configured" },
          configured ? 502 : 503,
        );
      },
    },
  },
});
