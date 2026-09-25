import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { getPosts } from "@/sanity/queries";
import { absoluteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes = [
    ["/", 1],
    ["/solutions", 0.9],
    ["/how-it-works", 0.8],
    ["/trust", 0.8],
    ["/audience-estimator", 0.8],
    ["/network", 0.7],
    ["/resources", 0.7],
    ["/glossary", 0.6],
    ["/case-studies", 0.5],
    ["/about", 0.6],
    ["/careers", 0.5],
    ["/contact", 0.7],
    ["/privacy", 0.3],
    ["/cookies", 0.3],
    ["/terms", 0.3],
    ["/privacy-choices", 0.3],
    ["/privacy-request", 0.3],
    ["/email-policy", 0.3],
    ["/accessibility", 0.3],
    ["/dpa", 0.3],
  ] as const;
  const posts = await getPosts();
  return [
    ...staticRoutes.map(([path, priority]) => ({ url: absoluteUrl(path), lastModified: now, priority })),
    ...services.map((s) => ({ url: absoluteUrl(`/solutions/${s.slug}`), lastModified: now, priority: 0.9 })),
    ...posts.map((p) => ({ url: absoluteUrl(`/resources/${p.slug}`), lastModified: new Date(p.publishedAt), priority: 0.6 })),
  ];
}
