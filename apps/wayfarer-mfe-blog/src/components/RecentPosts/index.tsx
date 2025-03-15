import { Box, Heading, Text, VStack, Image, Grid, GridItem, HStack, Button } from "@chakra-ui/react";
import { Post } from "@/types/blog";

interface RecentPostsProps {
  posts: Post[];
}

const RecentPosts: React.FC<RecentPostsProps> = ({ posts }) => {
  return (
    <Box w="100%" py={10} px={5}>
      <Heading size="lg" textAlign="center" mb={6}>
      Recent Posts
      </Heading>

      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6} maxW="1000px" mx="auto">
        {posts.map((post) => (
              <GridItem key={post.id} bg="gray.100" p={4} borderRadius="md">
                <Image
                  src={post.image || "https://source.unsplash.com/500x300/?technology,blog"}
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
                    <Text>By {post.author}</Text>
                    <Text>•</Text>
                    <Text>{new Date(post.date).toDateString()}</Text>
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
