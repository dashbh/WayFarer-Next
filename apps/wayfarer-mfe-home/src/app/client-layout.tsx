"use client"; // Ensure it runs on the client side

import { Navbar, WayfarerChakraProvider, WayFarerFooter } from "@wayfarer/ui";
import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/apolloClient";

interface ClientLayoutProps {
  children: ReactNode;
  user: any;
}

export function ClientLayout({ children, user }: ClientLayoutProps) {
  return (
    <WayfarerChakraProvider>
      <Navbar user={user} />
      <Box maxW="1200px" mx="auto" px={4} py={6}>
        {children}
      </Box>
      <WayFarerFooter />
    </WayfarerChakraProvider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
