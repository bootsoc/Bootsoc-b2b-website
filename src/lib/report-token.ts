import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

const TTL_MS = 7 * 24 * 60 * 60 * 1000;
const secret = () => process.env.REPORT_TOKEN_SECRET ?? process.env.IP_HASH_SALT ?? "bootsoc-report";

const sign = (expires: string) => createHmac("sha256", secret()).update(`report:${expires}`).digest("base64url").slice(0, 32);

/** Signed, expiring token so the gated PDF can't be fetched without going through the form. */
export function signReportToken(now = Date.now()) {
  const expires = String(now + TTL_MS);
  return `${expires}.${sign(expires)}`;
}

export function verifyReportToken(token: string | null, now = Date.now()) {
  if (!token) return false;
  const [expires, mac] = token.split(".");
  if (!expires || !mac || Number(expires) < now) return false;
  const expected = Buffer.from(sign(expires));
  const given = Buffer.from(mac);
  return expected.length === given.length && timingSafeEqual(expected, given);
}
