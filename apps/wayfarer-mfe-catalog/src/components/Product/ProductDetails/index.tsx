"use client";

import {
  Box,
  Image,
  Text,
  Button,
  VStack,
  HStack,
  Badge,
  Link,
} from "@chakra-ui/react";
import { WayFarerRatings } from "@wayfarer/ui";
import { Product } from "../../../type";

const ProductDetails = ({ product }: { product: Product }) => {
  return (
    <Box maxW="container.md" mx="auto" p={5}>
      <HStack gap={8} align="start">
        {/* Product Image */}
        <Image
          src={product.image}
          alt={product.title}
          boxSize="300px"
          objectFit="contain"
          borderRadius="md"
        />

        {/* Product Details */}
        <VStack align="start" gap={4}>
          <Text fontSize="2xl" fontWeight="bold">
            {product.title}
          </Text>
          <Badge colorScheme="blue" fontSize="lg">
            {product.category}
          </Badge>
          <Text fontSize="xl" color="green.500" fontWeight="bold">
            ${product.price}
          </Text>
          <Text>{product.description}</Text>
          <HStack gap={4}>
            <Button colorScheme="blue" size="lg" asChild>
              <Link href={`/checkout/cart?ids=${product.id}`}>
                Buy Now
              </Link>
            </Button>
            <Button colorScheme="gray" variant="outline">
              Add to Wishlist
            </Button>
          </HStack>

          <HStack gap={4}>
            <WayFarerRatings rating={product.rating} />
          </HStack>

          <Text fontSize="xl" color="teal.500" fontWeight="bold">
            Specifications
          </Text>
          <Text>{product.description}</Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default ProductDetails;
