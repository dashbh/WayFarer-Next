import {
  Box,
  Heading,
  Wrap,
  WrapItem,
  Badge,
  Skeleton,
  VStack,
  Button,
} from "@chakra-ui/react";

interface TrendingTopicsProps {
  onTagClick: (tagName: string) => void;
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

export default async function TrendingTopics({ onTagClick }: TrendingTopicsProps) {
  const trendingTopics = await fetchTrendingTopics();

  return (
    <Box w="100%" py={10} px={5}>
      <VStack gap={4} textAlign="center">
        <Heading size="lg">Trending Topics</Heading>
          <Wrap gap={3} justify="center">
            {trendingTopics.map((tag: any) => (
              <WrapItem key={tag.name}>
                <Badge
                  colorScheme="blue"
                  px={3}
                  py={1}
                  borderRadius="md"
                  fontSize="sm"
                  cursor="pointer"
                  _hover={{ bg: "blue.500", color: "white" }}
                  // onClick={() => onTagClick(tag.name)}
                >
                  #{tag?.name}
                </Badge>
              </WrapItem>
            ))}
          </Wrap>
      </VStack>
    </Box>
  );
};
