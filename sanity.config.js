"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./lib/sanity/config";
import { post } from "./sanity/schemas/post";
import { category } from "./sanity/schemas/category";
import { structure } from "./sanity/structure";

export default defineConfig({
  name: "firstkey",
  title: "First Key International",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: [post, category] },
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
});
