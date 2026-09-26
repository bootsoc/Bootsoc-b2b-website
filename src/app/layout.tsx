import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { themeScript } from "@/components/layout/theme-toggle";
import { ConsentManager } from "@/components/consent/consent-manager";
import { JsonLd } from "@/components/seo/json-ld";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { certifications, site } from "@/content/site";
import { getFontshareStyles } from "@/lib/fonts";
import "./globals.css";

const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "BootSoc | Verified B2B demand generation and intent data",
    template: "%s | BootSoc",
  },
  description: site.description,
  applicationName: "BootSoc",
  authors: [{ name: site.legalName }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "BootSoc",
    locale: "en_US",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  robots: process.env.VERCEL_ENV === "preview" ? { index: false, follow: false } : { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0a",
  colorScheme: "dark light",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  // Clash Display (headlines) and Satoshi (body) come from Fontshare under the ITF Free Font License,
  // which bars redistributing the files via public repos, so the files stay on Fontshare's CDN.
  const fonts = await getFontshareStyles();
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${geistMono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        {fonts ? (
          <>
            {fonts.preload.map((href) => (
              <link key={href} rel="preload" href={href} as="font" type="font/woff2" crossOrigin="anonymous" />
            ))}
            <style dangerouslySetInnerHTML={{ __html: fonts.css }} />
          </>
        ) : (
          <>
            <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600&display=swap" />
            <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" />
          </>
        )}
      </head>
      <body className="grain min-h-dvh overflow-x-clip">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: site.legalName,
            alternateName: "BootSoc",
            url: site.url,
            logo: `${site.url}/icon.svg`,
            email: site.email,
            address: {
              "@type": "PostalAddress",
              streetAddress: site.address.street,
              addressLocality: site.address.city,
              addressRegion: site.address.region,
              postalCode: site.address.postalCode,
              addressCountry: site.address.country,
            },
            areaServed: ["US", "GB", "CA"],
            sameAs: [site.social.linkedin, site.publisher.url],
            hasCertification: certifications.map((c) => ({ "@type": "Certification", name: c.name })),
          }}
        />
        <ScrollProgress />
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <ConsentManager />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
