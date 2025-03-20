import { Suspense } from "react";
import type { NextPage } from "next/types";
import { generateProductMetadata } from "@wayfarer/utils";
import ProductDetails from "@/components/Product/ProductDetails";
import { Product } from "@/type";
import ProductReviews from "@/components/Product/ProductReviews";


export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await fetchProduct(params.id);
  return generateProductMetadata(product, params.id);
}

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

// Fetch product details (SSR)
const fetchProduct = async (id: string) => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Product not found");
  }

  return res.json();
};

// Fetch mock product reviews (Streaming)
const fetchReviews = async (id: string) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
  return res.json();
};

const ProductPage: NextPage<ProductPageProps> = async ({ params }) => {
  const { id } = await params;
  const product: Product = await fetchProduct(id);
  return (
    <>
      <ProductDetails product={product} />
      <Suspense fallback={<p>Loading reviews...</p>}>
        <ProductReviewsWrapper id={id} />
      </Suspense>
    </>
  );
};

// Streaming Reviews
const ProductReviewsWrapper = async ({ id }: { id: string }) => {
  const reviews = await fetchReviews(id);
  return <ProductReviews reviews={reviews} />;
};

export default ProductPage;
