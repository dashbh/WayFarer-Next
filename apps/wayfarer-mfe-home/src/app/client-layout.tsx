"use client"; // Ensure it runs on the client side

import { Navbar, WayfarerChakraProvider, WayFarerFooter } from "@wayfarer/ui";
import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ClientLayoutProps {
  children: ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <WayfarerChakraProvider>
      <Navbar />
      <Box maxW="1200px" mx="auto" px={4} py={6}>
        {children}
      </Box>
      <WayFarerFooter />
    </WayfarerChakraProvider>
  );
};
