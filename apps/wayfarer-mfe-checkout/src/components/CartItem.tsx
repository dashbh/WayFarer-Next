import Image from "next/image";
import React, { useState } from "react";
import { CartItemType } from "@wayfarer/types";
const API_URL = `${process.env.NEXT_PUBLIC_WAYFARER_API_URL}/api/cart`;

const CartItem: React.FC<{ item: CartItemType }> = ({ item }) => {
  const [loading, setLoading] = useState(false);
  const [clearMsg, setClearMsg] = useState<string | null>(null);

  // Example: Replace with your actual API endpoint and auth logic
  const handleRemoveItem = async () => {
    setLoading(true);
    setClearMsg(null);
    try {
      const res = await fetch(`${API_URL}/remove`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: item.productId,
        }),
      });
      if (!res.ok) throw new Error("Removing failed");
      // Redirect or show success
      window.location.reload();
    } catch (err) {
      setClearMsg("Removing failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <li key={item.productId} className="flex py-6">
        <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
          <Image
            alt={item.title}
            src={`${item.imageUrl || ""}?id=${Math.random().toString(36).substr(2, 9)}`}
            width={96}
            height={96}
            className="size-full object-cover"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <h3>
                <a href={`/explore/products/${item.productId}`}>{item.title}</a>
              </h3>
              <div className="flex flex-col">
                <p className="ml-4 line-through text-gray-500">
                  {item.currency}
                  {item.price}
                </p>
                <p className="ml-4 text-green-500">
                  {item.currency}
                  {item.discountPrice}
                </p>
              </div>
            </div>
            <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500">Qty {item.quantity}</p>

            <div className="flex">
              <button
                type="button"
                onClick={handleRemoveItem}
                disabled={loading}
                className="font-medium cursor-pointer text-indigo-600 hover:text-indigo-500"
              >
                Remove
              </button>
            </div>
          </div>
          {clearMsg && (
            <div className="mt-2 text-center text-sm text-red-500">
              {clearMsg}
            </div>
          )}
        </div>
      </li>
    </>
  );
};

export default CartItem;
