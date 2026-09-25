import { defineField, defineType } from "sanity";

export const job = defineType({
  name: "job",
  title: "Job opening",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "team", type: "string", options: { list: ["Demand generation", "Data", "Sales development", "Media", "Content", "Engineering", "Operations"] } }),
    defineField({ name: "location", type: "string", description: "e.g. Remote (US), Remote (UK), Toronto" }),
    defineField({ name: "type", type: "string", options: { list: ["Full-time", "Part-time", "Contract"] }, initialValue: "Full-time" }),
    defineField({ name: "summary", type: "text", rows: 3 }),
    defineField({ name: "open", type: "boolean", initialValue: true }),
  ],
  preview: { select: { title: "title", subtitle: "location" } },
});
