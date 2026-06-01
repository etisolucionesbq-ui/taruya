import { defineField, defineType } from "sanity";

export const event = defineType({
  name: "event",
  title: "Events",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "format", title: "Format", type: "string" }),
    defineField({ name: "venue", title: "Venue", type: "string" }),
    defineField({ name: "city", title: "City", type: "string" }),
    defineField({ name: "eventDate", title: "Event Date", type: "datetime" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "ticketUrl", title: "Ticket URL", type: "url" }),
    defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
    defineField({ name: "ctaHref", title: "CTA Href", type: "string" }),
    defineField({ name: "orderRank", title: "Order", type: "number", initialValue: 100 })
  ]
});
