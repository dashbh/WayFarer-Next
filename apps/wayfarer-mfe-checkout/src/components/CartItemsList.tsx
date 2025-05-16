import React from "react";
import CartItem from "./CartItem";
import { CartItemType } from "@wayfarer/types";

interface CartItemsProps {
  cartItems: CartItemType[];
}

const CartItems: React.FC<CartItemsProps> = ({ cartItems }) => (
  <>
    <div className="mt-8">
      <div className="flow-root">
        <ul role="list" className="-my-6 divide-y divide-gray-200">
          {cartItems &&
            cartItems.map((item) => <CartItem key={item.productId} item={item} />)}
        </ul>
      </div>
    </div>
  </>
);

export default CartItems;
