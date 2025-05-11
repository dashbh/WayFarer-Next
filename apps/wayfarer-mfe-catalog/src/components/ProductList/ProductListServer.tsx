import { cookies } from "next/headers";
import ProductList from ".";

const API_URL = `${process.env.NEXT_PUBLIC_WAYFARER_API_URL}/catalog`;

const getProducts = async () => {
  try {
    // const res = await fetch(API_URL, { next: { revalidate: 60 } });

    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString(); 

    const res = await fetch(API_URL, {
      method: 'GET',
      headers: { Cookie: cookieHeader },
      next: { revalidate: 60 },
    });


    if (!res.ok) {
      throw new Error(`Failed to fetch products. Status: ${res.status}`);
    }

    const response = await res.json();
    console.log(response);
    return response.data;

  } catch (error: any) {
    console.error('Error fetching products:', error?.message);

    // Return fallback data, e.g., an empty array or null
    return [];
  }
};

const ProductListServer = async ({ searchParams }: { searchParams: Record<string, string> }) => {
  const products = await getProducts();

  // Apply filters on the server
  let filtered = [...products];

  const category = searchParams.category;
  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }

  const minPrice = Number(searchParams.minPrice) || 0;
  const maxPrice = Number(searchParams.maxPrice) || 1000;
  filtered = filtered.filter((p) => p.price >= minPrice && p.price <= maxPrice);

  const rating = Number(searchParams.rating) || 0;
  if (rating > 0) {
    filtered = filtered.filter((p) => p.rating.rate >= rating);
  }

  const query = searchParams.search || "";
  if (query) {
    filtered = filtered.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()));
  }

  const sort = searchParams.sort;
  if (sort === "price_asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "price_desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === "rating_desc") {
    filtered.sort((a, b) => b.rating.rate - a.rating.rate);
  }

  return <ProductList products={products} />;
};

export default ProductListServer;
