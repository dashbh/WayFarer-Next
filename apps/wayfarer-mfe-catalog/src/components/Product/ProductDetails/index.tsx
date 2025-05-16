"use client";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Image from "next/image";

import { Product } from "../../../type";
import { useState } from "react";

const API_URL = `${process.env.NEXT_PUBLIC_WAYFARER_API_URL}/api/cart`;

const ProductDetails = ({ product }: { product: Product }) => {
  const [isAdding, setIsAdding] = useState(false); // State to track API call progress
  const reviews = { href: "#", average: 4, totalCount: 117 };

  const handleAddToCart = async () => {
    setIsAdding(true); // Show spinner
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
        }),
        credentials: "include", // Include cookies in the request
      });

      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }

      console.log("Product added to cart successfully!"); // Show success toast
    } catch (error) {
      console.log("Failed to add product to cart."); // Show error toast
    } finally {
      setIsAdding(false); // Hide spinner
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-4 sm:px-6 lg:px-8 py-8">
      {/* Image gallery */}
      <div className="w-full md:w-1/2">
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:max-w-7xl lg:px-8">
          {/* First Image - Full Width */}
          <div className="w-full text-center flex justify-left">
            <Image
              alt={`Image 1 of ${product.title}`}
              src={`${product.imageUrl || ""}?id=${Math.random().toString(36).substr(2, 9)}`}
              className="items-center rounded-lg"
              width={500}
              height={500}
            />
          </div>

          {/* Remaining Images - Side by Side */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <Image
              alt={`Image 2 of ${product.title}`}
              src={`${product.imageUrls[0] || ""}?id=${Math.random().toString(36).substr(2, 9)}`}
              className="rounded-lg"
              width={200}
              height={200}
            />
            <Image
              alt={`Image 3 of ${product.title}`}
              src={`${product.imageUrls[1] || ""}?id=${Math.random().toString(36).substr(2, 9)}`}
              className="rounded-lg"
              width={200}
              height={200}
            />
            <Image
              alt={`Image 4 of ${product.title}`}
              src={`${product.imageUrls[2] || ""}?id=${Math.random().toString(36).substr(2, 9)}`}
              className="rounded-lg"
              width={200}
              height={200}
            />
          </div>
        </div>
      </div>

      {/* Product info */}
      <div className="mt-4 gap-2 w-full md:w-1/2">
        <div className="lg:pr-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {product.title}
          </h1>
          <span className="inline-block w-fit bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
            {product.category}
          </span>
          <p className="text-sm text-gray-500 mt-2">SKU: {product.sku}</p>
          <p className="text-sm text-gray-500">Brand: {product.brand}</p>
        </div>

        {/* Options */}
        <div className="mt-4 lg:mt-0">
          <h2 className="sr-only">Product information</h2>
          <p className="mt-2 text-3xl text-teal-700">
            {product.currency} {product.discountPrice?.toFixed(2)}
          </p>
          {product.discountPrice && (
            <p className="text-lg text-gray-500 font-bold line-through">
              MRP: {product.currency} {product.price}
            </p>
          )}

          {/* Reviews */}
          <div className="mt-6">
            <h3 className="sr-only">Reviews</h3>
            <div className="flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <span
                    key={rating}
                    aria-hidden="true"
                    className="size-5 shrink-0"
                  >
                    {reviews.average > rating ? (
                      <AiFillStar className="text-gray-900" />
                    ) : (
                      <AiOutlineStar className="text-gray-200" />
                    )}
                  </span>
                ))}
              </div>
              <p className="sr-only">{reviews.average} out of 5 stars</p>
              <a
                href={reviews.href}
                className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                {reviews.totalCount} reviews
              </a>
            </div>
          </div>

          {/* Description */}
          <div className="py-10 lg:pt-6 lg:pr-8 lg:pb-8">
            <h3 className="text-lg font-medium text-gray-900">Description</h3>
            <p className="text-base text-gray-900 mt-4">
              {product.description}
            </p>
          </div>

          {/* Highlights */}
          <div className="mt-5">
            <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
            <ul role="list" className="list-disc space-y-2 pl-4 text-sm mt-4">
              {product.tags.map((highlight) => (
                <li key={highlight} className="text-gray-400">
                  <span className="text-gray-600">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Dimensions */}
          <div className="mt-5">
            <h3 className="text-sm font-medium text-gray-900">Dimensions</h3>
            <p className="text-sm text-gray-600 mt-2">
              Length: {product.length} cm <br />
              Width: {product.width} cm <br />
              Height: {product.height} cm
            </p>
            <p className="text-sm text-gray-600">Weight: {product.weight} kg</p>
          </div>

          {/* Sizes */}
          <div className="mt-5">
            <h3 className="text-sm font-medium text-gray-900">Supplier</h3>
            <p className="text-sm text-gray-600 mt-2">{product.supplier}</p>
          </div>

          <div className="mt-5 flex justify-start">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`mt-10 text-white text-sm px-4 py-2 rounded cursor-pointer ${
                isAdding
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {isAdding ? "Adding..." : "Add to bag"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
