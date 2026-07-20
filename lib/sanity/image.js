import createImageUrlBuilder from "@sanity/image-url";
import { dataset, isConfigured, projectId } from "./config";

const builder = isConfigured ? createImageUrlBuilder({ projectId, dataset }) : null;

/**
 * Build a Sanity CDN URL for an uploaded image.
 * Returns null when there is no image, so callers can render a fallback.
 */
export function imageUrl(source, width = 1200) {
  if (!builder || !source?.asset) return null;
  return builder.image(source).width(width).fit("max").auto("format").quality(82).url();
}
