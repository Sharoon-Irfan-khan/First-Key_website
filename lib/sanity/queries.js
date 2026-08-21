import { groq } from "next-sanity";
import { sanityFetch } from "./client";

// A post's slug field is free text in the Studio — nothing stops an editor
// from saving a title ("How to Calculate ROI...") instead of a real slug.
// Normalizing every slug that leaves this module means the site never links
// to (or sitemaps) a URL with spaces/mixed case, even before the offending
// document gets corrected at the source.
function normalizeSlug(slug) {
  return typeof slug === "string"
    ? slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
    : slug;
}

function withCleanSlug(doc) {
  return doc ? { ...doc, slug: normalizeSlug(doc.slug) } : doc;
}

// Category is a reference, so it is flattened here — every consumer wants the
// label and the URL, never the document id.
const CARD_FIELDS = groq`
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  coverImage,
  "category": category->{ title, "slug": slug.current }
`;

const CATEGORY_FIELDS = groq`
  _id,
  title,
  "slug": slug.current,
  description
`;

// Blank `order` sorts last rather than first, so unnumbered topics fall to the
// end of the menu instead of jumping ahead of the numbered ones.
const CATEGORY_ORDER = groq`order(coalesce(order, 9999) asc, title asc)`;

export async function getPosts() {
  const posts = await sanityFetch(
    groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) { ${CARD_FIELDS} }`,
    {},
    []
  );
  return posts.map(withCleanSlug);
}

export function getCategories() {
  return sanityFetch(
    groq`*[_type == "category" && defined(slug.current)] | ${CATEGORY_ORDER} { ${CATEGORY_FIELDS} }`,
    {},
    []
  );
}

export function getCategory(slug) {
  return sanityFetch(
    groq`*[_type == "category" && slug.current == $slug][0] { ${CATEGORY_FIELDS} }`,
    { slug },
    null
  );
}

export async function getPostsByCategory(slug) {
  const posts = await sanityFetch(
    groq`*[_type == "post" && defined(slug.current) && category->slug.current == $slug]
         | order(publishedAt desc) { ${CARD_FIELDS} }`,
    { slug },
    []
  );
  return posts.map(withCleanSlug);
}

export function getCategorySlugs() {
  return sanityFetch(
    groq`*[_type == "category" && defined(slug.current)].slug.current`,
    {},
    []
  );
}

// Only the single-post view needs the body and the SEO overrides; the cards
// would pay for both on every list query.
const SEO_FIELDS = groq`
  metaTitle,
  metaDescription,
  ogImage,
  canonicalUrl,
  noIndex
`;

const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0] { ${CARD_FIELDS}, body, _updatedAt, ${SEO_FIELDS} }`;

export async function getPost(slug) {
  const direct = await sanityFetch(POST_QUERY, { slug }, null);
  if (direct) return withCleanSlug(direct);

  // No document has this exact (clean) slug — see if one of the raw slugs
  // normalizes to it, so a mistyped Studio slug still resolves under its
  // proper URL instead of 404ing.
  const rawSlugs = await getPostSlugs();
  const rawMatch = rawSlugs.find((s) => normalizeSlug(s) === slug);
  if (!rawMatch) return null;

  const post = await sanityFetch(POST_QUERY, { slug: rawMatch }, null);
  return withCleanSlug(post);
}

export function getPostSlugs() {
  return sanityFetch(
    groq`*[_type == "post" && defined(slug.current)].slug.current`,
    {},
    []
  );
}
