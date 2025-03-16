import { Box, Text, VStack, Separator } from "@chakra-ui/react";

interface Review {
  id: number;
  name: string;
  email: string;
  body: string;
}

export default function ProductReviews({ reviews }: { reviews: Review[] }) {
  return (
    <Box mt={8} p={5} borderWidth={1} borderRadius="md">
      <Text fontSize="xl" fontWeight="bold" mb={3}>
        Customer Reviews
      </Text>
      <VStack align="stretch" gap={4}>
        {reviews.map((review) => (
          <Box key={review.id} p={3} borderWidth={1} borderRadius="md">
            <Text fontWeight="bold">{review.name}</Text>
            <Text fontSize="sm" color="gray.500">
              {review.email}
            </Text>
            <Text mt={2}>{review.body}</Text>
            <Separator mt={3} />
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
