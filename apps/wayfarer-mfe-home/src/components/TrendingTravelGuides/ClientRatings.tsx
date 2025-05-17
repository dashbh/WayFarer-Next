"use client";

import { WayFarerRatings } from "@wayfarer/ui";

export function ClientRatings() {
  // Generate a random rating between 2.0 and 5.0 (one decimal place)
  const rating = +(Math.random() * 3 + 2).toFixed(1);
  // Generate a random totalRatings between 300 and 3000
  const totalRatings = Math.floor(Math.random() * (3000 - 300 + 1)) + 300;

  return (
    <div className="flex items-center">
      <WayFarerRatings
        color="green"
        isFull={false}
        rating={rating}
        totalRatings={totalRatings}
      />
    </div>
  );
}