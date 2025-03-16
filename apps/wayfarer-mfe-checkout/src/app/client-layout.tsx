"use client"; // Ensure it runs on the client side

import { Navbar, WayfarerChakraProvider } from "@wayfarer/ui";
import { Box } from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";

interface ClientLayoutProps {
  children: ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  return (
    <WayfarerChakraProvider>
      <Navbar />
      <Box maxW="1200px" mx="auto" px={4} py={6}>
        {children}
      </Box>
    </WayfarerChakraProvider>
  );
};
