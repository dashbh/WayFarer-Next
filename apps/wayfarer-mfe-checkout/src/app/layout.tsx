import type { Metadata } from "next";
// import { ClientLayout } from "./client-layout";
import { generateCheckoutMetadata, getCurrentUser, reportWebVitals } from "@wayfarer/utils";

import "@wayfarer/ui/globals.css";
import "./globals.css";
import { ClientLayout } from "./client-layout";
import { UserType } from "../../../../packages/types/src/user";

export const metadata: Metadata = generateCheckoutMetadata();

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
        <ClientLayout user={user}>{children}</ClientLayout>
      </body>
    </html>
  );
}

export { reportWebVitalsHandler as reportWebVitals };
