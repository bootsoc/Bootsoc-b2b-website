import { NextResponse } from "next/server";
import { z } from "zod";
import { sql } from "@/lib/db";
import { requestMeta } from "@/lib/request";

const schema = z.object({
  visitorId: z.string().uuid(),
  analytics: z.boolean(),
  advertising: z.boolean(),
  gpc: z.boolean(),
  version: z.string().max(20),
});

/** Records a consent decision so we can demonstrate consent (UK GDPR Art. 7(1), Law 25). */
export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 });

  const db = sql();
  if (db) {
    const meta = await requestMeta();
    const { visitorId, analytics, advertising, gpc, version } = parsed.data;
    await db`
      insert into consent_events (visitor_id, choices, gpc, geo_country, geo_region, policy_version)
      values (${visitorId}, ${JSON.stringify({ analytics, advertising })}::jsonb, ${gpc}, ${meta.country}, ${meta.region}, ${version})
    `;
  }
  return NextResponse.json({ ok: true });
}
