/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  assetPrefix: process.env.NEXT_PUBLIC_HOME_URL || "",

  async rewrites() {
    return [
      {
        source: "/explore/:path*",
        destination: `${process.env.NEXT_PUBLIC_CATALOG_URL}/:path*`,
      },
      {
        source: "/blog/:path*",
        destination: `${process.env.NEXT_PUBLIC_BLOG_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
