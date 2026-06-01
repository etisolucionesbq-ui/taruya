import { defineField, defineType } from "sanity";

export const artistSettings = defineType({
  name: "artistSettings",
  title: "Artist Settings",
  type: "document",
  fields: [
    defineField({ name: "seoTitle", title: "SEO Title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO Description", type: "text", rows: 3 }),
    defineField({ name: "ogImage", title: "Open Graph Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "heroEyebrow", title: "Hero Eyebrow", type: "string" }),
    defineField({ name: "heroTitle", title: "Hero Title", type: "string" }),
    defineField({ name: "heroSubtitle", title: "Hero Subtitle", type: "string" }),
    defineField({ name: "heroBody", title: "Hero Body", type: "text", rows: 4 }),
    defineField({ name: "heroBackground", title: "Hero Background", type: "image", options: { hotspot: true } }),
    defineField({ name: "heroPortrait", title: "Hero Portrait", type: "image", options: { hotspot: true } }),
    defineField({ name: "aboutEyebrow", title: "About Eyebrow", type: "string" }),
    defineField({ name: "aboutTitle", title: "About Title", type: "string" }),
    defineField({ name: "aboutLead", title: "About Lead", type: "text", rows: 3 }),
    defineField({
      name: "aboutBody",
      title: "About Body",
      type: "array",
      of: [{ type: "text", rows: 4 }]
    }),
    defineField({
      name: "aboutPillars",
      title: "About Pillars",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "body", title: "Body", type: "text", rows: 3 }
          ]
        }
      ]
    }),
    defineField({ name: "aboutImage", title: "About Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "spotifyArtistId", title: "Spotify Artist ID", type: "string" }),
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url" }),
    defineField({ name: "tiktokUrl", title: "TikTok URL", type: "url" }),
    defineField({ name: "youtubeUrl", title: "YouTube URL", type: "url" })
  ],
  preview: {
    prepare: () => ({ title: "TARUYA Settings" })
  }
});
