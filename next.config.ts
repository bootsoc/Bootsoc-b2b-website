import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://snap.licdn.com https://challenges.cloudflare.com https://va.vercel-scripts.com`,
  "style-src 'self' 'unsafe-inline' https://api.fontshare.com",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https://cdn.fontshare.com",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://px.ads.linkedin.com https://*.api.sanity.io https://*.apicdn.sanity.io https://vitals.vercel-insights.com https://challenges.cloudflare.com",
  "frame-src https://challenges.cloudflare.com",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
];

/** Old WordPress URLs on bootsoc.com mapped to their closest new page, so links and rankings carry over. */
const legacy: [string, string][] = [
  ["/about-us", "/about"],
  ["/service", "/solutions"],
  ["/services-details", "/solutions"],
  ["/b2b-demand-generation-lead-qualification", "/solutions/demand-generation"],
  ["/mql-sql-lead-generation", "/solutions/demand-generation"],
  ["/bant-hql-qualified-leads", "/solutions/demand-generation"],
  ["/sales-enablement-pipeline-acceleration", "/solutions/demand-generation"],
  ["/appointment-setting-sales-meetings", "/solutions/appointment-setting"],
  ["/intent-based-marketing-data-intelligence", "/solutions/intent-data"],
  ["/account-based-marketing-abm-abx", "/solutions/account-based-marketing"],
  ["/content-syndication-for-demand-capture", "/solutions/content-syndication"],
  ["/paid-advertising-ppc-media-buying", "/solutions/programmatic-display"],
  ["/crm-marketing-automation", "/solutions"],
  ["/b2c-growth-customer-acquisition-solutions", "/solutions"],
  ["/brand-awareness-customer-acquisition", "/solutions"],
  ["/e-commerce-and-marketplace-growth", "/solutions"],
  ["/influencer-community-marketing", "/solutions"],
  ["/social-media-advertising-for-b2c", "/solutions"],
  ["/email-retention-marketing", "/solutions"],
  ["/conversion-focused-landing-pages", "/solutions"],
  ["/mobile-app-user-acquisition", "/solutions"],
  ["/seo-and-content-marketing", "/resources"],
  ["/social-media-marketing", "/solutions"],
  ["/website-development-ux", "/solutions"],
  ["/journals", "/resources"],
  ["/journals/:path*", "/resources"],
  ["/blog", "/resources"],
  ["/feed", "/resources"],
  ["/faq", "/#faq-heading"],
  ["/portfolio", "/about"],
  ["/portfolio-details", "/about"],
  ["/privacy-policy", "/privacy"],
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/((?!studio).*)", headers: [{ key: "Content-Security-Policy", value: csp }] },
    ];
  },
  async redirects() {
    return [
      // One canonical host: www.bootsoc.com permanently redirects to bootsoc.com.
      {
        source: "/:path*",
        has: [{ type: "host" as const, value: "www.bootsoc.com" }],
        destination: "https://bootsoc.com/:path*",
        permanent: true,
      },
      ...legacy.map(([source, destination]) => ({ source, destination, permanent: true })),
    ];
  },
};

export default nextConfig;
