"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const OrderSummary = () => {
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

  if (loading) return '<Spinner />';

  const total = products.reduce((sum, product) => sum + product.price, 0);

  return (
   'hello'
  );
};

export default OrderSummary;
