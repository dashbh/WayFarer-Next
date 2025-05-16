"use client";

import { useEffect, useState } from "react";
import { WayFarerLoader } from "@wayfarer/ui";
import CartSummary from "@/components/CartSummary";
import CartActions from "@/components/CartActions";
import CartItems from "@/components/CartItemsList";
import { CartResponseType } from "@wayfarer/types";
import EmptyCart from "@/components/EmptyCart";

const API_URL = `${process.env.NEXT_PUBLIC_WAYFARER_API_URL}/api/cart`;

const CartClient = () => {
  const [loading, setLoading] = useState(true);

  const [cart, setCart] = useState<CartResponseType>();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch cart data");
        }

        const data = await response.json();
        setCart(data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  if (loading) return <WayFarerLoader />;

  if (!cart || !cart.items || cart.items.length === 0) return <EmptyCart />

  return (
    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="flex items-start justify-between">
          <div className="text-lg font-medium text-gray-900">Shopping cart</div>
        </div>

        <CartItems cartItems={cart.items} />
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <CartSummary cart={cart}/>
        <CartActions />
      </div>
    </div>
  );
};

export default CartClient;
