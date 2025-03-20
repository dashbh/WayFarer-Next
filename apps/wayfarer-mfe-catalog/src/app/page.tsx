import { Suspense } from "react";
import { generateCatalogMetadata } from "@wayfarer/utils";
import FilterControls from "@/components/FilterControls";
import UpdateParamsProvider from "@/components/FilterControls/UpdateParamsProvider";
import ProductListServer from "@/components/ProductList/ProductListServer";
import ProductListSkeleton from "@/components/ProductList/ProductListSkeleton";
import { Metadata } from "next";

interface CatalogPageProps {
  searchParams: Promise<Record<string, string>>;
}

const API_URL = "https://fakestoreapi.com/products";

export const metadata: Metadata = generateCatalogMetadata();

// Fetch categories on the server
const getCategories = async () => {
  const res = await fetch(`${API_URL}/categories`, { next: { revalidate: 60 } });
  return res.json();
};

export default async function Catalog({ searchParams }: CatalogPageProps) {
  const filters = await searchParams;
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
