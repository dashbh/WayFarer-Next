"use client";

import { OrderResponseType } from "@wayfarer/types";
import { WayFarerLoader } from "@wayfarer/ui";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// Sample JSON data for orders
enum OrderStatus {
  Delivered = "Delivered",
  Shipped = "Shipped",
  Processing = "Pending",
  Cancelled = "Cancelled",
}

const statusColorMap: Record<OrderStatus, string> = {
  [OrderStatus.Delivered]: "text-green-600 bg-green-100",
  [OrderStatus.Shipped]: "text-blue-600 bg-blue-100",
  [OrderStatus.Processing]: "text-yellow-700 bg-yellow-100",
  [OrderStatus.Cancelled]: "text-red-600 bg-red-100",
};

// Helper to render status with color
function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${statusColorMap[status]}`}
    >
      {status}
    </span>
  );
}

function isOrderStatus(value: string): value is OrderStatus {
  return Object.values(OrderStatus).includes(value as OrderStatus);
}

const API_URL = `${process.env.NEXT_PUBLIC_WAYFARER_API_URL}/api/order`;

export default function OrderPage() {
  const [loading, setLoading] = useState(true);

  const [orderList, setOrderList] = useState<OrderResponseType[]>();
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  useEffect(() => {
    const fetchOrderList = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch order");
        }

        const data = await response.json();
        setOrderList(data.data);
      } catch (error) {
        console.error("Failed to fetch order:", error);
        toast.error("Failed to retrieve orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderList();
  }, []);

  if (loading) return <WayFarerLoader />;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
      <div className="space-y-4">
        {orderList &&
          orderList.map((order) => (
            <div
              key={order.orderId}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md cursor-pointer bg-white flex flex-col md:flex-row md:items-center md:justify-between"
              onClick={() => setSelectedOrder(order)}
            >
              <div>
                <div className="font-semibold text-lg">{order.orderId}</div>
                <div className="text-gray-500 text-sm">
                  {new Date(`${order.createdAt}`)?.toDateString()}
                </div>
                <div className="text-gray-700 mt-1">
                  Status:{" "}
                  {isOrderStatus(order.orderStatus) && (
                    <StatusBadge status={order.orderStatus} />
                  )}
                </div>
              </div>
              <div className="mt-2 md:mt-0 text-right">
                <div className="text-gray-700 font-semibold">
                  Total: ${order.total && order.total.toFixed(2)}
                </div>
                <div className="text-gray-500 text-sm">
                  {order.items.length} items
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Modal for order details */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl"
              onClick={() => setSelectedOrder(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-2">Order {selectedOrder.orderId}</h2>
            <div className="text-gray-500 mb-2">{new Date(`${selectedOrder.createdAt}`)?.toDateString()}</div>
            <div className="mb-2">
              <span className="font-semibold">Status:</span>{" "}
              {isOrderStatus(selectedOrder.orderStatus) && (
                    <StatusBadge status={selectedOrder.orderStatus} />
                  )}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Shipping:</span>{" "}
              {selectedOrder.shippingType}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Address:</span>{" "}
              {selectedOrder.shippingAddress}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Items:</span>
              <ul className="list-disc list-inside mt-1">
                {selectedOrder.items.map((item: any, idx: number) => (
                  <li key={idx}>
                    {item.title} &times; {item.quantity}{" "}
                    <span className="text-gray-500">
                      (${item.price.toFixed(2)} each)
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="font-bold text-right">
              {selectedOrder.total.toFixed(2)}
              <div className="mt-4 flex justify-end">
                <a
                  href={`/checkout/order/${selectedOrder.orderId}`}
                  className="inline-flex items-center bg-green-600 text-white px-3 py-2 rounded text-xs hover:bg-green-700 transition"
                >
                  View Details
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
