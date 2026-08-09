export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The Sanity editor and the form endpoints have nothing for a crawler.
      disallow: ["/studio", "/api/"],
    },
    sitemap: "https://firstkeyint.com/sitemap.xml",
  };
}
