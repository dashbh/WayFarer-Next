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
    const fetchFeaturedPost = async () => {
      try {
        const response = await fetch("https://dev.to/api/articles?per_page=1&top=1");
        const data = await response.json();
        
        if (data.length > 0) {
          setFeaturedPost({
            title: data[0].title,
            description: data[0].description,
            image: data[0].cover_image || "https://source.unsplash.com/1200x600/?technology,blog",
            link: data[0].url,
            author: data[0].user.name,
            date: new Date(data[0].published_at).toDateString(),
          });
        }
      } catch (error) {
        console.error("Error fetching featured post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPost();
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
            <Button colorScheme="blue" as="a" /*href={featuredPost?.link} target="_blank" */>
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
