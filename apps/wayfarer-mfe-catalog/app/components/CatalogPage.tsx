'use client';

import { useState } from "react";
import { Container, VStack } from "@chakra-ui/react";
import ProductList from "./ProductList";
import CategoryFilter from "./CategoryFilter";
import ProductFilters from "./ProductFilters";

const CatalogPage = () => {
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState([1000]);

  return (
    <Container maxW="container.xl">
      <VStack gap={5}>
        <CategoryFilter setCategory={setCategory} />
        <ProductFilters setPriceRange={setPriceRange} />
        <ProductList category={category} priceRange={priceRange} />
      </VStack>
    </Container>
  );
};

export default CatalogPage;
