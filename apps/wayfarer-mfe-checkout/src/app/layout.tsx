import type { Metadata } from "next";
import { ClientLayout } from "./client-layout";
import { generateCheckoutMetadata, reportWebVitals } from "@wayfarer/utils";

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
