import { Box, Heading, Text, Button, Image, VStack, HStack } from "@chakra-ui/react";
import { FeaturedPost } from "@/types/blog";

interface HeroSectionProps {
  featuredPost: FeaturedPost;
}

const HeroSection: React.FC<HeroSectionProps> = ({ featuredPost }) => {
  return (
    <Box w="100%" bg="gray.100" py={3} px={3} borderRadius="lg">
      <VStack gap={5} textAlign="center" mx="auto">
        <Image src={featuredPost.image} alt={featuredPost.title} borderRadius="lg" />
        <VStack gap={3}>
          <Heading size="lg">{featuredPost.title}</Heading>
          <Text fontSize="md" color="gray.600">{featuredPost.description}</Text>
          <Button colorScheme="blue" as="a" /*href={featuredPost.link} target="_blank"*/>
            Read More
          </Button>
        </VStack>
        <HStack fontSize="sm" color="gray.500">
          <Text>By {featuredPost.author}</Text>
          <Text>•</Text>
          <Text>{featuredPost.date}</Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default HeroSection;
