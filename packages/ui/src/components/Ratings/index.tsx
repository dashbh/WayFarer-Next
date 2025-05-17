"use client";

import colors from "tailwindcss/colors";

// import { Rating } from "../../type";

interface WayFarerRatingProps {
  rating: number;
  totalRatings: number;
  color?: string;
  isFull?: boolean;
}

export const WayFarerRatings = ({
  rating,
  totalRatings,
  color,
  isFull = true,
}: WayFarerRatingProps) => {
  const isValidRating =
    typeof rating === "number" &&
    rating >= 0 &&
    rating <= 5 &&
    typeof totalRatings === "number" &&
    totalRatings >= 0;

  // Use provided color or default to green
  // Use provided color or default to green
  const fullColor = color ? `bg-${color}-500` : "bg-green-500";
  const emptyColor = "bg-gray-300";
  // For gradient, use the actual color code or fallback to orange
  const fullColorHex = color
    ? (colors as any)[color]?.[500] || colors.green[500] // Helper function below
    : colors.green[500];
  const halfColorHex = colors.gray[300];

  // Helper to render the circles
  const renderCircles = () =>
    Array.from({ length: 5 }).map((_, index) => {
      const diff = rating - index;
      const isFull = diff >= 1;
      const isHalf = diff > 0 && diff < 1;
      if (isFull) {
        return (
          <span
            key={index}
            className={`w-5 h-5 rounded-full ${fullColor} inline-block`}
          ></span>
        );
      } else if (isHalf) {
        // Use a gradient to fill half the circle with the correct color
        return (
          <span
            key={index}
            className="w-5 h-5 rounded-full inline-block"
            style={{
              background: `linear-gradient(to right, ${fullColorHex} 50%, ${halfColorHex} 50%)`,
            }}
          ></span>
        );
      } else {
        return (
          <span
            key={index}
            className={`w-5 h-5 rounded-full ${emptyColor} inline-block`}
          ></span>
        );
      }
    });

  if (!isValidRating) {
    return (
      <div className="py-4">
        <div className="text-gray-500 text-center">Rating unavailable</div>
      </div>
    );
  }

  if (isFull) {
    return (
      <div className="py-4">
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            <span className="text-gray-700 font-medium min-w-[1.5rem] text-left">
              {rating.toFixed(1)}
            </span>
            <div className="flex">{renderCircles()}</div>
          </div>
          <div className="text-gray-600 text-center">
            {`${totalRatings} Reviews`}
          </div>
        </div>
      </div>
    );
  }

  // Mini version: all in one line, totalRatings in brackets, no extra text
  return (
    <div className="flex items-center gap-1 text-sm py-1">
      <span className="text-gray-700 font-medium">{rating.toFixed(1)}</span>
      <div className="flex">{renderCircles()}</div>
      <span className="text-gray-500 ml-1">({totalRatings})</span>
    </div>
  );
};
