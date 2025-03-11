'use client';

import { Box, Heading, Text, Button, Image, VStack, Grid, GridItem, Skeleton, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Post {
  id: number;
  cover_image: string;
  title: string;
  description: string;
  user: {
    name: string;
  };
  published_at: string;
  url: string;
}

const RecentPosts = ({ selectedTag, clearFilter }: { selectedTag: string; clearFilter: () => void }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      setLoading(true);
      try {
        const url = selectedTag
          ? `https://dev.to/api/articles?tag=${selectedTag}&per_page=4`
          : "https://dev.to/api/articles?per_page=4&latest=1";

        const response = await fetch(url);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching recent posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentPosts();
  }, [selectedTag]);

  return (
    <Box w="100%" py={10} px={5}>
      <Heading size="lg" textAlign="center" mb={6}>
        {selectedTag ? `Posts About #${selectedTag}` : "Recent Posts"}
      </Heading>

      {selectedTag && (
        <Button colorScheme="red" mb={4} onClick={clearFilter}>
          Clear Filter
        </Button>
      )}

      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6} maxW="1000px" mx="auto">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <GridItem key={index}>
                <Skeleton height="250px" width="100%" borderRadius="md" />
              </GridItem>
            ))
          : posts.map((post) => (
              <GridItem key={post.id} bg="gray.100" p={4} borderRadius="md">
                <Image
                  src={post.cover_image || "https://source.unsplash.com/500x300/?technology,blog"}
                  alt={post.title}
                  borderRadius="md"
                  mb={4}
                />
                <VStack align="start" gap={3}>
                  <Heading size="md">{post.title}</Heading>
                  <Text fontSize="sm" color="gray.600">
                    {post.description}
                  </Text>
                  <HStack fontSize="sm" color="gray.500">
                    <Text>By {post.user.name}</Text>
                    <Text>•</Text>
                    <Text>{new Date(post.published_at).toDateString()}</Text>
                  </HStack>
                  <Button colorScheme="blue" as="a" /*href={post.url} target="_blank"*/ >
                    Read More
                  </Button>
                </VStack>
              </GridItem>
            ))}
      </Grid>
    </Box>
  );
};

export default RecentPosts;
