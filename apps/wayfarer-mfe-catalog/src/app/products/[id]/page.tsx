import { Metadata } from "next";
import type { NextPage } from "next/types";
import ProductDetails from "@/components/Product/ProductDetails";
import { Product } from "@/type";

interface ProductPageParams {
  id: string;
}

interface ProductPageProps {
  params: Promise<ProductPageParams>;
}

// export async function generateMetadata({
//   params,
// }: {
//   params: ProductPageProps;
// }): Promise<Metadata> {
//     const { id } = await params;
//   return {
//     title: `Product ${id}`,
//     description: "Product details page",
//   };
// }

const ProductPage: NextPage<ProductPageProps> = async ({ params }: ProductPageProps) => {
  const { id } = await params;

  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) {
    throw new Error("Product not found");
  }

  const product: Product = await res.json();

  return <ProductDetails product={product} />;
};

export default ProductPage;
