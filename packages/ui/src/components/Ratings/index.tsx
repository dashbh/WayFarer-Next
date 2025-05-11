"use client";

import { Box, RatingGroup } from "@chakra-ui/react";
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
    <Box py="4">
      {isValidRating ? (
        <RatingGroup.Root
          allowHalf
          count={5}
          value={rating.rate}
          colorPalette="orange"
        >
          <RatingGroup.HiddenInput />
          <RatingGroup.Label>{rating.rate} &nbsp;</RatingGroup.Label>
          <RatingGroup.Control />
        </RatingGroup.Root>
      ) : (
        <Box color="gray.500">Rating data is unavailable</Box>
      )}
      <br />
      {isValidRating ? `${rating.count} Reviews` : "No reviews available"}
    </Box>
  );
};
