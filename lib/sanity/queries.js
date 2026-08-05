import { groq } from "next-sanity";
import { sanityFetch } from "./client";

const CARD_FIELDS = groq`
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  category,
  excerpt,
  coverImage
`;

export function getPosts() {
  return sanityFetch(
    groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) { ${CARD_FIELDS} }`,
    {},
    []
  );
}

export function getPost(slug) {
  return sanityFetch(
    groq`*[_type == "post" && slug.current == $slug][0] { ${CARD_FIELDS}, body }`,
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
