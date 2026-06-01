import { defineField, defineType } from "sanity";

export const contactPerson = defineType({
  name: "contactPerson",
  title: "Contact People",
  type: "document",
  fields: [
    defineField({ name: "role", title: "Role", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "name", title: "Name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "email", title: "Email", type: "email" }),
    defineField({ name: "orderRank", title: "Order", type: "number", initialValue: 100 })
  ]
});
