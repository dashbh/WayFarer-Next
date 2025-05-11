"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "../../../type";
import { WayFarerRatings } from "@wayfarer/ui";

const ProductPreview = ({ product }: { product: Product }) => {
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden p-4 hover:shadow-lg transition-shadow duration-200 ease-in-out">
      <Link href={`/explore/products/${product.id}`}>
        <Image
          src={product.imageUrl}
          alt={product.title}
          width={144} // Equivalent to w-36 (36 * 4 = 144px)
          height={144} // Equivalent to h-36 (36 * 4 = 144px)
          className="object-contain mx-auto"
        />
      </Link>

      <div className="flex flex-col items-start gap-2 mt-3">
        <p className="font-bold text-lg">{product.title}</p>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
          {product.category}
        </span>
        <p className="text-xl text-green-500 font-bold">${product.price}</p>

        {/* Ratings */}
        <WayFarerRatings rating={product.rating} />

        <div>
          <Link href={`/explore/products/${product.id}`}>
            <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;
