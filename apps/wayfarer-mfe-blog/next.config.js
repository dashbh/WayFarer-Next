/** @type {import('next').NextConfig} */
const { NEXT_MFE_BLOG } = process.env;

const nextConfig = {
  output: "standalone",
  assetPrefix: NEXT_MFE_BLOG,
};
export default nextConfig;
