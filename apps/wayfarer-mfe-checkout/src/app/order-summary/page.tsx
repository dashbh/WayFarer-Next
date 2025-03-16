import { Suspense } from "react";
import OrderSummaryClient from "./OrderSummaryClient";

export default function OrderSummaryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderSummaryClient />
    </Suspense>
  );
}
