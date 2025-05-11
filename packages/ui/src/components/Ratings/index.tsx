"use client";

import { Rating } from "../../type";

interface WayFarerRatingProps {
  rating: Rating;
}

export const WayFarerRatings = ({ rating }: WayFarerRatingProps) => {
  const isValidRating =
    rating &&
    typeof rating.rate === "number" &&
    rating.rate >= 0 &&
    rating.rate <= 5 &&
    typeof rating.count === "number" &&
    rating.count >= 0;

  return (
    <div className="py-4">
      {isValidRating ? (
        <div className="flex items-center gap-2">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, index) => {
              const isHalf = rating.rate - index === 0.5;
              const isFull = index < Math.floor(rating.rate);
              return (
                <span
                  key={index}
                  className={`w-5 h-5 ${
                    isFull
                      ? "bg-orange-500"
                      : isHalf
                      ? "bg-orange-300"
                      : "bg-gray-300"
                  } rounded-full`}
                ></span>
              );
            })}
          </div>
          <span className="text-gray-700 font-medium">{rating.rate}</span>
        </div>
      ) : (
        <div className="text-gray-500">Rating data is unavailable</div>
      )}
      <br />
      <div className="text-gray-600">
        {isValidRating ? `${rating.count} Reviews` : "No reviews available"}
      </div>
    </div>
  );
};
