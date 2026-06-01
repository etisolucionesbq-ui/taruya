import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/lib/client";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "taruya",
  title: "TARUYA / Esparragoza Music",
  projectId: projectId || "taruyademo",
  dataset,
  basePath: "/studio",
  apiVersion,
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
  schema: {
    types: schemaTypes
  }
});
