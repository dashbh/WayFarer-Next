"use client"; // Ensure it runs on the client side

import { Navbar, WayFarerFooter } from "@wayfarer/ui";
// import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/apolloClient";
import "@wayfarer/ui/globals.css";
import "./globals.css";

interface ClientLayoutProps {
  children: ReactNode;
  user: any;
}

export function ClientLayout({ children, user }: ClientLayoutProps) {
  return (
    <>
      <Navbar user={user} />
      {children}
      <WayFarerFooter />
    </>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
