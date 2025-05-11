/** @type {import('next').NextConfig} */

const { NEXT_MFE_CHECKOUT } = process.env;

const nextConfig = {
  output: "standalone",
  assetPrefix: NEXT_MFE_CHECKOUT,
};

export default nextConfig;
