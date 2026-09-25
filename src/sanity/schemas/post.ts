import { defineArrayMember, defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Article",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required().max(110) }),
    defineField({ name: "slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: "excerpt", type: "text", rows: 3, validation: (r) => r.required().max(240) }),
    defineField({
      name: "category",
      type: "string",
      options: { list: ["Guide", "Playbook", "Compliance", "Benchmark", "News"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "author", type: "string", initialValue: "BootSoc team" }),
    defineField({ name: "publishedAt", type: "datetime", validation: (r) => r.required() }),
    defineField({ name: "coverImage", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string" })] }),
    defineField({
      name: "body",
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({ type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string" })] }),
      ],
    }),
    defineField({ name: "seoTitle", type: "string", group: "seo" }),
    defineField({ name: "seoDescription", type: "text", rows: 2, group: "seo" }),
  ],
  groups: [{ name: "seo", title: "SEO" }],
  orderings: [{ title: "Newest", name: "publishedDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "category", media: "coverImage" } },
});
