
import type { Metadata } from "next";
import localFont from "next/font/local";
import {ClientLayout} from "./client-layout";
import { getLoggedInUser } from "@/lib/session";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
// });

export const metadata: Metadata = {
  title: "WayFarer - Explore the World",
  description: "Discover and book amazing travel destinations with WayFarer.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getLoggedInUser();
  return (
    <html lang="en">
      <body>
        <ClientLayout user={user}>{children}</ClientLayout>
      </body>
    </html>
  );
}
