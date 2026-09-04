/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Lets a verification build run into its own folder so it never clobbers the
  // .next cache a running `npm run dev` is using.
  distDir: process.env.NEXT_DIST_DIR || ".next",

  images: {
    // Photography here almost never changes after publish, so let the CDN and
    // browser hold optimized variants far longer than Next's 60s default.
    minimumCacheTTL: 60 * 60 * 24 * 30,
    formats: ["image/avif", "image/webp"],
  },

  // Short ways in to the CMS. Sanity's own "Open Sanity Studio" button routes
  // through their Dashboard, which cannot render a v3 Studio, so editors need
  // an address they can type from memory instead.
  async redirects() {
    return [
      ...["/admin", "/cms"].map((source) => ({
        source,
        destination: "/studio",
        permanent: false,
      })),
      // Categories moved up to the root. Permanent so search engines transfer
      // the old address's standing rather than treating it as a second page.
      {
        source: "/blogs/category/:slug",
        destination: "/category/:slug",
        permanent: true,
      },

      // --- Google Search Console 404 cleanup (old site's URLs) ---
      // Next strips a trailing slash (308) before custom redirects run, so
      // every source below is written without one — it never reaches this
      // list with the slash still on.

      // The old homepage address.
      { source: "/home", destination: "/", permanent: true },

      // The old property-listing hub had no direct replacement page; the
      // developers hub is the current equivalent (every listing lives under
      // a developer there).
      { source: "/property", destination: "/developers", permanent: true },

      // Individual old listings. Danube and this Missoni-branded interior
      // collection are not developers this site currently represents, so
      // there is no specific project to land on — the developers hub is the
      // closest honest match. The Ellington listing DOES match a current
      // developer, so it goes straight to that developer's live projects
      // instead of the generic hub.
      {
        source: "/property/octa-isle-interiors-by-missoni",
        destination: "/developers",
        permanent: true,
      },
      {
        source: "/property/breez-by-danube",
        destination: "/developers",
        permanent: true,
      },
      {
        source: "/property/soto-grande-by-ellington-properties",
        destination: "/developers/ellington",
        permanent: true,
      },

      // Old listing-status taxonomy page ("for sale" filter). The developers
      // hub is the current browse-all-listings destination.
      { source: "/status/for-sale", destination: "/developers", permanent: true },

      // This post's slug was saved in the Studio as the literal title
      // instead of a proper slug. The app now normalizes every slug it
      // serves (see lib/sanity/queries.js), so the clean form below is the
      // real canonical URL; this sends the old malformed address there.
      // Encoded because the source matcher runs against the raw request
      // path, which never contains a literal space.
      {
        source: "/blogs/How%20to%20Calculate%20ROI%20on%20a%20Dubai%20Property",
        destination: "/blogs/how-to-calculate-roi-on-a-dubai-property",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
