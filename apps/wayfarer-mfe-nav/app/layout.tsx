import type { Metadata } from "next";
import localFont from "next/font/local";
import { WayfarerChakraProvider } from "@wayfarer/ui";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "WayFarer",
  description: "WayFarer ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <WayfarerChakraProvider>{children}</WayfarerChakraProvider>
      </body>
    </html>
  );
}
