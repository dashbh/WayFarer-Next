"use client";

import {
  Box,
  Image,
  Text,
  Button,
  VStack,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { WayFarerRatings } from "@wayfarer/ui";
import Link from "next/link";
import { Product } from "../../../type";

const ProductPreview = ({ product }: { product: Product }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      _hover={{ shadow: "lg" }}
      transition="0.2s ease-in-out"
    >
      <Link href={`/explore/products/${product.id}`}>
        <Image
          src={product.image}
          alt={product.title}
          boxSize="150px"
          objectFit="contain"
          mx="auto"
        />
      </Link>

      <VStack align="start" gap={2} mt={3}>
        <Text fontWeight="bold" fontSize="lg">
          {product.title}
        </Text>
        <Badge colorScheme="blue">{product.category}</Badge>
        <Text fontSize="xl" color="green.500" fontWeight="bold">
          ${product.price}
        </Text>

        {/* Ratings */}
        <WayFarerRatings rating={product.rating} />

        <HStack>
          <Link href={`/explore/products/${product.id}`}>
            <Button colorScheme="blue" size="sm">
              View Details
            </Button>
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ProductPreview;
