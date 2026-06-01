import { defineField, defineType } from "sanity";

export const release = defineType({
  name: "release",
  title: "Discography",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "releaseType",
      title: "Type",
      type: "string",
      options: {
        list: ["Album", "Album en vivo", "Single", "Compilado"]
      },
      validation: (rule) => rule.required()
    }),
    defineField({ name: "year", title: "Year", type: "number", validation: (rule) => rule.required().min(1900).max(2100) }),
    defineField({ name: "releaseDate", title: "Release Date", type: "date" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({ name: "cover", title: "Cover", type: "image", options: { hotspot: true } }),
    defineField({ name: "spotifyUrl", title: "Spotify URL", type: "url" }),
    defineField({ name: "youtubeId", title: "YouTube ID", type: "string" }),
    defineField({ name: "highlight", title: "Highlight", type: "boolean", initialValue: false })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "releaseType",
      media: "cover"
    }
  }
});
