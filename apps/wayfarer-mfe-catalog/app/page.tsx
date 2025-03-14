import { Suspense } from "react";
import FilterControls from "./components/FilterControls";
import UpdateParamsProvider from "./components/FilterControls/UpdateParamsProvider";
import ProductListServer from "./components/ProductList/ProductListServer";
import ProductListSkeleton from "./components/ProductList/ProductListSkeleton";

const API_URL = "https://fakestoreapi.com/products";

// Fetch categories on the server
const getCategories = async () => {
  const res = await fetch(`${API_URL}/categories`, { cache: "no-store" });
  return res.json();
};

export default async function Catalog({ searchParams }: { searchParams: Record<string, string> }) {
  const filters = (await searchParams);
  const categories = await getCategories(); // Fetch categories on the server

  return (
    <>
      <UpdateParamsProvider>
        <Suspense fallback={<div>Loading Filters...</div>}>
          <FilterControls categories={categories} />
        </Suspense>
      </UpdateParamsProvider>

      {/* Products are streamed */}
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductListServer searchParams={filters} />
      </Suspense>
    </>
  );
}
