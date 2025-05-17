import type { Metadata } from "next";
import { ClientLayout, Providers } from "./client-layout";
import { getCurrentUser, generateGlobalMetadata, reportWebVitals } from "@wayfarer/utils";
import { UserType } from "@wayfarer/types";

import "@wayfarer/ui/globals.css";
import "./globals.css";

export const metadata: Metadata = generateGlobalMetadata();

export function reportWebVitalsHandler(metric: any) {
  reportWebVitals(metric);
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user: UserType | null = await getCurrentUser();
  return (
    <html lang="en">
      <body>
        <Providers>
          <ClientLayout user={user}>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
}

export { reportWebVitalsHandler as reportWebVitals };
