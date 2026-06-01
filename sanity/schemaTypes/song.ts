import { defineField, defineType } from "sanity";

export const song = defineType({
  name: "song",
  title: "Songs",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "year", title: "Year", type: "number" }),
    defineField({ name: "cover", title: "Cover", type: "image", options: { hotspot: true } }),
    defineField({ name: "spotifyUrl", title: "Spotify URL", type: "url" }),
    defineField({ name: "youtubeId", title: "YouTube ID", type: "string" }),
    defineField({
      name: "release",
      title: "Parent Release",
      type: "reference",
      to: [{ type: "release" }]
    })
  ]
});
