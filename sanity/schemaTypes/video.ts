import { defineField, defineType } from "sanity";

export const video = defineType({
  name: "video",
  title: "Videos",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "youtubeId", title: "YouTube ID", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "thumbnail", title: "Thumbnail", type: "image", options: { hotspot: true } }),
    defineField({ name: "orderRank", title: "Order", type: "number", initialValue: 100 })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "eyebrow",
      media: "thumbnail"
    }
  }
});
