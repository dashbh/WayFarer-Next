"use client";

import { OrderResponseType } from "@wayfarer/types";
import { WayFarerLoader } from "@wayfarer/ui";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
  orderId: string;
}

const API_URL = `${process.env.NEXT_PUBLIC_WAYFARER_API_URL}/api/order`;

export default function OrderStatus({ orderId }: Props) {
  const [order, setOrder] = useState<OrderResponseType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetOrderItem = async () => {
      try {
        const response = await fetch(`${API_URL}/${orderId}`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch order");
        }

        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error("Failed to fetch order:", error);
        toast.error("Failed to retrieve orders");
      } finally {
        setLoading(false);
      }
    };

    fetOrderItem();
  }, []);

  if (loading) return <WayFarerLoader />;

  if (!order) return <p className="text-gray-600">Order not found.</p>;

  return (
    <div className="border border-gray-300 p-4 rounded-lg shadow-sm">
      <p className="mb-2">
        <span className="font-semibold">Order ID:</span> {order.orderId}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Status:</span> {order.orderStatus}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Total:</span> $
        {order.total && order.total.toFixed(2)}
      </p>
    </div>
  );
}
