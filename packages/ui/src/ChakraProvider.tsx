"use client";

import {
  ChakraProvider as Provider,
  createSystem,
  defaultConfig,
  defineSemanticTokens,
} from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: `'Figtree', sans-serif` },
        body: { value: `'Figtree', sans-serif` },
      },
      colors: {
        primary: { value: "#0FEE0F" },
        secondary: { value: "green" },
      },
    },
    semanticTokens: defineSemanticTokens({
      colors: {
        focusRing: {
          value: { base: "{colors.red.500}", _dark: "{colors.red.500}" },
        },
      },
    }),
  },
});

export function WayfarerChakraProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider value={system}>{children}</Provider>;
}
