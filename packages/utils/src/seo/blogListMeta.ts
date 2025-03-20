import { Metadata } from "next";

export const generateBlogListMetadata = (): Metadata => ({
  title: "Latest Blogs & Articles - WayFarer",
  description: "Read the latest insights, guides, and updates on WayFarer.",
  keywords: "WayFarer blog, latest articles, WayFarer insights",
  openGraph: {
    title: "Latest Blogs & Articles - WayFarer",
    description:
      "Stay updated with the latest insights and stories from WayFarer.",
    url: `${process.env.NEXT_PUBLIC_HOME_URL}/blog`,
    type: "website",
  },
});
