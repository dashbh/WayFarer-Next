"use client";

import { useEffect, useState } from "react";
import { Box, Heading, SimpleGrid, Image, Text, Skeleton } from "@chakra-ui/react";

interface Destination {
  id: number;
  title: string;
  body: string;
}

export default function FeaturedDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=3")
      .then((res) => res.json())
      .then((data) => {
        setDestinations(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <Box py={10} px={5} textAlign="center">
      <Heading size="lg" mb={6}>
        Featured Destinations 🌍
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
        {loading
          ? [...Array(3)].map((_, i) => <Skeleton key={i} height="376px" />)
          : destinations.map((dest) => (
              <Box key={dest.id} p={4} borderWidth={1} borderRadius="md" shadow="md">
                <Image
                  src={`https://placehold.co/200x150?text=No+Image`}
                  alt={dest.title}
                  borderRadius="md"
                  mb={3}
                  height={150}
                  width={200}
                  style={{ width: "100%", height: "auto" }}
                  sizes="(max-width: 600px) 100px, (max-width: 1200px) 300px, 200px"
                  objectFit="cover"
                />
                <Text fontWeight="bold">{dest.title}</Text>
                <Text fontSize="sm" color="gray.600" lineClamp={4}>
                  {dest.body}
                </Text>
              </Box>
            ))}
      </SimpleGrid>
    </Box>
  );
}
