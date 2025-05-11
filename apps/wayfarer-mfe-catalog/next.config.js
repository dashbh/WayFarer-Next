/** @type {import('next').NextConfig} */

const NEXT_MFE_CATALOG = process.env.NEXT_MFE_CATALOG || "";

const nextConfig = {
  output: "standalone",
  assetPrefix: NEXT_MFE_CATALOG,
  // images: {
  //   domains: ["picsum.photos", "placehold.co"],
  // },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
