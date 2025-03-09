"use client"; // This ensures it's a Client Component

import { WayfarerChakraProvider } from "@wayfarer/ui";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return <WayfarerChakraProvider>{children}</WayfarerChakraProvider>;
}
