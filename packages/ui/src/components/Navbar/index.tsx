"use client";

import { Box, HStack, Link, Spacer } from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { NAV_LINKS } from "../../config/navigation";

interface NavbarProps {
  internalRoutes?: string[]; // Internal routes for soft navigation
}

export const Navbar = ({ internalRoutes = [] }: NavbarProps) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Box bg="gray.100" px={4} py={2} shadow="md">
      <HStack h={16} gap={8} alignItems="center">
        <Box
          fontSize="xl"
          fontWeight="bold"
          cursor="pointer"
          onClick={() => router.push("/")}
        >
          WayFarer
        </Box>
        <HStack as="nav" gap={4}>
          {NAV_LINKS.map(({ label, path }) => {
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

        <Spacer />

        <HStack gap={4}>
          <Link
            as={NextLink}
            href="/about"
            fontWeight={pathname === "/about" ? "bold" : "normal"}
          >
            About Us
          </Link>
          <Link
            as={NextLink}
            href="/contact"
            fontWeight={pathname === "/contact" ? "bold" : "normal"}
          >
            Contact Us
          </Link>
        </HStack>
      </HStack>
    </Box>
  );
};
