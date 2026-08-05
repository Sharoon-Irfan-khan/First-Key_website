/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Lets a verification build run into its own folder so it never clobbers the
  // .next cache a running `npm run dev` is using.
  distDir: process.env.NEXT_DIST_DIR || ".next",

  // Short ways in to the CMS. Sanity's own "Open Sanity Studio" button routes
  // through their Dashboard, which cannot render a v3 Studio, so editors need
  // an address they can type from memory instead.
  async redirects() {
    return ["/admin", "/cms"].map((source) => ({
      source,
      destination: "/studio",
      permanent: false,
    }));
  },
};

export default nextConfig;
