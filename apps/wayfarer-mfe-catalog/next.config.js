/** @type {import('next').NextConfig} */

const { NEXT_MFE_CATALOG } = process.env;

const nextConfig = {
  output: "standalone",
  assetPrefix: NEXT_MFE_CATALOG,
};

export default nextConfig;
