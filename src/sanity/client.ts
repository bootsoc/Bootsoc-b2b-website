import "server-only";
import { createClient, type QueryParams } from "next-sanity";
import { apiVersion, dataset, projectId, sanityConfigured } from "@/sanity/env";

const client = sanityConfigured ? createClient({ projectId, dataset, apiVersion, useCdn: true, perspective: "published" }) : null;

/** Fetches from Sanity with ISR tags. Returns null when Sanity isn't configured or the request fails. */
export async function sanityFetch<T>(query: string, params: QueryParams = {}, tags: string[] = []): Promise<T | null> {
  if (!client) return null;
  try {
    return await client.fetch<T>(query, params, { next: { revalidate: 300, tags } });
  } catch (error) {
    console.error("[sanity] fetch failed", error);
    return null;
  }
}
