"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Box, Button, Spinner, Text } from "@chakra-ui/react";
import OrderSuccess from "./OrderSuccess";

const OrderSummaryClient = () => {
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

  const total = products.reduce((sum, product) => sum + product.price, 0);

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>
        Order Summary
      </Text>
      {products.length === 0 ? (
        <Text>No items in order</Text>
      ) : (
        <>
          <OrderSuccess />
          {products.map((product) => (
            <Box key={product.id} p={2} border="1px solid #ddd" mb={2}>
              <Text>{product.title}</Text>
              <Text>${product.price}</Text>
            </Box>
          ))}
          <Text fontSize="xl" mt={4}>
            Total: ${total.toFixed(2)}
          </Text>
          {/* <Button colorScheme="green" mt={4}>
            Place Order
          </Button> */}
        </>
      )}
    </Box>
  );
};

export default OrderSummaryClient;
