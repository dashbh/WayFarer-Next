/** @type {import('next').NextConfig} */

const {
  NEXT_PUBLIC_CATALOG_URL,
  NEXT_PUBLIC_BLOG_URL,
  NEXT_MFE_CATALOG,
  NEXT_MFE_HOME,
  NEXT_MFE_BLOG,
} = process.env;

const nextConfig = {
  output: "standalone",
  assetPrefix: NEXT_MFE_HOME,

  async rewrites() {
    return [
      {
        source: "/explore/:path*",
        destination: `${NEXT_PUBLIC_CATALOG_URL}/:path*`,
      },
      {
        source: `${NEXT_MFE_CATALOG}/_next/:path+`,
        destination: `${NEXT_PUBLIC_CATALOG_URL}${NEXT_MFE_CATALOG}/_next/:path+`,
      },
      {
        source: "/blog/:path*",
        destination: `${NEXT_PUBLIC_BLOG_URL}/:path*`,
      },
      {
        source: `${NEXT_MFE_BLOG}/_next/:path+`,
        destination: `${NEXT_PUBLIC_BLOG_URL}${NEXT_MFE_BLOG}/_next/:path+`,
      },
    ];
  },
};

export default nextConfig;
