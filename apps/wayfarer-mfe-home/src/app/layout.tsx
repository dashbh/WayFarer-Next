import type { Metadata } from "next";
import { ClientLayout } from "./client-layout";
import { getCurrentUser } from "@/lib/session";
import { generateGlobalMetadata, reportWebVitals } from "@wayfarer/utils";
import { UserType } from "@wayfarer/types";

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
        <ClientLayout user={user}>{children}</ClientLayout>
      </body>
    </html>
  );
}

export { reportWebVitalsHandler as reportWebVitals };