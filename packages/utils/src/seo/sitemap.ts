export async function generateSitemap() {
    const baseUrl = `${process.env.NEXT_PUBLIC_SITE_URL}`;
  
    // Fetch dynamic product and category URLs (if needed)
    const products = await fetch("https://fakestoreapi.com/products").then((res) => res.json());
  
    return [
      { url: `${baseUrl}/`, lastModified: new Date() },
      { url: `${baseUrl}/explore`, lastModified: new Date() },
      { url: `${baseUrl}/cart`, lastModified: new Date() },
      { url: `${baseUrl}/auth/login`, lastModified: new Date() },
      ...products.map((p: any) => ({
        url: `${baseUrl}/explore/products/${p.id}`,
        lastModified: new Date(),
      })),
    ];
  }
  