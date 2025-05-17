import React, { useState } from "react";
import NextLink from "next/link";
import { toast } from "sonner";

const API_URL = `${process.env.NEXT_PUBLIC_WAYFARER_API_URL}/api/cart`;

const CartActions: React.FC = () => {
  const [loading, setLoading] = useState(false);

  // Example: Replace with your actual API endpoint and auth logic
  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/checkout`, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Checkout failed");
      // Redirect or show success
      toast.success("Order Placed !!");
      setTimeout(() => {
        window.location.href = "/order-summary";
      }, 500);
      
    } catch (err) {
      toast.error("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClearCart = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Clear cart failed");
      toast.success("Cart cleared !");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (err) {
      toast.error("Failed to clear cart.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mt-6 flex flex-col gap-2">
        <div className="flex gap-2">
          <button
            className="flex-1 items-center justify-center cursor-pointer rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700 disabled:opacity-50"
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading ? "Processing..." : "Checkout"}
          </button>
          <button
            className="flex-1 items-center justify-center cursor-pointer rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-xs hover:bg-gray-100 disabled:opacity-50"
            onClick={handleClearCart}
            disabled={loading}
          >
            Clear Cart
          </button>
        </div>
      </div>
      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
        <p>
          or{" "}
          <NextLink
            className="font-medium text-indigo-600 hover:text-indigo-500"
            href={`/explore`}
          >
            Continue Shopping
          </NextLink>
        </p>
      </div>
    </>
  );
};

export default CartActions;
