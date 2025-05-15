"use client";

// import { Rating } from "../../type";

interface WayFarerRatingProps {
  rating: number;
  totalRatings: number;
}

export const WayFarerRatings = ({ rating, totalRatings }: WayFarerRatingProps) => {
  const isValidRating =
    rating &&
    typeof rating === "number" &&
    rating >= 0 &&
    rating <= 5 &&
    typeof totalRatings === "number" &&
    totalRatings >= 0;

  return (
    <div className="py-4">
      {isValidRating ? (
        <div className="flex items-center gap-2">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, index) => {
              const isHalf = rating - index === 0.5;
              const isFull = index < Math.floor(rating);
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
          <span className="text-gray-700 font-medium">{rating}</span>
        </div>
      ) : (
        <div className="text-gray-500">Rating data is unavailable</div>
      )}
      <br />
      <div className="text-gray-600">
        {isValidRating ? `${totalRatings} Reviews` : "No reviews available"}
      </div>
    </div>
  );
};
