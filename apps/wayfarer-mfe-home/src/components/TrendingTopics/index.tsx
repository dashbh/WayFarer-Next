import {
  Box,
  Heading,
  Wrap,
  WrapItem,
  Badge,
  VStack,
} from "@chakra-ui/react";

interface TrendingTopicsProps {
}

const fetchTrendingTopics = async () => {
  const topicsData = await fetch("https://dev.to/api/tags", {
    next: { revalidate: 86400 }, // Regenerates every 24 hours
  });
  const topics = await topicsData.json();

  return topics
    .slice(0, 10)
    .map((topic: any) => ({ name: topic.name, slug: topic.name }));
};

export default async function TrendingTopics({ }: TrendingTopicsProps) {
  const trendingTopics = await fetchTrendingTopics();

  return (
    <Box w="100%" my={20} py={5} px={5} bg="gray.50" shadow={"md"}>
      <VStack gap={4} textAlign="center">
        <Heading my={3} color="green.400" size="3xl">Trending Topics</Heading>
          <Wrap gap={3} justify="center">
            {trendingTopics.map((tag: any) => (
              <WrapItem key={tag.name}>
                <Badge
                  colorPalette="gray"
                  px={3}
                  py={1}
                  borderRadius="md"
                  fontSize="sm"
                  cursor="pointer"
                  _hover={{ bg: "blue.500", color: "white" }}
                >
                  {tag?.name.toUpperCase()}
                </Badge>
              </WrapItem>
            ))}
          </Wrap>
      </VStack>
    </Box>
  );
};
