import { Skeleton, Box } from "@chakra-ui/react";

export default function ProductSkeleton() {
  return (
    <Box p={5}>
      <Skeleton height="300px" />
      <Skeleton mt={4} height="20px" width="80%" />
      <Skeleton mt={2} height="20px" width="60%" />
    </Box>
  );
}
