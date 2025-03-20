
import type { Metadata } from "next";
import {ClientLayout} from "./client-layout";
import { generateCheckoutMetadata } from "@wayfarer/utils";

export const metadata: Metadata = generateCheckoutMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
