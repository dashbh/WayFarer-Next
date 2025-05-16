import type { Metadata } from "next";
import { generateBlogListMetadata, getCurrentUser, reportWebVitals } from "@wayfarer/utils";

import { ClientLayout } from "./client-layout";

import "@wayfarer/ui/globals.css";
import "./globals.css";
import { UserType } from "@wayfarer/types";

export const metadata: Metadata = generateBlogListMetadata();

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
