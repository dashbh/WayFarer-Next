import { Box, Heading, VStack, Text, Link, Spinner } from "@chakra-ui/react";

interface Guide {
  id: number;
  title: string;
}

const fetchTrendingTravelGuides = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5", {
    next: { revalidate: 86400 }, // Regenerates every 24 hours
  });
  const json = await res.json();

  return json;
};

export default async function TrendingTravelGuides() {
  const guides: Guide[] = await fetchTrendingTravelGuides();

  return (
    <Box py={10} px={5} textAlign="center">
      <Heading size="lg" mb={6}>
        Trending Travel Guides 🧳
      </Heading>

        <VStack gap={4} align="start">
          {guides.map((guide) => (
            <Link key={guide.id} href={`#`} color="blue.500" fontWeight="bold">
              {guide.title}
            </Link>
          ))}
        </VStack>
    </Box>
  );
}
