"use client";

import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
} from "@chakra-ui/react";

export default function HeroSection() {
  return (
    <>
      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          gap={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Wayfarer <br />
            <Text
              fontSize={{ base: "1xl", sm: "2xl", md: "4xl" }}
              as={"span"}
              color={"green.400"}
            >
              Travel Beyond Boundaries
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            Discover the world like never before. Wayfarer connects explorers
            with unforgettable experiences, insider travel tips, and exclusive
            rewards. Adventure starts here—where will your journey take you
            next? 🌍✨
          </Text>
          <Stack
            direction={"column"}
            gap={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <Button
              colorScheme={"green"}
              bg={"green.400"}
              rounded={"full"}
              px={6}
              _hover={{
                bg: "green.500",
              }}
            >
              Get Started
            </Button>
            <Button variant="ghost" colorScheme={"blue"} size={"sm"}>
              Learn more
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
