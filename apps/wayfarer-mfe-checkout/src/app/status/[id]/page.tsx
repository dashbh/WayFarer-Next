import { Suspense } from "react";
import OrderStatus from "./OrderStatus";

export default function OrderSummaryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderStatus orderId={`1234`}/>
    </Suspense>
  );
}
