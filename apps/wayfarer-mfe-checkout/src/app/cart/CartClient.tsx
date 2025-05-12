"use client";

import { useEffect, useState } from "react";
import NextLink from "next/link";
import Image from "next/image";

const API_URL = `${process.env.NEXT_PUBLIC_WAYFARER_API_URL}/cart`;

interface CartItem {
  productId: string;
  title: string;
  imageUrl: string;
  price: string;
  discountPrice: string;
  brand: string;
  quantity: number;
  currency: string;
}

const CartClient = () => {
  const [loading, setLoading] = useState(true);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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
        setCartItems(data.items);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  if (loading) return "<Spinner />";

  return (
    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="flex items-start justify-between">
          <div className="text-lg font-medium text-gray-900">Shopping cart</div>
        </div>

        <div className="mt-8">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {cartItems && cartItems.map((product) => (
                <li key={product.productId} className="flex py-6">
                  <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <Image
                      alt={product.title}
                      src={`${product.imageUrl || ""}?id=${Math.random().toString(36).substr(2, 9)}`}
                      width={96}
                      height={96}
                      className="size-full object-cover"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={`/explore/products/${product.productId}`}>{product.title}</a>
                        </h3>
                        <div className="flex flex-col">
                          <p className="ml-4 line-through text-gray-500">{product.currency}{product.price}</p>
                          <p className="ml-4 text-green-500">{product.currency}{product.discountPrice}</p>
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.brand}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-500">Qty {product.quantity}</p>

                      <div className="flex">
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>$262.00</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6">
          <NextLink
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
            href={`order-summary`}
          >
            Checkout
          </NextLink>
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
      </div>
    </div>
  );
};

export default CartClient;
