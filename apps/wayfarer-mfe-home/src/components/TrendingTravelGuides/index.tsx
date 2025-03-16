"use client";

import { useEffect, useState } from "react";
import { Box, Heading, VStack, Text, Link, Spinner } from "@chakra-ui/react";

interface Guide {
  id: number;
  title: string;
}

export default function TrendingTravelGuides() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
      .then((res) => res.json())
      .then((data) => {
        setGuides(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <Box py={10} px={5} textAlign="center">
      <Heading size="lg" mb={6}>
        Trending Travel Guides 🧳
      </Heading>

      {loading ? (
        <Spinner size="lg" />
      ) : (
        <VStack gap={4} align="start">
          {guides.map((guide) => (
            <Link key={guide.id} href={`#`} color="blue.500" fontWeight="bold">
              {guide.title}
            </Link>
          ))}
        </VStack>
      )}
    </Box>
  );
}
