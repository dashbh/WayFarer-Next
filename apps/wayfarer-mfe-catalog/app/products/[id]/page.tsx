import { Box, Image, Text, Button, VStack, HStack, Badge } from "@chakra-ui/react";
import { WayFarerRatings } from "@wayfarer/ui";
import ProductDetails from "../../components/Product/ProductDetails";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await fetch(`https://fakestoreapi.com/products/${params.id}`).then(res => res.json());

  return (
    <ProductDetails product={product} />
  );
}
