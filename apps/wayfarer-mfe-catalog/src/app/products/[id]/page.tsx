import { Suspense } from "react";
import type { NextPage } from "next/types";
import {
  generateProductJsonLD,
  generateProductMetadata,
} from "@wayfarer/utils";
import ProductDetails from "@/components/Product/ProductDetails";
import { Product } from "@/type";
import ProductReviews from "@/components/Product/ProductReviews";
import { JsonLdWrapper } from "@wayfarer/utils";

const API_URL = `${process.env.NEXT_PUBLIC_WAYFARER_API_URL}/api/catalog`;

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

// Fetch product details (SSR)
const fetchProduct = async (id: string) => {
  const res = await fetch(`${API_URL}/${id}`, {
    cache: "no-store",
  });
 
  if (!res.ok) {
    throw new Error("Product not found");
  }

  try {
    const response = await res.json();
    if (!response || !response.item) {
      throw new Error("Product not found in response");
    }
    return response.item;
  } catch (error) {
    console.error("Failed to parse JSON response or missing item in response", error);
    throw new Error("Product not found");
  }
};

// Fetch mock product reviews (Streaming)
const fetchReviews = async (id: string) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${id}`
  );
  return res.json();
};

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  try {
    const product = await fetchProduct(id);
    return generateProductMetadata(product, id);
  } catch (error) {
    console.error("Error fetching product for metadata", error);
    return {
      title: "Product not found",
      description: "The product you are looking for does not exist.",
    };
  }
}

const ProductPage: NextPage<ProductPageProps> = async ({ params }) => {
  const { id } = await params;

  try {
    const product: Product = await fetchProduct(id);
    return (
      <>
        <JsonLdWrapper data={generateProductJsonLD(product)} />

        <ProductDetails product={product} />
        <Suspense fallback={<p>Loading reviews...</p>}>
          <ProductReviewsWrapper id={`${Math.floor(Math.random() * 20) + 1}`} />
        </Suspense>
      </>
    );
  } catch {
    return (
      <p>Sorry, the product could not be loaded. Please try again later.</p>
    );
  }
};

// Streaming Reviews
const ProductReviewsWrapper = async ({ id }: { id: string }) => {
  const reviews = await fetchReviews(id);
  return <ProductReviews reviews={reviews} />;
};

export default ProductPage;
