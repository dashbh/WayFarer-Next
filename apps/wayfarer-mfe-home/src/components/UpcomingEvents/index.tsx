"use client";

import { useEffect, useState } from "react";
import { Box, Heading, SimpleGrid, Text, VStack, Skeleton } from "@chakra-ui/react";

interface Event {
  id: number;
  name: string;
  body: string;
}

export default function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments?_limit=3")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <Box py={10} px={5} textAlign="center">
      <Heading size="lg" mb={6}>
        Upcoming Travel Events 📅
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
        {loading
          ? [...Array(3)].map((_, i) => <Skeleton key={i} height="150px" />)
          : events.map((event) => (
              <VStack key={event.id} p={4} borderWidth={1} borderRadius="md" shadow="md" align="start">
                <Text fontWeight="bold">{event.name}</Text>
                <Text fontSize="sm" color="gray.600" lineClamp={2}>
                  {event.body}
                </Text>
              </VStack>
            ))}
      </SimpleGrid>
    </Box>
  );
}
