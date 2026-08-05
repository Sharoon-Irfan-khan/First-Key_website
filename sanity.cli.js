import { defineCliConfig } from "sanity/cli";
import { dataset, projectId } from "./lib/sanity/config";

/**
 * Config for the `sanity` CLI (dataset import/export, schema deploy, document
 * queries). The Studio itself reads sanity.config.js — this file only tells the
 * CLI which project and dataset to talk to, so commands work without repeating
 * --project and --dataset every time.
 */
export default defineCliConfig({
  api: { projectId, dataset },
});
