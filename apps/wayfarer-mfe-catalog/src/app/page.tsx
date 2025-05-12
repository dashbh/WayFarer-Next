import { Suspense } from "react";
import {
  generateCatalogJsonLD,
  generateCatalogMetadata,
} from "@wayfarer/utils";
import FilterControls from "@/components/FilterControls";
import UpdateParamsProvider from "@/components/FilterControls/UpdateParamsProvider";
import ProductListServer from "@/components/ProductList/ProductListServer";
import ProductListSkeleton from "@/components/ProductList/ProductListSkeleton";
import { Metadata } from "next";
// import JsonLdWrapper from "@wayfarer/utils";

interface CatalogPageProps {
  searchParams: Promise<Record<string, string>>;
}

const API_URL = "https://fakestoreapi.com/products";

export const metadata: Metadata = generateCatalogMetadata();

// Fetch categories on the server
const getCategories = async () => {
  const res = await fetch(`${API_URL}/categories`, {
    next: { revalidate: 60 },
    credentials: "include",
  });
  return res.json();
};

export default async function Catalog({ searchParams }: CatalogPageProps) {
  const filters = await searchParams;
  const categories = await getCategories(); // Fetch categories on the server

  return (
    <>
      {/* <JsonLdWrapper data={generateCatalogJsonLD()} />  Need to check */}
      <div className="flex flex-col lg:flex-row gap-6 px-4 sm:px-6 lg:px-8 py-8">
        {/* Sidebar for Filters */}
        <aside className="w-full lg:w-1/4">
          <UpdateParamsProvider>
            <Suspense fallback={<div>Loading Filters...</div>}>
              <FilterControls categories={categories} />
            </Suspense>
          </UpdateParamsProvider>
        </aside>

        {/* Main Content for Product List */}
        <main className="flex-1">
          <Suspense fallback={<ProductListSkeleton />}>
            <ProductListServer searchParams={filters} />
          </Suspense>
        </main>
      </div>
    </>
  );
}
