/**
 * Shared Sanity settings.
 *
 * Read in three places with different build systems, so each id has a chain:
 *   - Next.js (site + /studio) exposes NEXT_PUBLIC_* vars
 *   - the Sanity CLI (`sanity deploy`) only exposes SANITY_STUDIO_* vars
 *   - the literals are the floor, so the hosted Studio builds with no env at all
 *
 * A project id is public — it ships in the browser bundle either way — so
 * there is nothing secret to protect here.
 */
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID ||
  "jfsmawvi";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_STUDIO_DATASET ||
  "production";
export const apiVersion = "2024-10-01";

export const isConfigured = Boolean(projectId);
