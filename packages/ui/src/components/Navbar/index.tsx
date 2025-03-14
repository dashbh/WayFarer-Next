"use client";

import { Box, Flex, HStack, Link, Button } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { NAV_LINKS } from "../../config/navigation";

interface NavbarProps {
  internalRoutes?: string[]; // Internal routes for soft navigation
}

export const Navbar = ({ internalRoutes = [] }: NavbarProps) => {
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
            {NAV_LINKS.map(({ label, path, mfe }) => {
              const isInternal = internalRoutes.includes(path);

              return isInternal ? (
                <Link
                  key={label}
                  as={NextLink}
                  href={path}
                  px={2}
                  py={1}
                  rounded="md"
                  _hover={{ bg: "gray.200" }}
                >
                  {label}
                </Link>
              ) : (
                <Link
                  key={label}
                  href={path}
                  px={2}
                  py={1}
                  rounded="md"
                  _hover={{ bg: "gray.200" }}
                >
                  {label}
                </Link>
              );
            })}
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
