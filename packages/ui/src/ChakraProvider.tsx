"use client";

import { ChakraProvider as Provider, createSystem, defaultConfig } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: `'Figtree', sans-serif` },
        body: { value: `'Figtree', sans-serif` },
      },
    },
  },
})

export function WayfarerChakraProvider({ children }: { children: React.ReactNode }) {
  return <Provider value={system}>{children}<Button></Button></Provider>;
}
