/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/blog",
  output: "standalone",
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || "",
};

export default nextConfig;
