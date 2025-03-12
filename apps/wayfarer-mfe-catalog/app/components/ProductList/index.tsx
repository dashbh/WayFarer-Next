'use client';

import { useEffect, useState } from "react";
import { SimpleGrid, Box, Image, Text, Spinner } from "@chakra-ui/react";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
}

const ProductList = ({ category, priceRange }: { category: string, priceRange: number[] }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  console.log(priceRange, 'priceRange');

  useEffect(() => {
    setLoading(true);
    fetch(
      category
        ? `https://fakestoreapi.com/products/category/${category}`
        : "https://fakestoreapi.com/products"
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, [category]);

  if (loading) return <Spinner size="xl" />;

  return (
    <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} gap={5}>
      {products.map((product) => (
        <Box key={product.id} borderWidth="1px" borderRadius="lg" p={4}>
          <Image src={product.image} alt={product.title} boxSize="150px" mx="auto" />
          <Text fontWeight="bold">{product.title}</Text>
          <Text>${product.price}</Text>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default ProductList;