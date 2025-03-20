export function generateRobots() {
    return {
      rules: [
        { userAgent: "*", allow: "/" },
        { userAgent: "Googlebot", allow: "/" },
        { userAgent: "Bingbot", disallow: ["/checkout", "/auth"] }, // Prevent search engines from crawling checkout/auth pages
      ],
      sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
    };
  }
  