/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  assetPrefix: process.env.NEXT_PUBLIC_HOME_URL || "",
};

export default nextConfig;
