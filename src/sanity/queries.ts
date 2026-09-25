import { groq } from "next-sanity";
import type { PortableTextBlock } from "@portabletext/react";
import { sanityFetch } from "@/sanity/client";
import { seedPosts, type LocalBlock } from "@/content/posts";

export type PostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  author: string;
  coverUrl?: string | null;
  coverAlt?: string | null;
};

export type Post = PostSummary & {
  body?: PortableTextBlock[];
  localBody?: LocalBlock[];
  seoTitle?: string | null;
  seoDescription?: string | null;
};

export type Job = { _id: string; title: string; team?: string; location?: string; type?: string; summary?: string };

const summaryFields = groq`"slug": slug.current, title, excerpt, category, publishedAt, "author": coalesce(author, "BootSoc team"), "coverUrl": coverImage.asset->url, "coverAlt": coverImage.alt`;

export async function getPosts(): Promise<PostSummary[]> {
  const remote = await sanityFetch<PostSummary[]>(
    groq`*[_type == "post" && defined(slug.current) && publishedAt <= now()] | order(publishedAt desc)[0...50]{${summaryFields}}`,
    {},
    ["post"],
  );
  const local: PostSummary[] = seedPosts.map((p) => ({ slug: p.slug, title: p.title, excerpt: p.excerpt, category: p.category, publishedAt: p.publishedAt, author: p.author, coverUrl: p.coverUrl, coverAlt: p.coverAlt }));
  const merged = [...(remote ?? []), ...local.filter((l) => !remote?.some((r) => r.slug === l.slug))];
  return merged.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getPost(slug: string): Promise<Post | null> {
  const remote = await sanityFetch<Post>(
    groq`*[_type == "post" && slug.current == $slug][0]{${summaryFields}, body, seoTitle, seoDescription}`,
    { slug },
    ["post", `post:${slug}`],
  );
  return remote ?? seedPosts.find((p) => p.slug === slug) ?? null;
}

export async function getJobs(): Promise<Job[]> {
  return (await sanityFetch<Job[]>(groq`*[_type == "job" && open == true] | order(_createdAt desc){_id, title, team, location, type, summary}`, {}, ["job"])) ?? [];
}

export type CaseStudy = {
  slug: string;
  title: string;
  client?: string;
  service?: string;
  summary?: string;
  results?: { value: string; label: string }[];
  body?: PortableTextBlock[];
};

/** Only case studies the client has approved for publication. */
export async function getCaseStudies(): Promise<CaseStudy[]> {
  return (
    (await sanityFetch<CaseStudy[]>(
      groq`*[_type == "caseStudy" && clientApproved == true && defined(slug.current)] | order(_createdAt desc){"slug": slug.current, title, client, service, summary, results}`,
      {},
      ["caseStudy"],
    )) ?? []
  );
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  return sanityFetch<CaseStudy>(
    groq`*[_type == "caseStudy" && clientApproved == true && slug.current == $slug][0]{"slug": slug.current, title, client, service, summary, results, body}`,
    { slug },
    ["caseStudy"],
  );
}
