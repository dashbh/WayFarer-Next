import { CartResponseType } from "@wayfarer/types";
import React from "react";

const CartSummary: React.FC<{ cart: CartResponseType }> = ({ cart }) => (
  <>
    <div className="flex justify-between text-sm text-gray-700 mt-2">
      <span>Subtotal</span>
      <span>
        {cart.currency}
        {cart.subTotal?.toFixed(2) ?? "0.00"}
      </span>
    </div>
    {cart.totalDiscount ? (
      <div className="flex justify-between text-sm text-green-700 mt-1">
        <span>Discount</span>
        <span>
          {cart.currency}
          {cart.totalDiscount.toFixed(2)}
        </span>
      </div>
    ) : null}
    {cart.taxes ? (
      <div className="flex justify-between text-sm text-gray-700 mt-1">
        <span>Taxes</span>
        <span>
          {cart.currency}
          {cart.taxes.toFixed(2)}
        </span>
      </div>
    ) : null}
    <div className="flex justify-between text-base font-medium text-gray-900 mt-2">
      <span>Total</span>
      <span>
        {cart.currency}
        {cart.total?.toFixed(2) ?? "0.00"}
      </span>
    </div>
  </>
);

export default CartSummary;
