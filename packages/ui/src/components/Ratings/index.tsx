"use client";

import { Box, RatingGroup } from "@chakra-ui/react";
import { Rating } from "../../type";

interface WayFarerRatingProps {
  rating: Rating;
}

export const WayFarerRatings = ({ rating }: WayFarerRatingProps) => {
  return (
    <Box py="4">
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
      <br />
      {rating.count} Reviews
    </Box>
  );
};
