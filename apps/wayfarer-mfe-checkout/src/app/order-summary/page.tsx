import { Suspense } from "react";
import OrderSummary from "./OrderSummary";

export default function OrderSummaryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderSummary />
    </Suspense>
  );
}
