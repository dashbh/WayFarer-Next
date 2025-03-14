import { Suspense } from "react";
import CatalogPage from "./components/CatalogPage";

export default function Catalog() {
  return (
    <Suspense fallback={<div>Loading catalog...</div>}>
      <CatalogPage />
    </Suspense>
  );
}
