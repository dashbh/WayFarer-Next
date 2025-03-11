import { Box, Heading, Wrap, WrapItem, Badge, Skeleton, VStack, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface TrendingTopicsProps {
  onTagClick: (tagName: string) => void;
}

const TrendingTopics = ({ onTagClick }: TrendingTopicsProps) => {
  const [tags, setTags] = useState<{ name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("https://dev.to/api/tags");
        const data = await response.json();
        setTags(data.slice(0, 10)); // Show only top 10 trending topics
      } catch (error) {
        console.error("Error fetching trending topics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  return (
    <Box w="100%" py={10} px={5}>
      <VStack gap={4} textAlign="center">
        <Heading size="lg">Trending Topics</Heading>

        {loading ? (
          <Wrap gap={3} justify="center">
            {Array.from({ length: 10 }).map((_, index) => (
              <WrapItem key={index}>
                <Skeleton height="30px" width="80px" borderRadius="md" />
              </WrapItem>
            ))}
          </Wrap>
        ) : (
          <Wrap gap={3} justify="center">
            {tags.map((tag) => (
              <WrapItem key={tag.name}>
                <Badge
                  colorScheme="blue"
                  px={3}
                  py={1}
                  borderRadius="md"
                  fontSize="sm"
                  cursor="pointer"
                  _hover={{ bg: "blue.500", color: "white" }}
                  onClick={() => onTagClick(tag.name)}
                >
                  #{tag?.name}
                </Badge>
              </WrapItem>
            ))}
          </Wrap>
        )}
      </VStack>
    </Box>
  );
};

export default TrendingTopics;
