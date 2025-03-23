
import type { Metadata } from "next";
import {ClientLayout} from "./client-layout";
import { generateGlobalMetadata, reportWebVitals } from "@wayfarer/utils";

export function reportWebVitalsHandler(metric: any) {
  reportWebVitals(metric);
}

export const metadata: Metadata = generateGlobalMetadata();

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
