import { Metadata } from "next";

export const generateProductMetadata = (
  product: any,
  productId: string
): Metadata => {
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.title} | WayFarer`,
    description: product.description,
    keywords: product.category
      ? [product.category, "shopping", "buy online"].join(", ")
      : "shopping, buy online",
    openGraph: {
      title: `${product.title} | WayFarer`,
      description: product.description,
      url: `${process.env.NEXT_PUBLIC_HOME_URL}/explore/products/${productId}`,
      images: [
        { url: product.image, width: 800, height: 600, alt: product.title },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description,
      images: [product.image],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_HOME_URL}/explore/products/${productId}`,
    },
  };
};
