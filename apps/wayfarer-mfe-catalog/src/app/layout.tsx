import type { Metadata } from "next";
import { generateCheckoutMetadata, reportWebVitals } from "@wayfarer/utils";

import { ClientLayout } from "./client-layout";

import "@wayfarer/ui/globals.css";
import "./globals.css";

export const metadata: Metadata = generateCheckoutMetadata();

export function reportWebVitalsHandler(metric: any) {
  reportWebVitals(metric);
}

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

export { reportWebVitalsHandler as reportWebVitals };
