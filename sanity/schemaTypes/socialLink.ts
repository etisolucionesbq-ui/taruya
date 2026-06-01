import { defineField, defineType } from "sanity";

export const socialLink = defineType({
  name: "socialLink",
  title: "Social Links",
  type: "document",
  fields: [
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      options: {
        list: ["Instagram", "TikTok", "Facebook", "YouTube", "Spotify", "WhatsApp", "Email"]
      },
      validation: (rule) => rule.required()
    }),
    defineField({ name: "href", title: "URL", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "orderRank", title: "Order", type: "number", initialValue: 100 })
  ],
  preview: {
    select: {
      title: "platform",
      subtitle: "href"
    }
  }
});
