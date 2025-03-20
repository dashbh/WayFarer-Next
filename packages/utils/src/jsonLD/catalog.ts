export const generateCatalogJsonLD = (products: any[]) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: products.map((product, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `${process.env.NEXT_PUBLIC_HOME_URL}/explore/products/${product.id}`,
  })),
});
