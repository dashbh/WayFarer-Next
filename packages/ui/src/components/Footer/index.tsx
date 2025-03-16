"use client";

import { Box, Container, Link, Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link";

export function WayFarerFooter() {
  return (
    <Box bg="gray.100">
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        gap={4}
      >
        <Stack direction={"row"} gap={6}>
          <Link as={NextLink} href={"/"}>
            Home
          </Link>
          <Link as={NextLink} href={"/about"}>
            About
          </Link>
          <Link as={NextLink} href={"/contact"}>
            Contact
          </Link>
        </Stack>
        <Text>© 2025 WayFarer. All rights reserved</Text>
      </Container>
    </Box>
  );
}
