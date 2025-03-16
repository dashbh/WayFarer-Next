"use client";

import { useEffect, useState } from "react";
import { Box, Heading, Text, VStack, Spinner, Avatar, Card, CardBody, Grid, GridItem } from "@chakra-ui/react";

interface Testimonial {
  id: number;
  name: string;
  body: string;
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments?_limit=3")
      .then((res) => res.json())
      .then((data) => {
        setTestimonials(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <Box py={10} px={5} textAlign="center">
      <Heading size="lg" mb={6}>
        What Our Travelers Say ✈️
      </Heading>

      {loading ? (
        <Spinner size="lg" />
      ) : (
        <Grid gap={6} templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}>
          {testimonials.map((testimonial) => (
            <GridItem>
            <Card.Root key={testimonial.id} w="full" maxW="500px" p={4} shadow="md">
              <Card.Body>
                <Avatar.Root>
                  <Avatar.Fallback name={testimonial.name} />
                  <Avatar.Image src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9" />
                </Avatar.Root>
                <Text fontWeight="bold">{testimonial.name}</Text>
                <Text lineClamp="6" color="gray.600" mt={2}>"{testimonial.body}"</Text>
              </Card.Body>
            </Card.Root>
            </GridItem>
          ))}
        </Grid>
      )}
    </Box>
  );
}
