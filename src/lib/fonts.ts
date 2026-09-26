import "server-only";

const SOURCES = [
  "https://api.fontshare.com/v2/css?f[]=clash-display@500,600&display=swap",
  "https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap",
];

export type FontshareStyles = { css: string; preload: string[] };

/**
 * Fetches Fontshare's @font-face rules once at build/revalidation time so they can be inlined,
 * removing two render-blocking stylesheet requests. Font files are still served by Fontshare's CDN,
 * which the ITF Free Font License permits (we never host or redistribute the files ourselves).
 */
export async function getFontshareStyles(): Promise<FontshareStyles | null> {
  try {
    const sheets = await Promise.all(
      SOURCES.map((u) => fetch(u, { next: { revalidate: 60 * 60 * 24 } }).then((r) => (r.ok ? r.text() : Promise.reject(r.status)))),
    );
    const css = sheets.join("\n").replaceAll("url('//", "url('https://");
    // Preload the semibold headline cut (the LCP text) and Satoshi regular (body copy).
    const woff2 = (family: string, weight: string) =>
      css.match(new RegExp(`font-family: '${family}';[^}]*?url\\('([^']+?\\.woff2)'[^}]*?font-weight: ${weight};`))?.[1];
    const preload = [woff2("Clash Display", "600"), woff2("Satoshi", "400")].filter((u): u is string => Boolean(u));
    return { css, preload };
  } catch {
    return null;
  }
}
