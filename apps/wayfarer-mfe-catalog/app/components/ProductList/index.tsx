"use client";

import {
  SimpleGrid,
} from "@chakra-ui/react";
import { Product } from "../../type";
import ProductPreview from "../Product/ProductPreview";

interface ProductListProps {
  products: Product[]
};

const ProductList = ({ products }: ProductListProps) => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} gap={5}>
      {products.map((product) => (
        <ProductPreview product={product} key={product.id}/>
      ))}
    </SimpleGrid>
  );
};

export default ProductList;
