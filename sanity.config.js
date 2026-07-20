"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./lib/sanity/config";
import { post } from "./sanity/schemas/post";

export default defineConfig({
  name: "firstkey",
  title: "First Key International",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: [post] },
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
});
