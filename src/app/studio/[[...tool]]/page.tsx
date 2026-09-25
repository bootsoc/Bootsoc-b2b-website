import { sanityConfigured } from "@/sanity/env";
import { Studio } from "./studio";

export const dynamic = "force-static";
export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!sanityConfigured) {
    return (
      <section className="shell pb-24 pt-40">
        <h1 className="display text-6xl">Content studio</h1>
        <p className="mt-6 max-w-[56ch] text-lg text-muted">
          Sanity isn&apos;t connected yet. Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and <code>NEXT_PUBLIC_SANITY_DATASET</code>{" "}
          in Vercel, then redeploy. See SETUP.md in the repository.
        </p>
      </section>
    );
  }
  return <Studio />;
}
