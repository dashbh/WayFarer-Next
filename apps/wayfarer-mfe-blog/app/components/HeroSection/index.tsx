'use client';

import { Box, Heading, Text, Button, Image, VStack, HStack, Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Post {
  title: string;
  description: string;
  image: string;
  link: string;
  author: string;
  date: string;
}

const HeroSection = () => {
  const [featuredPost, setFeaturedPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an API call (Replace with actual API request)
    setTimeout(() => {
      setFeaturedPost({
        title: "Mastering Micro-Frontends with React",
        description: "Learn how to build scalable and modular web apps using Micro-Frontend architecture.",
        image: "https://source.unsplash.com/1200x600/?technology,blog",
        link: "/posts/micro-frontends",
        author: "John Doe",
        date: "March 11, 2025",
      });
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <Box w="100%" bg="gray.100" py={10} px={5}>
      <VStack gap={5} textAlign="center" maxW="800px" mx="auto">
        {loading ? (
          <Skeleton height="300px" width="100%" />
        ) : (
          <Image src={featuredPost?.image} alt={featuredPost?.title} borderRadius="lg" />
        )}

        <VStack gap={3}>
          {loading ? (
            <Skeleton height="20px" width="70%" />
          ) : (
            <Heading size="lg">{featuredPost?.title}</Heading>
          )}

          {loading ? (
            <Skeleton height="16px" width="80%" />
          ) : (
            <Text fontSize="md" color="gray.600">
              {featuredPost?.description}
            </Text>
          )}

          {loading ? (
            <Skeleton height="40px" width="30%" />
          ) : (
            <Button colorScheme="blue" as="a" /*href={featuredPost?.link}*/ >
              Read More
            </Button>
          )}
        </VStack>

        {!loading && (
          <HStack fontSize="sm" color="gray.500">
            <Text>By {featuredPost?.author}</Text>
            <Text>•</Text>
            <Text>{featuredPost?.date}</Text>
          </HStack>
        )}
      </VStack>
    </Box>
  );
};

export default HeroSection;
