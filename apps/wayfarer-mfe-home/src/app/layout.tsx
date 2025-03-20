import type { Metadata } from "next";
import { ClientLayout } from "./client-layout";
import { getCurrentUser } from "@/lib/session";
import { generateGlobalMetadata } from "@wayfarer/utils";

export const metadata: Metadata = generateGlobalMetadata();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  return (
    <html lang="en">
      <body>
        <ClientLayout user={user}>{children}</ClientLayout>
      </body>
    </html>
  );
}
