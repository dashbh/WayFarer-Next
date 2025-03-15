import ProductList from "../ProductList";

const API_URL = "https://fakestoreapi.com/products";

const getProducts = async () => {
  const res = await fetch(API_URL, { cache: "no-store" });
  return res.json();
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

  return <ProductList products={filtered} />;
};

export default ProductListServer;
