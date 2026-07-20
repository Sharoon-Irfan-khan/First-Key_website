import { createClient } from "next-sanity";
import { apiVersion, dataset, isConfigured, projectId } from "./config";

const client = isConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;

/**
 * Run a GROQ query. Returns `fallback` when Sanity isn't configured yet or the
 * request fails, so a CMS outage degrades the blog instead of the whole site.
 * Pages are cached and refresh at most 60s after a change in the Studio.
 */
export async function sanityFetch(query, params = {}, fallback = null) {
  if (!client) return fallback;
  try {
    return await client.fetch(query, params, {
      next: { revalidate: 60, tags: ["post"] },
    });
  } catch (err) {
    console.error("[sanity] query failed:", err.message);
    return fallback;
  }
}
