/** @type {import('next').NextConfig} */

const {
  NEXT_PUBLIC_CATALOG_URL,
  NEXT_PUBLIC_BLOG_URL,
  NEXT_PUBLIC_CHECKOUT_URL,
  NEXT_PUBLIC_AUTH_URL,
  NEXT_MFE_CATALOG,
  NEXT_MFE_HOME,
  NEXT_MFE_BLOG,
  NEXT_MFE_CHECKOUT,
  NEXT_MFE_AUTH
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
      {
        source: "/checkout/:path*",
        destination: `${NEXT_PUBLIC_CHECKOUT_URL}/:path*`,
      },
      {
        source: `${NEXT_MFE_CHECKOUT}/_next/:path+`,
        destination: `${NEXT_PUBLIC_CHECKOUT_URL}${NEXT_MFE_CHECKOUT}/_next/:path+`,
      },
      {
        source: "/user/:path*",
        destination: `${NEXT_PUBLIC_AUTH_URL}/:path*`,
      },
      {
        source: `${NEXT_MFE_AUTH}/_next/:path+`,
        destination: `${NEXT_PUBLIC_AUTH_URL}${NEXT_MFE_AUTH}/_next/:path+`,
      },
    ];
  },
};

export default nextConfig;
