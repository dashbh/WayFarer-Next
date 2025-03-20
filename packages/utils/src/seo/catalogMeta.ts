import { Metadata } from "next";

export const generateCatalogMetadata = (): Metadata => ({
  title: "Shop All Categories - Best Deals | WayFarer",
  description: "Explore a wide range of products across multiple categories at the best prices.",
  keywords: ["shop online", "best deals", "discounts", "categories", "WayFarer"].join(", "),
  openGraph: {
    title: "Shop All Categories - Best Deals | WayFarer",
    description: "Explore a wide range of products across multiple categories at the best prices.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/explore`,
    images: [
      {
        url: "/catalog-default.jpg",
        width: 1200,
        height: 630,
        alt: "WayFarer Catalog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop All Categories - Best Deals | WayFarer",
    description: "Explore a wide range of products across multiple categories at the best prices.",
    images: ["/catalog-default.jpg"],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/explore`,
  },
});
