export const generateProductJsonLD = (product: any) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.title,
  image: product.image,
  description: product.description,
  brand: { "@type": "Brand", name: product.brand || "Unknown" },
  offers: {
    "@type": "Offer",
    price: product.price,
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: `${process.env.NEXT_PUBLIC_HOME_URL}/product/${product.id}`,
  },
});
