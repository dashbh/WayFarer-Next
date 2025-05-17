import React from "react";

const EmptyCart: React.FC = () => (
  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
      <div className="flex items-start justify-between">
        <div className="text-lg font-medium text-gray-900">Shopping cart</div>
      </div>
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <svg
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="none"
          style={{ marginBottom: "1rem" }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="12" fill="#f3f4f6" />
          <path
            d="M7 18c-1.1 0-2-.9-2-2V7a2 2 0 012-2h10a2 2 0 012 2v9c0 1.1-.9 2-2 2H7zm0-2h10V7H7v9zm2-7h6v2H9V9z"
            fill="#9ca3af"
          />
        </svg>
        <h2>Your cart is empty</h2>
        <p>Add items to your cart to get started.</p>
      </div>
    </div>
  </div>
);

export default EmptyCart;
