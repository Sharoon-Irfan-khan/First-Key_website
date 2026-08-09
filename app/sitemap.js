import { developers, allProjectParams } from "@/lib/developers";
import { getPosts, getCategorySlugs } from "@/lib/sanity/queries";

const SITE = "https://firstkeyint.com";

// Hand-written so priority reflects what we actually want ranked, rather than
// every route landing on the same default.
const STATIC_ROUTES = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/developers", priority: 0.9, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
  { path: "/list-property", priority: 0.7, changeFrequency: "monthly" },
  { path: "/careers", priority: 0.5, changeFrequency: "monthly" },
  { path: "/blogs", priority: 0.8, changeFrequency: "weekly" },
];

export default async function sitemap() {
  const [posts, categorySlugs] = await Promise.all([
    getPosts(),
    getCategorySlugs(),
  ]);

  const now = new Date();

  return [
    ...STATIC_ROUTES.map((r) => ({
      url: `${SITE}${r.path}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...developers.map((d) => ({
      url: `${SITE}/developers/${d.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    })),
    ...allProjectParams.map((p) => ({
      url: `${SITE}/developers/${p.slug}/${p.project}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    })),
    ...categorySlugs.map((slug) => ({
      url: `${SITE}/category/${slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    })),
    ...posts
      .filter((p) => p.slug)
      .map((p) => ({
        url: `${SITE}/blogs/${p.slug}`,
        lastModified: p.publishedAt ? new Date(p.publishedAt) : now,
        changeFrequency: "monthly",
        priority: 0.6,
      })),
  ];
}
