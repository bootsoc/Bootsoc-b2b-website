import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BootSoc",
    short_name: "BootSoc",
    description: "Verified B2B pipeline from buyers already in-market.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0b0a",
    theme_color: "#0b0b0a",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
