/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/explore",
  output: "standalone",
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || "",
};

export default nextConfig;
