import { Metadata } from "next";

export const generateCheckoutMetadata = (): Metadata => ({
  title: "Checkout - WayFarer",
  description: "Securely complete your purchase at WayFarer.",
  robots: "noindex, nofollow", // Prevents indexing
});
