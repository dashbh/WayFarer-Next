import { Box, Container, Heading, Text, Image, VStack } from "@chakra-ui/react";
import { generateAboutMetadata } from "@wayfarer/utils";
import { Metadata } from "next";

export const metadata: Metadata = generateAboutMetadata();

export default function AboutPage() {
  return (
    <Container maxW="container.lg" py={10}>
      {/* Banner Section */}
      <Box position="relative" w="full" h="300px" mb={6} borderRadius="lg" overflow="hidden">
        <Image 
          src="/images/about-banner.jpg" 
          alt="About Us Banner" 
          objectFit="cover" 
          w="full" 
          h="full" 
        />
      </Box>

      {/* Content Section */}
      <VStack gap={6} align="start">
        <Heading as="h1" size="2xl">
          About Us
        </Heading>

        <Text fontSize="lg">
          Welcome to our platform! We are committed to providing the best experience for our users. 
          Our team is dedicated to building high-quality, scalable, and efficient web applications.
        </Text>

        <Text fontSize="lg">
          With a focus on modern web technologies, we ensure smooth and optimized performance 
          across all our services.
        </Text>

        <Heading as="h2" size="lg">
          Our Mission
        </Heading>
        <Text fontSize="md">
          Our mission is to create a seamless and enjoyable digital experience. We believe in:
        </Text>
        <VStack align="start" pl={4} gap={2}>
          <Text>✅ User-friendly interfaces</Text>
          <Text>✅ High-performance applications</Text>
          <Text>✅ Secure and scalable architecture</Text>
          <Text>✅ Continuous innovation</Text>
        </VStack>

        <Heading as="h2" size="lg">
          Meet Our Team
        </Heading>
        <Text fontSize="md">
          Our team consists of talented professionals specializing in frontend, backend, and UI/UX design.
        </Text>
      </VStack>
    </Container>
  );
}
