import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "BootSoc: verified B2B pipeline from buyers already in-market";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const tagline = "Verified B2B demand generation for the US, UK and Canada";

/** Loads Clash Display (semibold) from Fontshare's CDN; the OG renderer needs TTF/OTF/WOFF, not WOFF2. */
async function displayFont() {
  try {
    const css = await fetch("https://api.fontshare.com/v2/css?f[]=clash-display@600&display=swap").then((r) => r.text());
    const url = css.match(/url\('([^']+?)'\) format\('truetype'\)/)?.[1];
    return url ? await fetch(url.startsWith("//") ? `https:${url}` : url).then((r) => r.arrayBuffer()) : null;
  } catch {
    return null;
  }
}

export default async function OgImage() {
  const font = await displayFont();
  const wordmark = await readFile(join(process.cwd(), "brand/bootsoc-wordmark.svg"), "utf8");
  const yellow = wordmark.replace("<svg ", '<svg fill="#fff100" ').replace(/currentColor/g, "#fff100");
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0b0b0a", padding: 72 }}>
        { }
        <img src={`data:image/svg+xml;base64,${Buffer.from(yellow).toString("base64")}`} width={300} height={56} alt="" />
        <div style={{ display: "flex", flexDirection: "column", color: "#f4f4ef", fontFamily: font ? "Display" : undefined, fontSize: font ? 96 : 88, fontWeight: 600, lineHeight: 1.02, letterSpacing: -1 }}>
          <span>Pipeline from buyers</span>
          <span style={{ display: "flex" }}>
            already<span style={{ color: "#fff100", marginLeft: 24 }}>in-market.</span>
          </span>
        </div>
        <div style={{ display: "flex", color: "#a1a197", fontSize: 36, fontFamily: font ? "Display" : undefined }}>{tagline}</div>
      </div>
    ),
    { ...size, fonts: font ? [{ name: "Display", data: font, weight: 600, style: "normal" }] : [] },
  );
}
