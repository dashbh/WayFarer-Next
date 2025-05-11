import type { Metadata } from "next";
// import { ClientLayout } from "./client-layout";
import { generateCheckoutMetadata, reportWebVitals } from "@wayfarer/utils";
import { Navbar, WayFarerFooter } from "@wayfarer/ui";

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
        <Navbar />
        <div>{children}</div>
        <WayFarerFooter />
      </body>
    </html>
  );
}

export { reportWebVitalsHandler as reportWebVitals };
