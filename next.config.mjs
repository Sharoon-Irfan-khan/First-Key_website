/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Lets a verification build run into its own folder so it never clobbers the
  // .next cache a running `npm run dev` is using.
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
