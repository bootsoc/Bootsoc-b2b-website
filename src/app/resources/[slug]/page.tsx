import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { getPost, getPosts } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import type { LocalBlock } from "@/content/posts";
import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/utils";

export const revalidate = 300;

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/resources/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const title = post.seoTitle ?? post.title;
  const description = post.seoDescription ?? post.excerpt;
  return {
    title,
    description,
    alternates: { canonical: `/resources/${slug}` },
    openGraph: { type: "article", title, description, publishedTime: post.publishedAt, url: `/resources/${slug}` },
  };
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: { asset?: { _ref?: string }; alt?: string } }) =>
      value?.asset?._ref ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={urlFor(value).width(1400).url()} alt={value.alt ?? ""} loading="lazy" className="w-full rounded-2xl" width={1400} height={788} />
      ) : null,
  },
};

function LocalBody({ blocks }: { blocks: LocalBlock[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.type === "h2") return <h2 key={i}>{b.text}</h2>;
        if (b.type === "ul")
          return (
            <ul key={i}>
              {b.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          );
        if (b.type === "quote") return <blockquote key={i}>{b.text}</blockquote>;
        return <p key={i}>{b.text}</p>;
      })}
    </>
  );
}

export default async function ArticlePage({ params }: PageProps<"/resources/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const published = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date(post.publishedAt));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.publishedAt,
          author: { "@type": "Organization", name: post.author },
          publisher: { "@type": "Organization", name: site.legalName, logo: { "@type": "ImageObject", url: absoluteUrl("/icon.svg") } },
          mainEntityOfPage: absoluteUrl(`/resources/${slug}`),
          image: post.coverUrl ? absoluteUrl(post.coverUrl) : undefined,
        }}
      />
      <article className="shell pb-8 pt-32 md:pt-40">
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
          <Link href="/resources" className="hover:text-fg">
            Resources
          </Link>
          <span aria-hidden="true"> / </span>
          <span className="text-fg">{post.category}</span>
        </nav>
        <header className="mt-8 max-w-[56rem]">
          <h1 className="display animate-fade-up text-[clamp(2.75rem,6vw,5.5rem)]">{post.title}</h1>
          <p className="mt-6 max-w-[48rem] text-xl text-muted">{post.excerpt}</p>
          <p className="mt-6 text-sm text-muted">
            {post.author} <span aria-hidden="true">·</span> <time dateTime={post.publishedAt}>{published}</time>
          </p>
        </header>
        {post.coverUrl && (
          <div className="mt-12 rounded-[2rem] bg-fg/5 p-1.5 ring-1 ring-line">
            <div className="relative aspect-[21/9] overflow-hidden rounded-[calc(2rem-6px)]">
              <Image src={post.coverUrl} alt={post.coverAlt ?? ""} fill priority sizes="100vw" className="object-cover" />
            </div>
          </div>
        )}
        <div className="prose-bs mx-auto mt-14">
          {post.localBody ? <LocalBody blocks={post.localBody} /> : post.body ? <PortableText value={post.body} components={components} /> : null}
        </div>
      </article>
      <CtaBand />
    </>
  );
}
