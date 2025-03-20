import { Metadata } from "next";

export const generateGlobalMetadata = (): Metadata => ({
  title: "WayFarer - The Best Shopping Experience",
  description: "Shop the latest products with exclusive discounts. Fast shipping worldwide.",
  keywords: "shopping, e-commerce, online store, best deals",
  openGraph: {
    title: "WayFarer - The Best Shopping Experience",
    description: "Shop the latest products with exclusive discounts. Fast shipping worldwide.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    images: [{ url: "/default-og-image.jpg", width: 1200, height: 630, alt: "WayFarer Store" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WayFarer - The Best Shopping Experience",
    description: "Shop the latest products with exclusive discounts.",
    images: ["/default-twitter-image.jpg"],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}`,
  },
});
