/**
 * Shared Sanity settings.
 *
 * The site must build and run before Sanity is set up, so nothing here throws.
 * `isConfigured` is false until a project id lands in .env.local, and the blog
 * falls back to an empty state instead of crashing.
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2024-10-01";

export const isConfigured = Boolean(projectId);
