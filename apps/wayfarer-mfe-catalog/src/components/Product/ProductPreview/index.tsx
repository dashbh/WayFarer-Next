"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "../../../type";
import { WayFarerRatings } from "@wayfarer/ui";

const ProductPreview = ({ product }: { product: Product }) => {
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden p-4 hover:shadow-lg transition-shadow duration-200 ease-in-out">
      <div className="grid grid-cols-5 gap-4 items-center">
        <div className="col-span-2">
          <Link href={`/explore/products/${product.id}`}>
            <Image
              src={`${product.imageUrl}?random=${product.id}`}
              alt={product.title}
              width={180}
              height={180}
              className="object-cover w-full h-full rounded-md"
              unoptimized
            />
          </Link>
        </div>
        <div className="col-span-3 flex flex-col gap-2">
          <p className="font-bold text-lg">{product.title}</p>
          <span className="inline-block w-fit bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
            {product.category}
          </span>
          <p className="text-xl text-green-500 font-bold">${product.price}</p>

          {/* Ratings */}
          <WayFarerRatings rating={product.rating} />

          <div>
            <Link href={`/explore/products/${product.id}`}>
              <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">
                View Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;
