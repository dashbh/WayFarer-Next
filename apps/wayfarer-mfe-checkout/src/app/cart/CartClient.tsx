"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Box, Button, Flex, Link, Spinner, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import CartContent from "./CartContent";

const CartClient = () => {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const productIds = useMemo(() => {
    const ids = searchParams.get("ids");
    return ids ? ids.split(",") : [];
  }, [searchParams]);

  useEffect(() => {
    if (productIds.length === 0) {
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        const responses = await Promise.all(
          productIds.map((id) =>
            fetch(`https://fakestoreapi.com/products/${id}`).then((res) =>
              res.json()
            )
          )
        );
        setProducts(responses);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [productIds]);

  if (loading) return <Spinner />;

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>
        Cart
      </Text>
      {products.length === 0 ? (
        <Text>No items in cart</Text>
      ) : (
        <>
          {!loading &&
            products.map((product) => (
              <Box key={product.id} p={2} border="1px solid #ddd" mb={2}>
                <CartContent product={product} />
              </Box>
            ))}

          <Flex justify="flex-end">
            <Button colorPalette="green" mt={4} asChild>
              <Link as={NextLink} href={`order-summary?ids=${productIds}`}>
                Place Order
              </Link>
            </Button>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default CartClient;
