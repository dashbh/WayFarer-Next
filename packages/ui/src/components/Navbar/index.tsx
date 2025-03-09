'use client'; // This ensures it's a Client Component

import { Box, Flex, HStack, Link, Button } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Explore", path: "/explore" },
  { name: "Blog", path: "/blog" }
];

export const Navbar = () => {
  const router = useRouter();

  return (
    <Box bg="gray.100" px={4} py={2} shadow="md">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack gap={8} alignItems="center">
          <Box
            fontSize="xl"
            fontWeight="bold"
            cursor="pointer"
            onClick={() => router.push("/")}
          >
            WayFarer
          </Box>
          <HStack as="nav" gap={4}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                as={NextLink}
                href={link.path}
                px={2}
                py={1}
                rounded="md"
                _hover={{ bg: "gray.200" }}
              >
                {link.name}
              </Link>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems="center">
          <Button colorScheme="blue" onClick={() => router.push("/login")}>
            Login
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};
