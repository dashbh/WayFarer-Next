import {withSentryConfig} from "@sentry/nextjs";
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
      // {
      //   source: "/user/:path*",
      //   destination: `${NEXT_PUBLIC_AUTH_URL}/:path*`,
      // },
      // {
      //   source: `${NEXT_MFE_AUTH}/_next/:path+`,
      //   destination: `${NEXT_PUBLIC_AUTH_URL}${NEXT_MFE_AUTH}/_next/:path+`,
      // },
    ];
  },
};

// export default nextConfig;


// Injected content via Sentry wizard below

export default withSentryConfig(nextConfig, {
    // For all available options, see:
    // https://www.npmjs.com/package/@sentry/webpack-plugin#options

    org: "wayfarer-64",
    project: "javascript-nextjs",

    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    // tunnelRoute: "/monitoring",

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  }
);
