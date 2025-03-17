/** @type {import('next').NextConfig} */

const { NEXT_MFE_AUTH } = process.env;

const nextConfig = {
  output: "standalone",
  assetPrefix: NEXT_MFE_AUTH,
};

export default nextConfig;
