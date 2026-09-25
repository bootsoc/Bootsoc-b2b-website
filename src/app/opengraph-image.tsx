import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "BootSoc: verified B2B pipeline from buyers already in-market";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const headline = "Pipeline from buyers already in-market.";
const tagline = "Verified B2B demand generation for the US, UK and Canada";

/** Loads the condensed display cut of Bricolage Grotesque for just the glyphs we render. */
async function displayFont() {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@96,75,800&text=${encodeURIComponent(headline + tagline)}`,
    ).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    return url ? await fetch(url).then((r) => r.arrayBuffer()) : null;
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
        <div style={{ display: "flex", flexDirection: "column", color: "#f4f4ef", fontFamily: font ? "Display" : undefined, fontSize: font ? 120 : 92, fontWeight: 800, lineHeight: 0.95, letterSpacing: font ? -4 : -3 }}>
          <span>Pipeline from buyers</span>
          <span style={{ display: "flex" }}>
            already<span style={{ color: "#fff100", marginLeft: 28 }}>in-market.</span>
          </span>
        </div>
        <div style={{ display: "flex", color: "#a1a197", fontSize: 36, fontFamily: font ? "Display" : undefined }}>{tagline}</div>
      </div>
    ),
    { ...size, fonts: font ? [{ name: "Display", data: font, weight: 800, style: "normal" }] : [] },
  );
}
