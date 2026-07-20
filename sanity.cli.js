import { defineCliConfig } from "sanity/cli";

/**
 * Used by the Sanity CLI (`npx sanity deploy`) to publish a hosted copy of the
 * Studio at <studioHost>.sanity.studio, so it can be opened straight from the
 * sanity.io dashboard. The same Studio also runs in-app at /studio.
 */
export default defineCliConfig({
  api: {
    projectId: "jfsmawvi",
    dataset: "production",
  },
  studioHost: "firstkey",
});
