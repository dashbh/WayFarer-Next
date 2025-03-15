"use client"; // Ensure it runs on the client side

import { Navbar, WayfarerChakraProvider } from "@wayfarer/ui";
import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <WayfarerChakraProvider>
      <Navbar />
      <Box maxW="1200px" mx="auto" px={4} py={6}>
        {children}
      </Box>
    </WayfarerChakraProvider>
  );
};
