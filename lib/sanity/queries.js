import { groq } from "next-sanity";
import { sanityFetch } from "./client";

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

export function getPosts() {
  return sanityFetch(
    groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) { ${CARD_FIELDS} }`,
    {},
    []
  );
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

export function getPostsByCategory(slug) {
  return sanityFetch(
    groq`*[_type == "post" && defined(slug.current) && category->slug.current == $slug]
         | order(publishedAt desc) { ${CARD_FIELDS} }`,
    { slug },
    []
  );
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

export function getPost(slug) {
  return sanityFetch(
    groq`*[_type == "post" && slug.current == $slug][0] { ${CARD_FIELDS}, body, _updatedAt, ${SEO_FIELDS} }`,
    { slug },
    null
  );
}

export function getPostSlugs() {
  return sanityFetch(
    groq`*[_type == "post" && defined(slug.current)].slug.current`,
    {},
    []
  );
}
