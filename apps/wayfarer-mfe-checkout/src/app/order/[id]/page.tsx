"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import type { OrderResponseType, CartItemType } from "@wayfarer/types";
import { toast } from "sonner";
import { WayFarerLoader } from "@wayfarer/ui";

const API_URL = `${process.env.NEXT_PUBLIC_WAYFARER_API_URL}/api/order`;

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<OrderResponseType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetOrderItem = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
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

  if (loading) {
    return (
      <>
        <div className="max-w-2xl mx-auto py-10 px-4">
          <div className="animate-pulse h-8 bg-gray-200 rounded mb-4 w-1/2"></div>
          <div className="animate-pulse h-40 bg-gray-100 rounded mb-4"></div>
          <div className="animate-pulse h-6 bg-gray-200 rounded mb-2 w-1/3"></div>
          <div className="animate-pulse h-6 bg-gray-200 rounded mb-2 w-1/4"></div>
        </div>
        <WayFarerLoader />
      </>
    );
  }

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto py-10 px-4 text-center text-gray-500">
        Order not found.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <div className="mb-6 border rounded-lg p-4 bg-white shadow">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div>
            <div className="font-semibold text-lg">
              Order ID: <span className="font-mono">{id}</span>
            </div>
            <div className="text-gray-500 text-sm">
              {order.createdAt
                ? new Date(order.createdAt).toLocaleString()
                : ""}
            </div>
          </div>
          <div className="mt-2 md:mt-0">
            <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
              {order.orderStatus || "Processing"}
            </span>
          </div>
        </div>
        <div className="mt-4">
          <h2 className="font-semibold mb-2">Items</h2>
          <ul>
            {order.items.map((item: CartItemType) => (
              <li
                key={item.productId}
                className="flex items-center gap-4 py-2 border-b last:border-b-0"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={64}
                  height={64}
                  className="w-16 h-16 object-cover rounded border"
                />
                <div className="flex-1">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-gray-500">{item.brand}</div>
                  <div className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">
                    {item.currency} {item.discountPrice || item.price}
                  </div>
                  {item.discountPrice && (
                    <div className="text-xs text-gray-400 line-through">
                      {item.currency} {item.price}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 border-t pt-4">
          <div className="flex justify-between mb-1">
            <span>Subtotal</span>
            <span>
              {order.currency} {order.subTotal?.toFixed(2) ?? "-"}
            </span>
          </div>
          {order.totalDiscount ? (
            <div className="flex justify-between mb-1">
              <span>Total Discount</span>
              <span className="text-green-600">
                - {order.currency} {order.totalDiscount.toFixed(2)}
              </span>
            </div>
          ) : null}
          {order.taxes ? (
            <div className="flex justify-between mb-1">
              <span>Taxes</span>
              <span>
                {order.currency} {order.taxes.toFixed(2)}
              </span>
            </div>
          ) : null}
          <div className="flex justify-between font-bold text-lg mt-2">
            <span>Total</span>
            <span>
              {order.currency} {order.total?.toFixed(2) ?? "-"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
