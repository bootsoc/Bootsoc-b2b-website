import "server-only";
import { createHash } from "node:crypto";
import { headers } from "next/headers";

export type RequestMeta = {
  ipHash: string | null;
  country: string | null;
  region: string | null;
  userAgent: string | null;
};

/** Collects coarse request metadata. The IP is salted and hashed, never stored raw. */
export async function requestMeta(): Promise<RequestMeta> {
  const h = await headers();
  const ip = h.get("x-real-ip") ?? h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  const salt = process.env.IP_HASH_SALT ?? "bootsoc";
  return {
    ipHash: ip ? createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32) : null,
    country: h.get("x-vercel-ip-country"),
    region: h.get("x-vercel-ip-country-region"),
    userAgent: h.get("user-agent")?.slice(0, 300) ?? null,
  };
}
