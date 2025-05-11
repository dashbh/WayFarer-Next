"use client";

import { Product } from "../../type";
import ProductPreview from "../Product/ProductPreview";

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
      {products.map((product) => (
        <ProductPreview product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductList;