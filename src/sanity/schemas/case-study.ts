import { defineField, defineType } from "sanity";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case study",
  type: "document",
  description: "Publish only with the client's written approval of the name and every figure.",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "client", type: "string", description: "Client name, or an anonymised descriptor like “Global cybersecurity vendor”." }),
    defineField({ name: "clientApproved", type: "boolean", title: "Client approved for publication", initialValue: false, validation: (r) => r.required() }),
    defineField({ name: "service", type: "string" }),
    defineField({
      name: "results",
      type: "array",
      of: [{ type: "object", fields: [defineField({ name: "value", type: "string" }), defineField({ name: "label", type: "string" })] }],
      validation: (r) => r.max(4),
    }),
    defineField({ name: "summary", type: "text", rows: 3 }),
    defineField({ name: "body", type: "array", of: [{ type: "block" }] }),
  ],
});
